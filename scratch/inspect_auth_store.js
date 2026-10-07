const fs = require('fs');

const authStore = fs.readFileSync('d:/92.SW/shop/js/auth-store.js', 'utf8');
console.log(authStore.slice(0, 3000));
