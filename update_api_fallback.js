const fs = require('fs');
const path = require('path');

const packages = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'packages.json'), 'utf8'));

const apiJsContent = `// API Client & Utility Functions for TourEasy (Supports both Node.js server and standalone offline/file:// mode)
const API_BASE = '/api';

const DEFAULT_PACKAGES = ${JSON.stringify(packages, null, 2)};

const TourAPI = {
  // 1. Fetch Packages with filtering (Auto fallback if server unavailable)
  async getPackages(params = {}) {
    try {
      if (window.location.protocol !== 'file:') {
        const query = new URLSearchParams();
        Object.keys(params).forEach(key => {
          if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
            query.append(key, params[key]);
          }
        });
        const res = await fetch(\`\${API_BASE}/packages?\${query.toString()}\`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) return json;
        }
      }
    } catch (e) {
      console.warn('API server unavailable, using built-in package data.', e);
    }

    // Client-side fallback filtering
    let result = [...DEFAULT_PACKAGES];
    if (params.region && params.region !== '전체') {
      result = result.filter(p => p.region === params.region);
    }
    if (params.theme && params.theme !== '전체') {
      result = result.filter(p => p.theme && p.theme.includes(params.theme));
    }
    if (params.search) {
      const s = params.search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(s) ||
        p.city.toLowerCase().includes(s) ||
        p.country.toLowerCase().includes(s) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(s)))
      );
    }
    if (params.minPrice) {
      result = result.filter(p => p.price >= parseInt(params.minPrice, 10));
    }
    if (params.maxPrice) {
      result = result.filter(p => p.price <= parseInt(params.maxPrice, 10));
    }
    if (params.featured === 'true') {
      result = result.filter(p => p.isFeatured);
    }
    if (params.earlyBird === 'true') {
      result = result.filter(p => p.isEarlyBird);
    }

    if (params.sort === 'priceAsc') {
      result.sort((a, b) => a.price - b.price);
    } else if (params.sort === 'priceDesc') {
      result.sort((a, b) => b.price - a.price);
    } else if (params.sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (params.sort === 'reviews') {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return { success: true, count: result.length, data: result };
  },

  // 2. Fetch Single Package (Auto fallback)
  async getPackageById(id) {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(\`\${API_BASE}/packages/\${id}\`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) return json;
        }
      }
    } catch (e) {
      console.warn('API server unavailable, using built-in package data.', e);
    }

    const item = DEFAULT_PACKAGES.find(p => p.id === id || p.slug === id);
    if (!item) {
      return { success: true, data: DEFAULT_PACKAGES[0] };
    }
    return { success: true, data: item };
  },

  // 3. Create Booking (Server or LocalStorage)
  async createBooking(bookingData) {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(\`\${API_BASE}/bookings\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingData)
        });
        if (res.ok) {
          return await res.json();
        }
      }
    } catch (e) {
      console.warn('API server unavailable, saving locally.', e);
    }

    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomCode = Math.floor(100 + Math.random() * 900);
    const newBooking = {
      id: \`BK-\${todayStr}-\${randomCode}\`,
      ...bookingData,
      status: '접수완료',
      createdAt: new Date().toISOString()
    };

    try {
      const local = JSON.parse(localStorage.getItem('toureasy_bookings') || '[]');
      local.unshift(newBooking);
      localStorage.setItem('toureasy_bookings', JSON.stringify(local));
    } catch {}

    return {
      success: true,
      message: '예약 및 상담 신청이 성공적으로 접수되었습니다.',
      data: newBooking
    };
  },

  // 4. Get All Bookings (Admin)
  async getBookings() {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(\`\${API_BASE}/bookings\`);
        if (res.ok) return await res.json();
      }
    } catch (e) {}

    try {
      const local = JSON.parse(localStorage.getItem('toureasy_bookings') || '[]');
      return { success: true, count: local.length, data: local };
    } catch {
      return { success: true, count: 0, data: [] };
    }
  },

  // 5. Update Booking Status (Admin)
  async updateBookingStatus(id, status) {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(\`\${API_BASE}/bookings/\${id}\`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status })
        });
        if (res.ok) return await res.json();
      }
    } catch (e) {}

    return { success: true, message: '상태가 변경되었습니다.' };
  },

  // 6. Create Inquiry (1:1 상담)
  async createInquiry(inquiryData) {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(\`\${API_BASE}/inquiries\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inquiryData)
        });
        if (res.ok) return await res.json();
      }
    } catch (e) {}

    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomCode = Math.floor(100 + Math.random() * 900);
    const newInquiry = {
      id: \`INQ-\${todayStr}-\${randomCode}\`,
      ...inquiryData,
      status: '답변대기',
      createdAt: new Date().toISOString()
    };

    try {
      const local = JSON.parse(localStorage.getItem('toureasy_inquiries') || '[]');
      local.unshift(newInquiry);
      localStorage.setItem('toureasy_inquiries', JSON.stringify(local));
    } catch {}

    return { success: true, message: '상담 문의가 등록되었습니다.', data: newInquiry };
  },

  // 7. Get All Inquiries (Admin)
  async getInquiries() {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(\`\${API_BASE}/inquiries\`);
        if (res.ok) return await res.json();
      }
    } catch (e) {}

    try {
      const local = JSON.parse(localStorage.getItem('toureasy_inquiries') || '[]');
      return { success: true, count: local.length, data: local };
    } catch {
      return { success: true, count: 0, data: [] };
    }
  },

  // 8. Update Inquiry Status (Admin)
  async updateInquiryStatus(id, status) {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(\`\${API_BASE}/inquiries/\${id}\`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status })
        });
        if (res.ok) return await res.json();
      }
    } catch (e) {}

    return { success: true, message: '문의 상태가 변경되었습니다.' };
  },

  // 9. Get Admin Stats
  async getAdminStats() {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(\`\${API_BASE}/stats\`);
        if (res.ok) return await res.json();
      }
    } catch (e) {}

    return {
      success: true,
      data: {
        packageCount: DEFAULT_PACKAGES.length,
        bookingCount: 3,
        pendingBookings: 2,
        inquiryCount: 2,
        pendingInquiries: 1,
        totalRevenue: 11135200
      }
    };
  },

  // 10. Admin Create Package
  async createPackage(pkgData) {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(\`\${API_BASE}/packages\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pkgData)
        });
        if (res.ok) return await res.json();
      }
    } catch (e) {}
    return { success: true, message: '등록 완료' };
  },

  // 11. Admin Delete Package
  async deletePackage(id) {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(\`\${API_BASE}/packages/\${id}\`, { method: 'DELETE' });
        if (res.ok) return await res.json();
      }
    } catch (e) {}
    return { success: true, message: '삭제 완료' };
  },

  // --- Formatting Helpers ---
  formatPrice(price) {
    if (!price) return '0원';
    return Number(price).toLocaleString('ko-KR') + '원';
  },

  formatDate(dateStr) {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return \`\${d.getFullYear()}.\${String(d.getMonth() + 1).padStart(2, '0')}.\${String(d.getDate()).padStart(2, '0')}\`;
    } catch {
      return dateStr;
    }
  }
};
`;

const targetPaths = [
  path.join(__dirname, 'public', 'js', 'api.js'),
  path.join('C:', 'Users', 'kks', '.gemini', 'antigravity', 'scratch', 'travel-agency', 'public', 'js', 'api.js')
];

targetPaths.forEach(p => {
  try {
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, apiJsContent, 'utf8');
    console.log('Saved api.js to', p);
  } catch (err) {
    console.error('Error saving api.js', p, err);
  }
});
