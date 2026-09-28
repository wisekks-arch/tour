const fs = require('fs');
const path = require('path');

const hotelDetailPath = path.join(__dirname, '..', 'hotel-detail.html');
let content = fs.readFileSync(hotelDetailPath, 'utf8');

// 1. Replace Photo Gallery Section
const oldGallerySection = `          <!-- Photo Gallery Showcase -->
          <div class="space-y-3">
            <div class="relative h-[320px] sm:h-[440px] rounded-3xl overflow-hidden shadow-md bg-slate-900 group">
              <img id="main-hotel-img" src="" alt="Hotel Main Photo" class="w-full h-full object-cover transition duration-500">
              <div class="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-black/60 backdrop-blur-sm text-white text-xs font-bold flex items-center gap-1.5">
                <i data-lucide="camera" class="w-3.5 h-3.5 text-teal-400"></i>
                <span id="photo-index-indicator">1 / 3</span>
              </div>
            </div>
            <!-- Thumbnails Strip -->
            <div id="gallery-thumbnails" class="grid grid-cols-4 gap-2.5 sm:gap-3">
              <!-- Injected dynamically -->
            </div>
          </div>`;

const newGallerySection = `          <!-- Photo Gallery Showcase -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-xs font-black text-slate-700 flex items-center gap-1.5">
                  <i data-lucide="images" class="w-4 h-4 text-teal-600"></i> 호텔 실물 갤러리
                </span>
                <span class="text-[11px] text-slate-400 font-medium">(최대 5장 등록 가능)</span>
              </div>
              <button 
                type="button" 
                onclick="openHotelPhotoManager()" 
                class="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200/90 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <i data-lucide="camera" class="w-3.5 h-3.5"></i> 사진 등록/수정 (최대 5장)
              </button>
            </div>

            <div class="relative h-[320px] sm:h-[440px] rounded-3xl overflow-hidden shadow-md bg-slate-900 group select-none">
              <img id="main-hotel-img" src="" alt="Hotel Main Photo" class="w-full h-full object-cover transition duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/20 pointer-events-none"></div>

              <!-- Prev / Next Navigation Arrows -->
              <button type="button" onclick="prevPhoto(event)" class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 cursor-pointer border border-white/20" title="이전 사진">
                <i data-lucide="chevron-left" class="w-5 h-5"></i>
              </button>
              <button type="button" onclick="nextPhoto(event)" class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 cursor-pointer border border-white/20" title="다음 사진">
                <i data-lucide="chevron-right" class="w-5 h-5"></i>
              </button>

              <!-- Floating Caption Bar -->
              <div class="absolute bottom-3 left-3 right-24 sm:right-32 text-white">
                <div id="main-photo-caption" class="text-xs sm:text-sm font-extrabold drop-shadow-md truncate text-white bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 inline-flex items-center gap-2 max-w-full">
                  <i data-lucide="map-pin" class="w-3.5 h-3.5 text-teal-400 shrink-0"></i>
                  <span id="main-photo-caption-text" class="truncate"></span>
                </div>
              </div>

              <!-- Photo Count Badge -->
              <div class="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-black flex items-center gap-1.5 border border-white/20 shadow-lg">
                <i data-lucide="camera" class="w-3.5 h-3.5 text-teal-400"></i>
                <span id="photo-index-indicator">1 / 5</span>
              </div>
            </div>

            <!-- Thumbnails Strip (Up to 5 slots) -->
            <div id="gallery-thumbnails" class="grid grid-cols-5 gap-2 sm:gap-2.5">
              <!-- Injected dynamically -->
            </div>
          </div>`;

content = content.replace(oldGallerySection, newGallerySection);

