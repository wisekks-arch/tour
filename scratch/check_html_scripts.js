const fs = require('fs');
const path = require('path');

const shopDir = 'd:/92.SW/shop';
const files = fs.readdirSync(shopDir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  const html = fs.readFileSync(path.join(shopDir, f), 'utf8');
  const hasAuthStore = html.includes('auth-store.js');
  const hasComponents = html.includes('components.js');
  console.log(`${f} -> has auth-store.js: ${hasAuthStore}, has components.js: ${hasComponents}`);
});
