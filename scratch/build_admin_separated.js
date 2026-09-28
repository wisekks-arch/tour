const fs = require('fs');
const path = require('path');

const adminHtmlPath = path.join(__dirname, '..', 'admin.html');
let html = fs.readFileSync(adminHtmlPath, 'utf8');

// 1. Update Header Actions: Include both Package & Hotel creation buttons
const oldHeaderButtons = `<button onclick="openNewPackageModal()" class="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition cursor-pointer">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i> 신규 상품 등록
          </button>`;

const newHeaderButtons = `
          <button onclick="openNewPackageModal()" class="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition cursor-pointer">
            <i data-lucide="plus-circle" class="w-3.5 h-3.5"></i> + 패키지 등록
          </button>
          <button onclick="openNewHotelModal()" class="px-3.5 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition cursor-pointer">
            <i data-lucide="building" class="w-3.5 h-3.5"></i> + 호텔 등록
          </button>`;

if (html.includes(oldHeaderButtons)) {
  html = html.replace(oldHeaderButtons, newHeaderButtons);
}

// 2. Update KPI Stats Grid to 6 separated cards
const oldKpiGrid = `<!-- 1. KPI Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span class="text-xs text-slate-400 font-semibold block">총 접수 예약</span>
            <span class="text-2xl font-black text-slate-900 mt-1 block" id="stat-booking-count">0건</span>
            <span class="text-[11px] text-amber-600 font-bold" id="stat-pending-bookings">대기: 0건</span>
          </div>
          <div class="w-11 h-11 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <i data-lucide="calendar-check" class="w-5 h-5"></i>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span class="text-xs text-slate-400 font-semibold block">1:1 맞춤 문의</span>
            <span class="text-2xl font-black text-slate-900 mt-1 block" id="stat-inquiry-count">0건</span>
            <span class="text-[11px] text-rose-600 font-bold" id="stat-pending-inquiries">미답변: 0건</span>
          </div>
          <div class="w-11 h-11 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <i data-lucide="message-square" class="w-5 h-5"></i>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span class="text-xs text-slate-400 font-semibold block">총 등록 상품</span>
            <span class="text-2xl font-black text-slate-900 mt-1 block" id="stat-package-count">75개</span>
            <span class="text-[11px] text-emerald-600 font-bold" id="stat-package-subtext">운영 74 · 미운영 1</span>
          </div>
          <div class="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <i data-lucide="plane" class="w-5 h-5"></i>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span class="text-xs text-slate-400 font-semibold block">가입 회원 현황</span>
            <span class="text-2xl font-black text-purple-600 mt-1 block" id="stat-user-count">0명</span>
            <span class="text-[11px] text-purple-600 font-bold" id="stat-user-subtext">일반 0 · 관리자 0</span>
          </div>
          <div class="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <i data-lucide="users" class="w-5 h-5"></i>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span class="text-xs text-slate-400 font-semibold block">누적 예상 견적액</span>
            <span class="text-2xl font-black text-sky-600 mt-1 block truncate max-w-[130px]" id="stat-total-revenue">0원</span>
            <span class="text-[11px] text-slate-400">접수 기준 총액</span>
          </div>
          <div class="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <i data-lucide="coins" class="w-5 h-5"></i>
          </div>
        </div>

      </div>`;

const newKpiGrid = `<!-- 1. KPI Stats Cards (Separated: Package vs Hotel) -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        
        <!-- Card 1: 패키지 예약 -->
        <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[11px] text-slate-400 font-bold">패키지 예약</span>
            <div class="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <i data-lucide="plane-takeoff" class="w-4 h-4"></i>
            </div>
          </div>
          <div>
            <span class="text-xl sm:text-2xl font-black text-slate-900 block" id="stat-booking-count">0건</span>
            <span class="text-[10.5px] text-amber-600 font-bold" id="stat-pending-bookings">대기: 0건</span>
          </div>
        </div>

        <!-- Card 2: 호텔 예약 -->
        <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[11px] text-slate-400 font-bold">호텔 예약</span>
            <div class="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <i data-lucide="hotel" class="w-4 h-4"></i>
            </div>
          </div>
          <div>
            <span class="text-xl sm:text-2xl font-black text-slate-900 block" id="stat-hotel-booking-count">0건</span>
            <span class="text-[10.5px] text-amber-600 font-bold" id="stat-pending-hotel-bookings">접수대기: 0건</span>
          </div>
        </div>

        <!-- Card 3: 패키지 상품 -->
        <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[11px] text-slate-400 font-bold">패키지 상품</span>
            <div class="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <i data-lucide="map" class="w-4 h-4"></i>
            </div>
          </div>
          <div>
            <span class="text-xl sm:text-2xl font-black text-slate-900 block" id="stat-package-count">75개</span>
            <span class="text-[10.5px] text-emerald-600 font-bold" id="stat-package-subtext">운영 74 · 미운영 1</span>
          </div>
        </div>

        <!-- Card 4: 호텔 상품 -->
        <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[11px] text-slate-400 font-bold">호텔 상품</span>
            <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <i data-lucide="building-2" class="w-4 h-4"></i>
            </div>
          </div>
          <div>
            <span class="text-xl sm:text-2xl font-black text-slate-900 block" id="stat-hotel-count">30개</span>
            <span class="text-[10.5px] text-emerald-600 font-bold" id="stat-hotel-subtext">운영 30 · 미운영 0</span>
          </div>
        </div>

        <!-- Card 5: 1:1 상담 문의 -->
        <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[11px] text-slate-400 font-bold">1:1 상담문의</span>
            <div class="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <i data-lucide="message-square" class="w-4 h-4"></i>
            </div>
          </div>
          <div>
            <span class="text-xl sm:text-2xl font-black text-slate-900 block" id="stat-inquiry-count">0건</span>
            <span class="text-[10.5px] text-rose-600 font-bold" id="stat-pending-inquiries">미답변: 0건</span>
          </div>
        </div>

        <!-- Card 6: 회원 가입 현황 -->
        <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[11px] text-slate-400 font-bold">가입 회원</span>
            <div class="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <i data-lucide="users" class="w-4 h-4"></i>
            </div>
          </div>
          <div>
            <span class="text-xl sm:text-2xl font-black text-purple-600 block" id="stat-user-count">0명</span>
            <span class="text-[10.5px] text-purple-600 font-bold" id="stat-user-subtext">일반 0 · 관리자 0</span>
          </div>
        </div>

      </div>`;