// 2. Add Modal HTML before </body>
const modalHotelPhotoManagerHtml = `
  <!-- Hotel Photo Manager Modal (Max 5 Photos) -->
  <div id="modal-hotel-photo-manager" class="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 hidden">
    <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 flex flex-col">
      
      <!-- Modal Header -->
      <div class="p-5 sm:p-6 bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shrink-0">
            <i data-lucide="camera" class="w-5 h-5"></i>
          </div>
          <div>
            <h3 class="font-extrabold text-base sm:text-lg">호텔 실물 사진 등록 및 관리</h3>
            <p class="text-teal-200/80 text-xs mt-0.5" id="photo-mgr-hotel-name">최대 5장 등록 가능 (PC 사진 업로드 또는 이미지 URL 등록)</p>
          </div>
        </div>
        <button type="button" onclick="closeHotelPhotoManager()" class="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-5 sm:p-6 space-y-5 flex-grow overflow-y-auto">
        
        <!-- Upload & Add Actions -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <!-- PC File Upload Button -->
          <label class="flex items-center justify-center gap-2 p-3.5 rounded-2xl border-2 border-dashed border-teal-300 hover:border-teal-500 bg-teal-50/50 hover:bg-teal-50 cursor-pointer text-teal-800 text-xs font-bold transition group">
            <i data-lucide="upload-cloud" class="w-5 h-5 text-teal-600 group-hover:scale-110 transition"></i>
            <span>내 PC에서 사진 등록 (다중 선택)</span>
            <input type="file" id="hotel-pc-file-input" multiple accept="image/*" class="hidden" onchange="handleHotelPhotoUpload(event)">
          </label>

          <!-- Web Image URL Add Button -->
          <button type="button" onclick="promptAddPhotoUrl()" class="flex items-center justify-center gap-2 p-3.5 rounded-2xl border border-slate-200 hover:border-teal-400 bg-slate-50 hover:bg-white text-slate-700 hover:text-teal-700 text-xs font-bold transition cursor-pointer shadow-2xs">
            <i data-lucide="link" class="w-4 h-4 text-teal-600"></i>
            <span>웹 이미지 URL 직접 추가</span>
          </button>
        </div>

        <!-- Current Photos List (1 to 5) -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h4 class="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
              <i data-lucide="layers" class="w-4 h-4 text-teal-600"></i> 등록된 사진 목록 (<span id="photo-mgr-count">0</span> / 5장)
            </h4>
            <span class="text-[11px] text-slate-400">#1번 사진이 대표 썸네일로 자동 지정됩니다</span>
          </div>

          <div id="photo-mgr-list" class="space-y-3">
            <!-- Injected dynamically: cards 1~5 -->
          </div>
        </div>

        <!-- Guide Box -->
        <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600 space-y-1.5">
          <div class="font-bold text-slate-800 flex items-center gap-1.5">
            <i data-lucide="lightbulb" class="w-4 h-4 text-amber-500"></i> 사진 등록 팁 & 권장 규격
          </div>
          <ul class="list-disc list-inside space-y-1 text-slate-500 text-[11.5px] pl-1">
            <li>권장 해상도: 1200 x 800 픽셀 이상 (고화질 와이드 비율)</li>
            <li>각 사진의 설명(캡션)은 기본적으로 <code>[호텔 상품명]</code>을 포함하여 입력됩니다.</li>
            <li>순서 변경 버튼(▲/▼)을 눌러 사진 표시 순서를 손쉽게 조정할 수 있습니다.</li>
          </ul>
        </div>

      </div>

      <!-- Modal Footer -->
      <div class="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
        <button type="button" onclick="closeHotelPhotoManager()" class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition cursor-pointer">
          취소
        </button>
        <button type="button" onclick="saveHotelPhotos()" class="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-black transition flex items-center gap-2 cursor-pointer shadow-md">
          <i data-lucide="check-circle" class="w-4 h-4"></i> 사진 저장하기
        </button>
      </div>

    </div>
  </div>
`;

if (!content.includes('modal-hotel-photo-manager')) {
  content = content.replace('</body>', `${modalHotelPhotoManagerHtml}\n</body>`);
}

// 3. Replace Script Section with Rich Photo Management & Caption Support
const oldScriptTarget = `    function updateMainPhoto() {
      const mainImg = document.getElementById('main-hotel-img');
      const indicator = document.getElementById('photo-index-indicator');
      const thumbsContainer = document.getElementById('gallery-thumbnails');

      if (mainImg && currentPhotos.length > 0) {
        mainImg.src = currentPhotos[selectedPhotoIndex] || currentPhotos[0];
      }
      if (indicator) {
        indicator.textContent = \`\${selectedPhotoIndex + 1} / \${currentPhotos.length}\`;
      }

      if (thumbsContainer) {
        thumbsContainer.innerHTML = currentPhotos.map((src, i) => \`
          <button 
            type="button" 
            onclick="selectPhoto(\${i})" 
            class="h-20 sm:h-24 rounded-2xl overflow-hidden border-2 transition duration-200 cursor-pointer \${i === selectedPhotoIndex ? 'border-teal-500 ring-2 ring-teal-300' : 'border-transparent opacity-70 hover:opacity-100'}"
          >
            <img src="\${src}" class="w-full h-full object-cover" alt="Thumb \${i + 1}">
          </button>
        \`).join('');
      }
    }

    function selectPhoto(index) {
      selectedPhotoIndex = index;
      updateMainPhoto();
    }
    window.selectPhoto = selectPhoto;`;

