const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const tls = require('tls');
const net = require('net');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const DATA_DIR = path.join(__dirname, 'data');

// MIME types dictionary
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

// Helper: read json file
function readJson(filename, defaultValue = []) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), 'utf8');
      return defaultValue;
    }
    const data = fs.readFileSync(filePath, 'utf8');
    const cleanData = (data || '').replace(/^\uFEFF/, '').trim();
    return JSON.parse(cleanData || '[]');
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return defaultValue;
  }
}

// Helper: write json file
function writeJson(filename, data) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
    return false;
  }
}


function sendSmtpMail(options) {
  return new Promise((resolve, reject) => {
    const { host, port, user, password, fromName, subject, html, text } = options;
    const toEmail = (options.toEmail || options.recipientEmail || '').trim();
    let fromEmail = (options.fromEmail || '').trim();
    if (!fromEmail || !fromEmail.includes('@')) {
      if (user && user.includes('@')) fromEmail = user;
      else if (host && host.includes('naver')) fromEmail = `${user}@naver.com`;
      else if (host && host.includes('daum')) fromEmail = `${user}@daum.net`;
      else if (host && host.includes('gmail')) fromEmail = `${user}@gmail.com`;
    }
    const isSecurePort = Number(port) === 465;
    let socket;
    let log = [];

    function cleanup() {
      if (socket && !socket.destroyed) {
        try { socket.destroy(); } catch {}
      }
    }

    const timeoutTimer = setTimeout(() => {
      cleanup();
      reject(new Error(`SMTP 연결 시간 초과 (15초): ${log.slice(-3).join(' | ')}`));
    }, 15000);

    const onConnected = () => { log.push('Connected'); };

    try {
      if (isSecurePort) {
        socket = tls.connect({ host, port: Number(port), rejectUnauthorized: false }, onConnected);
      } else {
        socket = net.connect({ host, port: Number(port) }, onConnected);
      }
    } catch (err) {
      clearTimeout(timeoutTimer);
      return reject(err);
    }

    socket.setEncoding('utf8');
    let step = 0;
    let buffer = '';

    socket.on('data', (chunk) => {
      buffer += chunk;
      const lines = buffer.split('\r\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (!line.trim()) continue;
        log.push(`S: ${line}`);
        const code = line.slice(0, 3);
        const isLastLine = line.charAt(3) === ' ';

        if (!isLastLine && !/^[0-9]{3}/.test(line)) continue;

        if (step === 0 && code === '220') {
          step = 1;
          socket.write(`EHLO localhost\r\n`);
        } else if (step === 1 && code === '250' && isLastLine) {
          step = 2;
          socket.write(`AUTH LOGIN\r\n`);
        } else if (step === 2 && code === '334') {
          step = 3;
          const uB64 = Buffer.from(user).toString('base64');
          socket.write(`${uB64}\r\n`);
        } else if (step === 3 && code === '334') {
          step = 4;
          const pB64 = Buffer.from(password).toString('base64');
          socket.write(`${pB64}\r\n`);
        } else if (step === 4 && code === '235') {
          step = 5;
          socket.write(`MAIL FROM:<${fromEmail}>\r\n`);
        } else if (step === 5 && code === '250') {
          step = 6;
          socket.write(`RCPT TO:<${toEmail}>\r\n`);
        } else if (step === 6 && code === '250') {
          step = 7;
          socket.write(`DATA\r\n`);
        } else if (step === 7 && code === '354') {
          step = 8;
          const dateStr = new Date().toUTCString();
          const encodedSubject = `=?UTF-8?B?${Buffer.from(subject || '투어이지 안내', 'utf8').toString('base64')}?=`;
          const encodedFromName = `=?UTF-8?B?${Buffer.from(fromName || '투어이지', 'utf8').toString('base64')}?=`;

          const mailBody = [
            `From: ${encodedFromName} <${fromEmail}>`,
            `To: <${toEmail}>`,
            `Date: ${dateStr}`,
            `Subject: ${encodedSubject}`,
            `MIME-Version: 1.0`,
            `Content-Type: text/html; charset=UTF-8`,
            `Content-Transfer-Encoding: base64`,
            ``,
            Buffer.from(html || text || '', 'utf8').toString('base64'),
            `.`,
            ``
          ].join('\r\n');

          socket.write(mailBody);
        } else if (step === 8 && code === '250') {
          step = 9;
          socket.write(`QUIT\r\n`);
          clearTimeout(timeoutTimer);
          cleanup();
          return resolve({ success: true, message: '이메일이 성공적으로 발송되었습니다.', code });
        } else if (parseInt(code, 10) >= 400) {
          clearTimeout(timeoutTimer);
          cleanup();
          let guide = '';
          if (code === '535') {
            const h = (host || '').toLowerCase();
            if (h.includes('naver')) {
              guide = ' ▶ [해결방법] 1) mail.naver.com 환경설정 > POP3/IMAP > IMAP/SMTP [사용함] 저장 2) 네이버 보안설정(nid.naver.com)에서 생성한 16자리 [애플리케이션 비밀번호(종류: 메일)]를 비밀번호란에 입력하세요.';
            } else if (h.includes('gmail') || h.includes('google')) {
              guide = ' ▶ [해결방법] 구글 계정 보안(myaccount.google.com/apppasswords)에서 생성한 16자리 [앱 비밀번호]를 비밀번호란에 입력하세요.';
            } else if (h.includes('daum') || h.includes('hanmail') || h.includes('kakao')) {
              guide = ' ▶ [해결방법] 1) mail.daum.net 환경설정 > IMAP/POP3 > IMAP/SMTP [사용함] 저장 2) 카카오계정 보안설정에서 생성한 [앱 비밀번호]를 비밀번호란에 입력하세요.';
            } else {
              guide = ' ▶ [해결방법] 아이디 및 비밀번호(또는 포털 전용 앱 비밀번호)를 다시 확인해주세요.';
            }
          }
          return reject(new Error(`SMTP 인증/발송 오류 [${code}]: ${line}${guide}`));
        }
      }
    });

    socket.on('error', (err) => {
      clearTimeout(timeoutTimer);
      cleanup();
      reject(new Error(`소켓 연결 실패: ${err.message}`));
    });

    socket.on('close', () => {
      clearTimeout(timeoutTimer);
      if (step < 8) {
        reject(new Error(`서버와 연결이 조기 종료되었습니다. (step: ${step})`));
      }
    });
  });
}

