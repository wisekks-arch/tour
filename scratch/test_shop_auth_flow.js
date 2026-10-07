const fs = require('fs');
const path = require('path');
const vm = require('vm');

const shopDir = 'd:/92.SW/shop';
const authStoreCode = fs.readFileSync(path.join(shopDir, 'js', 'auth-store.js'), 'utf8');
const cartStoreCode = fs.readFileSync(path.join(shopDir, 'js', 'cart-store.js'), 'utf8');
const componentsCode = fs.readFileSync(path.join(shopDir, 'js', 'components.js'), 'utf8');

// Mock browser environment
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

const createMockElement = () => ({
  appendChild: () => {},
  classList: { add: () => {}, remove: () => {}, toggle: () => {} },
  addEventListener: () => {},
  remove: () => {},
  innerText: '',
  innerHTML: ''
});

const documentMock = {
  getElementById: (id) => {
    if (id === 'navbar-root') {
      return {
        set innerHTML(val) { navbarInnerHtml = val; },
        get innerHTML() { return navbarInnerHtml; }
      };
    }
    return createMockElement();
  },
  createElement: () => createMockElement(),
  body: {
    appendChild: () => {}
  }
};

const windowMock = {
  location: { origin: 'http://localhost:3000', pathname: '/index.html' },
  dispatchEvent: () => {},
  CustomEvent: function(name, detail) { return { name, detail }; },
  lucide: { createIcons: () => {} }
};

const sandbox = {
  localStorage: localStorageMock,
  document: documentMock,
  window: windowMock,
  console: console,
  setTimeout: setTimeout,
  CustomEvent: windowMock.CustomEvent
};

vm.createContext(sandbox);

// Execute auth-store, cart-store, components
vm.runInContext(authStoreCode, sandbox);
vm.runInContext(cartStoreCode, sandbox);
vm.runInContext(componentsCode, sandbox);

console.log('=== TEST 1: Non-logged in Navbar ===');
vm.runInContext('ShopUI.renderNavbar()', sandbox);
const hasLoginBtn = navbarInnerHtml.includes('login.html');
const hasSignupBtn = navbarInnerHtml.includes('signup.html');
const hasLogoutBeforeLogin = navbarInnerHtml.includes('로그아웃');
console.log('Login button present:', hasLoginBtn);
console.log('Signup button present:', hasSignupBtn);
console.log('Logout button present (should be false):', hasLogoutBeforeLogin);

if (!hasLoginBtn || !hasSignupBtn || hasLogoutBeforeLogin) {
  console.error('❌ Test 1 Failed!');
  process.exit(1);
}

console.log('\n=== TEST 2: Logged-in Navbar ===');
const loginRes = vm.runInContext("AuthStore.login('demo@easyshop.kr', 'demo@123#pass')", sandbox);
console.log('Login result:', loginRes.success, loginRes.user ? loginRes.user.name : 'none');

vm.runInContext('ShopUI.renderNavbar()', sandbox);
const hasLogoutAfterLogin = navbarInnerHtml.includes('로그아웃');
const hasUserName = navbarInnerHtml.includes('이지샵체험회원');
const hasLogoutHandler = navbarInnerHtml.includes('ShopUI.handleLogout()');

console.log('Logout button present:', hasLogoutAfterLogin);
console.log('User name present:', hasUserName);
console.log('ShopUI.handleLogout attached:', hasLogoutHandler);

if (!hasLogoutAfterLogin || !hasUserName || !hasLogoutHandler) {
  console.error('❌ Test 2 Failed!');
  process.exit(1);
}

console.log('\n=== TEST 3: Logout execution ===');
vm.runInContext('ShopUI.handleLogout()', sandbox);
const isStillLoggedIn = vm.runInContext('AuthStore.isLoggedIn()', sandbox);
console.log('Is logged in after logout (should be false):', isStillLoggedIn);

if (isStillLoggedIn) {
  console.error('❌ Test 3 Failed!');
  process.exit(1);
}

console.log('\n🎉 ALL AUTH & LOGOUT FLOW TESTS PASSED SUCCESSFULLY!');
