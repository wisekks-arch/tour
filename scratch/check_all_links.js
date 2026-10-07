const fs = require('fs');
const path = require('path');

const shopDir = 'd:/92.SW/shop';
const files = fs.readdirSync(shopDir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(path.join(shopDir, f), 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('product-detail.html')) {
      console.log(`[${f}:${idx + 1}] ${line.trim()}`);
    }
  });
});
