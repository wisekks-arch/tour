const fs = require('fs');
const path = require('path');
const vm = require('vm');

function getAllFiles(dir, ext) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== '.git' && file !== 'node_modules') {
        results = results.concat(getAllFiles(fullPath, ext));
      }
    } else if (file.endsWith(ext)) {
      results.push(fullPath);
    }
  });
  return results;
}

let errorCount = 0;

// Validate JS files
const jsFiles = getAllFiles('.', '.js');
console.log(`Validating ${jsFiles.length} JS files...`);
jsFiles.forEach(file => {
  try {
    const code = fs.readFileSync(file, 'utf8');
    new vm.Script(code, { filename: path.basename(file) });
  } catch (err) {
    console.error(`JS Syntax Error in ${file}:`, err.message);
    errorCount++;
  }
});

// Validate HTML inline scripts
const htmlFiles = getAllFiles('.', '.html');
console.log(`Validating ${htmlFiles.length} HTML files...`);
htmlFiles.forEach(file => {
  const html = fs.readFileSync(file, 'utf8');
  const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let idx = 0;
  while ((match = scriptRegex.exec(html)) !== null) {
    const code = match[1].trim();
    if (!code || (/src\s*=\s*["']/i.test(match[0]) && code.length < 5)) continue;
    idx++;
    try {
      new vm.Script(code, { filename: `${path.basename(file)}_script_${idx}` });
    } catch (err) {
      console.error(`HTML Script Syntax Error in ${file} (script ${idx}):`, err.message);
      errorCount++;
    }
  }
});

console.log(`Validation Complete. Total Errors: ${errorCount}`);
if (errorCount > 0) process.exit(1);
