const fs = require('fs');
const path = require('path');

// Mock browser environment for api.js
global.window = {
  location: { protocol: 'https:' }
};
global.localStorage = {
  _data: {},
  getItem(k) { return this._data[k] || null; },
  setItem(k, v) { this._data[k] = String(v); },
  removeItem(k) { delete this._data[k]; }
};

// Evaluate public/js/api.js
const apiCode = fs.readFileSync(path.join(__dirname, '..', 'public', 'js', 'api.js'), 'utf8');
eval(apiCode);

async function test() {
  const userRes = await global.window.TourAPI.getUsers();
  console.log(`API response status: ${userRes.success}, total count: ${userRes.count}`);
  const users = userRes.data;
  
  const admins = users.filter(u => (u.role || '').toUpperCase() === 'ADMIN');
  const members = users.filter(u => (u.role || 'MEMBER').toUpperCase() !== 'ADMIN');
  console.log(`Admin count: ${admins.length}, Member count: ${members.length}`);
  
  users.forEach((u, i) => {
    console.log(`[${i + 1}] ${u.name} (${u.email}) - ${u.role}`);
  });
  
  const hasDeletedAdmin = users.some(u => (u.email || '').toLowerCase() === 'admin@toureasy.co.kr');
  const superAdmin = users.find(u => (u.email || '').toLowerCase() === 'wisekks@gmail.com');
  
  console.log(`Has admin@toureasy.co.kr (should be false): ${hasDeletedAdmin}`);
  console.log(`SuperAdmin name (should be 최고관리자): ${superAdmin ? superAdmin.name : 'none'}`);
  
  if (users.length === 8 && admins.length === 1 && members.length === 7 && !hasDeletedAdmin && superAdmin && superAdmin.name === '최고관리자') {
    console.log('\n=============================================');
    console.log('✅ TEST PASSED: Exactly 8 members (1 SuperAdmin + 7 Members), admin@toureasy.co.kr fully removed!');
    console.log('=============================================\n');
  } else {
    console.error('❌ TEST FAILED');
    process.exit(1);
  }
}

test();
