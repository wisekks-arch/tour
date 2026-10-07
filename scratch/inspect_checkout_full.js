const fs = require('fs');

const checkoutHtml = fs.readFileSync('d:/92.SW/shop/checkout.html', 'utf8');
const scriptMatch = checkoutHtml.match(/<script>([\s\S]*?)<\/script>[\s\S]*?<\/body>/);
if (scriptMatch) {
  console.log('=== checkout.html Script ===');
  console.log(scriptMatch[1]);
}
