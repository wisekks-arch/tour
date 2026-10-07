const fs = require('fs');

const apiJs = fs.readFileSync('d:/92.SW/shop/js/api.js', 'utf8');
const funcIdx = apiJs.indexOf('function getRelativeOrderDate');
if (funcIdx !== -1) {
  console.log('=== getRelativeOrderDate ===');
  console.log(apiJs.substring(funcIdx, funcIdx + 500));
}
