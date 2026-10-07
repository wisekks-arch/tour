const fs = require('fs');
const path = require('path');

const adminHtmlPath = 'd:/92.SW/shop/admin.html';
let adminHtml = fs.readFileSync(adminHtmlPath, 'utf8');

// 1. New tab-orders Section HTML
const newTabOrders = `      <!-- ================= 3. ORDERS TAB (주문 & 배송 관리 + 기간별 매출 분석) ================= -->
      <section id="tab-orders" class="hidden space-y-8">
        
        <!-- Period Sales & Revenue KPI Board -->
        <div class="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-900/40 space-y-6">
          
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
            <div>
              <div class="flex items-center gap-2">
                <span class="p-2 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 shadow-sm"><i data-lucide="bar-chart-3" class="w-5 h-5"></i></span>
                <h3 class="text-lg sm:text-xl font-black text-white font-heading">주문 & 배송 실시간 데이터 분석 보드</h3>
              </div>
              <p class="text-xs text-slate-400 mt-1">회원이 결제한 주문의 상품 가격과 진행 상태를 조회기간별로 실시간 집계 및 관리합니다.</p>
            </div>

            <!-- Quick Period Buttons -->
            <div class="flex flex-wrap items-center gap-1.5 p-1 bg-slate-800/90 backdrop-blur-xs rounded-2xl border border-slate-700/60 text-xs font-bold" id="order-period-btn-group">
              <button onclick="setOrderPeriod('all')" id="period-btn-all" class="px-3.5 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700/60 transition order-period-btn">전체 기간</button>
              <button onclick="setOrderPeriod('today')" id="period-btn-today" class="px-3.5 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700/60 transition order-period-btn">오늘</button>
              <button onclick="setOrderPeriod('yesterday')" id="period-btn-yesterday" class="px-3.5 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700/60 transition order-period-btn">어제</button>
              <button onclick="setOrderPeriod('week')" id="period-btn-week" class="px-3.5 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700/60 transition order-period-btn">최근 7일</button>
              <button onclick="setOrderPeriod('month')" id="period-btn-month" class="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white shadow-xs transition order-period-btn active">이번 달</button>
              <button onclick="setOrderPeriod('3months')" id="period-btn-3months" class="px-3.5 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700/60 transition order-period-btn">최근 3개월</button>
            </div>
          </div>

          <!-- Period Sales Summary Cards Grid (4 Cards) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div class="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-5 space-y-1 relative overflow-hidden group">
              <div class="flex items-center justify-between text-slate-400 text-xs font-bold">
                <span>조회 기간 총 매출액</span>
                <span class="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400"><i data-lucide="coins" class="w-4 h-4"></i></span>
              </div>
              <p class="text-2xl font-black text-white font-heading" id="period-sales-total">0원</p>
              <span class="text-[11px] text-indigo-300 font-medium block truncate" id="period-sales-sub">실결제 합계 금액 (취소 제외)</span>
            </div>

            <div class="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-5 space-y-1 relative overflow-hidden group">
              <div class="flex items-center justify-between text-slate-400 text-xs font-bold">
                <span>조회 기간 주문 건수</span>
                <span class="p-1.5 rounded-lg bg-teal-500/20 text-teal-400"><i data-lucide="shopping-bag" class="w-4 h-4"></i></span>
              </div>
              <p class="text-2xl font-black text-white font-heading" id="period-order-count">0건</p>
              <span class="text-[11px] text-teal-300 font-medium block truncate" id="period-order-sub">결제완료 주문 건수</span>
            </div>

            <div class="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-5 space-y-1 relative overflow-hidden group">
              <div class="flex items-center justify-between text-slate-400 text-xs font-bold">
                <span>평균 결제 객단가</span>
                <span class="p-1.5 rounded-lg bg-amber-500/20 text-amber-400"><i data-lucide="trending-up" class="w-4 h-4"></i></span>
              </div>
              <p class="text-2xl font-black text-white font-heading" id="period-avg-price">0원</p>
              <span class="text-[11px] text-amber-300 font-medium block truncate" id="period-avg-sub">주문 1건당 평균 결제액</span>
            </div>

            <div class="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-5 space-y-1 relative overflow-hidden group">
              <div class="flex items-center justify-between text-slate-400 text-xs font-bold">
                <span>배송 대기 & 진행 현황</span>
                <span class="p-1.5 rounded-lg bg-purple-500/20 text-purple-400"><i data-lucide="truck" class="w-4 h-4"></i></span>
              </div>
              <p class="text-2xl font-black text-white font-heading" id="period-shipping-status">0건</p>
              <span class="text-[11px] text-purple-300 font-medium block truncate" id="period-shipping-sub">결제완료 0건 / 배송중 0건</span>
            </div>

          </div>

          <!-- Top Ordered Products in this Period (기간 내 주문된 상품별 가격 & 판매량 요약) -->
          <div class="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <i data-lucide="award" class="w-3.5 h-3.5 text-amber-400"></i>
                조회 기간 내 인기 주문 상품 및 판매 금액
              </span>
              <span class="text-[11px] text-slate-400" id="period-prod-count-text">총 0개 품목</span>
            </div>
            <div id="period-top-products-bar" class="flex flex-wrap items-center gap-2">
              <!-- Dynamically populated tags with product price & qty -->
            </div>
          </div>

        </div>

        <!-- Orders Table Card -->
        <div class="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden space-y-4">
          
          <!-- Filter Header -->
          <div class="p-6 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            <!-- Left: Status Tabs with live count badges -->
            <div class="flex flex-wrap items-center gap-2 text-xs font-bold" id="order-status-tabs">
              <button onclick="filterOrdersByStatus('전체')" class="px-3.5 py-2 rounded-xl bg-slate-900 text-white order-status-btn active" data-status="전체">
                <span>전체 주문</span> <span id="badge-count-all" class="ml-1 px-1.5 py-0.5 rounded-full bg-slate-700 text-white text-[10px]">0</span>
              </button>
              <button onclick="filterOrdersByStatus('결제완료')" class="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 order-status-btn" data-status="결제완료">
                <span>결제완료</span> <span id="badge-count-paid" class="ml-1 px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px]">0</span>
              </button>
              <button onclick="filterOrdersByStatus('상품준비')" class="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 order-status-btn" data-status="상품준비">
                <span>상품준비</span> <span id="badge-count-prep" class="ml-1 px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px]">0</span>
              </button>
              <button onclick="filterOrdersByStatus('배송중')" class="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 order-status-btn" data-status="배송중">
                <span>배송중</span> <span id="badge-count-shipping" class="ml-1 px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px]">0</span>
              </button>
              <button onclick="filterOrdersByStatus('배송완료')" class="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 order-status-btn" data-status="배송완료">
                <span>배송완료</span> <span id="badge-count-delivered" class="ml-1 px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px]">0</span>
              </button>
              <button onclick="filterOrdersByStatus('주문취소')" class="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 order-status-btn" data-status="주문취소">
                <span>주문취소</span> <span id="badge-count-canceled" class="ml-1 px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px]">0</span>
              </button>
            </div>

            <!-- Right: Search & Date Range Picker & CSV -->
            <div class="flex flex-wrap items-center gap-2.5">
              <!-- Custom Date Range -->
              <div class="flex items-center gap-1.5 text-xs bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                <span class="text-slate-400 font-bold px-1"><i data-lucide="calendar" class="w-3.5 h-3.5 inline text-indigo-600"></i> 조회기간:</span>
                <input type="date" id="order-start-date" onchange="applyCustomDateFilter()" class="bg-white px-2 py-1 rounded-lg border border-slate-200 text-slate-800 text-xs font-bold focus:outline-none focus:border-indigo-500" />
                <span class="text-slate-400 font-bold">~</span>
                <input type="date" id="order-end-date" onchange="applyCustomDateFilter()" class="bg-white px-2 py-1 rounded-lg border border-slate-200 text-slate-800 text-xs font-bold focus:outline-none focus:border-indigo-500" />
                <button type="button" onclick="applyCustomDateFilter()" class="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs transition">조회</button>
              </div>

              <!-- Search -->
              <div class="relative min-w-[200px]">
                <i data-lucide="search" class="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input type="text" id="order-search-input" oninput="applyOrderSearchFilter()" placeholder="주문번호, 주문자, 상품명..." 
                       class="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:bg-white focus:border-indigo-500 transition" />
              </div>

              <button onclick="exportOrdersCSV()" class="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1 shrink-0" title="현재 조회 목록 CSV 다운로드">
                <i data-lucide="download" class="w-3.5 h-3.5"></i>
                <span>CSV</span>
              </button>
            </div>

          </div>

          <!-- Orders Table Container -->
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider">
                <tr>
                  <th class="p-4 pl-6">주문번호</th>
                  <th class="p-4">주문자 / 회원</th>
                  <th class="p-4">주문 상품 정보 및 개별 가격</th>
                  <th class="p-4 text-right">총 결제 금액</th>
                  <th class="p-4 text-center">결제 수단</th>
                  <th class="p-4">주문 일시</th>
                  <th class="p-4">배송지 / 요청사항</th>
                  <th class="p-4 text-center">진행 상태</th>
                  <th class="p-4 pr-6 text-center">송장 / 관리</th>
                </tr>
              </thead>
              <tbody id="admin-orders-table" class="divide-y divide-slate-100 font-medium">
                <!-- Dynamically populated -->
              </tbody>
            </table>
          </div>

          <!-- Table Footer -->
          <div class="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <div>
              <span>조회된 주문: 총 <strong id="order-display-count" class="text-indigo-600 font-bold">0</strong>건</span>
              <span class="mx-2 text-slate-300">|</span>
              <span id="order-display-amount-text" class="text-slate-700 font-semibold">합계 결제액: 0원</span>
            </div>
            <div class="text-[11px] text-slate-400">
              * 주문 상태를 변경하면 실시간으로 저장되며 매출 통계에 즉각 동기화됩니다.
            </div>
          </div>

        </div>

      </section>`;

