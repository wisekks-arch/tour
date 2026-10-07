const fs = require('fs');

const adminHtml = fs.readFileSync('d:/92.SW/shop/admin.html', 'utf8');
const scriptBlocks = adminHtml.match(/<script[\s\S]*?<\/script>/g);
const mainScript = scriptBlocks[7];

const lines = mainScript.split('\n');
console.log('Total lines in main script:', lines.length);
console.log('Lines 1-80:');
console.log(lines.slice(0, 80).join('\n'));
console.log('\nLines 81-160:');
console.log(lines.slice(80, 160).join('\n'));
