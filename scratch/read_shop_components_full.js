const fs = require('fs');

const comp = fs.readFileSync('d:/92.SW/shop/js/components.js', 'utf8');
console.log('Total length of shop/js/components.js:', comp.length);
console.log(comp.slice(0, 4000));
