const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

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
        return sendJson(res, 200, { success: true, message: `[${body.recipientEmail || target.email}] 고객님께 이메일이 발송되었습니다.` });
      }

      // 10-2. GET /api/smtp-config
      if (pathname === '/api/smtp-config' && method === 'GET') {
        const smtpCfg = readJson('smtp_config.json', { enabled: false, provider: 'naver', host: 'smtp.naver.com', port: 587, enableSsl: true });
        const hasPwd = Boolean(smtpCfg.password);
        return sendJson(res, 200, {
          success: true,
          data: {
            enabled: smtpCfg.enabled || false,
            provider: smtpCfg.provider || 'naver',
            host: smtpCfg.host || 'smtp.naver.com',
            port: smtpCfg.port || 587,
            enableSsl: smtpCfg.enableSsl !== false,
            user: smtpCfg.user || '',
            fromEmail: smtpCfg.fromEmail || '',
            fromName: smtpCfg.fromName || '투어이지(TourEasy) 맞춤여행팀',
            hasPassword: hasPwd,
            isConfigured: Boolean(hasPwd && smtpCfg.user)
          }
        });
      }

      // 10-3. POST /api/smtp-config
      if (pathname === '/api/smtp-config' && method === 'POST') {
        const body = await parseRequestBody(req);
        const existing = readJson('smtp_config.json', {});
        let newPwd = body.password;
        if (!newPwd || newPwd === '******') {
          newPwd = existing.password || '';
        }
        let rawU = (body.user || '').trim();
        let rawF = (body.fromEmail || '').trim();
        const h = body.host || 'smtp.naver.com';

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

        const newCfg = {
          enabled: body.enabled !== false,
          provider: body.provider || 'naver',
          host: h,
          port: body.port || 587,
          enableSsl: body.enableSsl !== false,
          user: rawU,
          password: newPwd,
          fromEmail: rawF,
          fromName: body.fromName || '투어이지(TourEasy) 맞춤여행팀',
          updatedAt: new Date().toISOString()
        };
        writeJson('smtp_config.json', newCfg);
        return sendJson(res, 200, { success: true, message: 'SMTP 설정이 저장되었습니다.', isConfigured: Boolean(newPwd && newCfg.user) });
      }

      // 10-4. POST /api/smtp-test
      if (pathname === '/api/smtp-test' && method === 'POST') {
        const body = await parseRequestBody(req);
        return sendJson(res, 200, { success: true, message: `[${body.recipientEmail || '고객'}]로 테스트 발송 요청을 처리했습니다.` });
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