if (html.includes(oldKpiGrid)) {
  html = html.replace(oldKpiGrid, newKpiGrid);
}

// 3. Update Tabs Navigation Bar: Distinct grouping for Package vs Hotel vs Common
const oldTabsBlock = html.substring(html.indexOf('<!-- 2. Tabs Navigation -->'), html.indexOf('<!-- TAB: Hotel Bookings Management -->'));

const newTabsBlock = `<!-- 2. Categorized Tabs Navigation -->
      <div class="bg-white rounded-3xl border border-slate-200 p-2 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        
        <!-- Group 1: 패키지 여행 부문 -->
        <div class="flex flex-wrap items-center gap-1.5 p-1.5 bg-sky-50/80 rounded-2xl border border-sky-100">
          <span class="text-[11px] font-black text-sky-900 px-2 py-1 flex items-center gap-1 shrink-0">
            <i data-lucide="plane" class="w-3.5 h-3.5 text-sky-600"></i> 여행 패키지:
          </span>
          <button id="tab-btn-bookings" onclick="switchTab('bookings')" class="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold bg-sky-600 text-white shadow-xs transition cursor-pointer">
            패키지 예약 목록
          </button>
          <button id="tab-btn-packages" onclick="switchTab('packages')" class="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer">
            패키지 상품 관리
          </button>
        </div>

        <!-- Group 2: 호텔 & 리조트 부문 -->
        <div class="flex flex-wrap items-center gap-1.5 p-1.5 bg-teal-50/80 rounded-2xl border border-teal-100">
          <span class="text-[11px] font-black text-teal-900 px-2 py-1 flex items-center gap-1 shrink-0">
            <i data-lucide="hotel" class="w-3.5 h-3.5 text-teal-600"></i> 호텔 & 리조트:
          </span>
          <button id="tab-btn-hotel-bookings" onclick="switchTab('hotel-bookings')" class="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer">
            호텔 예약 목록
          </button>
          <button id="tab-btn-hotels" onclick="switchTab('hotels')" class="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer">
            호텔 상품 관리
          </button>
        </div>

        <!-- Group 3: 고객 상담 & 회원 관리 -->
        <div class="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl">
          <button id="tab-btn-inquiries" onclick="switchTab('inquiries')" class="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer">
            1:1 상담 문의
          </button>
          <button id="tab-btn-users" onclick="switchTab('users')" class="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer">
            👥 회원 현황
          </button>
        </div>

      </div>

      `;

if (oldTabsBlock && oldTabsBlock.length > 20) {
  html = html.replace(oldTabsBlock, newTabsBlock);
}

