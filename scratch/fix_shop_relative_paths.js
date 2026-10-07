const fs = require('fs');
const path = require('path');

const shopDir = 'd:\\92.SW\\shop';
const publicDir = path.join(shopDir, 'public');

function replaceAbsolutePaths(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace href="/..." with href="..."
  content = content.replace(/href="\/([^"]+)"/g, 'href="$1"');
  content = content.replace(/href='\/([^']+)'/g, "href='$1'");

  // Replace window.location.href = '/...' with window.location.href = '...'
  content = content.replace(/window\.location\.href\s*=\s*['"]\/([^'"]+)['"]/g, "window.location.href = '$1'");

  // Replace specific product links like `/product-detail.html?id=`
  content = content.replace(/\/product-detail\.html\?id=/g, 'product-detail.html?id=');
  content = content.replace(/\/products\.html/g, 'products.html');
  content = content.replace(/\/index\.html/g, 'index.html');
  content = content.replace(/\/cart\.html/g, 'cart.html');
  content = content.replace(/\/checkout\.html/g, 'checkout.html');
  content = content.replace(/\/order-lookup\.html/g, 'order-lookup.html');
  content = content.replace(/\/order-complete\.html/g, 'order-complete.html');
  content = content.replace(/\/admin\.html/g, 'admin.html');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated relative paths in: ${filePath}`);
}

// 1. Process all HTML files in d:\92.SW\shop and d:\92.SW\shop\public
const htmlFiles = [
  'index.html',
  'products.html',
  'product-detail.html',
  'cart.html',
  'checkout.html',
  'order-complete.html',
  'order-lookup.html',
  'admin.html'
];

htmlFiles.forEach(f => {
  replaceAbsolutePaths(path.join(shopDir, f));
  replaceAbsolutePaths(path.join(publicDir, f));
});

// 2. Process JS files in d:\92.SW\shop\js and d:\92.SW\shop\public\js
const jsFiles = [
  'components.js',
  'api.js',
  'cart-store.js'
];

jsFiles.forEach(f => {
  replaceAbsolutePaths(path.join(shopDir, 'js', f));
  replaceAbsolutePaths(path.join(publicDir, 'js', f));
});

console.log('All SHOP files updated with 100% safe relative paths!');
