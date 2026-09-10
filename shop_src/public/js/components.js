/**
 * EasyShop Global UI Components
 * Header, Footer, Cart Drawer, Toast System
 */
const ShopUI = {
  // Format KRW currency
  formatPrice(num) {
    return (Number(num) || 0).toLocaleString('ko-KR') + '원';
  },

  // Render Global Navigation
  renderNavbar(active = '') {
    const root = document.getElementById('navbar-root');
    if (!root) return;

    const cartCount = CartStore.getTotalCount();
    const wishlistCount = CartStore.getWishlist().length;

    root.innerHTML = `
      <!-- Top Promotion Banner Bar -->
      <div class="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white text-xs py-2 px-4 border-b border-indigo-900/40">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold text-[10px] tracking-wide uppercase border border-amber-400/30">F/W Special</span>
            <span class="text-slate-200 hidden sm:inline">신규 가입 시 <strong>10,000원 웰컴 쿠폰팩</strong> 즉시 지급!</span>
            <span class="text-slate-300 sm:hidden">5만원 이상 무료배송 혜택</span>
          </div>
          <div class="flex items-center gap-4 text-slate-300 text-[11px]">
            <a href="/order-lookup.html" class="hover:text-white transition flex items-center gap-1">
              <i data-lucide="truck" class="w-3.5 h-3.5 text-indigo-400"></i> 주문/배송 조회
            </a>
            <span class="text-slate-600">|</span>
            <a href="/admin.html" class="hover:text-amber-300 font-semibold text-amber-400 transition flex items-center gap-1">
              <i data-lucide="shield-check" class="w-3.5 h-3.5"></i> 관리자 어드민
            </a>
          </div>
        </div>
      </div>

      <!-- Main Sticky Navbar -->
      <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-20 gap-4">
            
            <!-- Logo -->
            <a href="/index.html" class="flex items-center gap-3 shrink-0 group">
              <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition">
                <i data-lucide="shopping-bag" class="w-6 h-6"></i>
              </div>
              <div class="flex flex-col">
                <span class="text-2xl font-black tracking-tight text-slate-900 group-hover:text-indigo-600 transition font-heading">EASY<span class="text-indigo-600">SHOP</span></span>
                <span class="text-[10px] font-bold text-slate-400 tracking-widest uppercase -mt-1">Premium Lifestyle</span>
              </div>
            </a>

            <!-- Search Bar -->
            <div class="flex-1 max-w-xl hidden md:block">
              <form id="global-search-form" action="/products.html" method="GET" class="relative">
                <input 
                  type="text" 
                  name="search"
                  id="global-search-input"
                  placeholder="찾으시는 상품명이나 브랜드를 검색해보세요..." 
                  class="w-full pl-11 pr-24 py-2.5 rounded-full bg-slate-100 border border-transparent focus:border-indigo-500 focus:bg-white focus:outline-none text-sm transition"
                />
                <i data-lucide="search" class="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2"></i>
                <button type="submit" class="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-xs font-semibold shadow-xs transition">
                  검색
                </button>
              </form>
            </div>

            <!-- Action Icons -->
            <div class="flex items-center gap-2 sm:gap-4">
              <!-- Search (Mobile) -->
              <a href="/products.html" class="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-full md:hidden" title="검색">
                <i data-lucide="search" class="w-5 h-5"></i>
              </a>

              <!-- Wishlist -->
              <a href="/products.html?filter=wishlist" class="p-2.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition relative group" title="위시리스트">
                <i data-lucide="heart" class="w-5 h-5"></i>
                <span id="nav-wishlist-badge" class="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ${wishlistCount > 0 ? '' : 'hidden'}">
                  ${wishlistCount}
                </span>
              </a>

              <!-- Cart Drawer Trigger Button -->
              <button 
                type="button" 
                onclick="ShopUI.openCartDrawer()"
                class="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold transition shadow-xs group"
              >
                <div class="relative">
                  <i data-lucide="shopping-cart" class="w-4 h-4"></i>
                  <span id="nav-cart-badge" class="absolute -top-2 -right-2.5 px-1.5 py-0.2 bg-amber-400 text-slate-950 text-[10px] font-black rounded-full shadow-xs">
                    ${cartCount}
                  </span>
                </div>
                <span class="hidden sm:inline">장바구니</span>
              </button>

              <!-- Mobile Menu Toggle -->
              <button id="mobile-menu-btn" class="p-2 text-slate-600 hover:text-slate-900 lg:hidden">
                <i data-lucide="menu" class="w-6 h-6"></i>
              </button>
            </div>

          </div>

          <!-- Secondary Category Nav -->
          <nav class="hidden lg:flex items-center gap-8 py-3 text-sm font-medium border-t border-slate-100">
            <a href="/products.html" class="flex items-center gap-2 text-slate-900 font-bold hover:text-indigo-600 transition ${active === 'all' ? 'text-indigo-600' : ''}">
              <i data-lucide="layout-grid" class="w-4 h-4 text-indigo-500"></i> 전체 카테고리
            </a>
            <a href="/products.html?category=패션 / 의류" class="text-slate-600 hover:text-indigo-600 transition ${active === 'fashion' ? 'text-indigo-600 font-bold' : ''}">패션 / 의류</a>
            <a href="/products.html?category=디지털 / 가전" class="text-slate-600 hover:text-indigo-600 transition ${active === 'digital' ? 'text-indigo-600 font-bold' : ''}">디지털 / 가전</a>
            <a href="/products.html?category=뷰티 / 케어" class="text-slate-600 hover:text-indigo-600 transition ${active === 'beauty' ? 'text-indigo-600 font-bold' : ''}">뷰티 / 케어</a>
            <a href="/products.html?category=리빙 / 인테리어" class="text-slate-600 hover:text-indigo-600 transition ${active === 'living' ? 'text-indigo-600 font-bold' : ''}">리빙 / 인테리어</a>
            <a href="/products.html?category=푸드 / 키친" class="text-slate-600 hover:text-indigo-600 transition ${active === 'food' ? 'text-indigo-600 font-bold' : ''}">푸드 / 키친</a>
            <div class="ml-auto flex items-center gap-4">
              <a href="/products.html?isBest=true" class="text-amber-600 font-bold flex items-center gap-1 hover:text-amber-700 transition">
                <i data-lucide="flame" class="w-4 h-4 text-amber-500"></i> 베스트 랭킹
              </a>
              <a href="/products.html?isSale=true" class="text-rose-600 font-bold flex items-center gap-1 hover:text-rose-700 transition">
                <i data-lucide="tag" class="w-4 h-4 text-rose-500"></i> 타임세일 특가
              </a>
            </div>
          </nav>
        </div>

        <!-- Mobile Drawer Menu -->
        <div id="mobile-menu" class="hidden lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2">
          <a href="/products.html" class="block py-2 text-slate-800 font-bold">전체 상품 탐색</a>
          <a href="/products.html?category=패션 / 의류" class="block py-2 text-slate-600">패션 / 의류</a>
          <a href="/products.html?category=디지털 / 가전" class="block py-2 text-slate-600">디지털 / 가전</a>
          <a href="/products.html?category=뷰티 / 케어" class="block py-2 text-slate-600">뷰티 / 케어</a>
          <a href="/products.html?category=리빙 / 인테리어" class="block py-2 text-slate-600">리빙 / 인테리어</a>
          <a href="/products.html?category=푸드 / 키친" class="block py-2 text-slate-600">푸드 / 키친</a>
          <div class="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a href="/cart.html" class="py-2 text-indigo-600 font-semibold flex items-center gap-2">
              <i data-lucide="shopping-cart" class="w-4 h-4"></i> 장바구니 바로가기
            </a>
            <a href="/order-lookup.html" class="py-2 text-slate-700 font-medium flex items-center gap-2">
              <i data-lucide="truck" class="w-4 h-4"></i> 주문 및 배송조회
            </a>
            <a href="/admin.html" class="py-2 text-amber-600 font-bold flex items-center gap-2">
              <i data-lucide="shield-check" class="w-4 h-4"></i> 관리자 어드민 대시보드
            </a>
          </div>
        </div>
      </header>

      <!-- Cart Drawer Overlay & Panel -->
      <div id="cart-drawer-backdrop" class="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 hidden opacity-0 transition-opacity duration-300" onclick="ShopUI.closeCartDrawer()"></div>
      <div id="cart-drawer" class="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform translate-x-full transition-transform duration-300 flex flex-col">
        <!-- Header -->
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div class="flex items-center gap-2">
            <i data-lucide="shopping-bag" class="w-5 h-5 text-indigo-600"></i>
            <h3 class="font-bold text-slate-900 text-lg">장바구니 (<span id="drawer-cart-count">0</span>)</h3>
          </div>
          <button onclick="ShopUI.closeCartDrawer()" class="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Free shipping meter -->
        <div class="px-5 py-3 bg-indigo-50/70 border-b border-indigo-100">
          <div class="flex items-center justify-between text-xs mb-1.5">
            <span id="drawer-shipping-text" class="font-bold text-indigo-950">50,000원 이상 무료배송</span>
            <span id="drawer-shipping-badge" class="font-semibold text-indigo-600">3,000원</span>
          </div>
          <div class="w-full h-2 bg-indigo-200/60 rounded-full overflow-hidden">
            <div id="drawer-shipping-bar" class="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500" style="width: 0%"></div>
          </div>
        </div>

        <!-- Item List Body -->
        <div id="drawer-item-list" class="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-slate-100">
          <!-- Dynamically populated -->
        </div>

        <!-- Footer / Checkout button -->
        <div class="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
          <div class="flex items-center justify-between text-sm">
            <span class="text-slate-500">선택 상품 합계</span>
            <span id="drawer-product-total" class="font-bold text-slate-900 text-base">0원</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-slate-500">배송비</span>
            <span id="drawer-shipping-fee" class="font-bold text-slate-900">0원</span>
          </div>
          <div class="flex items-center justify-between text-base font-black pt-2 border-t border-slate-200">
            <span class="text-slate-900">최종 결제 금액</span>
            <span id="drawer-final-amount" class="text-indigo-600 text-xl font-heading">0원</span>
          </div>

          <div class="grid grid-cols-2 gap-2 pt-2">
            <a href="/cart.html" class="py-3 px-4 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-center rounded-xl transition text-sm">
              장바구니 가기
            </a>
            <a href="/checkout.html" class="py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-center rounded-xl shadow-lg shadow-indigo-600/30 transition text-sm">
              바로 주문하기
            </a>
          </div>
        </div>
      </div>
    `;

    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Subscribe to cart updates for badges
    CartStore.subscribe(() => {
      this.updateNavBadges();
      this.renderDrawerItems();
    });
  },

  updateNavBadges() {
    const cartBadge = document.getElementById('nav-cart-badge');
    const wishlistBadge = document.getElementById('nav-wishlist-badge');
    const drawerCount = document.getElementById('drawer-cart-count');

    const totalCount = CartStore.getTotalCount();
    const wishlistCount = CartStore.getWishlist().length;

    if (cartBadge) cartBadge.innerText = totalCount;
    if (drawerCount) drawerCount.innerText = totalCount;

    if (wishlistBadge) {
      wishlistBadge.innerText = wishlistCount;
      if (wishlistCount > 0) {
        wishlistBadge.classList.remove('hidden');
      } else {
        wishlistBadge.classList.add('hidden');
      }
    }
  },

  // Drawer Open / Close
  openCartDrawer() {
    const backdrop = document.getElementById('cart-drawer-backdrop');
    const drawer = document.getElementById('cart-drawer');
    if (!backdrop || !drawer) return;

    this.renderDrawerItems();
    backdrop.classList.remove('hidden');
    setTimeout(() => {
      backdrop.classList.remove('opacity-0');
      drawer.classList.remove('translate-x-full');
    }, 10);
  },

  closeCartDrawer() {
    const backdrop = document.getElementById('cart-drawer-backdrop');
    const drawer = document.getElementById('cart-drawer');
    if (!backdrop || !drawer) return;

    backdrop.classList.add('opacity-0');
    drawer.classList.add('translate-x-full');
    setTimeout(() => {
      backdrop.classList.add('hidden');
    }, 300);
  },

  renderDrawerItems() {
    const container = document.getElementById('drawer-item-list');
    if (!container) return;

    const items = CartStore.getItems();
    const summary = CartStore.getSummary();

    // Free shipping calculation
    const progress = Math.min(100, (summary.productTotal / summary.freeShippingThreshold) * 100);
    const meterBar = document.getElementById('drawer-shipping-bar');
    const meterText = document.getElementById('drawer-shipping-text');
    const meterBadge = document.getElementById('drawer-shipping-badge');

    if (meterBar) meterBar.style.width = `${progress}%`;
    if (meterText) {
      if (summary.remainingForFreeShipping > 0) {
        meterText.innerHTML = `<strong>${ShopUI.formatPrice(summary.remainingForFreeShipping)}</strong> 더 담으면 무료배송!`;
        if (meterBadge) meterBadge.innerText = '배송비 3,000원';
      } else {
        meterText.innerHTML = `<span class="text-emerald-600 font-bold">🎉 무료배송 혜택 적용 완료!</span>`;
        if (meterBadge) meterBadge.innerText = '무료';
      }
    }

    // Totals
    const pTotal = document.getElementById('drawer-product-total');
    const sFee = document.getElementById('drawer-shipping-fee');
    const fAmount = document.getElementById('drawer-final-amount');

    if (pTotal) pTotal.innerText = ShopUI.formatPrice(summary.productTotal);
    if (sFee) sFee.innerText = summary.shippingFee === 0 ? '무료' : ShopUI.formatPrice(summary.shippingFee);
    if (fAmount) fAmount.innerText = ShopUI.formatPrice(summary.finalAmount);

    if (items.length === 0) {
      container.innerHTML = `
        <div class="py-16 text-center text-slate-400">
          <i data-lucide="shopping-bag" class="w-12 h-12 mx-auto stroke-1 mb-3 text-slate-300"></i>
          <p class="font-medium text-slate-600">장바구니가 비어 있습니다.</p>
          <p class="text-xs text-slate-400 mt-1">마음에 드는 상품을 담아보세요!</p>
          <a href="/products.html" onclick="ShopUI.closeCartDrawer()" class="inline-block mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-100 transition">
            상품 둘러보기
          </a>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    container.innerHTML = items.map((item) => `
      <div class="flex gap-3 pt-3 first:pt-0">
        <img src="${item.thumbnail}" alt="${item.name}" class="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0" />
        <div class="flex-1 min-w-0">
          <h4 class="text-xs font-bold text-slate-800 line-clamp-1">${item.name}</h4>
          ${item.selectedOption ? `<p class="text-[11px] text-slate-400 mt-0.5">${item.selectedOption}</p>` : ''}
          <div class="flex items-center justify-between mt-2">
            <span class="text-xs font-black text-indigo-600">${ShopUI.formatPrice(item.price)}</span>
            <div class="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <button onclick="CartStore.updateQuantity('${item.id}', '${item.selectedOption}', ${item.quantity - 1})" class="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100">-</button>
              <span class="px-2 text-xs font-bold">${item.quantity}</span>
              <button onclick="CartStore.updateQuantity('${item.id}', '${item.selectedOption}', ${item.quantity + 1})" class="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100">+</button>
            </div>
            <button onclick="CartStore.removeItem('${item.id}', '${item.selectedOption}')" class="text-slate-400 hover:text-rose-500 p-1">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  },

  // Render Footer
  renderFooter() {
    const root = document.getElementById('footer-root');
    if (!root) return;

    root.innerHTML = `
      <footer class="bg-slate-900 text-slate-400 text-sm mt-20 border-t border-slate-800">
        <!-- Trust badge bar -->
        <div class="border-b border-slate-800/80 py-8 bg-slate-950/40">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div class="flex flex-col sm:flex-row items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                <i data-lucide="shield-check" class="w-5 h-5"></i>
              </div>
              <div>
                <h5 class="text-slate-200 font-bold text-xs">100% 정품 보장</h5>
                <p class="text-[11px] text-slate-400">철저한 검수를 거친 정품 판매</p>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                <i data-lucide="truck" class="w-5 h-5"></i>
              </div>
              <div>
                <h5 class="text-slate-200 font-bold text-xs">안심 빠른 배송</h5>
                <p class="text-[11px] text-slate-400">오후 2시 이전 주문 당일 출고</p>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                <i data-lucide="refresh-cw" class="w-5 h-5"></i>
              </div>
              <div>
                <h5 class="text-slate-200 font-bold text-xs">7일 무료 반품</h5>
                <p class="text-[11px] text-slate-400">단순 변심도 손쉬운 반품 신청</p>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                <i data-lucide="headphones" class="w-5 h-5"></i>
              </div>
              <div>
                <h5 class="text-slate-200 font-bold text-xs">24/7 고객 만족 센터</h5>
                <p class="text-[11px] text-slate-400">1:1 실시간 상담 및 신속 응대</p>
              </div>
            </div>
          </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="space-y-4">
              <div class="flex items-center gap-2 text-white font-black text-xl font-heading">
                <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <i data-lucide="shopping-bag" class="w-4 h-4"></i>
                </div>
                EASY<span class="text-indigo-400">SHOP</span>
              </div>
              <p class="text-xs text-slate-400 leading-relaxed">
                이지샵(EasyShop)은 일상을 더 특별하게 만들어주는 프리미엄 라이프스타일 큐레이션 쇼핑몰입니다.
              </p>
              <div class="text-xs text-slate-500">
                © 2026 EasyShop Inc. All Rights Reserved.
              </div>
            </div>

            <div>
              <h4 class="text-white font-bold text-xs uppercase tracking-wider mb-4">고객센터 안내</h4>
              <p class="text-2xl font-black text-indigo-400 font-heading">1588-0000</p>
              <p class="text-xs text-slate-400 mt-2">운영시간: 평일 09:00 ~ 18:00 (점심 12:00 ~ 13:00)</p>
              <p class="text-xs text-slate-400">주말 및 공휴일 휴무 (1:1 문의 게시판 이용)</p>
            </div>

            <div>
              <h4 class="text-white font-bold text-xs uppercase tracking-wider mb-4">쇼핑 가이드</h4>
              <ul class="space-y-2 text-xs">
                <li><a href="/products.html" class="hover:text-white transition">카테고리 전체보기</a></li>
                <li><a href="/order-lookup.html" class="hover:text-white transition">주문 / 배송 실시간 조회</a></li>
                <li><a href="/cart.html" class="hover:text-white transition">장바구니 관리</a></li>
                <li><a href="/admin.html" class="hover:text-amber-400 transition font-semibold text-amber-400">관리자 대시보드</a></li>
              </ul>
            </div>

            <div>
              <h4 class="text-white font-bold text-xs uppercase tracking-wider mb-4">사업자 정보</h4>
              <div class="text-[11px] text-slate-400 space-y-1 leading-relaxed">
                <p>상호명: (주)이지샵 | 대표: 홍길동</p>
                <p>사업자등록번호: 123-45-67890</p>
                <p>통신판매업신고: 제2026-서울강남-01234호</p>
                <p>주소: 서울특별시 강남구 테헤란로 152 18층</p>
                <p>개인정보책임자: info@easyshop.kr</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  // Toast Notification
  showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const bgClass = type === 'success' ? 'bg-slate-900 text-white border-emerald-500/40' :
                    type === 'error' ? 'bg-rose-600 text-white border-rose-400' :
                    'bg-indigo-600 text-white border-indigo-400';
    
    const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'alert-triangle' : 'info';

    toast.className = `${bgClass} border shadow-2xl px-4 py-3 rounded-2xl flex items-center gap-3 pointer-events-auto transition-all duration-300 transform translate-y-4 opacity-0 text-sm font-semibold max-w-sm`;
    toast.innerHTML = `
      <i data-lucide="${icon}" class="w-5 h-5 shrink-0"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
    }, 10);

    setTimeout(() => {
      toast.classList.add('translate-y-4', 'opacity-0');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
};
