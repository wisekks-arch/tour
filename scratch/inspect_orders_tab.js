const fs = require('fs');

const adminHtml = fs.readFileSync('d:/92.SW/shop/admin.html', 'utf8');

// Print tab-orders full HTML
const startOrders = adminHtml.indexOf('<section id="tab-orders"');
const endOrders = adminHtml.indexOf('</section>', startOrders);
console.log('=== tab-orders HTML ===');
console.log(adminHtml.substring(startOrders, endOrders + 10));

// Print all Order JS functions
console.log('\n=== Order JS Functions ===');
const jsStart = adminHtml.indexOf('let currentOrderPeriod');
if (jsStart !== -1) {
  console.log(adminHtml.substring(jsStart, jsStart + 4000));
} else {
  const oFunc = adminHtml.indexOf('function filterOrdersByStatus');
  console.log(adminHtml.substring(oFunc - 200, oFunc + 3000));
}
