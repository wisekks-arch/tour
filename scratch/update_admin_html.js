const fs = require('fs');
const path = require('path');

const adminHtmlPath = path.join(__dirname, '..', 'admin.html');
let content = fs.readFileSync(adminHtmlPath, 'utf8');

// 1. Update Tab Navigation Bar
const oldTabsNav = `<button id="tab-btn-bookings" onclick="switchTab('bookings')" class="flex-1 min-w-[120px] py-2 rounded-xl text-xs font-bold bg-sky-600 text-white shadow-sm transition cursor-pointer">
          예약 접수 목록
        </button>`;

const newTabsNav = `<button id="tab-btn-bookings" onclick="switchTab('bookings')" class="flex-1 min-w-[120px] py-2 rounded-xl text-xs font-bold bg-sky-600 text-white shadow-sm transition cursor-pointer">
          패키지 예약 접수
        </button>
        <button id="tab-btn-hotel-bookings" onclick="switchTab('hotel-bookings')" class="flex-1 min-w-[120px] py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer">
          🏨 호텔 예약 관리
        </button>`;

if (!content.includes('tab-btn-hotel-bookings')) {
  content = content.replace(oldTabsNav, newTabsNav);
}

// 2. Add Hotel Bookings Section HTML
const hotelBookingsSectionHtml = `
      <!-- TAB: Hotel Bookings Management -->
      <section id="tab-content-hotel-bookings" class="hidden bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <!-- Header & Status Tabs -->
        <div class="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 shrink-0">
              <i data-lucide="hotel" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="font-bold text-slate-900 text-sm">실시간 호텔 예약 관리</h3>
              <p class="text-slate-400 text-[11px]">국내외 30개 특급 호텔/리조트 예약 접수, 확정 및 상태 변경</p>
            </div>
          </div>

          <!-- Status Filter Tabs -->
          <div class="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-2xl text-xs font-bold" id="hb-status-tabs">
            <button onclick="filterHotelBookingsByStatus('ALL')" id="hb-tab-ALL" class="px-3 py-1.5 rounded-xl bg-white text-slate-900 shadow-sm transition">
              전체 <span id="hb-count-all" class="text-slate-500 font-mono">0</span>
            </button>
            <button onclick="filterHotelBookingsByStatus('접수완료')" id="hb-tab-접수완료" class="px-3 py-1.5 rounded-xl text-amber-700 hover:bg-white/60 transition">
              접수완료 <span id="hb-count-pending" class="font-mono">0</span>
            </button>
            <button onclick="filterHotelBookingsByStatus('예약확정')" id="hb-tab-예약확정" class="px-3 py-1.5 rounded-xl text-emerald-700 hover:bg-white/60 transition">
              예약확정 <span id="hb-count-confirmed" class="font-mono">0</span>
            </button>
            <button onclick="filterHotelBookingsByStatus('투숙완료')" id="hb-tab-투숙완료" class="px-3 py-1.5 rounded-xl text-sky-700 hover:bg-white/60 transition">
              투숙완료 <span id="hb-count-completed" class="font-mono">0</span>
            </button>
            <button onclick="filterHotelBookingsByStatus('취소')" id="hb-tab-취소" class="px-3 py-1.5 rounded-xl text-rose-700 hover:bg-white/60 transition">
              취소 <span id="hb-count-cancelled" class="font-mono">0</span>
            </button>
          </div>
        </div>

        <!-- Search & Date Filter Panel -->
        <div class="p-4 bg-slate-50/80 border-b border-slate-100 text-xs">
          <form id="form-hotel-booking-search" onsubmit="event.preventDefault(); applyHotelBookingFilters(true);" class="space-y-3">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label class="block font-bold text-slate-700 mb-1">예약번호 검색</label>
                <div class="relative">
                  <input type="text" id="hb-search-id" placeholder="예: HB-20260928" class="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-xs">
                  <i data-lucide="hash" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2"></i>
                </div>
              </div>

              <div>
                <label class="block font-bold text-slate-700 mb-1">호텔명 / 예약자 성명</label>
                <div class="relative">
                  <input type="text" id="hb-search-keyword" placeholder="호텔명 또는 고객명 검색" class="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-xs">
                  <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2"></i>
                </div>
              </div>

              <div class="lg:col-span-2">
                <div class="flex items-center justify-between mb-1">
                  <label class="block font-bold text-slate-700">체크인 기간설정</label>
                </div>
                <div class="flex items-center gap-2">
                  <input type="date" id="hb-search-start-date" class="w-full p-2 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs focus:ring-2 focus:ring-teal-500 shadow-xs">
                  <span class="text-slate-400 font-bold">~</span>
                  <input type="date" id="hb-search-end-date" class="w-full p-2 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs focus:ring-2 focus:ring-teal-500 shadow-xs">
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/70">
              <div class="flex items-center gap-2">
                <span class="text-slate-600 text-xs font-medium">조회 결과: <strong id="hb-filtered-count" class="text-teal-600 font-bold font-mono">0</strong>건</span>
              </div>

              <div class="flex items-center gap-2">
                <button type="button" onclick="resetHotelBookingFilters()" class="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition flex items-center gap-1 cursor-pointer">
                  <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i> 초기화
                </button>
                <button type="submit" class="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs shadow-sm transition flex items-center gap-1.5 cursor-pointer">
                  <i data-lucide="search" class="w-3.5 h-3.5"></i> 검색 / 조회
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- Hotel Bookings Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-600">
            <thead class="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th class="p-3.5 whitespace-nowrap">예약번호 / 접수일</th>
                <th class="p-3.5 whitespace-nowrap">호텔명 & 객실정보</th>
                <th class="p-3.5 whitespace-nowrap">체크인 ~ 체크아웃</th>
                <th class="p-3.5 whitespace-nowrap">예약자 / 연락처</th>
                <th class="p-3.5 whitespace-nowrap">총 결제금액</th>
                <th class="p-3.5 whitespace-nowrap">예약 상태</th>
                <th class="p-3.5 whitespace-nowrap text-center">관리</th>
              </tr>
            </thead>
            <tbody id="hotel-bookings-table-body" class="divide-y divide-slate-100">
              <tr>
                <td colspan="7" class="p-8 text-center text-slate-400 font-medium">
                  호텔 예약 내역을 불러오는 중입니다...
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" id="hb-pagination-container">
          <div class="text-slate-500" id="hb-pagination-info">
            전체 0건 중 0 - 0건 표시
          </div>
          <div class="flex items-center gap-1.5" id="hb-pagination-buttons">
            <!-- Buttons -->
          </div>
        </div>
      </section>
`;

