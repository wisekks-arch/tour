const fs = require('fs');

const orders = JSON.parse(fs.readFileSync('d:/92.SW/shop/data/orders.json', 'utf8').replace(/^\uFEFF/, ''));
orders.forEach((o, i) => {
  console.log(`[${i + 1}] ID: ${o.orderId} | Date: ${o.orderDate} | Status: ${o.status} | Total: ${o.totalAmount} | Name: ${o.customerName}`);
});
