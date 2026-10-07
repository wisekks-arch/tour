const fs = require('fs');
const https = require('https');
const http = require('http');

const products = JSON.parse(fs.readFileSync('d:/92.SW/shop/data/products.json', 'utf8'));

console.log('Total products to check:', products.length);

function checkUrl(url) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(url);
      const req = (parsed.protocol === 'https:' ? https : http).request(url, { method: 'HEAD', timeout: 4000 }, (res) => {
        resolve({ url, status: res.statusCode, ok: res.statusCode >= 200 && res.statusCode < 400 });
      });
      req.on('error', (err) => resolve({ url, status: 'ERROR', ok: false, error: err.message }));
      req.on('timeout', () => {
        req.destroy();
        resolve({ url, status: 'TIMEOUT', ok: false });
      });
      req.end();
    } catch (e) {
      resolve({ url, status: 'INVALID', ok: false, error: e.message });
    }
  });
}

async function run() {
  const brokenMap = [];
  
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const urlsToCheck = [p.thumbnail, ...(p.images || [])].filter(Boolean);
    const uniqueUrls = Array.from(new Set(urlsToCheck));
    
    for (const u of uniqueUrls) {
      const res = await checkUrl(u);
      if (!res.ok) {
        console.log(`[BROKEN] Prod #${p.id} (${p.name}): ${u} -> Status: ${res.status}`);
        brokenMap.push({ id: p.id, name: p.name, category: p.category, brokenUrl: u, status: res.status });
      }
    }
  }
  
  console.log(`\nFound ${brokenMap.length} broken image URLs across products.`);
}

run();