if (!content.includes('tab-content-hotel-bookings')) {
  content = content.replace('<!-- 3. TAB 1: Bookings Management -->', `${hotelBookingsSectionHtml}\n      <!-- 3. TAB 1: Bookings Management -->`);
}

// 3. Add Hotel Booking Detail Modal HTML
const hotelBookingModalHtml = `
  <!-- Hotel Booking Detail Modal -->
  <div id="modal-hotel-booking-detail" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 hidden">
    <div class="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
      <div class="p-5 bg-gradient-to-r from-teal-900 to-slate-900 text-white flex items-center justify-between">
        <div class="flex items-center gap-2">
          <i data-lucide="hotel" class="w-5 h-5 text-teal-400"></i>
          <h3 class="font-bold text-sm" id="modal-hb-id">호텔 예약 상세 정보</h3>
        </div>
        <button onclick="closeModal('modal-hotel-booking-detail')" class="text-slate-400 hover:text-white transition cursor-pointer">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>
      <div class="p-6 space-y-4" id="modal-hb-content">
        <!-- Details injected here -->
      </div>
      <div class="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
        <button onclick="closeModal('modal-hotel-booking-detail')" class="px-5 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700 transition cursor-pointer">
          닫기
        </button>
      </div>
    </div>
  </div>
`;

if (!content.includes('modal-hotel-booking-detail')) {
  content = content.replace('</body>', `${hotelBookingModalHtml}\n</body>`);
}

