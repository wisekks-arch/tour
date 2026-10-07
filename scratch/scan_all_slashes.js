const fs = require('fs');
const path = require('path');

const shopDir = 'd:/92.SW/shop';
function scanDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== '.git') scanDir(full);
    } else if (f.endsWith('.js') || f.endsWith('.html')) {
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (line.includes('/product-detail') || line.includes('/products.html') || line.includes('/cart.html') || line.includes('/checkout.html')) {
          console.log(`[${path.relative(shopDir, full)}:${idx + 1}] ${line.trim()}`);
        }
      });
    }
  });
}

scanDir(shopDir);
