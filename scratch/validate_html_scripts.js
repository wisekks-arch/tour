const fs = require('fs');
const path = require('path');
const vm = require('vm');

const htmlFiles = [
  path.join(__dirname, '..', 'admin.html'),
  path.join(__dirname, '..', 'public', 'admin.html'),
  path.join(__dirname, '..', 'hotels.html'),
  path.join(__dirname, '..', 'public', 'hotels.html'),
  path.join(__dirname, '..', 'index.html'),
  path.join(__dirname, '..', 'public', 'index.html'),
  path.join(__dirname, '..', 'reviews.html'),
  path.join(__dirname, '..', 'public', 'reviews.html'),
  path.join(__dirname, '..', 'package-detail.html'),
  path.join(__dirname, '..', 'public', 'package-detail.html'),
  path.join(__dirname, '..', 'packages.html'),
  path.join(__dirname, '..', 'public', 'packages.html'),
  path.join(__dirname, '..', 'booking.html'),
  path.join(__dirname, '..', 'public', 'booking.html'),
  path.join(__dirname, '..', 'about.html'),
  path.join(__dirname, '..', 'public', 'about.html'),
  path.join(__dirname, '..', 'contact.html'),
  path.join(__dirname, '..', 'public', 'contact.html')
];

const jsFiles = [
  path.join(__dirname, '..', 'js', 'api.js'),
  path.join(__dirname, '..', 'public', 'js', 'api.js'),
  path.join(__dirname, '..', 'js', 'components.js'),
  path.join(__dirname, '..', 'public', 'js', 'components.js')
];

let totalScripts = 0;
let errors = 0;

// 1. Validate JS Files
jsFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  const code = fs.readFileSync(file, 'utf8');
  totalScripts++;
  try {
    new vm.Script(code, { filename: path.basename(file) });
  } catch (e) {
    console.error(`Syntax error in JS file ${path.basename(file)}:`, e.message);
    errors++;
  }
});

// 2. Validate HTML inline scripts
htmlFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  const html = fs.readFileSync(file, 'utf8');
  const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let idx = 0;
  while ((match = scriptRegex.exec(html)) !== null) {
    const code = match[1].trim();
    if (!code) continue;
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

console.log(`Checked ${totalScripts} scripts/files across the project. Total errors: ${errors}`);
if (errors > 0) process.exit(1);