// 4. Update switchTab function to include 'hotel-bookings'
if (content.includes("['bookings', 'inquiries', 'packages', 'users']")) {
  content = content.replace(
    "['bookings', 'inquiries', 'packages', 'users']",
    "['bookings', 'hotel-bookings', 'inquiries', 'packages', 'users']"
  );
}

// 5. Add Hotel Bookings JS logic
const hotelBookingsJsLogic = `
    // --- Hotel Bookings Management State & Logic ---
    let cachedHotelBookings = [];
    let hotelBookingFilterState = {
      id: '',
      keyword: '',
      startDate: '',
      endDate: '',
      status: 'ALL',
      currentPage: 1,
      pageSize: 10
    };

    async function loadHotelBookingsAdmin() {
      try {
        const res = await TourAPI.getHotelBookings();
        if (res && res.data) {
          cachedHotelBookings = res.data;
          updateHotelBookingBadgeCounts(cachedHotelBookings);
          applyHotelBookingFilters();
        }
      } catch (err) {
        console.error('Error loading hotel bookings in admin:', err);
      }
    }
    window.loadHotelBookingsAdmin = loadHotelBookingsAdmin;

    function updateHotelBookingBadgeCounts(bookings) {
      const total = bookings.length;
      const pending = bookings.filter(b => b.status === '접수완료').length;
      const confirmed = bookings.filter(b => b.status === '예약확정').length;
      const completed = bookings.filter(b => b.status === '투숙완료').length;
      const cancelled = bookings.filter(b => b.status === '취소').length;

      if (document.getElementById('hb-count-all')) document.getElementById('hb-count-all').textContent = total;
      if (document.getElementById('hb-count-pending')) document.getElementById('hb-count-pending').textContent = pending;
      if (document.getElementById('hb-count-confirmed')) document.getElementById('hb-count-confirmed').textContent = confirmed;
      if (document.getElementById('hb-count-completed')) document.getElementById('hb-count-completed').textContent = completed;
      if (document.getElementById('hb-count-cancelled')) document.getElementById('hb-count-cancelled').textContent = cancelled;
    }

    function filterHotelBookingsByStatus(status) {
      hotelBookingFilterState.status = status;
      ['ALL', '접수완료', '예약확정', '투숙완료', '취소'].forEach(st => {
        const btn = document.getElementById(\`hb-tab-\${st}\`);
        if (!btn) return;
        if (st === status) {
          btn.className = 'px-3 py-1.5 rounded-xl bg-white text-slate-900 shadow-sm transition font-bold';
        } else {
          const colorClass = st === '접수완료' ? 'text-amber-700' :
                             st === '예약확정' ? 'text-emerald-700' :
                             st === '투숙완료' ? 'text-sky-700' :
                             st === '취소' ? 'text-rose-700' : 'text-slate-600';
          btn.className = \`px-3 py-1.5 rounded-xl \${colorClass} hover:bg-white/60 transition font-bold\`;
        }
      });
      applyHotelBookingFilters(true);
    }
    window.filterHotelBookingsByStatus = filterHotelBookingsByStatus;

    function resetHotelBookingFilters() {
      if (document.getElementById('hb-search-id')) document.getElementById('hb-search-id').value = '';
      if (document.getElementById('hb-search-keyword')) document.getElementById('hb-search-keyword').value = '';
      if (document.getElementById('hb-search-start-date')) document.getElementById('hb-search-start-date').value = '';
      if (document.getElementById('hb-search-end-date')) document.getElementById('hb-search-end-date').value = '';
      filterHotelBookingsByStatus('ALL');
    }
    window.resetHotelBookingFilters = resetHotelBookingFilters;

    function applyHotelBookingFilters(resetPage = false) {
      const idVal = document.getElementById('hb-search-id')?.value.trim().toLowerCase() || '';
      const kwVal = document.getElementById('hb-search-keyword')?.value.trim().toLowerCase() || '';
      const startDate = document.getElementById('hb-search-start-date')?.value || '';
      const endDate = document.getElementById('hb-search-end-date')?.value || '';

      hotelBookingFilterState.id = idVal;
      hotelBookingFilterState.keyword = kwVal;
      hotelBookingFilterState.startDate = startDate;
      hotelBookingFilterState.endDate = endDate;

      if (resetPage) {
        hotelBookingFilterState.currentPage = 1;
      }

      let filtered = cachedHotelBookings.filter(b => {
        if (hotelBookingFilterState.status !== 'ALL' && b.status !== hotelBookingFilterState.status) {
          return false;
        }
        if (idVal && !(b.id && b.id.toLowerCase().includes(idVal))) {
          return false;
        }
        if (kwVal) {
          const matchHotel = b.hotelName && b.hotelName.toLowerCase().includes(kwVal);
          const matchRoom = b.roomTypeName && b.roomTypeName.toLowerCase().includes(kwVal);
          const matchName = b.customerName && b.customerName.toLowerCase().includes(kwVal);
          const matchPhone = b.customerPhone && b.customerPhone.includes(kwVal);
          if (!matchHotel && !matchRoom && !matchName && !matchPhone) return false;
        }
        if (startDate && b.checkInDate && b.checkInDate < startDate) {
          return false;
        }
        if (endDate && b.checkInDate && b.checkInDate > endDate) {
          return false;
        }
        return true;
      });

      const countEl = document.getElementById('hb-filtered-count');
      if (countEl) countEl.textContent = filtered.length;

      // Pagination
      const totalCount = filtered.length;
      const pageSize = hotelBookingFilterState.pageSize;
      const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
      if (hotelBookingFilterState.currentPage > totalPages) hotelBookingFilterState.currentPage = totalPages;
      const currentPage = hotelBookingFilterState.currentPage;

      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize, totalCount);
      const pageItems = filtered.slice(startIndex, endIndex);

      renderHotelBookingsAdmin(pageItems, startIndex);
      renderHotelBookingPagination(totalCount, startIndex, endIndex, currentPage, totalPages);
    }
    window.applyHotelBookingFilters = applyHotelBookingFilters;

    function renderHotelBookingsAdmin(items, startIndex) {
      const tbody = document.getElementById('hotel-bookings-table-body');
      if (!tbody) return;

      if (items.length === 0) {
        tbody.innerHTML = \`
          <tr>
            <td colspan="7" class="p-8 text-center text-slate-400 font-medium">
              조건에 맞는 호텔 예약 내역이 없습니다.
            </td>
          </tr>
        \`;
        return;
      }

      tbody.innerHTML = items.map((b) => {
        const createdDate = b.createdAt ? new Date(b.createdAt).toLocaleDateString('ko-KR') : '-';
        
        let statusBadge = '';
        if (b.status === '접수완료') {
          statusBadge = '<span class="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-extrabold text-[11px]">접수완료</span>';
        } else if (b.status === '예약확정') {
          statusBadge = '<span class="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-extrabold text-[11px]">예약확정</span>';
        } else if (b.status === '투숙완료') {
          statusBadge = '<span class="px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 font-extrabold text-[11px]">투숙완료</span>';
        } else {
          statusBadge = '<span class="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 font-extrabold text-[11px]">취소</span>';
        }

        return \`
          <tr class="hover:bg-slate-50/80 transition">
            <td class="p-3.5">
              <div class="font-mono font-bold text-slate-900">\${b.id}</div>
              <div class="text-[11px] text-slate-400 mt-0.5">\${createdDate}</div>
            </td>
            <td class="p-3.5">
              <div class="font-bold text-slate-800">\${b.hotelName}</div>
              <div class="text-[11px] text-teal-600 font-semibold">\${b.roomTypeName} (\${b.roomCount || 1}개)</div>
            </td>
            <td class="p-3.5">
              <div class="font-medium text-slate-800">\${b.checkInDate} ~ \${b.checkOutDate}</div>
              <div class="text-[11px] text-slate-500 font-bold">\${b.nights || 1}박 · 투숙인원 \${b.adults || 2}명\${b.children ? ' (아동 ' + b.children + '명)' : ''}</div>
            </td>
            <td class="p-3.5">
              <div class="font-bold text-slate-800">\${b.customerName || '고객'}</div>
              <div class="text-[11px] text-slate-500 font-mono">\${b.customerPhone || '-'}</div>
              <div class="text-[10px] text-slate-400 truncate max-w-[140px]">\${b.customerEmail || '-'}</div>
            </td>
            <td class="p-3.5">
              <div class="font-black text-slate-900">\${TourAPI.formatPrice ? TourAPI.formatPrice(b.totalPrice) : b.totalPrice + '원'}</div>
              <div class="text-[10.5px] text-slate-400">1박 \${TourAPI.formatPrice ? TourAPI.formatPrice(b.roomPricePerNight) : b.roomPricePerNight + '원'}</div>
            </td>
            <td class="p-3.5">
              <div class="mb-1.5">\${statusBadge}</div>
              <select onchange="changeHotelBookingStatus('\${b.id}', this.value)" class="text-[11px] font-bold px-2 py-1 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 shadow-2xs cursor-pointer">
                <option value="접수완료" \${b.status === '접수완료' ? 'selected' : ''}>접수완료</option>
                <option value="예약확정" \${b.status === '예약확정' ? 'selected' : ''}>예약확정</option>
                <option value="투숙완료" \${b.status === '투숙완료' ? 'selected' : ''}>투숙완료</option>
                <option value="취소" \${b.status === '취소' ? 'selected' : ''}>취소</option>
              </select>
            </td>
            <td class="p-3.5 text-center">
              <div class="flex items-center justify-center gap-1.5">
                <button onclick="viewHotelBookingDetails('\${b.id}')" class="px-2 py-1 bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold rounded-lg text-[11px] border border-teal-200 transition cursor-pointer" title="상세보기">
                  상세
                </button>
                <button onclick="handleDeleteHotelBooking('\${b.id}')" class="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-lg text-[11px] border border-rose-200 transition cursor-pointer" title="삭제">
                  삭제
                </button>
              </div>
            </td>
          </tr>
        \`;
      }).join('');
      if (window.lucide) lucide.createIcons();
    }

    function renderHotelBookingPagination(totalCount, startIndex, endIndex, currentPage, totalPages) {
      const infoEl = document.getElementById('hb-pagination-info');
      const btnContainer = document.getElementById('hb-pagination-buttons');
      if (!infoEl || !btnContainer) return;

      if (totalCount === 0) {
        infoEl.textContent = '전체 0건 중 0건';
        btnContainer.innerHTML = '';
        return;
      }

      infoEl.textContent = \`전체 \${totalCount}건 중 \${startIndex + 1} - \${endIndex}건 표시\`;

      let btnsHtml = '';
      btnsHtml += \`
        <button onclick="goToHotelBookingPage(\${currentPage - 1})" \${currentPage === 1 ? 'disabled class="px-2.5 py-1 text-slate-300 border border-slate-200 rounded-lg text-xs"' : 'class="px-2.5 py-1 text-slate-700 hover:bg-slate-200 border border-slate-200 rounded-lg text-xs font-bold transition cursor-pointer"'}>
          이전
        </button>
      \`;

      for (let p = 1; p <= totalPages; p++) {
        const isActive = p === currentPage;
        btnsHtml += \`
          <button onclick="goToHotelBookingPage(\${p})" class="px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer \${isActive ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200 border border-slate-200'}">
            \${p}
          </button>
        \`;
      }

      btnsHtml += \`
        <button onclick="goToHotelBookingPage(\${currentPage + 1})" \${currentPage === totalPages ? 'disabled class="px-2.5 py-1 text-slate-300 border border-slate-200 rounded-lg text-xs"' : 'class="px-2.5 py-1 text-slate-700 hover:bg-slate-200 border border-slate-200 rounded-lg text-xs font-bold transition cursor-pointer"'}>
          다음
        </button>
      \`;

      btnContainer.innerHTML = btnsHtml;
    }

    function goToHotelBookingPage(p) {
      hotelBookingFilterState.currentPage = p;
      applyHotelBookingFilters(false);
    }
    window.goToHotelBookingPage = goToHotelBookingPage;

    async function changeHotelBookingStatus(id, newStatus) {
      try {
        const res = await TourAPI.updateHotelBookingStatus(id, newStatus);
        if (res && res.success) {
          const item = cachedHotelBookings.find(b => b.id === id);
          if (item) item.status = newStatus;
          updateHotelBookingBadgeCounts(cachedHotelBookings);
          applyHotelBookingFilters(false);
          showToast(\`호텔 예약 상태가 '\${newStatus}'(으)로 변경되었습니다.\`);
        } else {
          alert('상태 변경 실패');
        }
      } catch (err) {
        alert('상태 변경 중 오류: ' + err.message);
      }
    }
    window.changeHotelBookingStatus = changeHotelBookingStatus;

    async function handleDeleteHotelBooking(id) {
      if (!confirm('정말 이 호텔 예약 내역을 삭제하시겠습니까?')) return;
      try {
        await TourAPI.deleteHotelBooking(id);
        cachedHotelBookings = cachedHotelBookings.filter(b => b.id !== id);
        updateHotelBookingBadgeCounts(cachedHotelBookings);
        applyHotelBookingFilters(false);
        showToast('호텔 예약 내역이 삭제되었습니다.');
      } catch (err) {
        alert('삭제 실패: ' + err.message);
      }
    }
    window.handleDeleteHotelBooking = handleDeleteHotelBooking;

    function viewHotelBookingDetails(id) {
      const bk = cachedHotelBookings.find(b => b.id === id);
      if (!bk) return;

      document.getElementById('modal-hb-id').textContent = \`호텔 예약 상세 (\${bk.id})\`;
      document.getElementById('modal-hb-content').innerHTML = \`
        <div class="p-3.5 bg-slate-50 rounded-2xl space-y-2 border border-slate-100 text-xs text-slate-700">
          <div class="flex justify-between border-b border-slate-200/80 pb-2">
            <span class="font-bold text-slate-900">\${bk.hotelName}</span>
            <span class="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-extrabold text-[10.5px]">\${bk.status}</span>
          </div>
          <p><strong>객실 타입:</strong> \${bk.roomTypeName} (\${bk.roomCount || 1}개)</p>
          <p><strong>체크인 / 아웃:</strong> \${bk.checkInDate} ~ \${bk.checkOutDate} (\${bk.nights || 1}박)</p>
          <p><strong>투숙 인원:</strong> 성인 \${bk.adults || 2}명\${bk.children ? ', 아동 ' + bk.children + '명' : ''}</p>
          <p><strong>고객 성명:</strong> \${bk.customerName || '고객'}</p>
          <p><strong>연락처:</strong> \${bk.customerPhone || '미기재'}</p>
          <p><strong>이메일:</strong> \${bk.customerEmail || '미기재'}</p>
          <p><strong>총 결제금액:</strong> <span class="text-teal-600 font-black text-sm">\${TourAPI.formatPrice ? TourAPI.formatPrice(bk.totalPrice) : bk.totalPrice + '원'}</span></p>
        </div>
        <div class="p-3.5 bg-amber-50 rounded-2xl border border-amber-100 text-xs">
          <strong class="text-amber-900 block mb-1">고객 특별 요청사항:</strong>
          <p class="text-slate-700 whitespace-pre-wrap">\${bk.specialRequests || '특별 요청사항이 없습니다.'}</p>
        </div>
      \`;

      document.getElementById('modal-hotel-booking-detail').classList.remove('hidden');
      if (window.lucide) lucide.createIcons();
    }
    window.viewHotelBookingDetails = viewHotelBookingDetails;
`;

if (!content.includes('loadHotelBookingsAdmin()')) {
  // Add hotelBookingsJsLogic before switchTab
  content = content.replace('function switchTab(tabKey) {', `${hotelBookingsJsLogic}\n    function switchTab(tabKey) {`);
}

// Call loadHotelBookingsAdmin in loadAllAdminData
if (!content.includes('await loadHotelBookingsAdmin();')) {
  content = content.replace('await loadUsersData();', `await loadUsersData();\n        await loadHotelBookingsAdmin();`);
}

fs.writeFileSync(adminHtmlPath, content, 'utf8');
console.log('Successfully updated admin.html with Hotel Booking Management corner.');
