const fs = require('fs');
const path = require('path');

const tourDir = 'd:\\92.SW\\tour';
const shopDir = 'd:\\92.SW\\shop';
const publicDir = path.join(shopDir, 'public');

// Read existing generators in tour
function extractHtmlFromPs1(ps1FileName, variableName) {
  const filePath = path.join(tourDir, ps1FileName);
  const content = fs.readFileSync(filePath, 'utf8');
  const startMarker = `$${variableName} = @'\r\n`;
  const altStartMarker = `$${variableName} = @'\n`;
  const actualStart = content.includes(startMarker) ? startMarker : altStartMarker;
  const endMarker = '\r\n\'@';
  const altEndMarker = '\n\'@';
  const actualEnd = content.includes(endMarker) ? endMarker : altEndMarker;

  const startIdx = content.indexOf(actualStart);
  if (startIdx === -1) {
    throw new Error(`Could not find start marker for $${variableName} in ${ps1FileName}`);
  }
  const endIdx = content.indexOf(actualEnd, startIdx + actualStart.length);
  if (endIdx === -1) {
    throw new Error(`Could not find end marker for $${variableName} in ${ps1FileName}`);
  }

  return content.slice(startIdx + actualStart.length, endIdx);
}

// Extract HTML strings from ps1 generators
console.log('Extracting HTML templates...');
const indexHtml = extractHtmlFromPs1('gen_html_pages.ps1', 'indexHtml');
const productsHtml = extractHtmlFromPs1('gen_html_pages.ps1', 'productsHtml');
const detailHtml = extractHtmlFromPs1('gen_html_pages2.ps1', 'detailHtml');
const cartHtml = extractHtmlFromPs1('gen_html_pages2.ps1', 'cartHtml');
const checkoutHtml = extractHtmlFromPs1('gen_html_pages3.ps1', 'checkoutHtml');
const completeHtml = extractHtmlFromPs1('gen_html_pages3.ps1', 'completeHtml');
const lookupHtml = extractHtmlFromPs1('gen_html_pages3.ps1', 'lookupHtml');
const adminHtml = extractHtmlFromPs1('gen_admin_html.ps1', 'adminHtml');

const pages = [
  { name: 'index.html', content: indexHtml },
  { name: 'products.html', content: productsHtml },
  { name: 'product-detail.html', content: detailHtml },
  { name: 'cart.html', content: cartHtml },
  { name: 'checkout.html', content: checkoutHtml },
  { name: 'order-complete.html', content: completeHtml },
  { name: 'order-lookup.html', content: lookupHtml },
  { name: 'admin.html', content: adminHtml }
];

pages.forEach(p => {
  // Write to both root and public/
  fs.writeFileSync(path.join(shopDir, p.name), p.content, 'utf8');
  fs.writeFileSync(path.join(publicDir, p.name), p.content, 'utf8');
  console.log(`Successfully generated pure UTF-8: ${p.name}`);
});

// Also extract components.js, cart-store.js, style.css from gen_static_assets.ps1
const staticPs1 = fs.readFileSync(path.join(tourDir, 'gen_static_assets.ps1'), 'utf8');

function extractAssetFromPs1(variableName) {
  const startMarker = `$${variableName} = @'\r\n`;
  const altStartMarker = `$${variableName} = @'\n`;
  const actualStart = staticPs1.includes(startMarker) ? startMarker : altStartMarker;
  const endMarker = '\r\n\'@';
  const altEndMarker = '\n\'@';
  const actualEnd = staticPs1.includes(endMarker) ? endMarker : altEndMarker;

  const startIdx = staticPs1.indexOf(actualStart);
  if (startIdx === -1) throw new Error(`Could not find ${variableName}`);
  const endIdx = staticPs1.indexOf(actualEnd, startIdx + actualStart.length);
  return staticPs1.slice(startIdx + actualStart.length, endIdx);
}

const cssStyle = extractAssetFromPs1('cssContent');
const cartStoreJs = extractAssetFromPs1('cartStoreJs');
const componentsJs = extractAssetFromPs1('componentsJs');

fs.writeFileSync(path.join(shopDir, 'css', 'style.css'), cssStyle, 'utf8');
fs.writeFileSync(path.join(publicDir, 'css', 'style.css'), cssStyle, 'utf8');
fs.writeFileSync(path.join(shopDir, 'js', 'cart-store.js'), cartStoreJs, 'utf8');
fs.writeFileSync(path.join(publicDir, 'js', 'cart-store.js'), cartStoreJs, 'utf8');
fs.writeFileSync(path.join(shopDir, 'js', 'components.js'), componentsJs, 'utf8');
fs.writeFileSync(path.join(publicDir, 'js', 'components.js'), componentsJs, 'utf8');
console.log('Successfully generated pure UTF-8 style.css, cart-store.js, components.js');
