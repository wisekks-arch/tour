const fs = require('fs');

const apiJs = fs.readFileSync('d:/92.SW/shop/js/api.js', 'utf8');

const updateStatusIdx = apiJs.indexOf('updateOrderStatus(');
console.log('=== updateOrderStatus in api.js ===');
console.log(apiJs.substring(updateStatusIdx, updateStatusIdx + 500));
