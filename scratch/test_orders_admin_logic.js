const fs = require('fs');

const adminHtml = fs.readFileSync('d:/92.SW/shop/admin.html', 'utf8');

console.log('=== VERIFYING ORDER FUNCTIONS IN ADMIN.HTML ===');
const requiredFunctions = [
  'setOrderPeriod',
  'applyCustomDateFilter',
  'applyOrderSearchFilter',
  'filterOrdersByStatus',
  'applyOrderFilters',
  'updateOrderPeriodKPI',
  'renderAdminOrdersTable',
  'updateOrderStatus',
  'openTrackingModal',
  'closeTrackingModal',
  'handleTrackingSave',
  'openOrderDetailModal',
  'closeOrderDetailModal',
  'handleModalStatusUpdate',
  'printOrderInvoice',
  'exportOrdersCSV'
];

let allPassed = true;
requiredFunctions.forEach(fn => {
  const hasFn = adminHtml.includes(`function ${fn}`) || adminHtml.includes(`${fn} =`);
  if (hasFn) {
    console.log(`✅ Function [${fn}] is defined.`);
  } else {
    console.error(`❌ Function [${fn}] is MISSING!`);
    allPassed = false;
  }
});

console.log('\n=== VERIFYING MODAL ELEMENTS ===');
const requiredModals = [
  'order-detail-modal',
  'modal-items-table',
  'modal-price-products',
  'modal-price-shipping',
  'modal-price-discount',
  'modal-price-final',
  'tracking-modal',
  'tracking-number-input',
  'tracking-courier'
];

requiredModals.forEach(id => {
  const hasId = adminHtml.includes(`id="${id}"`);
  if (hasId) {
    console.log(`✅ Modal Element [#${id}] is present.`);
  } else {
    console.error(`❌ Modal Element [#${id}] is MISSING!`);
    allPassed = false;
  }
});

if (allPassed) {
  console.log('\n🎉 ALL ORDER & DELIVERY MANAGEMENT CHECKS PASSED PERFECTLY!');
} else {
  console.error('\n⚠️ SOME CHECKS FAILED!');
  process.exit(1);
}