// 4. Add Tab Section for [호텔 상품 관리] (tab-content-hotels)
const hotelsProductSectionHtml = `
      <!-- TAB: Hotels Product Management (호텔 상품 관리) -->
      <section id="tab-content-hotels" class="hidden bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
        
        <!-- Header & Action Bar -->
        <div class="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 shrink-0">
              <i data-lucide="building-2" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="font-bold text-slate-900 text-sm">국내외 특급 호텔 & 럭셔리 리조트 상품 관리</h3>
              <p class="text-slate-400 text-[11px]">30개 호텔 상품의 운영/미운영(노출/숨김) 설정, 1박 요금 및 객실 수정</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="openNewHotelModal()" class="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer">
              <i data-lucide="plus" class="w-4 h-4"></i> 신규 호텔 상품 등록
            </button>
          </div>
        </div>

        <!-- Filter & Search Bar -->
        <div class="px-5 space-y-3">
          <!-- Region Tabs -->
          <div class="flex flex-wrap items-center gap-1.5 text-xs font-bold" id="hp-region-filter-group">
            <button onclick="filterHotelsAdminByRegion('전체')" id="hp-reg-btn-전체" class="px-3 py-1.5 rounded-xl bg-teal-600 text-white shadow-xs transition">
              전체 지역 (<span id="hp-count-all">30</span>)
            </button>
            <button onclick="filterHotelsAdminByRegion('국내')" id="hp-reg-btn-국내" class="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition">
              국내/제주 (<span id="hp-count-kr">6</span>)
            </button>
            <button onclick="filterHotelsAdminByRegion('동남아')" id="hp-reg-btn-동남아" class="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition">
              동남아 (<span id="hp-count-sea">8</span>)
            </button>
            <button onclick="filterHotelsAdminByRegion('일본/동아시아')" id="hp-reg-btn-일본" class="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition">
              일본/동아시아 (<span id="hp-count-jp">6</span>)
            </button>
            <button onclick="filterHotelsAdminByRegion('유럽')" id="hp-reg-btn-유럽" class="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition">
              유럽 (<span id="hp-count-eu">5</span>)
            </button>
            <button onclick="filterHotelsAdminByRegion('미주/대양주')" id="hp-reg-btn-미주" class="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition">
              미주/대양주 (<span id="hp-count-us">5</span>)
            </button>
          </div>

          <!-- Secondary Filters & Search -->
          <div class="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-2">
              <span class="text-slate-500 font-bold shrink-0">운영상태:</span>
              <div class="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
                <button onclick="filterHotelsAdminByStatus('ALL')" id="hp-st-btn-ALL" class="px-2.5 py-1 rounded-lg bg-teal-600 text-white font-bold transition">전체</button>
                <button onclick="filterHotelsAdminByStatus('운영중')" id="hp-st-btn-운영중" class="px-2.5 py-1 rounded-lg text-slate-600 hover:bg-slate-100 font-bold transition">🟢 운영중</button>
                <button onclick="filterHotelsAdminByStatus('미운영')" id="hp-st-btn-미운영" class="px-2.5 py-1 rounded-lg text-slate-600 hover:bg-slate-100 font-bold transition">⚪ 미운영</button>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <div class="relative flex-1 sm:w-64">
                <input 
                  type="text" 
                  id="hp-search-input" 
                  placeholder="호텔명, 도시, 부대시설 검색..." 
                  class="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500"
                  oninput="handleHotelAdminSearch(this.value)"
                >
                <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2"></i>
              </div>
              <span class="text-slate-400 font-medium whitespace-nowrap">조회: <strong id="hp-result-count" class="text-teal-600 font-bold font-mono">30</strong>개</span>
            </div>
          </div>
        </div>

        <!-- Hotel Cards Grid -->
        <div class="p-5 pt-0">
          <div id="admin-hotels-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <!-- Dynamic Hotel Cards -->
          </div>
        </div>

      </section>
`;

if (!html.includes('id="tab-content-hotels"')) {
  html = html.replace('<!-- TAB: Hotel Bookings Management -->', `${hotelsProductSectionHtml}\n      <!-- TAB: Hotel Bookings Management -->`);
}

