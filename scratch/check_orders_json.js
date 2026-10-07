const fs = require('fs');

const orders = JSON.parse(fs.readFileSync('d:/92.SW/shop/data/orders.json', 'utf8').replace(/^\uFEFF/, ''));
console.log('Total orders:', orders.length);
console.log('Sample order structure:', JSON.stringify(orders[0], null, 2));
