$ErrorActionPreference = 'Stop'
$shopDir = 'd:\92.SW\shop'
$publicDir = Join-Path $shopDir 'public'

# 1. index.html
$indexHtml = @'
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EASYSHOP - 프리미엄 라이프스타일 큐레이션 쇼핑몰</title>
  <meta name="description" content="트렌디한 패션, 최신 디지털 가전, 감성 뷰티 & 리빙 아이템을 한곳에서 만나는 프리미엄 쇼핑 플랫폼">
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/style.css">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#eef2ff',
              100: '#e0e7ff',
              500: '#6366f1',
              600: '#4f46e5',
              700: '#4338ca',
            }
          }
        }
      }
    }
  </script>
</head>
<body class="bg-slate-50 flex flex-col min-h-screen">

  <!-- Global Navbar -->
  <div id="navbar-root"></div>

  <main class="flex-grow">
    
    <!-- Hero Slider / Promotion Banner -->
    <section class="relative bg-slate-950 overflow-hidden text-white">
      <div class="absolute inset-0 z-0 opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=80" 
          alt="Hero Background" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div class="max-w-2xl space-y-6">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold tracking-wide">
            <i data-lucide="sparkles" class="w-4 h-4 text-amber-300"></i> 2026 F/W NEW ARRIVALS
          </div>
          
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            일상을 빛내는<br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-amber-200">감각적인 라이프스타일</span>
          </h1>

          <p class="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            엄선된 프리미엄 패션, 최신 테크 디바이스, 감성 리빙 오브제까지.<br class="hidden sm:inline">
            지금 첫 구매 고객 <strong>10% 특별 할인 쿠폰</strong>을 즉시 지급해 드립니다.
          </p>

          <div class="flex flex-wrap items-center gap-3 pt-4">
            <a href="/products.html" class="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5 flex items-center gap-2">
              <span>신상품 쇼핑하기</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
            <a href="/products.html?isSale=true" class="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 backdrop-blur-md transition flex items-center gap-2">
              <i data-lucide="tag" class="w-4 h-4 text-rose-400"></i>
              <span>타임세일 바로가기</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Category Quick Navigation Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
      <div id="category-grid" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <!-- Dynamically rendered categories -->
      </div>
    </section>

    <!-- Time Sale Banner Section (Countdown Widget) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <div class="bg-gradient-to-r from-rose-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl border border-rose-500/20">
        <div class="absolute -right-10 -bottom-10 w-72 h-72 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div class="space-y-3 text-center lg:text-left">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/20 text-rose-300 rounded-full text-xs font-black tracking-wider uppercase border border-rose-500/30">
              <i data-lucide="clock" class="w-4 h-4 text-rose-400 animate-pulse"></i> TODAY'S TIME SALE
            </div>
            <h2 class="text-2xl sm:text-3xl font-black tracking-tight">오늘 단 하루! 한정 수량 슈퍼 특가</h2>
            <p class="text-slate-300 text-sm">매일 밤 12시 새로운 상품으로 업데이트됩니다. 놓치지 마세요!</p>
          </div>

          <!-- Countdown Clock -->
          <div class="flex items-center gap-2 sm:gap-3 bg-slate-900/80 p-3 sm:p-4 rounded-2xl border border-white/10 backdrop-blur-md">
            <div class="text-center px-3 py-1.5 bg-white/5 rounded-xl min-w-[56px]">
              <span id="timer-hours" class="text-2xl font-black text-rose-400 font-mono">08</span>
              <span class="block text-[10px] text-slate-400 uppercase font-bold">Hours</span>
            </div>
            <span class="text-xl font-black text-rose-400">:</span>
            <div class="text-center px-3 py-1.5 bg-white/5 rounded-xl min-w-[56px]">
              <span id="timer-minutes" class="text-2xl font-black text-rose-400 font-mono">42</span>
              <span class="block text-[10px] text-slate-400 uppercase font-bold">Mins</span>
            </div>
            <span class="text-xl font-black text-rose-400">:</span>
            <div class="text-center px-3 py-1.5 bg-white/5 rounded-xl min-w-[56px]">
              <span id="timer-seconds" class="text-2xl font-black text-rose-400 font-mono">19</span>
              <span class="block text-[10px] text-slate-400 uppercase font-bold">Secs</span>
            </div>
          </div>
        </div>

        <!-- Hot Deal Products Row -->
        <div id="timesale-product-list" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <!-- Dynamically populated -->
        </div>
      </div>
    </section>

    <!-- Best Seller Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div class="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
            <i data-lucide="flame" class="w-4 h-4 text-amber-500"></i> Most Loved Items
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">실시간 베스트셀러</h2>
        </div>
        
        <!-- Category Filter Tabs -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 text-xs font-bold scrollbar-none" id="best-tabs">
          <button onclick="filterBestCategory('전체')" class="px-4 py-2 rounded-full bg-slate-900 text-white transition tab-btn active shrink-0" data-cat="전체">전체</button>
          <button onclick="filterBestCategory('패션 / 의류')" class="px-4 py-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition tab-btn shrink-0" data-cat="패션 / 의류">패션</button>
          <button onclick="filterBestCategory('디지털 / 가전')" class="px-4 py-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition tab-btn shrink-0" data-cat="디지털 / 가전">디지털</button>
          <button onclick="filterBestCategory('뷰티 / 케어')" class="px-4 py-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition tab-btn shrink-0" data-cat="뷰티 / 케어">뷰티</button>
          <button onclick="filterBestCategory('리빙 / 인테리어')" class="px-4 py-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition tab-btn shrink-0" data-cat="리빙 / 인테리어">리빙</button>
        </div>
      </div>

      <!-- Best Product Grid -->
      <div id="best-product-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        <!-- Dynamically rendered -->
      </div>
    </section>

    <!-- Promotion Banner -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div class="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900 via-violet-900 to-indigo-950 p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div class="space-y-4 max-w-xl text-center md:text-left">
          <span class="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">Membership Benefit</span>
          <h3 class="text-2xl sm:text-3xl font-black leading-tight">이지샵 프라임 멤버십<br>가입 즉시 50,000원 쿠폰팩 증정!</h3>
          <p class="text-indigo-200 text-sm">모든 상품 무료배송, 무제한 5% 적립, 매달 쏟아지는 시크릿 특가 혜택을 누려보세요.</p>
        </div>
        <a href="/products.html" class="px-8 py-4 bg-white text-indigo-900 font-extrabold rounded-2xl shadow-xl hover:bg-slate-100 transition shrink-0 transform hover:scale-105">
          지금 바로 혜택받기
        </a>
      </div>
    </section>

    <!-- Customer Reviews Feed -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div class="text-center max-w-xl mx-auto mb-10">
        <div class="inline-flex items-center gap-1.5 text-amber-500 font-bold text-xs uppercase tracking-wider mb-2">
          <i data-lucide="star" class="w-4 h-4 fill-amber-400"></i> REAL REVIEWS
        </div>
        <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">고객들이 증명하는 만족도</h2>
        <p class="text-slate-500 text-xs sm:text-sm mt-2">이지샵과 함께 일상을 업그레이드한 10만 고객의 실제 후기입니다.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div class="flex items-center gap-1 text-amber-400">
            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
          </div>
          <p class="text-xs text-slate-700 leading-relaxed font-medium">
            "캐시미어 코트 주문하고 다음날 바로 받았습니다. 백화점 100만원대 제품 못지않게 원단 퀄리티가 훌륭하고 핏이 정말 예뻐요!"
          </p>
          <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span class="font-bold text-slate-800">김*현 고객님</span>
            <span>캐시미어 오버핏 코트 구매</span>
          </div>
        </div>

        <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div class="flex items-center gap-1 text-amber-400">
            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
          </div>
          <p class="text-xs text-slate-700 leading-relaxed font-medium">
            "노이즈캔슬링 헤드폰 음질 진짜 미쳤습니다. 카페에서 집중할 때 최고고 가벼워서 하루 종일 써도 귀가 안 아파요."
          </p>
          <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span class="font-bold text-slate-800">최*혁 고객님</span>
            <span>에어사운드 헤드폰 프로 구매</span>
          </div>
        </div>

        <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div class="flex items-center gap-1 text-amber-400">
            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
          </div>
          <p class="text-xs text-slate-700 leading-relaxed font-medium">
            "드립백 세트 패키지가 너무 고급스러워서 집들이 선물용으로 대성공했습니다. 커피 향과 밸런스도 일품입니다."
          </p>
          <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span class="font-bold text-slate-800">한*숙 고객님</span>
            <span>스페셜티 드립백 세트 구매</span>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- Global Footer -->
  <div id="footer-root"></div>

  <!-- Scripts -->
  <script src="js/cart-store.js"></script>
  <script src="js/api.js"></script>
  <script src="js/components.js"></script>
  <script>
    let allProducts = [];

    document.addEventListener('DOMContentLoaded', async () => {
      ShopUI.renderNavbar('all');
      ShopUI.renderFooter();

      await loadCategories();
      await loadProducts();
      initCountdownTimer();
    });

    async function loadCategories() {
      const categories = await ShopAPI.getCategories();
      const container = document.getElementById('category-grid');
      if (!container || !categories) return;

      container.innerHTML = categories.map(cat => `
        <a href="/products.html?category=${encodeURIComponent(cat.name)}" class="group bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-300 transition flex flex-col items-center text-center">
          <div class="w-14 h-14 rounded-2xl overflow-hidden mb-3 group-hover:scale-105 transition">
            <img src="${cat.image}" alt="${cat.name}" class="w-full h-full object-cover" />
          </div>
          <h4 class="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition">${cat.name}</h4>
          <span class="text-[10px] text-slate-400 mt-0.5">${cat.badge ? `<span class="text-rose-500 font-bold">${cat.badge}</span>` : '전체보기'}</span>
        </a>
      `).join('');
    }

    async function loadProducts() {
      allProducts = await ShopAPI.getProducts();
      renderTimeSale();
      renderBestProducts('전체');
    }

    function renderTimeSale() {
      const container = document.getElementById('timesale-product-list');
      if (!container || !allProducts) return;

      const sales = allProducts.filter(p => p.isSale).slice(0, 4);
      container.innerHTML = sales.map(p => `
        <div class="bg-slate-900/90 rounded-2xl p-3 border border-white/10 hover:border-rose-500/50 transition group flex flex-col">
          <div class="relative rounded-xl overflow-hidden aspect-square mb-3">
            <img src="${p.thumbnail}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
            <span class="absolute top-2 left-2 px-2 py-0.5 bg-rose-600 text-white font-black text-xs rounded-lg shadow-sm">
              ${p.discountRate}% OFF
            </span>
          </div>
          <h4 class="text-xs font-bold text-white line-clamp-1 group-hover:text-rose-300 transition">${p.name}</h4>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="text-sm font-black text-rose-400">${ShopUI.formatPrice(p.price)}</span>
            <span class="text-[11px] text-slate-400 line-through">${ShopUI.formatPrice(p.originalPrice)}</span>
          </div>
          <div class="mt-auto pt-3">
            <a href="/product-detail.html?id=${p.id}" class="block w-full py-2 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 rounded-xl text-xs font-bold text-center transition">
              특가 구매하기
            </a>
          </div>
        </div>
      `).join('');
    }

    function renderBestProducts(category = '전체') {
      const container = document.getElementById('best-product-grid');
      if (!container || !allProducts) return;

      let filtered = allProducts;
      if (category !== '전체') {
        filtered = allProducts.filter(p => p.category === category);
      }

      container.innerHTML = filtered.map((p, idx) => `
        <div class="product-card bg-white rounded-3xl border border-slate-200/80 overflow-hidden flex flex-col group">
          <!-- Thumbnail -->
          <a href="/product-detail.html?id=${p.id}" class="zoom-container relative aspect-square bg-slate-100">
            <img src="${p.thumbnail}" alt="${p.name}" class="w-full h-full object-cover" />
            <!-- Badges -->
            <div class="absolute top-3 left-3 flex flex-col gap-1 z-10">
              ${p.isBest ? `<span class="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-black rounded-lg shadow-sm">BEST</span>` : ''}
              ${p.isNew ? `<span class="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-black rounded-lg shadow-sm">NEW</span>` : ''}
            </div>
            <!-- Wishlist Button -->
            <button 
              onclick="event.preventDefault(); toggleWish('${p.id}')"
              class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-rose-500 shadow-sm transition z-10"
            >
              <i data-lucide="heart" class="w-4 h-4 ${CartStore.isWishlisted(p.id) ? 'fill-rose-500 text-rose-500' : ''}"></i>
            </button>
          </a>

          <!-- Info -->
          <div class="p-4 sm:p-5 flex flex-col flex-1">
            <div class="text-[11px] font-bold text-indigo-600 uppercase mb-1">${p.category}</div>
            <a href="/product-detail.html?id=${p.id}" class="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition line-clamp-2 leading-snug">
              ${p.name}
            </a>

            <!-- Rating & Reviews -->
            <div class="flex items-center gap-1.5 mt-2 text-xs">
              <div class="flex items-center text-amber-400">
                <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
                <span class="text-slate-800 font-bold ml-1">${p.rating}</span>
              </div>
              <span class="text-slate-400 text-[11px]">(${p.reviewCount})</span>
            </div>

            <!-- Price -->
            <div class="mt-3 pt-3 border-t border-slate-100 flex items-baseline justify-between">
              <div>
                ${p.discountRate ? `<span class="text-xs font-black text-rose-500 mr-1.5">${p.discountRate}%</span>` : ''}
                <span class="text-sm sm:text-base font-black text-slate-900 font-heading">${ShopUI.formatPrice(p.price)}</span>
              </div>
              ${p.originalPrice > p.price ? `<span class="text-[11px] text-slate-400 line-through">${ShopUI.formatPrice(p.originalPrice)}</span>` : ''}
            </div>

            <!-- Quick Add to Cart Button -->
            <button 
              onclick="quickAddToCart('${p.id}')"
              class="w-full mt-4 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <i data-lucide="shopping-cart" class="w-3.5 h-3.5"></i>
              <span>장바구니 담기</span>
            </button>
          </div>
        </div>
      `).join('');

      if (window.lucide) window.lucide.createIcons();
    }

    function filterBestCategory(category) {
      document.querySelectorAll('#best-tabs .tab-btn').forEach(btn => {
        if (btn.getAttribute('data-cat') === category) {
          btn.className = 'px-4 py-2 rounded-full bg-slate-900 text-white transition tab-btn active shrink-0';
        } else {
          btn.className = 'px-4 py-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition tab-btn shrink-0';
        }
      });
      renderBestProducts(category);
    }

    function toggleWish(id) {
      const p = allProducts.find(item => item.id === id);
      if (p) {
        const added = CartStore.toggleWishlist(p);
        ShopUI.showToast(added ? '위시리스트에 담았습니다 ❤️' : '위시리스트에서 제외했습니다.');
        renderBestProducts(document.querySelector('#best-tabs .tab-btn.active')?.getAttribute('data-cat') || '전체');
      }
    }

    function quickAddToCart(id) {
      const p = allProducts.find(item => item.id === id);
      if (p) {
        const defaultOption = p.options && p.options.length > 0 ? p.options[0].name : '';
        CartStore.addItem(p, defaultOption, 1);
        ShopUI.showToast(`[${p.name}] 상품을 장바구니에 담았습니다!`);
        ShopUI.openCartDrawer();
      }
    }

    function initCountdownTimer() {
      let hours = 8, minutes = 42, seconds = 19;
      setInterval(() => {
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) hours--;
          }
        }
        document.getElementById('timer-hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('timer-minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('timer-seconds').innerText = String(seconds).padStart(2, '0');
      }, 1000);
    }
  </script>