// 5. Add Modals: New Hotel Modal & Edit Hotel Modal
const hotelModalsHtml = `
  <!-- 1. New Hotel Modal -->
  <div id="modal-new-hotel" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 hidden overflow-y-auto">
    <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden my-auto">
      <div class="p-5 bg-gradient-to-r from-teal-800 to-slate-900 text-white flex items-center justify-between shrink-0">
        <div class="flex items-center gap-2">
          <i data-lucide="building" class="w-5 h-5 text-teal-400"></i>
          <h3 class="font-bold text-sm">신규 특급 호텔 / 리조트 상품 등록</h3>
        </div>
        <button onclick="closeModal('modal-new-hotel')" class="text-slate-400 hover:text-white transition cursor-pointer">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <form id="form-new-hotel" onsubmit="handleSaveNewHotel(event)" class="p-6 space-y-4 overflow-y-auto flex-grow text-xs">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-slate-700 mb-1">호텔명 (국문) *</label>
            <input type="text" id="nh-name" required placeholder="예: 시그니엘 서울" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">호텔 영문명</label>
            <input type="text" id="nh-name-en" placeholder="예: Signiel Seoul" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block font-bold text-slate-700 mb-1">지역 구분 *</label>
            <select id="nh-region" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
              <option value="국내">대한민국 / 제주</option>
              <option value="동남아">동남아 / 휴양지</option>
              <option value="일본/동아시아">일본 / 동아시아</option>
              <option value="유럽">유럽</option>
              <option value="미주/대양주">미주 / 대양주</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">국가 *</label>
            <input type="text" id="nh-country" required placeholder="예: 대한민국, 베트남" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">도시 / 위치 *</label>
            <input type="text" id="nh-city" required placeholder="예: 서울 송파구, 다낭" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block font-bold text-slate-700 mb-1">호텔 등급 (성급)</label>
            <select id="nh-star" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
              <option value="5" selected>★★★★★ 5성급 럭셔리</option>
              <option value="4">★★★★ 4성급 프리미엄</option>
              <option value="3">★★★ 3성급 스탠다드</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">1박 판매가 (원) *</label>
            <input type="number" id="nh-price" required placeholder="예: 450000" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">정상가 (원)</label>
            <input type="number" id="nh-original-price" placeholder="예: 550000" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
          </div>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">대표 이미지 URL *</label>
          <input type="url" id="nh-thumbnail" required placeholder="https://images.unsplash.com/..." class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">부대시설 태그 (쉼표 구분)</label>
          <input type="text" id="nh-amenities" placeholder="예: 인피니티풀, 미슐랭 다이닝, 스파, 전용 비치, 조식 포함" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">호텔 소개 요약</label>
          <textarea id="nh-summary" rows="3" placeholder="호텔의 주요 특징 및 조망, 편의시설 안내..." class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500"></textarea>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">운영 상태</label>
          <select id="nh-status" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500 font-bold">
            <option value="운영중">🟢 운영중 (고객 노출)</option>
            <option value="미운영">⚪ 미운영 (고객 숨김)</option>
          </select>
        </div>

        <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-2 shrink-0">
          <button type="button" onclick="closeModal('modal-new-hotel')" class="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold transition cursor-pointer">
            취소
          </button>
          <button type="submit" class="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold transition shadow-md cursor-pointer">
            호텔 상품 등록 완료
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- 2. Edit Hotel Modal -->
  <div id="modal-edit-hotel" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 hidden overflow-y-auto">
    <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden my-auto">
      <div class="p-5 bg-gradient-to-r from-teal-900 to-slate-900 text-white flex items-center justify-between shrink-0">
        <div class="flex items-center gap-2">
          <i data-lucide="edit-3" class="w-5 h-5 text-teal-400"></i>
          <div>
            <h3 class="font-bold text-sm">호텔 상품 정보 수정</h3>
            <span class="text-[10px] text-teal-300 font-mono" id="edit-hotel-id-badge">ID: -</span>
          </div>
        </div>
        <button onclick="closeModal('modal-edit-hotel')" class="text-slate-400 hover:text-white transition cursor-pointer">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <form id="form-edit-hotel" onsubmit="handleSaveEditHotel(event)" class="p-6 space-y-4 overflow-y-auto flex-grow text-xs">
        <input type="hidden" id="eh-id">

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-slate-700 mb-1">호텔명 (국문) *</label>
            <input type="text" id="eh-name" required class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">호텔 영문명</label>
            <input type="text" id="eh-name-en" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block font-bold text-slate-700 mb-1">지역 구분 *</label>
            <select id="eh-region" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
              <option value="국내">대한민국 / 제주</option>
              <option value="동남아">동남아 / 휴양지</option>
              <option value="일본/동아시아">일본 / 동아시아</option>
              <option value="유럽">유럽</option>
              <option value="미주/대양주">미주 / 대양주</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">국가 *</label>
            <input type="text" id="eh-country" required class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">도시 / 위치 *</label>
            <input type="text" id="eh-city" required class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block font-bold text-slate-700 mb-1">호텔 등급 (성급)</label>
            <select id="eh-star" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
              <option value="5">★★★★★ 5성급 럭셔리</option>
              <option value="4">★★★★ 4성급 프리미엄</option>
              <option value="3">★★★ 3성급 스탠다드</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">1박 판매가 (원) *</label>
            <input type="number" id="eh-price" required class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">정상가 (원)</label>
            <input type="number" id="eh-original-price" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
          </div>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">대표 이미지 URL *</label>
          <input type="url" id="eh-thumbnail" required class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">부대시설 태그 (쉼표 구분)</label>
          <input type="text" id="eh-amenities" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">호텔 소개 요약</label>
          <textarea id="eh-summary" rows="3" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500"></textarea>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">운영 상태</label>
          <select id="eh-status" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500 font-bold">
            <option value="운영중">🟢 운영중 (고객 노출)</option>
            <option value="미운영">⚪ 미운영 (고객 숨김)</option>
          </select>
        </div>

        <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-2 shrink-0">
          <button type="button" onclick="closeModal('modal-edit-hotel')" class="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold transition cursor-pointer">
            취소
          </button>
          <button type="submit" class="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold transition shadow-md cursor-pointer">
            수정 내용 저장
          </button>
        </div>
      </form>
    </div>
  </div>
`;

if (!html.includes('id="modal-new-hotel"')) {
  html = html.replace('</body>', `${hotelModalsHtml}\n</body>`);
}

