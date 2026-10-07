const fs = require('fs');
const path = require('path');

const shopDir = 'd:/92.SW/shop';
const publicDir = path.join(shopDir, 'public');
const version = '20261007_auth';

function updateHtmlFiles(dir) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  files.forEach(f => {
    const filePath = path.join(dir, f);
    let html = fs.readFileSync(filePath, 'utf8');

    // Replace js/auth-store.js(?.*)? with js/auth-store.js?v=...
    html = html.replace(/src=["'](?:\/)?js\/auth-store\.js(?:\?[^"']*)?["']/g, `src="js/auth-store.js?v=${version}"`);
    // Replace js/components.js(?.*)? with js/components.js?v=...
    html = html.replace(/src=["'](?:\/)?js\/components\.js(?:\?[^"']*)?["']/g, `src="js/components.js?v=${version}"`);
    // Replace js/cart-store.js(?.*)? with js/cart-store.js?v=...
    html = html.replace(/src=["'](?:\/)?js\/cart-store\.js(?:\?[^"']*)?["']/g, `src="js/cart-store.js?v=${version}"`);
    // Replace js/api.js(?.*)? with js/api.js?v=...
    html = html.replace(/src=["'](?:\/)?js\/api\.js(?:\?[^"']*)?["']/g, `src="js/api.js?v=${version}"`);

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Updated cache busting in ${path.relative(shopDir, filePath)}`);
  });
}

updateHtmlFiles(shopDir);
if (fs.existsSync(publicDir)) {
  updateHtmlFiles(publicDir);
}

console.log('Cache busting applied successfully!');
