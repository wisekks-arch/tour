const fs = require('fs');
const path = require('path');

const tourDir = 'd:/92.SW/tour';
const shopDir = 'd:/92.SW/shop';
const publicDir = path.join(shopDir, 'public');

// 1. Sync shop root to public
const adminHtml = fs.readFileSync(path.join(shopDir, 'admin.html'), 'utf8');
fs.writeFileSync(path.join(publicDir, 'admin.html'), adminHtml, 'utf8');

const checkoutHtml = fs.readFileSync(path.join(shopDir, 'checkout.html'), 'utf8');
fs.writeFileSync(path.join(publicDir, 'checkout.html'), checkoutHtml, 'utf8');

const apiJs = fs.readFileSync(path.join(shopDir, 'js', 'api.js'), 'utf8');
fs.writeFileSync(path.join(publicDir, 'js', 'api.js'), apiJs, 'utf8');

console.log('Synchronized shop root and public files.');

// 2. Update gen_admin_html.ps1
const genAdminPs1 = `$ErrorActionPreference = 'Stop'
$shopDir = 'd:\\92.SW\\shop'
$publicDir = Join-Path $shopDir 'public'

$adminHtml = @'
${adminHtml}
'@

[System.IO.File]::WriteAllText((Join-Path $shopDir 'admin.html'), $adminHtml, [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText((Join-Path $publicDir 'admin.html'), $adminHtml, [System.Text.Encoding]::UTF8)
Write-Host "Generated: admin.html" -ForegroundColor Green
`;

fs.writeFileSync(path.join(tourDir, 'gen_admin_html.ps1'), genAdminPs1, 'utf8');
console.log('Updated gen_admin_html.ps1');

// 3. Update gen_html_pages3.ps1
let genPages3 = fs.readFileSync(path.join(tourDir, 'gen_html_pages3.ps1'), 'utf8');
const startMarker = `$checkoutHtml = @'\r\n`;
const altStartMarker = `$checkoutHtml = @'\n`;
const actStart = genPages3.includes(startMarker) ? startMarker : altStartMarker;
const endMarker = '\r\n\'@';
const altEndMarker = '\n\'@';

const sIdx = genPages3.indexOf(actStart);
if (sIdx !== -1) {
  const eIdx = genPages3.indexOf(genPages3.includes(endMarker) ? endMarker : altEndMarker, sIdx + actStart.length);
  if (eIdx !== -1) {
    genPages3 = genPages3.slice(0, sIdx + actStart.length) + checkoutHtml + genPages3.slice(eIdx);
    fs.writeFileSync(path.join(tourDir, 'gen_html_pages3.ps1'), genPages3, 'utf8');
    console.log('Updated gen_html_pages3.ps1');
  }
}
