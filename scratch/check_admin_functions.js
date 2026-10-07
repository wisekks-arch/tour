const fs = require('fs');

const adminHtml = fs.readFileSync('d:/92.SW/shop/admin.html', 'utf8');
const scriptMatch = adminHtml.match(/<script>([\s\S]*?)<\/script>[\s\S]*?<\/body>/);
if (scriptMatch) {
  const scriptContent = scriptMatch[1];
  const funcs = [...scriptContent.matchAll(/function\s+([a-zA-Z0-9_]+)\s*\(/g)].map(m => m[1]);
  console.log('Functions in main script:', funcs);

  // Check if setOrderPeriod exists
  console.log('Has setOrderPeriod:', funcs.includes('setOrderPeriod'));
  console.log('Has applyCustomDateFilter:', funcs.includes('applyCustomDateFilter'));
  console.log('Has applyOrderSearchFilter:', funcs.includes('applyOrderSearchFilter'));
  console.log('Has exportOrdersCSV:', funcs.includes('exportOrdersCSV'));
  console.log('Has updateOrderSummaryCards:', funcs.includes('updateOrderSummaryCards'));
}
