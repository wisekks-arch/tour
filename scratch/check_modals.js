const fs = require('fs');

const adminHtml = fs.readFileSync('d:/92.SW/shop/admin.html', 'utf8');

console.log('Has order-detail-modal:', adminHtml.includes('order-detail-modal') || adminHtml.includes('order-modal'));
console.log('Has tracking-modal:', adminHtml.includes('tracking-modal'));
