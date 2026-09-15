const fs = require('fs');
const path = require('path');

// 1. Patch package-detail.html & public/package-detail.html
const pkgDetailFiles = [
  path.join(__dirname, '..', 'package-detail.html'),
  path.join(__dirname, '..', 'public', 'package-detail.html')
];

pkgDetailFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Replace button
  content = content.replace(
    /<a href="contact\.html" class="w-full py-3 bg-slate-100[\s\S]*?<\/a>/,
    `<button type="button" onclick="goToCustomInquiry()" id="btn-custom-inquiry" class="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl text-xs flex items-center justify-center gap-2 transition cursor-pointer">
                <i data-lucide="message-square" class="w-4 h-4 text-sky-600"></i> 일정 커스텀 1:1 상담 문의
              </button>`
  );

  // Cache busting scripts
  content = content.replace(/<script src="js\/api\.js(\?[^"]*)?"><\/script>/g, '<script src="js/api.js?v=20260911_v9custom"></script>');
  content = content.replace(/<script src="js\/components\.js(\?[^"]*)?"><\/script>/g, '<script src="js/components.js?v=20260911_v9custom"></script>');

  // Add goToCustomInquiry function
  const customInquiryFunction = `
    function goToCustomInquiry() {
      const pkgTitle = currentPkg ? encodeURIComponent(currentPkg.title || '') : '';
      const pkgDest = currentPkg ? encodeURIComponent(currentPkg.city || currentPkg.destination || currentPkg.country || '') : '';
      const dateStr = selectedDateObj ? encodeURIComponent(selectedDateObj.date || '') : '';
      const travelers = (adults || 2) + (children || 0);
      window.location.href = \`contact.html?package=\${pkgTitle}&dest=\${pkgDest}&date=\${dateStr}&group=\${travelers}\`;
    }
    window.goToCustomInquiry = goToCustomInquiry;
  `;

  if (!content.includes('function goToCustomInquiry()')) {
    content = content.replace('function updatePriceSummary() {', customInquiryFunction + '\n    function updatePriceSummary() {');
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Successfully patched ${file}`);
});

// 2. Patch contact.html & public/contact.html
const contactFiles = [
  path.join(__dirname, '..', 'contact.html'),
  path.join(__dirname, '..', 'public', 'contact.html')
];

contactFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Cache busting scripts
  content = content.replace(/<script src="js\/api\.js(\?[^"]*)?"><\/script>/g, '<script src="js/api.js?v=20260911_v9custom"></script>');
  content = content.replace(/<script src="js\/components\.js(\?[^"]*)?"><\/script>/g, '<script src="js/components.js?v=20260911_v9custom"></script>');

  const autofillParamsCode = `
    function autofillFromUrlParams() {
      const params = new URLSearchParams(window.location.search);
      const pkg = params.get('package');
      const dest = params.get('dest');
      const date = params.get('date');
      const group = params.get('group');

      if (dest) {
        const destInput = document.getElementById('inq-destination');
        if (destInput) destInput.value = decodeURIComponent(dest);
      }
      if (date) {
        const dateInput = document.getElementById('inq-date');
        if (dateInput) dateInput.value = decodeURIComponent(date);
      }
      if (group) {
        const groupInput = document.getElementById('inq-group-size');
        if (groupInput) groupInput.value = group;
      }
      if (pkg) {
        const msgInput = document.getElementById('inq-message');
        const decodedPkg = decodeURIComponent(pkg);
        if (msgInput && !msgInput.value) {
          msgInput.value = \`[\${decodedPkg}] 상품을 보고 문의드립니다.\\n일정 조율 및 프라이빗 맞춤 투어 견적 상담 요청합니다.\`;
        }
      }
    }
  `;

  if (!content.includes('function autofillFromUrlParams()')) {
    content = content.replace('function autofillInquiryUserInfo() {', autofillParamsCode + '\n    function autofillInquiryUserInfo() {');
    content = content.replace('autofillInquiryUserInfo();', 'autofillInquiryUserInfo();\n      autofillFromUrlParams();');
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Successfully patched ${file}`);
});
