const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'js', 'api.js'),
  path.join(__dirname, '..', 'public', 'js', 'api.js')
];

const DEFAULT_USERS_BLOCK = `const DEFAULT_USERS = [
  {
    id: "usr-admin-wisekks",
    email: "wisekks@gmail.com",
    name: "최고관리자",
    phone: "010-8754-9373",
    role: "ADMIN",
    createdAt: "2026-09-01T13:18:00",
    password: "#wisesoo7337"
  },
  {
    id: "usr-001",
    email: "user@toureasy.com",
    password: "TourEasy1234!",
    name: "김투어",
    phone: "010-1234-5678",
    role: "MEMBER",
    createdAt: "2026-09-01T09:00:00"
  },
  {
    id: "usr-1788235251531",
    email: "hong@toureasy.com",
    name: "홍길동",
    phone: "010-7777-8888",
    role: "MEMBER",
    createdAt: "2026-09-01T13:00:51",
    password: "BrandNewSecret2026@"
  },
  {
    id: "usr-1788236092470",
    email: "kks@do-best.co.kr",
    name: "김길동",
    phone: "010-8754-9373",
    role: "MEMBER",
    createdAt: "2026-09-01T13:14:52",
    password: "@soo7337"
  },
  {
    id: "usr-1789004661526",
    email: "kwangsoo-kim@hanmail.net",
    password: "#wisesoo7337",
    name: "김광수",
    phone: "01087549373",
    role: "MEMBER",
    createdAt: "2026-09-10T10:44:21"
  },
  {
    id: "usr-1789018325160",
    email: "baba9026@naver.com",
    password: "!q1234567890",
    name: "이태웅",
    phone: "01024748940",
    role: "MEMBER",
    createdAt: "2026-09-10T14:32:05"
  },
  {
    id: "usr-1789019270799",
    email: "kstwalra@naver.com",
    password: "kson1234!@",
    name: "손태완",
    phone: "01025539672",
    role: "MEMBER",
    createdAt: "2026-09-10T14:47:50"
  },
  {
    id: "usr-1789021736064",
    email: "biz.junsangpark@gmail.com",
    password: "ZZNwg8xJRu2MGP6!",
    name: "박준상",
    phone: "01012345678",
    role: "MEMBER",
    createdAt: "2026-09-10T15:28:56"
  }
];`;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Replace DEFAULT_USERS definition
  content = content.replace(/const DEFAULT_USERS = \[[\s\S]*?\n\];/, DEFAULT_USERS_BLOCK);

  // 2. In login(): update wisekks to 최고관리자 and remove admin@toureasy.co.kr block
  content = content.replace(
    /if \(cleanEmail === 'wisekks@gmail\.com' && \(password === '#wises7337' \|\| password === '#wisesoo7337'\)\) \{[\s\S]*?name: '관리자'[\s\S]*?\}\s*if \(cleanEmail === 'admin@toureasy\.co\.kr'[\s\S]*?\}\s*/,
    `if (cleanEmail === 'wisekks@gmail.com' && (password === '#wises7337' || password === '#wisesoo7337')) {
        const userObj = { id: 'usr-admin-wisekks', email: 'wisekks@gmail.com', name: '최고관리자', phone: '010-8754-9373', role: 'ADMIN' };
        this.setCurrentUser(userObj);
        return { success: true, message: '최고관리자님, 환영합니다!', user: userObj };
      }
      `
  );

  // 3. In defaultUsersMap: update wisekks to 최고관리자 and remove admin@toureasy.co.kr
  content = content.replace(
    /'wisekks@gmail\.com': \{ id: 'usr-admin-wisekks', email: 'wisekks@gmail\.com', name: '관리자', phone: '010-8754-9373', role: 'ADMIN' \},\s*'admin@toureasy\.co\.kr': \{[\s\S]*?\},/g,
    `'wisekks@gmail.com': { id: 'usr-admin-wisekks', email: 'wisekks@gmail.com', name: '최고관리자', phone: '010-8754-9373', role: 'ADMIN' },`
  );

  // 4. In getUsers(): filter out admin@toureasy.co.kr from localStorage merge
  const getUsersOld = `    // Merge DEFAULT_USERS (9 members) with localStorage users
    let merged = typeof DEFAULT_USERS !== 'undefined' ? JSON.parse(JSON.stringify(DEFAULT_USERS)) : [];
    try {
      const local = JSON.parse(localStorage.getItem('toureasy_mock_users') || '[]');
      if (Array.isArray(local) && local.length > 0) {
        local.forEach(u => {
          const idx = merged.findIndex(m => (m.email || '').toLowerCase() === (u.email || '').toLowerCase());
          if (idx >= 0) {
            merged[idx] = { ...merged[idx], ...u };
          } else {
            merged.push(u);
          }
        });
      }
      localStorage.setItem('toureasy_mock_users', JSON.stringify(merged));
    } catch {}`;

  const getUsersNew = `    // Merge DEFAULT_USERS (8 members) with localStorage users (excluding deleted admin@toureasy.co.kr)
    let merged = typeof DEFAULT_USERS !== 'undefined' ? JSON.parse(JSON.stringify(DEFAULT_USERS)) : [];
    try {
      let local = JSON.parse(localStorage.getItem('toureasy_mock_users') || '[]');
      if (Array.isArray(local) && local.length > 0) {
        local = local.filter(u => (u.email || '').toLowerCase() !== 'admin@toureasy.co.kr');
        local.forEach(u => {
          const idx = merged.findIndex(m => (m.email || '').toLowerCase() === (u.email || '').toLowerCase());
          if (idx >= 0) {
            merged[idx] = { ...merged[idx], ...u };
          } else {
            merged.push(u);
          }
        });
      }
      localStorage.setItem('toureasy_mock_users', JSON.stringify(merged));
    } catch {}`;

  if (content.includes(getUsersOld)) {
    content = content.replace(getUsersOld, getUsersNew);
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
});
