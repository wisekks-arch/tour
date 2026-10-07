const fs = require('fs');

let adminHtml = fs.readFileSync('d:/92.SW/shop/admin.html', 'utf8');

// 1. Replace thumbnail input with rich 5-image uploader UI
const oldThumbnailBlock = `        <div>
          <label class="block font-bold text-slate-700 mb-1">대표 썸네일 이미지 URL *</label>
          <input type="url" id="prod-form-thumbnail" required value="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" class="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none" />
        </div>`;

const newImageUploaderBlock = `        <!-- Product Images Management (Up to 5 images, PC upload + URL) -->
        <div class="space-y-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
          <div class="flex items-center justify-between">
            <label class="block font-bold text-slate-800 text-xs flex items-center gap-1.5">
              <i data-lucide="images" class="w-4 h-4 text-indigo-600"></i>
              상품 상세 이미지 <span class="text-slate-500 font-normal">(PC 사진 최대 5장 등록 가능 / 1번째 사진이 대표 썸네일)</span>
            </label>
            <span id="modal-img-count-badge" class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-700">0 / 5장</span>
          </div>

          <!-- PC File Upload Dropzone -->
          <div id="modal-img-dropzone" onclick="document.getElementById('modal-file-input').click()" 
               class="border-2 border-dashed border-indigo-200 hover:border-indigo-500 bg-white hover:bg-indigo-50/40 rounded-xl p-3 text-center cursor-pointer transition flex flex-col items-center justify-center gap-1 group">
            <input type="file" id="modal-file-input" multiple accept="image/*" class="hidden" onchange="handleModalFileUpload(event)" />
            <div class="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition">
              <i data-lucide="upload-cloud" class="w-4 h-4"></i>
            </div>
            <p class="text-xs font-bold text-slate-700">📁 내 PC 사진 선택하여 추가 (최대 5장)</p>
            <p class="text-[10px] text-slate-400">JPG, PNG, WEBP 지원 (자동 최적화)</p>
          </div>

          <!-- URL Direct Add Row -->
          <div class="flex gap-2">
            <input type="url" id="modal-img-url-input" placeholder="또는 웹 이미지 URL 입력 (https://...)" 
                   class="flex-1 p-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none bg-white" />
            <button type="button" onclick="handleAddModalImageUrl()" 
                    class="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>URL추가
            </button>
          </div>

          <!-- 5 Images Preview Grid -->
          <div id="modal-img-preview-grid" class="grid grid-cols-5 gap-2 pt-1">
            <!-- Rendered by JS -->
          </div>
        </div>`;

if (adminHtml.includes(oldThumbnailBlock)) {
  adminHtml = adminHtml.replace(oldThumbnailBlock, newImageUploaderBlock);
  console.log('Replaced HTML modal image block successfully.');
} else {
  console.log('Could not find oldThumbnailBlock in admin.html');
}

// 2. Replace openProductModal and helper functions
const oldOpenFunc = `    function openProductModal(prod = null) {
      document.getElementById('modal-product-title').innerText = prod ? '상품 정보 수정' : '신규 상품 등록';
      document.getElementById('prod-edit-id').value = prod ? prod.id : '';
      document.getElementById('prod-form-name').value = prod ? prod.name : '';
      document.getElementById('prod-form-category').value = prod ? prod.category : '패션 / 의류';
      document.getElementById('prod-form-stock').value = prod ? prod.stock : 50;
      document.getElementById('prod-form-price').value = prod ? prod.price : 49000;
      document.getElementById('prod-form-original-price').value = prod ? prod.originalPrice : 69000;
      document.getElementById('prod-form-thumbnail').value = prod ? prod.thumbnail : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';
      document.getElementById('prod-form-summary').value = prod ? prod.summary : '';
      document.getElementById('prod-form-isbest').checked = prod ? !!prod.isBest : false;
      document.getElementById('prod-form-isnew').checked = prod ? !!prod.isNew : true;
      document.getElementById('prod-form-issale').checked = prod ? !!prod.isSale : false;

      document.getElementById('product-modal').classList.remove('hidden');
    }`;

