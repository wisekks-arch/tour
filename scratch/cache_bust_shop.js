const fs = require('fs');
const path = require('path');

const shopDir = 'd:/92.SW/shop';
const publicDir = path.join(shopDir, 'public');

const files = fs.readdirSync(shopDir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  const full = path.join(shopDir, f);
  let content = fs.readFileSync(full, 'utf8');

  // Update css and js with ?v=20261006_v9
  content = content.replace(/href="css\/style\.css(?:\?[^"]*)?"/g, 'href="css/style.css?v=20261006_v9"');
  content = content.replace(/src="js\/api\.js(?:\?[^"]*)?"/g, 'src="js/api.js?v=20261006_v9"');
  content = content.replace(/src="js\/components\.js(?:\?[^"]*)?"/g, 'src="js/components.js?v=20261006_v9"');
  content = content.replace(/src="js\/cart-store\.js(?:\?[^"]*)?"/g, 'src="js/cart-store.js?v=20261006_v9"');

  fs.writeFileSync(full, content, 'utf8');
  fs.writeFileSync(path.join(publicDir, f), content, 'utf8');
  console.log(`Updated cache-busting in: ${f}`);
});

console.log('All SHOP HTML files cache-busted successfully!');
