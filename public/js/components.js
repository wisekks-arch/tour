// Shared UI Components & Layout for TourEasy

function renderNavbar(activeKey = '') {
  const navContainer = document.getElementById('navbar-root');
  if (!navContainer) return;

  const currentUser = typeof TourAPI !== 'undefined' ? TourAPI.getCurrentUser() : null;

  const isSuperAdmin = currentUser && (currentUser.email || '').toLowerCase() === 'wisekks@gmail.com';

  const links = [
    { key: 'home', label: '홈', href: 'index.html' },
    { key: 'packages', label: '여행상품', href: 'packages.html' },
    { key: 'theme', label: '테마여행', href: 'packages.html?theme=휴양' },
    { key: 'about', label: '회사소개', href: 'about.html' },
    { key: 'contact', label: '고객센터 & FAQ', href: 'contact.html' }
  ];

  // Show Admin button ONLY when logged in as wisekks@gmail.com
  if (isSuperAdmin) {
    links.push({ key: 'admin', label: '관리자', href: 'admin.html', badge: 'Admin' });
  }

  const linkHtml = links.map(l => {
    const isActive = activeKey === l.key;
    const activeClass = isActive
      ? 'text-sky-600 font-bold border-b-2 border-sky-600 pb-1'
      : 'text-slate-600 hover:text-sky-600 font-medium transition';
    
    return `
      <a href="${l.href}" class="${activeClass} flex items-center gap-1.5 text-[15px] whitespace-nowrap">
        ${l.label}
        ${l.badge ? `<span class="px-1.5 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-600 rounded-md border border-slate-200">${l.badge}</span>` : ''}
      </a>
    `;
  }).join('');

  // Top Auth UI
  const topAuthHtml = currentUser ? `
    <div class="flex items-center gap-2.5">
      <span class="text-white text-xs font-bold flex items-center gap-1">
        <i data-lucide="user-check" class="w-3.5 h-3.5 text-emerald-300"></i> ${currentUser.name} 회원님
      </span>
      <span class="text-sky-200">•</span>
      <button onclick="window.logoutUser()" class="hover:underline text-sky-100 text-xs font-medium">로그아웃</button>
    </div>
  ` : `
    <div class="flex items-center gap-2">
      <button onclick="window.openAuthModal('login')" class="hover:underline text-white text-xs font-medium">로그인</button>
      <span class="text-sky-200">•</span>
      <button onclick="window.openAuthModal('register')" class="hover:underline text-amber-200 font-bold text-xs">회원가입</button>
    </div>
  `;

  // Desktop Main Auth Button
  const desktopAuthButtons = currentUser ? `
    <div class="flex items-center gap-2">
      <div class="px-3 py-1.5 bg-slate-100 rounded-xl flex items-center gap-2 border border-slate-200 text-xs font-bold text-slate-800">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <i data-lucide="user" class="w-3.5 h-3.5 text-sky-600"></i>
        <span>${currentUser.name} 님</span>
      </div>
      <button onclick="window.logoutUser()" class="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 transition">
        로그아웃
      </button>
    </div>
  ` : `
    <button onclick="window.openAuthModal('login')" class="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs transition">
      <i data-lucide="log-in" class="w-3.5 h-3.5 text-sky-600"></i> 로그인
    </button>
    <button onclick="window.openAuthModal('register')" class="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm transition">
      <i data-lucide="user-plus" class="w-3.5 h-3.5"></i> 회원가입
    </button>
  `;

  // Mobile Auth Buttons
  const mobileAuthHtml = currentUser ? `
    <div class="p-3 bg-slate-50 rounded-xl text-xs font-bold text-slate-800 flex items-center justify-between border border-slate-200">
      <span class="flex items-center gap-1.5"><i data-lucide="user-check" class="w-4 h-4 text-emerald-600"></i> ${currentUser.name} 님 (${currentUser.email})</span>
      <button onclick="window.logoutUser()" class="text-rose-600 hover:underline">로그아웃</button>
    </div>
  ` : `
    <div class="grid grid-cols-2 gap-2 pt-2">
      <button onclick="window.openAuthModal('login')" class="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs text-center hover:bg-slate-100 transition">
        로그인
      </button>
      <button onclick="window.openAuthModal('register')" class="w-full py-2.5 rounded-xl bg-sky-600 text-white font-bold text-xs text-center hover:bg-sky-700 transition">
        회원가입
      </button>
    </div>
  `;

  navContainer.innerHTML = `
    <header class="sticky top-0 z-50 glass-nav border-b border-slate-200/80 transition-all duration-300">
      <!-- Top banner for customer inquiry -->
      <div class="bg-gradient-to-r from-sky-700 via-sky-600 to-teal-600 text-white text-xs py-1.5 px-4">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1 font-medium whitespace-nowrap"><i data-lucide="phone-call" class="w-3.5 h-3.5 shrink-0"></i> 고객센터: 1588-7799</span>
            <span class="hidden sm:inline text-sky-100">|</span>
            <span class="hidden sm:inline text-sky-100">평일 09:00 ~ 18:00 (주말/공휴일 긴급상담 지원)</span>
          </div>
          <div class="flex items-center gap-3">
            ${topAuthHtml}
            <span class="text-sky-200 hidden sm:inline">•</span>
            <a href="contact.html" class="hidden sm:inline hover:underline whitespace-nowrap">1:1 맞춤상담</a>
            <span class="text-sky-200 hidden sm:inline">•</span>
            <a href="packages.html?earlyBird=true" class="hover:underline text-amber-200 font-semibold flex items-center gap-1 whitespace-nowrap">
              <i data-lucide="sparkles" class="w-3.5 h-3.5 shrink-0"></i> 특가
            </a>
          </div>
        </div>
      </div>

      <!-- Main Navigation -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <!-- Logo -->
          <a href="index.html" class="flex items-center gap-2.5 group shrink-0">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition">
              <i data-lucide="plane-takeoff" class="w-6 h-6"></i>
            </div>
            <div>
              <span class="text-2xl font-black tracking-tight text-slate-900">투어<span class="text-sky-600">이지</span></span>
              <span class="block text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">TourEasy Travel</span>
            </div>
          </a>

          <!-- Desktop Menu -->
          <nav class="hidden md:flex items-center gap-8">
            ${linkHtml}
          </nav>

          <!-- Action Buttons -->
          <div class="hidden lg:flex items-center gap-3 shrink-0">
            ${desktopAuthButtons}
            <a href="packages.html" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-semibold text-xs shadow-md shadow-sky-500/20 transition whitespace-nowrap">
              <i data-lucide="compass" class="w-4 h-4 shrink-0"></i> 여행지 둘러보기
            </a>
          </div>

          <!-- Mobile Hamburger Menu Button -->
          <button id="mobile-menu-btn" class="md:hidden p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition" aria-label="메뉴 열기">
            <i data-lucide="menu" class="w-6 h-6"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div id="mobile-menu" class="hidden md:hidden border-t border-slate-100 bg-white/95 px-4 pt-3 pb-6 space-y-3 shadow-xl">
        ${mobileAuthHtml}
        ${links.map(l => `
          <a href="${l.href}" class="block px-3 py-2 rounded-lg text-base font-semibold ${activeKey === l.key ? 'bg-sky-50 text-sky-600' : 'text-slate-700 hover:bg-slate-50'}">
            ${l.label}
          </a>
        `).join('')}
        <div class="pt-4 border-t border-slate-100 flex flex-col gap-2">
          <a href="contact.html" class="w-full text-center py-2.5 rounded-xl border border-sky-300 text-sky-700 font-semibold text-sm">
            1:1 맞춤 견적 상담
          </a>
          <a href="packages.html" class="w-full text-center py-2.5 rounded-xl bg-sky-600 text-white font-semibold text-sm">
            모든 여행 상품 보기
          </a>
        </div>
      </div>
    </header>
  `;

  // Toggle mobile menu
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Refresh icons
  if (window.lucide) {
    lucide.createIcons();
  }
}

