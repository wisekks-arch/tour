const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');
const files = [
  'index.html',
  'admin.html',
  'hotels.html',
  'hotel-detail.html',
  'reviews.html',
  'packages.html',
  'package-detail.html',
  'booking.html',
  'contact.html',
  'about.html',
  'public/index.html',
  'public/admin.html',
  'public/hotels.html',
  'public/hotel-detail.html',
  'public/reviews.html',
  'public/packages.html',
  'public/package-detail.html',
  'public/booking.html',
  'public/contact.html',
  'public/about.html'
];

const newVersion = '20260928_hotel_detail';

for (const file of files) {
  const fullPath = path.join(baseDir, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(/js\/api\.js(\?v=[^"]*)?/g, `js/api.js?v=${newVersion}`);
    content = content.replace(/js\/components\.js(\?v=[^"]*)?/g, `js/components.js?v=${newVersion}`);
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Updated cache version in:', file);
  }
}
