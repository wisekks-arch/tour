const fs = require('fs');
const path = require('path');

// Mock browser environment
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
  const payload = {
    name: "홍길동",
    phone: "010-7777-8888",
    email: "hong@toureasy.com",
    category: "가족 단독 투어 설계",
    destination: "스위스 융프라우 & 체르마트",
    expectedDate: "2026년 10월 초",
    groupSize: 4,
    message: "4인 가족 맞춤 견적 및 단독 전용 차량 투어 일정 문의드립니다."
  };

  console.log('Testing TourAPI.createInquiry()...');
  const res = await global.window.TourAPI.createInquiry(payload);
  console.log('Inquiry result:', res);

  const inquiriesRes = await global.window.TourAPI.getInquiries();
  console.log('Total inquiries count:', inquiriesRes.count);

  if (res.success && res.data && res.data.id && res.data.id.startsWith('INQ-')) {
    console.log('\n=============================================');
    console.log('✅ TEST PASSED: 1:1 Inquiry created successfully with ID:', res.data.id);
    console.log('=============================================\n');
  } else {
    console.error('❌ TEST FAILED');
    process.exit(1);
  }
}

test();
