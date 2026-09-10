$ErrorActionPreference = 'Stop'
$shopDir = 'd:\92.SW\shop'
$publicDir = Join-Path $shopDir 'public'

# 1. checkout.html
$checkoutHtml = @'
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>주문 / 결제하기 - EASYSHOP</title>
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
        주문서 작성 및 결제
      </h1>
      <p class="text-xs text-slate-500 mt-1">배송지 정보와 결제 수단을 확인해 주세요.</p>
    </div>

    <form id="checkout-form" onsubmit="handleOrderSubmit(event)" class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- Left: Form Information (8 cols) -->
      <div class="lg:col-span-8 space-y-6">
        
        <!-- 1. Orderer Info -->
        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
            <i data-lucide="user" class="w-4 h-4 text-indigo-600"></i> 주문자 정보
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1.5">주문자 성명 *</label>
              <input type="text" id="order-name" required value="홍길동" class="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none" />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1.5">연락처 *</label>
              <input type="tel" id="order-phone" required value="010-1234-5678" class="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none" />
            </div>
            <div class="sm:col-span-2">
              <label class="block font-bold text-slate-700 mb-1.5">이메일 *</label>
              <input type="email" id="order-email" required value="customer@example.com" class="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none" />
            </div>
          </div>
        </div>

        <!-- 2. Shipping Address -->
        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
            <i data-lucide="map-pin" class="w-4 h-4 text-indigo-600"></i> 배송지 정보
          </h3>
          <div class="space-y-3 text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-slate-700 mb-1.5">수령인 성명 *</label>
                <input type="text" id="ship-name" required value="홍길동" class="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1.5">수령인 연락처 *</label>
                <input type="tel" id="ship-phone" required value="010-1234-5678" class="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none" />
              </div>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1.5">기본 주소 *</label>
              <input type="text" id="ship-address" required value="서울특별시 강남구 테헤란로 152 강남파이낸스센터" class="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none" />
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1.5">상세 주소</label>
              <input type="text" id="ship-address-detail" value="18층 1802호" class="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none" />
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1.5">배송 요청사항</label>
              <select id="ship-note" class="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none bg-white">
                <option value="부재 시 문 앞에 놓아주세요.">부재 시 문 앞에 놓아주세요.</option>
                <option value="배송 전 연락 부탁드립니다.">배송 전 연락 부탁드립니다.</option>
                <option value="경비실에 맡겨주세요.">경비실에 맡겨주세요.</option>
                <option value="택배함에 넣어주세요.">택배함에 넣어주세요.</option>
              </select>
            </div>
          </div>
        </div>

        <!-- 3. Payment Method -->
        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
            <i data-lucide="credit-card" class="w-4 h-4 text-indigo-600"></i> 결제 수단 선택
          </h3>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
            <label class="flex flex-col items-center gap-2 p-4 rounded-2xl border border-indigo-600 bg-indigo-50/40 cursor-pointer text-center">
              <input type="radio" name="pay_method" value="신용/체크카드" checked class="text-indigo-600" />
              <span>신용/체크카드</span>
            </label>
            <label class="flex flex-col items-center gap-2 p-4 rounded-2xl border border-slate-200 hover:border-slate-300 cursor-pointer text-center">
              <input type="radio" name="pay_method" value="카카오페이" class="text-indigo-600" />
              <span>카카오페이</span>
            </label>
            <label class="flex flex-col items-center gap-2 p-4 rounded-2xl border border-slate-200 hover:border-slate-300 cursor-pointer text-center">
              <input type="radio" name="pay_method" value="토스페이" class="text-indigo-600" />
              <span>토스페이</span>
            </label>
            <label class="flex flex-col items-center gap-2 p-4 rounded-2xl border border-slate-200 hover:border-slate-300 cursor-pointer text-center">
              <input type="radio" name="pay_method" value="가상계좌 (무통장)" class="text-indigo-600" />
              <span>가상계좌 입금</span>
            </label>
          </div>
        </div>

      </div>

      <!-- Right: Ordered Items Summary & Submit (4 cols) -->
      <div class="lg:col-span-4 space-y-6">
        
        <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 class="text-sm font-black text-slate-900 pb-3 border-b border-slate-100">주문 상품 목록</h3>
          
          <div id="checkout-items-list" class="space-y-3 max-h-60 overflow-y-auto divide-y divide-slate-100">
            <!-- Dynamically listed items -->
          </div>

          <div class="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
            <div class="flex items-center justify-between">
              <span>상품 금액</span>
              <span id="co-prod-total" class="font-bold text-slate-900">0원</span>
            </div>
            <div class="flex items-center justify-between">
              <span>쿠폰 할인</span>
              <span id="co-coupon-discount" class="font-bold text-rose-500">-0원</span>
            </div>
            <div class="flex items-center justify-between">
              <span>배송비</span>
              <span id="co-shipping-fee" class="font-bold text-slate-900">0원</span>
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 flex items-baseline justify-between">
            <span class="text-sm font-black text-slate-900">총 결제 금액</span>
            <span id="co-final-total" class="text-2xl font-black text-indigo-600 font-heading">0원</span>
          </div>

          <div class="pt-4 space-y-2">
            <label class="flex items-start gap-2 text-[11px] text-slate-500 cursor-pointer">
              <input type="checkbox" required class="mt-0.5 rounded text-indigo-600" />
              <span>구매조건 확인 및 결제진행 동의 (전자상거래법 제8조)</span>
            </label>
          </div>

          <button 
            type="submit" 
            class="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-2xl shadow-xl shadow-indigo-600/30 transition text-sm flex items-center justify-center gap-2"
          >
            <i data-lucide="lock" class="w-4 h-4"></i>
            <span id="pay-button-text">결제 및 주문완료</span>
          </button>
        </div>

      </div>

    </form>

  </main>

  <!-- Global Footer -->
  <div id="footer-root"></div>

  <!-- Scripts -->
  <script src="js/cart-store.js"></script>
  <script src="js/api.js"></script>
  <script src="js/components.js"></script>
  <script>
    let couponDiscount = 0;
    let summary = null;

    document.addEventListener('DOMContentLoaded', () => {
      ShopUI.renderNavbar();
      ShopUI.renderFooter();

      const urlParams = new URLSearchParams(window.location.search);
      couponDiscount = parseInt(urlParams.get('coupon')) || 0;

      summary = CartStore.getSummary(couponDiscount);
      if (summary.selectedItems.length === 0) {
        alert('주문할 상품이 없습니다.');
        window.location.href = '/cart.html';
        return;
      }

      renderCheckoutSummary();
    });

    function renderCheckoutSummary() {
      const container = document.getElementById('checkout-items-list');
      container.innerHTML = summary.selectedItems.map(item => `
        <div class="flex gap-3 pt-3 first:pt-0">
          <img src="${item.thumbnail}" alt="${item.name}" class="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0" />
          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-bold text-slate-800 line-clamp-1">${item.name}</h4>
            <p class="text-[11px] text-slate-400">${item.selectedOption ? item.selectedOption + ' / ' : ''}${item.quantity}개</p>
            <span class="text-xs font-black text-indigo-600">${ShopUI.formatPrice(item.price * item.quantity)}</span>
          </div>
        </div>
      `).join('');

      document.getElementById('co-prod-total').innerText = ShopUI.formatPrice(summary.productTotal);
      document.getElementById('co-coupon-discount').innerText = `-${ShopUI.formatPrice(summary.couponDiscount)}`;
      document.getElementById('co-shipping-fee').innerText = summary.shippingFee === 0 ? '무료' : ShopUI.formatPrice(summary.shippingFee);
      document.getElementById('co-final-total').innerText = ShopUI.formatPrice(summary.finalAmount);
      document.getElementById('pay-button-text').innerText = `${ShopUI.formatPrice(summary.finalAmount)} 결제하기`;
    }

    async function handleOrderSubmit(e) {
      e.preventDefault();

      const orderData = {
        customerName: document.getElementById('order-name').value,
        customerPhone: document.getElementById('order-phone').value,
        customerEmail: document.getElementById('order-email').value,
        shippingName: document.getElementById('ship-name').value,
        shippingPhone: document.getElementById('ship-phone').value,
        shippingAddress: `${document.getElementById('ship-address').value} ${document.getElementById('ship-address-detail').value}`,
        shippingNote: document.getElementById('ship-note').value,
        paymentMethod: document.querySelector('input[name="pay_method"]:checked').value,
        items: summary.selectedItems,
        totalAmount: summary.finalAmount,
        shippingFee: summary.shippingFee,
        discountAmount: summary.couponDiscount + summary.totalSavings
      };

      try {
        const result = await ShopAPI.createOrder(orderData);
        CartStore.removeSelected();
        const orderId = result.order ? result.order.orderId : ('ORD-' + Date.now().toString().slice(-8));
        sessionStorage.setItem('latest_order', JSON.stringify(result.order || orderData));
        window.location.href = `/order-complete.html?orderId=${encodeURIComponent(orderId)}`;
      } catch (err) {
        alert('주문 처리 중 오류가 발생했습니다.');
        console.error(err);
      }
    }
  </script>
