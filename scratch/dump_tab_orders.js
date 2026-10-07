const fs = require('fs');

const adminHtml = fs.readFileSync('d:/92.SW/shop/admin.html', 'utf8');

// Find all HTML in tab-orders
const oStart = adminHtml.indexOf('<section id="tab-orders"');
const oEnd = adminHtml.indexOf('<!-- ================= 4. INQUIRIES TAB', oStart);
console.log('=== tab-orders HTML ===');
console.log(adminHtml.substring(oStart, oEnd !== -1 ? oEnd : oStart + 5000));
