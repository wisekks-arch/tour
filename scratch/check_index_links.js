const fs = require('fs');

const html = fs.readFileSync('d:/92.SW/shop/index.html', 'utf8');
const lines = html.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('product-detail.html') || line.includes('products.html')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
