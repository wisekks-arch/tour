const fs = require('fs');
const path = require('path');

const apiJsPath = path.join(__dirname, '..', 'js', 'api.js');
let content = fs.readFileSync(apiJsPath, 'utf8');

// 1. Update getAdminStats in TourAPI to include Hotel stats
const oldStatsReturn = `    return {
      success: true,
      data: {
        packageCount: packages.length,
        activePackageCount,
        inactivePackageCount,
        bookingCount: bookings.length,
        pendingBookings,
        inquiryCount: inquiries.length,
        pendingInquiries,
        totalRevenue,
        userCount: users.length,
        memberCount,
        adminCount
      }
    };`;

const newStatsReturn = `    let hotels = [];
    let hotelBookings = [];
    try {
      const hRes = await this.getHotels({ includeInactive: true });
      hotels = hRes.data || [];
      const hbRes = await this.getHotelBookings();
      hotelBookings = hbRes.data || [];
    } catch {}

    let activeHotelCount = 0;
    let inactiveHotelCount = 0;
    hotels.forEach(h => {
      if (h.status === '미운영' || h.isActive === false) {
        inactiveHotelCount++;
      } else {
        activeHotelCount++;
      }
    });

    const pendingHotelBookings = hotelBookings.filter(b => b.status === '접수완료').length;
    let totalHotelRevenue = 0;
    hotelBookings.forEach(b => {
      totalHotelRevenue += Number(b.totalPrice) || 0;
    });

    return {
      success: true,
      data: {
        packageCount: packages.length,
        activePackageCount,
        inactivePackageCount,
        bookingCount: bookings.length,
        pendingBookings,
        hotelCount: hotels.length,
        activeHotelCount,
        inactiveHotelCount,
        hotelBookingCount: hotelBookings.length,
        pendingHotelBookings,
        totalHotelRevenue,
        inquiryCount: inquiries.length,
        pendingInquiries,
        totalRevenue,
        userCount: users.length,
        memberCount,
        adminCount
      }
    };`;

if (content.includes(oldStatsReturn)) {
  content = content.replace(oldStatsReturn, newStatsReturn);
}

