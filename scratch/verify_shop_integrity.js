const fs = require('fs');
const path = require('path');

const shopDir = 'd:/92.SW/shop';
let totalErrors = 0;

console.log('=== Checking shop JSON files ===');
const jsonFiles = [
  'data/products.json',
  'data/categories.json',
  'data/inquiries.json',
  'data/orders.json',
  'public/data/products.json',
  'public/data/orders.json'
];

jsonFiles.forEach(f => {
  const p = path.join(shopDir, f);
  if (fs.existsSync(p)) {
    try {
      const data = JSON.parse(fs.readFileSync(p, 'utf8'));
      console.log(`[PASS] JSON OK: ${f} (Items: ${Array.isArray(data) ? data.length : 'Object'})`);
    } catch (err) {
      console.error(`[FAIL] JSON ERROR in ${f}:`, err.message);
      totalErrors++;
    }
  }
});

console.log('\n=== Checking 60 Products Images Count ===');
const products = JSON.parse(fs.readFileSync(path.join(shopDir, 'data/products.json'), 'utf8'));
let under3Count = 0;
products.forEach((p, idx) => {
  const imgCount = (p.images && Array.isArray(p.images)) ? p.images.length : (p.thumbnail ? 1 : 0);
  if (imgCount < 3) {
    console.warn(`[WARN] Product ${p.id} (${p.name}) has only ${imgCount} images.`);
    under3Count++;
  }
});
console.log(`Total products: ${products.length}, Products with <3 images: ${under3Count}`);
if (under3Count > 0) totalErrors++;

console.log('\n=== Checking JS Syntax in shop/js and inline scripts ===');
const jsFiles = [
  'js/api.js',
  'js/components.js',
  'js/auth-store.js',
  'js/cart-store.js'
];

jsFiles.forEach(f => {
  const p = path.join(shopDir, f);
  if (fs.existsSync(p)) {
    try {
      const code = fs.readFileSync(p, 'utf8');
      new Function(code);
      console.log(`[PASS] JS Syntax OK: ${f}`);
    } catch (err) {
      console.error(`[FAIL] JS Syntax Error in ${f}:`, err.message);
      totalErrors++;
    }
  }
});

console.log('\n=== Checking HTML Inline JS Syntax ===');
const htmlFiles = [
  'index.html',
  'products.html',
  'product-detail.html',
  'product-edit.html',
  'admin.html',
  'cart.html',
  'checkout.html',
  'order-complete.html',
  'order-lookup.html',
  'login.html',
  'signup.html',
  'find-account.html'
];

htmlFiles.forEach(f => {
  const p = path.join(shopDir, f);
  if (fs.existsSync(p)) {
    const content = fs.readFileSync(p, 'utf8');
    const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    let scriptIdx = 0;
    while ((match = scriptRegex.exec(content)) !== null) {
      const scriptBody = match[1].trim();
      if (!scriptBody || match[0].includes('src=')) continue;
      scriptIdx++;
      try {
        new Function(scriptBody);
      } catch (err) {
        console.error(`[FAIL] Inline JS Error in ${f} (Script #${scriptIdx}):`, err.message);
        totalErrors++;
      }
    }
    console.log(`[PASS] HTML OK: ${f} (${scriptIdx} inline scripts verified)`);
  }
});

// Sync files from shop root to shop/public
console.log('\n=== Synchronizing shop/ to shop/public/ ===');
const copyList = [
  'admin.html',
  'cart.html',
  'checkout.html',
  'find-account.html',
  'index.html',
  'login.html',
  'order-complete.html',
  'order-lookup.html',
  'product-detail.html',
  'product-edit.html',
  'products.html',
  'signup.html',
  'js/api.js',
  'js/components.js',
  'js/auth-store.js',
  'js/cart-store.js',
  'data/products.json'
];

copyList.forEach(rel => {
  const src = path.join(shopDir, rel);
  const dest = path.join(shopDir, 'public', rel);
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
});
console.log('[PASS] Synced all core files to public/');

console.log(`\n========================================`);
console.log(`Verification Complete. Total Errors: ${totalErrors}`);
console.log(`========================================`);
process.exit(totalErrors > 0 ? 1 : 0);