// Replace tab-orders section
const tabOrdersRegex = /<section id="tab-orders"[\s\S]*?<\/section>/;
if (tabOrdersRegex.test(adminHtml)) {
  adminHtml = adminHtml.replace(tabOrdersRegex, newTabOrders);
  console.log('Replaced tab-orders section successfully.');
} else {
  console.error('Could not find tab-orders section in admin.html');
}

// 2. Add Order Detail Modal & Tracking Modal before </body>
const orderDetailModalHtml = `
  <!-- Order Detail & Invoice Modal -->
  <div id="order-detail-modal" class="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
      
      <!-- Modal Header -->
      <div class="flex items-center justify-between pb-4 border-b border-slate-100">
        <div class="flex items-center gap-2.5">
          <div class="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <i data-lucide="receipt" class="w-5 h-5"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-base font-black text-slate-900 font-heading">주문 상세 명세서</h3>
              <span id="modal-order-status-badge" class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600">결제완료</span>
            </div>
            <p class="text-xs text-slate-400 font-mono mt-0.5" id="modal-order-id-date">ORD-20261006-9921 | 2026-10-06 17:15:30</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="printOrderInvoice()" class="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition" title="인쇄">
            <i data-lucide="printer" class="w-4 h-4"></i>
          </button>
          <button onclick="closeOrderDetailModal()" class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>
      </div>

      <!-- Customer & Shipping Info Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
          <h4 class="font-bold text-slate-900 flex items-center gap-1.5"><i data-lucide="user" class="w-3.5 h-3.5 text-indigo-600"></i> 주문자 정보</h4>
          <div class="space-y-1 text-slate-600">
            <p><strong class="text-slate-700">성명:</strong> <span id="modal-cust-name">-</span></p>
            <p><strong class="text-slate-700">연락처:</strong> <span id="modal-cust-phone">-</span></p>
            <p><strong class="text-slate-700">이메일:</strong> <span id="modal-cust-email">-</span></p>
            <p><strong class="text-slate-700">결제수단:</strong> <span id="modal-cust-paymethod">-</span></p>
          </div>
        </div>

        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
          <h4 class="font-bold text-slate-900 flex items-center gap-1.5"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-teal-600"></i> 배송지 정보</h4>
          <div class="space-y-1 text-slate-600">
            <p><strong class="text-slate-700">수령인:</strong> <span id="modal-ship-name">-</span></p>
            <p><strong class="text-slate-700">연락처:</strong> <span id="modal-ship-phone">-</span></p>
            <p><strong class="text-slate-700">배송주소:</strong> <span id="modal-ship-addr" class="break-all">-</span></p>
            <p><strong class="text-slate-700">배송메모:</strong> <span id="modal-ship-note" class="text-slate-500 italic">-</span></p>
          </div>
        </div>
      </div>

      <!-- Ordered Items Breakdown Table with Prices -->
      <div class="space-y-3">
        <h4 class="text-xs font-bold text-slate-900 flex items-center justify-between">
          <span class="flex items-center gap-1.5"><i data-lucide="package-check" class="w-4 h-4 text-indigo-600"></i> 주문 상품 목록 및 가격 내역</span>
          <span class="text-slate-400 font-normal" id="modal-item-count">총 1건</span>
        </h4>
        <div class="rounded-2xl border border-slate-200 overflow-hidden">
          <table class="w-full text-xs text-left">
            <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th class="p-3">상품 정보</th>
                <th class="p-3 text-right">단가</th>
                <th class="p-3 text-center">수량</th>
                <th class="p-3 text-right">상품 합계</th>
              </tr>
            </thead>
            <tbody id="modal-items-table" class="divide-y divide-slate-100">
              <!-- Dynamically rendered items -->
            </tbody>
          </table>
        </div>
      </div>

      <!-- Price Breakdown Summary -->
      <div class="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2 text-xs">
        <div class="flex justify-between text-slate-600">
          <span>상품 주문 총액</span>
          <span class="font-bold" id="modal-price-products">0원</span>
        </div>
        <div class="flex justify-between text-slate-600">
          <span>배송비</span>
          <span class="font-bold" id="modal-price-shipping">0원</span>
        </div>
        <div class="flex justify-between text-rose-600">
          <span>쿠폰 및 프로모션 할인</span>
          <span class="font-bold" id="modal-price-discount">-0원</span>
        </div>
        <div class="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-indigo-200">
          <span>최종 결제 금액</span>
          <span class="text-indigo-600 font-heading text-base" id="modal-price-final">0원</span>
        </div>
      </div>

      <!-- Delivery / Tracking Status Bar -->
      <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
        <div class="flex items-center justify-between">
          <span class="font-bold text-slate-800 flex items-center gap-1.5"><i data-lucide="truck" class="w-4 h-4 text-indigo-600"></i> 배송 및 운송장 정보</span>
          <span id="modal-tracking-info" class="text-slate-500 font-mono">운송장 미등록</span>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <select id="modal-change-status-select" class="p-2 rounded-xl border border-slate-200 bg-white font-bold text-xs text-slate-800 focus:outline-none focus:border-indigo-500">
            <option value="결제완료">결제완료</option>
            <option value="상품준비">상품준비</option>
            <option value="배송중">배송중</option>
            <option value="배송완료">배송완료</option>
            <option value="주문취소">주문취소</option>
          </select>
          <button type="button" onclick="handleModalStatusUpdate()" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition">상태 변경</button>
          <button type="button" onclick="openTrackingModalFromDetail()" class="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs transition flex items-center gap-1">
            <i data-lucide="barcode" class="w-3.5 h-3.5"></i> 송장번호 입력
          </button>
        </div>
      </div>

      <div class="pt-2">
        <button type="button" onclick="closeOrderDetailModal()" class="w-full py-3 bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 rounded-xl text-xs transition">닫기</button>
      </div>

    </div>
  </div>

  <!-- Tracking Modal -->
  <div id="tracking-modal" class="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-4">
      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 class="text-base font-black text-slate-900 flex items-center gap-2">
          <i data-lucide="truck" class="w-4 h-4 text-indigo-600"></i> 운송장 번호 등록
        </h3>
        <button onclick="closeTrackingModal()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-5 h-5"></i></button>
      </div>

      <form onsubmit="handleTrackingSave(event)" class="space-y-4 text-xs">
        <input type="hidden" id="tracking-order-id" />
        
        <div>
          <label class="block font-bold text-slate-700 mb-1">주문번호</label>
          <p id="tracking-target-id" class="p-2.5 bg-slate-50 rounded-xl font-mono font-bold text-slate-900"></p>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">택배사 선택 *</label>
          <select id="tracking-courier" class="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-800 focus:border-indigo-500 focus:outline-none">
            <option value="CJ대한통운">CJ대한통운</option>
            <option value="우체국택배">우체국택배</option>
            <option value="한진택배">한진택배</option>
            <option value="롯데택배">롯데택배</option>
            <option value="로젠택배">로젠택배</option>
          </select>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">운송장 번호 *</label>
          <input type="text" id="tracking-number-input" required placeholder="예: 68291039841 (숫자만 입력)" class="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold text-slate-900 focus:border-indigo-500 focus:outline-none" />
        </div>

        <div class="p-3 bg-indigo-50/60 rounded-xl text-[11px] text-indigo-700">
          * 운송장 번호를 등록하면 주문 상태가 자동으로 <strong>[배송중]</strong>으로 변경됩니다.
        </div>

        <div class="flex gap-2 pt-2 border-t border-slate-100">
          <button type="button" onclick="closeTrackingModal()" class="flex-1 py-2.5 rounded-xl bg-slate-100 font-bold text-slate-700 hover:bg-slate-200 transition">취소</button>
          <button type="submit" class="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition shadow-md shadow-indigo-600/30">송장 저장 & 배송중 변경</button>
        </div>
      </form>
    </div>
  </div>
`;

