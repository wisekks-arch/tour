const fs = require('fs');
const path = require('path');

const apiJsPath = path.join(__dirname, '..', 'js', 'api.js');
let content = fs.readFileSync(apiJsPath, 'utf8');

// 1. Hotel: htl-jp-04 (슈잔테이 클럽 조잔케이 삿포로)
const jozankeiThumb = "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=85";
const jozankeiImages = [
  {
    url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=85",
    caption: "[슈잔테이 클럽 조잔케이 삿포로] 조잔케이 계곡 설경 속 전통 노천온천"
  },
  {
    url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85",
    caption: "[슈잔테이 클럽 조잔케이 삿포로] 프리미엄 다다미 화양실 & 프라이빗 히노키탕"
  },
  {
    url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=85",
    caption: "[슈잔테이 클럽 조잔케이 삿포로] 홋카이도 제철 해산물 & 특선 가이세키 정찬"
  }
];

// 2. Hotel: htl-us-01 (할레쿨라니 하와이 오아후)
const halekulaniThumb = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85";
const halekulaniImages = [
  {
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    caption: "[할레쿨라니 하와이 오아후] 와이키키 해변 카틀레야 난초 모자이크 풀 & 비치"
  },
  {
    url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
    caption: "[할레쿨라니 하와이 오아후] 다이아몬드헤드 오션프론트 프라임 스위트"
  },
  {
    url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
    caption: "[할레쿨라니 하와이 오아후] 라 메르(La Mer) 프렌치 오션뷰 선셋 다이닝"
  }
];

// Update htl-jp-04
const jozankeiRegex = /\{\s*"id":\s*"htl-jp-04"[\s\S]*?"id":\s*"htl-jp-05"/;
const matchJp = content.match(jozankeiRegex);
if (matchJp) {
  let updatedJp = matchJp[0].replace(
    /"thumbnail":\s*"[^"]*"/,
    `"thumbnail": ${JSON.stringify(jozankeiThumb)}`
  );
  updatedJp = updatedJp.replace(
    /"images":\s*\[[\s\S]*?\],(\s*"amenities")/,
    `"images": ${JSON.stringify(jozankeiImages, null, 6)},\n    $1`
  );
  content = content.replace(matchJp[0], updatedJp);
  console.log('Updated htl-jp-04 in js/api.js');
} else {
  console.error('htl-jp-04 match not found');
}

// Update htl-us-01
const halekulaniRegex = /\{\s*"id":\s*"htl-us-01"[\s\S]*?"id":\s*"htl-us-02"/;
const matchUs = content.match(halekulaniRegex);
if (matchUs) {
  let updatedUs = matchUs[0].replace(
    /"thumbnail":\s*"[^"]*"/,
    `"thumbnail": ${JSON.stringify(halekulaniThumb)}`
  );
  updatedUs = updatedUs.replace(
    /"images":\s*\[[\s\S]*?\],(\s*"amenities")/,
    `"images": ${JSON.stringify(halekulaniImages, null, 6)},\n    $1`
  );
  content = content.replace(matchUs[0], updatedUs);
  console.log('Updated htl-us-01 in js/api.js');
} else {
  console.error('htl-us-01 match not found');
}

fs.writeFileSync(apiJsPath, content, 'utf8');
console.log('Successfully saved changes to js/api.js');
