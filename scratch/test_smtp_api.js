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
  console.log('Testing TourAPI.getSmtpConfig()...');
  const cfg = await global.window.TourAPI.getSmtpConfig();
  console.log('SMTP Config Provider:', cfg.data.provider, 'Host:', cfg.data.host);

  console.log('Testing TourAPI.testSmtp()...');
  const testRes = await global.window.TourAPI.testSmtp({
    recipientEmail: 'wisekks@gmail.com',
    host: 'smtp.naver.com',
    port: 465,
    user: 'kmagick',
    password: '@wisesoo7337',
    fromEmail: 'kmagick@naver.com',
    fromName: '투어이지(TourEasy)'
  });
  console.log('Test SMTP Result:', testRes);

  if (testRes && testRes.success) {
    console.log('\n=============================================');
    console.log('✅ TEST PASSED: SMTP dual-mode test completed with success response!');
    console.log('=============================================\n');
  } else {
    console.error('❌ TEST FAILED');
    process.exit(1);
  }
}

test();
