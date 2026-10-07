const fs = require('fs');
const path = require('path');
const vm = require('vm');

const shopDir = 'd:/92.SW/shop';
const files = fs.readdirSync(shopDir);
let hasError = false;

console.log('=== VALIDATING ALL SHOP FILES FOR SCRIPT SYNTAX ERRORS ===');

files.forEach(file => {
  const fullPath = path.join(shopDir, file);
  const stat = fs.statSync(fullPath);

  if (stat.isFile() && file.endsWith('.html')) {
    const html = fs.readFileSync(fullPath, 'utf8');
    const scriptRegex = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    let count = 0;

    while ((match = scriptRegex.exec(html)) !== null) {
      count++;
      const code = match[1];
      try {
        new vm.Script(code);
      } catch (err) {
        hasError = true;
        console.error(`❌ SYNTAX ERROR in ${file} (Script #${count}):`, err.message);
      }
    }
    console.log(`✅ Validated ${file}: ${count} inline script blocks checked.`);
  }

  if (stat.isFile() && file.endsWith('.js')) {
    const js = fs.readFileSync(fullPath, 'utf8');
    try {
      new vm.Script(js);
      console.log(`✅ Validated ${file}: Valid JS syntax.`);
    } catch (err) {
      hasError = true;
      console.error(`❌ SYNTAX ERROR in ${file}:`, err.message);
    }
  }
});

// Also check js/ directory
const jsDir = path.join(shopDir, 'js');
if (fs.existsSync(jsDir)) {
  fs.readdirSync(jsDir).forEach(file => {
    if (file.endsWith('.js')) {
      const js = fs.readFileSync(path.join(jsDir, file), 'utf8');
      try {
        new vm.Script(js);
        console.log(`✅ Validated js/${file}: Valid JS syntax.`);
      } catch (err) {
        hasError = true;
        console.error(`❌ SYNTAX ERROR in js/${file}:`, err.message);
      }
    }
  });
}

if (!hasError) {
  console.log('\n🎉 ALL EASYSHOP FILES PASSED SCRIPT SYNTAX VALIDATION WITH 0 ERRORS!');
} else {
  console.error('\n⚠️ VALIDATION FAILED!');
  process.exit(1);
}
