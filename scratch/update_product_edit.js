const fs = require('fs');

let editHtml = fs.readFileSync('d:/92.SW/shop/product-edit.html', 'utf8');

// 1. Replace the single image input section in product-edit.html
const oldImageInput = `          <!-- Image URL Input -->
          <div class="text-xs space-y-2 pt-2">
            <label class="block font-bold text-slate-700">대표 썸네일 이미지 URL *</label>
            <input type="text" id="edit-thumbnail" required oninput="updateLivePreview()" placeholder="https://images.unsplash.com/..." class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:bg-white focus:border-indigo-500 transition">
          </div>`;

const newImageInput = `          <!-- Product Images Management (Up to 5 images, PC upload + URL) -->
          <div class="space-y-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs">
            <div class="flex items-center justify-between">
              <label class="block font-bold text-slate-800 flex items-center gap-1.5">
                <i data-lucide="images" class="w-4 h-4 text-indigo-600"></i>
                상품 상세 이미지 <span class="text-slate-500 font-normal">(PC 사진 최대 5장)</span>
              </label>
              <span id="edit-img-count-badge" class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-700">0 / 5장</span>
            </div>

            <!-- PC Upload Dropzone -->
            <div id="edit-img-dropzone" onclick="document.getElementById('edit-file-input').click()" 
                 class="border-2 border-dashed border-indigo-200 hover:border-indigo-500 bg-white hover:bg-indigo-50/40 rounded-xl p-3 text-center cursor-pointer transition flex flex-col items-center justify-center gap-1 group">
              <input type="file" id="edit-file-input" multiple accept="image/*" class="hidden" onchange="handleEditFileUpload(event)" />
              <div class="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition">
                <i data-lucide="upload-cloud" class="w-4 h-4"></i>
              </div>
              <p class="text-xs font-bold text-slate-700">📁 내 PC 사진 선택하여 추가 (최대 5장)</p>
              <p class="text-[10px] text-slate-400">JPG, PNG, WEBP 지원 (자동 최적화)</p>
            </div>

            <!-- URL Direct Add Row -->
            <div class="flex gap-2">
              <input type="url" id="edit-img-url-input" placeholder="웹 이미지 URL (https://...)" 
                     class="flex-1 p-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none bg-white" />
              <button type="button" onclick="handleAddEditImageUrl()" 
                      class="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1">
                <i data-lucide="plus" class="w-3.5 h-3.5"></i>추가
              </button>
            </div>

            <!-- 5 Images Preview Grid -->
            <div id="edit-img-preview-grid" class="grid grid-cols-5 gap-1.5 pt-1">
              <!-- Rendered by JS -->
            </div>
            <input type="hidden" id="edit-thumbnail" />
          </div>`;

if (editHtml.includes(oldImageInput)) {
  editHtml = editHtml.replace(oldImageInput, newImageInput);
  console.log('Replaced product-edit.html image UI successfully.');
} else {
  console.log('Could not find oldImageInput in product-edit.html');
}

// 2. Add functions & update logic in product-edit.html
const oldScriptTarget = `          document.getElementById('edit-thumbnail').value = originalProduct.thumbnail || (originalProduct.images && originalProduct.images[0]) || '';`;

const newScriptTarget = `          if (originalProduct.images && originalProduct.images.length > 0) {
            editProductImages = [...originalProduct.images];
          } else if (originalProduct.thumbnail) {
            editProductImages = [originalProduct.thumbnail];
          } else {
            editProductImages = ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80'];
          }
          renderEditImagePreviews();`;

if (editHtml.includes(oldScriptTarget)) {
  editHtml = editHtml.replace(oldScriptTarget, newScriptTarget);
  console.log('Replaced edit-thumbnail assignment in product-edit.html');
} else {
  console.log('Could not find oldScriptTarget');
}