if (!adminHtml.includes('id="order-detail-modal"')) {
  adminHtml = adminHtml.replace('</body>', `${orderDetailModalHtml}\n</body>`);
  console.log('Added order detail & tracking modals to admin.html.');
}

// 3. Write Full Order Management JavaScript Functions into Main Script
const newOrdersScriptBlock = `
    // ==========================================
    // ORDERS & DELIVERY MANAGEMENT JAVASCRIPT
    // ==========================================
    let currentOrderPeriod = 'month';
    let orderStartDate = '';
    let orderEndDate = '';
    let currentOrderStatus = '전체';
    let orderSearchKeyword = '';
    let selectedModalOrderId = null;

    // Initialize date range on start
    function initOrderDates() {
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      const todayStr = \`\${yyyy}-\${mm}-\${dd}\`;

      if (currentOrderPeriod === 'month') {
        orderStartDate = \`\${yyyy}-\${mm}-01\`;
        orderEndDate = todayStr;
      }

      const sInput = document.getElementById('order-start-date');
      const eInput = document.getElementById('order-end-date');
      if (sInput) sInput.value = orderStartDate;
      if (eInput) eInput.value = orderEndDate;
    }

    function setOrderPeriod(period) {
      currentOrderPeriod = period;
      document.querySelectorAll('.order-period-btn').forEach(btn => {
        btn.className = 'px-3.5 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700/60 transition order-period-btn';
      });
      const activeBtn = document.getElementById(\`period-btn-\${period}\`);
      if (activeBtn) {
        activeBtn.className = 'px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white shadow-xs transition order-period-btn active';
      }

      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      const todayStr = \`\${yyyy}-\${mm}-\${dd}\`;

      if (period === 'today') {
        orderStartDate = todayStr;
        orderEndDate = todayStr;
      } else if (period === 'yesterday') {
        const yDate = new Date(now);
        yDate.setDate(now.getDate() - 1);
        const yStr = \`\${yDate.getFullYear()}-\${String(yDate.getMonth() + 1).padStart(2, '0')}-\${String(yDate.getDate()).padStart(2, '0')}\`;
        orderStartDate = yStr;
        orderEndDate = yStr;
      } else if (period === 'week') {
        const d7 = new Date(now);
        d7.setDate(now.getDate() - 6);
        orderStartDate = \`\${d7.getFullYear()}-\${String(d7.getMonth() + 1).padStart(2, '0')}-\${String(d7.getDate()).padStart(2, '0')}\`;
        orderEndDate = todayStr;
      } else if (period === 'month') {
        orderStartDate = \`\${yyyy}-\${mm}-01\`;
        orderEndDate = todayStr;
      } else if (period === '3months') {
        const d90 = new Date(now);
        d90.setDate(now.getDate() - 90);
        orderStartDate = \`\${d90.getFullYear()}-\${String(d90.getMonth() + 1).padStart(2, '0')}-\${String(d90.getDate()).padStart(2, '0')}\`;
        orderEndDate = todayStr;
      } else if (period === 'all') {
        orderStartDate = '';
        orderEndDate = '';
      }

      const sInput = document.getElementById('order-start-date');
      const eInput = document.getElementById('order-end-date');
      if (sInput) sInput.value = orderStartDate;
      if (eInput) eInput.value = orderEndDate;

      applyOrderFilters();
    }

    function applyCustomDateFilter() {
      const s = document.getElementById('order-start-date').value;
      const e = document.getElementById('order-end-date').value;
      if (s && e && s > e) {
        alert('시작일은 종료일보다 이전이어야 합니다.');
        return;
      }
      currentOrderPeriod = 'custom';
      orderStartDate = s;
      orderEndDate = e;

      document.querySelectorAll('.order-period-btn').forEach(btn => {
        btn.className = 'px-3.5 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700/60 transition order-period-btn';
      });

      applyOrderFilters();
    }

    function applyOrderSearchFilter() {
      const input = document.getElementById('order-search-input');
      orderSearchKeyword = input ? input.value.toLowerCase().trim() : '';
      applyOrderFilters();
    }

    function filterOrdersByStatus(status) {
      currentOrderStatus = status;
      document.querySelectorAll('.order-status-btn').forEach(btn => {
        if (btn.getAttribute('data-status') === status) {
          btn.className = 'px-3.5 py-2 rounded-xl bg-slate-900 text-white order-status-btn active';
        } else {
          btn.className = 'px-3.5 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 order-status-btn';
        }
      });
      applyOrderFilters();
    }

    function applyOrderFilters() {
      // 1. Filter adminOrders by date period first (Period Base)
      let periodOrders = [...adminOrders];
      if (orderStartDate) {
        periodOrders = periodOrders.filter(o => o.orderDate && o.orderDate.slice(0, 10) >= orderStartDate);
      }
      if (orderEndDate) {
        periodOrders = periodOrders.filter(o => o.orderDate && o.orderDate.slice(0, 10) <= orderEndDate);
      }

      // 2. Compute Period Sales & KPI Statistics
      updateOrderPeriodKPI(periodOrders);

      // 3. Update Status Badges (Counts inside current period)
      const countAll = periodOrders.length;
      const countPaid = periodOrders.filter(o => o.status === '결제완료').length;
      const countPrep = periodOrders.filter(o => o.status === '상품준비').length;
      const countShipping = periodOrders.filter(o => o.status === '배송중').length;
      const countDelivered = periodOrders.filter(o => o.status === '배송완료').length;
      const countCanceled = periodOrders.filter(o => o.status === '주문취소').length;

      const elAll = document.getElementById('badge-count-all');
      const elPaid = document.getElementById('badge-count-paid');
      const elPrep = document.getElementById('badge-count-prep');
      const elShipping = document.getElementById('badge-count-shipping');
      const elDelivered = document.getElementById('badge-count-delivered');
      const elCanceled = document.getElementById('badge-count-canceled');

      if (elAll) elAll.innerText = countAll;
      if (elPaid) elPaid.innerText = countPaid;
      if (elPrep) elPrep.innerText = countPrep;
      if (elShipping) elShipping.innerText = countShipping;
      if (elDelivered) elDelivered.innerText = countDelivered;
      if (elCanceled) elCanceled.innerText = countCanceled;

      // 4. Apply Status and Search filters for table rendering
      let displayOrders = [...periodOrders];
      if (currentOrderStatus !== '전체') {
        displayOrders = displayOrders.filter(o => o.status === currentOrderStatus);
      }
      if (orderSearchKeyword) {
        const q = orderSearchKeyword;
        displayOrders = displayOrders.filter(o => {
          const matchId = (o.orderId || '').toLowerCase().includes(q);
          const matchName = (o.customerName || '').toLowerCase().includes(q);
          const matchPhone = (o.customerPhone || '').includes(q);
          const matchAddr = (o.shippingAddress || '').toLowerCase().includes(q);
          const matchProd = (o.items || []).some(it => (it.name || '').toLowerCase().includes(q));
          return matchId || matchName || matchPhone || matchAddr || matchProd;
        });
      }

      // 5. Render Table & Footer
      renderAdminOrdersTable(displayOrders);

      const countEl = document.getElementById('order-display-count');
      if (countEl) countEl.innerText = displayOrders.length;

      const amountTextEl = document.getElementById('order-display-amount-text');
      if (amountTextEl) {
        const totalSum = displayOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
        amountTextEl.innerText = \`합계 결제액: \${ShopUI.formatPrice(totalSum)}\`;
      }

      if (window.lucide) window.lucide.createIcons();
    }

    function updateOrderPeriodKPI(periodOrders) {
      const nonCanceledOrders = periodOrders.filter(o => o.status !== '주문취소');
      const totalSales = nonCanceledOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
      const orderCount = nonCanceledOrders.length;
      const avgPrice = orderCount > 0 ? Math.round(totalSales / orderCount) : 0;

      const pendingPaid = periodOrders.filter(o => o.status === '결제완료').length;
      const shippingCount = periodOrders.filter(o => o.status === '배송중').length;
      const deliveredCount = periodOrders.filter(o => o.status === '배송완료').length;

      // Update KPI Elements
      const totalEl = document.getElementById('period-sales-total');
      const totalSubEl = document.getElementById('period-sales-sub');
      const countEl = document.getElementById('period-order-count');
      const countSubEl = document.getElementById('period-order-sub');
      const avgEl = document.getElementById('period-avg-price');
      const shipEl = document.getElementById('period-shipping-status');
      const shipSubEl = document.getElementById('period-shipping-sub');

      if (totalEl) totalEl.innerText = ShopUI.formatPrice(totalSales);
      if (totalSubEl) totalSubEl.innerText = \`총 \${orderCount}건 결제 합계 (\${periodOrders.length - orderCount}건 취소)\`;
      if (countEl) countEl.innerText = \`\${orderCount}건\`;
      if (countSubEl) countSubEl.innerText = \`결제완료 \${pendingPaid}건 · 배송중 \${shippingCount}건 · 배송완료 \${deliveredCount}건\`;
      if (avgEl) avgEl.innerText = ShopUI.formatPrice(avgPrice);
      if (shipEl) shipEl.innerText = \`\${pendingPaid + shippingCount}건\`;
      if (shipSubEl) shipSubEl.innerText = \`결제완료 \${pendingPaid}건 / 배송중 \${shippingCount}건 관리 중\`;

      // 5. Aggregate Product Sales in Period
      const productMap = {};
      periodOrders.forEach(o => {
        if (o.status !== '주문취소' && Array.isArray(o.items)) {
          o.items.forEach(it => {
            const key = it.productId || it.name;
            if (!productMap[key]) {
              productMap[key] = {
                name: it.name,
                thumbnail: it.thumbnail,
                option: it.option,
                price: it.price || 0,
                quantity: 0,
                total: 0
              };
            }
            const qty = it.quantity || 1;
            productMap[key].quantity += qty;
            productMap[key].total += (it.price || 0) * qty;
          });
        }
      });

      const topProducts = Object.values(productMap).sort((a, b) => b.total - a.total);
      const topBar = document.getElementById('period-top-products-bar');
      const countText = document.getElementById('period-prod-count-text');

      if (countText) {
        countText.innerText = \`총 \${topProducts.length}개 품목 주문\`;
      }

      if (topBar) {
        if (topProducts.length === 0) {
          topBar.innerHTML = \`<span class="text-xs text-slate-400 py-1">선택한 조회 기간에 접수된 주문 상품 내역이 없습니다.</span>\`;
        } else {
          topBar.innerHTML = topProducts.slice(0, 5).map((tp, idx) => \`
            <div class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs shadow-xs">
              <span class="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-black flex items-center justify-center">\${idx + 1}</span>
              <img src="\${tp.thumbnail}" alt="" class="w-6 h-6 rounded-md object-cover border border-slate-700" />
              <div class="max-w-[140px] truncate">
                <span class="font-bold text-white block truncate">\${tp.name}</span>
                <span class="text-[10px] text-slate-400">\${ShopUI.formatPrice(tp.price)} × \${tp.quantity}개</span>
              </div>
              <span class="font-black text-amber-400 text-xs ml-1 font-mono">\${ShopUI.formatPrice(tp.total)}</span>
            </div>
          \`).join('');
        }
      }
    }

    // Orders Management Table Renderer
    function renderAdminOrdersTable(orders) {
      const tbody = document.getElementById('admin-orders-table');
      if (!tbody) return;

      if (!orders || orders.length === 0) {
        tbody.innerHTML = \`
          <tr>
            <td colspan="9" class="p-12 text-center text-slate-400">
              <div class="flex flex-col items-center justify-center gap-2">
                <i data-lucide="package-search" class="w-8 h-8 text-slate-300"></i>
                <p class="font-bold text-slate-600">조건에 일치하는 주문 데이터가 없습니다.</p>
                <p class="text-[11px] text-slate-400">조회 기간을 변경하거나 검색어를 초기화해 보세요.</p>
              </div>
            </td>
          </tr>
        \`;
        if (window.lucide) window.lucide.createIcons();
        return;
      }

      tbody.innerHTML = orders.map(o => {
        let statusColor = 'bg-slate-100 text-slate-700 border-slate-200';
        if (o.status === '결제완료') statusColor = 'bg-indigo-50 text-indigo-700 border-indigo-200';
        else if (o.status === '상품준비') statusColor = 'bg-amber-50 text-amber-700 border-amber-200';
        else if (o.status === '배송중') statusColor = 'bg-blue-50 text-blue-700 border-blue-200';
        else if (o.status === '배송완료') statusColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
        else if (o.status === '주문취소') statusColor = 'bg-rose-50 text-rose-700 border-rose-200';

        // Item Price Details
        const items = Array.isArray(o.items) && o.items.length > 0 ? o.items : [
          { name: '주문 상품', price: o.totalAmount || 0, quantity: 1, thumbnail: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80', option: '기본' }
        ];

        const firstItem = items[0];
        const otherCount = items.length - 1;

        const itemsDisplayHtml = \`
          <div class="flex items-center gap-2.5 max-w-xs">
            <img src="\${firstItem.thumbnail || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80'}" 
                 alt="" class="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0" />
            <div class="min-w-0">
              <p class="font-bold text-slate-900 line-clamp-1">\${firstItem.name}\${otherCount > 0 ? \` <span class="text-indigo-600 font-bold">외 \${otherCount}건</span>\` : ''}</p>
              <div class="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                <span class="font-bold text-slate-800 font-mono">\${ShopUI.formatPrice(firstItem.price)}</span>
                <span class="text-slate-400">× \${firstItem.quantity || 1}개</span>
                \${firstItem.option ? \`<span class="text-[10px] text-slate-400 truncate max-w-[90px]">(\${firstItem.option})</span>\` : ''}
              </div>
            </div>
          </div>
        \`;

        return \`
          <tr class="hover:bg-slate-50/80 transition">
            <!-- 1. Order ID -->
            <td class="p-4 pl-6">
              <button onclick="openOrderDetailModal('\${o.orderId}')" class="font-mono font-black text-indigo-600 hover:text-indigo-800 hover:underline text-left block">
                \${o.orderId}
              </button>
              <span class="text-[10px] text-slate-400 font-medium">상세보기</span>
            </td>

            <!-- 2. Customer -->
            <td class="p-4">
              <div class="flex items-center gap-1.5">
                <p class="font-bold text-slate-900">\${o.customerName || '고객'}</p>
                <span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-indigo-50 text-indigo-600">회원</span>
              </div>
              <p class="text-[11px] text-slate-400 font-mono mt-0.5">\${o.customerPhone || '-'}</p>
            </td>

            <!-- 3. Ordered Products & Price -->
            <td class="p-4">
              \${itemsDisplayHtml}
            </td>

            <!-- 4. Payment Total Amount -->
            <td class="p-4 text-right">
              <span class="font-black text-slate-900 text-sm block font-heading">\${ShopUI.formatPrice(o.totalAmount || 0)}</span>
              <span class="text-[10px] text-slate-400 block font-normal">
                상품 \${ShopUI.formatPrice((o.totalAmount || 0) + (o.discountAmount || 0) - (o.shippingFee || 0))}
              </span>
            </td>

            <!-- 5. Payment Method -->
            <td class="p-4 text-center">
              <span class="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px] whitespace-nowrap">
                \${o.paymentMethod || '신용카드'}
              </span>
            </td>

            <!-- 6. Order Date -->
            <td class="p-4 text-slate-500 text-[11px] whitespace-nowrap">
              <p class="font-bold text-slate-700">\${(o.orderDate || '').slice(0, 10)}</p>
              <p class="text-[10px] text-slate-400">\${(o.orderDate || '').slice(11, 19)}</p>
            </td>

            <!-- 7. Address & Note -->
            <td class="p-4 max-w-[180px]">
              <p class="text-[11px] text-slate-700 truncate font-medium" title="\${o.shippingAddress || '-'}">\${o.shippingAddress || '-'}</p>
              \${o.shippingNote ? \`<p class="text-[10px] text-slate-400 truncate italic" title="\${o.shippingNote}">요청: \${o.shippingNote}</p>\` : ''}
            </td>

            <!-- 8. Status Changer -->
            <td class="p-4 text-center">
              <select onchange="updateOrderStatus('\${o.orderId}', this.value)" 
                      class="px-2.5 py-1.5 rounded-xl border font-bold text-xs cursor-pointer shadow-xs transition focus:outline-none focus:ring-2 focus:ring-indigo-500 \${statusColor}">
                <option value="결제완료" \${o.status === '결제완료' ? 'selected' : ''}>결제완료</option>
                <option value="상품준비" \${o.status === '상품준비' ? 'selected' : ''}>상품준비</option>
                <option value="배송중" \${o.status === '배송중' ? 'selected' : ''}>배송중</option>
                <option value="배송완료" \${o.status === '배송완료' ? 'selected' : ''}>배송완료</option>
                <option value="주문취소" \${o.status === '주문취소' ? 'selected' : ''}>주문취소</option>
              </select>
            </td>

            <!-- 9. Actions -->
            <td class="p-4 pr-6 text-center">
              <div class="flex items-center justify-center gap-1.5">
                <button onclick="openTrackingModal('\${o.orderId}')" class="px-2.5 py-1.5 bg-slate-100 hover:bg-indigo-50 text-indigo-600 hover:text-indigo-700 rounded-xl text-xs font-bold transition flex items-center gap-1" title="송장번호 등록/수정">
                  <i data-lucide="truck" class="w-3.5 h-3.5"></i>
                  <span>\${o.trackingNumber ? '송장조회' : '송장등록'}</span>
                </button>
                <button onclick="openOrderDetailModal('\${o.orderId}')" class="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition" title="상세보기">
                  <i data-lucide="eye" class="w-4 h-4"></i>
                </button>
              </div>
            </td>
          </tr>
        \`;
      }).join('');

      if (window.lucide) window.lucide.createIcons();
    }

    async function updateOrderStatus(orderId, newStatus) {
      await ShopAPI.updateOrderStatus(orderId, newStatus);
      const o = adminOrders.find(item => item.orderId === orderId);
      if (o) o.status = newStatus;

      ShopUI.showToast(\`주문 [\${orderId}] 상태가 [\${newStatus}]으로 변경되었습니다.\`);
      applyOrderFilters();
      renderDashboard();
    }

    // Tracking Modal Functions
    function openTrackingModal(orderId) {
      const o = adminOrders.find(item => item.orderId === orderId);
      if (!o) return;

      document.getElementById('tracking-order-id').value = o.orderId;
      document.getElementById('tracking-target-id').innerText = \`\${o.orderId} (\${o.customerName} 고객님)\`;
      document.getElementById('tracking-courier').value = o.courier || 'CJ대한통운';
      document.getElementById('tracking-number-input').value = o.trackingNumber || '';

      document.getElementById('tracking-modal').classList.remove('hidden');
    }

    function closeTrackingModal() {
      document.getElementById('tracking-modal').classList.add('hidden');
    }

    async function handleTrackingSave(e) {
      e.preventDefault();
      const orderId = document.getElementById('tracking-order-id').value;
      const courier = document.getElementById('tracking-courier').value;
      const trackingNumber = document.getElementById('tracking-number-input').value.trim();

      if (!trackingNumber) {
        alert('운송장 번호를 입력해 주세요.');
        return;
      }

      await ShopAPI.updateOrderStatus(orderId, '배송중', trackingNumber);
      const o = adminOrders.find(item => item.orderId === orderId);
      if (o) {
        o.status = '배송중';
        o.trackingNumber = trackingNumber;
        o.courier = courier;
      }

      ShopUI.showToast(\`[\${courier} \${trackingNumber}] 송장이 등록되어 [배송중] 상태로 변경되었습니다.\`);
      closeTrackingModal();
      applyOrderFilters();
      renderDashboard();
    }

    // Order Detail Modal Functions
    function openOrderDetailModal(orderId) {
      const o = adminOrders.find(item => item.orderId === orderId);
      if (!o) return;

      selectedModalOrderId = o.orderId;

      // Header
      document.getElementById('modal-order-id-date').innerText = \`주문번호: \${o.orderId} | 접수일시: \${o.orderDate || '-'}\`;
      const badge = document.getElementById('modal-order-status-badge');
      if (badge) {
        badge.innerText = o.status;
        if (o.status === '결제완료') badge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600';
        else if (o.status === '상품준비') badge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-600';
        else if (o.status === '배송중') badge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-600';
        else if (o.status === '배송완료') badge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600';
        else if (o.status === '주문취소') badge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-600';
      }

      // Customer Info
      document.getElementById('modal-cust-name').innerText = o.customerName || '-';
      document.getElementById('modal-cust-phone').innerText = o.customerPhone || '-';
      document.getElementById('modal-cust-email').innerText = o.customerEmail || '-';
      document.getElementById('modal-cust-paymethod').innerText = o.paymentMethod || '신용카드';

      // Shipping Info
      document.getElementById('modal-ship-name').innerText = o.shippingName || o.customerName || '-';
      document.getElementById('modal-ship-phone').innerText = o.shippingPhone || o.customerPhone || '-';
      document.getElementById('modal-ship-addr').innerText = o.shippingAddress || '-';
      document.getElementById('modal-ship-note').innerText = o.shippingNote || '요청사항 없음';

      // Items Table
      const items = Array.isArray(o.items) && o.items.length > 0 ? o.items : [
        { name: '주문 상품', price: o.totalAmount || 0, quantity: 1, thumbnail: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80', option: '기본' }
      ];

      document.getElementById('modal-item-count').innerText = \`총 \${items.length}개 품목\`;

      const tbody = document.getElementById('modal-items-table');
      tbody.innerHTML = items.map(it => {
        const itemPrice = it.price || 0;
        const itemQty = it.quantity || 1;
        const itemSubtotal = itemPrice * itemQty;

        return \`
          <tr class="hover:bg-slate-50">
            <td class="p-3 flex items-center gap-2.5">
              <img src="\${it.thumbnail || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80'}" 
                   alt="" class="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0" />
              <div>
                <p class="font-bold text-slate-900">\${it.name}</p>
                \${it.option ? \`<p class="text-[10px] text-slate-400">선택옵션: \${it.option}</p>\` : ''}
              </div>
            </td>
            <td class="p-3 text-right font-bold text-slate-700 font-mono">\${ShopUI.formatPrice(itemPrice)}</td>
            <td class="p-3 text-center font-bold text-slate-800 font-mono">\${itemQty}</td>
            <td class="p-3 text-right font-black text-indigo-600 font-mono">\${ShopUI.formatPrice(itemSubtotal)}</td>
          </tr>
        \`;
      }).join('');

      // Price Breakdown
      const prodSum = items.reduce((sum, it) => sum + ((it.price || 0) * (it.quantity || 1)), 0);
      const shipFee = o.shippingFee || 0;
      const discount = o.discountAmount || 0;

      document.getElementById('modal-price-products').innerText = ShopUI.formatPrice(prodSum);
      document.getElementById('modal-price-shipping').innerText = shipFee === 0 ? '무료배송' : ShopUI.formatPrice(shipFee);
      document.getElementById('modal-price-discount').innerText = discount > 0 ? \`-\${ShopUI.formatPrice(discount)}\` : '0원';
      document.getElementById('modal-price-final').innerText = ShopUI.formatPrice(o.totalAmount || (prodSum + shipFee - discount));

      // Tracking Info
      const trackInfoEl = document.getElementById('modal-tracking-info');
      if (trackInfoEl) {
        trackInfoEl.innerText = o.trackingNumber ? \`\${o.courier || 'CJ대한통운'} \${o.trackingNumber}\` : '운송장 미등록';
      }

      // Status Selector in modal
      const statusSelect = document.getElementById('modal-change-status-select');
      if (statusSelect) statusSelect.value = o.status;

      document.getElementById('order-detail-modal').classList.remove('hidden');
      if (window.lucide) window.lucide.createIcons();
    }

    function closeOrderDetailModal() {
      document.getElementById('order-detail-modal').classList.add('hidden');
      selectedModalOrderId = null;
    }

    function openTrackingModalFromDetail() {
      if (selectedModalOrderId) {
        closeOrderDetailModal();
        openTrackingModal(selectedModalOrderId);
      }
    }

    async function handleModalStatusUpdate() {
      if (!selectedModalOrderId) return;
      const select = document.getElementById('modal-change-status-select');
      const newStatus = select ? select.value : '결제완료';

      await updateOrderStatus(selectedModalOrderId, newStatus);
      openOrderDetailModal(selectedModalOrderId);
    }

    function printOrderInvoice() {
      window.print();
    }

    // CSV Export
    function exportOrdersCSV() {
      let periodOrders = [...adminOrders];
      if (orderStartDate) {
        periodOrders = periodOrders.filter(o => o.orderDate && o.orderDate.slice(0, 10) >= orderStartDate);
      }
      if (orderEndDate) {
        periodOrders = periodOrders.filter(o => o.orderDate && o.orderDate.slice(0, 10) <= orderEndDate);
      }
      if (currentOrderStatus !== '전체') {
        periodOrders = periodOrders.filter(o => o.status === currentOrderStatus);
      }

      if (!periodOrders.length) {
        ShopUI.showToast('내보낼 주문 데이터가 없습니다.');
        return;
      }

      let csvContent = "\\uFEFF주문번호,주문일시,주문자명,연락처,이메일,주문상품목록,개별상품단가,총결제금액,결제수단,진행상태,배송지주소,배송메모,택배사,운송장번호\\n";
      
      periodOrders.forEach(o => {
        const prodNames = (o.items || []).map(it => \`\${it.name}(\${it.quantity}개)\`).join(' / ');
        const prodPrices = (o.items || []).map(it => \`\${it.price}원\`).join(' / ');
        csvContent += \`"\${o.orderId}","\${o.orderDate || ''}","\${o.customerName || ''}","\${o.customerPhone || ''}","\${o.customerEmail || ''}","\${prodNames}","\${prodPrices}","\${o.totalAmount || 0}","\${o.paymentMethod || '신용카드'}","\${o.status}","\${(o.shippingAddress || '').replace(/"/g, '""')}","\${(o.shippingNote || '').replace(/"/g, '""')}","\${o.courier || ''}","\${o.trackingNumber || ''}"\\n\`;
      });

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = \`EASYSHOP_주문내역_\${new Date().toISOString().slice(0, 10)}.csv\`;
      link.click();
      ShopUI.showToast('주문 내역 CSV 파일이 성공적으로 다운로드되었습니다.');
    }
`;

