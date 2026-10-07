const fs = require('fs');

const adminHtml = fs.readFileSync('d:/92.SW/shop/admin.html', 'utf8');
const scriptBlocks = adminHtml.match(/<script[\s\S]*?<\/script>/g);
const mainScript = scriptBlocks[7];
const lines = mainScript.split('\n');

console.log('Lines 851-end:');
console.log(lines.slice(850).join('\n'));
