const fs = require('fs');
const https = require('https');
const http = require('http');

// 1. 카테고리별 고화질 검증 대상 이미지 풀
const candidatePool = {
  '패션/의류': [
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80'
  ],
  '디지털/가전': [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80'
  ],
  '뷰티/헬스': [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1512290900672-1f5be17038a8?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1608248597249-c974907a4ee3?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80'
  ],
  '홈/리빙': [
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80'
  ],
  '스포츠/레저': [
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1000&q=80'
  ],
  '푸드/신선': [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=80'
  ]
};

function checkUrl(url) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(url);
      const req = (parsed.protocol === 'https:' ? https : http).request(url, { method: 'HEAD', timeout: 3500 }, (res) => {
        resolve({ url, status: res.statusCode, ok: res.statusCode >= 200 && res.statusCode < 400 });
      });
      req.on('error', () => resolve({ url, status: 'ERROR', ok: false }));
      req.on('timeout', () => { req.destroy(); resolve({ url, status: 'TIMEOUT', ok: false }); });
      req.end();
    } catch (e) {
      resolve({ url, status: 'INVALID', ok: false });
    }
  });
}

async function validatePool() {
  console.log('Validating image pools...');
  const validatedPool = {};
  for (const cat of Object.keys(candidatePool)) {
    validatedPool[cat] = [];
    for (const url of candidatePool[cat]) {
      const res = await checkUrl(url);
      if (res.ok) {
        validatedPool[cat].push(url);
      } else {
        console.warn(`[REMOVED POOL URL] ${cat}: ${url}`);
      }
    }
    console.log(`Category "${cat}" validated: ${validatedPool[cat].length} valid images.`);
  }
  return validatedPool;
}

async function fixAllProducts() {
  const validatedPool = await validatePool();
  const productsPath = 'd:/92.SW/shop/data/products.json';
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

  let fixedCount = 0;

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const cat = p.category || '패션/의류';
    const pool = validatedPool[cat] || validatedPool['패션/의류'];

    let originalUrls = [p.thumbnail, ...(p.images || [])].filter(Boolean);
    let validUrls = [];

    for (const u of originalUrls) {
      const res = await checkUrl(u);
      if (res.ok && !validUrls.includes(u)) {
        validUrls.push(u);
      } else if (!res.ok) {
        console.log(`[FIXING] ${p.id} (${p.name}): Replacing broken ${u}`);
        fixedCount++;
      }
    }

    // 최소 4개 이상 유효 이미지 확보
    let poolIdx = (i * 2) % pool.length;
    while (validUrls.length < 4) {
      const candidate = pool[poolIdx % pool.length];
      if (!validUrls.includes(candidate)) {
        validUrls.push(candidate);
      }
      poolIdx++;
    }

    p.thumbnail = validUrls[0];
    p.images = validUrls;
  }

  console.log(`\nSuccessfully fixed all broken images! (Total replacements: ${fixedCount})`);

  // Write back to products.json and public/data/products.json
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');
  fs.writeFileSync('d:/92.SW/shop/public/data/products.json', JSON.stringify(products, null, 2), 'utf8');

  // Also update js/api.js and public/js/api.js DEFAULT_PRODUCTS
  let apiJs = fs.readFileSync('d:/92.SW/shop/js/api.js', 'utf8');
  const marker = 'const DEFAULT_PRODUCTS = ';
  const startIdx = apiJs.indexOf(marker);
  if (startIdx !== -1) {
    const jsonStart = startIdx + marker.length;
    const inqIdx = apiJs.indexOf('const DEFAULT_INQUIRIES', jsonStart);
    if (inqIdx !== -1) {
      const newApiJs = apiJs.substring(0, jsonStart) + JSON.stringify(products, null, 2) + ';\n\n' + apiJs.substring(inqIdx);
      fs.writeFileSync('d:/92.SW/shop/js/api.js', newApiJs, 'utf8');
      fs.writeFileSync('d:/92.SW/shop/public/js/api.js', newApiJs, 'utf8');
      console.log('Successfully updated js/api.js and public/js/api.js');
    }
  }
}

fixAllProducts();
