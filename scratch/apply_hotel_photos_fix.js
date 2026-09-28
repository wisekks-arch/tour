const fs = require('fs');
const path = require('path');

const apiJsPath = path.join(__dirname, '..', 'js', 'api.js');
let apiContent = fs.readFileSync(apiJsPath, 'utf8');

// 1. New Hotel Data for htl-jp-04 (슈잔테이 클럽 조잔케이 삿포로)
const jozankeiThumb = "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=85";
const jozankeiImages = [
  {
    url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=85",
    caption: "[슈잔테이 클럽 조잔케이 삿포로] 조잔케이 천연 온천 료칸 전통 정원 및 외관"
  },
  {
    url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=85",
    caption: "[슈잔테이 클럽 조잔케이 삿포로] 조잔케이 계곡 설경 조망 프라이빗 노천 온천탕"
  },
  {
    url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=85",
    caption: "[슈잔테이 클럽 조잔케이 삿포로] 홋카이도 제철 해산물 & 명품 가이세키 요리"
  }
];

// 2. New Hotel Data for htl-us-01 (할레쿨라니 하와이 오아후)
const halekulaniThumb = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85";
const halekulaniImages = [
  {
    url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85",
    caption: "[할레쿨라니 하와이 오아후] 와이키키 해변 카틀레야 모자이크 수영장 & 에메랄드 오션"
  },
  {
    url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=85",
    caption: "[할레쿨라니 하와이 오아후] 다이아몬드헤드 조망 오션프론트 프라임 스위트"
  },
  {
    url: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=85",
    caption: "[할레쿨라니 하와이 오아후] 라 메르(La Mer) 프렌치 오션뷰 선셋 다이닝"
  }
];

// Update htl-jp-04 in js/api.js
const jozankeiRegex = /\{\s*"id":\s*"htl-jp-04"[\s\S]*?"id":\s*"htl-jp-05"/;
const matchJp = apiContent.match(jozankeiRegex);
if (matchJp) {
  let updatedJp = matchJp[0].replace(
    /"thumbnail":\s*"[^"]*"/,
    `"thumbnail": ${JSON.stringify(jozankeiThumb)}`
  );
  updatedJp = updatedJp.replace(
    /"images":\s*\[[\s\S]*?\],(\s*"amenities")/,
    `"images": ${JSON.stringify(jozankeiImages, null, 6)},\n    $1`
  );
  apiContent = apiContent.replace(matchJp[0], updatedJp);
  console.log('Updated htl-jp-04 in js/api.js');
}

// Update htl-us-01 in js/api.js
const halekulaniRegex = /\{\s*"id":\s*"htl-us-01"[\s\S]*?"id":\s*"htl-us-02"/;
const matchUs = apiContent.match(halekulaniRegex);
if (matchUs) {
  let updatedUs = matchUs[0].replace(
    /"thumbnail":\s*"[^"]*"/,
    `"thumbnail": ${JSON.stringify(halekulaniThumb)}`
  );
  updatedUs = updatedUs.replace(
    /"images":\s*\[[\s\S]*?\],(\s*"amenities")/,
    `"images": ${JSON.stringify(halekulaniImages, null, 6)},\n    $1`
  );
  apiContent = apiContent.replace(matchUs[0], updatedUs);
  console.log('Updated htl-us-01 in js/api.js');
}

// Upgrade localStorage key to 'toureasy_hotels_v4' across js/api.js
apiContent = apiContent.replace(/'toureasy_hotels'/g, "'toureasy_hotels_v4'");
apiContent = apiContent.replace(/"toureasy_hotels"/g, '"toureasy_hotels_v4"');

fs.writeFileSync(apiJsPath, apiContent, 'utf8');
console.log('Successfully updated js/api.js with new images and toureasy_hotels_v4 storage key!');

// 3. Update hotel-detail.html with fallback onerror
const hotelDetailPath = path.join(__dirname, '..', 'hotel-detail.html');
let hotelDetailContent = fs.readFileSync(hotelDetailPath, 'utf8');

// Ensure fallback image in main photo
hotelDetailContent = hotelDetailContent.replace(
  '<img id="main-hotel-img" src="" alt="Hotel Main Photo" class="w-full h-full object-cover transition duration-500">',
  '<img id="main-hotel-img" src="" alt="Hotel Main Photo" class="w-full h-full object-cover transition duration-500" onerror="this.src=\'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85\'">'
);

fs.writeFileSync(hotelDetailPath, hotelDetailContent, 'utf8');
console.log('Successfully updated hotel-detail.html with fallback onerror!');
