const fs = require('fs');

const comp = fs.readFileSync('d:/92.SW/shop/js/components.js', 'utf8');
const lines = comp.split('\n');
console.log('Lines 121-250:');
console.log(lines.slice(120, 250).join('\n'));
