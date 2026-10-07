const fs = require('fs');

const adminHtml = fs.readFileSync('d:/92.SW/shop/admin.html', 'utf8');
const scriptBlocks = adminHtml.match(/<script[\s\S]*?<\/script>/g);
const mainScript = scriptBlocks[7];
const lines = mainScript.split('\n');

console.log('Lines 451-650:');
console.log(lines.slice(450, 650).join('\n'));

console.log('\nLines 651-850:');
console.log(lines.slice(650, 850).join('\n'));
