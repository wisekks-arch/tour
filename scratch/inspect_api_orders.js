const fs = require('fs');

const apiJs = fs.readFileSync('d:/92.SW/shop/js/api.js', 'utf8');

// Find ShopAPI fallback orders handling
const ordersIdx = apiJs.indexOf('// 3. Orders');
if (ordersIdx !== -1) {
  console.log('=== ShopAPI fallback Orders ===');
  console.log(apiJs.substring(ordersIdx, ordersIdx + 1500));
}

// Find getOrders / createOrder / updateOrderStatus methods
const methodsIdx = apiJs.indexOf('// Orders');
if (methodsIdx !== -1) {
  console.log('\n=== ShopAPI Orders Methods ===');
  console.log(apiJs.substring(methodsIdx, methodsIdx + 1500));
}
