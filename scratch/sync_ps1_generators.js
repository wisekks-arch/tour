const fs = require('fs');
const path = require('path');

const tourDir = 'd:/92.SW/tour';
const shopDir = 'd:/92.SW/shop';

const ps1Files = ['gen_html_pages.ps1', 'gen_html_pages2.ps1', 'gen_html_pages3.ps1', 'gen_admin_html.ps1'];

ps1Files.forEach(file => {
  const filePath = path.join(tourDir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace <script src="js/components.js"> or <script src="/js/components.js"> if auth-store.js is not before it
  // Notice in PS1, we can do replacement if it's missing
  const regex = /(?<!auth-store\.js[\s\S]{0,100})(<script\s+src=["'](?:\/)?js\/components\.js["']>)/gi;
  
  // A safer line-by-line or match-by-match check
  const lines = content.split('\n');
  const newLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if ((line.includes('js/components.js') || line.includes('/js/components.js')) && !line.includes('auth-store.js')) {
      const prevLine = i > 0 ? lines[i - 1] : '';
      if (!prevLine.includes('auth-store.js')) {
        const indent = line.match(/^\s*/)[0];
        const isSlash = line.includes('/js/components.js');
        const scriptTag = isSlash ? `<script src="/js/auth-store.js"></script>` : `<script src="js/auth-store.js"></script>`;
        newLines.push(`${indent}${scriptTag}`);
        changed = true;
      }
    }
    newLines.push(line);
  }

  if (changed) {
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
    console.log(`Updated ${file} with auth-store.js`);
  }
});
