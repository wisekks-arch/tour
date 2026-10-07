const fs = require('fs');
const path = require('path');

const tourDir = 'd:/92.SW/tour';
const shopDir = 'd:/92.SW/shop';
const publicDir = path.join(shopDir, 'public');

// 1. Update auth-store.js with updateProfile method
let authStoreCode = fs.readFileSync(path.join(shopDir, 'js', 'auth-store.js'), 'utf8');

const updateProfileMethod = `
  /**
   * Update Profile & Password
   */
  updateProfile(data) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: '로그인이 필요한 서비스입니다.' };
    }

    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id || u.email.toLowerCase() === currentUser.email.toLowerCase());
    if (userIndex === -1) {
      return { success: false, message: '회원 정보를 찾을 수 없습니다.' };
    }

    const targetUser = users[userIndex];

    const name = (data.name || '').trim();
    const phone = (data.phone || '').trim();
    const address = (data.address || '').trim();
    const addressDetail = (data.addressDetail || '').trim();

    if (!name) return { success: false, message: '성명을 입력해 주세요.' };
    if (!phone) return { success: false, message: '휴대폰 번호를 입력해 주세요.' };
    if (!address) return { success: false, message: '주소를 입력해 주세요.' };

    // If changing password
    if (data.newPassword) {
      if (!data.currentPassword) {
        return { success: false, message: '비밀번호를 변경하려면 현재 비밀번호를 입력해 주세요.' };
      }
      if (targetUser.password !== data.currentPassword) {
        return { success: false, message: '현재 비밀번호가 일치하지 않습니다.' };
      }
      const pwVal = this.validatePassword(data.newPassword);
      if (!pwVal.valid) {
        return { success: false, message: pwVal.message };
      }
      if (data.newPassword !== data.confirmNewPassword) {
        return { success: false, message: '새 비밀번호 확인이 일치하지 않습니다.' };
      }
      targetUser.password = data.newPassword;
    }

    // Update fields
    targetUser.name = name;
    targetUser.phone = phone;
    targetUser.address = address;
    targetUser.addressDetail = addressDetail;
    if (data.points !== undefined) targetUser.points = data.points;

    users[userIndex] = targetUser;
    this.saveUsers(users);

    // Update Session
    const updatedSession = {
      ...currentUser,
      name: targetUser.name,
      phone: targetUser.phone,
      address: targetUser.address,
      addressDetail: targetUser.addressDetail,
      points: targetUser.points || 0
    };
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(updatedSession));
    this.notify();

    return {
      success: true,
      user: updatedSession,
      message: '회원 정보가 성공적으로 수정되었습니다.'
    };
  }
};
`;

if (!authStoreCode.includes('updateProfile(')) {
  authStoreCode = authStoreCode.replace(/\n\s*};\s*$/, updateProfileMethod);
  fs.writeFileSync(path.join(shopDir, 'js', 'auth-store.js'), authStoreCode, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'js', 'auth-store.js'), authStoreCode, 'utf8');
  console.log('Updated auth-store.js with updateProfile method.');
}

// 2. Update components.js with profile link
let componentsCode = fs.readFileSync(path.join(shopDir, 'js', 'components.js'), 'utf8');

// Replace topAuthHtml
const topAuthOld = `const topAuthHtml = currentUser ? \`
      <div class="flex items-center gap-2">
        <span class="text-emerald-300 font-bold flex items-center gap-1">
          <i data-lucide="user-check" class="w-3.5 h-3.5 text-emerald-400"></i>
          <span>\${currentUser.name} 님</span>
          <span class="text-[10px] bg-emerald-950/80 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">\${(currentUser.points || 0).toLocaleString()}P</span>
        </span>
        <span class="text-slate-600">|</span>
        <button type="button" onclick="ShopUI.handleLogout()" class="hover:text-rose-300 text-slate-300 transition flex items-center gap-1 cursor-pointer font-medium">
          <i data-lucide="log-out" class="w-3.5 h-3.5 text-rose-400"></i> 로그아웃
        </button>
      </div>
    \` :`;

