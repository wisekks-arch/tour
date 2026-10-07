const fs = require('fs');

const adminHtml = fs.readFileSync('d:/92.SW/shop/admin.html', 'utf8');
const scriptBlocks = adminHtml.match(/<script[\s\S]*?<\/script>/g);
const mainScript = scriptBlocks[7];
const lines = mainScript.split('\n');

console.log('Lines 161-300:');
console.log(lines.slice(160, 300).join('\n'));

console.log('\nLines 301-450:');
console.log(lines.slice(300, 450).join('\n'));
