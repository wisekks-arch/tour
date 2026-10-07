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
  <link rel="stylesheet" href="css/style.css?v=20261006_v16">
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
  <script src="js/cart-store.js?v=20261006_v16"></script>
  <script src="js/api.js?v=20261006_v16"></script>
  <script src="js/auth-store.js"></script>
  <script src="js/components.js?v=20261006_v16"></script>
  <script>
    let couponDiscount = 0;
    let summary = null;

    document.addEventListener('DOMContentLoaded', () => {
      ShopUI.renderNavbar();
      ShopUI.renderFooter();

      // Pre-fill member information if logged in
      try {
        const authUserRaw = localStorage.getItem('easyshop_auth_user');
        if (authUserRaw) {
          const authUser = JSON.parse(authUserRaw);
          if (authUser.name && document.getElementById('order-name')) document.getElementById('order-name').value = authUser.name;
          if (authUser.phone && document.getElementById('order-phone')) document.getElementById('order-phone').value = authUser.phone;
          if (authUser.email && document.getElementById('order-email')) document.getElementById('order-email').value = authUser.email;
          if (authUser.name && document.getElementById('ship-name')) document.getElementById('ship-name').value = authUser.name;
          if (authUser.phone && document.getElementById('ship-phone')) document.getElementById('ship-phone').value = authUser.phone;
          if (authUser.address && document.getElementById('ship-address')) document.getElementById('ship-address').value = authUser.address;
          if (authUser.addressDetail && document.getElementById('ship-address-detail')) document.getElementById('ship-address-detail').value = authUser.addressDetail;
        }
      } catch (e) {
        console.error('Member prefill error:', e);
      }

      const urlParams = new URLSearchParams(window.location.search);
      couponDiscount = parseInt(urlParams.get('coupon')) || 0;

      summary = CartStore.getSummary(couponDiscount);
      if (summary.selectedItems.length === 0) {
        alert('주문할 상품이 없습니다.');
        window.location.href = 'cart.html';
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

        // Update member order stats if logged in
        try {
          const authUserRaw = localStorage.getItem('easyshop_auth_user');
          if (authUserRaw) {
            const authUser = JSON.parse(authUserRaw);
            const usersRaw = localStorage.getItem('easyshop_users_v3');
            if (usersRaw) {
              const users = JSON.parse(usersRaw);
              const uIdx = users.findIndex(u => u.email === authUser.email || u.id === authUser.id);
              if (uIdx >= 0) {
                users[uIdx].orderCount = (users[uIdx].orderCount || 0) + 1;
                users[uIdx].totalSpent = (users[uIdx].totalSpent || 0) + summary.finalAmount;
                localStorage.setItem('easyshop_users_v3', JSON.stringify(users));
              }
            }
          }
        } catch (ue) {
          console.error('User stat update error:', ue);
        }

        const orderId = (result && result.order) ? result.order.orderId : (result && result.orderId ? result.orderId : ('ORD-' + Date.now().toString().slice(-8)));
        sessionStorage.setItem('latest_order', JSON.stringify((result && result.order) || orderData));
        window.location.href = `order-complete.html?orderId=${encodeURIComponent(orderId)}`;
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
  <script src="js/auth-store.js"></script>
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
  <script src="js/auth-store.js"></script>
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


# 4. Profile Page (profile.html)
$profileHtml = @'
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>회원정보 수정 - 이지샵 (EasyShop)</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <!-- Daum Postcode API -->
  <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/style.css">
  <!-- Core Stores & Modules -->
  <script src="js/auth-store.js?v=20261007_auth"></script>
  <script src="js/cart-store.js?v=20261007_auth"></script>
  <script src="js/api.js?v=20261007_auth"></script>
  <script src="js/components.js?v=20261007_auth"></script>
</head>
<body class="bg-slate-50 flex flex-col min-h-screen font-sans text-slate-800 antialiased">
  
  <!-- Global Navbar -->
  <div id="navbar-root"></div>

  <!-- Main Container -->
  <main class="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
    
    <!-- Breadcrumb & Header -->
    <div class="mb-8">
      <div class="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2">
        <a href="index.html" class="hover:text-indigo-600 transition">홈</a>
        <span>/</span>
        <span class="text-slate-700">마이페이지</span>
        <span>/</span>
        <span class="text-indigo-600 font-bold">회원정보 수정</span>
      </div>
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <i data-lucide="user" class="w-5 h-5"></i>
            </div>
            회원정보 관리
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">
            고객님의 기본 배송지 정보와 비밀번호를 안전하게 관리하실 수 있습니다.
          </p>
        </div>
        <div class="flex items-center gap-2">
          <a href="order-lookup.html" class="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-xs transition flex items-center gap-1.5">
            <i data-lucide="package" class="w-4 h-4 text-indigo-600"></i> 주문 내역 보기
          </a>
        </div>
      </div>
    </div>

    <!-- User Summary Banner Card -->
    <div class="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 relative overflow-hidden">
      <!-- Decorative background blur circles -->
      <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none"></div>
      <div class="absolute -left-10 -top-10 w-48 h-48 bg-violet-500/20 rounded-full blur-2xl pointer-events-none"></div>

      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="flex items-center gap-4">
          <div id="profile-avatar" class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-400 text-white flex items-center justify-center font-black text-2xl sm:text-3xl shadow-lg border-2 border-white/20">
            U
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span id="profile-name-badge" class="text-xl sm:text-2xl font-black font-heading text-white">로딩 중...</span>
              <span class="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold text-[10px] tracking-wide uppercase border border-amber-400/30">
                VIP MEMBER
              </span>
            </div>
            <p id="profile-email-badge" class="text-xs sm:text-sm text-slate-300 mt-1 flex items-center gap-1">
              <i data-lucide="mail" class="w-3.5 h-3.5 text-indigo-300"></i>
              <span>email@example.com</span>
            </p>
            <p class="text-[11px] text-slate-400 mt-0.5">
              가입일: <span id="profile-joined-date">2026-09-01</span>
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 sm:gap-4 md:flex md:items-center">
          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center min-w-[130px]">
            <span class="text-[11px] font-semibold text-slate-300 block">보유 포인트</span>
            <span id="profile-points" class="text-lg sm:text-xl font-black text-amber-300 font-heading">3,000P</span>
          </div>
          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center min-w-[130px]">
            <span class="text-[11px] font-semibold text-slate-300 block">보유 쿠폰</span>
            <span class="text-lg sm:text-xl font-black text-emerald-300 font-heading">10,000원권</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Form Card -->
    <div class="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
      <form id="profile-edit-form" class="p-6 sm:p-8 space-y-8">
        
        <!-- Section 1: Basic Info -->
        <div>
          <h3 class="text-base sm:text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <i data-lucide="user-check" class="w-5 h-5 text-indigo-600"></i> 기본 회원 정보
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <!-- Email (Read-Only) -->
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>아이디 / 이메일</span>
                <span class="text-[11px] text-slate-400 font-normal flex items-center gap-1">
                  <i data-lucide="lock" class="w-3 h-3 text-slate-400"></i> 변경 불가
                </span>
              </label>
              <input 
                type="email" 
                id="edit-email" 
                readonly 
                class="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 text-sm font-semibold cursor-not-allowed focus:outline-none"
              />
            </div>

            <!-- Name -->
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5">
                성명 (이름) <span class="text-rose-500">*</span>
              </label>
              <input 
                type="text" 
                id="edit-name" 
                required 
                placeholder="성명을 입력하세요"
                class="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-semibold focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition"
              />
            </div>

            <!-- Phone -->
            <div class="sm:col-span-2">
              <label class="block text-xs font-bold text-slate-700 mb-1.5">
                휴대폰 번호 <span class="text-rose-500">*</span>
              </label>
              <input 
                type="tel" 
                id="edit-phone" 
                required 
                placeholder="010-1234-5678"
                class="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-semibold focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition"
              />
            </div>
          </div>
        </div>

        <!-- Section 2: Shipping Address -->
        <div>
          <h3 class="text-base sm:text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <i data-lucide="map-pin" class="w-5 h-5 text-indigo-600"></i> 기본 배송지 설정
          </h3>

          <div class="space-y-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5">
                기본 주소 <span class="text-rose-500">*</span>
              </label>
              <div class="flex gap-2">
                <input 
                  type="text" 
                  id="edit-address" 
                  required 
                  placeholder="주소 검색 버튼을 누르시거나 주소를 입력하세요"
                  class="flex-1 px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-semibold focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition"
                />
                <button 
                  type="button" 
                  onclick="openAddressSearch()" 
                  class="px-4 py-3 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold shrink-0 transition flex items-center gap-1.5 shadow-xs"
                >
                  <i data-lucide="search" class="w-4 h-4"></i> 우편번호 검색
                </button>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5">
                상세 주소 (동/호수, 건물명 등)
              </label>
              <input 
                type="text" 
                id="edit-address-detail" 
                placeholder="상세 주소를 입력하세요 (예: 101동 1202호)"
                class="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-semibold focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition"
              />
            </div>
          </div>
        </div>

        <!-- Section 3: Password Change (Optional) -->
        <div class="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200/80">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
              <i data-lucide="shield-alert" class="w-5 h-5 text-indigo-600"></i>
              <h3 class="text-sm sm:text-base font-bold text-slate-900">비밀번호 변경 (선택사항)</h3>
            </div>
            <label class="flex items-center gap-2 cursor-pointer text-xs font-bold text-indigo-600">
              <input type="checkbox" id="toggle-pw-change" onchange="togglePasswordSection()" class="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer">
              <span>비밀번호 변경하기</span>
            </label>
          </div>

          <p class="text-xs text-slate-500 mb-4">
            비밀번호를 변경하려면 체크박스를 활성화하고 현재 비밀번호와 새 비밀번호를 입력해 주세요.
          </p>

          <div id="pw-change-fields" class="space-y-4 hidden pt-2">
            <!-- Current Password -->
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5">
                현재 비밀번호
              </label>
              <input 
                type="password" 
                id="edit-curr-password" 
                placeholder="현재 사용 중인 비밀번호 입력"
                class="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-semibold focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition"
              />
            </div>

            <!-- New Password -->
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5">
                새 비밀번호
              </label>
              <input 
                type="password" 
                id="edit-new-password" 
                placeholder="8자 이상, 영문 소문자 + 숫자 + 특수문자(@ 또는 #) 필수"
                class="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-semibold focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition"
              />
              <p class="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                <i data-lucide="info" class="w-3.5 h-3.5 text-indigo-500 shrink-0"></i>
                비밀번호 규칙: 8자 이상, 영문 소문자, 숫자, 특수문자(@ 또는 #) 포함
              </p>
            </div>

            <!-- Confirm New Password -->
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5">
                새 비밀번호 확인
              </label>
              <input 
                type="password" 
                id="edit-confirm-new-password" 
                placeholder="새 비밀번호 다시 입력"
                class="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-semibold focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition"
              />
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <a href="index.html" class="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-sm text-center transition">
            취소 / 홈으로
          </a>
          <div class="w-full sm:w-auto flex items-center gap-3">
            <button 
              type="button" 
              onclick="ShopUI.handleLogout()" 
              class="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-sm text-center transition flex items-center justify-center gap-1.5"
            >
              <i data-lucide="log-out" class="w-4 h-4"></i> 로그아웃
            </button>
            <button 
              type="submit" 
              id="submit-btn" 
              class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm text-center shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
            >
              <i data-lucide="check" class="w-4 h-4"></i> 정보 저장하기
            </button>
          </div>
        </div>

      </form>
    </div>

  </main>

  <!-- Global Footer -->
  <div id="footer-root"></div>

  <!-- Page Logic Script -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      // 1. Check Auth State
      if (typeof AuthStore === 'undefined' || !AuthStore.isLoggedIn()) {
        alert('회원정보 관리는 로그인이 필요한 서비스입니다.');
        window.location.href = 'login.html';
        return;
      }

      // 2. Render Global UI
      ShopUI.renderNavbar();
      ShopUI.renderFooter();

      // 3. Populate User Data
      loadUserProfile();

      // 4. Form Submit Listener
      document.getElementById('profile-edit-form').addEventListener('submit', handleProfileSubmit);
    });

    function loadUserProfile() {
      const user = AuthStore.getCurrentUser();
      if (!user) return;

      // Populate summary badge
      document.getElementById('profile-avatar').innerText = user.name ? user.name.slice(0, 1) : 'U';
      document.getElementById('profile-name-badge').innerText = user.name + ' 님';
      document.getElementById('profile-email-badge').innerHTML = '<i data-lucide="mail" class="w-3.5 h-3.5 text-indigo-300"></i> <span>' + user.email + '</span>';
      document.getElementById('profile-points').innerText = (user.points || 3000).toLocaleString() + 'P';
      document.getElementById('profile-joined-date').innerText = user.joinedAt || '2026-09-01';

      // Populate form fields
      document.getElementById('edit-email').value = user.email || '';
      document.getElementById('edit-name').value = user.name || '';
      document.getElementById('edit-phone').value = user.phone || '';
      document.getElementById('edit-address').value = user.address || '';
      document.getElementById('edit-address-detail').value = user.addressDetail || '';

      if (window.lucide) window.lucide.createIcons();
    }

    function togglePasswordSection() {
      const toggle = document.getElementById('toggle-pw-change');
      const fields = document.getElementById('pw-change-fields');
      if (toggle && fields) {
        if (toggle.checked) {
          fields.classList.remove('hidden');
        } else {
          fields.classList.add('hidden');
          document.getElementById('edit-curr-password').value = '';
          document.getElementById('edit-new-password').value = '';
          document.getElementById('edit-confirm-new-password').value = '';
        }
      }
    }

    function openAddressSearch() {
      if (typeof daum !== 'undefined' && daum.Postcode) {
        new daum.Postcode({
          oncomplete: function(data) {
            let addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
            if (data.buildingName !== '') {
              addr += ' (' + data.buildingName + ')';
            }
            document.getElementById('edit-address').value = addr;
            document.getElementById('edit-address-detail').focus();
          }
        }).open();
      } else {
        const inputAddr = prompt('도로명 또는 지번 주소를 입력해 주세요:', document.getElementById('edit-address').value);
        if (inputAddr !== null) {
          document.getElementById('edit-address').value = inputAddr.trim();
        }
      }
    }

    function handleProfileSubmit(e) {
      e.preventDefault();

      const name = document.getElementById('edit-name').value.trim();
      const phone = document.getElementById('edit-phone').value.trim();
      const address = document.getElementById('edit-address').value.trim();
      const addressDetail = document.getElementById('edit-address-detail').value.trim();
      
      const isPwChange = document.getElementById('toggle-pw-change').checked;
      const currentPassword = document.getElementById('edit-curr-password').value;
      const newPassword = document.getElementById('edit-new-password').value;
      const confirmNewPassword = document.getElementById('edit-confirm-new-password').value;

      const updateData = {
        name,
        phone,
        address,
        addressDetail
      };

      if (isPwChange) {
        if (!currentPassword) {
          ShopUI.showToast('현재 비밀번호를 입력해 주세요.', 'error');
          document.getElementById('edit-curr-password').focus();
          return;
        }
        if (!newPassword) {
          ShopUI.showToast('새 비밀번호를 입력해 주세요.', 'error');
          document.getElementById('edit-new-password').focus();
          return;
        }
        updateData.currentPassword = currentPassword;
        updateData.newPassword = newPassword;
        updateData.confirmNewPassword = confirmNewPassword;
      }

      const btn = document.getElementById('submit-btn');
      btn.disabled = true;
      btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> 저장 중...';
      if (window.lucide) window.lucide.createIcons();

      setTimeout(() => {
        const result = AuthStore.updateProfile(updateData);
        btn.disabled = false;
        btn.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i> 정보 저장하기';
        if (window.lucide) window.lucide.createIcons();

        if (result.success) {
          ShopUI.showToast('회원 정보가 성공적으로 수정되었습니다!', 'success');
          loadUserProfile();
          ShopUI.renderNavbar();
          if (isPwChange) {
            document.getElementById('toggle-pw-change').checked = false;
            togglePasswordSection();
          }
        } else {
          ShopUI.showToast(result.message || '정보 수정에 실패하였습니다.', 'error');
        }
      }, 300);
    }
  </script>
</body>
</html>

'@

[System.IO.File]::WriteAllText((Join-Path $shopDir 'profile.html'), $profileHtml, [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText((Join-Path $publicDir 'profile.html'), $profileHtml, [System.Text.Encoding]::UTF8)
Write-Host "Generated: profile.html" -ForegroundColor Green
