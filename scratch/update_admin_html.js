const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'admin.html'),
  path.join(__dirname, '..', 'public', 'admin.html')
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Cache busting
  content = content.replace(/<script src="js\/api\.js\?v=[^"]*"><\/script>/g, '<script src="js/api.js?v=20260911_v8admin"></script>');
  content = content.replace(/<script src="js\/components\.js\?v=[^"]*"><\/script>/g, '<script src="js/components.js?v=20260911_v8admin"></script>');

  // 2. Default stat subtext in loadAllAdminData
  content = content.replace(
    /if \(elUserCount\) elUserCount\.textContent = `\$\{s\.userCount !== undefined \? s\.userCount : 9\}명`;\s*const elUserSub = document\.getElementById\('stat-user-subtext'\);\s*if \(elUserSub\) elUserSub\.textContent = `일반 \$\{s\.memberCount !== undefined \? s\.memberCount : 7\} · 관리자 \$\{s\.adminCount !== undefined \? s\.adminCount : 2\}`;/,
    `if (elUserCount) elUserCount.textContent = \`\${s.userCount !== undefined ? s.userCount : 8}명\`;
          const elUserSub = document.getElementById('stat-user-subtext');
          if (elUserSub) elUserSub.textContent = \`일반 \${s.memberCount !== undefined ? s.memberCount : 7} · 관리자 \${s.adminCount !== undefined ? s.adminCount : 1}\`;`
  );

  // 3. Fallback users inside loadUsersData in admin.html
  const loadUsersOld = `    async function loadUsersData() {
      try {
        const res = await TourAPI.getUsers();
        if (res && res.data) {
          cachedUsers = res.data;
          updateUserBadgeCounts(cachedUsers);
          applyUserFilters();
        }
      } catch (err) {
        console.error('Error loading users data:', err);
      }
    }`;

  const loadUsersNew = `    async function loadUsersData() {
      try {
        const res = await TourAPI.getUsers();
        if (res && res.data && res.data.length > 0) {
          cachedUsers = res.data.filter(u => (u.email || '').toLowerCase() !== 'admin@toureasy.co.kr');
        } else if (typeof DEFAULT_USERS !== 'undefined' && Array.isArray(DEFAULT_USERS)) {
          cachedUsers = DEFAULT_USERS.filter(u => (u.email || '').toLowerCase() !== 'admin@toureasy.co.kr');
        }
        updateUserBadgeCounts(cachedUsers);
        applyUserFilters();
      } catch (err) {
        console.error('Error loading users data:', err);
        if (typeof DEFAULT_USERS !== 'undefined' && Array.isArray(DEFAULT_USERS)) {
          cachedUsers = DEFAULT_USERS.filter(u => (u.email || '').toLowerCase() !== 'admin@toureasy.co.kr');
          updateUserBadgeCounts(cachedUsers);
          applyUserFilters();
        }
      }
    }`;

  content = content.replace(loadUsersOld, loadUsersNew);

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Successfully updated ${file}`);
});
