const fs = require('fs');
const path = require('path');

const adminHtml = fs.readFileSync('d:/92.SW/shop/admin.html', 'utf8');

// Find all section IDs
const sectionRegex = /<section[^>]*id=["']([^"']+)["'][^>]*>/gi;
let match;
const sections = [];
while ((match = sectionRegex.exec(adminHtml)) !== null) {
  sections.push(match[1]);
}
console.log('Sections found:', sections);

// Find order related HTML
const orderTabIdx = adminHtml.indexOf('tab-orders');
if (orderTabIdx !== -1) {
  console.log('\n=== tab-orders HTML slice ===\n');
  console.log(adminHtml.substring(orderTabIdx - 50, orderTabIdx + 2000));
}

// Find scripts related to orders
const orderFuncIdx = adminHtml.indexOf('renderAdminOrdersTable');
if (orderFuncIdx !== -1) {
  console.log('\n=== renderAdminOrdersTable JS slice ===\n');
  console.log(adminHtml.substring(orderFuncIdx - 100, orderFuncIdx + 2500));
}