// 6. Update switchTab and Add Hotel Products JavaScript Logic
const hotelAdminJsLogic = `
    // --- Hotel Products Management State & Logic ---
    let cachedHotelsAdmin = [];
    let hotelProductFilterState = {
      region: '전체',
      status: 'ALL',
      search: ''
    };

    async function loadHotelsAdmin() {
      try {
        const res = await TourAPI.getHotels({ includeInactive: true });
        if (res && res.data) {
          cachedHotelsAdmin = res.data;
          updateHotelProductFilterCounts(cachedHotelsAdmin);
          filterHotelsAdmin();
        }
      } catch (err) {
        console.error('Error loading hotels in admin:', err);
      }
    }
    window.loadHotelsAdmin = loadHotelsAdmin;

    function updateHotelProductFilterCounts(hotels) {
      const countAll = hotels.length;
      const countKr = hotels.filter(h => h.region === '국내').length;
      const countSea = hotels.filter(h => h.region === '동남아').length;
      const countJp = hotels.filter(h => h.region === '일본/동아시아').length;
      const countEu = hotels.filter(h => h.region === '유럽').length;
      const countUs = hotels.filter(h => h.region === '미주/대양주').length;

      if (document.getElementById('hp-count-all')) document.getElementById('hp-count-all').textContent = countAll;
      if (document.getElementById('hp-count-kr')) document.getElementById('hp-count-kr').textContent = countKr;
      if (document.getElementById('hp-count-sea')) document.getElementById('hp-count-sea').textContent = countSea;
      if (document.getElementById('hp-count-jp')) document.getElementById('hp-count-jp').textContent = countJp;
      if (document.getElementById('hp-count-eu')) document.getElementById('hp-count-eu').textContent = countEu;
      if (document.getElementById('hp-count-us')) document.getElementById('hp-count-us').textContent = countUs;

      const activeCount = hotels.filter(h => h.status !== '미운영' && h.isActive !== false).length;
      const inactiveCount = countAll - activeCount;
      const elHotelCount = document.getElementById('stat-hotel-count');
      const elHotelSub = document.getElementById('stat-hotel-subtext');
      if (elHotelCount) elHotelCount.textContent = \`\${countAll}개\`;
      if (elHotelSub) elHotelSub.textContent = \`운영 \${activeCount} · 미운영 \${inactiveCount}\`;
    }

    function filterHotelsAdminByRegion(region) {
      hotelProductFilterState.region = region;
      const regKeys = ['전체', '국내', '동남아', '일본', '유럽', '미주'];
      const regValues = ['전체', '국내', '동남아', '일본/동아시아', '유럽', '미주/대양주'];

      regKeys.forEach((k, idx) => {
        const btn = document.getElementById(\`hp-reg-btn-\${k}\`);
        if (!btn) return;
        if (regValues[idx] === region) {
          btn.className = 'px-3 py-1.5 rounded-xl bg-teal-600 text-white shadow-xs transition font-bold cursor-pointer';
        } else {
          btn.className = 'px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition font-bold cursor-pointer';
        }
      });
      filterHotelsAdmin();
    }
    window.filterHotelsAdminByRegion = filterHotelsAdminByRegion;

    function filterHotelsAdminByStatus(status) {
      hotelProductFilterState.status = status;
      ['ALL', '운영중', '미운영'].forEach(st => {
        const btn = document.getElementById(\`hp-st-btn-\${st}\`);
        if (!btn) return;
        if (st === status) {
          btn.className = 'px-2.5 py-1 rounded-lg bg-teal-600 text-white font-bold transition cursor-pointer';
        } else {
          btn.className = 'px-2.5 py-1 rounded-lg text-slate-600 hover:bg-slate-100 font-bold transition cursor-pointer';
        }
      });
      filterHotelsAdmin();
    }
    window.filterHotelsAdminByStatus = filterHotelsAdminByStatus;

    function handleHotelAdminSearch(query) {
      hotelProductFilterState.search = (query || '').trim().toLowerCase();
      filterHotelsAdmin();
    }
    window.handleHotelAdminSearch = handleHotelAdminSearch;

    function filterHotelsAdmin() {
      let filtered = [...cachedHotelsAdmin];

      if (hotelProductFilterState.region !== '전체') {
        filtered = filtered.filter(h => h.region === hotelProductFilterState.region || (h.country && h.country.includes(hotelProductFilterState.region)));
      }

      if (hotelProductFilterState.status === '운영중') {
        filtered = filtered.filter(h => h.status !== '미운영' && h.isActive !== false);
      } else if (hotelProductFilterState.status === '미운영') {
        filtered = filtered.filter(h => h.status === '미운영' || h.isActive === false);
      }

      if (hotelProductFilterState.search) {
        const s = hotelProductFilterState.search;
        filtered = filtered.filter(h => 
          (h.name && h.name.toLowerCase().includes(s)) ||
          (h.nameEn && h.nameEn.toLowerCase().includes(s)) ||
          (h.city && h.city.toLowerCase().includes(s)) ||
          (h.country && h.country.toLowerCase().includes(s)) ||
          (Array.isArray(h.amenities) && h.amenities.some(a => a.toLowerCase().includes(s)))
        );
      }

      const countEl = document.getElementById('hp-result-count');
      if (countEl) countEl.textContent = filtered.length;

      renderHotelsAdmin(filtered);
    }

    function renderHotelsAdmin(hotels) {
      const container = document.getElementById('admin-hotels-grid');
      if (!container) return;

      if (hotels.length === 0) {
        container.innerHTML = \`
          <div class="col-span-full py-12 text-center text-slate-400 text-xs bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            조건에 일치하는 호텔 상품이 없습니다.
          </div>
        \`;
        return;
      }

      container.innerHTML = hotels.map(h => {
        const isOperating = h.status !== '미운영' && h.isActive !== false;
        const statusBadge = isOperating
          ? '<span class="px-2 py-0.5 rounded-full bg-emerald-500/90 text-white font-extrabold text-[10px] shadow-xs">운영중</span>'
          : '<span class="px-2 py-0.5 rounded-full bg-slate-500/90 text-white font-extrabold text-[10px] shadow-xs">미운영 (숨김)</span>';

        const amenitiesTxt = Array.isArray(h.amenities) ? h.amenities.slice(0, 3).join(', ') : '';

        return \`
          <div class="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-3">
            
            <div class="space-y-2.5">
              <div class="relative h-36 rounded-2xl overflow-hidden bg-slate-900 group">
                <img src="\${h.thumbnail || (h.images && h.images[0]) || ''}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300 \${isOperating ? '' : 'grayscale opacity-70'}" alt="\${h.name}">
                <div class="absolute top-2 left-2 flex items-center gap-1">
                  <span class="px-2 py-0.5 bg-black/60 text-white text-[10px] font-bold rounded-lg">\${h.region}</span>
                  <span class="px-2 py-0.5 bg-amber-500 text-slate-900 text-[10px] font-bold rounded-lg">★ \${h.star}성급</span>
                </div>
                <div class="absolute top-2 right-2">
                  \${statusBadge}
                </div>
              </div>

              <div>
                <span class="text-[10px] font-bold text-slate-400">\${h.country} · \${h.city}</span>
                <h4 class="font-extrabold text-slate-900 text-xs sm:text-sm line-clamp-1 mt-0.5" title="\${h.name}">\${h.name}</h4>
                <p class="text-[11px] text-slate-400 truncate">\${h.nameEn || ''}</p>
                <div class="text-[11px] text-teal-600 font-semibold mt-1 truncate">부대시설: \${amenitiesTxt || '스파, 풀, 다이닝'}</div>
                <div class="flex items-baseline justify-between mt-2 pt-2 border-t border-slate-100">
                  <span class="text-xs text-slate-400 font-medium">1박 요금</span>
                  <span class="text-sm font-black text-teal-600">\${TourAPI.formatPrice ? TourAPI.formatPrice(h.pricePerNight) : h.pricePerNight + '원'}</span>
                </div>
              </div>
            </div>

            <div class="space-y-2 pt-2 border-t border-slate-100">
              <div class="p-2 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between gap-2">
                <label class="text-[11px] font-extrabold text-slate-700 flex items-center gap-1 shrink-0">
                  <i data-lucide="power" class="w-3.5 h-3.5 \${isOperating ? 'text-teal-600' : 'text-slate-400'}"></i>
                  운영 설정
                </label>
                <select onchange="handleToggleHotelStatus('\${h.id}', this.value)" class="text-xs font-black px-2 py-1 rounded-lg border transition cursor-pointer \${isOperating ? 'bg-teal-50 text-teal-800 border-teal-300 hover:bg-teal-100' : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'}">
                  <option value="운영중" \${isOperating ? 'selected' : ''}>🟢 운영중 (노출)</option>
                  <option value="미운영" \${!isOperating ? 'selected' : ''}>⚪ 미운영 (숨김)</option>
                </select>
              </div>

              <div class="pt-0.5 flex items-center gap-2">
                <button onclick="openEditHotelModal('\${h.id}')" class="flex-1 py-1.5 px-3 bg-teal-50 hover:bg-teal-100 text-teal-700 font-extrabold rounded-xl text-xs flex items-center justify-center gap-1.5 transition border border-teal-200/80 shadow-2xs cursor-pointer">
                  <i data-lucide="edit-3" class="w-3.5 h-3.5 text-teal-600"></i> 호텔 정보 수정
                </button>
              </div>

              <div class="flex justify-between items-center px-1 text-[11px] pt-0.5">
                <a href="hotels.html" target="_blank" class="text-slate-500 hover:text-teal-600 font-bold hover:underline flex items-center gap-1 transition">
                  <i data-lucide="external-link" class="w-3 h-3"></i> 호텔 코너 보기
                </a>
                <button onclick="handleDeleteHotel('\${h.id}')" class="text-rose-500 hover:text-rose-600 font-bold hover:underline flex items-center gap-1 transition cursor-pointer">
                  <i data-lucide="trash-2" class="w-3 h-3"></i> 삭제
                </button>
              </div>
            </div>

          </div>
        \`;
      }).join('');
      if (window.lucide) lucide.createIcons();
    }

    async function handleToggleHotelStatus(id, newStatus) {
      try {
        const res = await TourAPI.updateHotelStatus(id, newStatus);
        if (res && res.success) {
          const item = cachedHotelsAdmin.find(h => h.id === id);
          if (item) {
            item.status = newStatus;
            item.isActive = (newStatus !== '미운영');
          }
          showToast(\`호텔 운영 상태가 '\${newStatus}'(으)로 변경되었습니다.\`);
          updateHotelProductFilterCounts(cachedHotelsAdmin);
          filterHotelsAdmin();
        }
      } catch (err) {
        alert('호텔 상태 변경 오류: ' + err.message);
      }
    }
    window.handleToggleHotelStatus = handleToggleHotelStatus;

    async function handleDeleteHotel(id) {
      if (!confirm('정말 이 호텔 상품을 삭제하시겠습니까?')) return;
      try {
        await TourAPI.deleteHotel(id);
        cachedHotelsAdmin = cachedHotelsAdmin.filter(h => h.id !== id);
        showToast('호텔 상품이 삭제되었습니다.');
        updateHotelProductFilterCounts(cachedHotelsAdmin);
        filterHotelsAdmin();
      } catch (err) {
        alert('삭제 실패: ' + err.message);
      }
    }
    window.handleDeleteHotel = handleDeleteHotel;

    function openNewHotelModal() {
      const form = document.getElementById('form-new-hotel');
      if (form) form.reset();
      document.getElementById('modal-new-hotel').classList.remove('hidden');
      if (window.lucide) lucide.createIcons();
    }
    window.openNewHotelModal = openNewHotelModal;

    async function handleSaveNewHotel(e) {
      e.preventDefault();
      const amenitiesInput = document.getElementById('nh-amenities')?.value || '';
      const amenitiesArr = amenitiesInput.split(',').map(s => s.trim()).filter(Boolean);

      const payload = {
        name: document.getElementById('nh-name')?.value.trim(),
        nameEn: document.getElementById('nh-name-en')?.value.trim(),
        region: document.getElementById('nh-region')?.value,
        country: document.getElementById('nh-country')?.value.trim(),
        city: document.getElementById('nh-city')?.value.trim(),
        star: Number(document.getElementById('nh-star')?.value) || 5,
        pricePerNight: Number(document.getElementById('nh-price')?.value) || 300000,
        originalPrice: Number(document.getElementById('nh-original-price')?.value) || null,
        thumbnail: document.getElementById('nh-thumbnail')?.value.trim(),
        amenities: amenitiesArr.length > 0 ? amenitiesArr : ['스파', '수영장', '다이닝'],
        summary: document.getElementById('nh-summary')?.value.trim(),
        status: document.getElementById('nh-status')?.value || '운영중'
      };

      try {
        const res = await TourAPI.createHotel(payload);
        if (res && res.success) {
          showToast('✅ 신규 호텔 상품이 성공적으로 등록되었습니다!');
          closeModal('modal-new-hotel');
          await loadHotelsAdmin();
        } else {
          alert(res?.message || '호텔 등록 실패');
        }
      } catch (err) {
        alert('호텔 등록 중 오류: ' + err.message);
      }
    }
    window.handleSaveNewHotel = handleSaveNewHotel;

    function openEditHotelModal(id) {
      const h = cachedHotelsAdmin.find(item => item.id === id);
      if (!h) {
        alert('호텔 정보를 찾을 수 없습니다.');
        return;
      }

      document.getElementById('eh-id').value = h.id;
      document.getElementById('edit-hotel-id-badge').textContent = \`ID: \${h.id}\`;
      document.getElementById('eh-name').value = h.name || '';
      document.getElementById('eh-name-en').value = h.nameEn || '';
      document.getElementById('eh-region').value = h.region || '국내';
      document.getElementById('eh-country').value = h.country || '';
      document.getElementById('eh-city').value = h.city || '';
      document.getElementById('eh-star').value = h.star || 5;
      document.getElementById('eh-price').value = h.pricePerNight || 0;
      document.getElementById('eh-original-price').value = h.originalPrice || '';
      document.getElementById('eh-thumbnail').value = h.thumbnail || (h.images && h.images[0]) || '';
      document.getElementById('eh-amenities').value = Array.isArray(h.amenities) ? h.amenities.join(', ') : (h.amenities || '');
      document.getElementById('eh-summary').value = h.summary || '';
      document.getElementById('eh-status').value = (h.status !== '미운영' && h.isActive !== false) ? '운영중' : '미운영';

      document.getElementById('modal-edit-hotel').classList.remove('hidden');
      if (window.lucide) lucide.createIcons();
    }
    window.openEditHotelModal = openEditHotelModal;

    async function handleSaveEditHotel(e) {
      e.preventDefault();
      const id = document.getElementById('eh-id')?.value;
      if (!id) return;

      const amenitiesInput = document.getElementById('eh-amenities')?.value || '';
      const amenitiesArr = amenitiesInput.split(',').map(s => s.trim()).filter(Boolean);

      const payload = {
        name: document.getElementById('eh-name')?.value.trim(),
        nameEn: document.getElementById('eh-name-en')?.value.trim(),
        region: document.getElementById('eh-region')?.value,
        country: document.getElementById('eh-country')?.value.trim(),
        city: document.getElementById('eh-city')?.value.trim(),
        star: Number(document.getElementById('eh-star')?.value) || 5,
        pricePerNight: Number(document.getElementById('eh-price')?.value) || 300000,
        originalPrice: Number(document.getElementById('eh-original-price')?.value) || null,
        thumbnail: document.getElementById('eh-thumbnail')?.value.trim(),
        amenities: amenitiesArr,
        summary: document.getElementById('eh-summary')?.value.trim(),
        status: document.getElementById('eh-status')?.value || '운영중'
      };

      try {
        const res = await TourAPI.updateHotel(id, payload);
        if (res && res.success) {
          showToast('✅ 호텔 정보가 성공적으로 수정되었습니다!');
          closeModal('modal-edit-hotel');
          await loadHotelsAdmin();
        } else {
          alert(res?.message || '호텔 수정 실패');
        }
      } catch (err) {
        alert('호텔 수정 중 오류: ' + err.message);
      }
    }
    window.handleSaveEditHotel = handleSaveEditHotel;
`;

