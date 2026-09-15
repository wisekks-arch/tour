const fs = require('fs');
const path = require('path');

const targetFiles = [
  path.join(__dirname, '..', 'index.html'),
  path.join(__dirname, '..', 'packages.html'),
  path.join(__dirname, '..', 'package-detail.html'),
  path.join(__dirname, '..', 'booking.html'),
  path.join(__dirname, '..', 'contact.html'),
  path.join(__dirname, '..', 'about.html'),
  path.join(__dirname, '..', 'admin.html'),
  path.join(__dirname, '..', 'public', 'index.html'),
  path.join(__dirname, '..', 'public', 'packages.html'),
  path.join(__dirname, '..', 'public', 'package-detail.html'),
  path.join(__dirname, '..', 'public', 'booking.html'),
  path.join(__dirname, '..', 'public', 'contact.html'),
  path.join(__dirname, '..', 'public', 'about.html'),
  path.join(__dirname, '..', 'public', 'admin.html')
];

targetFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Replace absolute leading slashes
  content = content.replace(/href="\/contact\.html"/g, 'href="contact.html"');
  content = content.replace(/href="\/packages\.html"/g, 'href="packages.html"');
  content = content.replace(/href="\/package-detail\.html/g, 'href="package-detail.html');
  content = content.replace(/href="\/booking\.html/g, 'href="booking.html');
  content = content.replace(/href="\/about\.html"/g, 'href="about.html"');
  content = content.replace(/href="\/admin\.html"/g, 'href="admin.html"');
  content = content.replace(/href="\/index\.html"/g, 'href="index.html"');
  content = content.replace(/href="\/"/g, 'href="index.html"');

  // Cache busting scripts in contact.html
  if (path.basename(file) === 'contact.html') {
    content = content.replace(/<script src="js\/api\.js(\?[^"]*)?"><\/script>/g, '<script src="js/api.js?v=20260911_v9inquiry"></script>');
    content = content.replace(/<script src="js\/components\.js(\?[^"]*)?"><\/script>/g, '<script src="js/components.js?v=20260911_v9inquiry"></script>');
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Cleaned links in ${path.relative(path.join(__dirname, '..'), file)}`);
});