</body>
</html>
'@

[System.IO.File]::WriteAllText((Join-Path $publicDir 'index.html'), $indexHtml, [System.Text.Encoding]::UTF8)
Write-Host "Generated: index.html" -ForegroundColor Green

# 2. products.html (Catalog & Multi-filter)
$productsHtml = @'
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>전체 상품 탐색 - EASYSHOP</title>
  <meta name="description" content="카테고리별, 가격대별 맞춤 필터링으로 원하는 상품을 빠르게 찾아보세요.">
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/style.css">
</head>
<body class="bg-slate-50 flex flex-col min-h-screen">

  <!-- Global Navbar -->
  <div id="navbar-root"></div>

  <main class="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
    
    <!-- Breadcrumb & Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
      <div>
        <nav class="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <a href="/index.html" class="hover:text-slate-600 transition">홈</a>
          <i data-lucide="chevron-right" class="w-3 h-3"></i>
          <span class="text-indigo-600 font-bold" id="page-category-title">전체 상품</span>
        </nav>
        <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
          상품 탐색 & 쇼핑
        </h1>
      </div>

      <!-- Result Count & Sort Dropdown -->
      <div class="flex items-center gap-3 self-end sm:self-auto">
        <span class="text-xs text-slate-500">총 <strong class="text-indigo-600 font-black text-sm" id="result-count">0</strong>개 상품</span>
        <select id="sort-select" onchange="applyFilters()" class="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-500 shadow-xs cursor-pointer">
          <option value="recommended">추천순</option>
          <option value="best">판매인기순</option>
          <option value="price_asc">낮은 가격순</option>
          <option value="price_desc">높은 가격순</option>
          <option value="rating">평점 높은순</option>
          <option value="reviews">리뷰 많은순</option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
      
      <!-- Left Filter Sidebar -->
      <aside class="space-y-6">
        <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
              <i data-lucide="sliders-horizontal" class="w-4 h-4 text-indigo-600"></i> 필터 옵션
            </h3>
            <button onclick="resetFilters()" class="text-xs font-bold text-slate-400 hover:text-indigo-600 transition">
              초기화
            </button>
          </div>

          <!-- Category Filter -->
          <div class="space-y-3">
            <label class="block text-xs font-black text-slate-800 uppercase tracking-wider">카테고리</label>
            <div class="space-y-2 text-xs font-medium text-slate-600" id="filter-categories">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="category" value="전체" checked onchange="applyFilters()" class="text-indigo-600 focus:ring-indigo-500" />
                <span>전체 보기</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="category" value="패션 / 의류" onchange="applyFilters()" class="text-indigo-600 focus:ring-indigo-500" />
                <span>패션 / 의류</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="category" value="디지털 / 가전" onchange="applyFilters()" class="text-indigo-600 focus:ring-indigo-500" />
                <span>디지털 / 가전</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="category" value="뷰티 / 케어" onchange="applyFilters()" class="text-indigo-600 focus:ring-indigo-500" />
                <span>뷰티 / 케어</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="category" value="리빙 / 인테리어" onchange="applyFilters()" class="text-indigo-600 focus:ring-indigo-500" />
                <span>리빙 / 인테리어</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="category" value="푸드 / 키친" onchange="applyFilters()" class="text-indigo-600 focus:ring-indigo-500" />
                <span>푸드 / 키친</span>
              </label>
            </div>
          </div>

          <!-- Price Range Filter -->
          <div class="space-y-3 pt-4 border-t border-slate-100">
            <label class="block text-xs font-black text-slate-800 uppercase tracking-wider">가격대</label>
            <div class="space-y-2 text-xs font-medium text-slate-600">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="price_range" value="all" checked onchange="applyFilters()" class="text-indigo-600" />
                <span>전체 가격대</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="price_range" value="0-50000" onchange="applyFilters()" class="text-indigo-600" />
                <span>50,000원 이하</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="price_range" value="50000-150000" onchange="applyFilters()" class="text-indigo-600" />
                <span>50,000원 ~ 150,000원</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="price_range" value="150000-9999999" onchange="applyFilters()" class="text-indigo-600" />
                <span>150,000원 이상</span>
              </label>
            </div>
          </div>

          <!-- Benefits Filter -->
          <div class="space-y-3 pt-4 border-t border-slate-100">
            <label class="block text-xs font-black text-slate-800 uppercase tracking-wider">혜택 및 조건</label>
            <div class="space-y-2 text-xs font-medium text-slate-600">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="chk-free-shipping" onchange="applyFilters()" class="rounded text-indigo-600" />
                <span>무료 배송 상품</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="chk-sale" onchange="applyFilters()" class="rounded text-indigo-600" />
                <span>세일 특가 상품</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="chk-best" onchange="applyFilters()" class="rounded text-indigo-600" />
                <span>베스트셀러</span>
              </label>
            </div>
          </div>
        </div>
      </aside>

      <!-- Right Product Grid -->
      <section class="lg:col-span-3">
        <div id="product-list-container" class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <!-- Dynamically populated -->
        </div>

        <div id="no-results" class="hidden py-24 text-center bg-white rounded-3xl border border-slate-200/80">
          <i data-lucide="package-search" class="w-12 h-12 mx-auto stroke-1 mb-3 text-slate-300"></i>
          <h4 class="font-bold text-slate-800">조건에 일치하는 상품이 없습니다.</h4>
          <p class="text-xs text-slate-400 mt-1">필터 조건을 완화하거나 검색어를 변경해 보세요.</p>
          <button onclick="resetFilters()" class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold">
            필터 전체 초기화
          </button>
        </div>
      </section>

    </div>

  </main>

  <!-- Global Footer -->
  <div id="footer-root"></div>

  <!-- Scripts -->
  <script src="js/cart-store.js"></script>
  <script src="js/api.js"></script>
  <script src="js/components.js"></script>
  <script>
    let rawProducts = [];

    document.addEventListener('DOMContentLoaded', async () => {
      ShopUI.renderNavbar('all');
      ShopUI.renderFooter();

      // Read URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const catParam = urlParams.get('category');
      const searchParam = urlParams.get('search');
      const isSale = urlParams.get('isSale');
      const isBest = urlParams.get('isBest');

      if (catParam) {
        const catRadio = document.querySelector(`input[name="category"][value="${catParam}"]`);
        if (catRadio) catRadio.checked = true;
        document.getElementById('page-category-title').innerText = catParam;
      }
      if (searchParam) {
        const searchInput = document.getElementById('global-search-input');
        if (searchInput) searchInput.value = searchParam;
      }
      if (isSale) document.getElementById('chk-sale').checked = true;
      if (isBest) document.getElementById('chk-best').checked = true;

      rawProducts = await ShopAPI.getProducts();
      applyFilters();
    });

    function applyFilters() {
      const selectedCat = document.querySelector('input[name="category"]:checked')?.value || '전체';
      const selectedPrice = document.querySelector('input[name="price_range"]:checked')?.value || 'all';
      const freeShipping = document.getElementById('chk-free-shipping').checked;
      const onlySale = document.getElementById('chk-sale').checked;
      const onlyBest = document.getElementById('chk-best').checked;
      const sortBy = document.getElementById('sort-select').value;
      const urlParams = new URLSearchParams(window.location.search);
      const searchKeyword = urlParams.get('search')?.toLowerCase() || '';

      document.getElementById('page-category-title').innerText = selectedCat;

      let filtered = [...rawProducts];

      // Category
      if (selectedCat !== '전체') {
        filtered = filtered.filter(p => p.category === selectedCat);
      }

      // Search keyword
      if (searchKeyword) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchKeyword) || p.summary?.toLowerCase().includes(searchKeyword));
      }

      // Price
      if (selectedPrice === '0-50000') {
        filtered = filtered.filter(p => p.price <= 50000);
      } else if (selectedPrice === '50000-150000') {
        filtered = filtered.filter(p => p.price > 50000 && p.price <= 150000);
      } else if (selectedPrice === '150000-9999999') {
        filtered = filtered.filter(p => p.price > 150000);
      }

      // Benefits
      if (freeShipping) filtered = filtered.filter(p => p.isFreeShipping || p.price >= 50000);
      if (onlySale) filtered = filtered.filter(p => p.isSale);
      if (onlyBest) filtered = filtered.filter(p => p.isBest);

      // Sorting
      if (sortBy === 'best') filtered.sort((a, b) => (b.isBest ? 1 : 0) - (a.isBest ? 1 : 0));
      else if (sortBy === 'price_asc') filtered.sort((a, b) => a.price - b.price);
      else if (sortBy === 'price_desc') filtered.sort((a, b) => b.price - a.price);
      else if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);
      else if (sortBy === 'reviews') filtered.sort((a, b) => b.reviewCount - a.reviewCount);

      renderProductGrid(filtered);
    }

    function renderProductGrid(products) {
      const container = document.getElementById('product-list-container');
      const noResults = document.getElementById('no-results');
      const countEl = document.getElementById('result-count');

      countEl.innerText = products.length;

      if (products.length === 0) {
        container.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
      }

      noResults.classList.add('hidden');
      container.innerHTML = products.map(p => `
        <div class="product-card bg-white rounded-3xl border border-slate-200/80 overflow-hidden flex flex-col group">
          <a href="/product-detail.html?id=${p.id}" class="zoom-container relative aspect-square bg-slate-100">
            <img src="${p.thumbnail}" alt="${p.name}" class="w-full h-full object-cover" />
            <div class="absolute top-3 left-3 flex flex-col gap-1 z-10">
              ${p.isBest ? `<span class="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-black rounded-lg shadow-sm">BEST</span>` : ''}
              ${p.isSale ? `<span class="px-2 py-0.5 bg-rose-500 text-white text-[10px] font-black rounded-lg shadow-sm">${p.discountRate}% OFF</span>` : ''}
            </div>
            <button 
              onclick="event.preventDefault(); toggleWish('${p.id}')"
              class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-rose-500 shadow-sm transition z-10"
            >
              <i data-lucide="heart" class="w-4 h-4 ${CartStore.isWishlisted(p.id) ? 'fill-rose-500 text-rose-500' : ''}"></i>
            </button>
          </a>

          <div class="p-4 sm:p-5 flex flex-col flex-1">
            <span class="text-[11px] font-bold text-indigo-600 uppercase mb-1">${p.category}</span>
            <a href="/product-detail.html?id=${p.id}" class="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition line-clamp-2 leading-snug">
              ${p.name}
            </a>

            <div class="flex items-center gap-1.5 mt-2 text-xs">
              <div class="flex items-center text-amber-400">
                <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
                <span class="text-slate-800 font-bold ml-1">${p.rating}</span>
              </div>
              <span class="text-slate-400 text-[11px]">(${p.reviewCount})</span>
            </div>

            <div class="mt-3 pt-3 border-t border-slate-100 flex items-baseline justify-between">
              <div>
                ${p.discountRate ? `<span class="text-xs font-black text-rose-500 mr-1.5">${p.discountRate}%</span>` : ''}
                <span class="text-sm sm:text-base font-black text-slate-900 font-heading">${ShopUI.formatPrice(p.price)}</span>
              </div>
              ${p.originalPrice > p.price ? `<span class="text-[11px] text-slate-400 line-through">${ShopUI.formatPrice(p.originalPrice)}</span>` : ''}
            </div>

            <button 
              onclick="quickAddToCart('${p.id}')"
              class="w-full mt-4 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <i data-lucide="shopping-cart" class="w-3.5 h-3.5"></i>
              <span>장바구니 담기</span>
            </button>
          </div>
        </div>
      `).join('');

      if (window.lucide) window.lucide.createIcons();
    }

    function resetFilters() {
      document.querySelector('input[name="category"][value="전체"]').checked = true;
      document.querySelector('input[name="price_range"][value="all"]').checked = true;
      document.getElementById('chk-free-shipping').checked = false;
      document.getElementById('chk-sale').checked = false;
      document.getElementById('chk-best').checked = false;
      document.getElementById('sort-select').value = 'recommended';
      applyFilters();
    }

    function toggleWish(id) {
      const p = rawProducts.find(item => item.id === id);
      if (p) {
        const added = CartStore.toggleWishlist(p);
        ShopUI.showToast(added ? '위시리스트에 담았습니다 ❤️' : '위시리스트에서 제외했습니다.');
        applyFilters();
      }
    }

    function quickAddToCart(id) {
      const p = rawProducts.find(item => item.id === id);
      if (p) {
        const defaultOption = p.options && p.options.length > 0 ? p.options[0].name : '';
        CartStore.addItem(p, defaultOption, 1);
        ShopUI.showToast(`[${p.name}] 상품을 장바구니에 담았습니다!`);
        ShopUI.openCartDrawer();
      }
    }
  </script>
</body>
</html>
'@

[System.IO.File]::WriteAllText((Join-Path $publicDir 'products.html'), $productsHtml, [System.Text.Encoding]::UTF8)
Write-Host "Generated: products.html" -ForegroundColor Green