const newOpenFunc = `    let modalProductImages = [];

    function renderModalImagePreviews() {
      const container = document.getElementById('modal-img-preview-grid');
      const countBadge = document.getElementById('modal-img-count-badge');
      if (!container) return;

      if (countBadge) {
        countBadge.innerText = modalProductImages.length + ' / 5장';
      }

      let html = '';
      for (let i = 0; i < 5; i++) {
        const img = modalProductImages[i];
        if (img) {
          const isMain = i === 0;
          html += '<div class="relative group rounded-xl overflow-hidden border-2 ' + (isMain ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-slate-200') + ' bg-slate-100 aspect-square flex items-center justify-center shadow-xs">' +
            '<img src="' + img + '" alt="사진 ' + (i+1) + '" class="w-full h-full object-cover" />' +
            (isMain ? '<span class="absolute top-1 left-1 bg-indigo-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow">대표</span>' : 
              '<button type="button" onclick="setModalMainImage(' + i + ')" title="대표 사진으로 설정" class="absolute bottom-1 left-1 right-1 bg-slate-900/85 hover:bg-indigo-600 text-white text-[9px] font-bold py-0.5 rounded opacity-0 group-hover:opacity-100 transition text-center">대표지정</button>') +
            '<button type="button" onclick="removeModalImage(' + i + ')" title="삭제" class="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold hover:bg-rose-700 shadow transition opacity-90 group-hover:opacity-100">✕</button>' +
          '</div>';
        } else {
          html += '<div onclick="document.getElementById(\\'modal-file-input\\').click()" class="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl aspect-square flex flex-col items-center justify-center text-slate-400 hover:text-indigo-600 cursor-pointer transition bg-white/60 hover:bg-indigo-50/20">' +
            '<i data-lucide="image-plus" class="w-4 h-4 mb-0.5"></i>' +
            '<span class="text-[10px] font-bold">+추가</span>' +
          '</div>';
        }
      }
      container.innerHTML = html;
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

    async function handleModalFileUpload(event) {
      const files = Array.from(event.target.files || []);
      if (!files.length) return;

      const remaining = 5 - modalProductImages.length;
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
          modalProductImages.push(dataUrl);
        } catch (err) {
          console.error('이미지 변환 오류:', err);
        }
      }
      event.target.value = '';
      renderModalImagePreviews();
    }

    function handleAddModalImageUrl() {
      const input = document.getElementById('modal-img-url-input');
      const url = input.value.trim();
      if (!url) return;

      if (modalProductImages.length >= 5) {
        ShopUI.showToast('상품 사진은 최대 5장까지만 등록 가능합니다.', 'warning');
        return;
      }

      modalProductImages.push(url);
      input.value = '';
      renderModalImagePreviews();
    }

    function removeModalImage(index) {
      modalProductImages.splice(index, 1);
      renderModalImagePreviews();
    }

    function setModalMainImage(index) {
      if (index <= 0 || index >= modalProductImages.length) return;
      const target = modalProductImages.splice(index, 1)[0];
      modalProductImages.unshift(target);
      renderModalImagePreviews();
    }

    function openProductModal(prod = null) {
      document.getElementById('modal-product-title').innerText = prod ? '상품 정보 수정' : '신규 상품 등록';
      document.getElementById('prod-edit-id').value = prod ? prod.id : '';
      document.getElementById('prod-form-name').value = prod ? prod.name : '';
      document.getElementById('prod-form-category').value = prod ? prod.category : '패션 / 의류';
      document.getElementById('prod-form-stock').value = prod ? prod.stock : 50;
      document.getElementById('prod-form-price').value = prod ? prod.price : 49000;
      document.getElementById('prod-form-original-price').value = prod ? prod.originalPrice : 69000;
      document.getElementById('prod-form-summary').value = prod ? prod.summary : '';
      document.getElementById('prod-form-isbest').checked = prod ? !!prod.isBest : false;
      document.getElementById('prod-form-isnew').checked = prod ? !!prod.isNew : true;
      document.getElementById('prod-form-issale').checked = prod ? !!prod.isSale : false;

      // Initialize Images (up to 5)
      if (prod && prod.images && prod.images.length > 0) {
        modalProductImages = [...prod.images];
      } else if (prod && prod.thumbnail) {
        modalProductImages = [prod.thumbnail];
      } else {
        modalProductImages = ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'];
      }
      renderModalImagePreviews();

      document.getElementById('product-modal').classList.remove('hidden');
    }`;

if (adminHtml.includes(oldOpenFunc)) {
  adminHtml = adminHtml.replace(oldOpenFunc, newOpenFunc);
  console.log('Replaced openProductModal script successfully.');
} else {
  console.log('Could not find oldOpenFunc in admin.html');
}

// 3. Update handleProductSave
const oldSaveFunc = `    async function handleProductSave(e) {
      e.preventDefault();
      const editId = document.getElementById('prod-edit-id').value;
      const price = parseInt(document.getElementById('prod-form-price').value);
      const originalPrice = parseInt(document.getElementById('prod-form-original-price').value) || price;
      const discountRate = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

      const productData = {
        id: editId || 'prod-' + Date.now().toString().slice(-4),
        name: document.getElementById('prod-form-name').value,
        category: document.getElementById('prod-form-category').value,
        price: price,
        originalPrice: originalPrice,
        discountRate: discountRate,
        stock: parseInt(document.getElementById('prod-form-stock').value),
        thumbnail: document.getElementById('prod-form-thumbnail').value,
        summary: document.getElementById('prod-form-summary').value,
        isBest: document.getElementById('prod-form-isbest').checked,
        isNew: document.getElementById('prod-form-isnew').checked,
        isSale: document.getElementById('prod-form-issale').checked,
        rating: 5.0,
        reviewCount: 0
      };`;

const newSaveFunc = `    async function handleProductSave(e) {
      e.preventDefault();
      const editId = document.getElementById('prod-edit-id').value;
      const price = parseInt(document.getElementById('prod-form-price').value);
      const originalPrice = parseInt(document.getElementById('prod-form-original-price').value) || price;
      const discountRate = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

      const finalImages = modalProductImages.length > 0 ? [...modalProductImages] : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'];
      const finalThumb = finalImages[0];

      const productData = {
        id: editId || 'prod-' + Date.now().toString().slice(-4),
        name: document.getElementById('prod-form-name').value,
        category: document.getElementById('prod-form-category').value,
        price: price,
        originalPrice: originalPrice,
        discountRate: discountRate,
        stock: parseInt(document.getElementById('prod-form-stock').value),
        thumbnail: finalThumb,
        images: finalImages,
        summary: document.getElementById('prod-form-summary').value,
        isBest: document.getElementById('prod-form-isbest').checked,
        isNew: document.getElementById('prod-form-isnew').checked,
        isSale: document.getElementById('prod-form-issale').checked,
        rating: 5.0,
        reviewCount: 0
      };`;

if (adminHtml.includes(oldSaveFunc)) {
  adminHtml = adminHtml.replace(oldSaveFunc, newSaveFunc);
  console.log('Replaced handleProductSave script successfully.');
} else {
  console.log('Could not find oldSaveFunc in admin.html');
}

fs.writeFileSync('d:/92.SW/shop/admin.html', adminHtml, 'utf8');
fs.writeFileSync('d:/92.SW/shop/public/admin.html', adminHtml, 'utf8');
console.log('Finished updating admin.html and public/admin.html');
