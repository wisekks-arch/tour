const fs = require('fs');

const apiJs = fs.readFileSync('d:/92.SW/shop/js/api.js', 'utf8');
const funcIdx = apiJs.indexOf('function getAdaptiveDefaultOrders');
if (funcIdx !== -1) {
  console.log('=== getAdaptiveDefaultOrders ===');
  console.log(apiJs.substring(funcIdx, funcIdx + 2000));
} else {
  console.log('getAdaptiveDefaultOrders not found');
}
