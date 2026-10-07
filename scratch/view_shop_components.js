const fs = require('fs');

const comp = fs.readFileSync('d:/92.SW/shop/js/components.js', 'utf8');
const lines = comp.split('\n');
console.log('Lines 1-120:');
console.log(lines.slice(0, 120).join('\n'));
