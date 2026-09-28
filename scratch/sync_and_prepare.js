const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');

// Files to sync from root to public/
const syncFiles = [
  { from: 'js/api.js', to: 'public/js/api.js' },
  { from: 'js/components.js', to: 'public/js/components.js' },
  { from: 'hotel-detail.html', to: 'public/hotel-detail.html' },
  { from: 'hotels.html', to: 'public/hotels.html' },
  { from: 'admin.html', to: 'public/admin.html' }
];

for (const item of syncFiles) {
  const src = path.join(baseDir, item.from);
  const dest = path.join(baseDir, item.to);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Synced ${item.from} -> ${item.to}`);
  }
}

// Update cache busting query strings
const htmlFiles = [
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

const newVersion = '20260928_hotel_photos_v5';

for (const file of htmlFiles) {
  const fullPath = path.join(baseDir, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(/js\/api\.js(\?v=[^"]*)?/g, `js/api.js?v=${newVersion}`);
    content = content.replace(/js\/components\.js(\?v=[^"]*)?/g, `js/components.js?v=${newVersion}`);
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Updated cache version in:', file);
  }
}

console.log('Sync and cache-busting complete!');
