const fs = require('fs');
const path = require('path');

const hotelsHtmlPath = path.join(__dirname, '..', 'hotels.html');
let content = fs.readFileSync(hotelsHtmlPath, 'utf8');

// Replace card template in renderHotelList
const oldCardBlock = `              <!-- Image Banner with Badge -->
              <div class="relative aspect-video sm:h-52 overflow-hidden bg-slate-900">
                <img 
                  src="\${h.thumbnail || (h.images && h.images[0]) || ''}" 
                  alt="\${h.name}" 
                  class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
                
                <!-- Region & Star Badges -->
                <div class="absolute top-3 left-3 flex items-center gap-1.5">
                  <span class="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white font-black text-[11px] border border-white/20">
                    \${h.region}
                  </span>
                  <span class="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-900 font-extrabold text-[11px] shadow-sm flex items-center gap-1">
                    <span class="text-xs">★</span> \${h.star}성급
                  </span>
                </div>

                \${discountPercent ? \`
                  <div class="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-rose-600 text-white font-black text-[11px] shadow-md animate-pulse">
                    \${discountPercent}% 특가
                  </div>
                \` : ''}

                <!-- City / Country Bottom Overlay -->
                <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <div class="flex items-center gap-1 font-bold drop-shadow">
                    <i data-lucide="map-pin" class="w-3.5 h-3.5 text-sky-400"></i>
                    <span>\${h.country} · \${h.city}</span>
                  </div>
                  <div class="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md font-bold text-amber-300">
                    <i data-lucide="star" class="w-3 h-3 fill-amber-400 text-amber-400"></i>
                    <span>\${h.rating || 4.9}</span>
                    <span class="text-slate-300 text-[10px]">(\${h.reviewCount || 100}+)</span>
                  </div>
                </div>
              </div>

              <!-- Body Content -->
              <div class="p-5 flex-grow flex flex-col justify-between space-y-4">
                
                <div>
                  <h3 class="text-base sm:text-lg font-black text-slate-900 group-hover:text-sky-600 transition line-clamp-1" title="\${h.name}">
                    \${h.name}
                  </h3>
                  <p class="text-[11px] text-slate-400 font-medium truncate mt-0.5">\${h.nameEn || ''}</p>
                  
                  <p class="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                    \${h.summary || ''}
                  </p>

                  <!-- Amenities -->
                  <div class="flex flex-wrap gap-1.5 mt-3">
                    \${amenitiesBadges}
                  </div>
                </div>

                <!-- Price & Booking CTA -->
                <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span class="text-[10.5px] text-slate-400 block">1박 기준 요금 (세금포함)</span>
                    <div class="flex items-baseline gap-1.5 mt-0.5">
                      \${h.originalPrice ? \`
                        <span class="text-xs text-slate-400 line-through">\${TourAPI.formatPrice(h.originalPrice)}</span>
                      \` : ''}
                      <span class="text-base sm:text-lg font-black text-sky-600">
                        \${TourAPI.formatPrice(h.pricePerNight)}
                      </span>
                    </div>
                  </div>

                  <button 
                    type="button"
                    onclick="openHotelBookingModal('\${h.id}')" 
                    class="px-4 py-2.5 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <i data-lucide="calendar-check" class="w-3.5 h-3.5"></i>
                    <span>예약하기</span>
                  </button>
                </div>

              </div>`;

const newCardBlock = `              <!-- Image Banner with Badge -->
              <a href="hotel-detail.html?id=\${h.id}" class="block relative aspect-video sm:h-52 overflow-hidden bg-slate-900">
                <img 
                  src="\${h.thumbnail || (h.images && h.images[0]) || ''}" 
                  alt="\${h.name}" 
                  class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
                
                <!-- Region & Star Badges -->
                <div class="absolute top-3 left-3 flex items-center gap-1.5">
                  <span class="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white font-black text-[11px] border border-white/20">
                    \${h.region}
                  </span>
                  <span class="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-900 font-extrabold text-[11px] shadow-sm flex items-center gap-1">
                    <span class="text-xs">★</span> \${h.star}성급
                  </span>
                </div>

                \${discountPercent ? \`
                  <div class="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-rose-600 text-white font-black text-[11px] shadow-md animate-pulse">
                    \${discountPercent}% 특가
                  </div>
                \` : ''}

                <!-- City / Country Bottom Overlay -->
                <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <div class="flex items-center gap-1 font-bold drop-shadow">
                    <i data-lucide="map-pin" class="w-3.5 h-3.5 text-teal-400"></i>
                    <span>\${h.country} · \${h.city}</span>
                  </div>
                  <div class="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md font-bold text-amber-300">
                    <i data-lucide="star" class="w-3 h-3 fill-amber-400 text-amber-400"></i>
                    <span>\${h.rating || 4.9}</span>
                    <span class="text-slate-300 text-[10px]">(\${h.reviewCount || 100}+)</span>
                  </div>
                </div>
              </a>

              <!-- Body Content -->
              <div class="p-5 flex-grow flex flex-col justify-between space-y-4">
                
                <div>
                  <a href="hotel-detail.html?id=\${h.id}" class="block group/title">
                    <h3 class="text-base sm:text-lg font-black text-slate-900 group-hover/title:text-teal-600 transition line-clamp-1" title="\${h.name}">
                      \${h.name}
                    </h3>
                  </a>
                  <p class="text-[11px] text-slate-400 font-medium truncate mt-0.5">\${h.nameEn || ''}</p>
                  
                  <p class="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                    \${h.summary || ''}
                  </p>

                  <!-- Amenities -->
                  <div class="flex flex-wrap gap-1.5 mt-3">
                    \${amenitiesBadges}
                  </div>
                </div>

                <!-- Price & Dual Action CTAs: 상세보기 + 예약하기 -->
                <div class="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span class="text-[10.5px] text-slate-400 block">1박 요금 (세금포함)</span>
                    <div class="flex items-baseline gap-1.5 mt-0.5">
                      \${h.originalPrice ? \`
                        <span class="text-xs text-slate-400 line-through">\${TourAPI.formatPrice(h.originalPrice)}</span>
                      \` : ''}
                      <span class="text-base sm:text-lg font-black text-teal-600">
                        \${TourAPI.formatPrice(h.pricePerNight)}
                      </span>
                    </div>
                  </div>

                  <div class="flex items-center gap-1.5">
                    <a 
                      href="hotel-detail.html?id=\${h.id}" 
                      class="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-1 cursor-pointer"
                    >
                      <i data-lucide="info" class="w-3.5 h-3.5 text-slate-500"></i>
                      <span>상세보기</span>
                    </a>
                    <button 
                      type="button"
                      onclick="openHotelBookingModal('\${h.id}')" 
                      class="px-3.5 py-2 bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1 cursor-pointer"
                    >
                      <i data-lucide="calendar-check" class="w-3.5 h-3.5"></i>
                      <span>예약하기</span>
                    </button>
                  </div>
                </div>

              </div>`;

if (content.includes(oldCardBlock)) {
  content = content.replace(oldCardBlock, newCardBlock);
  fs.writeFileSync(hotelsHtmlPath, content, 'utf8');
  console.log('Successfully updated hotels.html with hotel-detail.html links and 상세보기 buttons.');
} else {
  console.log('Could not find exact old card block, checking if already updated.');
}
