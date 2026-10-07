const fs = require('fs');
const path = require('path');
const vm = require('vm');

const shopDir = 'd:/92.SW/shop';
const authStoreCode = fs.readFileSync(path.join(shopDir, 'js', 'auth-store.js'), 'utf8');

// Mock localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

const windowMock = {
  dispatchEvent: () => {},
  CustomEvent: function(name, detail) { return { name, detail }; }
};

const sandbox = {
  localStorage: localStorageMock,
  window: windowMock,
  console: console,
  CustomEvent: windowMock.CustomEvent
};

vm.createContext(sandbox);
vm.runInContext(authStoreCode, sandbox);

console.log('=== TEST 1: Login Demo User ===');
const loginRes = vm.runInContext("AuthStore.login('demo@easyshop.kr', 'demo@123#pass')", sandbox);
console.log('Login result:', loginRes.success, loginRes.user.name);

console.log('\n=== TEST 2: Update Profile (Name & Address) ===');
const updateRes1 = vm.runInContext(`
  AuthStore.updateProfile({
    name: '홍길동수정',
    phone: '010-9999-8888',
    address: '서울특별시 송파구 올림픽로 300',
    addressDetail: '롯데월드타워 100층'
  });
`, sandbox);
console.log('Update result:', updateRes1.success, updateRes1.message);

const currentUser = vm.runInContext('AuthStore.getCurrentUser()', sandbox);
console.log('Current User Name in Session:', currentUser.name);
console.log('Current User Phone in Session:', currentUser.phone);
console.log('Current User Address in Session:', currentUser.address);

if (currentUser.name !== '홍길동수정' || currentUser.phone !== '010-9999-8888') {
  console.error('❌ Test 2 Failed!');
  process.exit(1);
}

console.log('\n=== TEST 3: Update Password ===');
const updatePwRes = vm.runInContext(`
  AuthStore.updateProfile({
    name: '홍길동수정',
    phone: '010-9999-8888',
    address: '서울특별시 송파구 올림픽로 300',
    addressDetail: '롯데월드타워 100층',
    currentPassword: 'demo@123#pass',
    newPassword: 'new#password2026@',
    confirmNewPassword: 'new#password2026@'
  });
`, sandbox);
console.log('Update PW result:', updatePwRes.success, updatePwRes.message);

if (!updatePwRes.success) {
  console.error('❌ Test 3 Failed!');
  process.exit(1);
}

console.log('\n=== TEST 4: Login with New Password ===');
const reLoginRes = vm.runInContext("AuthStore.login('demo@easyshop.kr', 'new#password2026@')", sandbox);
console.log('Re-login with new password result:', reLoginRes.success, reLoginRes.user.name);

if (!reLoginRes.success) {
  console.error('❌ Test 4 Failed!');
  process.exit(1);
}

console.log('\n🎉 ALL PROFILE UPDATE TESTS PASSED SUCCESSFULLY!');