// 7. Update switchTab function to support all 6 tabs with proper active styles
const newSwitchTabFunc = `
    function switchTab(tabKey) {
      const tabs = ['bookings', 'packages', 'hotel-bookings', 'hotels', 'inquiries', 'users'];
      tabs.forEach(k => {
        const btn = document.getElementById(\`tab-btn-\${k}\`);
        const content = document.getElementById(\`tab-content-\${k}\`);
        if (!btn || !content) return;
        
        if (k === tabKey) {
          if (k === 'bookings' || k === 'packages') {
            btn.className = 'flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold bg-sky-600 text-white shadow-xs transition cursor-pointer';
          } else if (k === 'hotel-bookings' || k === 'hotels') {
            btn.className = 'flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white shadow-xs transition cursor-pointer';
          } else {
            btn.className = 'flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white shadow-xs transition cursor-pointer';
          }
          content.classList.remove('hidden');
        } else {
          btn.className = 'flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer';
          content.classList.add('hidden');
        }
      });

      if (tabKey === 'hotels' && cachedHotelsAdmin.length === 0) {
        loadHotelsAdmin();
      }
      if (tabKey === 'users' && cachedUsers.length === 0) {
        loadUsersData();
      }
      if (window.lucide) lucide.createIcons();
    }
    window.switchTab = switchTab;
`;

