const fs = require('fs');

let detailHtml = fs.readFileSync('d:/92.SW/shop/product-detail.html', 'utf8');

// 1. Update setMainImage function
const oldSetMainImage = `    function setMainImage(src) {
      document.getElementById('main-product-image').src = src;
    }`;

const newSetMainImage = `    function setMainImage(src, btn = null) {
      const mainImg = document.getElementById('main-product-image');
      if (mainImg) {
        mainImg.style.opacity = '0.6';
        setTimeout(() => {
          mainImg.src = src;
          mainImg.style.opacity = '1';
        }, 120);
      }
      const allBtns = document.querySelectorAll('#thumbnail-gallery button');
      allBtns.forEach(b => {
        b.classList.remove('border-indigo-600', 'ring-2', 'ring-indigo-300', 'shadow-md');
        b.classList.add('border-slate-200');
      });
      if (btn) {
        btn.classList.remove('border-slate-200');
        btn.classList.add('border-indigo-600', 'ring-2', 'ring-indigo-300', 'shadow-md');
      }
    }`;

if (detailHtml.includes(oldSetMainImage)) {
  detailHtml = detailHtml.replace(oldSetMainImage, newSetMainImage);
  console.log('Replaced setMainImage function successfully.');
} else {
  console.log('Could not find oldSetMainImage in product-detail.html');
}

// 2. Enhance Gallery Thumbnails rendering & Detail Photo Gallery Section
const oldGalleryRender = `      // Gallery Thumbnails
      const thumbsContainer = document.getElementById('thumbnail-gallery');
      const allImages = p.images && p.images.length > 0 ? p.images : [p.thumbnail];
      thumbsContainer.innerHTML = allImages.map((img, i) => \`
        <button onclick="setMainImage('\${img}')" class="w-16 h-16 rounded-xl overflow-hidden border-2 hover:border-indigo-600 transition shrink-0 \${i === 0 ? 'border-indigo-600' : 'border-slate-200'}">
          <img src="\${img}" alt="썸네일" class="w-full h-full object-cover" />
        </button>
      \`).join('');`;

const newGalleryRender = `      // Gallery Thumbnails (3~5 images)
      const thumbsContainer = document.getElementById('thumbnail-gallery');
      const allImages = p.images && p.images.length > 0 ? p.images : [p.thumbnail];
      thumbsContainer.innerHTML = allImages.map((img, i) => \`
        <button onclick="setMainImage('\${img}', this)" class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 hover:border-indigo-600 transition-all shrink-0 cursor-pointer shadow-xs \${i === 0 ? 'border-indigo-600 ring-2 ring-indigo-300 shadow-md' : 'border-slate-200'}">
          <img src="\${img}" alt="상품 이미지 \${i+1}" class="w-full h-full object-cover hover:scale-105 transition duration-200" />
        </button>
      \`).join('');`;

if (detailHtml.includes(oldGalleryRender)) {
  detailHtml = detailHtml.replace(oldGalleryRender, newGalleryRender);
  console.log('Replaced gallery thumbnails rendering successfully.');
} else {
  console.log('Could not find oldGalleryRender');
}

// 3. Enhance Description with Photo Gallery
const oldDescRender = `      // Description HTML
      document.getElementById('product-html-description').innerHTML = p.description || p.summary;`;

const newDescRender = `      // Description HTML + Photo Gallery Section
      let detailContent = p.description || \`<p class="text-base text-slate-700 leading-relaxed font-medium">\${p.summary || ''}</p>\`;
      if (allImages.length > 1) {
        detailContent += \`
          <div class="mt-12 pt-8 border-t border-slate-100 space-y-6">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-6 bg-indigo-600 rounded-full"></span>
              <h4 class="text-lg font-black text-slate-900">상품 디테일 포토 갤러리 (\${allImages.length}컷)</h4>
            </div>
            <div class="space-y-4">
              \${allImages.map((img, idx) => \`
                <div class="rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 bg-slate-50">
                  <img src="\${img}" alt="상품 상세 컷 \${idx + 1}" class="w-full h-auto max-h-[600px] object-cover hover:scale-101 transition duration-300" loading="lazy" />
                  <div class="p-3 bg-white/90 text-right text-xs text-slate-500 font-bold border-t border-slate-100">
                    \${p.name} - 상세 뷰 #0\${idx + 1}
                  </div>
                </div>
              \`).join('')}
            </div>
          </div>
        \`;
      }
      document.getElementById('product-html-description').innerHTML = detailContent;`;

if (detailHtml.includes(oldDescRender)) {
  detailHtml = detailHtml.replace(oldDescRender, newDescRender);
  console.log('Replaced product-html-description rendering successfully.');
} else {
  console.log('Could not find oldDescRender');
}

fs.writeFileSync('d:/92.SW/shop/product-detail.html', detailHtml, 'utf8');
fs.writeFileSync('d:/92.SW/shop/public/product-detail.html', detailHtml, 'utf8');
console.log('Finished updating product-detail.html and public/product-detail.html');
