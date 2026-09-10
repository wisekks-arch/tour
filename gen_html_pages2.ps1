$ErrorActionPreference = 'Stop'
$shopDir = 'd:\92.SW\shop'
$publicDir = Join-Path $shopDir 'public'

# 1. product-detail.html
$detailHtml = @'
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>상품 상세 - EASYSHOP</title>
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
    
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-xs text-slate-400 mb-6">
      <a href="/index.html" class="hover:text-slate-600 transition">홈</a>
      <i data-lucide="chevron-right" class="w-3 h-3"></i>
      <a href="/products.html" id="breadcrumb-category" class="hover:text-slate-600 transition">카테고리</a>
      <i data-lucide="chevron-right" class="w-3 h-3"></i>
      <span class="text-indigo-600 font-bold truncate max-w-xs" id="breadcrumb-title">상품 상세</span>
    </nav>

    <!-- Main Detail Section (Gallery + Info/Buy Panel) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs">
      
      <!-- Left: Image Gallery (5 cols) -->
      <div class="lg:col-span-6 space-y-4">
        <div class="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 relative">
          <img id="main-product-image" src="" alt="상품 이미지" class="w-full h-full object-cover transition-all duration-300" />
          <div id="badge-container" class="absolute top-4 left-4 flex gap-1.5"></div>
        </div>
        <!-- Thumbnails -->
        <div id="thumbnail-gallery" class="flex gap-3 overflow-x-auto pb-2">
          <!-- Thumbnail buttons -->
        </div>
      </div>

      <!-- Right: Info & Purchase Options (6 cols) -->
      <div class="lg:col-span-6 flex flex-col justify-between space-y-6">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span id="product-category-tag" class="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">카테고리</span>
            <button onclick="toggleDetailWish()" class="p-2.5 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition">
              <i id="wish-heart-icon" data-lucide="heart" class="w-5 h-5"></i>
            </button>
          </div>

          <h1 id="product-title" class="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">상품명</h1>
          <p id="product-summary" class="text-xs sm:text-sm text-slate-500 leading-relaxed">요약 설명</p>

          <!-- Ratings -->
          <div class="flex items-center gap-2 text-xs pb-4 border-b border-slate-100">
            <div class="flex items-center text-amber-400">
              <i data-lucide="star" class="w-4 h-4 fill-current"></i>
              <span id="product-rating" class="font-bold text-slate-800 ml-1">4.9</span>
            </div>
            <span class="text-slate-300">|</span>
            <span class="text-slate-500">구매후기 <strong id="product-review-count" class="text-slate-800">140</strong>건</span>
            <span class="text-slate-300">|</span>
            <span class="text-emerald-600 font-bold">100% 정품 보장</span>
          </div>

          <!-- Price Display -->
          <div class="space-y-1">
            <div class="flex items-baseline gap-2">
              <span id="product-discount-rate" class="text-2xl font-black text-rose-500">25%</span>
              <span id="product-price" class="text-3xl font-black text-slate-900 font-heading">0원</span>
              <span id="product-original-price" class="text-sm text-slate-400 line-through">0원</span>
            </div>
          </div>

          <!-- Benefits Card -->
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs space-y-2 text-slate-600">
            <div class="flex items-center justify-between">
              <span class="text-slate-400">배송 혜택</span>
              <span class="font-bold text-slate-800" id="shipping-benefit-text">50,000원 이상 무료배송 (CJ대한통운)</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-400">출고 일정</span>
              <span class="font-bold text-indigo-600">오늘 오후 2시 이전 결제 시 당일 출고</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-400">적립 혜택</span>
              <span class="font-semibold text-slate-700">구매 시 최대 5% 포인트 적립</span>
            </div>
          </div>

          <!-- Options Selector -->
          <div class="space-y-2 pt-2" id="option-select-container">
            <label class="block text-xs font-bold text-slate-800">옵션 선택</label>
            <select id="option-select" onchange="updateCalculation()" class="w-full p-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-500">
              <!-- Options populated dynamically -->
            </select>
          </div>

          <!-- Quantity Selector -->
          <div class="flex items-center justify-between p-4 bg-slate-100 rounded-2xl">
            <span class="text-xs font-bold text-slate-700">주문 수량</span>
            <div class="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden">
              <button onclick="changeQty(-1)" class="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 font-bold">-</button>
              <input type="number" id="buy-qty" value="1" min="1" max="99" onchange="updateCalculation()" class="w-12 text-center text-xs font-bold focus:outline-none" />
              <button onclick="changeQty(1)" class="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 font-bold">+</button>
            </div>
          </div>
        </div>

        <!-- Total Price & Action Buttons -->
        <div class="pt-6 border-t border-slate-100 space-y-4">
          <div class="flex items-baseline justify-between">
            <span class="text-xs font-bold text-slate-500">총 상품 금액</span>
            <span id="total-calc-price" class="text-2xl font-black text-indigo-600 font-heading">0원</span>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <button 
              type="button" 
              onclick="addToCartAction()" 
              class="py-4 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition shadow-md flex items-center justify-center gap-2 text-sm"
            >
              <i data-lucide="shopping-cart" class="w-4 h-4"></i>
              <span>장바구니 담기</span>
            </button>
            <button 
              type="button" 
              onclick="buyNowAction()" 
              class="py-4 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 text-sm"
            >
              <i data-lucide="zap" class="w-4 h-4"></i>
              <span>바로 구매하기</span>
            </button>
          </div>
        </div>

      </div>

    </div>

    <!-- Detail Content Tabs Section -->
    <div class="mt-12 bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
      <!-- Tab Headers -->
      <div class="flex border-b border-slate-200 text-sm font-bold bg-slate-50">
        <button onclick="switchTab('desc')" id="tab-btn-desc" class="flex-1 py-4 text-center border-b-2 border-indigo-600 text-indigo-600 bg-white">상세 정보</button>
        <button onclick="switchTab('specs')" id="tab-btn-specs" class="flex-1 py-4 text-center border-b-2 border-transparent text-slate-500 hover:text-slate-800">기본 정보 & 스펙</button>
        <button onclick="switchTab('reviews')" id="tab-btn-reviews" class="flex-1 py-4 text-center border-b-2 border-transparent text-slate-500 hover:text-slate-800">구매 후기 (<span id="tab-review-count">0</span>)</button>
        <button onclick="switchTab('qna')" id="tab-btn-qna" class="flex-1 py-4 text-center border-b-2 border-transparent text-slate-500 hover:text-slate-800">Q&A 문의</button>
      </div>

      <!-- Tab Content 1: Description -->
      <div id="tab-content-desc" class="p-8 sm:p-12 space-y-6 text-slate-700 leading-relaxed">
        <div id="product-html-description" class="prose max-w-none"></div>
      </div>

      <!-- Tab Content 2: Specs -->
      <div id="tab-content-specs" class="p-8 sm:p-12 hidden">
        <h3 class="text-base font-bold text-slate-900 mb-4">상품 고시 정보</h3>
        <table class="w-full text-xs text-left border-collapse border border-slate-200">
          <tbody id="specs-table-body" class="divide-y divide-slate-200">
            <!-- Dynamically populated -->
          </tbody>
        </table>
      </div>

      <!-- Tab Content 3: Reviews -->
      <div id="tab-content-reviews" class="p-8 sm:p-12 hidden space-y-8">
        <div class="flex items-center justify-between pb-6 border-b border-slate-200">
          <div>
            <h3 class="text-lg font-bold text-slate-900">구매 고객 후기</h3>
            <p class="text-xs text-slate-400 mt-1">실제 구매 고객이 작성한 솔직한 리뷰입니다.</p>
          </div>
          <button onclick="openReviewModal()" class="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition">
            리뷰 작성하기
          </button>
        </div>
        <div id="review-list" class="space-y-4 divide-y divide-slate-100">
          <!-- Reviews list -->
        </div>
      </div>

      <!-- Tab Content 4: Q&A -->
      <div id="tab-content-qna" class="p-8 sm:p-12 hidden space-y-6">
        <div class="flex items-center justify-between pb-6 border-b border-slate-200">
          <div>
            <h3 class="text-lg font-bold text-slate-900">상품 Q&A</h3>
            <p class="text-xs text-slate-400 mt-1">상품에 대해 궁금한 점을 질문해 보세요.</p>
          </div>
          <button onclick="openQnaModal()" class="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition">
            1:1 문의 작성
          </button>
        </div>
        <div id="qna-list" class="space-y-4 divide-y divide-slate-100">
          <!-- QNA list -->
        </div>
      </div>

    </div>

  </main>

  <!-- Global Footer -->
  <div id="footer-root"></div>

  <!-- Scripts -->
  <script src="js/cart-store.js"></script>
  <script src="js/api.js"></script>
  <script src="js/components.js"></script>
  <script>
    let currentProduct = null;

    document.addEventListener('DOMContentLoaded', async () => {
      ShopUI.renderNavbar();
      ShopUI.renderFooter();

      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('id') || 'prod-01';

      currentProduct = await ShopAPI.getProductById(productId);
      if (!currentProduct) {
        alert('존재하지 않는 상품입니다.');
        window.location.href = '/products.html';
        return;
      }

      renderProductDetails(currentProduct);
    });

    function renderProductDetails(p) {
      document.title = `${p.name} - EASYSHOP`;
      document.getElementById('breadcrumb-category').innerText = p.category;
      document.getElementById('breadcrumb-category').href = `/products.html?category=${encodeURIComponent(p.category)}`;
      document.getElementById('breadcrumb-title').innerText = p.name;

      document.getElementById('main-product-image').src = p.thumbnail;
      document.getElementById('product-category-tag').innerText = p.category;
      document.getElementById('product-title').innerText = p.name;
      document.getElementById('product-summary').innerText = p.summary || '';
      document.getElementById('product-rating').innerText = p.rating || 5.0;
      document.getElementById('product-review-count').innerText = p.reviewCount || 0;
      document.getElementById('tab-review-count').innerText = p.reviewCount || 0;

      if (p.discountRate) {
        document.getElementById('product-discount-rate').innerText = `${p.discountRate}%`;
        document.getElementById('product-original-price').innerText = ShopUI.formatPrice(p.originalPrice);
      } else {
        document.getElementById('product-discount-rate').style.display = 'none';
        document.getElementById('product-original-price').style.display = 'none';
      }

      document.getElementById('product-price').innerText = ShopUI.formatPrice(p.price);

      // Gallery Thumbnails
      const thumbsContainer = document.getElementById('thumbnail-gallery');
      const allImages = p.images && p.images.length > 0 ? p.images : [p.thumbnail];
      thumbsContainer.innerHTML = allImages.map((img, i) => `
        <button onclick="setMainImage('${img}')" class="w-16 h-16 rounded-xl overflow-hidden border-2 hover:border-indigo-600 transition shrink-0 ${i === 0 ? 'border-indigo-600' : 'border-slate-200'}">
          <img src="${img}" alt="썸네일" class="w-full h-full object-cover" />
        </button>
      `).join('');

      // Options
      const optSelect = document.getElementById('option-select');
      if (p.options && p.options.length > 0) {
        optSelect.innerHTML = p.options.map(o => `
          <option value="${o.name}">${o.name} (재고: ${o.stock}개)</option>
        `).join('');
      } else {
        optSelect.innerHTML = `<option value="기본">단일 기본 옵션</option>`;
      }

      // Specs
      const specsTable = document.getElementById('specs-table-body');
      if (p.specs) {
        specsTable.innerHTML = Object.entries(p.specs).map(([k, v]) => `
          <tr class="border-b border-slate-100">
            <th class="p-3 bg-slate-50 font-bold text-slate-700 w-1/3">${k}</th>
            <td class="p-3 text-slate-600">${v}</td>
          </tr>
        `).join('');
      }

      // Description HTML
      document.getElementById('product-html-description').innerHTML = p.description || p.summary;

      // Reviews
      renderReviews(p.reviews || []);

      // QNA
      renderQnas(p.qnas || []);

      updateCalculation();
      updateWishIcon();
    }

    function setMainImage(url) {
      document.getElementById('main-product-image').src = url;
    }

    function changeQty(delta) {
      const input = document.getElementById('buy-qty');
      let val = parseInt(input.value) + delta;
      if (val < 1) val = 1;
      if (val > 99) val = 99;
      input.value = val;
      updateCalculation();
    }

    function updateCalculation() {
      if (!currentProduct) return;
      const qty = parseInt(document.getElementById('buy-qty').value) || 1;
      const total = currentProduct.price * qty;
      document.getElementById('total-calc-price').innerText = ShopUI.formatPrice(total);
    }

    function switchTab(tab) {
      ['desc', 'specs', 'reviews', 'qna'].forEach(t => {
        document.getElementById(`tab-content-${t}`).classList.add('hidden');
        document.getElementById(`tab-btn-${t}`).className = 'flex-1 py-4 text-center border-b-2 border-transparent text-slate-500 hover:text-slate-800';
      });

      document.getElementById(`tab-content-${tab}`).classList.remove('hidden');
      document.getElementById(`tab-btn-${tab}`).className = 'flex-1 py-4 text-center border-b-2 border-indigo-600 text-indigo-600 bg-white';
    }

    function addToCartAction() {
      if (!currentProduct) return;
      const opt = document.getElementById('option-select').value;
      const qty = parseInt(document.getElementById('buy-qty').value) || 1;
      CartStore.addItem(currentProduct, opt, qty);
      ShopUI.showToast(`[${currentProduct.name}] 장바구니에 담았습니다!`);
      ShopUI.openCartDrawer();
    }

    function buyNowAction() {
      if (!currentProduct) return;
      const opt = document.getElementById('option-select').value;
      const qty = parseInt(document.getElementById('buy-qty').value) || 1;
      CartStore.addItem(currentProduct, opt, qty);
      window.location.href = '/checkout.html';
    }

    function toggleDetailWish() {
      if (!currentProduct) return;
      const added = CartStore.toggleWishlist(currentProduct);
      ShopUI.showToast(added ? '위시리스트에 담았습니다 ❤️' : '위시리스트에서 제외했습니다.');
      updateWishIcon();
    }

    function updateWishIcon() {
      if (!currentProduct) return;
      const icon = document.getElementById('wish-heart-icon');
      if (icon) {
        if (CartStore.isWishlisted(currentProduct.id)) {
          icon.classList.add('fill-rose-500', 'text-rose-500');
        } else {
          icon.classList.remove('fill-rose-500', 'text-rose-500');
        }
      }
    }

    function renderReviews(reviews) {
      const container = document.getElementById('review-list');
      if (!container) return;
      if (reviews.length === 0) {
        container.innerHTML = `<p class="text-xs text-slate-400 py-6 text-center">작성된 리뷰가 없습니다. 첫 리뷰를 작성해 보세요!</p>`;
        return;
      }
      container.innerHTML = reviews.map(r => `
        <div class="pt-4 first:pt-0 space-y-2">
          <div class="flex items-center justify-between text-xs">
            <div class="flex items-center gap-2">
              <span class="font-bold text-slate-900">${r.author}</span>
              <div class="flex text-amber-400">
                ${'<i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>'.repeat(r.rating)}
              </div>
            </div>
            <span class="text-slate-400">${r.date}</span>
          </div>
          <p class="text-xs text-slate-700 leading-relaxed">${r.content}</p>
        </div>
      `).join('');
      if (window.lucide) window.lucide.createIcons();
    }

    function renderQnas(qnas) {
      const container = document.getElementById('qna-list');
      if (!container) return;
      if (qnas.length === 0) {
        container.innerHTML = `<p class="text-xs text-slate-400 py-6 text-center">등록된 상품 문의가 없습니다.</p>`;
        return;
      }
      container.innerHTML = qnas.map(q => `
        <div class="pt-4 first:pt-0 space-y-2 text-xs">
          <div class="flex items-center justify-between">
            <span class="font-bold text-slate-800">Q. ${q.question}</span>
            <span class="text-slate-400">${q.date} (${q.author})</span>
          </div>
          ${q.answer ? `
            <div class="p-3 bg-indigo-50/60 rounded-xl text-indigo-950 mt-2">
              <p class="font-bold">A. 관리자 답변:</p>
              <p class="mt-1 text-slate-700">${q.answer}</p>
            </div>
          ` : '<span class="text-amber-600 font-semibold">[답변대기중]</span>'}
        </div>
      `).join('');
    }

    function openReviewModal() {
      const content = prompt('리뷰 내용을 입력해 주세요:');
      if (content) {
        currentProduct.reviews = currentProduct.reviews || [];
        currentProduct.reviews.unshift({
          id: 'rev-' + Date.now(),
          author: '구매고객',
          rating: 5,
          date: new Date().toISOString().slice(0, 10),
          content: content
        });
        currentProduct.reviewCount = (currentProduct.reviewCount || 0) + 1;
        renderProductDetails(currentProduct);
        ShopUI.showToast('소중한 리뷰가 등록되었습니다!');
      }
    }

    function openQnaModal() {
      const question = prompt('상품 문의 내용을 입력해 주세요:');
      if (question) {
        currentProduct.qnas = currentProduct.qnas || [];
        currentProduct.qnas.unshift({
          id: 'qna-' + Date.now(),
          author: '고객',
          date: new Date().toISOString().slice(0, 10),
          question: question,
          answer: ''
        });
        renderQnas(currentProduct.qnas);
        ShopUI.showToast('문의가 접수되었습니다. 담당자가 곧 답변드립니다.');
      }
    }
  </script>
