const fs = require('fs');

const checkoutHtml = fs.readFileSync('d:/92.SW/shop/checkout.html', 'utf8');
const submitIdx = checkoutHtml.indexOf('handleOrderSubmit');
console.log('=== checkout.html handleOrderSubmit ===');
console.log(checkoutHtml.substring(submitIdx, submitIdx + 1500));
