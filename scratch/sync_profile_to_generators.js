const fs = require('fs');
const path = require('path');

const tourDir = 'd:/92.SW/tour';
const shopDir = 'd:/92.SW/shop';

// Update gen_static_assets.ps1 with latest components.js
const compCode = fs.readFileSync(path.join(shopDir, 'js', 'components.js'), 'utf8');
const genStaticPath = path.join(tourDir, 'gen_static_assets.ps1');
let genStaticContent = fs.readFileSync(genStaticPath, 'utf8');

const startMarker = `$componentsJs = @'\r\n`;
const altStartMarker = `$componentsJs = @'\n`;
const actStart = genStaticContent.includes(startMarker) ? startMarker : altStartMarker;
const endMarker = '\r\n\'@';
const altEndMarker = '\n\'@';

const sIdx = genStaticContent.indexOf(actStart);
if (sIdx !== -1) {
  const eIdx = genStaticContent.indexOf(genStaticContent.includes(endMarker) ? endMarker : altEndMarker, sIdx + actStart.length);
  if (eIdx !== -1) {
    genStaticContent = genStaticContent.slice(0, sIdx + actStart.length) + compCode + genStaticContent.slice(eIdx);
    fs.writeFileSync(genStaticPath, genStaticContent, 'utf8');
    console.log('Updated gen_static_assets.ps1 with new componentsJs');
  }
}

// Also update gen_html_pages3.ps1 to add profileHtml if needed
const profileHtml = fs.readFileSync(path.join(shopDir, 'profile.html'), 'utf8');
const genPages3Path = path.join(tourDir, 'gen_html_pages3.ps1');
let genPages3 = fs.readFileSync(genPages3Path, 'utf8');

if (!genPages3.includes('profileHtml')) {
  const appendPs1 = `\n\n# 4. Profile Page (profile.html)\n$profileHtml = @'\n${profileHtml}\n'@\n\n[System.IO.File]::WriteAllText((Join-Path $shopDir 'profile.html'), $profileHtml, [System.Text.Encoding]::UTF8)\n[System.IO.File]::WriteAllText((Join-Path $publicDir 'profile.html'), $profileHtml, [System.Text.Encoding]::UTF8)\nWrite-Host "Generated: profile.html" -ForegroundColor Green\n`;
  fs.appendFileSync(genPages3Path, appendPs1, 'utf8');
  console.log('Added profileHtml generator to gen_html_pages3.ps1');
} else {
  // Update profileHtml in gen_html_pages3.ps1
  const pStart = `$profileHtml = @'\r\n`;
  const pAltStart = `$profileHtml = @'\n`;
  const pActStart = genPages3.includes(pStart) ? pStart : pAltStart;
  const pSIdx = genPages3.indexOf(pActStart);
  if (pSIdx !== -1) {
    const pEIdx = genPages3.indexOf(genPages3.includes(endMarker) ? endMarker : altEndMarker, pSIdx + pActStart.length);
    if (pEIdx !== -1) {
      genPages3 = genPages3.slice(0, pSIdx + pActStart.length) + profileHtml + genPages3.slice(pEIdx);
      fs.writeFileSync(genPages3Path, genPages3, 'utf8');
      console.log('Updated profileHtml in gen_html_pages3.ps1');
    }
  }
}

console.log('Synchronization to generators complete!');