// 2. Update getHotels and Add Hotel CRUD methods
const hotelMethodsFull = `  // --- Hotels Management & Bookings ---
  async getHotels(filter = {}) {
    let hotels = [];
    try {
      if (window.location.protocol !== 'file:') {
        const queryParams = new URLSearchParams();
        if (filter.region && filter.region !== '전체') queryParams.append('region', filter.region);
        if (filter.star) queryParams.append('star', filter.star);
        if (filter.includeInactive) queryParams.append('includeInactive', 'true');
        const res = await fetch(\`\${API_BASE}/hotels?\${queryParams.toString()}\`);
        if (res.ok) {
          const json = await res.json();
          if (json && json.success && Array.isArray(json.data)) {
            hotels = json.data;
          }
        }
      }
    } catch (e) {
      // Local fallback
    }

    if (!hotels || hotels.length === 0) {
      let localHotels = [];
      try {
        const stored = localStorage.getItem('toureasy_hotels');
        if (stored) {
          localHotels = JSON.parse(stored);
        } else {
          localHotels = DEFAULT_HOTELS;
          localStorage.setItem('toureasy_hotels', JSON.stringify(localHotels));
        }
      } catch {
        localHotels = DEFAULT_HOTELS;
      }
      hotels = [...localHotels];
    }

    // Filter out inactive hotels unless includeInactive is true
    if (!filter.includeInactive) {
      hotels = hotels.filter(h => h.status !== '미운영' && h.status !== 'INACTIVE' && h.isActive !== false);
    }

    // Filter by Region
    if (filter.region && filter.region !== '전체') {
      hotels = hotels.filter(h => h.region === filter.region || (h.country && h.country.includes(filter.region)));
    }

    // Filter by Star
    if (filter.star && Number(filter.star) > 0) {
      hotels = hotels.filter(h => Number(h.star) >= Number(filter.star));
    }

    // Filter by Status (for Admin)
    if (filter.status && filter.status !== 'ALL') {
      if (filter.status === '운영중') {
        hotels = hotels.filter(h => h.status !== '미운영' && h.status !== 'INACTIVE' && h.isActive !== false);
      } else if (filter.status === '미운영') {
        hotels = hotels.filter(h => h.status === '미운영' || h.status === 'INACTIVE' || h.isActive === false);
      }
    }

    // Filter by Search Query
    if (filter.search) {
      const q = filter.search.toLowerCase();
      hotels = hotels.filter(h => 
        (h.name && h.name.toLowerCase().includes(q)) ||
        (h.nameEn && h.nameEn.toLowerCase().includes(q)) ||
        (h.city && h.city.toLowerCase().includes(q)) ||
        (h.country && h.country.toLowerCase().includes(q)) ||
        (h.summary && h.summary.toLowerCase().includes(q)) ||
        (Array.isArray(h.amenities) && h.amenities.some(a => a.toLowerCase().includes(q)))
      );
    }

    // Sort
    if (filter.sort === 'priceAsc') {
      hotels.sort((a, b) => (a.pricePerNight || 0) - (b.pricePerNight || 0));
    } else if (filter.sort === 'priceDesc') {
      hotels.sort((a, b) => (b.pricePerNight || 0) - (a.pricePerNight || 0));
    } else if (filter.sort === 'rating') {
      hotels.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (filter.sort === 'reviews') {
      hotels.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    } else {
      // Default: featured / rating
      hotels.sort((a, b) => (b.rating || 0) - (a.rating || 0) || (b.reviewCount || 0) - (a.reviewCount || 0));
    }

    return { success: true, count: hotels.length, data: hotels };
  },

  async getHotelById(id) {
    const res = await this.getHotels({ includeInactive: true });
    const item = (res.data || []).find(h => h.id === id);
    if (item) return { success: true, data: item };
    return { success: false, message: '호텔 정보를 찾을 수 없습니다.' };
  },

  async createHotel(hotelData) {
    const regionCodeMap = { '국내': 'kr', '동남아': 'sea', '일본/동아시아': 'jp', '유럽': 'eu', '미주/대양주': 'us' };
    const rCode = regionCodeMap[hotelData.region] || 'htl';
    const randomSuffix = Math.floor(10 + Math.random() * 90);
    const newId = \`htl-\${rCode}-\${Date.now().toString().slice(-4)}\${randomSuffix}\`;

    const newHotel = {
      id: newId,
      name: hotelData.name || '신규 특급 호텔',
      nameEn: hotelData.nameEn || '',
      region: hotelData.region || '국내',
      city: hotelData.city || '',
      country: hotelData.country || '대한민국',
      star: Number(hotelData.star) || 5,
      rating: Number(hotelData.rating) || 4.95,
      reviewCount: Number(hotelData.reviewCount) || 10,
      pricePerNight: Number(hotelData.pricePerNight) || 300000,
      originalPrice: Number(hotelData.originalPrice) || (Number(hotelData.pricePerNight) * 1.2),
      thumbnail: hotelData.thumbnail || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85',
      images: Array.isArray(hotelData.images) && hotelData.images.length > 0 ? hotelData.images : [hotelData.thumbnail || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85'],
      amenities: Array.isArray(hotelData.amenities) ? hotelData.amenities : (typeof hotelData.amenities === 'string' ? hotelData.amenities.split(',').map(s => s.trim()).filter(Boolean) : ['수영장', '스파', '다이닝', '무료 Wi-Fi']),
      roomTypes: Array.isArray(hotelData.roomTypes) && hotelData.roomTypes.length > 0 ? hotelData.roomTypes : [
        { name: "디럭스 룸", price: Number(hotelData.pricePerNight) || 300000, maxGuests: 2, bed: "더블 베드 1개" }
      ],
      checkIn: hotelData.checkIn || "15:00",
      checkOut: hotelData.checkOut || "11:00",
      summary: hotelData.summary || "최고의 시설과 품격 있는 서비스를 제공하는 럭셔리 호텔입니다.",
      status: hotelData.status || "운영중",
      isActive: hotelData.status !== "미운영"
    };

    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(\`\${API_BASE}/hotels\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newHotel)
        });
        if (res.ok) {
          const json = await res.json();
          if (json && json.success) return json;
        }
      }
    } catch {}

    try {
      let stored = localStorage.getItem('toureasy_hotels');
      let list = stored ? JSON.parse(stored) : [...DEFAULT_HOTELS];
      list.unshift(newHotel);
      localStorage.setItem('toureasy_hotels', JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('toureasy_hotels_changed', { detail: newHotel }));
      return { success: true, message: '호텔 상품이 성공적으로 등록되었습니다.', data: newHotel };
    } catch (err) {
      return { success: false, message: '호텔 상품 등록 중 오류: ' + err.message };
    }
  },

  async updateHotel(id, hotelData) {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(\`\${API_BASE}/hotels/\${id}\`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(hotelData)
        });
        if (res.ok) return await res.json();
      }
    } catch {}

    try {
      let stored = localStorage.getItem('toureasy_hotels');
      let list = stored ? JSON.parse(stored) : [...DEFAULT_HOTELS];
      const idx = list.findIndex(h => h.id === id);
      if (idx !== -1) {
        list[idx] = {
          ...list[idx],
          ...hotelData,
          pricePerNight: Number(hotelData.pricePerNight) || list[idx].pricePerNight,
          originalPrice: hotelData.originalPrice !== undefined ? Number(hotelData.originalPrice) : list[idx].originalPrice,
          star: hotelData.star !== undefined ? Number(hotelData.star) : list[idx].star,
          isActive: hotelData.status ? (hotelData.status !== '미운영') : list[idx].isActive
        };
        localStorage.setItem('toureasy_hotels', JSON.stringify(list));
        window.dispatchEvent(new CustomEvent('toureasy_hotels_changed', { detail: list[idx] }));
        return { success: true, message: '호텔 상품 정보가 수정되었습니다.', data: list[idx] };
      }
      return { success: false, message: '호텔 정보를 찾을 수 없습니다.' };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  async updateHotelStatus(id, newStatus) {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(\`\${API_BASE}/hotels/\${id}/status\`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });
        if (res.ok) return await res.json();
      }
    } catch {}

    try {
      let stored = localStorage.getItem('toureasy_hotels');
      let list = stored ? JSON.parse(stored) : [...DEFAULT_HOTELS];
      const idx = list.findIndex(h => h.id === id);
      if (idx !== -1) {
        list[idx].status = newStatus;
        list[idx].isActive = (newStatus !== '미운영');
        localStorage.setItem('toureasy_hotels', JSON.stringify(list));
        window.dispatchEvent(new CustomEvent('toureasy_hotels_changed', { detail: list[idx] }));
        return { success: true, message: '호텔 운영 상태가 변경되었습니다.', data: list[idx] };
      }
      return { success: false, message: '호텔 정보를 찾을 수 없습니다.' };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  async deleteHotel(id) {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(\`\${API_BASE}/hotels/\${id}\`, { method: 'DELETE' });
        if (res.ok) return await res.json();
      }
    } catch {}

    try {
      let stored = localStorage.getItem('toureasy_hotels');
      let list = stored ? JSON.parse(stored) : [...DEFAULT_HOTELS];
      list = list.filter(h => h.id !== id);
      localStorage.setItem('toureasy_hotels', JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('toureasy_hotels_changed', { detail: { id } }));
      return { success: true, message: '호텔 상품이 삭제되었습니다.' };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },`;

// Replace from `// --- Hotels Management & Bookings ---` to `async createHotelBooking(`
const startMarker = '  // --- Hotels Management & Bookings ---';
const endMarker = '  async createHotelBooking(bookingData) {';

const sIdx = content.indexOf(startMarker);
const eIdx = content.indexOf(endMarker);

if (sIdx !== -1 && eIdx !== -1) {
  content = content.slice(0, sIdx) + hotelMethodsFull + '\n\n' + content.slice(eIdx);
}

fs.writeFileSync(apiJsPath, content, 'utf8');
console.log('Successfully updated js/api.js with complete hotel CRUD & stats.');
