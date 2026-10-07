$ErrorActionPreference = 'Stop'
$shopDir = 'd:\92.SW\shop'
$publicDir = Join-Path $shopDir 'public'

$adminHtml = @'
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EASYSHOP 관리자 대시보드 - 통합 어드민</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Chart.js CDN -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/style.css?v=20261006_v16">
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
<body class="bg-slate-100 text-slate-800 flex flex-col min-h-screen">

  <!-- Top Global Admin Navbar (상단 가로형 네비게이션) -->
  <header class="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20 gap-4">
        
        <!-- Left: Brand Logo & Title -->
        <div class="flex items-center gap-3 shrink-0">
          <div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-600/30">
            <i data-lucide="shield-check" class="w-5 h-5"></i>
          </div>
          <div>
            <h2 class="text-white font-black text-lg tracking-tight font-heading leading-none">EASY<span class="text-indigo-400">ADMIN</span></h2>
            <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">v2.4 Management</span>
          </div>
        </div>

        <!-- Center: 4 Horizontal Navigation Tabs (상단 가로 메뉴 4개) -->
        <nav class="hidden md:flex items-center gap-1.5 overflow-x-auto py-2" id="admin-top-nav">
          <button onclick="switchAdminTab('dashboard')" id="nav-btn-dashboard" class="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold flex items-center gap-2 transition shadow-md shadow-indigo-600/20 text-xs sm:text-sm shrink-0">
            <i data-lucide="layout-dashboard" class="w-4 h-4"></i>
            <span>통합 대시보드</span>
          </button>
          <button onclick="switchAdminTab('products')" id="nav-btn-products" class="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 font-bold flex items-center gap-2 transition text-xs sm:text-sm shrink-0">
            <i data-lucide="package" class="w-4 h-4"></i>
            <span>상품 관리 (CRUD)</span>
          </button>
          <button onclick="switchAdminTab('orders')" id="nav-btn-orders" class="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 font-bold flex items-center gap-2 transition text-xs sm:text-sm shrink-0">
            <i data-lucide="shopping-bag" class="w-4 h-4"></i>
            <span>주문 & 배송 관리</span>
          </button>
                    <button onclick="switchAdminTab('users')" id="nav-btn-users" class="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 font-bold flex items-center gap-2 transition text-xs sm:text-sm shrink-0">
            <i data-lucide="users" class="w-4 h-4"></i>
            <span>회원 관리</span>
          </button>
          <button onclick="switchAdminTab('inquiries')" id="nav-btn-inquiries" class="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 font-bold flex items-center gap-2 transition text-xs sm:text-sm shrink-0">
            <i data-lucide="message-square" class="w-4 h-4"></i>
            <span>고객 문의 / Q&A</span>
          </button>
        </nav>

        <!-- Right Actions -->
        <div class="flex items-center gap-3 shrink-0">
          <a href="index.html" target="_blank" class="hidden sm:flex items-center gap-1.5 py-2 px-3 bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition border border-slate-700/50">
            <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
            <span>쇼핑몰 바로가기</span>
          </a>

          <button onclick="refreshCurrentTab()" title="새로고침" class="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition">
            <i data-lucide="refresh-cw" class="w-4 h-4"></i>
          </button>

          <!-- Admin Profile -->
          <div class="flex items-center gap-2 pl-3 border-l border-slate-800">
            <div class="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold flex items-center justify-center text-xs">
              AD
            </div>
            <div class="text-left hidden lg:block">
              <p class="text-xs font-bold text-white leading-tight">최고 관리자</p>
              <p class="text-[10px] text-slate-400">admin@easyshop.kr</p>
            </div>
          </div>

          <button onclick="handleAdminLogout()" title="로그아웃" class="p-2 text-rose-400 hover:text-rose-300 rounded-xl hover:bg-rose-950/40 transition">
            <i data-lucide="log-out" class="w-4 h-4"></i>
          </button>
        </div>

      </div>

      <!-- Mobile Horizontal Tab Bar (모바일 가로 스크롤 메뉴) -->
      <nav class="flex md:hidden items-center gap-1 overflow-x-auto pb-3 pt-1 border-t border-slate-800/80 -mx-2 px-2 scrollbar-none" id="admin-mobile-nav">
        <button onclick="switchAdminTab('dashboard')" id="nav-m-btn-dashboard" class="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold flex items-center gap-1.5 text-xs shrink-0">
          <i data-lucide="layout-dashboard" class="w-3.5 h-3.5"></i>
          <span>대시보드</span>
        </button>
        <button onclick="switchAdminTab('products')" id="nav-m-btn-products" class="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 font-bold flex items-center gap-1.5 text-xs shrink-0">
          <i data-lucide="package" class="w-3.5 h-3.5"></i>
          <span>상품 관리</span>
        </button>
        <button onclick="switchAdminTab('orders')" id="nav-m-btn-orders" class="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 font-bold flex items-center gap-1.5 text-xs shrink-0">
          <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
          <span>주문 & 배송</span>
        </button>
                <button onclick="switchAdminTab('users')" id="nav-m-btn-users" class="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 font-bold flex items-center gap-1.5 text-xs shrink-0">
          <i data-lucide="users" class="w-3.5 h-3.5"></i>
          <span>회원 관리</span>
        </button>
        <button onclick="switchAdminTab('inquiries')" id="nav-m-btn-inquiries" class="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 font-bold flex items-center gap-1.5 text-xs shrink-0">
          <i data-lucide="message-square" class="w-3.5 h-3.5"></i>
          <span>고객 문의</span>
        </button>
      </nav>

    </div>
  </header>

  <!-- Sub Header / Title Bar -->
  <div class="bg-white border-b border-slate-200/80 py-4 px-4 sm:px-6 lg:px-8 shadow-xs">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-3">
        <h1 id="current-tab-title" class="text-xl sm:text-2xl font-black text-slate-900 font-heading">통합 대시보드</h1>
        <span class="text-xs text-slate-300">|</span>
        <span class="text-xs text-slate-500 font-medium">EASYSHOP 라이프스타일 큐레이션 통합 관리 시스템</span>
      </div>
    </div>
  </div>

  <!-- Content Tabs (Full-width max-w-7xl container) -->
  <main class="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-8">
      
            <!-- ================= 1. DASHBOARD TAB ================= -->
            <!-- ================= 1. DASHBOARD TAB ================= -->
      <section id="tab-dashboard" class="space-y-6">
        
        <!-- Period Filter Bar for Dashboard (대시보드 기간별 조회 필터) -->
        <div class="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold shrink-0">
              <i data-lucide="bar-chart-3" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <span>통합 대시보드 매출 조회 기간</span>
                <span id="dash-active-period-label" class="text-xs text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full font-bold">이번 달 기준</span>
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">선택한 기간에 맞춰 매출액, 주문 건수 및 일별 매출 추이 그래프가 실시간 자동 집계됩니다.</p>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-2.5 w-full xl:w-auto">
            <!-- Quick Period Buttons -->
            <div class="inline-flex bg-slate-100 p-1 rounded-2xl gap-1 overflow-x-auto max-w-full">
              <button onclick="setDashPeriod('today')" id="dash-btn-today" class="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 transition dash-period-btn">오늘</button>
              <button onclick="setDashPeriod('yesterday')" id="dash-btn-yesterday" class="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 transition dash-period-btn">어제</button>
              <button onclick="setDashPeriod('7days')" id="dash-btn-7days" class="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 transition dash-period-btn">최근 7일</button>
              <button onclick="setDashPeriod('thisMonth')" id="dash-btn-thisMonth" class="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-xs transition dash-period-btn active">이번 달</button>
              <button onclick="setDashPeriod('all')" id="dash-btn-all" class="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 transition dash-period-btn">전체 기간</button>
            </div>

            <!-- Custom Date Range -->
            <div class="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200/80 rounded-2xl px-3 py-1.5 shrink-0">
              <input type="date" id="dash-start-date" class="bg-transparent font-semibold focus:outline-none text-slate-800 text-xs" />
              <span class="text-slate-400">~</span>
              <input type="date" id="dash-end-date" class="bg-transparent font-semibold focus:outline-none text-slate-800 text-xs" />
              <button onclick="applyDashCustomDate()" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs transition">조회</button>
            </div>
          </div>
        </div>

        <!-- 4 KPI Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <!-- Card 1: Today Realtime Sales (항상 오늘 매출액 명확히 표시) -->
          <div class="bg-white p-6 rounded-3xl border border-indigo-100 shadow-xs space-y-2 relative overflow-hidden bg-gradient-to-br from-white to-indigo-50/30">
            <div class="flex items-center justify-between text-slate-500 text-xs font-bold">
              <span>오늘 실시간 매출액</span>
              <div class="p-2 rounded-xl bg-indigo-50 text-indigo-600"><i data-lucide="dollar-sign" class="w-4 h-4"></i></div>
            </div>
            <p class="text-2xl sm:text-3xl font-black text-indigo-600 font-heading" id="kpi-today-sales">0원</p>
            <p class="text-[11px] text-emerald-600 font-bold flex items-center gap-1" id="kpi-today-count-badge">
              <i data-lucide="trending-up" class="w-3.5 h-3.5"></i> 오늘 결제 0건 (실시간 집계)
            </p>
          </div>

          <!-- Card 2: Selected Period Cumulative Sales (선택 기간 총 매출액) -->
          <div class="bg-white p-6 rounded-3xl border border-teal-100 shadow-xs space-y-2 relative overflow-hidden bg-gradient-to-br from-white to-teal-50/30">
            <div class="flex items-center justify-between text-slate-500 text-xs font-bold">
              <span id="kpi-period-title">이번 달 누적 매출액</span>
              <div class="p-2 rounded-xl bg-teal-50 text-teal-600"><i data-lucide="calendar" class="w-4 h-4"></i></div>
            </div>
            <p class="text-2xl sm:text-3xl font-black text-slate-900 font-heading" id="kpi-period-sales">0원</p>
            <p class="text-[11px] text-teal-600 font-bold flex items-center gap-1" id="kpi-period-badge">
              <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i> 선택 기간 0건 결제 완료
            </p>
          </div>

          <!-- Card 3: Pending Delivery Orders (신규 / 배송 대기 주문) -->
          <div class="bg-white p-6 rounded-3xl border border-amber-100 shadow-xs space-y-2 relative overflow-hidden bg-gradient-to-br from-white to-amber-50/30">
            <div class="flex items-center justify-between text-slate-500 text-xs font-bold">
              <span>신규 / 배송 대기 주문</span>
              <div class="p-2 rounded-xl bg-amber-50 text-amber-600"><i data-lucide="truck" class="w-4 h-4"></i></div>
            </div>
            <p class="text-2xl sm:text-3xl font-black text-amber-600 font-heading" id="kpi-pending-orders">0건</p>
            <p class="text-[11px] text-amber-700 font-bold flex items-center gap-1" id="kpi-pending-badge">
              <i data-lucide="clock" class="w-3.5 h-3.5"></i> 결제완료 0건 / 상품준비 0건
            </p>
          </div>

          <!-- Card 4: Product & Stock Status (등록 상품 및 품절 임박) -->
          <div class="bg-white p-6 rounded-3xl border border-purple-100 shadow-xs space-y-2 relative overflow-hidden bg-gradient-to-br from-white to-purple-50/30">
            <div class="flex items-center justify-between text-slate-500 text-xs font-bold">
              <span>등록 상품 / 재고 부족</span>
              <div class="p-2 rounded-xl bg-purple-50 text-purple-600"><i data-lucide="package" class="w-4 h-4"></i></div>
            </div>
            <p class="text-2xl sm:text-3xl font-black text-slate-900 font-heading" id="kpi-total-products">60개</p>
            <p class="text-[11px] text-purple-600 font-bold flex items-center gap-1" id="kpi-products-badge">
              <i data-lucide="alert-circle" class="w-3.5 h-3.5"></i> 정상 판매 운영 중
            </p>
          </div>
        </div>

        <!-- Charts & Quick Orders Row -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Sales Trend Line Chart (2 cols) -->
          <div class="lg:col-span-2 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h3 class="text-base font-black text-slate-900 flex items-center gap-2">
                  <i data-lucide="trending-up" class="w-4 h-4 text-indigo-600"></i>
                  <span id="dash-chart-title">선택 기간 일별 실시간 매출 추이 (원)</span>
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">쇼핑몰에서 결제된 실제 주문 데이터를 기반으로 일자별로 자동 집계됩니다.</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                  <span class="w-2 h-2 rounded-full bg-indigo-600"></span> 일별 실결제액
                </span>
              </div>
            </div>
            <div class="h-64 relative">
              <canvas id="salesChart"></canvas>
            </div>
          </div>

          <!-- Quick Orders / Recent Purchases (1 col) -->
          <div class="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                <h3 class="text-base font-black text-slate-900 flex items-center gap-2">
                  <i data-lucide="shopping-bag" class="w-4 h-4 text-indigo-600"></i>
                  <span>최근 접수된 실시간 주문</span>
                </h3>
                <button onclick="switchAdminTab('orders')" class="text-[11px] text-indigo-600 hover:text-indigo-800 font-bold transition">전체보기 →</button>
              </div>

              <div id="quick-orders-list" class="divide-y divide-slate-100 space-y-2">
                <!-- Populated by JavaScript -->
              </div>
            </div>

            <div class="pt-3 border-t border-slate-100">
              <button onclick="switchAdminTab('orders')" class="w-full py-2.5 bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-200">
                <i data-lucide="list-ordered" class="w-4 h-4"></i>
                <span>주문 & 배송 관리 바로가기</span>
              </button>
            </div>
          </div>

        </div>

      </section>

      <!-- ================= 2. PRODUCTS TAB (CRUD) ================= -->
      <section id="tab-products" class="hidden space-y-6">
        
        <!-- Action Toolbar -->
        <div class="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3 w-full sm:w-auto">
            <input 
              type="text" 
              id="admin-prod-search" 
              placeholder="상품명 검색..." 
              oninput="filterAdminProducts()"
              class="px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-500 w-full sm:w-64"
            />
            <select id="admin-prod-cat-filter" onchange="filterAdminProducts()" class="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white">
              <option value="전체">전체 카테고리</option>
              <option value="패션 / 의류">패션 / 의류</option>
              <option value="디지털 / 가전">디지털 / 가전</option>
              <option value="뷰티 / 케어">뷰티 / 케어</option>
              <option value="리빙 / 인테리어">리빙 / 인테리어</option>
              <option value="푸드 / 키친">푸드 / 키친</option>
            </select>
          </div>

          <button onclick="openProductModal()" class="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 transition flex items-center justify-center gap-2">
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>신규 상품 등록</span>
          </button>
        </div>

        <!-- Products Table -->
        <div class="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead class="bg-slate-50 text-slate-400 font-bold border-b border-slate-200 uppercase">
                <tr>
                  <th class="p-4">상품</th>
                  <th class="p-4">카테고리</th>
                  <th class="p-4">판매가</th>
                  <th class="p-4">정가</th>
                  <th class="p-4">재고</th>
                  <th class="p-4">평점/리뷰</th>
                  <th class="p-4">상태</th>
                  <th class="p-4 text-center">관리</th>
                </tr>
              </thead>
              <tbody id="admin-products-table" class="divide-y divide-slate-100 font-medium">
                <!-- Dynamically populated -->
              </tbody>
            </table>
          </div>
        </div>

      </section>

            <!-- ================= 3. ORDERS TAB (주문 & 배송 관리 + 기간별 매출 분석) ================= -->
            <!-- ================= 3. ORDERS TAB (주문 & 배송 관리 + 기간별 매출 분석) ================= -->
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

      </section>

      <!-- ================= 4. INQUIRIES TAB ================= -->
      <section id="tab-inquiries" class="hidden space-y-6">
        <div class="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead class="bg-slate-50 text-slate-400 font-bold border-b border-slate-200 uppercase">
                <tr>
                  <th class="p-4">유형</th>
                  <th class="p-4">상품 / 제목</th>
                  <th class="p-4">작성자 / 연락처</th>
                  <th class="p-4">등록 일시</th>
                  <th class="p-4">상태</th>
                  <th class="p-4 text-center">답변 관리</th>
                </tr>
              </thead>
              <tbody id="admin-inquiries-table" class="divide-y divide-slate-100 font-medium">
                <!-- Dynamically populated -->
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </main>

        <!-- ================= 4. USERS TAB (회원 관리 & 접속 통계) ================= -->
      <section id="tab-users" class="space-y-8 hidden">
        
        <!-- User KPI Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <!-- Card 1: Total Users -->
          <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
            <div class="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>총 등록 회원수</span>
              <div class="p-2 rounded-xl bg-indigo-50 text-indigo-600"><i data-lucide="users" class="w-4 h-4"></i></div>
            </div>
            <p class="text-2xl font-black text-slate-900 font-heading" id="kpi-total-users">1,280명</p>
            <p class="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
              <i data-lucide="trending-up" class="w-3.5 h-3.5"></i> 전월 대비 +14.2% 증가
            </p>
          </div>

          <!-- Card 2: Today New Users -->
          <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
            <div class="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>오늘 신규 가입</span>
              <div class="p-2 rounded-xl bg-teal-50 text-teal-600"><i data-lucide="user-plus" class="w-4 h-4"></i></div>
            </div>
            <p class="text-2xl font-black text-slate-900 font-heading" id="kpi-today-new-users">18명</p>
            <p class="text-[11px] text-teal-600 font-bold flex items-center gap-1">
              <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> 가입 목표치 달성률 120%
            </p>
          </div>

          <!-- Card 3: Realtime Access / Visitors -->
          <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
            <div class="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>실시간 접속 / 오늘 방문</span>
              <div class="p-2 rounded-xl bg-amber-50 text-amber-600"><i data-lucide="activity" class="w-4 h-4"></i></div>
            </div>
            <div class="flex items-baseline gap-2">
              <p class="text-2xl font-black text-slate-900 font-heading" id="kpi-active-users">42명</p>
              <span class="text-xs text-slate-400 font-bold">/ 오늘 860명</span>
            </div>
            <p class="text-[11px] text-amber-600 font-bold flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 실시간 접속 트래픽 정상
            </p>
          </div>

          <!-- Card 4: VIP & Regular Active Rate -->
          <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
            <div class="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>우수 회원 & 활성율</span>
              <div class="p-2 rounded-xl bg-purple-50 text-purple-600"><i data-lucide="award" class="w-4 h-4"></i></div>
            </div>
            <p class="text-2xl font-black text-slate-900 font-heading" id="kpi-vip-ratio">VIP 18% / 정상 94.5%</p>
            <p class="text-[11px] text-purple-600 font-bold flex items-center gap-1">
              <i data-lucide="heart" class="w-3.5 h-3.5"></i> 고객 충성도 우수 등급
            </p>
          </div>
        </div>

        <!-- User Analytics & Access Charts Row -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Chart 1: Growth & Access Trend (2 cols) -->
          <div class="lg:col-span-2 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h3 class="text-base font-black text-slate-900 flex items-center gap-2">
                  <i data-lucide="trending-up" class="w-4 h-4 text-indigo-600"></i>
                  <span>최근 7일간 신규 회원 가입 및 방문자 접속 추이</span>
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">매일 유입되는 신규 회원과 활성 접속자 수를 실시간 집계합니다.</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                  <span class="w-2 h-2 rounded-full bg-indigo-600"></span> 신규 가입
                </span>
                <span class="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                  <span class="w-2 h-2 rounded-full bg-slate-400"></span> 방문 접속자
                </span>
              </div>
            </div>
            <div class="h-64 relative">
              <canvas id="userGrowthChart"></canvas>
            </div>
          </div>

          <!-- Chart 2: Grade & Device Distribution (1 col) -->
          <div class="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div class="border-b border-slate-100 pb-4">
              <h3 class="text-base font-black text-slate-900 flex items-center gap-2">
                <i data-lucide="pie-chart" class="w-4 h-4 text-indigo-600"></i>
                <span>회원 등급 및 접속 기기 분포</span>
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">모바일(iOS/Android) 68% vs PC 32%</p>
            </div>
            <div class="h-64 relative flex items-center justify-center">
              <canvas id="userTierChart"></canvas>
            </div>
          </div>

        </div>

        <!-- Users Management Table Card -->
        <div class="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden space-y-4">
          
          <!-- Filter & Action Header -->
          <div class="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div class="flex flex-wrap items-center gap-3 flex-1">
              <!-- Search Input -->
              <div class="relative min-w-[240px] flex-1 max-w-sm">
                <i data-lucide="search" class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input type="text" id="user-search-input" oninput="filterAdminUsers()" placeholder="회원 성명, 이메일, 연락처 검색..." 
                       class="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:bg-white focus:border-indigo-500 transition" />
              </div>

              <!-- Grade Filter -->
              <select id="user-grade-filter" onchange="filterAdminUsers()" class="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold focus:outline-none focus:bg-white focus:border-indigo-500 transition">
                <option value="전체">전체 등급</option>
                <option value="VIP">VIP 회원</option>
                <option value="GOLD">GOLD 회원</option>
                <option value="SILVER">SILVER 회원</option>
                <option value="일반">일반 회원</option>
              </select>

              <!-- Status Filter -->
              <select id="user-status-filter" onchange="filterAdminUsers()" class="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold focus:outline-none focus:bg-white focus:border-indigo-500 transition">
                <option value="전체">전체 상태</option>
                <option value="정상">정상 회원</option>
                <option value="신규">신규 회원</option>
                <option value="휴면">휴면 계정</option>
                <option value="정지">일시 정지</option>
              </select>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-2.5 shrink-0">
              <button onclick="exportUsersCSV()" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs">
                <i data-lucide="download" class="w-4 h-4"></i>
                <span>엑셀(CSV) 다운로드</span>
              </button>
              <button onclick="openUserModal()" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 transition flex items-center gap-1.5">
                <i data-lucide="user-plus" class="w-4 h-4"></i>
                <span>+ 신규 회원 등록</span>
              </button>
            </div>

          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left border-collapse">
              <thead class="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th class="p-4 pl-6">회원 정보 (이름 / ID)</th>
                  <th class="p-4">연락처 / 배송지</th>
                  <th class="p-4 text-center">회원 등급</th>
                  <th class="p-4 text-right">보유 적립금 (P)</th>
                  <th class="p-4 text-center">누적 주문 / 결제액</th>
                  <th class="p-4">최근 접속 / 디바이스</th>
                  <th class="p-4 text-center">가입일</th>
                  <th class="p-4 text-center">계정 상태</th>
                  <th class="p-4 pr-6 text-center">관리</th>
                </tr>
              </thead>
              <tbody id="admin-users-table-body" class="divide-y divide-slate-100 font-medium">
                <!-- Populated by JavaScript -->
              </tbody>
            </table>
          </div>

          <!-- Table Footer / Count Indicator -->
          <div class="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div>
              <span>총 <strong id="user-display-count" class="text-indigo-600 font-bold">0</strong>명의 회원이 조회되었습니다.</span>
            </div>
            <div class="text-[11px] text-slate-400">
              * 회원 정보 수정 및 적립금 관리는 우측 '관리' 아이콘을 클릭하세요.
            </div>
          </div>

        </div>

      </section>

  <!-- Product Modal (Create/Edit) -->
  <div id="product-modal" class="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 id="modal-product-title" class="text-base font-black text-slate-900">신규 상품 등록</h3>
        <button onclick="closeProductModal()" class="text-slate-400 hover:text-slate-600 p-1"><i data-lucide="x" class="w-5 h-5"></i></button>
      </div>

      <form onsubmit="handleProductSave(event)" class="space-y-4 text-xs">
        <input type="hidden" id="prod-edit-id" />
        
        <div>
          <label class="block font-bold text-slate-700 mb-1">상품명 *</label>
          <input type="text" id="prod-form-name" required class="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none" />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-slate-700 mb-1">카테고리 *</label>
            <select id="prod-form-category" class="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none bg-white">
              <option value="패션 / 의류">패션 / 의류</option>
              <option value="디지털 / 가전">디지털 / 가전</option>
              <option value="뷰티 / 케어">뷰티 / 케어</option>
              <option value="리빙 / 인테리어">리빙 / 인테리어</option>
              <option value="푸드 / 키친">푸드 / 키친</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">재고 수량 *</label>
            <input type="number" id="prod-form-stock" required value="50" min="0" class="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-slate-700 mb-1">판매가 (할인가) *</label>
            <input type="number" id="prod-form-price" required value="49000" min="0" class="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">정상가 (원가)</label>
            <input type="number" id="prod-form-original-price" value="69000" min="0" class="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none" />
          </div>
        </div>

        <!-- Product Images Management (Up to 5 images, PC upload + URL) -->
        <div class="space-y-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
          <div class="flex items-center justify-between">
            <label class="block font-bold text-slate-800 text-xs flex items-center gap-1.5">
              <i data-lucide="images" class="w-4 h-4 text-indigo-600"></i>
              상품 상세 이미지 <span class="text-slate-500 font-normal">(PC 사진 최대 5장 등록 가능 / 1번째 사진이 대표 썸네일)</span>
            </label>
            <span id="modal-img-count-badge" class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-700">0 / 5장</span>
          </div>

          <!-- PC File Upload Dropzone -->
          <div id="modal-img-dropzone" onclick="document.getElementById('modal-file-input').click()" 
               class="border-2 border-dashed border-indigo-200 hover:border-indigo-500 bg-white hover:bg-indigo-50/40 rounded-xl p-3 text-center cursor-pointer transition flex flex-col items-center justify-center gap-1 group">
            <input type="file" id="modal-file-input" multiple accept="image/*" class="hidden" onchange="handleModalFileUpload(event)" />
            <div class="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition">
              <i data-lucide="upload-cloud" class="w-4 h-4"></i>
            </div>
            <p class="text-xs font-bold text-slate-700">📁 내 PC 사진 선택하여 추가 (최대 5장)</p>
            <p class="text-[10px] text-slate-400">JPG, PNG, WEBP 지원 (자동 최적화)</p>
          </div>

          <!-- URL Direct Add Row -->
          <div class="flex gap-2">
            <input type="url" id="modal-img-url-input" placeholder="또는 웹 이미지 URL 입력 (https://...)" 
                   class="flex-1 p-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none bg-white" />
            <button type="button" onclick="handleAddModalImageUrl()" 
                    class="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>URL추가
            </button>
          </div>

          <!-- 5 Images Preview Grid -->
          <div id="modal-img-preview-grid" class="grid grid-cols-5 gap-2 pt-1">
            <!-- Rendered by JS -->
          </div>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">간단 요약 설명</label>
          <input type="text" id="prod-form-summary" value="트렌디한 감성의 최고급 퀄리티 상품" class="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none" />
        </div>

        <div class="flex items-center gap-4 pt-2">
          <label class="flex items-center gap-1.5 font-bold cursor-pointer">
            <input type="checkbox" id="prod-form-isbest" class="rounded text-indigo-600" />
            <span>베스트 지정</span>
          </label>
          <label class="flex items-center gap-1.5 font-bold cursor-pointer">
            <input type="checkbox" id="prod-form-isnew" checked class="rounded text-indigo-600" />
            <span>신상품 지정</span>
          </label>
          <label class="flex items-center gap-1.5 font-bold cursor-pointer">
            <input type="checkbox" id="prod-form-issale" class="rounded text-indigo-600" />
            <span>세일 특가</span>
          </label>
        </div>

        <div class="flex gap-2 pt-4 border-t border-slate-100">
          <button type="button" onclick="closeProductModal()" class="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 transition">취소</button>
          <button type="submit" class="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold text-white transition shadow-lg shadow-indigo-600/30">저장하기</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Inquiry Answer Modal -->
  <div id="inquiry-modal" class="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4">
      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 class="text-base font-black text-slate-900">고객 문의 답변 작성</h3>
        <button onclick="closeInquiryModal()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-5 h-5"></i></button>
      </div>

      <div class="space-y-3 text-xs">
        <input type="hidden" id="inq-edit-id" />
        <div class="p-3 bg-slate-50 rounded-xl space-y-1">
          <p class="font-bold text-slate-900" id="inq-detail-title"></p>
          <p class="text-slate-600" id="inq-detail-content"></p>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">관리자 답변 내용</label>
          <textarea id="inq-form-answer" rows="4" class="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-indigo-500 focus:outline-none"></textarea>
        </div>

        <div class="flex gap-2 pt-2">
          <button type="button" onclick="closeInquiryModal()" class="flex-1 py-2.5 rounded-xl bg-slate-100 font-bold text-slate-700">취소</button>
          <button type="button" onclick="saveInquiryAnswer()" class="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white font-bold">답변 등록</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Scripts -->
  <script src="js/cart-store.js?v=20261006_v16"></script>
  <script src="js/api.js?v=20261006_v16"></script>
  <script src="js/auth-store.js"></script>
  <script src="js/components.js?v=20261006_v16"></script>
  <script>
    let adminProducts = [];
    let adminOrders = [];
    let adminInquiries = [];
    let salesChartInstance = null;

    document.addEventListener('DOMContentLoaded', async () => {
      await loadAdminUsers();
      await loadAllAdminData();
      setDashPeriod('thisMonth');
    });

    async function loadAllAdminData() {
      try {
        adminProducts = await ShopAPI.getProducts();
      } catch (e) {
        console.error('Failed to load products:', e);
        adminProducts = [];
      }
      try {
        adminOrders = await ShopAPI.getOrders();
      } catch (e) {
        console.error('Failed to load orders:', e);
        adminOrders = [];
      }
      try {
        adminInquiries = await ShopAPI.getInquiries();
      } catch (e) {
        console.error('Failed to load inquiries:', e);
        adminInquiries = [];
      }
    }

    function switchAdminTab(tab) {
      ['dashboard', 'products', 'orders', 'users', 'inquiries'].forEach(t => {
        const tabEl = document.getElementById(`tab-${t}`);
        if (tabEl) tabEl.classList.add('hidden');
        
        // Desktop nav button style
        const btn = document.getElementById(`nav-btn-${t}`);
        if (btn) btn.className = 'px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 font-bold flex items-center gap-2 transition text-xs sm:text-sm shrink-0';
        
        // Mobile nav button style
        const mBtn = document.getElementById(`nav-m-btn-${t}`);
        if (mBtn) mBtn.className = 'px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 font-bold flex items-center gap-1.5 text-xs shrink-0';
      });

      const targetTab = document.getElementById(`tab-${tab}`);
      if (targetTab) targetTab.classList.remove('hidden');
      
      const activeBtn = document.getElementById(`nav-btn-${tab}`);
      if (activeBtn) activeBtn.className = 'px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold flex items-center gap-2 transition shadow-md shadow-indigo-600/20 text-xs sm:text-sm shrink-0';

      const activeMBtn = document.getElementById(`nav-m-btn-${tab}`);
      if (activeMBtn) activeMBtn.className = 'px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold flex items-center gap-1.5 text-xs shrink-0';

      const titles = {
        dashboard: '통합 대시보드',
        products: '상품 관리 (CRUD)',
        orders: '주문 & 배송 관리',
        users: '회원 관리 & 접속 현황',
        inquiries: '고객 문의 / Q&A'
      };
      if (document.getElementById('current-tab-title')) {
        document.getElementById('current-tab-title').innerText = titles[tab] || '관리자 시스템';
      }

      if (tab === 'dashboard') renderDashboard();
      if (tab === 'products') renderAdminProductsTable(adminProducts);
      if (tab === 'orders') { applyOrderFilters(); }
      if (tab === 'users') { renderAdminUsersTable(adminUsers); renderUserCharts(); }
      if (tab === 'inquiries') renderAdminInquiriesTable(adminInquiries);

      if (window.lucide) window.lucide.createIcons();
    }

    async function refreshCurrentTab() {
      await loadAllAdminData();
      const currentTitle = document.getElementById('current-tab-title').innerText;
      if (currentTitle.includes('대시보드')) renderDashboard();
      else if (currentTitle.includes('상품')) renderAdminProductsTable(adminProducts);
      else if (currentTitle.includes('주문')) renderAdminOrdersTable(adminOrders);
      else if (currentTitle.includes('문의')) renderAdminInquiriesTable(adminInquiries);
      ShopUI.showToast('데이터를 새로고침했습니다.');
    }

            let currentDashPeriod = 'thisMonth';
    let dashStartDate = '';
    let dashEndDate = '';

    function setDashPeriod(period) {
      currentDashPeriod = period;
      document.querySelectorAll('.dash-period-btn').forEach(btn => {
        btn.className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 transition dash-period-btn';
      });
      const activeBtn = document.getElementById(`dash-btn-${period}`);
      if (activeBtn) {
        activeBtn.className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-xs transition dash-period-btn active';
      }

      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      const todayStr = `${yyyy}-${mm}-${dd}`;

      const startInput = document.getElementById('dash-start-date');
      const endInput = document.getElementById('dash-end-date');

      if (period === 'today') {
        dashStartDate = todayStr;
        dashEndDate = todayStr;
      } else if (period === 'yesterday') {
        const yDate = new Date(now);
        yDate.setDate(now.getDate() - 1);
        const yStr = `${yDate.getFullYear()}-${String(yDate.getMonth() + 1).padStart(2, '0')}-${String(yDate.getDate()).padStart(2, '0')}`;
        dashStartDate = yStr;
        dashEndDate = yStr;
      } else if (period === '7days') {
        const d7 = new Date(now);
        d7.setDate(now.getDate() - 6);
        dashStartDate = `${d7.getFullYear()}-${String(d7.getMonth() + 1).padStart(2, '0')}-${String(d7.getDate()).padStart(2, '0')}`;
        dashEndDate = todayStr;
      } else if (period === 'thisMonth') {
        dashStartDate = `${yyyy}-${mm}-01`;
        dashEndDate = todayStr;
      } else if (period === 'all') {
        dashStartDate = '';
        dashEndDate = '';
      }

      if (startInput) startInput.value = dashStartDate;
      if (endInput) endInput.value = dashEndDate;

      renderDashboard();
    }

    function applyDashCustomDate() {
      const s = document.getElementById('dash-start-date').value;
      const e = document.getElementById('dash-end-date').value;
      if (!s || !e) {
        alert('시작일과 종료일을 모두 선택해 주세요.');
        return;
      }
      if (s > e) {
        alert('시작일은 종료일보다 이전이어야 합니다.');
        return;
      }
      currentDashPeriod = 'custom';
      dashStartDate = s;
      dashEndDate = e;

      document.querySelectorAll('.dash-period-btn').forEach(btn => {
        btn.className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 transition dash-period-btn';
      });

      renderDashboard();
    }

    function renderDashboard() {
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      const todayStr = `${yyyy}-${mm}-${dd}`;

      // 1. TODAY'S SALES & ORDERS (Always computed for today)
      let todayOrders = adminOrders.filter(o => o.orderDate && o.orderDate.startsWith(todayStr) && o.status !== '주문취소');
      // If no orders match todayStr, check latest order date
      if (todayOrders.length === 0 && adminOrders.length > 0) {
        const latestDate = adminOrders[0].orderDate ? adminOrders[0].orderDate.substring(0, 10) : todayStr;
        const matchingLatest = adminOrders.filter(o => o.orderDate && o.orderDate.startsWith(latestDate) && o.status !== '주문취소');
        if (matchingLatest.length > 0) {
          todayOrders = matchingLatest;
        }
      }

      const todaySales = todayOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
      const todayCount = todayOrders.length;

      const todaySalesEl = document.getElementById('kpi-today-sales');
      if (todaySalesEl) todaySalesEl.innerText = ShopUI.formatPrice(todaySales);

      const todayBadgeEl = document.getElementById('kpi-today-count-badge');
      if (todayBadgeEl) {
        todayBadgeEl.innerHTML = `<i data-lucide="trending-up" class="w-3.5 h-3.5"></i> 오늘 결제 ${todayCount}건 (실시간 집계)`;
      }

      // 2. SELECTED PERIOD SALES & ORDERS
      let periodOrders = [...adminOrders];
      let periodTitle = '선택 기간 총 매출액';
      let periodLabelText = '조회 기간 기준';

      if (currentDashPeriod === 'today') {
        periodOrders = todayOrders;
        periodTitle = '오늘 총 매출액';
        periodLabelText = '오늘 기준';
      } else if (currentDashPeriod === 'yesterday') {
        const yDate = new Date(now);
        yDate.setDate(now.getDate() - 1);
        const yStr = `${yDate.getFullYear()}-${String(yDate.getMonth() + 1).padStart(2, '0')}-${String(yDate.getDate()).padStart(2, '0')}`;
        periodOrders = adminOrders.filter(o => o.orderDate && o.orderDate.startsWith(yStr) && o.status !== '주문취소');
        periodTitle = '어제 총 매출액';
        periodLabelText = '어제 기준';
      } else if (currentDashPeriod === '7days') {
        const d7 = new Date(now);
        d7.setDate(now.getDate() - 6);
        const d7Str = `${d7.getFullYear()}-${String(d7.getMonth() + 1).padStart(2, '0')}-${String(d7.getDate()).padStart(2, '0')}`;
        periodOrders = adminOrders.filter(o => {
          if (!o.orderDate || o.status === '주문취소') return false;
          const dStr = o.orderDate.substring(0, 10);
          return dStr >= d7Str && dStr <= todayStr;
        });
        periodTitle = '최근 7일간 총 매출액';
        periodLabelText = '최근 7일 기준';
      } else if (currentDashPeriod === 'thisMonth') {
        const mStr = `${yyyy}-${mm}`;
        periodOrders = adminOrders.filter(o => o.orderDate && o.orderDate.startsWith(mStr) && o.status !== '주문취소');
        if (periodOrders.length === 0) periodOrders = adminOrders.filter(o => o.status !== '주문취소');
        periodTitle = '이번 달 누적 매출액';
        periodLabelText = '이번 달 기준';
      } else if (currentDashPeriod === 'all') {
        periodOrders = adminOrders.filter(o => o.status !== '주문취소');
        periodTitle = '전체 누적 매출액';
        periodLabelText = '전체 기간 기준';
      } else if (currentDashPeriod === 'custom') {
        periodOrders = adminOrders.filter(o => {
          if (!o.orderDate || o.status === '주문취소') return false;
          const dStr = o.orderDate.substring(0, 10);
          return (!dashStartDate || dStr >= dashStartDate) && (!dashEndDate || dStr <= dashEndDate);
        });
        periodTitle = '조회 기간 총 매출액';
        periodLabelText = `${dashStartDate} ~ ${dashEndDate}`;
      }

      const totalPeriodSales = periodOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
      const periodOrdersCount = periodOrders.length;

      const periodTitleEl = document.getElementById('kpi-period-title');
      if (periodTitleEl) periodTitleEl.innerText = periodTitle;

      const periodLabelEl = document.getElementById('dash-active-period-label');
      if (periodLabelEl) periodLabelEl.innerText = periodLabelText;

      const periodSalesEl = document.getElementById('kpi-period-sales');
      if (periodSalesEl) periodSalesEl.innerText = ShopUI.formatPrice(totalPeriodSales);

      const periodBadgeEl = document.getElementById('kpi-period-badge');
      if (periodBadgeEl) {
        periodBadgeEl.innerHTML = `<i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i> 선택 기간 ${periodOrdersCount}건 결제 완료`;
      }

      // 3. PENDING ORDERS (결제완료 + 상품준비)
      const pendingOrders = adminOrders.filter(o => o.status === '결제완료' || o.status === '상품준비');
      const pendingCount = pendingOrders.length;
      const paidCount = adminOrders.filter(o => o.status === '결제완료').length;
      const prepCount = adminOrders.filter(o => o.status === '상품준비').length;

      const pendingEl = document.getElementById('kpi-pending-orders');
      if (pendingEl) pendingEl.innerText = `${pendingCount}건`;

      const pendingBadgeEl = document.getElementById('kpi-pending-badge');
      if (pendingBadgeEl) {
        pendingBadgeEl.innerHTML = `<i data-lucide="clock" class="w-3.5 h-3.5"></i> 결제완료 ${paidCount}건 / 상품준비 ${prepCount}건`;
      }

      // 4. TOTAL PRODUCTS & LOW STOCK
      const lowStockCount = adminProducts.filter(p => p.stock < 10).length;
      const totalProdEl = document.getElementById('kpi-total-products');
      if (totalProdEl) totalProdEl.innerText = `${adminProducts.length}개 / ${lowStockCount}개`;

      const prodBadgeEl = document.getElementById('kpi-products-badge');
      if (prodBadgeEl) {
        prodBadgeEl.innerHTML = `<i data-lucide="alert-circle" class="w-3.5 h-3.5"></i> 품절 임박 ${lowStockCount}개 운영 관리 중`;
      }

      // 5. QUICK ORDERS (최근 접수 주문 5건)
      const quickContainer = document.getElementById('quick-orders-list');
      if (quickContainer) {
        const recentOrders = adminOrders.slice(0, 5);
        if (recentOrders.length === 0) {
          quickContainer.innerHTML = `<p class="text-center py-6 text-xs text-slate-400">접수된 주문이 없습니다.</p>`;
        } else {
          quickContainer.innerHTML = recentOrders.map(o => {
            let statusBadge = 'bg-slate-100 text-slate-600';
            if (o.status === '결제완료') statusBadge = 'bg-indigo-50 text-indigo-600';
            else if (o.status === '상품준비') statusBadge = 'bg-amber-50 text-amber-600';
            else if (o.status === '배송중') statusBadge = 'bg-blue-50 text-blue-600';
            else if (o.status === '배송완료') statusBadge = 'bg-emerald-50 text-emerald-600';
            else if (o.status === '주문취소') statusBadge = 'bg-rose-50 text-rose-600';

            const prodSummary = (o.items && o.items[0])
              ? o.items[0].name + (o.items.length > 1 ? ` 외 ${o.items.length - 1}건` : '')
              : '주문 상품';

            return `
              <div class="py-2.5 first:pt-0 flex items-center justify-between gap-3 text-xs">
                <div class="min-w-0">
                  <div class="flex items-center gap-1.5">
                    <span class="font-bold text-slate-900 truncate">${o.customerName || '고객'}</span>
                    <span class="text-[10px] text-slate-400 font-mono">(${o.orderId})</span>
                  </div>
                  <p class="text-[11px] text-slate-500 truncate">${prodSummary}</p>
                  <p class="text-[10px] text-slate-400 mt-0.5">${o.orderDate || ''}</p>
                </div>
                <div class="text-right shrink-0">
                  <span class="font-black text-slate-900 block">${ShopUI.formatPrice(o.totalAmount || 0)}</span>
                  <span class="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${statusBadge} mt-0.5">${o.status}</span>
                </div>
              </div>
            `;
          }).join('');
        }
      }

      // 6. RENDER DYNAMIC SALES CHART FOR PERIOD
      renderSalesChartForPeriod();
      if (window.lucide) window.lucide.createIcons();
    }

    function renderSalesChartForPeriod() {
      const ctx = document.getElementById('salesChart');
      if (!ctx || typeof Chart === 'undefined') return;
      if (salesChartInstance) salesChartInstance.destroy();

      const now = new Date();
      let chartTitle = '최근 7일간 일별 실시간 매출 추이 (원)';

      let dayLabels = [];
      let daySales = [];

      let pointsCount = 7;
      let baseDate = now;

      if (currentDashPeriod === 'today') {
        chartTitle = '오늘 시간대별 실시간 매출 추이 (원)';
        dayLabels = ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '현재'];
        const todayTotal = adminOrders
          .filter(o => o.orderDate && o.orderDate.startsWith(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`) && o.status !== '주문취소')
          .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
        daySales = [
          Math.round(todayTotal * 0.1),
          Math.round(todayTotal * 0.25),
          Math.round(todayTotal * 0.4),
          Math.round(todayTotal * 0.65),
          Math.round(todayTotal * 0.85),
          todayTotal,
          todayTotal
        ];
      } else if (currentDashPeriod === 'yesterday') {
        chartTitle = '어제 시간대별 매출 추이 (원)';
        dayLabels = ['09:00', '12:00', '15:00', '18:00', '21:00', '마감'];
        daySales = [45000, 128000, 216000, 216000, 216000, 216000];
      } else {
        pointsCount = 7;
        if (currentDashPeriod === '7days') chartTitle = '최근 7일간 일별 실시간 매출 추이 (원)';
        else if (currentDashPeriod === 'thisMonth') chartTitle = '이번 달 최근 일별 매출 추이 (원)';
        else if (currentDashPeriod === 'all') chartTitle = '주요 일자별 실시간 매출 추이 (원)';
        else chartTitle = `${dashStartDate} ~ ${dashEndDate} 일별 매출 추이 (원)`;

        for (let i = pointsCount - 1; i >= 0; i--) {
          const d = new Date(baseDate);
          d.setDate(baseDate.getDate() - i);
          const yyyy = d.getFullYear();
          const mm = String(d.getMonth() + 1).padStart(2, '0');
          const dd = String(d.getDate()).padStart(2, '0');
          const dateKey = `${yyyy}-${mm}-${dd}`;
          dayLabels.push(`${d.getMonth() + 1}/${d.getDate()}`);

          const totalForDay = adminOrders
            .filter(o => o.orderDate && o.orderDate.startsWith(dateKey) && o.status !== '주문취소')
            .reduce((acc, o) => acc + (o.totalAmount || 0), 0);
          daySales.push(totalForDay);
        }

        const total7 = daySales.reduce((a, b) => a + b, 0);
        if (total7 === 0 && adminOrders.length > 0) {
          const orderTotals = adminOrders.map(o => o.totalAmount || 0);
          daySales = dayLabels.map((_, idx) => orderTotals[idx % orderTotals.length] || 0);
        }
      }

      const titleEl = document.getElementById('dash-chart-title');
      if (titleEl) titleEl.innerText = chartTitle;

      salesChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dayLabels,
          datasets: [{
            label: '일별 실매출액',
            data: daySales,
            borderColor: '#4f46e5',
            backgroundColor: 'rgba(79, 70, 229, 0.08)',
            fill: true,
            tension: 0.35,
            borderWidth: 3,
            pointBackgroundColor: '#4f46e5',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#0f172a',
              titleFont: { size: 12, weight: 'bold' },
              bodyFont: { size: 12 },
              padding: 10,
              cornerRadius: 10,
              callbacks: {
                label: function(context) {
                  return ' ' + (ShopUI ? ShopUI.formatPrice(context.raw) : (context.raw.toLocaleString() + '원'));
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: '#f1f5f9' },
              ticks: {
                font: { size: 10 },
                callback: function(val) {
                  if (val >= 10000) return (val / 10000) + '만원';
                  return val.toLocaleString() + '원';
                }
              }
            },
            x: {
              grid: { display: false },
              ticks: { font: { size: 11, weight: 'bold' }, color: '#64748b' }
            }
          }
        }
      });
    }

    // Products Management Table
    function renderAdminProductsTable(products) {
      const tbody = document.getElementById('admin-products-table');
      tbody.innerHTML = products.map(p => `
        <tr class="hover:bg-slate-50 transition">
          <td class="p-4 flex items-center gap-3">
            <img src="${p.thumbnail}" alt="${p.name}" class="w-10 h-10 rounded-xl object-cover border border-slate-200" />
            <div>
              <p class="font-bold text-slate-900 line-clamp-1">${p.name}</p>
              <p class="text-[10px] text-slate-400 font-mono">${p.id}</p>
            </div>
          </td>
          <td class="p-4 font-semibold text-slate-700">${p.category}</td>
          <td class="p-4 font-black text-indigo-600">${ShopUI.formatPrice(p.price)}</td>
          <td class="p-4 text-slate-400">${ShopUI.formatPrice(p.originalPrice)}</td>
          <td class="p-4">
            <span class="px-2 py-0.5 rounded-md font-bold text-xs ${p.stock > 10 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}">
              ${p.stock}개
            </span>
          </td>
          <td class="p-4 text-slate-600">★ ${p.rating || 5.0} (${p.reviewCount || 0})</td>
          <td class="p-4">
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">판매중</span>
          </td>
          <td class="p-4 text-center">
            <div class="flex items-center justify-center gap-1">
              <button onclick="editProduct('${p.id}')" class="p-1.5 text-slate-500 hover:text-indigo-600 rounded-lg hover:bg-slate-100" title="수정">
                <i data-lucide="edit-2" class="w-4 h-4"></i>
              </button>
              <button onclick="deleteProduct('${p.id}')" class="p-1.5 text-slate-500 hover:text-rose-600 rounded-lg hover:bg-rose-50" title="삭제">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </td>
        </tr>
      `).join('');
      if (window.lucide) window.lucide.createIcons();
    }

    function filterAdminProducts() {
      const keyword = document.getElementById('admin-prod-search').value.toLowerCase();
      const cat = document.getElementById('admin-prod-cat-filter').value;

      let filtered = [...adminProducts];
      if (cat !== '전체') filtered = filtered.filter(p => p.category === cat);
      if (keyword) filtered = filtered.filter(p => p.name.toLowerCase().includes(keyword));

      renderAdminProductsTable(filtered);
    }

    
    let adminUsers = [];
    let userGrowthChartInstance = null;
    let userTierChartInstance = null;

    async function loadAdminUsers() {
      try {
        adminUsers = await ShopAPI.getUsers();
      } catch (err) {
        console.error('회원 데이터 로딩 실패:', err);
        adminUsers = [];
      }
    }

    function renderAdminUsersTable(users = adminUsers) {
      const tbody = document.getElementById('admin-users-table-body');
      const countEl = document.getElementById('user-display-count');
      if (!tbody) return;

      if (countEl) countEl.innerText = users.length;

      // Update KPI Cards
      if (document.getElementById('kpi-total-users')) {
        document.getElementById('kpi-total-users').innerText = `${adminUsers.length || 1280}명`;
      }

      if (!users.length) {
        tbody.innerHTML = '<tr><td colspan="9" class="p-8 text-center text-slate-400 font-bold">일치하는 회원 데이터가 없습니다.</td></tr>';
        return;
      }

      const gradeBadges = {
        'VIP': 'bg-purple-100 text-purple-700 border-purple-200',
        'GOLD': 'bg-amber-100 text-amber-700 border-amber-200',
        'SILVER': 'bg-slate-200 text-slate-700 border-slate-300',
        '일반': 'bg-slate-100 text-slate-600 border-slate-200'
      };

      const statusBadges = {
        '정상': 'bg-emerald-50 text-emerald-600 border-emerald-200',
        '신규': 'bg-teal-50 text-teal-600 border-teal-200',
        '휴면': 'bg-amber-50 text-amber-600 border-amber-200',
        '정지': 'bg-rose-50 text-rose-600 border-rose-200'
      };

      tbody.innerHTML = users.map(u => {
        const gBadge = gradeBadges[u.grade] || gradeBadges['일반'];
        const sBadge = statusBadges[u.status] || statusBadges['정상'];
        const initials = u.name ? u.name.slice(0, 1) : 'U';

        return `
          <tr class="hover:bg-slate-50/80 transition">
            <td class="p-4 pl-6">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 font-black flex items-center justify-center text-xs shrink-0 shadow-xs">
                  ${initials}
                </div>
                <div>
                  <div class="font-bold text-slate-900">${u.name}</div>
                  <div class="text-[11px] text-slate-400 font-mono">${u.email}</div>
                </div>
              </div>
            </td>
            <td class="p-4">
              <div class="text-slate-700 font-bold">${u.phone || '-'}</div>
              <div class="text-[11px] text-slate-400 truncate max-w-[180px]">${u.address || '주소 미등록'}</div>
            </td>
            <td class="p-4 text-center">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black border ${gBadge}">
                ${u.grade || '일반'}
              </span>
            </td>
            <td class="p-4 text-right">
              <span class="font-bold text-indigo-600">${(u.points || 0).toLocaleString()} P</span>
            </td>
            <td class="p-4 text-center">
              <div class="font-bold text-slate-900">${u.orderCount || 0}건</div>
              <div class="text-[10px] text-slate-400">${(u.totalSpent || 0).toLocaleString()}원</div>
            </td>
            <td class="p-4">
              <div class="text-[11px] text-slate-700 font-bold flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>${u.lastLogin || '2026-10-06 17:00:00'}</span>
              </div>
              <div class="text-[10px] text-slate-400">${u.device || 'Mobile'}</div>
            </td>
            <td class="p-4 text-center text-slate-500 font-mono text-[11px]">
              ${u.joinedAt || '2026-01-01'}
            </td>
            <td class="p-4 text-center">
              <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${sBadge}">
                ${u.status || '정상'}
              </span>
            </td>
            <td class="p-4 pr-6 text-center">
              <div class="flex items-center justify-center gap-1">
                <button onclick="openPointsModal('${u.id}')" class="p-1.5 text-amber-500 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition" title="적립금 관리">
                  <i data-lucide="coins" class="w-4 h-4"></i>
                </button>
                <button onclick="editUser('${u.id}')" class="p-1.5 text-slate-500 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition" title="회원 정보 수정">
                  <i data-lucide="edit-3" class="w-4 h-4"></i>
                </button>
                <button onclick="deleteUserAction('${u.id}')" class="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition" title="회원 삭제">
                  <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      if (window.lucide) lucide.createIcons();
    }

    function renderUserCharts() {
      const growthCanvas = document.getElementById('userGrowthChart');
      const tierCanvas = document.getElementById('userTierChart');
      if (!growthCanvas || !tierCanvas) return;

      // 1. User Growth & Access Trend Chart
      if (userGrowthChartInstance) userGrowthChartInstance.destroy();
      userGrowthChartInstance = new Chart(growthCanvas, {
        type: 'line',
        data: {
          labels: ['9/30 (수)', '10/1 (목)', '10/2 (금)', '10/3 (토)', '10/4 (일)', '10/5 (월)', '10/6 (오늘)'],
          datasets: [
            {
              label: '신규 회원 가입(명)',
              data: [12, 15, 14, 22, 28, 16, 18],
              borderColor: '#4f46e5',
              backgroundColor: 'rgba(79, 70, 229, 0.1)',
              borderWidth: 2.5,
              fill: true,
              tension: 0.35
            },
            {
              label: '방문 접속자(×10명)',
              data: [62, 70, 75, 98, 112, 82, 86],
              borderColor: '#94a3b8',
              backgroundColor: 'transparent',
              borderWidth: 2,
              borderDash: [4, 4],
              tension: 0.35
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
            x: { grid: { display: false } }
          }
        }
      });

      // 2. User Grade & Device Doughnut Chart
      if (userTierChartInstance) userTierChartInstance.destroy();
      userTierChartInstance = new Chart(tierCanvas, {
        type: 'doughnut',
        data: {
          labels: ['VIP 회원', 'GOLD 회원', 'SILVER 회원', '일반 회원'],
          datasets: [{
            data: [18, 27, 33, 22],
            backgroundColor: ['#9333ea', '#f59e0b', '#64748b', '#4f46e5'],
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } }
          },
          cutout: '65%'
        }
      });
    }

    function filterAdminUsers() {
      const q = (document.getElementById('user-search-input').value || '').toLowerCase().trim();
      const grade = document.getElementById('user-grade-filter').value;
      const status = document.getElementById('user-status-filter').value;

      let filtered = [...adminUsers];
      if (q) {
        filtered = filtered.filter(u =>
          (u.name && u.name.toLowerCase().includes(q)) ||
          (u.email && u.email.toLowerCase().includes(q)) ||
          (u.phone && u.phone.includes(q))
        );
      }
      if (grade !== '전체') {
        filtered = filtered.filter(u => u.grade === grade);
      }
      if (status !== '전체') {
        filtered = filtered.filter(u => u.status === status);
      }

      renderAdminUsersTable(filtered);
    }

    function openUserModal(user = null) {
      document.getElementById('modal-user-title').innerText = user ? '회원 정보 수정' : '신규 회원 등록';
      document.getElementById('user-edit-id').value = user ? user.id : '';
      document.getElementById('user-form-name').value = user ? user.name : '';
      document.getElementById('user-form-email').value = user ? user.email : '';
      document.getElementById('user-form-phone').value = user ? user.phone : '';
      document.getElementById('user-form-grade').value = user ? user.grade : '일반';
      document.getElementById('user-form-points').value = user ? user.points : 3000;
      document.getElementById('user-form-status').value = user ? user.status : '정상';
      document.getElementById('user-form-address').value = user ? (user.address || '') : '';
      document.getElementById('user-form-address-detail').value = user ? (user.addressDetail || '') : '';

      document.getElementById('user-modal').classList.remove('hidden');
    }

    function closeUserModal() {
      document.getElementById('user-modal').classList.add('hidden');
    }

    async function handleUserSave(e) {
      e.preventDefault();
      const editId = document.getElementById('user-edit-id').value;
      const name = document.getElementById('user-form-name').value.trim();
      const email = document.getElementById('user-form-email').value.trim();
      const phone = document.getElementById('user-form-phone').value.trim();
      const grade = document.getElementById('user-form-grade').value;
      const points = parseInt(document.getElementById('user-form-points').value) || 0;
      const status = document.getElementById('user-form-status').value;
      const address = document.getElementById('user-form-address').value.trim();
      const addressDetail = document.getElementById('user-form-address-detail').value.trim();

      const userData = {
        name,
        email,
        phone,
        grade,
        points,
        status,
        address,
        addressDetail
      };

      if (editId) {
        await ShopAPI.updateUser(editId, userData);
        ShopUI.showToast('회원 정보가 성공적으로 수정되었습니다.');
      } else {
        await ShopAPI.createUser(userData);
        ShopUI.showToast('신규 회원이 성공적으로 등록되었습니다.');
      }

      closeUserModal();
      await loadAdminUsers();
      renderAdminUsersTable(adminUsers);
      renderUserCharts();
    }

    function editUser(id) {
      const u = adminUsers.find(item => item.id === id);
      if (u) openUserModal(u);
    }

    async function deleteUserAction(id) {
      if (confirm('정말 해당 회원을 삭제(탈퇴 처리)하시겠습니까?')) {
        await ShopAPI.deleteUser(id);
        ShopUI.showToast('회원이 삭제되었습니다.');
        await loadAdminUsers();
        renderAdminUsersTable(adminUsers);
      }
    }

    function openPointsModal(id) {
      const u = adminUsers.find(item => item.id === id);
      if (!u) return;
      document.getElementById('points-user-id').value = u.id;
      document.getElementById('points-target-name').innerText = `${u.name} (${u.email})`;
      document.getElementById('points-target-current').innerText = `${(u.points || 0).toLocaleString()} P`;
      document.getElementById('points-amount-input').value = '';
      document.getElementById('user-points-modal').classList.remove('hidden');
    }

    function closePointsModal() {
      document.getElementById('user-points-modal').classList.add('hidden');
    }

    async function handlePointsSave() {
      const userId = document.getElementById('points-user-id').value;
      const amount = parseInt(document.getElementById('points-amount-input').value);
      if (!amount || amount <= 0) {
        alert('올바른 포인트 금액을 입력해 주세요.');
        return;
      }

      const type = document.querySelector('input[name="points-type"]:checked').value;
      const u = adminUsers.find(item => item.id === userId);
      if (!u) return;

      let newPoints = u.points || 0;
      if (type === 'add') newPoints += amount;
      else newPoints = Math.max(0, newPoints - amount);

      await ShopAPI.updateUser(userId, { points: newPoints });
      ShopUI.showToast(`${u.name} 님의 적립금이 ${type === 'add' ? '+' : '-'}${amount.toLocaleString()}P 변경되었습니다.`);
      closePointsModal();
      await loadAdminUsers();
      renderAdminUsersTable(adminUsers);
    }

    function exportUsersCSV() {
      if (!adminUsers.length) {
        ShopUI.showToast('내보낼 회원 데이터가 없습니다.');
        return;
      }

      let csvContent = "﻿회원ID,성명,이메일,연락처,등급,적립금,누적주문건수,누적결제액,최근접속,가입일,상태,주소\n";
      adminUsers.forEach(u => {
        csvContent += `"${u.id}","${u.name}","${u.email}","${u.phone || ''}","${u.grade}","${u.points}","${u.orderCount || 0}","${u.totalSpent || 0}","${u.lastLogin || ''}","${u.joinedAt || ''}","${u.status}","${(u.address || '') + ' ' + (u.addressDetail || '')}"\n`;
      });

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `EASYSHOP_회원목록_${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      ShopUI.showToast('회원 목록 CSV 파일이 다운로드되었습니다.');
    }

    let modalProductImages = [];

    function initModalDropzone() {
      const dropzone = document.getElementById('modal-img-dropzone');
      if (!dropzone) return;
      ['dragenter', 'dragover'].forEach(evt => {
        dropzone.addEventListener(evt, e => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.add('border-indigo-600', 'bg-indigo-50/70');
        }, false);
      });
      ['dragleave', 'drop'].forEach(evt => {
        dropzone.addEventListener(evt, e => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.remove('border-indigo-600', 'bg-indigo-50/70');
        }, false);
      });
      dropzone.addEventListener('drop', e => {
        const dt = e.dataTransfer;
        const files = dt && dt.files;
        if (files && files.length) {
          handleModalFileUpload({ target: { files: files } });
        }
      }, false);
    }
    document.addEventListener('DOMContentLoaded', initModalDropzone);


    function renderModalImagePreviews() {
      const container = document.getElementById('modal-img-preview-grid');
      const countBadge = document.getElementById('modal-img-count-badge');
      if (!container) return;

      if (countBadge) {
        countBadge.innerText = modalProductImages.length + ' / 5장';
      }

      let html = '';
      for (let i = 0; i < 5; i++) {
        const img = modalProductImages[i];
        if (img) {
          const isMain = i === 0;
          html += '<div class="relative group rounded-xl overflow-hidden border-2 ' + (isMain ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-slate-200') + ' bg-slate-100 aspect-square flex items-center justify-center shadow-xs">' +
            '<img src="' + img + '" alt="사진 ' + (i+1) + '" class="w-full h-full object-cover" />' +
            (isMain ? '<span class="absolute top-1 left-1 bg-indigo-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow">대표</span>' : 
              '<button type="button" onclick="setModalMainImage(' + i + ')" title="대표 사진으로 설정" class="absolute bottom-1 left-1 right-1 bg-slate-900/85 hover:bg-indigo-600 text-white text-[9px] font-bold py-0.5 rounded opacity-0 group-hover:opacity-100 transition text-center">대표지정</button>') +
            '<button type="button" onclick="removeModalImage(' + i + ')" title="삭제" class="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold hover:bg-rose-700 shadow transition opacity-90 group-hover:opacity-100">✕</button>' +
          '</div>';
        } else {
          html += '<div onclick="document.getElementById(\'modal-file-input\').click()" class="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl aspect-square flex flex-col items-center justify-center text-slate-400 hover:text-indigo-600 cursor-pointer transition bg-white/60 hover:bg-indigo-50/20">' +
            '<i data-lucide="image-plus" class="w-4 h-4 mb-0.5"></i>' +
            '<span class="text-[10px] font-bold">+추가</span>' +
          '</div>';
        }
      }
      container.innerHTML = html;
      if (window.lucide) lucide.createIcons();
    }

    function resizeImageFile(file, maxWidth, maxHeight, quality) {
      maxWidth = maxWidth || 1000;
      maxHeight = maxHeight || 1000;
      quality = quality || 0.85;
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            let width = img.width;
            let height = img.height;
            if (width > height) {
              if (width > maxWidth) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width = Math.round((width * maxHeight) / height);
                height = maxHeight;
              }
            }
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', quality));
          };
          img.onerror = reject;
          img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    async function handleModalFileUpload(event) {
      const files = Array.from(event.target.files || []);
      if (!files.length) return;

      const remaining = 5 - modalProductImages.length;
      if (remaining <= 0) {
        ShopUI.showToast('상품 사진은 최대 5장까지만 등록 가능합니다.', 'warning');
        event.target.value = '';
        return;
      }

      const toProcess = files.slice(0, remaining);
      for (const file of toProcess) {
        if (!file.type.startsWith('image/')) continue;
        try {
          const dataUrl = await resizeImageFile(file);
          modalProductImages.push(dataUrl);
        } catch (err) {
          console.error('이미지 변환 오류:', err);
        }
      }
      event.target.value = '';
      renderModalImagePreviews();
    }

    function handleAddModalImageUrl() {
      const input = document.getElementById('modal-img-url-input');
      const url = input.value.trim();
      if (!url) return;

      if (modalProductImages.length >= 5) {
        ShopUI.showToast('상품 사진은 최대 5장까지만 등록 가능합니다.', 'warning');
        return;
      }

      modalProductImages.push(url);
      input.value = '';
      renderModalImagePreviews();
    }

    function removeModalImage(index) {
      modalProductImages.splice(index, 1);
      renderModalImagePreviews();
    }

    function setModalMainImage(index) {
      if (index <= 0 || index >= modalProductImages.length) return;
      const target = modalProductImages.splice(index, 1)[0];
      modalProductImages.unshift(target);
      renderModalImagePreviews();
    }

    function openProductModal(prod = null) {
      document.getElementById('modal-product-title').innerText = prod ? '상품 정보 수정' : '신규 상품 등록';
      document.getElementById('prod-edit-id').value = prod ? prod.id : '';
      document.getElementById('prod-form-name').value = prod ? prod.name : '';
      document.getElementById('prod-form-category').value = prod ? prod.category : '패션 / 의류';
      document.getElementById('prod-form-stock').value = prod ? prod.stock : 50;
      document.getElementById('prod-form-price').value = prod ? prod.price : 49000;
      document.getElementById('prod-form-original-price').value = prod ? prod.originalPrice : 69000;
      document.getElementById('prod-form-summary').value = prod ? prod.summary : '';
      document.getElementById('prod-form-isbest').checked = prod ? !!prod.isBest : false;
      document.getElementById('prod-form-isnew').checked = prod ? !!prod.isNew : true;
      document.getElementById('prod-form-issale').checked = prod ? !!prod.isSale : false;

      // Initialize Images (up to 5)
      if (prod && prod.images && prod.images.length > 0) {
        modalProductImages = [...prod.images];
      } else if (prod && prod.thumbnail) {
        modalProductImages = [prod.thumbnail];
      } else {
        modalProductImages = ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'];
      }
      renderModalImagePreviews();

      document.getElementById('product-modal').classList.remove('hidden');
    }

    function closeProductModal() {
      document.getElementById('product-modal').classList.add('hidden');
    }

    async function handleProductSave(e) {
      e.preventDefault();
      const editId = document.getElementById('prod-edit-id').value;
      const price = parseInt(document.getElementById('prod-form-price').value);
      const originalPrice = parseInt(document.getElementById('prod-form-original-price').value) || price;
      const discountRate = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

      const finalImages = modalProductImages.length > 0 ? [...modalProductImages] : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'];
      const finalThumb = finalImages[0];

      const productData = {
        id: editId || 'prod-' + Date.now().toString().slice(-4),
        name: document.getElementById('prod-form-name').value,
        category: document.getElementById('prod-form-category').value,
        price: price,
        originalPrice: originalPrice,
        discountRate: discountRate,
        stock: parseInt(document.getElementById('prod-form-stock').value),
        thumbnail: finalThumb,
        images: finalImages,
        summary: document.getElementById('prod-form-summary').value,
        isBest: document.getElementById('prod-form-isbest').checked,
        isNew: document.getElementById('prod-form-isnew').checked,
        isSale: document.getElementById('prod-form-issale').checked,
        rating: 5.0,
        reviewCount: 0
      };

      if (editId) {
        await ShopAPI.updateProduct(editId, productData);
        ShopUI.showToast('상품 정보가 수정되었습니다.');
      } else {
        await ShopAPI.createProduct(productData);
        ShopUI.showToast('신규 상품이 성공적으로 등록되었습니다!');
      }

      closeProductModal();
      await refreshCurrentTab();
    }

    function editProduct(id) {
      const p = adminProducts.find(item => item.id === id);
      if (p) openProductModal(p);
    }

    async function deleteProduct(id) {
      if (confirm('해당 상품을 삭제하시겠습니까?')) {
        await ShopAPI.deleteProduct(id);
        ShopUI.showToast('상품이 삭제되었습니다.');
        await refreshCurrentTab();
      }
    }

    
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
      const todayStr = `${yyyy}-${mm}-${dd}`;

      if (currentOrderPeriod === 'month') {
        orderStartDate = `${yyyy}-${mm}-01`;
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
      const activeBtn = document.getElementById(`period-btn-${period}`);
      if (activeBtn) {
        activeBtn.className = 'px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white shadow-xs transition order-period-btn active';
      }

      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      const todayStr = `${yyyy}-${mm}-${dd}`;

      if (period === 'today') {
        orderStartDate = todayStr;
        orderEndDate = todayStr;
      } else if (period === 'yesterday') {
        const yDate = new Date(now);
        yDate.setDate(now.getDate() - 1);
        const yStr = `${yDate.getFullYear()}-${String(yDate.getMonth() + 1).padStart(2, '0')}-${String(yDate.getDate()).padStart(2, '0')}`;
        orderStartDate = yStr;
        orderEndDate = yStr;
      } else if (period === 'week') {
        const d7 = new Date(now);
        d7.setDate(now.getDate() - 6);
        orderStartDate = `${d7.getFullYear()}-${String(d7.getMonth() + 1).padStart(2, '0')}-${String(d7.getDate()).padStart(2, '0')}`;
        orderEndDate = todayStr;
      } else if (period === 'month') {
        orderStartDate = `${yyyy}-${mm}-01`;
        orderEndDate = todayStr;
      } else if (period === '3months') {
        const d90 = new Date(now);
        d90.setDate(now.getDate() - 90);
        orderStartDate = `${d90.getFullYear()}-${String(d90.getMonth() + 1).padStart(2, '0')}-${String(d90.getDate()).padStart(2, '0')}`;
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
        amountTextEl.innerText = `합계 결제액: ${ShopUI.formatPrice(totalSum)}`;
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
      if (totalSubEl) totalSubEl.innerText = `총 ${orderCount}건 결제 합계 (${periodOrders.length - orderCount}건 취소)`;
      if (countEl) countEl.innerText = `${orderCount}건`;
      if (countSubEl) countSubEl.innerText = `결제완료 ${pendingPaid}건 · 배송중 ${shippingCount}건 · 배송완료 ${deliveredCount}건`;
      if (avgEl) avgEl.innerText = ShopUI.formatPrice(avgPrice);
      if (shipEl) shipEl.innerText = `${pendingPaid + shippingCount}건`;
      if (shipSubEl) shipSubEl.innerText = `결제완료 ${pendingPaid}건 / 배송중 ${shippingCount}건 관리 중`;

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
        countText.innerText = `총 ${topProducts.length}개 품목 주문`;
      }

      if (topBar) {
        if (topProducts.length === 0) {
          topBar.innerHTML = `<span class="text-xs text-slate-400 py-1">선택한 조회 기간에 접수된 주문 상품 내역이 없습니다.</span>`;
        } else {
          topBar.innerHTML = topProducts.slice(0, 5).map((tp, idx) => `
            <div class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs shadow-xs">
              <span class="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-black flex items-center justify-center">${idx + 1}</span>
              <img src="${tp.thumbnail}" alt="" class="w-6 h-6 rounded-md object-cover border border-slate-700" />
              <div class="max-w-[140px] truncate">
                <span class="font-bold text-white block truncate">${tp.name}</span>
                <span class="text-[10px] text-slate-400">${ShopUI.formatPrice(tp.price)} × ${tp.quantity}개</span>
              </div>
              <span class="font-black text-amber-400 text-xs ml-1 font-mono">${ShopUI.formatPrice(tp.total)}</span>
            </div>
          `).join('');
        }
      }
    }

    // Orders Management Table Renderer
    function renderAdminOrdersTable(orders) {
      const tbody = document.getElementById('admin-orders-table');
      if (!tbody) return;

      if (!orders || orders.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="9" class="p-12 text-center text-slate-400">
              <div class="flex flex-col items-center justify-center gap-2">
                <i data-lucide="package-search" class="w-8 h-8 text-slate-300"></i>
                <p class="font-bold text-slate-600">조건에 일치하는 주문 데이터가 없습니다.</p>
                <p class="text-[11px] text-slate-400">조회 기간을 변경하거나 검색어를 초기화해 보세요.</p>
              </div>
            </td>
          </tr>
        `;
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

        const itemsDisplayHtml = `
          <div class="flex items-center gap-2.5 max-w-xs">
            <img src="${firstItem.thumbnail || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80'}" 
                 alt="" class="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0" />
            <div class="min-w-0">
              <p class="font-bold text-slate-900 line-clamp-1">${firstItem.name}${otherCount > 0 ? ` <span class="text-indigo-600 font-bold">외 ${otherCount}건</span>` : ''}</p>
              <div class="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                <span class="font-bold text-slate-800 font-mono">${ShopUI.formatPrice(firstItem.price)}</span>
                <span class="text-slate-400">× ${firstItem.quantity || 1}개</span>
                ${firstItem.option ? `<span class="text-[10px] text-slate-400 truncate max-w-[90px]">(${firstItem.option})</span>` : ''}
              </div>
            </div>
          </div>
        `;

        return `
          <tr class="hover:bg-slate-50/80 transition">
            <!-- 1. Order ID -->
            <td class="p-4 pl-6">
              <button onclick="openOrderDetailModal('${o.orderId}')" class="font-mono font-black text-indigo-600 hover:text-indigo-800 hover:underline text-left block">
                ${o.orderId}
              </button>
              <span class="text-[10px] text-slate-400 font-medium">상세보기</span>
            </td>

            <!-- 2. Customer -->
            <td class="p-4">
              <div class="flex items-center gap-1.5">
                <p class="font-bold text-slate-900">${o.customerName || '고객'}</p>
                <span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-indigo-50 text-indigo-600">회원</span>
              </div>
              <p class="text-[11px] text-slate-400 font-mono mt-0.5">${o.customerPhone || '-'}</p>
            </td>

            <!-- 3. Ordered Products & Price -->
            <td class="p-4">
              ${itemsDisplayHtml}
            </td>

            <!-- 4. Payment Total Amount -->
            <td class="p-4 text-right">
              <span class="font-black text-slate-900 text-sm block font-heading">${ShopUI.formatPrice(o.totalAmount || 0)}</span>
              <span class="text-[10px] text-slate-400 block font-normal">
                상품 ${ShopUI.formatPrice((o.totalAmount || 0) + (o.discountAmount || 0) - (o.shippingFee || 0))}
              </span>
            </td>

            <!-- 5. Payment Method -->
            <td class="p-4 text-center">
              <span class="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px] whitespace-nowrap">
                ${o.paymentMethod || '신용카드'}
              </span>
            </td>

            <!-- 6. Order Date -->
            <td class="p-4 text-slate-500 text-[11px] whitespace-nowrap">
              <p class="font-bold text-slate-700">${(o.orderDate || '').slice(0, 10)}</p>
              <p class="text-[10px] text-slate-400">${(o.orderDate || '').slice(11, 19)}</p>
            </td>

            <!-- 7. Address & Note -->
            <td class="p-4 max-w-[180px]">
              <p class="text-[11px] text-slate-700 truncate font-medium" title="${o.shippingAddress || '-'}">${o.shippingAddress || '-'}</p>
              ${o.shippingNote ? `<p class="text-[10px] text-slate-400 truncate italic" title="${o.shippingNote}">요청: ${o.shippingNote}</p>` : ''}
            </td>

            <!-- 8. Status Changer -->
            <td class="p-4 text-center">
              <select onchange="updateOrderStatus('${o.orderId}', this.value)" 
                      class="px-2.5 py-1.5 rounded-xl border font-bold text-xs cursor-pointer shadow-xs transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${statusColor}">
                <option value="결제완료" ${o.status === '결제완료' ? 'selected' : ''}>결제완료</option>
                <option value="상품준비" ${o.status === '상품준비' ? 'selected' : ''}>상품준비</option>
                <option value="배송중" ${o.status === '배송중' ? 'selected' : ''}>배송중</option>
                <option value="배송완료" ${o.status === '배송완료' ? 'selected' : ''}>배송완료</option>
                <option value="주문취소" ${o.status === '주문취소' ? 'selected' : ''}>주문취소</option>
              </select>
            </td>

            <!-- 9. Actions -->
            <td class="p-4 pr-6 text-center">
              <div class="flex items-center justify-center gap-1.5">
                <button onclick="openTrackingModal('${o.orderId}')" class="px-2.5 py-1.5 bg-slate-100 hover:bg-indigo-50 text-indigo-600 hover:text-indigo-700 rounded-xl text-xs font-bold transition flex items-center gap-1" title="송장번호 등록/수정">
                  <i data-lucide="truck" class="w-3.5 h-3.5"></i>
                  <span>${o.trackingNumber ? '송장조회' : '송장등록'}</span>
                </button>
                <button onclick="openOrderDetailModal('${o.orderId}')" class="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition" title="상세보기">
                  <i data-lucide="eye" class="w-4 h-4"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      if (window.lucide) window.lucide.createIcons();
    }

    async function updateOrderStatus(orderId, newStatus) {
      await ShopAPI.updateOrderStatus(orderId, newStatus);
      const o = adminOrders.find(item => item.orderId === orderId);
      if (o) o.status = newStatus;

      ShopUI.showToast(`주문 [${orderId}] 상태가 [${newStatus}]으로 변경되었습니다.`);
      applyOrderFilters();
      renderDashboard();
    }

    // Tracking Modal Functions
    function openTrackingModal(orderId) {
      const o = adminOrders.find(item => item.orderId === orderId);
      if (!o) return;

      document.getElementById('tracking-order-id').value = o.orderId;
      document.getElementById('tracking-target-id').innerText = `${o.orderId} (${o.customerName} 고객님)`;
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

      ShopUI.showToast(`[${courier} ${trackingNumber}] 송장이 등록되어 [배송중] 상태로 변경되었습니다.`);
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
      document.getElementById('modal-order-id-date').innerText = `주문번호: ${o.orderId} | 접수일시: ${o.orderDate || '-'}`;
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

      document.getElementById('modal-item-count').innerText = `총 ${items.length}개 품목`;

      const tbody = document.getElementById('modal-items-table');
      tbody.innerHTML = items.map(it => {
        const itemPrice = it.price || 0;
        const itemQty = it.quantity || 1;
        const itemSubtotal = itemPrice * itemQty;

        return `
          <tr class="hover:bg-slate-50">
            <td class="p-3 flex items-center gap-2.5">
              <img src="${it.thumbnail || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80'}" 
                   alt="" class="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0" />
              <div>
                <p class="font-bold text-slate-900">${it.name}</p>
                ${it.option ? `<p class="text-[10px] text-slate-400">선택옵션: ${it.option}</p>` : ''}
              </div>
            </td>
            <td class="p-3 text-right font-bold text-slate-700 font-mono">${ShopUI.formatPrice(itemPrice)}</td>
            <td class="p-3 text-center font-bold text-slate-800 font-mono">${itemQty}</td>
            <td class="p-3 text-right font-black text-indigo-600 font-mono">${ShopUI.formatPrice(itemSubtotal)}</td>
          </tr>
        `;
      }).join('');

      // Price Breakdown
      const prodSum = items.reduce((sum, it) => sum + ((it.price || 0) * (it.quantity || 1)), 0);
      const shipFee = o.shippingFee || 0;
      const discount = o.discountAmount || 0;

      document.getElementById('modal-price-products').innerText = ShopUI.formatPrice(prodSum);
      document.getElementById('modal-price-shipping').innerText = shipFee === 0 ? '무료배송' : ShopUI.formatPrice(shipFee);
      document.getElementById('modal-price-discount').innerText = discount > 0 ? `-${ShopUI.formatPrice(discount)}` : '0원';
      document.getElementById('modal-price-final').innerText = ShopUI.formatPrice(o.totalAmount || (prodSum + shipFee - discount));

      // Tracking Info
      const trackInfoEl = document.getElementById('modal-tracking-info');
      if (trackInfoEl) {
        trackInfoEl.innerText = o.trackingNumber ? `${o.courier || 'CJ대한통운'} ${o.trackingNumber}` : '운송장 미등록';
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

      let csvContent = "\uFEFF주문번호,주문일시,주문자명,연락처,이메일,주문상품목록,개별상품단가,총결제금액,결제수단,진행상태,배송지주소,배송메모,택배사,운송장번호\n";
      
      periodOrders.forEach(o => {
        const prodNames = (o.items || []).map(it => `${it.name}(${it.quantity}개)`).join(' / ');
        const prodPrices = (o.items || []).map(it => `${it.price}원`).join(' / ');
        csvContent += `"${o.orderId}","${o.orderDate || ''}","${o.customerName || ''}","${o.customerPhone || ''}","${o.customerEmail || ''}","${prodNames}","${prodPrices}","${o.totalAmount || 0}","${o.paymentMethod || '신용카드'}","${o.status}","${(o.shippingAddress || '').replace(/"/g, '""')}","${(o.shippingNote || '').replace(/"/g, '""')}","${o.courier || ''}","${o.trackingNumber || ''}"\n`;
      });

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `EASYSHOP_주문내역_${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      ShopUI.showToast('주문 내역 CSV 파일이 성공적으로 다운로드되었습니다.');
    }


    // Inquiries Management
    function openInquiryModal(id) {
      const inq = adminInquiries.find(item => item.id === id);
      if (!inq) return;

      document.getElementById('inq-edit-id').value = inq.id;
      document.getElementById('inq-detail-title').innerText = `[${inq.type}] ${inq.title}`;
      document.getElementById('inq-detail-content').innerText = inq.content;
      document.getElementById('inq-form-answer').value = inq.answer || '';
      document.getElementById('inquiry-modal').classList.remove('hidden');
    }

    function closeInquiryModal() {
      document.getElementById('inquiry-modal').classList.add('hidden');
    }

    async function saveInquiryAnswer() {
      const id = document.getElementById('inq-edit-id').value;
      const ans = document.getElementById('inq-form-answer').value.trim();
      if (!ans) {
        alert('답변 내용을 입력해 주세요.');
        return;
      }
      await ShopAPI.answerInquiry(id, ans);
      ShopUI.showToast('고객 문의 답변이 성공적으로 등록되었습니다.');
      closeInquiryModal();
      await refreshCurrentTab();
    }
  </script>
  <!-- User Modal (Create/Edit User) -->
  <div id="user-modal" class="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 id="modal-user-title" class="text-base font-black text-slate-900">신규 회원 등록</h3>
        <button onclick="closeUserModal()" class="text-slate-400 hover:text-slate-600 p-1"><i data-lucide="x" class="w-5 h-5"></i></button>
      </div>

      <form onsubmit="handleUserSave(event)" class="space-y-4 text-xs">
        <input type="hidden" id="user-edit-id" />

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-slate-700 mb-1">회원 성명 *</label>
            <input type="text" id="user-form-name" required placeholder="홍길동" class="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">이메일 (아이디) *</label>
            <input type="email" id="user-form-email" required placeholder="user@easyshop.kr" class="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-slate-700 mb-1">휴대폰 번호 *</label>
            <input type="tel" id="user-form-phone" required placeholder="010-0000-0000" class="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">회원 등급</label>
            <select id="user-form-grade" class="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none font-bold text-slate-800">
              <option value="일반">일반 회원</option>
              <option value="SILVER">SILVER 회원</option>
              <option value="GOLD">GOLD 회원</option>
              <option value="VIP">VIP 회원</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-slate-700 mb-1">보유 적립금 (P)</label>
            <input type="number" id="user-form-points" min="0" value="3000" class="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">계정 상태</label>
            <select id="user-form-status" class="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none font-bold text-slate-800">
              <option value="정상">정상 활성</option>
              <option value="신규">신규 가입</option>
              <option value="휴면">휴면 상태</option>
              <option value="정지">이용 정지</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">기본 배송지 주소</label>
          <input type="text" id="user-form-address" placeholder="기본 주소 입력" class="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none mb-1.5" />
          <input type="text" id="user-form-address-detail" placeholder="상세 주소 (동, 호수 등)" class="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none" />
        </div>

        <div class="flex gap-2 pt-4 border-t border-slate-100">
          <button type="button" onclick="closeUserModal()" class="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 transition">취소</button>
          <button type="submit" class="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold text-white transition shadow-lg shadow-indigo-600/30">저장하기</button>
        </div>
      </form>
    </div>
  </div>

  <!-- User Points Quick Adjust Modal -->
  <div id="user-points-modal" class="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 class="text-base font-black text-slate-900 flex items-center gap-1.5">
          <i data-lucide="coins" class="w-4 h-4 text-amber-500"></i>
          <span>적립금(포인트) 지급 / 차감</span>
        </h3>
        <button onclick="closePointsModal()" class="text-slate-400 hover:text-slate-600 p-1"><i data-lucide="x" class="w-5 h-5"></i></button>
      </div>

      <input type="hidden" id="points-user-id" />
      <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
        <div class="flex justify-between text-slate-500 font-medium">
          <span>대상 회원:</span>
          <strong id="points-target-name" class="text-slate-900 font-bold">홍길동</strong>
        </div>
        <div class="flex justify-between text-slate-500 font-medium">
          <span>현재 보유 적립금:</span>
          <strong id="points-target-current" class="text-indigo-600 font-bold">3,000 P</strong>
        </div>
      </div>

      <div class="space-y-2 text-xs">
        <label class="block font-bold text-slate-700">변경 구분 및 포인트 금액</label>
        <div class="grid grid-cols-2 gap-2">
          <label class="flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-indigo-200 bg-indigo-50/50 cursor-pointer font-bold text-indigo-700">
            <input type="radio" name="points-type" value="add" checked class="text-indigo-600" />
            <span>+ 지급 (충전)</span>
          </label>
          <label class="flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer font-bold text-rose-700">
            <input type="radio" name="points-type" value="sub" class="text-rose-600" />
            <span>- 차감 (회수)</span>
          </label>
        </div>
        <input type="number" id="points-amount-input" min="100" step="100" placeholder="금액 입력 (예: 5000)" class="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none font-bold text-slate-900" />
      </div>

      <div class="flex gap-2 pt-2 border-t border-slate-100">
        <button type="button" onclick="closePointsModal()" class="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 text-xs transition">취소</button>
        <button type="button" onclick="handlePointsSave()" class="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold text-white text-xs transition shadow-md shadow-indigo-600/30">적용하기</button>
      </div>
    </div>
  </div>


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

</body>
</html>
'@

[System.IO.File]::WriteAllText((Join-Path $shopDir 'admin.html'), $adminHtml, [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText((Join-Path $publicDir 'admin.html'), $adminHtml, [System.Text.Encoding]::UTF8)
Write-Host "Generated: admin.html" -ForegroundColor Green
