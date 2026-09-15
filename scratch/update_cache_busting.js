const fs = require('fs');
const path = require('path');

const baseDir = 'd:\\92.SW\\tour';
const files = [
  'index.html',
  'admin.html',
  'packages.html',
  'package-detail.html',
  'booking.html',
  'contact.html',
  'about.html',
  'public/index.html',
  'public/admin.html',
  'public/packages.html',
  'public/package-detail.html',
  'public/booking.html',
  'public/contact.html',
  'public/about.html'
];

const newVersion = '20260915_all_users_smtp';

for (const file of files) {
  const fullPath = path.join(baseDir, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(/js\/api\.js(\?v=[^"]*)?/g, `js/api.js?v=${newVersion}`);
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Updated cache version in:', file);
  }
}