</body>
</html>
'@

[System.IO.File]::WriteAllText((Join-Path $publicDir 'checkout.html'), $checkoutHtml, [System.Text.Encoding]::UTF8)
Write-Host "Generated: checkout.html" -ForegroundColor Green

# 2. order-complete.html
$completeHtml = @'
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>주문 완료 - EASYSHOP</title>
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

  <main class="flex-grow max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full">
    
    <div class="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden text-center p-8 sm:p-12 space-y-8">
      
      <!-- Success Icon -->
      <div class="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-md shadow-emerald-500/10">
        <i data-lucide="check-circle-2" class="w-10 h-10"></i>
      </div>

      <div class="space-y-2">
        <span class="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase">Order Completed</span>
        <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
          주문이 정상적으로 완료되었습니다!
        </h1>
        <p class="text-xs sm:text-sm text-slate-500">고객님의 소중한 주문이 안전하게 접수되었습니다.</p>
      </div>

      <!-- Order Voucher Info Box -->
      <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 text-left space-y-4 text-xs">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <span class="text-slate-400">주문 번호</span>
          <span id="complete-order-id" class="font-mono font-black text-indigo-600 text-sm">ORD-20260907-XXXX</span>
        </div>
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <span class="text-slate-400">결제 일시</span>
          <span id="complete-order-date" class="font-bold text-slate-800">2026-09-07 10:30</span>
        </div>
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <span class="text-slate-400">배송지</span>
          <span id="complete-shipping-address" class="font-bold text-slate-800 truncate max-w-xs">서울시 강남구 테헤란로</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-slate-400">최종 결제 금액</span>
          <span id="complete-total-amount" class="font-black text-slate-900 text-base">0원</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <a href="/order-lookup.html" class="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-2xl transition">
          주문/배송 조회 바로가기
        </a>
        <a href="/products.html" class="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-2xl shadow-lg shadow-indigo-600/30 transition">
          쇼핑 계속하기
        </a>
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
    document.addEventListener('DOMContentLoaded', () => {
      ShopUI.renderNavbar();
      ShopUI.renderFooter();

      const urlParams = new URLSearchParams(window.location.search);
      const orderId = urlParams.get('orderId') || 'ORD-' + Date.now().toString().slice(-8);

      document.getElementById('complete-order-id').innerText = orderId;
      document.getElementById('complete-order-date').innerText = new Date().toLocaleString('ko-KR');

      try {
        const saved = sessionStorage.getItem('latest_order');
        if (saved) {
          const parsed = JSON.parse(saved);
          document.getElementById('complete-shipping-address').innerText = parsed.shippingAddress || '서울시';
          document.getElementById('complete-total-amount').innerText = ShopUI.formatPrice(parsed.totalAmount);
        }
      } catch (e) {}
    });
  </script>