// Replace switchTab implementation in script
if (html.includes('function switchTab(tabKey) {')) {
  const switchStart = html.indexOf('function switchTab(tabKey) {');
  const switchEnd = html.indexOf('// --- User / Member Management State & Functions ---', switchStart);
  if (switchStart !== -1 && switchEnd !== -1) {
    html = html.substring(0, switchStart) + hotelAdminJsLogic + '\n\n' + newSwitchTabFunc + '\n\n' + html.substring(switchEnd);
  }
}

// 8. Update loadAllAdminData to fetch stats and load hotels
const oldLoadAllStats = `          const s = statsRes.data;
          const elBkCount = document.getElementById('stat-booking-count');
          if (elBkCount) elBkCount.textContent = \`\${s.bookingCount || 0}건\`;
          const elBkPending = document.getElementById('stat-pending-bookings');
          if (elBkPending) elBkPending.textContent = \`대기: \${s.pendingBookings || 0}건\`;
          const elInqCount = document.getElementById('stat-inquiry-count');
          if (elInqCount) elInqCount.textContent = \`\${s.inquiryCount || 0}건\`;
          const elInqPending = document.getElementById('stat-pending-inquiries');
          if (elInqPending) elInqPending.textContent = \`미답변: \${s.pendingInquiries || 0}건\`;
          const elPkgCount = document.getElementById('stat-package-count');
          if (elPkgCount) elPkgCount.textContent = \`\${s.packageCount || 75}개\`;
          const elPkgSub = document.getElementById('stat-package-subtext');
          if (elPkgSub) elPkgSub.textContent = \`운영 중 \${s.activePackageCount !== undefined ? s.activePackageCount : 74}개 · 미운영 \${s.inactivePackageCount !== undefined ? s.inactivePackageCount : 1}개\`;
          const elRevenue = document.getElementById('stat-total-revenue');
          if (elRevenue) elRevenue.textContent = TourAPI.formatPrice(s.totalRevenue || 0);
          const elUserCount = document.getElementById('stat-user-count');
          if (elUserCount) elUserCount.textContent = \`\${s.userCount !== undefined ? s.userCount : 8}명\`;
          const elUserSub = document.getElementById('stat-user-subtext');
          if (elUserSub) elUserSub.textContent = \`일반 \${s.memberCount !== undefined ? s.memberCount : 7} · 관리자 \${s.adminCount !== undefined ? s.adminCount : 1}\`;`;

