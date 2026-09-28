const fs = require('fs');
const path = require('path');

const apiJsPath = path.join(__dirname, '..', 'js', 'api.js');
let content = fs.readFileSync(apiJsPath, 'utf8');

const newThumbnail = "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=85";
const newImages = [
  {
    url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=85",
    caption: "[슈잔테이 클럽 조잔케이 삿포로] 조잔케이 계곡 설경 속 노천온천"
  },
  {
    url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85",
    caption: "[슈잔테이 클럽 조잔케이 삿포로] 프리미엄 다다미 화양실 & 프라이빗 온천"
  },
  {
    url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=85",
    caption: "[슈잔테이 클럽 조잔케이 삿포로] 홋카이도 제철 해산물 & 특선 가이세키 정찬"
  }
];

// Replace the htl-jp-04 block in DEFAULT_HOTELS
const htlBlockRegex = /\{\s*"id":\s*"htl-jp-04"[\s\S]*?"id":\s*"htl-jp-05"/;
const match = content.match(htlBlockRegex);

if (match) {
  const oldBlock = match[0];
  // Replace thumbnail and images in oldBlock
  let updatedBlock = oldBlock.replace(
    /"thumbnail":\s*"[^"]*"/,
    `"thumbnail": ${JSON.stringify(newThumbnail)}`
  );
  
  updatedBlock = updatedBlock.replace(
    /"images":\s*\[[\s\S]*?\],(\s*"amenities")/,
    `"images": ${JSON.stringify(newImages, null, 6)},\n    $1`
  );

  content = content.replace(oldBlock, updatedBlock);
  fs.writeFileSync(apiJsPath, content, 'utf8');
  console.log('Successfully updated htl-jp-04 images in js/api.js');
} else {
  console.error('Could not find htl-jp-04 in js/api.js');
}