</body>
</html>
'@

[System.IO.File]::WriteAllText((Join-Path $publicDir 'order-complete.html'), $completeHtml, [System.Text.Encoding]::UTF8)
Write-Host "Generated: order-complete.html" -ForegroundColor Green

# 3. order-lookup.html
$lookupHtml = @'
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>주문 / 배송 조회 - EASYSHOP</title>
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

  <main class="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
    
    <div class="text-center max-w-md mx-auto mb-10">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase mb-2">
        <i data-lucide="truck" class="w-4 h-4"></i> 실시간 배송 조회
      </div>
      <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
        주문 / 배송 조회
      </h1>
      <p class="text-xs text-slate-500 mt-2">주문번호와 연락처를 입력하시면 실시간 배송 현황을 확인하실 수 있습니다.</p>
    </div>

    <!-- Lookup Form Card -->
    <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs mb-8">
      <form onsubmit="handleLookup(event)" class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1.5">주문 번호</label>
          <input type="text" id="lookup-order-id" placeholder="ORD-20260907-XXXX" required class="w-full p-3 rounded-xl border border-slate-200 text-xs font-mono font-semibold focus:border-indigo-500 focus:outline-none" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1.5">연락처</label>
          <input type="tel" id="lookup-phone" placeholder="010-0000-0000" class="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold focus:border-indigo-500 focus:outline-none" />
        </div>
        <div class="flex items-end">
          <button type="submit" class="w-full p-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2">
            <i data-lucide="search" class="w-4 h-4"></i>
            <span>조회하기</span>
          </button>
        </div>
      </form>
    </div>

    <!-- Lookup Result Container -->
    <div id="lookup-result" class="hidden bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
      
      <!-- Status Timeline -->
      <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200/80">
        <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">배송 진행 단계</h3>
        <div class="grid grid-cols-4 gap-2 text-center relative" id="timeline-steps">
          <div class="step-box" data-step="결제완료">
            <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center mx-auto mb-2 font-bold text-xs">1</div>
            <span class="text-xs font-bold text-slate-700">결제완료</span>
          </div>
          <div class="step-box" data-step="상품준비">
            <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center mx-auto mb-2 font-bold text-xs">2</div>
            <span class="text-xs font-bold text-slate-700">상품준비</span>
          </div>
          <div class="step-box" data-step="배송중">
            <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center mx-auto mb-2 font-bold text-xs">3</div>
            <span class="text-xs font-bold text-slate-700">배송중</span>
          </div>
          <div class="step-box" data-step="배송완료">
            <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center mx-auto mb-2 font-bold text-xs">4</div>
            <span class="text-xs font-bold text-slate-700">배송완료</span>
          </div>
        </div>
      </div>

      <!-- Detail Info -->
      <div class="space-y-4 text-xs">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <span class="text-slate-400">주문 일시</span>
          <span id="res-date" class="font-bold text-slate-800"></span>
        </div>
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <span class="text-slate-400">수령인 / 배송지</span>
          <span id="res-shipping" class="font-bold text-slate-800"></span>
        </div>
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <span class="text-slate-400">운송장 번호</span>
          <span id="res-tracking" class="font-mono font-bold text-indigo-600"></span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-slate-400">결제 금액</span>
          <span id="res-amount" class="font-black text-slate-900 text-sm"></span>
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
    document.addEventListener('DOMContentLoaded', () => {
      ShopUI.renderNavbar();
      ShopUI.renderFooter();

      // Sample pre-fill for demo
      document.getElementById('lookup-order-id').value = 'ORD-20260907-8812';
    });

    async function handleLookup(e) {
      e.preventDefault();
      const orderId = document.getElementById('lookup-order-id').value.trim();
      const resultBox = document.getElementById('lookup-result');

      const order = await ShopAPI.getOrderById(orderId);
      if (!order) {
        alert('일치하는 주문 정보를 찾을 수 없습니다.');
        resultBox.classList.add('hidden');
        return;
      }

      resultBox.classList.remove('hidden');
      document.getElementById('res-date').innerText = order.orderDate;
      document.getElementById('res-shipping').innerText = `${order.customerName} | ${order.shippingAddress}`;
      document.getElementById('res-tracking').innerText = order.trackingNumber ? `CJ대한통운 (${order.trackingNumber})` : '출고 준비 중';
      document.getElementById('res-amount').innerText = ShopUI.formatPrice(order.totalAmount);

      // Highlight step
      const steps = ['결제완료', '상품준비', '배송중', '배송완료'];
      const curIdx = steps.indexOf(order.status);

      document.querySelectorAll('.step-box').forEach((box, i) => {
        const circle = box.querySelector('div');
        if (i <= curIdx) {
          circle.className = 'w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto mb-2 font-bold text-xs shadow-md shadow-indigo-600/30';
        } else {
          circle.className = 'w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center mx-auto mb-2 font-bold text-xs';
        }
      });
    }
  </script>
</body>
</html>
'@

[System.IO.File]::WriteAllText((Join-Path $publicDir 'order-lookup.html'), $lookupHtml, [System.Text.Encoding]::UTF8)
Write-Host "Generated: order-lookup.html" -ForegroundColor Green