</body>
</html>
'@

[System.IO.File]::WriteAllText((Join-Path $publicDir 'product-detail.html'), $detailHtml, [System.Text.Encoding]::UTF8)
Write-Host "Generated: product-detail.html" -ForegroundColor Green

# 2. cart.html
$cartHtml = @'
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>장바구니 - EASYSHOP</title>
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

  <main class="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
    
    <div class="mb-8">
      <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
        장바구니 (<span id="cart-page-count">0</span>)
      </h1>
      <p class="text-xs text-slate-500 mt-1">주문하실 상품의 수량 및 옵션을 확인해 주세요.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- Left: Cart Items Table (8 cols) -->
      <div class="lg:col-span-8 space-y-4">
        
        <!-- Free Shipping Benefit Progress Bar -->
        <div class="bg-indigo-50 p-5 rounded-3xl border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <i data-lucide="truck" class="w-5 h-5"></i>
            </div>
            <div>
              <h4 class="text-xs font-bold text-slate-900" id="cart-shipping-msg">50,000원 이상 무료배송</h4>
              <p class="text-[11px] text-slate-500">배송비 3,000원 절약 혜택</p>
            </div>
          </div>
          <div class="w-full sm:w-48 bg-indigo-200/60 h-2.5 rounded-full overflow-hidden">
            <div id="cart-shipping-bar" class="h-full bg-indigo-600 transition-all duration-500" style="width: 0%"></div>
          </div>
        </div>

        <!-- Controls Bar -->
        <div class="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs font-semibold">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" id="select-all-chk" onchange="toggleAll(this.checked)" checked class="rounded text-indigo-600 focus:ring-indigo-500" />
            <span class="text-slate-800">전체 선택</span>
          </label>
          <button onclick="removeSelectedItems()" class="text-slate-400 hover:text-rose-600 transition flex items-center gap-1">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> 선택 삭제
          </button>
        </div>

        <!-- Items Container -->
        <div id="cart-items-container" class="space-y-3">
          <!-- Dynamically loaded -->
        </div>

        <!-- Empty Cart Notice -->
        <div id="cart-empty-view" class="hidden bg-white p-16 rounded-3xl border border-slate-200/80 text-center space-y-4">
          <i data-lucide="shopping-cart" class="w-16 h-16 mx-auto stroke-1 text-slate-300"></i>
          <h3 class="text-base font-bold text-slate-800">장바구니가 비어 있습니다.</h3>
          <p class="text-xs text-slate-400">마음에 드는 상품을 찾아 장바구니에 담아보세요!</p>
          <a href="/products.html" class="inline-block px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-bold hover:bg-indigo-700 transition">
            상품 쇼핑하러 가기
          </a>
        </div>

      </div>

      <!-- Right: Summary & Checkout (4 cols) -->
      <div class="lg:col-span-4 space-y-6">
        
        <!-- Coupon Widget -->
        <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <h3 class="text-xs font-black text-slate-900 uppercase tracking-wider">할인 쿠폰 적용</h3>
          <div class="flex gap-2">
            <input 
              type="text" 
              id="coupon-input" 
              placeholder="WELCOME10 또는 EASY2026" 
              class="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl uppercase font-semibold focus:outline-none focus:border-indigo-500"
            />
            <button onclick="applyCouponCode()" class="px-4 py-2 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition">
              적용
            </button>
          </div>
          <p class="text-[11px] text-slate-400">💡 웰컴 쿠폰: <strong class="text-indigo-600">WELCOME10</strong> (10% 할인)</p>
        </div>

        <!-- Order Summary Card -->
        <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 class="text-sm font-black text-slate-900 pb-3 border-b border-slate-100">결제 예상 금액</h3>
          
          <div class="space-y-2.5 text-xs text-slate-600">
            <div class="flex items-center justify-between">
              <span>선택 상품 금액</span>
              <span id="summary-prod-total" class="font-bold text-slate-900">0원</span>
            </div>
            <div class="flex items-center justify-between">
              <span>상품 할인 혜택</span>
              <span id="summary-prod-savings" class="font-bold text-rose-500">-0원</span>
            </div>
            <div class="flex items-center justify-between">
              <span>쿠폰 할인</span>
              <span id="summary-coupon-discount" class="font-bold text-rose-500">-0원</span>
            </div>
            <div class="flex items-center justify-between">
              <span>배송비</span>
              <span id="summary-shipping-fee" class="font-bold text-slate-900">0원</span>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-100 flex items-baseline justify-between">
            <span class="text-sm font-black text-slate-900">최종 결제 금액</span>
            <span id="summary-final-total" class="text-2xl font-black text-indigo-600 font-heading">0원</span>
          </div>

          <button 
            type="button" 
            onclick="proceedToCheckout()" 
            class="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-2xl shadow-xl shadow-indigo-600/30 transition text-sm flex items-center justify-center gap-2"
          >
            <span>주문서 작성하기</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </div>

      </div>

    </div>

  </main>

  <!-- Global Footer -->
  <div id="footer-root"></div>

  <!-- Scripts -->
  <script src="js/cart-store.js"></script>
  <script src="js/api.js"></script>
  <script src="js/components.js"></script>
  <script>
    let couponDiscount = 0;

    document.addEventListener('DOMContentLoaded', () => {
      ShopUI.renderNavbar();
      ShopUI.renderFooter();

      renderCartView();
      CartStore.subscribe(() => renderCartView());
    });

    function renderCartView() {
      const items = CartStore.getItems();
      const container = document.getElementById('cart-items-container');
      const emptyView = document.getElementById('cart-empty-view');
      const countEl = document.getElementById('cart-page-count');

      countEl.innerText = items.length;

      if (items.length === 0) {
        container.innerHTML = '';
        emptyView.classList.remove('hidden');
        updateSummary();
        return;
      }

      emptyView.classList.add('hidden');
      container.innerHTML = items.map(item => `
        <div class="bg-white p-5 rounded-3xl border border-slate-200/80 flex flex-col sm:flex-row items-center gap-4 group">
          <!-- Checkbox -->
          <input 
            type="checkbox" 
            ${item.selected ? 'checked' : ''} 
            onchange="CartStore.toggleSelect('${item.id}', '${item.selectedOption}')"
            class="rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />

          <!-- Thumbnail -->
          <img src="${item.thumbnail}" alt="${item.name}" class="w-20 h-20 object-cover rounded-2xl border border-slate-100 shrink-0" />

          <!-- Details -->
          <div class="flex-1 min-w-0 text-center sm:text-left">
            <span class="text-[10px] font-bold text-indigo-600 uppercase">${item.category}</span>
            <h3 class="text-sm font-bold text-slate-900 leading-snug line-clamp-1">${item.name}</h3>
            ${item.selectedOption ? `<p class="text-xs text-slate-400 mt-0.5">옵션: ${item.selectedOption}</p>` : ''}
            <div class="text-sm font-black text-slate-900 font-heading mt-1">${ShopUI.formatPrice(item.price)}</div>
          </div>

          <!-- Quantity Controls -->
          <div class="flex items-center bg-slate-100 rounded-xl overflow-hidden">
            <button onclick="CartStore.updateQuantity('${item.id}', '${item.selectedOption}', ${item.quantity - 1})" class="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 font-bold">-</button>
            <span class="px-3 text-xs font-bold text-slate-800">${item.quantity}</span>
            <button onclick="CartStore.updateQuantity('${item.id}', '${item.selectedOption}', ${item.quantity + 1})" class="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 font-bold">+</button>
          </div>

          <!-- Item Total -->
          <div class="text-right min-w-[100px]">
            <span class="text-sm font-black text-indigo-600">${ShopUI.formatPrice(item.price * item.quantity)}</span>
          </div>

          <!-- Delete -->
          <button onclick="CartStore.removeItem('${item.id}', '${item.selectedOption}')" class="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      `).join('');

      if (window.lucide) window.lucide.createIcons();
      updateSummary();
    }

    function updateSummary() {
      const summary = CartStore.getSummary(couponDiscount);

      // Shipping progress
      const progress = Math.min(100, (summary.productTotal / summary.freeShippingThreshold) * 100);
      document.getElementById('cart-shipping-bar').style.width = `${progress}%`;
      const msgEl = document.getElementById('cart-shipping-msg');
      if (summary.remainingForFreeShipping > 0) {
        msgEl.innerHTML = `<strong>${ShopUI.formatPrice(summary.remainingForFreeShipping)}</strong> 더 담으면 무료배송!`;
      } else {
        msgEl.innerHTML = `<span class="text-emerald-600 font-bold">🎉 무료배송 혜택 적용 완료!</span>`;
      }

      document.getElementById('summary-prod-total').innerText = ShopUI.formatPrice(summary.originalTotal);
      document.getElementById('summary-prod-savings').innerText = `-${ShopUI.formatPrice(summary.totalSavings)}`;
      document.getElementById('summary-coupon-discount').innerText = `-${ShopUI.formatPrice(summary.couponDiscount)}`;
      document.getElementById('summary-shipping-fee').innerText = summary.shippingFee === 0 ? '무료' : ShopUI.formatPrice(summary.shippingFee);
      document.getElementById('summary-final-total').innerText = ShopUI.formatPrice(summary.finalAmount);
    }

    function toggleAll(checked) {
      CartStore.toggleSelectAll(checked);
    }

    function removeSelectedItems() {
      if (confirm('선택한 상품을 장바구니에서 삭제하시겠습니까?')) {
        CartStore.removeSelected();
      }
    }

    function applyCouponCode() {
      const code = document.getElementById('coupon-input').value.trim().toUpperCase();
      const summary = CartStore.getSummary();

      if (code === 'WELCOME10') {
        couponDiscount = Math.floor(summary.productTotal * 0.1);
        ShopUI.showToast(`10% 웰컴 할인 쿠폰이 적용되었습니다 (-${ShopUI.formatPrice(couponDiscount)})`);
      } else if (code === 'EASY2026') {
        couponDiscount = 5000;
        ShopUI.showToast('5,000원 특별 할인 쿠폰이 적용되었습니다!');
      } else {
        ShopUI.showToast('유효하지 않은 쿠폰 코드입니다.', 'error');
        couponDiscount = 0;
      }
      updateSummary();
    }

    function proceedToCheckout() {
      const summary = CartStore.getSummary();
      if (summary.selectedItems.length === 0) {
        ShopUI.showToast('주문할 상품을 최소 1개 이상 선택해 주세요.', 'error');
        return;
      }
      window.location.href = `/checkout.html?coupon=${couponDiscount}`;
    }
  </script>
</body>
</html>
'@

[System.IO.File]::WriteAllText((Join-Path $publicDir 'cart.html'), $cartHtml, [System.Text.Encoding]::UTF8)
Write-Host "Generated: cart.html" -ForegroundColor Green