const newLoadAllStats = `          const s = statsRes.data;
          const elBkCount = document.getElementById('stat-booking-count');
          if (elBkCount) elBkCount.textContent = \`\${s.bookingCount || 0}건\`;
          const elBkPending = document.getElementById('stat-pending-bookings');
          if (elBkPending) elBkPending.textContent = \`대기: \${s.pendingBookings || 0}건\`;

          const elHbCount = document.getElementById('stat-hotel-booking-count');
          if (elHbCount) elHbCount.textContent = \`\${s.hotelBookingCount || 0}건\`;
          const elHbPending = document.getElementById('stat-pending-hotel-bookings');
          if (elHbPending) elHbPending.textContent = \`접수대기: \${s.pendingHotelBookings || 0}건\`;

          const elInqCount = document.getElementById('stat-inquiry-count');
          if (elInqCount) elInqCount.textContent = \`\${s.inquiryCount || 0}건\`;
          const elInqPending = document.getElementById('stat-pending-inquiries');
          if (elInqPending) elInqPending.textContent = \`미답변: \${s.pendingInquiries || 0}건\`;

          const elPkgCount = document.getElementById('stat-package-count');
          if (elPkgCount) elPkgCount.textContent = \`\${s.packageCount || 75}개\`;
          const elPkgSub = document.getElementById('stat-package-subtext');
          if (elPkgSub) elPkgSub.textContent = \`운영 \${s.activePackageCount !== undefined ? s.activePackageCount : 74} · 미운영 \${s.inactivePackageCount !== undefined ? s.inactivePackageCount : 1}\`;

          const elHtlCount = document.getElementById('stat-hotel-count');
          if (elHtlCount) elHtlCount.textContent = \`\${s.hotelCount || 30}개\`;
          const elHtlSub = document.getElementById('stat-hotel-subtext');
          if (elHtlSub) elHtlSub.textContent = \`운영 \${s.activeHotelCount !== undefined ? s.activeHotelCount : 30} · 미운영 \${s.inactiveHotelCount !== undefined ? s.inactiveHotelCount : 0}\`;

          const elUserCount = document.getElementById('stat-user-count');
          if (elUserCount) elUserCount.textContent = \`\${s.userCount !== undefined ? s.userCount : 8}명\`;
          const elUserSub = document.getElementById('stat-user-subtext');
          if (elUserSub) elUserSub.textContent = \`일반 \${s.memberCount !== undefined ? s.memberCount : 7} · 관리자 \${s.adminCount !== undefined ? s.adminCount : 1}\`;`;

if (html.includes(oldLoadAllStats)) {
  html = html.replace(oldLoadAllStats, newLoadAllStats);
}

// Ensure loadHotelsAdmin is called in loadAllAdminData
if (!html.includes('await loadHotelsAdmin();')) {
  html = html.replace('await loadHotelBookingsAdmin();', 'await loadHotelBookingsAdmin();\n        await loadHotelsAdmin();');
}

fs.writeFileSync(adminHtmlPath, html, 'utf8');
console.log('Successfully updated admin.html with separated Travel Packages vs Hotels architecture.');
