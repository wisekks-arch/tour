const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'admin.html'),
  path.join(__dirname, '..', 'public', 'admin.html')
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Update script tags to new cache version
  content = content.replace(/<script src="js\/api\.js\?v=[^"]*"><\/script>/g, '<script src="js/api.js?v=20260911_v8smtp"></script>');
  content = content.replace(/<script src="js\/components\.js\?v=[^"]*"><\/script>/g, '<script src="js/components.js?v=20260911_v8smtp"></script>');

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated cache version in ${file}`);
});
