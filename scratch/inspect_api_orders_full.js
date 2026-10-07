const fs = require('fs');

const apiJs = fs.readFileSync('d:/92.SW/shop/js/api.js', 'utf8');

const ordersIdx = apiJs.indexOf('// 3. Orders');
console.log(apiJs.substring(ordersIdx, ordersIdx + 2500));
