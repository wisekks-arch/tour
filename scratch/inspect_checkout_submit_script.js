const fs = require('fs');

const checkoutHtml = fs.readFileSync('d:/92.SW/shop/checkout.html', 'utf8');
const submitScriptIdx = checkoutHtml.indexOf('async function handleOrderSubmit');
console.log('=== checkout.html submit script ===');
console.log(checkoutHtml.substring(submitScriptIdx, submitScriptIdx + 1500));
