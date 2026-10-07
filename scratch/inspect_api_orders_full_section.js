const fs = require('fs');

const apiJs = fs.readFileSync('d:/92.SW/shop/js/api.js', 'utf8');

const orderStart = apiJs.indexOf("// 3. Orders");
const inquiryStart = apiJs.indexOf("// 4. Inquiries");
console.log('Orders section in api.js:');
console.log(apiJs.substring(orderStart, inquiryStart));
