const fs = require('fs');
const path = require('path');
const vm = require('vm');

const htmlFiles = [
  path.join(__dirname, '..', 'admin.html'),
  path.join(__dirname, '..', 'public', 'admin.html'),
  path.join(__dirname, '..', 'index.html'),
  path.join(__dirname, '..', 'public', 'index.html')
];

let totalScripts = 0;
let errors = 0;

htmlFiles.forEach(file => {
  const html = fs.readFileSync(file, 'utf8');
  const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let idx = 0;
  while ((match = scriptRegex.exec(html)) !== null) {
    const code = match[1].trim();
    if (!code) continue;
    // Skip if src attribute only
    if (/src\s*=\s*["']/i.test(match[0]) && code.length < 5) continue;
    
    totalScripts++;
    idx++;
    try {
      new vm.Script(code, { filename: `${path.basename(file)}_script_${idx}.js` });
    } catch (e) {
      console.error(`Syntax error in ${path.basename(file)} (script ${idx}):`, e.message);
      errors++;
    }
  }
});

console.log(`Checked ${totalScripts} inline scripts across HTML files. Total errors: ${errors}`);
if (errors > 0) process.exit(1);