const newScriptTarget = `    function getPhotoUrl(p) {
      if (!p) return '';
      if (typeof p === 'object' && p.url) return p.url;
      return typeof p === 'string' ? p : '';
    }

    function getPhotoCaption(p, idx) {
      if (p && typeof p === 'object' && p.caption) return p.caption;
      const hotelName = currentHotel ? currentHotel.name : '호텔';
      return \`[\${hotelName}] 갤러리 사진 #\${idx + 1}\`;
    }

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }

    function updateMainPhoto() {
      const mainImg = document.getElementById('main-hotel-img');
      const indicator = document.getElementById('photo-index-indicator');
      const captionText = document.getElementById('main-photo-caption-text');
      const thumbsContainer = document.getElementById('gallery-thumbnails');

      if (!currentPhotos || currentPhotos.length === 0) return;
      if (selectedPhotoIndex >= currentPhotos.length) selectedPhotoIndex = 0;
      if (selectedPhotoIndex < 0) selectedPhotoIndex = currentPhotos.length - 1;

      const currentPhoto = currentPhotos[selectedPhotoIndex];
      const photoUrl = getPhotoUrl(currentPhoto);
      const photoCaption = getPhotoCaption(currentPhoto, selectedPhotoIndex);

      if (mainImg) {
        mainImg.src = photoUrl;
        mainImg.alt = photoCaption;
      }
      if (captionText) {
        captionText.textContent = photoCaption;
      }
      if (indicator) {
        indicator.textContent = \`\${selectedPhotoIndex + 1} / \${currentPhotos.length}\`;
      }

      if (thumbsContainer) {
        thumbsContainer.innerHTML = currentPhotos.map((p, i) => {
          const url = getPhotoUrl(p);
          const cap = getPhotoCaption(p, i);
          const isSelected = (i === selectedPhotoIndex);
          return \`
            <button 
              type="button" 
              onclick="selectPhoto(\${i})" 
              title="\${escapeHtml(cap)}"
              class="group/thumb relative h-16 sm:h-20 rounded-2xl overflow-hidden border-2 transition duration-200 cursor-pointer \${isSelected ? 'border-teal-500 ring-2 ring-teal-300 shadow-sm' : 'border-transparent opacity-65 hover:opacity-100'}"
            >
              <img src="\${url}" class="w-full h-full object-cover group-hover/thumb:scale-105 transition duration-300" alt="Thumb \${i + 1}">
              <span class="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[9px] font-black text-white">
                #\${i + 1}
              </span>
            </button>
          \`;
        }).join('');
      }

      if (window.lucide) lucide.createIcons();
    }

    function selectPhoto(index) {
      selectedPhotoIndex = index;
      updateMainPhoto();
    }
    window.selectPhoto = selectPhoto;

    function prevPhoto(e) {
      if (e) e.stopPropagation();
      if (!currentPhotos || currentPhotos.length <= 1) return;
      selectedPhotoIndex = (selectedPhotoIndex - 1 + currentPhotos.length) % currentPhotos.length;
      updateMainPhoto();
    }
    window.prevPhoto = prevPhoto;

    function nextPhoto(e) {
      if (e) e.stopPropagation();
      if (!currentPhotos || currentPhotos.length <= 1) return;
      selectedPhotoIndex = (selectedPhotoIndex + 1) % currentPhotos.length;
      updateMainPhoto();
    }
    window.nextPhoto = nextPhoto;

    // --- Hotel Photo Manager (Max 5 Photos) ---
    let editingPhotos = [];

    function openHotelPhotoManager() {
      if (!currentHotel) return;
      
      const rawList = Array.isArray(currentHotel.images) && currentHotel.images.length > 0
        ? currentHotel.images
        : (currentHotel.thumbnail ? [currentHotel.thumbnail] : []);

      editingPhotos = rawList.map((item, idx) => {
        if (item && typeof item === 'object') {
          return {
            url: item.url || '',
            caption: item.caption || \`[\${currentHotel.name}] 사진 #\${idx + 1}\`
          };
        } else {
          return {
            url: String(item || ''),
            caption: \`[\${currentHotel.name}] 사진 #\${idx + 1}\`
          };
        }
      }).filter(p => p.url);

      const titleEl = document.getElementById('photo-mgr-hotel-name');
      if (titleEl) titleEl.textContent = \`호텔명: \${currentHotel.name} (최대 5장 등록 가능)\`;

      renderPhotoManagerList();
      
      const modal = document.getElementById('modal-hotel-photo-manager');
      if (modal) modal.classList.remove('hidden');
      if (window.lucide) lucide.createIcons();
    }
    window.openHotelPhotoManager = openHotelPhotoManager;

    function closeHotelPhotoManager() {
      const modal = document.getElementById('modal-hotel-photo-manager');
      if (modal) modal.classList.add('hidden');
    }
    window.closeHotelPhotoManager = closeHotelPhotoManager;

    function renderPhotoManagerList() {
      const container = document.getElementById('photo-mgr-list');
      const countEl = document.getElementById('photo-mgr-count');
      if (countEl) countEl.textContent = editingPhotos.length;

      if (!container) return;

      if (editingPhotos.length === 0) {
        container.innerHTML = \`
          <div class="py-10 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 text-slate-400 text-xs">
            <i data-lucide="image-off" class="w-8 h-8 mx-auto mb-2 text-slate-300"></i>
            등록된 사진이 없습니다. 위 버튼을 통해 PC 사진 또는 웹 URL을 추가해 주세요.
          </div>
        \`;
        if (window.lucide) lucide.createIcons();
        return;
      }

      container.innerHTML = editingPhotos.map((p, idx) => \`
        <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center gap-3.5">
          <div class="relative w-full sm:w-28 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0">
            <img src="\${p.url}" alt="Photo \${idx + 1}" class="w-full h-full object-cover">
            <span class="absolute top-1 left-1 px-2 py-0.5 rounded-md text-[10px] font-black \${idx === 0 ? 'bg-teal-600 text-white shadow-xs' : 'bg-black/70 text-slate-200'}">
              \${idx === 0 ? '대표 #1' : '#' + (idx + 1)}
            </span>
          </div>

          <div class="flex-grow w-full space-y-1.5">
            <label class="block text-[11px] font-bold text-slate-600">사진 이름 / 캡션 (호텔명 자동 연동)</label>
            <input 
              type="text" 
              value="\${escapeHtml(p.caption || '')}" 
              placeholder="[\${currentHotel.name}] 사진 설명 입력"
              oninput="updatePhotoCaption(\${idx}, this.value)"
              class="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:border-teal-500 focus:bg-white transition"
            />
            <p class="text-[10px] text-slate-400 truncate max-w-[280px] sm:max-w-md">URL: \${escapeHtml(p.url)}</p>
          </div>

          <div class="flex sm:flex-col items-center gap-1.5 shrink-0">
            <div class="flex items-center gap-1">
              <button type="button" onclick="movePhotoOrder(\${idx}, -1)" \${idx === 0 ? 'disabled' : ''} class="w-7 h-7 rounded-lg border border-slate-200 text-slate-500 hover:text-teal-700 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition cursor-pointer" title="위로 이동">
                <i data-lucide="chevron-up" class="w-3.5 h-3.5"></i>
              </button>
              <button type="button" onclick="movePhotoOrder(\${idx}, 1)" \${idx === editingPhotos.length - 1 ? 'disabled' : ''} class="w-7 h-7 rounded-lg border border-slate-200 text-slate-500 hover:text-teal-700 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition cursor-pointer" title="아래로 이동">
                <i data-lucide="chevron-down" class="w-3.5 h-3.5"></i>
              </button>
            </div>
            <button type="button" onclick="deletePhoto(\${idx})" class="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 text-[11px] font-bold flex items-center gap-1 transition cursor-pointer" title="삭제">
              <i data-lucide="trash-2" class="w-3 h-3"></i> 삭제
            </button>
          </div>
        </div>
      \`).join('');

      if (window.lucide) lucide.createIcons();
    }
    window.renderPhotoManagerList = renderPhotoManagerList;

    function updatePhotoCaption(idx, val) {
      if (editingPhotos[idx]) {
        editingPhotos[idx].caption = val;
      }
    }
    window.updatePhotoCaption = updatePhotoCaption;

    function movePhotoOrder(idx, delta) {
      const target = idx + delta;
      if (target < 0 || target >= editingPhotos.length) return;
      const temp = editingPhotos[idx];
      editingPhotos[idx] = editingPhotos[target];
      editingPhotos[target] = temp;
      renderPhotoManagerList();
    }
    window.movePhotoOrder = movePhotoOrder;

    function deletePhoto(idx) {
      if (editingPhotos.length <= 1) {
        if (!confirm('사진이 1장만 남았습니다. 정말 삭제하시겠습니까?')) return;
      }
      editingPhotos.splice(idx, 1);
      renderPhotoManagerList();
    }
    window.deletePhoto = deletePhoto;

    function handleHotelPhotoUpload(e) {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      const remaining = 5 - editingPhotos.length;
      if (remaining <= 0) {
        alert('사진은 최대 5장까지만 등록할 수 있습니다. 기존 사진을 삭제 후 다시 등록해 주세요.');
        e.target.value = '';
        return;
      }

      const toUpload = Array.from(files).slice(0, remaining);
      if (files.length > remaining) {
        alert(\`최대 5장 제한으로 인해 선택하신 파일 중 앞선 \${remaining}장만 등록됩니다.\`);
      }

      let processed = 0;
      toUpload.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (uploadEvent) => {
          const base64 = uploadEvent.target.result;
          const num = editingPhotos.length + 1;
          const cleanName = file.name.replace(/\\.[^/.]+$/, '');
          editingPhotos.push({
            url: base64,
            caption: \`[\${currentHotel.name}] \${cleanName || ('실물 사진 #' + num)}\`
          });
          processed++;
          if (processed === toUpload.length) {
            e.target.value = '';
            renderPhotoManagerList();
          }
        };
        reader.readAsDataURL(file);
      });
    }
    window.handleHotelPhotoUpload = handleHotelPhotoUpload;

    function promptAddPhotoUrl() {
      const remaining = 5 - editingPhotos.length;
      if (remaining <= 0) {
        alert('사진은 최대 5장까지만 등록할 수 있습니다. 기존 사진을 삭제 후 다시 등록해 주세요.');
        return;
      }
      const url = prompt('추가할 호텔 이미지의 웹 URL을 입력해 주세요 (https://...):');
      if (!url || !url.trim()) return;

      const validUrl = url.trim();
      const num = editingPhotos.length + 1;
      const caption = prompt('사진의 이름/캡션을 입력해 주세요:', \`[\${currentHotel.name}] 실물 사진 #\${num}\`);

      editingPhotos.push({
        url: validUrl,
        caption: caption && caption.trim() ? caption.trim() : \`[\${currentHotel.name}] 실물 사진 #\${num}\`
      });
      renderPhotoManagerList();
    }
    window.promptAddPhotoUrl = promptAddPhotoUrl;

    async function saveHotelPhotos() {
      if (!currentHotel) return;
      if (editingPhotos.length === 0) {
        alert('최소 1장 이상의 사진을 등록해 주세요.');
        return;
      }

      try {
        const updatedImages = editingPhotos.map((p, idx) => ({
          url: p.url,
          caption: p.caption || \`[\${currentHotel.name}] 갤러리 사진 #\${idx + 1}\`
        }));
        const updatedThumbnail = updatedImages[0].url;

        const res = await TourAPI.updateHotel(currentHotel.id, {
          images: updatedImages,
          thumbnail: updatedThumbnail
        });

        if (res && res.success) {
          currentHotel.images = updatedImages;
          currentHotel.thumbnail = updatedThumbnail;
          currentPhotos = updatedImages;
          selectedPhotoIndex = 0;
          updateMainPhoto();
          closeHotelPhotoManager();
          alert('호텔 사진(최대 5장)이 성공적으로 저장되었습니다!');
        } else {
          alert('사진 저장 중 오류가 발생했습니다: ' + (res?.message || '알 수 없는 오류'));
        }
      } catch (err) {
        console.error('Error saving hotel photos:', err);
        alert('사진 저장 중 오류가 발생했습니다.');
      }
    }
    window.saveHotelPhotos = saveHotelPhotos;`;

content = content.replace(oldScriptTarget, newScriptTarget);

fs.writeFileSync(hotelDetailPath, content, 'utf8');
console.log('Successfully updated hotel-detail.html with 5-photo manager and captions!');
