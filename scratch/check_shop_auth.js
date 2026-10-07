const fs = require('fs');

if (fs.existsSync('d:/92.SW/shop/js/auth-store.js')) {
  console.log('=== auth-store.js ===');
  console.log(fs.readFileSync('d:/92.SW/shop/js/auth-store.js', 'utf8').slice(0, 1000));
}

if (fs.existsSync('d:/92.SW/shop/login.html')) {
  console.log('=== login.html ===');
  console.log(fs.readFileSync('d:/92.SW/shop/login.html', 'utf8').slice(0, 500));
}

if (fs.existsSync('d:/92.SW/shop/signup.html')) {
  console.log('=== signup.html ===');
  console.log(fs.readFileSync('d:/92.SW/shop/signup.html', 'utf8').slice(0, 500));
}
