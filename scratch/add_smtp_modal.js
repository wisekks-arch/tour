const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'admin.html'),
  path.join(__dirname, '..', 'public', 'admin.html')
];

const smtpModalHtml = `
  <!-- SMTP Configuration Modal -->
  <div id="modal-smtp" class="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm hidden flex items-center justify-center p-4 overflow-y-auto">
    <div class="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
      
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-slate-100 pb-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
            <i data-lucide="mail-cog" class="w-5 h-5"></i>
          </div>
          <div>
            <h3 class="text-base sm:text-lg font-black text-slate-900">이메일 발송 서버(SMTP) 설정</h3>
            <p class="text-xs text-slate-400">회원가입 인증번호, 임시 비밀번호, 예약 알림 메일 자동 발송</p>
          </div>
        </div>
        <button onclick="closeSmtpModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition cursor-pointer">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>

      <!-- Provider Quick Select Tabs -->
      <div class="space-y-1.5">
        <label class="block text-xs font-extrabold text-slate-700">발송 메일 서비스 선택 (원클릭 자동 설정)</label>
        <div class="grid grid-cols-3 gap-2">
          <button type="button" onclick="selectSmtpPreset('naver')" id="preset-btn-naver" class="p-3 rounded-2xl border-2 border-emerald-500 bg-emerald-50/60 text-emerald-900 font-bold text-xs flex flex-col items-center gap-1 transition cursor-pointer shadow-xs">
            <span class="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            <span>네이버 메일</span>
            <span class="text-[10px] text-emerald-700 font-mono">kmagick@naver.com</span>
          </button>
          <button type="button" onclick="selectSmtpPreset('daum')" id="preset-btn-daum" class="p-3 rounded-2xl border-2 border-slate-200 hover:border-amber-400 bg-white text-slate-700 font-bold text-xs flex flex-col items-center gap-1 transition cursor-pointer shadow-xs">
            <span class="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
            <span>다음 (Hanmail)</span>
            <span class="text-[10px] text-slate-500 font-mono">kwangsoo-kim</span>
          </button>
          <button type="button" onclick="selectSmtpPreset('gmail')" id="preset-btn-gmail" class="p-3 rounded-2xl border-2 border-slate-200 hover:border-rose-400 bg-white text-slate-700 font-bold text-xs flex flex-col items-center gap-1 transition cursor-pointer shadow-xs">
            <span class="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
            <span>구글 Gmail</span>
            <span class="text-[10px] text-slate-500 font-mono">wisekks@gmail.com</span>
          </button>
        </div>
      </div>

      <!-- SMTP Form -->
      <form id="form-smtp-config" onsubmit="event.preventDefault(); saveSmtpConfig();" class="space-y-4 text-xs">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block font-bold text-slate-700 mb-1">SMTP 호스트 (Host)</label>
            <input type="text" id="smtp-host" value="smtp.naver.com" required class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono focus:bg-white focus:ring-2 focus:ring-teal-500">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">포트 번호 (Port)</label>
            <input type="number" id="smtp-port" value="465" required class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono focus:bg-white focus:ring-2 focus:ring-teal-500">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">발신 계정 / 아이디</label>
            <input type="text" id="smtp-user" value="kmagick" required class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono focus:bg-white focus:ring-2 focus:ring-teal-500">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">비밀번호 / 앱 비밀번호</label>
            <input type="password" id="smtp-password" value="@wisesoo7337" required class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono focus:bg-white focus:ring-2 focus:ring-teal-500">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">발신자 이메일 (From Email)</label>
            <input type="email" id="smtp-from-email" value="kmagick@naver.com" required class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono focus:bg-white focus:ring-2 focus:ring-teal-500">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">발신자 표기명 (From Name)</label>
            <input type="text" id="smtp-from-name" value="투어이지(TourEasy)" required class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:ring-2 focus:ring-teal-500">
          </div>
        </div>

        <!-- Guide Notice -->
        <div id="smtp-provider-guide" class="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-[11px] leading-relaxed space-y-1">
          <div class="font-extrabold flex items-center gap-1.5 text-amber-800">
            <i data-lucide="info" class="w-3.5 h-3.5"></i> 포털 메일 발송 필수 사전 설정 안내
          </div>
          <p id="guide-naver-text">
            • <strong>네이버 메일</strong>: <a href="https://mail.naver.com" target="_blank" class="underline font-bold text-amber-950">mail.naver.com</a> 접속 ➔ 좌측 하단 환경설정 ➔ <strong>[POP3/IMAP 설정]</strong> ➔ [IMAP/SMTP 설정] 탭에서 <strong>[사용함]</strong>으로 체크 후 저장하셔야 발송됩니다. (2단계 인증 시 애플리케이션 비밀번호 필요)
          </p>
          <p id="guide-daum-text" class="hidden">
            • <strong>다음/한메일</strong>: <a href="https://mail.daum.net" target="_blank" class="underline font-bold text-amber-950">mail.daum.net</a> 접속 ➔ 환경설정 ➔ [IMAP/POP3] ➔ <strong>[IMAP/SMTP 사용]</strong> 체크 필요.
          </p>
          <p id="guide-gmail-text" class="hidden">
            • <strong>구글 Gmail</strong>: Google 계정 관리 ➔ 보안 ➔ 2단계 인증 활성화 ➔ <strong>[앱 비밀번호(16자리)]</strong>를 생성하여 비밀번호 칸에 입력하셔야 합니다.
          </p>
        </div>

        <!-- Test Email Dispatch Box -->
        <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
          <label class="block font-bold text-slate-700">실시간 발송 테스트</label>
          <div class="flex items-center gap-2">
            <input type="email" id="smtp-test-recipient" value="wisekks@gmail.com" placeholder="테스트 수신 이메일 주소" class="flex-1 p-2 bg-white border border-slate-200 rounded-xl text-slate-800 font-mono text-xs">
            <button type="button" onclick="sendTestSmtpMail()" id="btn-send-test-mail" class="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shrink-0">
              <i data-lucide="send" class="w-3.5 h-3.5"></i> 테스트 메일 전송
            </button>
          </div>
          <div id="smtp-test-status" class="hidden text-xs font-semibold p-2.5 rounded-xl"></div>
        </div>

        <!-- Modal Footer Actions -->
        <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button type="button" onclick="closeSmtpModal()" class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition cursor-pointer">
            닫기
          </button>
          <button type="submit" id="btn-save-smtp" class="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold shadow-sm transition flex items-center gap-1.5 cursor-pointer">
            <i data-lucide="check" class="w-4 h-4"></i> SMTP 설정 저장
          </button>
        </div>
      </form>

    </div>
  </div>
`;

