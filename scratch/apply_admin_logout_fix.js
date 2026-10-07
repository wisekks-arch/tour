const fs = require('fs');
const path = require('path');

const tourDir = 'd:/92.SW/tour';
const shopDir = 'd:/92.SW/shop';
const publicDir = path.join(shopDir, 'public');

function updateAdminFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Upgrade Desktop Admin Logout Button UI
  const oldBtnRegex = /<button onclick="handleAdminLogout\(\)" title="로그아웃" class="p-2 text-rose-400[^"]*">[\s\S]*?<\/button>/;
  const newBtnHtml = `<button onclick="handleAdminLogout()" class="px-3.5 py-2 bg-rose-500/15 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 rounded-xl font-bold text-xs transition flex items-center gap-1.5 shadow-xs cursor-pointer" title="관리자 로그아웃">
            <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
            <span>로그아웃</span>
          </button>`;

  if (oldBtnRegex.test(html)) {
    html = html.replace(oldBtnRegex, newBtnHtml);
  }

  // 2. Add Mobile Logout Button in admin-mobile-nav if not present
  if (html.includes('id="admin-mobile-nav"') && !html.includes('id="nav-m-btn-logout"')) {
    const mobileInqBtn = `<button onclick="switchAdminTab('inquiries')" id="nav-m-btn-inquiries" class="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 font-bold flex items-center gap-1.5 text-xs shrink-0">
          <i data-lucide="message-square" class="w-3.5 h-3.5"></i>
          <span>고객 문의</span>
        </button>`;
    const mobileInqAndLogout = `${mobileInqBtn}
        <button onclick="handleAdminLogout()" id="nav-m-btn-logout" class="px-3 py-1.5 rounded-lg text-rose-400 hover:text-white hover:bg-rose-600/80 font-bold flex items-center gap-1.5 text-xs shrink-0 border border-rose-500/30">
          <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
          <span>로그아웃</span>
        </button>`;
    html = html.replace(mobileInqBtn, mobileInqAndLogout);
  }

  // 3. Add handleAdminLogout function definition
  const logoutFunc = `
    function handleAdminLogout() {
      if (confirm('관리자 세션을 종료하고 로그아웃하시겠습니까?')) {
        if (typeof AuthStore !== 'undefined') {
          AuthStore.logout();
        }
        try {
          localStorage.removeItem('easyshop_admin_session');
          localStorage.removeItem('easyshop_session_v3');
        } catch (e) {}
        alert('관리자 계정에서 안전하게 로그아웃되었습니다.');
        window.location.href = 'index.html';
      }
    }
`;

  if (!html.includes('function handleAdminLogout()')) {
    html = html.replace(/<script>\s*let adminProducts = \[\];/, `<script>${logoutFunc}\n    let adminProducts = [];`);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated admin logout feature in ${filePath}`);
}

updateAdminFile(path.join(shopDir, 'admin.html'));
if (fs.existsSync(path.join(publicDir, 'admin.html'))) {
  updateAdminFile(path.join(publicDir, 'admin.html'));
}

// 4. Update gen_admin_html.ps1
const adminHtmlContent = fs.readFileSync(path.join(shopDir, 'admin.html'), 'utf8');
const genAdminPath = path.join(tourDir, 'gen_admin_html.ps1');

const genAdminPs1 = `$ErrorActionPreference = 'Stop'
$shopDir = 'd:\\92.SW\\shop'
$publicDir = Join-Path $shopDir 'public'

$adminHtml = @'
${adminHtmlContent}
'@

[System.IO.File]::WriteAllText((Join-Path $shopDir 'admin.html'), $adminHtml, [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText((Join-Path $publicDir 'admin.html'), $adminHtml, [System.Text.Encoding]::UTF8)
Write-Host "Generated: admin.html" -ForegroundColor Green
`;

fs.writeFileSync(genAdminPath, genAdminPs1, 'utf8');
console.log('Updated gen_admin_html.ps1 with latest admin.html');
console.log('Admin logout fix completed successfully!');
