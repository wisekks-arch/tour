const fs = require('fs');
const path = require('path');

const shopDir = 'd:/92.SW/shop';
const publicDir = path.join(shopDir, 'public');

let authCode = fs.readFileSync(path.join(shopDir, 'js', 'auth-store.js'), 'utf8');

// Fix missing comma between resetPassword and updateProfile
authCode = authCode.replace(
  /return \{ success: true, message: '비밀번호가 성공적으로 재설정되었습니다! 새 비밀번호로 로그인해 주세요\.' \};\r?\n\s*\}\r?\n\s*\/\*\*/g,
  `return { success: true, message: '비밀번호가 성공적으로 재설정되었습니다! 새 비밀번호로 로그인해 주세요.' };\n  },\n\n  /**`
);

fs.writeFileSync(path.join(shopDir, 'js', 'auth-store.js'), authCode, 'utf8');
fs.writeFileSync(path.join(publicDir, 'js', 'auth-store.js'), authCode, 'utf8');
console.log('Fixed auth-store.js syntax!');