const topAuthNew = `const topAuthHtml = currentUser ? \`
      <div class="flex items-center gap-2">
        <a href="profile.html" class="text-emerald-300 hover:text-emerald-200 font-bold flex items-center gap-1 transition" title="회원정보 관리">
          <i data-lucide="user-check" class="w-3.5 h-3.5 text-emerald-400"></i>
          <span>\${currentUser.name} 님</span>
          <span class="text-[10px] bg-emerald-950/80 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">\${(currentUser.points || 0).toLocaleString()}P</span>
        </a>
        <span class="text-slate-600">|</span>
        <a href="profile.html" class="text-indigo-300 hover:text-white transition flex items-center gap-1 text-[11px] font-medium">
          <i data-lucide="settings" class="w-3 h-3"></i> 정보수정
        </a>
        <span class="text-slate-600">|</span>
        <button type="button" onclick="ShopUI.handleLogout()" class="hover:text-rose-300 text-slate-300 transition flex items-center gap-1 cursor-pointer font-medium">
          <i data-lucide="log-out" class="w-3.5 h-3.5 text-rose-400"></i> 로그아웃
        </button>
      </div>
    \` :`;

if (componentsCode.includes('<span>\${currentUser.name} 님</span>') && !componentsCode.includes('href="profile.html"')) {
  componentsCode = componentsCode.replace(topAuthOld, topAuthNew);
  
  // Also update desktop auth
  const desktopOld = `<div class="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-bold text-indigo-900">\n          <i data-lucide="user" class="w-3.5 h-3.5 text-indigo-600"></i>\n          <span>\${currentUser.name} 님</span>\n        </div>`;
  const desktopNew = `<a href="profile.html" class="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-full text-xs font-bold text-indigo-900 transition" title="마이페이지/회원정보수정">\n          <i data-lucide="user" class="w-3.5 h-3.5 text-indigo-600"></i>\n          <span>\${currentUser.name} 님</span>\n        </a>`;
  componentsCode = componentsCode.replace(desktopOld, desktopNew);

  // Also update mobile auth
  const mobileOld = `<div class="p-3 bg-indigo-50/90 rounded-xl flex items-center justify-between border border-indigo-100 mb-2">\n        <div class="flex items-center gap-2.5">\n          <div class="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">\n            \${currentUser.name ? currentUser.name.slice(0, 1) : 'U'}\n          </div>\n          <div>\n            <p class="text-xs font-bold text-slate-900">\${currentUser.name} 님</p>\n            <p class="text-[10px] text-indigo-600 font-semibold">\${(currentUser.points || 0).toLocaleString()}P 보유</p>\n          </div>\n        </div>`;
  const mobileNew = `<div class="p-3 bg-indigo-50/90 rounded-xl flex items-center justify-between border border-indigo-100 mb-2">\n        <a href="profile.html" class="flex items-center gap-2.5 hover:opacity-80 transition">\n          <div class="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">\n            \${currentUser.name ? currentUser.name.slice(0, 1) : 'U'}\n          </div>\n          <div>\n            <p class="text-xs font-bold text-slate-900 flex items-center gap-1">\${currentUser.name} 님 <i data-lucide="chevron-right" class="w-3 h-3 text-slate-400"></i></p>\n            <p class="text-[10px] text-indigo-600 font-semibold">\${(currentUser.points || 0).toLocaleString()}P (정보수정)</p>\n          </div>\n        </a>`;
  componentsCode = componentsCode.replace(mobileOld, mobileNew);

  fs.writeFileSync(path.join(shopDir, 'js', 'components.js'), componentsCode, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'js', 'components.js'), componentsCode, 'utf8');
  console.log('Updated components.js with profile links.');
}

// 3. Create profile.html
const profileHtml = `<!DOCTYPE html>
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
`;

fs.writeFileSync(path.join(shopDir, 'profile.html'), profileHtml, 'utf8');
fs.writeFileSync(path.join(publicDir, 'profile.html'), profileHtml, 'utf8');
console.log('Saved profile.html in shop and public/profile.html');

console.log('Profile feature build script finished successfully!');