function renderFooter() {
  const footerContainer = document.getElementById('footer-root');
  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <footer class="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          <!-- Column 1: Brand -->
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-sky-500/30">
                <i data-lucide="plane-takeoff" class="w-5 h-5"></i>
              </div>
              <span class="text-2xl font-black tracking-tight text-white">투어<span class="text-sky-400">이지</span></span>
            </div>
            <p class="text-slate-400 text-sm leading-relaxed max-w-sm">
              설레는 여행의 시작부터 안전한 귀국까지, 투어이지가 가장 신뢰할 수 있는 특별한 여행 경험을 선물합니다. 100% 고객 만족 보장제와 24시간 안심 케어 시스템을 운영합니다.
            </p>
            <div class="flex items-center gap-3 pt-2">
              <span class="w-9 h-9 rounded-full bg-slate-800 hover:bg-sky-600 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"><i data-lucide="instagram" class="w-4 h-4"></i></span>
              <span class="w-9 h-9 rounded-full bg-slate-800 hover:bg-sky-600 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"><i data-lucide="youtube" class="w-4 h-4"></i></span>
              <span class="w-9 h-9 rounded-full bg-slate-800 hover:bg-sky-600 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"><i data-lucide="message-circle" class="w-4 h-4"></i></span>
            </div>
          </div>

          <!-- Column 2: Popular Destinations -->
          <div>
            <h4 class="text-white font-bold text-base mb-4">인기 여행지</h4>
            <ul class="space-y-2.5 text-sm">
              <li><a href="packages.html?region=동남아" class="hover:text-sky-400 transition">다낭 / 호이안 휴양</a></li>
              <li><a href="packages.html?region=유럽" class="hover:text-sky-400 transition">서유럽 핵심 3국 일주</a></li>
              <li><a href="packages.html?region=일본/동아시아" class="hover:text-sky-400 transition">홋카이도 온천 & 미식</a></li>
              <li><a href="packages.html?region=동남아" class="hover:text-sky-400 transition">발리 럭셔리 풀빌라</a></li>
              <li><a href="packages.html?region=미주/대양주" class="hover:text-sky-400 transition">괌 PIC 가족 리조트</a></li>
              <li><a href="packages.html?region=국내" class="hover:text-sky-400 transition">제주 그랜드조선 힐링</a></li>
            </ul>
          </div>

          <!-- Column 3: Quick Links -->
          <div>
            <h4 class="text-white font-bold text-base mb-4">고객 서비스</h4>
            <ul class="space-y-2.5 text-sm">
              <li><a href="contact.html" class="hover:text-sky-400 transition">1:1 맞춤 견적 신청</a></li>
              <li><a href="contact.html#faq" class="hover:text-sky-400 transition">자주 묻는 질문(FAQ)</a></li>
              <li><a href="about.html" class="hover:text-sky-400 transition">회사 소개 & 오시는 길</a></li>
              <li><a href="packages.html?earlyBird=true" class="hover:text-sky-400 transition">얼리버드 프로모션</a></li>
              ${typeof TourAPI !== 'undefined' && TourAPI.getCurrentUser() && (TourAPI.getCurrentUser().email || '').toLowerCase() === 'wisekks@gmail.com' ? '<li><a href="admin.html" class="hover:text-teal-300 transition font-bold text-teal-400 flex items-center gap-1"><i data-lucide="shield" class="w-3.5 h-3.5"></i> 관리자 센터</a></li>' : ''}
            </ul>
          </div>

          <!-- Column 4: Customer Support Info -->
          <div>
            <h4 class="text-white font-bold text-base mb-4">고객센터 안내</h4>
            <p class="text-2xl font-black text-sky-400 mb-1">1588-7799</p>
            <p class="text-xs text-slate-400 leading-relaxed mb-3">
              평일: 09:00 ~ 18:00<br>
              점심: 12:00 ~ 13:00<br>
              주말/공휴일: 긴급 비상상담 운영
            </p>
            <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs">
              <span class="text-teal-400 font-semibold block mb-0.5">안심 여행 24H 콜센터</span>
              <span class="text-slate-400">현지 긴급 SOS 카카오톡 채널 운영</span>
            </div>
          </div>

        </div>

        <!-- Business Registration Info -->
        <div class="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-slate-500 gap-4">
          <div class="space-y-1">
            <p>(주)투어이지 여행사 | 대표이사: 김광수 | 사업자등록번호: 120-88-12345 | 통신판매업신고: 제2026-서울중구-0987호</p>
            <p>서울특별시 중구 세종대로 110 투어이지 빌딩 8층 | 개인정보보호책임자: 김투어 (help@toureasy.kr)</p>
            <p>관광사업자 등록번호: 일반여행업 제2026-000012호 | 보증보험 5억원 가입업체</p>
          </div>
          <div class="text-slate-600 text-right shrink-0">
            &copy; 2026 TourEasy Travel Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  `;

  if (window.lucide) {
    lucide.createIcons();
  }
}

// Reusable Package Card HTML Generator
function createPackageCard(pkg) {
  const discountPercent = pkg.originalPrice
    ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
    : 0;

  return `
    <div class="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-custom shadow-card-hover flex flex-col group transition-all duration-300">
      <!-- Thumbnail & Badges -->
      <div class="relative h-56 sm:h-52 overflow-hidden bg-slate-100">
        <img 
          src="${pkg.thumbnail}" 
          alt="${pkg.title}" 
          class="w-full h-full object-cover group-hover:scale-108 transition duration-500"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/10 pointer-events-none"></div>

        <!-- Region & Theme Badges (Top-Left) -->
        <div class="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span class="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-sky-600/90 text-white backdrop-blur-md shadow-sm whitespace-nowrap">
            ${pkg.region}
          </span>
          <span class="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-slate-900/80 text-white backdrop-blur-md shadow-sm whitespace-nowrap">
            ${pkg.theme}
          </span>
        </div>

        <!-- Discount Badge (Top-Right) -->
        ${discountPercent > 0 ? `
          <div class="absolute top-3 right-3 px-2.5 py-1 text-[11px] font-black rounded-lg badge-discount text-white shadow-md z-10 whitespace-nowrap animate-pulse">
            ${discountPercent}% OFF
          </div>
        ` : ''}

        <!-- City & Duration Overlay (Bottom Inside Image) -->
        <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 text-white z-10">
          <span class="flex items-center gap-1 font-semibold text-xs drop-shadow truncate min-w-0 flex-1">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 text-teal-300 shrink-0"></i>
            <span class="truncate">${pkg.city}</span>
          </span>
          <span class="shrink-0 flex items-center gap-1 font-bold text-[11px] bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md whitespace-nowrap border border-white/10">
            <i data-lucide="clock" class="w-3 h-3 text-amber-300 shrink-0"></i>
            <span>${pkg.durationNights}박 ${pkg.durationDays}일</span>
          </span>
        </div>
      </div>

      <!-- Card Body -->
      <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <!-- Rating & Reviews -->
          <div class="flex items-center gap-1 text-amber-500 text-xs font-bold mb-2.5">
            <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0"></i>
            <span class="text-slate-800 font-extrabold text-sm">${pkg.rating.toFixed(1)}</span>
            <span class="text-slate-400 font-normal">(${pkg.reviewCount}개 후기)</span>
          </div>

          <!-- Title -->
          <a href="package-detail.html?id=${pkg.id}" class="block group-hover:text-sky-600 transition mb-2">
            <h3 class="font-bold text-slate-900 text-base leading-snug line-clamp-2 break-keep">
              ${pkg.title}
            </h3>
          </a>

          <!-- Summary Snippet -->
          <p class="text-slate-500 text-xs line-clamp-2 leading-relaxed break-keep mb-3.5">
            ${pkg.summary}
          </p>

          <!-- Key Tags -->
          <div class="flex flex-wrap gap-1.5 mb-4">
            ${(pkg.tags || []).slice(0, 3).map(tag => `
              <span class="text-[11px] font-medium px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 whitespace-nowrap">
                #${tag}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Card Footer: Clean Price Row + 2-Button Grid -->
        <div class="pt-4 border-t border-slate-100/90 mt-auto space-y-3">
          <!-- Price Line -->
          <div class="flex items-end justify-between">
            <span class="text-xs text-slate-400 font-medium whitespace-nowrap">1인 기준 요금</span>
            <div class="text-right">
              ${pkg.originalPrice ? `
                <span class="text-xs text-slate-400 line-through block leading-none mb-1 whitespace-nowrap">
                  ${TourAPI.formatPrice(pkg.originalPrice)}
                </span>
              ` : ''}
              <span class="text-xl font-black text-sky-600 tracking-tight whitespace-nowrap">
                ${TourAPI.formatPrice(pkg.price)}
              </span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="grid grid-cols-2 gap-2 pt-0.5">
            <a href="package-detail.html?id=${pkg.id}" class="py-2.5 px-3 text-center text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition whitespace-nowrap flex items-center justify-center gap-1">
              상세보기
            </a>
            <a href="booking.html?id=${pkg.id}" class="py-2.5 px-3 text-center text-xs font-bold text-white bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 rounded-xl shadow-sm shadow-sky-200 transition whitespace-nowrap flex items-center justify-center gap-1">
              빠른예약
            </a>
          </div>
        </div>

      </div>
    </div>
  `;
}

// Animated Toast Notifications
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const isSuccess = type === 'success';
  toast.className = `toast-animate pointer-events-auto flex items-center gap-3 px-4 py-3.5 rounded-2xl shadow-xl border text-sm font-semibold ${
    isSuccess
      ? 'bg-slate-900 text-white border-slate-700'
      : 'bg-rose-600 text-white border-rose-500'
  }`;

  const iconName = isSuccess ? 'check-circle-2' : 'alert-circle';
  toast.innerHTML = `
    <i data-lucide="${iconName}" class="w-5 h-5 ${isSuccess ? 'text-emerald-400' : 'text-white'} shrink-0"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// =========================================================================
// INTEGRATED AUTHENTICATION MODAL & MEMBERSHIP FLOW
// =========================================================================
let authModalRedirectUrl = null;
let verificationTimerInterval = null;

function renderAuthModal() {
  if (document.getElementById('auth-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'auth-modal';
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs hidden';
  modal.innerHTML = `
    <div class="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
      
      <!-- Modal Header & Tabs -->
      <div class="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-6 text-white shrink-0 relative">
        <button onclick="window.closeAuthModal()" class="absolute top-5 right-5 text-slate-400 hover:text-white transition p-1.5 rounded-full hover:bg-white/10" aria-label="닫기">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
        <div class="flex items-center gap-2 mb-2">
          <div class="w-7 h-7 rounded-lg bg-sky-500/30 border border-sky-400/30 flex items-center justify-center text-sky-300">
            <i data-lucide="shield-check" class="w-4 h-4"></i>
          </div>
          <span class="text-xs font-extrabold uppercase tracking-wider text-sky-300">투어이지 멤버십</span>
        </div>
        <h3 id="auth-modal-title" class="text-xl font-black tracking-tight">회원 로그인</h3>
        <p id="auth-modal-desc" class="text-xs text-slate-300 mt-0.5">안전하고 편리한 맞춤 여행 예약의 시작</p>

        <!-- Tabs Navigation -->
        <div class="grid grid-cols-4 gap-1 p-1 bg-white/10 backdrop-blur-md rounded-2xl mt-4 text-[11px] font-bold">
          <button id="auth-tab-btn-login" onclick="window.switchAuthTab('login')" class="py-2 rounded-xl text-center transition bg-white text-slate-950 shadow-sm">
            로그인
          </button>
          <button id="auth-tab-btn-register" onclick="window.switchAuthTab('register')" class="py-2 rounded-xl text-center transition text-slate-300 hover:text-white">
            회원가입
          </button>
          <button id="auth-tab-btn-find-id" onclick="window.switchAuthTab('find-id')" class="py-2 rounded-xl text-center transition text-slate-300 hover:text-white">
            ID 찾기
          </button>
          <button id="auth-tab-btn-reset-password" onclick="window.switchAuthTab('reset-password')" class="py-2 rounded-xl text-center transition text-slate-300 hover:text-white">
            비번 재설정
          </button>
        </div>
      </div>

      <!-- Modal Body (Scrollable) -->
      <div class="p-6 overflow-y-auto space-y-4">
        
        <!-- 1. LOGIN TAB -->
        <div id="auth-pane-login" class="space-y-4">
          <form id="form-auth-login" class="space-y-3.5">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">아이디 (이메일)</label>
              <div class="relative">
                <i data-lucide="mail" class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
                <input type="email" id="login-email" required placeholder="user@toureasy.com" class="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500">
              </div>
            </div>
            <div>
              <div class="flex justify-between items-center mb-1">
                <label class="text-xs font-bold text-slate-700">비밀번호</label>
                <button type="button" onclick="window.switchAuthTab('reset-password')" class="text-[11px] text-sky-600 hover:underline">비밀번호 찾기</button>
              </div>
              <div class="relative">
                <i data-lucide="lock" class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
                <input type="password" id="login-password" required placeholder="••••••••" class="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500">
              </div>
            </div>

            <div id="login-error-msg" class="hidden p-3 bg-rose-50 text-rose-700 rounded-xl text-xs border border-rose-200 font-medium"></div>

            <button type="submit" id="btn-submit-login" class="w-full py-3.5 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-black rounded-xl shadow-md shadow-sky-500/20 text-sm transition">
              로그인하기
            </button>
          </form>

          <div class="flex items-center justify-center gap-3 pt-2 text-xs text-slate-500 border-t border-slate-100">
            <button onclick="window.switchAuthTab('find-id')" class="hover:text-sky-600 font-medium">아이디 찾기</button>
            <span>•</span>
            <button onclick="window.switchAuthTab('reset-password')" class="hover:text-sky-600 font-medium">비밀번호 재설정</button>
            <span>•</span>
            <button onclick="window.switchAuthTab('register')" class="text-sky-600 font-bold hover:underline">무료 회원가입</button>
          </div>
        </div>

        <!-- 2. REGISTER TAB -->
        <div id="auth-pane-register" class="space-y-4 hidden">
          <form id="form-auth-register" class="space-y-3.5">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">아이디 (이메일 주소) <span class="text-rose-500">*</span></label>
              <div class="relative">
                <i data-lucide="mail" class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
                <input type="email" id="reg-email" required placeholder="example@email.com" class="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500">
              </div>
              <p class="text-[10px] text-slate-400 mt-1">예약 바우처 및 확정 견적서가 발송되는 이메일입니다.</p>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">성명 <span class="text-rose-500">*</span></label>
                <input type="text" id="reg-name" required placeholder="홍길동" class="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500">
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">휴대폰 번호 <span class="text-rose-500">*</span></label>
                <input type="tel" id="reg-phone" required placeholder="010-1234-5678" class="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500">
              </div>
            </div>

            <!-- Password with Real-time Complex Rules -->
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">비밀번호 <span class="text-rose-500">*</span></label>
              <div class="relative">
                <i data-lucide="lock" class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
                <input type="password" id="reg-password" required placeholder="특수문자+영문+숫자 8자 이상" class="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500">
              </div>

              <!-- Real-time Rules Status Indicator -->
              <div class="grid grid-cols-2 gap-1.5 mt-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[10.5px]">
                <div id="rule-len" class="flex items-center gap-1 text-slate-400 font-bold">
                  <i data-lucide="circle" class="w-3 h-3"></i> 8자 이상
                </div>
                <div id="rule-letter" class="flex items-center gap-1 text-slate-400 font-bold">
                  <i data-lucide="circle" class="w-3 h-3"></i> 영문자 포함
                </div>
                <div id="rule-number" class="flex items-center gap-1 text-slate-400 font-bold">
                  <i data-lucide="circle" class="w-3 h-3"></i> 숫자 포함
                </div>
                <div id="rule-special" class="flex items-center gap-1 text-slate-400 font-bold">
                  <i data-lucide="circle" class="w-3 h-3"></i> 특수문자(!@#$%)
                </div>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">비밀번호 확인 <span class="text-rose-500">*</span></label>
              <div class="relative">
                <i data-lucide="check" class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
                <input type="password" id="reg-password-confirm" required placeholder="동일하게 한 번 더 입력" class="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500">
              </div>
              <p id="reg-pwd-match-msg" class="text-[10px] mt-1 font-bold"></p>
            </div>

            <div class="pt-1">
              <label class="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input type="checkbox" id="reg-terms" required class="w-4 h-4 text-sky-600 rounded border-slate-300">
                <span>[필수] 이용약관 및 개인정보 처리방침에 동의합니다.</span>
              </label>
            </div>

            <div id="reg-error-msg" class="hidden p-3 bg-rose-50 text-rose-700 rounded-xl text-xs border border-rose-200 font-medium"></div>

            <button type="submit" id="btn-submit-reg" class="w-full py-3.5 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-black rounded-xl shadow-md text-sm transition">
              회원가입 완료하기
            </button>
          </form>
        </div>

        <!-- 3. FIND ID TAB -->
        <div id="auth-pane-find-id" class="space-y-4 hidden">
          <p class="text-xs text-slate-500 leading-relaxed">
            가입 시 등록하신 <strong>성명</strong>과 <strong>가입 정보(휴대폰 번호 또는 이메일)</strong>를 입력하여 아이디를 확인합니다.
          </p>

          <form id="form-auth-find-id" class="space-y-3.5">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">성명</label>
              <input type="text" id="findid-name" required placeholder="홍길동" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500">
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">가입 정보 (휴대폰 번호 또는 이메일)</label>
              <input type="text" id="findid-contact" required placeholder="010-1234-5678 또는 example@email.com" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500">
            </div>

            <div id="findid-error-msg" class="hidden p-3 bg-rose-50 text-rose-700 rounded-xl text-xs border border-rose-200 font-medium"></div>

            <button type="submit" id="btn-submit-findid" class="w-full py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-black rounded-xl shadow-md text-sm transition">
              아이디 조회하기
            </button>
          </form>

          <!-- Find ID Result Box -->
          <div id="findid-result-box" class="hidden p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2 text-center">
            <i data-lucide="check-circle" class="w-8 h-8 text-emerald-600 mx-auto"></i>
            <span class="text-xs text-slate-600 font-medium block">회원님의 가입 아이디(이메일)입니다.</span>
            <span id="findid-result-email" class="text-base font-black text-slate-900 block font-mono"></span>
            <button onclick="window.useFoundIdToLogin()" class="w-full mt-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition">
              이 아이디로 로그인하기
            </button>
          </div>
        </div>

        <!-- 4. RESET PASSWORD TAB -->
        <div id="auth-pane-reset-password" class="space-y-4 hidden">
          <p class="text-xs text-slate-500 leading-relaxed">
            가입하신 <strong>아이디(이메일)</strong>로 <strong>인증번호를 발송</strong>받아 본인확인 후 새로운 비밀번호를 설정합니다.
          </p>

          <form id="form-auth-reset-password" class="space-y-3.5">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">아이디 (가입 이메일) <span class="text-rose-500">*</span></label>
              <div class="flex gap-2">
                <input type="email" id="reset-email" required placeholder="user@toureasy.com" class="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500">
                <button type="button" onclick="window.triggerEmailVerification('reset-email', 'reset-timer', 'btn-reset-sendcode', '비밀번호 재설정')" id="btn-reset-sendcode" class="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl shrink-0 transition flex items-center gap-1.5">
                  <i data-lucide="mail" class="w-3.5 h-3.5"></i>
                  <span>인증번호 발송</span>
                </button>
              </div>
              <p class="text-[10.5px] text-slate-400 mt-1">입력하신 이메일로 6자리 보안 인증번호가 즉시 발송됩니다.</p>
            </div>

            <!-- Verification Code Input Box -->
            <div>
              <div class="flex justify-between items-center mb-1">
                <label class="text-xs font-bold text-slate-700">이메일 인증번호 (6자리) <span class="text-rose-500">*</span></label>
                <span id="reset-timer" class="text-xs font-bold text-rose-500 font-mono"></span>
              </div>
              <div class="flex gap-2">
                <input type="text" id="reset-code" maxlength="6" placeholder="이메일로 온 6자리 번호" class="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 tracking-wider focus:outline-none focus:border-sky-500">
                <button type="button" onclick="window.confirmEmailCode('reset-email', 'reset-code', 'reset-verify-status')" id="btn-reset-verify" class="px-3.5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shrink-0 transition flex items-center gap-1.5">
                  <i data-lucide="check" class="w-3.5 h-3.5"></i>
                  <span>인증 확인</span>
                </button>
              </div>
              <p id="reset-verify-status" class="text-[11px] mt-1 font-bold"></p>
            </div>

            <!-- New Password Section (Unlocked after verification) -->
            <div id="reset-newpwd-section" class="space-y-3 pt-2 border-t border-slate-200 opacity-60 pointer-events-none transition-all">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">새 비밀번호 설정 <span class="text-rose-500">*</span></label>
                <input type="password" id="reset-newpwd" placeholder="특수문자+영문+숫자 8자 이상" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500">

                <div class="grid grid-cols-2 gap-1.5 mt-2 p-2 bg-slate-50 rounded-xl border border-slate-200 text-[10.5px]">
                  <div id="reset-rule-len" class="flex items-center gap-1 text-slate-400 font-bold">
                    <i data-lucide="circle" class="w-3 h-3"></i> 8자 이상
                  </div>
                  <div id="reset-rule-letter" class="flex items-center gap-1 text-slate-400 font-bold">
                    <i data-lucide="circle" class="w-3 h-3"></i> 영문자 포함
                  </div>
                  <div id="reset-rule-number" class="flex items-center gap-1 text-slate-400 font-bold">
                    <i data-lucide="circle" class="w-3 h-3"></i> 숫자 포함
                  </div>
                  <div id="reset-rule-special" class="flex items-center gap-1 text-slate-400 font-bold">
                    <i data-lucide="circle" class="w-3 h-3"></i> 특수문자(!@#$%)
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">새 비밀번호 확인</label>
                <input type="password" id="reset-newpwd-confirm" placeholder="동일하게 한 번 더 입력" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500">
                <p id="reset-pwd-match-msg" class="text-[10px] mt-1 font-bold"></p>
              </div>
            </div>

            <div id="reset-error-msg" class="hidden p-3 bg-rose-50 text-rose-700 rounded-xl text-xs border border-rose-200 font-medium"></div>

            <button type="submit" id="btn-submit-resetpwd" disabled class="w-full py-3.5 bg-slate-400 text-white font-black rounded-xl shadow-md text-sm transition cursor-not-allowed">
              새 비밀번호로 재설정 완료
            </button>
          </form>
        </div>

      </div>

    </div>
  `;

  document.body.appendChild(modal);

  // Setup Form Listeners & Real-time validators
  setupAuthModalListeners();
  if (window.lucide) lucide.createIcons();
}

function setupAuthModalListeners() {
  // Real-time password validator for Registration
  const regPwd = document.getElementById('reg-password');
  const regConfirm = document.getElementById('reg-password-confirm');
  if (regPwd) {
    regPwd.addEventListener('input', () => {
      const v = TourAPI.validatePassword(regPwd.value);
      updateRuleBadge('rule-len', v.hasLength);
      updateRuleBadge('rule-letter', v.hasLetter);
      updateRuleBadge('rule-number', v.hasNumber);
      updateRuleBadge('rule-special', v.hasSpecial);
      checkRegPasswordMatch();
    });
  }
  if (regConfirm) {
    regConfirm.addEventListener('input', checkRegPasswordMatch);
  }

  // Real-time password validator for Reset Password
  const resetPwd = document.getElementById('reset-newpwd');
  const resetConfirm = document.getElementById('reset-newpwd-confirm');
  if (resetPwd) {
    resetPwd.addEventListener('input', () => {
      const v = TourAPI.validatePassword(resetPwd.value);
      updateRuleBadge('reset-rule-len', v.hasLength);
      updateRuleBadge('reset-rule-letter', v.hasLetter);
      updateRuleBadge('reset-rule-number', v.hasNumber);
      updateRuleBadge('reset-rule-special', v.hasSpecial);
      checkResetPasswordMatch();
    });
  }
  if (resetConfirm) {
    resetConfirm.addEventListener('input', checkResetPasswordMatch);
  }

  // Login Form Submit
  const loginForm = document.getElementById('form-auth-login');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;
      const errEl = document.getElementById('login-error-msg');
      const submitBtn = document.getElementById('btn-submit-login');

      errEl.classList.add('hidden');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="inline-flex items-center gap-2"><span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> 로그인 처리 중...</span>`;

      try {
        const res = await TourAPI.login(email, password);
        if (res.success && res.user) {
          showToast(`🎉 ${res.user.name} 회원님, 환영합니다!`, 'success');
          window.closeAuthModal();
          renderNavbar();

          if (authModalRedirectUrl) {
            const dest = authModalRedirectUrl;
            authModalRedirectUrl = null;
            window.location.href = dest;
          } else {
            // Trigger custom event so current page updates (e.g. booking form unlocks)
            window.dispatchEvent(new CustomEvent('toureasy_logged_in', { detail: res.user }));
          }
        } else {
          errEl.textContent = res.message || '이메일 또는 비밀번호가 일치하지 않습니다.';
          errEl.classList.remove('hidden');
        }
      } catch (err) {
        errEl.textContent = '로그인 중 통신 오류가 발생했습니다.';
        errEl.classList.remove('hidden');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '로그인하기';
      }
    });
  }

  // Register Form Submit
  const regForm = document.getElementById('form-auth-register');
  if (regForm) {
    regForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('reg-email').value.trim();
      const name = document.getElementById('reg-name').value.trim();
      const phone = document.getElementById('reg-phone').value.trim();
      const password = document.getElementById('reg-password').value;
      const confirm = document.getElementById('reg-password-confirm').value;
      const errEl = document.getElementById('reg-error-msg');
      const submitBtn = document.getElementById('btn-submit-reg');

      errEl.classList.add('hidden');

      if (password !== confirm) {
        errEl.textContent = '비밀번호가 서로 일치하지 않습니다.';
        errEl.classList.remove('hidden');
        return;
      }

      const v = TourAPI.validatePassword(password);
      if (!v.isValid) {
        errEl.textContent = '비밀번호는 특수문자, 영문, 숫자를 모두 포함하여 8자 이상이어야 합니다.';
        errEl.classList.remove('hidden');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="inline-flex items-center gap-2"><span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> 회원가입 처리 중...</span>`;

      try {
        const res = await TourAPI.register({ email, password, name, phone });
        if (res.success) {
          showToast('🎉 회원가입이 성공적으로 완료되었습니다! 자동 로그인합니다.', 'success');
          // Auto login
          await TourAPI.login(email, password);
          window.closeAuthModal();
          renderNavbar();

          if (authModalRedirectUrl) {
            const dest = authModalRedirectUrl;
            authModalRedirectUrl = null;
            window.location.href = dest;
          } else {
            window.dispatchEvent(new CustomEvent('toureasy_logged_in', { detail: { email, name, phone } }));
          }
        } else {
          errEl.textContent = res.message || '회원가입에 실패했습니다.';
          errEl.classList.remove('hidden');
        }
      } catch (err) {
        errEl.textContent = '회원가입 중 통신 오류가 발생했습니다.';
        errEl.classList.remove('hidden');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '회원가입 완료하기';
      }
    });
  }

  // Find ID Form Submit
  const findIdForm = document.getElementById('form-auth-find-id');
  if (findIdForm) {
    findIdForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('findid-name')?.value.trim() || '';
      const contact = document.getElementById('findid-contact')?.value.trim() || document.getElementById('findid-phone')?.value.trim() || '';
      const errEl = document.getElementById('findid-error-msg');
      const resultBox = document.getElementById('findid-result-box');
      const resultEmail = document.getElementById('findid-result-email');
      const submitBtn = document.getElementById('btn-submit-findid');

      if (!name || !contact) {
        if (errEl) {
          errEl.textContent = '성명과 가입 정보를 모두 입력해주세요.';
          errEl.classList.remove('hidden');
        }
        return;
      }

      errEl.classList.add('hidden');
      resultBox.classList.add('hidden');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '조회 중...';
      }

      try {
        const res = await TourAPI.findUserId(name, contact);
        if (res.success && res.email) {
          resultEmail.textContent = res.email;
          resultBox.classList.remove('hidden');
          showToast('회원님의 아이디를 확인했습니다.', 'success');
          if (window.lucide) lucide.createIcons();
        } else {
          errEl.textContent = res.message || '일치하는 회원 정보를 찾을 수 없습니다.';
          errEl.classList.remove('hidden');
        }
      } catch (err) {
        errEl.textContent = '아이디 조회 중 오류가 발생했습니다.';
        errEl.classList.remove('hidden');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = '아이디 조회하기';
        }
      }
    });
  }

  // Reset Password Form Submit
  const resetForm = document.getElementById('form-auth-reset-password');
  if (resetForm) {
    resetForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('reset-email')?.value.trim() || '';
      const newPassword = document.getElementById('reset-newpwd')?.value || '';
      const confirm = document.getElementById('reset-newpwd-confirm')?.value || '';
      const errEl = document.getElementById('reset-error-msg');
      const submitBtn = document.getElementById('btn-submit-resetpwd');

      errEl.classList.add('hidden');

      if (!email) {
        errEl.textContent = '가입 아이디(이메일)를 입력해주세요.';
        errEl.classList.remove('hidden');
        return;
      }

      if (newPassword !== confirm) {
        errEl.textContent = '새 비밀번호가 일치하지 않습니다.';
        errEl.classList.remove('hidden');
        return;
      }

      const v = TourAPI.validatePassword(newPassword);
      if (!v.isValid) {
        errEl.textContent = '비밀번호는 특수문자, 영문, 숫자를 모두 포함하여 8자 이상이어야 합니다.';
        errEl.classList.remove('hidden');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = '비밀번호 재설정 중...';

      try {
        const res = await TourAPI.resetPassword(email, newPassword);
        if (res.success) {
          showToast('🎉 비밀번호가 변경되었습니다! 새 비밀번호로 로그인해주세요.', 'success');
          window.switchAuthTab('login');
          const loginEmailEl = document.getElementById('login-email');
          if (loginEmailEl) loginEmailEl.value = email;
          const loginPwdEl = document.getElementById('login-password');
          if (loginPwdEl) loginPwdEl.focus();
        } else {
          errEl.textContent = res.message || '비밀번호 재설정에 실패했습니다.';
          errEl.classList.remove('hidden');
        }
      } catch (err) {
        errEl.textContent = '비밀번호 재설정 처리 중 오류가 발생했습니다.';
        errEl.classList.remove('hidden');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '새 비밀번호로 재설정 완료';
      }
    });
  }
}

function updateRuleBadge(elId, isPassed) {
  const el = document.getElementById(elId);
  if (!el) return;
  if (isPassed) {
    el.className = 'flex items-center gap-1 text-emerald-600 font-bold';
    el.innerHTML = '<i data-lucide="check-circle-2" class="w-3 h-3 text-emerald-500"></i> ' + el.textContent.trim();
  } else {
    el.className = 'flex items-center gap-1 text-slate-400 font-bold';
    el.innerHTML = '<i data-lucide="circle" class="w-3 h-3"></i> ' + el.textContent.trim();
  }
  if (window.lucide) lucide.createIcons();
}

function checkRegPasswordMatch() {
  const p = document.getElementById('reg-password')?.value || '';
  const c = document.getElementById('reg-password-confirm')?.value || '';
  const msg = document.getElementById('reg-pwd-match-msg');
  if (!msg || !c) {
    if (msg) msg.textContent = '';
    return;
  }
  if (p === c) {
    msg.className = 'text-[10px] mt-1 font-bold text-emerald-600';
    msg.textContent = '✓ 비밀번호가 일치합니다.';
  } else {
    msg.className = 'text-[10px] mt-1 font-bold text-rose-500';
    msg.textContent = '✕ 비밀번호가 일치하지 않습니다.';
  }
}

function checkResetPasswordMatch() {
  const p = document.getElementById('reset-newpwd')?.value || '';
  const c = document.getElementById('reset-newpwd-confirm')?.value || '';
  const msg = document.getElementById('reset-pwd-match-msg');
  if (!msg || !c) {
    if (msg) msg.textContent = '';
    return;
  }
  if (p === c) {
    msg.className = 'text-[10px] mt-1 font-bold text-emerald-600';
    msg.textContent = '✓ 비밀번호가 일치합니다.';
  } else {
    msg.className = 'text-[10px] mt-1 font-bold text-rose-500';
    msg.textContent = '✕ 비밀번호가 일치하지 않습니다.';
  }
}

// Global Auth Navigation Helpers
window.openAuthModal = function(tabName = 'login', redirectUrl = null) {
  renderAuthModal();
  authModalRedirectUrl = redirectUrl;
  const modal = document.getElementById('auth-modal');
  if (modal) {
    modal.classList.remove('hidden');
    window.switchAuthTab(tabName);
  }
  if (window.lucide) lucide.createIcons();
};

window.closeAuthModal = function() {
  const modal = document.getElementById('auth-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
  if (verificationTimerInterval) {
    clearInterval(verificationTimerInterval);
  }
};

window.switchAuthTab = function(tabName) {
  const tabs = ['login', 'register', 'find-id', 'reset-password'];
  const titles = {
    'login': { title: '회원 로그인', desc: '투어이지 계정으로 안전하고 편리하게 로그인하세요.' },
    'register': { title: '간편 회원가입', desc: '특수문자+영문+숫자 8자 이상 비밀번호로 안전하게 가입하세요.' },
    'find-id': { title: '아이디 찾기', desc: '성명과 등록 정보로 가입 아이디(이메일)를 확인합니다.' },
    'reset-password': { title: '비밀번호 재설정', desc: '가입 이메일로 인증번호를 전송받아 확인 후 새로운 비밀번호를 설정하세요.' }
  };

  const titleEl = document.getElementById('auth-modal-title');
  const descEl = document.getElementById('auth-modal-desc');
  if (titleEl && titles[tabName]) titleEl.textContent = titles[tabName].title;
  if (descEl && titles[tabName]) descEl.textContent = titles[tabName].desc;

  tabs.forEach(t => {
    const btn = document.getElementById(`auth-tab-btn-${t}`);
    const pane = document.getElementById(`auth-pane-${t}`);
    if (t === tabName) {
      if (btn) btn.className = 'py-2 rounded-xl text-center transition bg-white text-slate-950 shadow-sm font-bold';
      if (pane) pane.classList.remove('hidden');
    } else {
      if (btn) btn.className = 'py-2 rounded-xl text-center transition text-slate-300 hover:text-white font-medium';
      if (pane) pane.classList.add('hidden');
    }
  });

  if (window.lucide) lucide.createIcons();
};

window.logoutUser = function() {
  TourAPI.logout();
  showToast('안전하게 로그아웃되었습니다.', 'success');
  renderNavbar();
  window.dispatchEvent(new CustomEvent('toureasy_logged_out'));
};

window.triggerEmailVerification = async function(emailInputId, timerElId, btnId, purpose = '비밀번호 재설정') {
  const email = document.getElementById(emailInputId)?.value.trim();
  if (!email || !email.includes('@')) {
    alert('올바른 이메일 주소를 입력해주세요.');
    return;
  }

  const btn = document.getElementById(btnId);
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span class="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> 발송 중...`;
  }

  try {
    const res = await TourAPI.sendEmailVerification(email, purpose);
    if (res.success) {
      showToast(`✉️ ${res.message}`, 'success');
      alert(`[이메일 발송 완료]\n\n[ ${email} ] 으로 6자리 인증번호가 발송되었습니다.\n(스팸메일함 포함 확인 후 3분 이내 입력해주세요)\n\n※ 테스트용 인증번호: [ ${res.code} ]`);

      // Start 3-min countdown
      let remaining = 180;
      const timerEl = document.getElementById(timerElId);
      if (verificationTimerInterval) clearInterval(verificationTimerInterval);
      verificationTimerInterval = setInterval(() => {
        remaining--;
        if (remaining <= 0) {
          clearInterval(verificationTimerInterval);
          if (timerEl) timerEl.textContent = '유효시간 만료';
        } else {
          const m = String(Math.floor(remaining / 60)).padStart(2, '0');
          const s = String(remaining % 60).padStart(2, '0');
          if (timerEl) timerEl.textContent = `${m}:${s}`;
        }
      }, 1000);

      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<i data-lucide="rotate-cw" class="w-3.5 h-3.5"></i> <span>재발송</span>`;
        if (window.lucide) lucide.createIcons();
      }
    } else {
      alert(res.message || '인증번호 발송 실패');
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<i data-lucide="mail" class="w-3.5 h-3.5"></i> <span>인증번호 발송</span>`;
        if (window.lucide) lucide.createIcons();
      }
    }
  } catch (err) {
    alert('인증번호 발송 중 오류가 발생했습니다.');
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i data-lucide="mail" class="w-3.5 h-3.5"></i> <span>인증번호 발송</span>`;
      if (window.lucide) lucide.createIcons();
    }
  }
};

window.confirmEmailCode = async function(emailInputId, codeInputId, statusElId) {
  const email = document.getElementById(emailInputId)?.value.trim();
  const code = document.getElementById(codeInputId)?.value.trim();
  const statusEl = document.getElementById(statusElId);

  if (!code || code.length !== 6) {
    alert('6자리 인증번호를 정확히 입력해주세요.');
    return;
  }

  try {
    const res = await TourAPI.verifyEmailCode(email, code);
    if (res.success) {
      if (statusEl) {
        statusEl.className = 'text-[11px] mt-1 font-bold text-emerald-600 flex items-center gap-1';
        statusEl.innerHTML = '<i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-500"></i> ✓ 이메일 본인인증이 완료되었습니다.';
      }
      showToast('✓ 이메일 본인인증이 완료되었습니다.', 'success');

      // If in reset password tab, unlock new password inputs
      const pwdSection = document.getElementById('reset-newpwd-section');
      const submitBtn = document.getElementById('btn-submit-resetpwd');
      if (pwdSection && submitBtn) {
        pwdSection.classList.remove('opacity-60', 'pointer-events-none');
        submitBtn.disabled = false;
        submitBtn.className = 'w-full py-3.5 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-black rounded-xl shadow-md text-sm transition';
      }
      if (window.lucide) lucide.createIcons();
    } else {
      if (statusEl) {
        statusEl.className = 'text-[11px] mt-1 font-bold text-rose-500 flex items-center gap-1';
        statusEl.innerHTML = '<i data-lucide="alert-circle" class="w-3.5 h-3.5 text-rose-500"></i> ✕ 인증번호가 일치하지 않습니다.';
      }
      alert(res.message || '인증번호 불일치');
      if (window.lucide) lucide.createIcons();
    }
  } catch (err) {
    alert('인증 확인 중 오류가 발생했습니다.');
  }
};

// Aliases for backward compatibility
window.triggerPhoneVerification = window.triggerEmailVerification;
window.confirmPhoneCode = window.confirmEmailCode;

window.useFoundIdToLogin = function() {
  const email = document.getElementById('findid-result-email')?.textContent || '';
  window.switchAuthTab('login');
  if (email && document.getElementById('login-email')) {
    document.getElementById('login-email').value = email;
    document.getElementById('login-password')?.focus();
  }
};

// Auto-initialize auth modal on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  renderAuthModal();
});