// Replace existing order functions in script or insert newOrdersScriptBlock
const oldOrderFuncRegex = /\/\/ Orders Management Table[\s\S]*?function openInquiryModal/g;
if (oldOrderFuncRegex.test(adminHtml)) {
  adminHtml = adminHtml.replace(oldOrderFuncRegex, `${newOrdersScriptBlock}\n\n    // Inquiries Management\n    function openInquiryModal`);
  console.log('Replaced Orders script block successfully.');
} else {
  // If not matched, insert before Inquiries table
  const inqIdx = adminHtml.indexOf('// Inquiries Management');
  if (inqIdx !== -1) {
    adminHtml = adminHtml.slice(0, inqIdx) + newOrdersScriptBlock + '\n\n    ' + adminHtml.slice(inqIdx);
    console.log('Inserted Orders script block before Inquiries.');
  } else {
    console.error('Could not find insertion point for Orders script block');
  }
}

// Make sure DOMContentLoaded initializes orders dates
if (!adminHtml.includes('initOrderDates()')) {
  adminHtml = adminHtml.replace("setDashPeriod('thisMonth');", "setDashPeriod('thisMonth');\n      initOrderDates();");
  console.log('Added initOrderDates() to DOMContentLoaded.');
}

// Write back to shop/admin.html and shop/public/admin.html
fs.writeFileSync('d:/92.SW/shop/admin.html', adminHtml, 'utf8');
fs.writeFileSync('d:/92.SW/shop/public/admin.html', adminHtml, 'utf8');
console.log('Saved updated admin.html in d:\\92.SW\\shop and d:\\92.SW\\shop\\public');