// 3. Add editProductImages helpers and update updateLivePreview & submitProductForm
const scriptHelperHeader = `    let currentProductId = null;
    let originalProduct = null;
    let editProductImages = [];

    function renderEditImagePreviews() {
      const container = document.getElementById('edit-img-preview-grid');
      const countBadge = document.getElementById('edit-img-count-badge');
      if (!container) return;

      if (countBadge) {
        countBadge.innerText = editProductImages.length + ' / 5장';
      }

      let html = '';
      for (let i = 0; i < 5; i++) {
        const img = editProductImages[i];
        if (img) {
          const isMain = i === 0;
          html += '<div class="relative group rounded-xl overflow-hidden border-2 ' + (isMain ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-slate-200') + ' bg-slate-100 aspect-square flex items-center justify-center shadow-xs">' +
            '<img src="' + img + '" alt="사진 ' + (i+1) + '" class="w-full h-full object-cover" />' +
            (isMain ? '<span class="absolute top-1 left-1 bg-indigo-600 text-white text-[8px] font-black px-1 py-0.5 rounded shadow">대표</span>' : 
              '<button type="button" onclick="setEditMainImage(' + i + ')" title="대표 사진으로 설정" class="absolute bottom-1 left-1 right-1 bg-slate-900/85 hover:bg-indigo-600 text-white text-[8px] font-bold py-0.5 rounded opacity-0 group-hover:opacity-100 transition text-center">대표</button>') +
            '<button type="button" onclick="removeEditImage(' + i + ')" title="삭제" class="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold hover:bg-rose-700 shadow transition opacity-90 group-hover:opacity-100">✕</button>' +
          '</div>';
        } else {
          html += '<div onclick="document.getElementById(\\'edit-file-input\\').click()" class="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl aspect-square flex flex-col items-center justify-center text-slate-400 hover:text-indigo-600 cursor-pointer transition bg-white/60 hover:bg-indigo-50/20">' +
            '<i data-lucide="image-plus" class="w-3.5 h-3.5 mb-0.5"></i>' +
            '<span class="text-[9px] font-bold">+추가</span>' +
          '</div>';
        }
      }
      container.innerHTML = html;
      if (document.getElementById('edit-thumbnail')) {
        document.getElementById('edit-thumbnail').value = editProductImages[0] || '';
      }
      updateLivePreview();
      if (window.lucide) lucide.createIcons();
    }

    function resizeImageFile(file, maxWidth, maxHeight, quality) {
      maxWidth = maxWidth || 1000;
      maxHeight = maxHeight || 1000;
      quality = quality || 0.85;
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            let width = img.width;
            let height = img.height;
            if (width > height) {
              if (width > maxWidth) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width = Math.round((width * maxHeight) / height);
                height = maxHeight;
              }
            }
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', quality));
          };
          img.onerror = reject;
          img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    async function handleEditFileUpload(event) {
      const files = Array.from(event.target.files || []);
      if (!files.length) return;

      const remaining = 5 - editProductImages.length;
      if (remaining <= 0) {
        ShopUI.showToast('상품 사진은 최대 5장까지만 등록 가능합니다.', 'warning');
        event.target.value = '';
        return;
      }

      const toProcess = files.slice(0, remaining);
      for (const file of toProcess) {
        if (!file.type.startsWith('image/')) continue;
        try {
          const dataUrl = await resizeImageFile(file);
          editProductImages.push(dataUrl);
        } catch (err) {
          console.error('이미지 변환 오류:', err);
        }
      }
      event.target.value = '';
      renderEditImagePreviews();
    }

    function handleAddEditImageUrl() {
      const input = document.getElementById('edit-img-url-input');
      const url = input.value.trim();
      if (!url) return;

      if (editProductImages.length >= 5) {
        ShopUI.showToast('상품 사진은 최대 5장까지만 등록 가능합니다.', 'warning');
        return;
      }

      editProductImages.push(url);
      input.value = '';
      renderEditImagePreviews();
    }

    function removeEditImage(index) {
      editProductImages.splice(index, 1);
      renderEditImagePreviews();
    }

    function setEditMainImage(index) {
      if (index <= 0 || index >= editProductImages.length) return;
      const target = editProductImages.splice(index, 1)[0];
      editProductImages.unshift(target);
      renderEditImagePreviews();
    }`;

const oldInitHeader = `    let currentProductId = null;
    let originalProduct = null;`;

if (editHtml.includes(oldInitHeader)) {
  editHtml = editHtml.replace(oldInitHeader, scriptHelperHeader);
  console.log('Replaced scriptHelperHeader in product-edit.html');
}

// 4. Update updateLivePreview thumbnail source
const oldThumbInLivePreview = `      const thumb = document.getElementById('edit-thumbnail').value.trim() || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80';`;
const newThumbInLivePreview = `      const thumb = (editProductImages && editProductImages.length > 0) ? editProductImages[0] : (document.getElementById('edit-thumbnail').value.trim() || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80');`;

if (editHtml.includes(oldThumbInLivePreview)) {
  editHtml = editHtml.replace(oldThumbInLivePreview, newThumbInLivePreview);
  console.log('Replaced oldThumbInLivePreview in product-edit.html');
}

// 5. Update submitProductForm in product-edit.html
const oldSubmitBlock = `        thumbnail: document.getElementById('edit-thumbnail').value.trim(),
        image: document.getElementById('edit-thumbnail').value.trim()
      };`;

const newSubmitBlock = `        thumbnail: (editProductImages.length > 0 ? editProductImages[0] : 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80'),
        images: editProductImages.length > 0 ? [...editProductImages] : ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80'],
        image: (editProductImages.length > 0 ? editProductImages[0] : 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80')
      };`;

if (editHtml.includes(oldSubmitBlock)) {
  editHtml = editHtml.replace(oldSubmitBlock, newSubmitBlock);
  console.log('Replaced submitProductForm in product-edit.html');
}

fs.writeFileSync('d:/92.SW/shop/product-edit.html', editHtml, 'utf8');
fs.writeFileSync('d:/92.SW/shop/public/product-edit.html', editHtml, 'utf8');
console.log('Finished updating product-edit.html and public/product-edit.html');