const smtpJsCode = `
    // --- SMTP Settings Modal & Handlers ---
    const SMTP_PRESETS = {
      naver: {
        host: 'smtp.naver.com',
        port: 465,
        user: 'kmagick',
        password: '@wisesoo7337',
        fromEmail: 'kmagick@naver.com',
        fromName: '투어이지(TourEasy)'
      },
      daum: {
        host: 'smtp.daum.net',
        port: 465,
        user: 'kwangsoo-kim@hanmail.net',
        password: '@wisesoo7337',
        fromEmail: 'kwangsoo-kim@hanmail.net',
        fromName: '투어이지(TourEasy)'
      },
      gmail: {
        host: 'smtp.gmail.com',
        port: 465,
        user: 'wisekks@gmail.com',
        password: '@wisesoo7337',
        fromEmail: 'wisekks@gmail.com',
        fromName: '투어이지(TourEasy)'
      }
    };

    let currentSmtpProvider = 'naver';

    function openSmtpModal() {
      const modal = document.getElementById('modal-smtp');
      if (modal) modal.classList.remove('hidden');
      loadSmtpConfigFromServer();
      if (window.lucide) lucide.createIcons();
    }
    window.openSmtpModal = openSmtpModal;

    function closeSmtpModal() {
      const modal = document.getElementById('modal-smtp');
      if (modal) modal.classList.add('hidden');
    }
    window.closeSmtpModal = closeSmtpModal;

    function selectSmtpPreset(provider) {
      currentSmtpProvider = provider;
      ['naver', 'daum', 'gmail'].forEach(p => {
        const btn = document.getElementById(\`preset-btn-\${p}\`);
        if (!btn) return;
        if (p === provider) {
          btn.className = 'p-3 rounded-2xl border-2 border-emerald-500 bg-emerald-50/60 text-emerald-900 font-bold text-xs flex flex-col items-center gap-1 transition cursor-pointer shadow-xs';
        } else {
          btn.className = 'p-3 rounded-2xl border-2 border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-bold text-xs flex flex-col items-center gap-1 transition cursor-pointer shadow-xs';
        }
      });

      const preset = SMTP_PRESETS[provider];
      if (preset) {
        document.getElementById('smtp-host').value = preset.host;
        document.getElementById('smtp-port').value = preset.port;
        document.getElementById('smtp-user').value = preset.user;
        document.getElementById('smtp-password').value = preset.password;
        document.getElementById('smtp-from-email').value = preset.fromEmail;
        document.getElementById('smtp-from-name').value = preset.fromName;
      }

      const naverGuide = document.getElementById('guide-naver-text');
      const daumGuide = document.getElementById('guide-daum-text');
      const gmailGuide = document.getElementById('guide-gmail-text');
      if (naverGuide) naverGuide.className = provider === 'naver' ? '' : 'hidden';
      if (daumGuide) daumGuide.className = provider === 'daum' ? '' : 'hidden';
      if (gmailGuide) gmailGuide.className = provider === 'gmail' ? '' : 'hidden';
    }
    window.selectSmtpPreset = selectSmtpPreset;

    async function loadSmtpConfigFromServer() {
      try {
        const res = await fetch('/api/smtp-config');
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            const d = json.data;
            if (d.host) document.getElementById('smtp-host').value = d.host;
            if (d.port) document.getElementById('smtp-port').value = d.port;
            if (d.user) document.getElementById('smtp-user').value = d.user;
            if (d.fromEmail) document.getElementById('smtp-from-email').value = d.fromEmail;
            if (d.fromName) document.getElementById('smtp-from-name').value = d.fromName;
            if (d.provider) selectSmtpPreset(d.provider);
          }
        }
      } catch (e) {
        console.log('Standalone mode, using default SMTP preset');
      }
    }

    async function saveSmtpConfig() {
      const btn = document.getElementById('btn-save-smtp');
      const prevText = btn.innerHTML;
      btn.innerHTML = '저장 중...';
      btn.disabled = true;

      const payload = {
        enabled: true,
        provider: currentSmtpProvider,
        host: document.getElementById('smtp-host').value.trim(),
        port: Number(document.getElementById('smtp-port').value.trim()) || 465,
        user: document.getElementById('smtp-user').value.trim(),
        password: document.getElementById('smtp-password').value,
        fromEmail: document.getElementById('smtp-from-email').value.trim(),
        fromName: document.getElementById('smtp-from-name').value.trim()
      };

      try {
        localStorage.setItem('toureasy_smtp_config', JSON.stringify(payload));
        const res = await fetch('/api/smtp-config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const json = await res.json();
        alert(json.message || 'SMTP 설정이 안전하게 저장되었습니다.');
        const badge = document.getElementById('header-smtp-badge');
        if (badge) {
          badge.textContent = payload.provider.toUpperCase();
          badge.className = 'px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-bold';
        }
      } catch (e) {
        alert('SMTP 설정이 로컬 스토리지에 저장되었습니다.');
      } finally {
        btn.innerHTML = prevText;
        btn.disabled = false;
      }
    }
    window.saveSmtpConfig = saveSmtpConfig;

    async function sendTestSmtpMail() {
      const btn = document.getElementById('btn-send-test-mail');
      const statusBox = document.getElementById('smtp-test-status');
      const recipient = (document.getElementById('smtp-test-recipient').value || 'wisekks@gmail.com').trim();

      statusBox.classList.remove('hidden', 'bg-emerald-50', 'text-emerald-800', 'bg-rose-50', 'text-rose-800');
      statusBox.classList.add('bg-sky-50', 'text-sky-800');
      statusBox.textContent = \`[\${recipient}] 메일함으로 테스트 발송 중...\`;
      btn.disabled = true;

      const payload = {
        recipientEmail: recipient,
        host: document.getElementById('smtp-host').value.trim(),
        port: Number(document.getElementById('smtp-port').value.trim()) || 465,
        user: document.getElementById('smtp-user').value.trim(),
        password: document.getElementById('smtp-password').value,
        fromEmail: document.getElementById('smtp-from-email').value.trim(),
        fromName: document.getElementById('smtp-from-name').value.trim()
      };

      try {
        const res = await fetch('/api/smtp-test', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const json = await res.json();
        if (json.success) {
          statusBox.className = 'text-xs font-semibold p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200';
          statusBox.textContent = \`✅ \${json.message}\`;
        } else {
          statusBox.className = 'text-xs font-semibold p-2.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-200';
          statusBox.textContent = \`❌ \${json.message}\`;
        }
      } catch (e) {
        statusBox.className = 'text-xs font-semibold p-2.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200';
        statusBox.textContent = 'ℹ️ 정적 호스팅 환경입니다. 로컬 서버(server.js) 실행 시 실제 SMTP 소켓 전송이 동작합니다.';
      } finally {
        btn.disabled = false;
      }
    }
    window.sendTestSmtpMail = sendTestSmtpMail;
`;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Insert modal html before Global Footer
  if (!content.includes('id="modal-smtp"')) {
    content = content.replace('<!-- Global Footer -->', smtpModalHtml + '\n  <!-- Global Footer -->');
  }

  // Insert JS functions
  if (!content.includes('const SMTP_PRESETS =')) {
    content = content.replace('window.loadAllAdminData = loadAllAdminData;', 'window.loadAllAdminData = loadAllAdminData;\n' + smtpJsCode);
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Successfully added SMTP modal and logic to ${file}`);
});