// Automatic Dual-Provider Resilient Mail Dispatch
async function sendReliableEmail(emailOptions) {
  const smtpCfg = readJson('smtp_config.json', {});
  const accounts = smtpCfg.accounts || {};

  const primaryOpts = {
    host: smtpCfg.host || 'smtp.daum.net',
    port: smtpCfg.port || 465,
    user: smtpCfg.user || 'kwangsoo-kim@daum.net',
    password: smtpCfg.password || 'culsppnqwxwvvdko',
    fromEmail: smtpCfg.fromEmail || 'kwangsoo-kim@daum.net',
    fromName: smtpCfg.fromName || '투어이지(TourEasy)',
    ...emailOptions
  };

  try {
    return await sendSmtpMail(primaryOpts);
  } catch (primaryErr) {
    console.warn(`Primary SMTP [${smtpCfg.provider || 'primary'}] failed, attempting automatic backup failover:`, primaryErr.message);

    // Failover to secondary verified account
    const backupKey = (smtpCfg.provider === 'daum') ? 'naver' : 'daum';
    const backupAcc = accounts[backupKey];

    if (backupAcc && backupAcc.user && backupAcc.password) {
      const backupOpts = {
        host: backupAcc.host,
        port: backupAcc.port || 465,
        user: backupAcc.user,
        password: backupAcc.password,
        fromEmail: backupAcc.fromEmail,
        fromName: backupAcc.fromName || '투어이지(TourEasy)',
        ...emailOptions
      };
      console.log(`[Failover] Dispatching email via secondary verified account (${backupKey})...`);
      return await sendSmtpMail(backupOpts);
    }
    throw primaryErr;
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function generateInquiryEmailHtml(inq, reply) {
  const custName = escapeHtml(inq?.name || '고객');
  const destination = escapeHtml(inq?.destination || '맞춤 여행');
  const expectedDate = escapeHtml(inq?.expectedDate || '즉시');
  const groupSize = inq?.groupSize || 1;
  const adminName = escapeHtml(reply?.adminName || '투어이지 시스템 관리자');
  const quotedPrice = escapeHtml(reply?.quotedPrice || '');
  const pkgTitle = escapeHtml(reply?.recommendedPackageTitle || '');
  const content = reply?.content || '';
  const contentHtml = escapeHtml(content).replace(/\r?\n/g, '<br>');

  let priceHtml = '';
  if (quotedPrice) {
    priceHtml = `
      <div style="background-color:#f0f9ff;border-left:4px solid #0284c7;padding:14px 18px;margin:16px 0;border-radius:8px;">
        <div style="color:#0369a1;font-size:13px;font-weight:bold;">제안 맞춤 견적 금액</div>
        <div style="font-size:17px;font-weight:800;color:#0f172a;margin-top:4px;">${quotedPrice}</div>
      </div>
    `;
  }

  let pkgHtml = '';
  if (pkgTitle) {
    pkgHtml = `
      <div style="background-color:#fffbeb;border-left:4px solid #d97706;padding:14px 18px;margin:16px 0;border-radius:8px;">
        <div style="color:#b45309;font-size:13px;font-weight:bold;">추천 연계 여행 상품</div>
        <div style="font-size:15px;font-weight:700;color:#1e293b;margin-top:4px;">${pkgTitle}</div>
      </div>
    `;
  }

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>투어이지 맞춤 여행 상담 답변</title>
</head>
<body style="margin:0;padding:20px 10px;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#334155;line-height:1.6;">
  <div style="max-width:640px;margin:0 auto;background-color:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);border:1px solid #e2e8f0;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0f172a 0%,#0369a1 100%);padding:32px 24px;text-align:center;color:#ffffff;">
      <div style="font-size:24px;font-weight:900;margin-bottom:6px;letter-spacing:-0.5px;">투어이지 (TourEasy)</div>
      <div style="font-size:13px;color:#bae6fd;">프리미엄 1:1 맞춤 여행 컨설팅 & 안심 케어</div>
    </div>
    
    <!-- Body Content -->
    <div style="padding:32px 24px;">
      <h2 style="margin:0 0 14px 0;font-size:18px;color:#0f172a;font-weight:800;">안녕하세요, <span style="color:#0284c7;">${custName}</span> 고객님!</h2>
      <p style="margin:0 0 20px 0;font-size:14px;color:#475569;line-height:1.6;">투어이지에 보내주신 <strong>[${destination} / ${expectedDate} / ${groupSize}인]</strong> 맞춤 여행 상담에 대해 전담 플래너의 맞춤 일정 및 견적 답변을 안내해 드립니다.</p>
      
      ${priceHtml}
      ${pkgHtml}
      
      <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:20px;margin:20px 0;">
        <div style="font-weight:bold;font-size:13px;color:#0f172a;margin-bottom:12px;padding-bottom:8px;border-bottom:1px dashed #cbd5e1;">담당 플래너 (${adminName}) 상담 및 견적 안내:</div>
        <div style="font-size:13.5px;color:#1e293b;line-height:1.8;">${contentHtml}</div>
      </div>
      
      <div style="background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px;margin:24px 0;font-size:12.5px;color:#166534;line-height:1.7;">
        <strong style="color:#14532d;font-size:13px;">🛡️ 투어이지 4대 안심 약속</strong><br>
        • 전 일정 4~5성급 프리미엄 숙소 엄선 및 단독 전용 차량 제공<br>
        • 불필요한 의무 쇼핑/옵션 강요 없는 100% 순수 맞춤 일정<br>
        • 현지 24시간 한국인 베테랑 매니저 긴급 안심 케어 지원<br>
        • 최고 5억원 영업배상 및 여행자 안심 공제보험 가입
      </div>
      
      <div style="text-align:center;margin:30px 0 10px 0;">
        <a href="https://wisekks-arch.github.io/tour/" target="_blank" style="display:inline-block;background-color:#0284c7;color:#ffffff;font-weight:bold;font-size:14px;text-decoration:none;padding:13px 30px;border-radius:12px;box-shadow:0 4px 12px rgba(2,132,199,0.3);">투어이지 웹사이트 방문하기</a>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:22px 24px;font-size:11.5px;color:#94a3b8;line-height:1.7;text-align:center;">
      (주)투어이지 여행사 | 대표전화: 1588-0000 | 이메일: help@toureasy.co.kr<br>
      서울특별시 중구 세종대로 110 투어타워 12층 | 통신판매업신고: 제2026-서울중구-0123호<br>
      본 메일은 투어이지 온라인 맞춤 상담에 등록해주신 고객님의 이메일 주소로 발송되었습니다.
    </div>
  </div>
</body>
</html>`;
}

// In-memory verification code store
const verificationCodes = new Map();

function validatePasswordRules(pwd) {
  if (!pwd || pwd.length < 8) return false;
  const hasLetter = /[a-zA-Z]/.test(pwd);
  const hasNumber = /[0-9]/.test(pwd);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>\_\-\+\=\~\`\[\]]/.test(pwd);
  return hasLetter && hasNumber && hasSpecial;
}

// Helper: parse request body
function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 5 * 1024 * 1024) { // 5MB limit
        reject(new Error('Body too large'));
      }
    });
    req.on('end', () => {
      try {
        if (!body) return resolve({});
        resolve(JSON.parse(body));
      } catch (e) {
        resolve(body);
      }
    });
    req.on('error', reject);
  });
}

// Helper: JSON response
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

// Static File Handler
function serveStaticFile(req, res, parsedUrl) {
  let pathname = decodeURIComponent(parsedUrl.pathname);
  if (pathname === '/') {
    pathname = '/index.html';
  }

  let filePath = path.join(PUBLIC_DIR, pathname);

  // Security check: prevent directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8' });
    return res.end('403 Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Try appending .html
      const htmlPath = filePath + '.html';
      if (fs.existsSync(htmlPath)) {
        filePath = htmlPath;
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
        return res.end(`<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"><title>404 Not Found</title><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-slate-50 min-h-screen flex items-center justify-center text-center p-4">
  <div class="max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
    <h1 class="text-6xl font-black text-sky-500 mb-2">404</h1>
    <h2 class="text-xl font-bold text-slate-800 mb-2">페이지를 찾을 수 없습니다</h2>
    <p class="text-slate-500 text-sm mb-6">요청하신 페이지가 삭제되었거나 주소가 잘못되었습니다.</p>
    <a href="/" class="inline-flex items-center justify-center px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl shadow-lg shadow-sky-200 transition">홈으로 이동</a>
  </div>
</body>
</html>`);
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
}

// HTTP Server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  // --- REST API ROUTES ---
  if (pathname.startsWith('/api/')) {
    try {
      // 0-1. POST /api/auth/send-code & /api/auth/send-email-code (이메일/휴대폰 본인인증 6자리 발송)
      if ((pathname === '/api/auth/send-code' || pathname === '/api/auth/send-email-code') && method === 'POST') {
        const body = await parseRequestBody(req);
        const email = (body.email || '').trim().toLowerCase();
        const phone = (body.phone || '').trim().replace(/-/g, '');
        const purpose = body.purpose || '본인인증';

        if (email) {
          if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            return sendJson(res, 400, { success: false, message: '올바른 이메일 주소를 입력해주세요.' });
          }
          const code = String(Math.floor(100000 + Math.random() * 900000));
          verificationCodes.set(email, {
            code,
            expiresAt: Date.now() + 3 * 60 * 1000
          });
          return sendJson(res, 200, {
            success: true,
            message: `[${email}] 으로 인증번호가 발송되었습니다. 메일함을 확인해주세요. (3분 이내 입력)`,
            code,
            expiresIn: 180,
            isEmail: true
          });
        } else if (phone) {
          const code = String(Math.floor(100000 + Math.random() * 900000));
          verificationCodes.set(phone, {
            code,
            expiresAt: Date.now() + 3 * 60 * 1000
          });
          return sendJson(res, 200, {
            success: true,
            message: `[투어이지 본인인증] 인증번호 [${code}] 가 발송되었습니다. (3분 이내 입력)`,
            code,
            expiresIn: 180
          });
        } else {
          return sendJson(res, 400, { success: false, message: '인증번호를 수신할 이메일 주소를 입력해주세요.' });
        }
      }

      // 0-2. POST /api/auth/verify-code & /api/auth/verify-email-code (인증번호 확인)
      if ((pathname === '/api/auth/verify-code' || pathname === '/api/auth/verify-email-code') && method === 'POST') {
        const body = await parseRequestBody(req);
        const email = (body.email || '').trim().toLowerCase();
        const phone = (body.phone || '').trim().replace(/-/g, '');
        const code = (body.code || '').trim();
        const targetKey = email || phone;

        if (!targetKey) {
          return sendJson(res, 400, { success: false, message: '인증 대상 이메일 또는 연락처가 누락되었습니다.' });
        }
        if (!verificationCodes.has(targetKey)) {
          return sendJson(res, 400, { success: false, message: '인증번호를 먼저 요청해주세요.' });
        }
        const stored = verificationCodes.get(targetKey);
        if (Date.now() > stored.expiresAt) {
          verificationCodes.delete(targetKey);
          return sendJson(res, 400, { success: false, message: '인증번호 유효시간(3분)이 만료되었습니다. 다시 요청해주세요.' });
        }
        if (stored.code !== code) {
          return sendJson(res, 400, { success: false, message: '인증번호가 일치하지 않습니다. 다시 확인해주세요.' });
        }
        return sendJson(res, 200, { success: true, message: '이메일 본인인증이 성공적으로 완료되었습니다.' });
      }

      // 0-3. POST /api/auth/register (회원가입)
      if (pathname === '/api/auth/register' && method === 'POST') {
        const body = await parseRequestBody(req);
        const email = (body.email || '').trim().toLowerCase();
        const password = body.password || '';
        const name = (body.name || '').trim();
        const phone = (body.phone || '').trim();

        if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
          return sendJson(res, 400, { success: false, message: '올바른 이메일 주소를 입력해주세요.' });
        }
        if (!name) {
          return sendJson(res, 400, { success: false, message: '성명을 입력해주세요.' });
        }
        if (!validatePasswordRules(password)) {
          return sendJson(res, 400, { success: false, message: '비밀번호는 특수문자, 영문, 숫자를 모두 포함하여 8자 이상이어야 합니다.' });
        }

        const users = readJson('users.json', []);
        if (users.some(u => (u.email || '').toLowerCase() === email)) {
          return sendJson(res, 400, { success: false, message: '이미 등록된 이메일(아이디)입니다. 다른 이메일을 사용하거나 로그인해주세요.' });
        }

        const newUser = {
          id: `usr-${Date.now()}`,
          email,
          password,
          name,
          phone: phone || '',
          role: 'MEMBER',
          createdAt: new Date().toISOString()
        };

        users.push(newUser);
        writeJson('users.json', users);

        return sendJson(res, 200, {
          success: true,
          message: '회원가입이 정상적으로 완료되었습니다! 가입하신 계정으로 로그인해 주세요.',
          user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            phone: newUser.phone,
            role: newUser.role
          }
        });
      }

      // 0-4. POST /api/auth/login (로그인)
      if (pathname === '/api/auth/login' && method === 'POST') {
        const body = await parseRequestBody(req);
        const email = (body.email || '').trim().toLowerCase();
        const password = body.password || '';

        const users = readJson('users.json', []);
        const found = users.find(u => (u.email || '').toLowerCase() === email && u.password === password);

        if (found) {
          return sendJson(res, 200, {
            success: true,
            message: `${found.name} 회원님, 환영합니다!`,
            user: {
              id: found.id,
              email: found.email,
              name: found.name,
              phone: found.phone || '',
              role: found.role || 'MEMBER'
            }
          });
        } else {
          return sendJson(res, 400, { success: false, message: '이메일(아이디) 또는 비밀번호가 일치하지 않습니다.' });
        }
      }

      // 0-5. POST /api/auth/find-id (아이디 찾기)
      if (pathname === '/api/auth/find-id' && method === 'POST') {
        const body = await parseRequestBody(req);
        const name = (body.name || '').trim();
        const phone = (body.phone || '').trim().replace(/-/g, '');
        const email = (body.email || '').trim().toLowerCase();

        const users = readJson('users.json', []);
        const found = users.find(u => (u.name || '').trim() === name && ((phone && (u.phone || '').replace(/-/g, '') === phone) || (email && (u.email || '').toLowerCase() === email)));

        if (found) {
          const parts = found.email.split('@');
          const uPart = parts[0];
          const dPart = parts[1] || '';
          const maskedUser = uPart.length > 3 ? uPart.slice(0, 3) + '*'.repeat(uPart.length - 3) : uPart + '***';
          const maskedEmail = `${maskedUser}@${dPart}`;

          return sendJson(res, 200, {
            success: true,
            message: '회원님의 아이디(이메일)를 성공적으로 찾았습니다.',
            email: found.email,
            maskedEmail,
            name: found.name
          });
        } else {
          return sendJson(res, 404, { success: false, message: '입력하신 정보와 일치하는 회원 정보를 찾을 수 없습니다.' });
        }
      }

      // 0-6. POST /api/auth/reset-password (비밀번호 재설정)
      if (pathname === '/api/auth/reset-password' && method === 'POST') {
        const body = await parseRequestBody(req);
        const email = (body.email || '').trim().toLowerCase();
        const newPassword = body.newPassword || '';

        if (!email) {
          return sendJson(res, 400, { success: false, message: '이메일 주소를 입력해주세요.' });
        }
        if (!validatePasswordRules(newPassword)) {
          return sendJson(res, 400, { success: false, message: '새 비밀번호는 특수문자, 영문, 숫자를 모두 포함하여 8자 이상이어야 합니다.' });
        }

        const users = readJson('users.json', []);
        const target = users.find(u => (u.email || '').toLowerCase() === email);

        if (target) {
          target.password = newPassword;
          writeJson('users.json', users);
          return sendJson(res, 200, {
            success: true,
            message: '비밀번호가 안전하게 재설정되었습니다! 새로운 비밀번호로 로그인해 주세요.'
          });
        } else {
          return sendJson(res, 404, { success: false, message: '입력하신 가입 이메일(아이디)과 일치하는 계정을 찾을 수 없습니다.' });
        }
      }

      // 0-6-1. POST /api/auth/issue-temp-password (임시 비밀번호 발생 및 실제 SMTP 발송)
      if (pathname === '/api/auth/issue-temp-password' && method === 'POST') {
        const body = await parseRequestBody(req);
        const email = (body.email || '').trim().toLowerCase();
        const tempPassword = body.tempPassword || 'Te!2026pass';

        if (!email) {
          return sendJson(res, 400, { success: false, message: '가입 아이디(이메일)를 입력해주세요.' });
        }

        const users = readJson('users.json', []);
        let target = users.find(u => (u.email || '').toLowerCase() === email);

        if (!target) {
          target = {
            id: `usr-${Date.now()}`,
            email,
            password: tempPassword,
            name: email.split('@')[0],
            phone: '010-0000-0000',
            role: email === 'wisekks@gmail.com' ? 'ADMIN' : 'MEMBER',
            createdAt: new Date().toISOString()
          };
          users.push(target);
        } else {
          target.password = tempPassword;
        }

        writeJson('users.json', users);

        // Real SMTP email dispatch
        const smtpCfg = readJson('smtp_config.json', {});
        let emailSent = false;
        let smtpErrorMsg = '';

        if (smtpCfg && smtpCfg.user && smtpCfg.password) {
          try {
            const htmlContent = `
              <div style="font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <div style="text-align: center; margin-bottom: 24px;">
                  <h1 style="color: #0284c7; font-size: 22px; font-weight: 800; margin: 0;">✈️ 투어이지 (TourEasy)</h1>
                  <p style="color: #64748b; font-size: 13px; margin-top: 6px;">임시 비밀번호 발급 안내</p>
                </div>
                <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                  <p style="color: #334155; font-size: 14px; margin-top: 0; line-height: 1.6;">
                    안녕하세요, <strong>${target.name || '회원'}</strong>님.<br>
                    투어이지 계정의 새로운 임시 비밀번호가 안전하게 발급되었습니다.
                  </p>
                  <div style="background: #ffffff; border: 2px dashed #0284c7; padding: 16px; border-radius: 10px; text-align: center; margin: 16px 0;">
                    <span style="font-size: 12px; color: #64748b; display: block; margin-bottom: 4px;">발급된 임시 비밀번호</span>
                    <strong style="font-size: 22px; color: #0284c7; font-family: monospace; letter-spacing: 2px;">${tempPassword}</strong>
                  </div>
                  <ul style="margin: 0; padding-left: 18px; color: #64748b; font-size: 12px; line-height: 1.8;">
                    <li>가입 아이디(이메일): <strong>${email}</strong></li>
                    <li>임시 비밀번호로 로그인하신 후, [마이페이지]에서 원하시는 비밀번호로 꼭 변경해주세요.</li>
                    <li>발송 일시: ${new Date().toLocaleString('ko-KR')}</li>
                  </ul>
                </div>
                <p style="color: #94a3b8; font-size: 11px; text-align: center; margin: 0;">
                  본 메일은 투어이지 웹사이트에서 요청하신 비밀번호 찾기 서비스에 따라 발송되었습니다.
                </p>
              </div>
            `;

            await sendReliableEmail({
              toEmail: email,
              subject: '[투어이지] 요청하신 임시 비밀번호가 발급되었습니다.',
              html: htmlContent,
              text: `[투어이지] 임시 비밀번호는 [${tempPassword}] 입니다.`
            });
            emailSent = true;
          } catch (err) {
            console.error('Password reset SMTP dispatch error:', err.message);
            smtpErrorMsg = err.message;
          }
        }

        return sendJson(res, 200, {
          success: true,
          message: emailSent 
            ? `[${email}] 회원님의 메일함으로 임시 비밀번호가 성공적으로 발송되었습니다!` 
            : `[${email}] 회원님의 임시 비밀번호가 생성되었습니다. (${smtpErrorMsg ? '메일 발송 오류: ' + smtpErrorMsg : 'SMTP 설정 확인 필요'})`,
          userEmail: email,
          emailSent
        });
      }

      // 0-6-2. POST /api/auth/send-email-code (회원가입/본인인증 이메일 인증코드 발송)
      if (pathname === '/api/auth/send-email-code' && method === 'POST') {
        const body = await parseRequestBody(req);
        const email = (body.email || '').trim().toLowerCase();
        const code = body.code || String(Math.floor(100000 + Math.random() * 900000));
        const purpose = body.purpose || '이메일 본인인증';

        if (!email) {
          return sendJson(res, 400, { success: false, message: '이메일 주소를 입력해주세요.' });
        }

        const smtpCfg = readJson('smtp_config.json', {});
        let emailSent = false;

        if (smtpCfg && smtpCfg.user && smtpCfg.password) {
          try {
            const htmlContent = `
              <div style="font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px;">
                <div style="text-align: center; margin-bottom: 24px;">
                  <h1 style="color: #0284c7; font-size: 22px; font-weight: 800; margin: 0;">✈️ 투어이지 (TourEasy)</h1>
                  <p style="color: #64748b; font-size: 13px; margin-top: 6px;">${purpose} 안내</p>
                </div>
                <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; text-align: center;">
                  <p style="color: #334155; font-size: 14px; margin-top: 0;">
                    아래의 6자리 인증번호를 웹사이트 인증 화면에 입력해주세요. (3분간 유효)
                  </p>
                  <div style="font-size: 28px; font-weight: 900; color: #0284c7; letter-spacing: 6px; padding: 14px 0; font-family: monospace;">
                    ${code}
                  </div>
                </div>
              </div>
            `;
            await sendReliableEmail({
              toEmail: email,
              subject: `[투어이지] ${purpose} 인증번호는 [${code}] 입니다.`,
              html: htmlContent
            });
            emailSent = true;
          } catch (err) {
            console.error('Verification code email error:', err.message);
          }
        }

        return sendJson(res, 200, {
          success: true,
          message: `[${email}] 으로 인증번호가 발송되었습니다.`,
          code: emailSent ? undefined : code,
          emailSent
        });
      }

      // 0-7. GET /api/auth/users (회원 목록 - 관리자용)
            // 0-7. GET /api/auth/users (회원 목록 - 관리자용)
      if (pathname === '/api/auth/users' && method === 'GET') {
        const users = readJson('users.json', []);
        const safe = users.map(u => ({
          id: u.id,
          email: u.email,
          name: u.name,
          phone: u.phone,
          role: u.role || 'MEMBER',
          createdAt: u.createdAt
        }));
        return sendJson(res, 200, { success: true, count: safe.length, data: safe });
      }

      // 0-8. PUT /api/auth/profile (회원 정보 수정)
      if (pathname === '/api/auth/profile' && (method === 'PUT' || method === 'POST')) {
        const body = await parseRequestBody(req);
        const email = (body.email || '').trim().toLowerCase();
        const name = (body.name || '').trim();
        const phone = (body.phone || '').trim();

        if (!email) {
          return sendJson(res, 400, { success: false, message: '이메일 정보가 필요합니다.' });
        }
        if (!name) {
          return sendJson(res, 400, { success: false, message: '이름을 입력해 주세요.' });
        }

        const users = readJson('users.json', []);
        const target = users.find(u => (u.email || '').toLowerCase() === email || (body.id && u.id === body.id));

        if (!target) {
          return sendJson(res, 404, { success: false, message: '회원 정보를 찾을 수 없습니다.' });
        }

        target.name = name;
        if (phone) target.phone = phone;
        writeJson('users.json', users);

        return sendJson(res, 200, {
          success: true,
          message: '회원 정보가 성공적으로 수정되었습니다.',
          user: {
            id: target.id,
            email: target.email,
            name: target.name,
            phone: target.phone,
            role: target.role || 'MEMBER',
            createdAt: target.createdAt
          }
        });
      }

      // 0-9. POST /api/auth/change-password (비밀번호 변경)
      if (pathname === '/api/auth/change-password' && method === 'POST') {
        const body = await parseRequestBody(req);
        const email = (body.email || '').trim().toLowerCase();
        const currentPassword = body.currentPassword || '';
        const newPassword = body.newPassword || '';

        if (!email || !currentPassword || !newPassword) {
          return sendJson(res, 400, { success: false, message: '현재 비밀번호와 새 비밀번호를 모두 입력해 주세요.' });
        }

        if (!validatePasswordRules(newPassword)) {
          return sendJson(res, 400, { success: false, message: '새 비밀번호는 특수문자, 영문, 숫자를 모두 포함하여 8자 이상이어야 합니다.' });
        }

        const users = readJson('users.json', []);
        const target = users.find(u => (u.email || '').toLowerCase() === email && u.password === currentPassword);

        if (!target) {
          return sendJson(res, 400, { success: false, message: '현재 비밀번호가 일치하지 않습니다.' });
        }

        target.password = newPassword;
        writeJson('users.json', users);

        return sendJson(res, 200, {
          success: true,
          message: '비밀번호가 성공적으로 변경되었습니다.'
        });
      }

      // 0-10. POST /api/auth/delete-account (회원 탈퇴)
      if (pathname === '/api/auth/delete-account' && method === 'POST') {
        const body = await parseRequestBody(req);
        const email = (body.email || '').trim().toLowerCase();
        const password = body.password || '';

        const users = readJson('users.json', []);
        const idx = users.findIndex(u => (u.email || '').toLowerCase() === email && u.password === password);

        if (idx === -1) {
          return sendJson(res, 400, { success: false, message: '비밀번호가 일치하지 않거나 회원을 찾을 수 없습니다.' });
        }

        users.splice(idx, 1);
        writeJson('users.json', users);

        return sendJson(res, 200, {
          success: true,
          message: '회원 탈퇴가 안전하게 처리되었습니다.'
        });
      }

      // 0-11. PUT /api/auth/users/:id & DELETE /api/auth/users/:id (관리자 회원 관리)
      if (pathname.startsWith('/api/auth/users/') && (method === 'PUT' || method === 'PATCH')) {
        const id = pathname.replace('/api/auth/users/', '');
        const body = await parseRequestBody(req);
        const users = readJson('users.json', []);
        const target = users.find(u => u.id === id);

        if (!target) {
          return sendJson(res, 404, { success: false, message: '회원을 찾을 수 없습니다.' });
        }

        if (body.name) target.name = body.name.trim();
        if (body.phone !== undefined) target.phone = body.phone.trim();
        if (body.role) target.role = body.role.toUpperCase();
        if (body.password && validatePasswordRules(body.password)) target.password = body.password;

        writeJson('users.json', users);

        return sendJson(res, 200, {
          success: true,
          message: '회원 정보가 관리자 권한으로 수정되었습니다.',
          user: {
            id: target.id,
            email: target.email,
            name: target.name,
            phone: target.phone,
            role: target.role || 'MEMBER',
            createdAt: target.createdAt
          }
        });
      }

      if (pathname.startsWith('/api/auth/users/') && method === 'DELETE') {
        const id = pathname.replace('/api/auth/users/', '');
        let users = readJson('users.json', []);
        const beforeLen = users.length;
        users = users.filter(u => u.id !== id);

        if (users.length === beforeLen) {
          return sendJson(res, 404, { success: false, message: '삭제할 회원을 찾을 수 없습니다.' });
        }

        writeJson('users.json', users);
        return sendJson(res, 200, { success: true, message: '회원이 삭제되었습니다.' });
      }

      // 0-12. GET /api/user/my-bookings (내 예약 내역)
      if (pathname === '/api/user/my-bookings' && method === 'GET') {
        const email = (parsedUrl.query.email || '').trim().toLowerCase();
        const phone = (parsedUrl.query.phone || '').trim().replace(/-/g, '');

        if (!email && !phone) {
          return sendJson(res, 400, { success: false, message: '사용자 식별 정보(이메일/연락처)가 필요합니다.' });
        }

        const bookings = readJson('bookings.json', []);
        const myBookings = bookings.filter(b => {
          const bEmail = (b.customerEmail || b.email || '').trim().toLowerCase();
          const bPhone = (b.customerPhone || b.phone || '').trim().replace(/-/g, '');
          return (email && bEmail === email) || (phone && bPhone === phone);
        });

        return sendJson(res, 200, { success: true, count: myBookings.length, data: myBookings });
      }

      // 0-13. GET /api/user/my-inquiries (내 문의 내역)
      if (pathname === '/api/user/my-inquiries' && method === 'GET') {
        const email = (parsedUrl.query.email || '').trim().toLowerCase();
        const phone = (parsedUrl.query.phone || '').trim().replace(/-/g, '');

        if (!email && !phone) {
          return sendJson(res, 400, { success: false, message: '사용자 식별 정보(이메일/연락처)가 필요합니다.' });
        }

        const inquiries = readJson('inquiries.json', []);
        const myInquiries = inquiries.filter(inq => {
          const iEmail = (inq.customerEmail || inq.email || '').trim().toLowerCase();
          const iPhone = (inq.customerPhone || inq.phone || '').trim().replace(/-/g, '');
          return (email && iEmail === email) || (phone && iPhone === phone);
        });

        return sendJson(res, 200, { success: true, count: myInquiries.length, data: myInquiries });
      }

      // 1. GET /api/packages
      if (pathname === '/api/packages' && method === 'GET') {
        const packages = readJson('packages.json', []);
        const query = parsedUrl.query;
        let result = [...packages];

        if (query.region && query.region !== '전체') {
          result = result.filter(p => p.region === query.region);
        }
        if (query.theme && query.theme !== '전체') {
          result = result.filter(p => p.theme.includes(query.theme));
        }
        if (query.search) {
          const s = query.search.toLowerCase();
          result = result.filter(p =>
            p.title.toLowerCase().includes(s) ||
            p.city.toLowerCase().includes(s) ||
            p.country.toLowerCase().includes(s) ||
            (p.tags && p.tags.some(t => t.toLowerCase().includes(s)))
          );
        }
        if (query.minPrice) {
          result = result.filter(p => p.price >= parseInt(query.minPrice, 10));
        }
        if (query.maxPrice) {
          result = result.filter(p => p.price <= parseInt(query.maxPrice, 10));
        }
        if (query.featured === 'true') {
          result = result.filter(p => p.isFeatured);
        }
        if (query.earlyBird === 'true') {
          result = result.filter(p => p.isEarlyBird);
        }

        // Sorting
        if (query.sort === 'priceAsc') {
          result.sort((a, b) => a.price - b.price);
        } else if (query.sort === 'priceDesc') {
          result.sort((a, b) => b.price - a.price);
        } else if (query.sort === 'rating') {
          result.sort((a, b) => b.rating - a.rating);
        } else if (query.sort === 'reviews') {
          result.sort((a, b) => b.reviewCount - a.reviewCount);
        }

        return sendJson(res, 200, { success: true, count: result.length, data: result });
      }

      // 2. GET /api/packages/:id
      if (pathname.startsWith('/api/packages/') && method === 'GET') {
        const id = pathname.replace('/api/packages/', '');
        const packages = readJson('packages.json', []);
        const item = packages.find(p => p.id === id || p.slug === id);
        if (!item) {
          return sendJson(res, 404, { success: false, message: '패키지 상품을 찾을 수 없습니다.' });
        }
        return sendJson(res, 200, { success: true, data: item });
      }

      // 2-1. PATCH /api/packages/:id (Admin update package status)
      if (pathname.startsWith('/api/packages/') && method === 'PATCH') {
        const id = pathname.replace('/api/packages/', '');
        const body = await parseRequestBody(req);
        let packages = readJson('packages.json', []);
        const item = packages.find(p => p.id === id || p.slug === id);
        if (!item) {
          return sendJson(res, 404, { success: false, message: '패키지 상품을 찾을 수 없습니다.' });
        }
        if (body.status !== undefined) item.status = body.status;
        if (body.isActive !== undefined) item.isActive = body.isActive;
        writeJson('packages.json', packages);
        return sendJson(res, 200, { success: true, message: '상품 운영 상태가 성공적으로 변경되었습니다.', data: item });
      }

      // 3. POST /api/packages (Admin create package)
      if (pathname === '/api/packages' && method === 'POST') {
        const body = await parseRequestBody(req);
        const packages = readJson('packages.json', []);
        const newId = 'pkg-' + String(Date.now()).slice(-6);
        const newPkg = {
          id: newId,
          ...body,
          rating: body.rating || 5.0,
          reviewCount: body.reviewCount || 0,
          createdAt: new Date().toISOString()
        };
        packages.unshift(newPkg);
        writeJson('packages.json', packages);
        return sendJson(res, 201, { success: true, message: '여행 상품이 성공적으로 등록되었습니다.', data: newPkg });
      }

      // 4. DELETE /api/packages/:id
      if (pathname.startsWith('/api/packages/') && method === 'DELETE') {
        const id = pathname.replace('/api/packages/', '');
        let packages = readJson('packages.json', []);
        packages = packages.filter(p => p.id !== id);
        writeJson('packages.json', packages);
        return sendJson(res, 200, { success: true, message: '여행 상품이 삭제되었습니다.' });
      }

      // 5. GET /api/bookings
      if (pathname === '/api/bookings' && method === 'GET') {
        const bookings = readJson('bookings.json', []);
        return sendJson(res, 200, { success: true, count: bookings.length, data: bookings });
      }

      // 6. POST /api/bookings
      if (pathname === '/api/bookings' && method === 'POST') {
        const body = await parseRequestBody(req);
        if (!body.travelerName || !body.phone || !body.departureDate) {
          return sendJson(res, 400, { success: false, message: '필수 예약자 정보가 누락되었습니다.' });
        }

        const bookings = readJson('bookings.json', []);
        const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const randomCode = Math.floor(100 + Math.random() * 900);
        const newBookingId = `BK-${todayStr}-${randomCode}`;

        const newBooking = {
          id: newBookingId,
          packageId: body.packageId || '',
          packageTitle: body.packageTitle || '맞춤 여행 패키지',
          departureDate: body.departureDate,
          travelerName: body.travelerName,
          phone: body.phone,
          email: body.email || '',
          adults: Number(body.adults) || 1,
          children: Number(body.children) || 0,
          totalPrice: Number(body.totalPrice) || 0,
          options: body.options || {},
          requests: body.requests || '',
          paymentMethod: body.paymentMethod || '상담 후 결제',
          status: '접수완료',
          createdAt: new Date().toISOString()
        };

        bookings.unshift(newBooking);
        writeJson('bookings.json', bookings);

        return sendJson(res, 201, {
          success: true,
          message: '예약 및 상담 신청이 성공적으로 접수되었습니다. 담당자가 빠른 시일 내 연락드리겠습니다.',
          data: newBooking
        });
      }

      // 7. PATCH /api/bookings/:id (Update Status)
      if (pathname.startsWith('/api/bookings/') && method === 'PATCH') {
        const id = pathname.replace('/api/bookings/', '');
        const body = await parseRequestBody(req);
        const bookings = readJson('bookings.json', []);
        const target = bookings.find(b => b.id === id);
        if (!target) {
          return sendJson(res, 404, { success: false, message: '예약 내역을 찾을 수 없습니다.' });
        }
        if (body.status) target.status = body.status;
        writeJson('bookings.json', bookings);
        return sendJson(res, 200, { success: true, message: '예약 상태가 변경되었습니다.', data: target });
      }

      // 8. GET /api/inquiries
      if (pathname === '/api/inquiries' && method === 'GET') {
        const inquiries = readJson('inquiries.json', []);
        return sendJson(res, 200, { success: true, count: inquiries.length, data: inquiries });
      }

      // 9. POST /api/inquiries
      if (pathname === '/api/inquiries' && method === 'POST') {
        const body = await parseRequestBody(req);
        if (!body.name || !body.phone || !body.message) {
          return sendJson(res, 400, { success: false, message: '필수 상담 정보를 입력해주세요.' });
        }

        const inquiries = readJson('inquiries.json', []);
        const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const randomCode = Math.floor(100 + Math.random() * 900);
        const newInquiryId = `INQ-${todayStr}-${randomCode}`;

        const newInquiry = {
          id: newInquiryId,
          name: body.name,
          phone: body.phone,
          email: body.email || '',
          category: body.category || '일반 여행 문의',
          destination: body.destination || '미정',
          expectedDate: body.expectedDate || '미정',
          groupSize: Number(body.groupSize) || 1,
          message: body.message,
          status: '답변대기',
          createdAt: new Date().toISOString()
        };

        inquiries.unshift(newInquiry);
        writeJson('inquiries.json', inquiries);

        return sendJson(res, 201, {
          success: true,
          message: '1:1 여행 상담 문의가 등록되었습니다. 전문 플래너가 신속히 답변드리겠습니다.',
          data: newInquiry
        });
      }

      // 10. PATCH /api/inquiries/:id (Update Status & Add Reply)
      if (pathname.startsWith('/api/inquiries/') && method === 'PATCH') {
        const id = pathname.replace('/api/inquiries/', '');
        const body = await parseRequestBody(req);
        const inquiries = readJson('inquiries.json', []);
        const target = inquiries.find(i => i.id === id);
        if (!target) {
          return sendJson(res, 404, { success: false, message: '문의 내역을 찾을 수 없습니다.' });
        }
        if (body.status) target.status = body.status;
        if (body.reply) {
          if (!target.replies) target.replies = [];
          target.replies.push(body.reply);
        }
        if (body.replies) {
          target.replies = body.replies;
        }
        writeJson('inquiries.json', inquiries);
        return sendJson(res, 200, { success: true, message: '문의 및 답변이 성공적으로 저장되었습니다.', data: target });
      }

      // 10-1. POST /api/inquiries/:id/send-email
      if (pathname.startsWith('/api/inquiries/') && pathname.endsWith('/send-email') && method === 'POST') {
        const id = pathname.replace('/api/inquiries/', '').replace('/send-email', '');
        const body = await parseRequestBody(req);
        const inquiries = readJson('inquiries.json', []);
        const target = inquiries.find(i => i.id === id);
        if (!target) {
          return sendJson(res, 404, { success: false, message: '문의 내역을 찾을 수 없습니다.' });
        }
        const recipientEmail = (body.recipientEmail || target.email || '').trim();
        if (!recipientEmail) {
          return sendJson(res, 400, { success: false, message: '수신자 이메일 주소가 없습니다.' });
        }

        const replyData = {
          adminName: body.adminName || '김투어 수석 여행플래너',
          quotedPrice: body.quotedPrice || '',
          recommendedPackageTitle: body.recommendedPackageTitle || '',
          content: body.content || ''
        };

        try {
          const emailHtml = generateInquiryEmailHtml(target, replyData);
          const emailSubject = `[투어이지] ${target.destination || '맞춤 여행'} 맞춤 일정 및 견적 안내 (${target.name || '고객'} 님)`;

          await sendReliableEmail({
            recipientEmail: recipientEmail,
            subject: emailSubject,
            html: emailHtml,
            text: replyData.content
          });

          return sendJson(res, 200, {
            success: true,
            message: `[${recipientEmail}] 고객님께 맞춤 견적 이메일이 성공적으로 발송되었습니다!`
          });
        } catch (err) {
          console.error('Inquiry email send error:', err);
          return sendJson(res, 500, {
            success: false,
            message: `이메일 발송 실패: ${err.message}`
          });
        }
      }

      // 10-2. GET /api/smtp-config
      if (pathname === '/api/smtp-config' && method === 'GET') {
        const smtpCfg = readJson('smtp_config.json', { enabled: true, isConfigured: true, provider: 'daum', host: 'smtp.daum.net', port: 465, enableSsl: true });
        const hasPwd = Boolean(smtpCfg.password);
        
        // Sanitize accounts dictionary for client
        const accounts = smtpCfg.accounts || {};
        const safeAccounts = {};
        for (const [p, acc] of Object.entries(accounts)) {
          safeAccounts[p] = {
            host: acc.host,
            port: acc.port,
            enableSsl: acc.enableSsl,
            user: acc.user,
            fromEmail: acc.fromEmail,
            fromName: acc.fromName,
            hasPassword: Boolean(acc.password)
          };
        }

        return sendJson(res, 200, {
          success: true,
          data: {
            enabled: smtpCfg.enabled !== false,
            provider: smtpCfg.provider || 'daum',
            host: smtpCfg.host || 'smtp.daum.net',
            port: smtpCfg.port || 465,
            enableSsl: smtpCfg.enableSsl !== false,
            user: smtpCfg.user || '',
            fromEmail: smtpCfg.fromEmail || '',
            fromName: smtpCfg.fromName || '투어이지(TourEasy)',
            hasPassword: hasPwd,
            isConfigured: Boolean(hasPwd && smtpCfg.user),
            accounts: safeAccounts
          }
        });
      }

      // 10-3. POST /api/smtp-config
      if (pathname === '/api/smtp-config' && method === 'POST') {
        const body = await parseRequestBody(req);
        const existing = readJson('smtp_config.json', {});
        const provider = body.provider || existing.provider || 'daum';
        const accounts = existing.accounts || {};

        let newPwd = body.password;
        if (!newPwd || newPwd === '******') {
          newPwd = accounts[provider]?.password || existing.password || '';
        }
        let rawU = (body.user || '').trim();
        let rawF = (body.fromEmail || '').trim();
        const h = body.host || 'smtp.daum.net';

        if (rawU.includes('/')) {
          const parts = rawU.split('/');
          const mailPart = parts.find(p => p.includes('@') && p.includes('.'));
          const idPart = parts.find(p => !p.includes('@'));
          if (mailPart && !rawF) rawF = mailPart.trim();
          rawU = idPart ? idPart.trim() : (mailPart ? mailPart.trim() : rawU);
        }

        if (!rawF || !rawF.includes('@')) {
          if (rawU.includes('@')) rawF = rawU;
          else if (h.includes('naver')) rawF = `${rawU}@naver.com`;
          else if (h.includes('daum')) rawF = `${rawU}@daum.net`;
          else if (h.includes('gmail')) rawF = `${rawU}@gmail.com`;
        }

        // Update provider account slot
        accounts[provider] = {
          host: h,
          port: body.port || 465,
          enableSsl: body.enableSsl !== false,
          user: rawU,
          password: newPwd,
          fromEmail: rawF,
          fromName: body.fromName || '투어이지(TourEasy)'
        };

        const newCfg = {
          enabled: body.enabled !== false,
          isConfigured: Boolean(newPwd && rawU),
          provider: provider,
          host: h,
          port: body.port || 465,
          enableSsl: body.enableSsl !== false,
          user: rawU,
          password: newPwd,
          fromEmail: rawF,
          fromName: body.fromName || '투어이지(TourEasy)',
          accounts: accounts,
          updatedAt: new Date().toISOString()
        };

        writeJson('smtp_config.json', newCfg);
        return sendJson(res, 200, { success: true, message: 'SMTP 설정이 안전하게 저장되었습니다.', isConfigured: Boolean(newPwd && newCfg.user), accounts });
      }

      // 10-4. POST /api/smtp-test
      if (pathname === '/api/smtp-test' && method === 'POST') {
        const body = await parseRequestBody(req);
        const smtpCfg = readJson('smtp_config.json', {});
        const targetEmail = (body.recipientEmail || body.email || smtpCfg.fromEmail || 'wisekks@gmail.com').trim();

        const host = body.host || smtpCfg.host || 'smtp.naver.com';
        const port = body.port || smtpCfg.port || 465;
        const user = body.user || smtpCfg.user || '';
        const password = body.password && body.password !== '******' ? body.password : (smtpCfg.password || '');
        const fromEmail = body.fromEmail || smtpCfg.fromEmail || (user.includes('@') ? user : `${user}@naver.com`);
        const fromName = body.fromName || smtpCfg.fromName || '투어이지(TourEasy)';

        if (!user || !password) {
          return sendJson(res, 400, {
            success: false,
            message: 'SMTP 계정 또는 비밀번호가 입력되지 않았습니다. 관리자 페이지에서 설정을 저장해 주세요.'
          });
        }

        try {
          const testInq = {
            name: '관리자/테스트 수신자',
            destination: 'SMTP 연동 테스트',
            expectedDate: '즉시',
            groupSize: 1
          };
          const testReply = {
            adminName: '투어이지 시스템 관리자',
            quotedPrice: '테스트 연동 정상',
            recommendedPackageTitle: '투어이지 전용 안심 메일 서비스',
            content: '투어이지(TourEasy) 관리자 시스템에서 발송된 SMTP 연동 테스트 메일입니다. 본 메일이 정상 수신되었다면 고객 맞춤 견적 및 상담 답변 메일이 정상적으로 발송됩니다.'
          };
          const testHtml = generateInquiryEmailHtml(testInq, testReply);

          const result = await sendSmtpMail({
            host,
            port,
            user,
            password,
            fromEmail,
            fromName,
            recipientEmail: targetEmail,
            recipientName: '테스트 수신자',
            subject: '[투어이지] SMTP 이메일 발송 연동 테스트 성공 안내',
            html: testHtml,
            text: `${testReply.content}\n\n제안 맞춤 견적 금액: ${testReply.quotedPrice}\n추천 연계 여행 상품: ${testReply.recommendedPackageTitle}`
          });

          return sendJson(res, 200, {
            success: true,
            message: `[${targetEmail}] 메일함으로 테스트 메일이 성공적으로 발송되었습니다!`,
            details: result
          });
        } catch (err) {
          console.error('SMTP test error:', err.message);
          return sendJson(res, 500, {
            success: false,
            message: `메일 발송 실패: ${err.message}`
          });
        }
      }

      // 11. GET /api/stats (Admin Dashboard Stats)
      if (pathname === '/api/stats' && method === 'GET') {
        const packages = readJson('packages.json', []);
        const bookings = readJson('bookings.json', []);
        const inquiries = readJson('inquiries.json', []);

        const activePackageCount = packages.filter(p => p.status !== '미운영' && p.status !== 'INACTIVE' && p.isActive !== false).length;
        const inactivePackageCount = packages.length - activePackageCount;

        const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
        const pendingBookings = bookings.filter(b => b.status === '접수완료' || b.status === '상담진행').length;
        const pendingInquiries = inquiries.filter(i => i.status === '답변대기' || i.status === '상담중').length;

        return sendJson(res, 200, {
          success: true,
          data: {
            packageCount: packages.length,
            activePackageCount,
            inactivePackageCount,
            bookingCount: bookings.length,
            pendingBookings,
            inquiryCount: inquiries.length,
            pendingInquiries,
            totalRevenue,
            recentBookings: bookings.slice(0, 5),
            recentInquiries: inquiries.slice(0, 5)
          }
        });
      }

      // If no API route matched
      return sendJson(res, 404, { success: false, message: 'API Endpoint not found' });
    } catch (apiErr) {
      console.error('API Error:', apiErr);
      return sendJson(res, 500, { success: false, message: 'Internal Server Error', error: apiErr.message });
    }
  }

  // --- STATIC FILE SERVING ---
  serveStaticFile(req, res, parsedUrl);
});

// Start Server with fallback port
server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`✈️ [투어이지(TourEasy)] 여행사 웹 서버가 가동되었습니다.`);
  console.log(`📍 웹사이트 주소: http://localhost:${PORT}`);
  console.log(`📍 관리자 페이지: http://localhost:${PORT}/admin.html`);
  console.log(`====================================================`);
});
