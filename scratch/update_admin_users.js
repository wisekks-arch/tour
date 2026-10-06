const fs = require('fs');

function updateAdmin(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Update search filter
  const oldSearch = "        filtered = filtered.filter(u =>\r\n" +
    "          (u.name && u.name.toLowerCase().includes(s)) ||\r\n" +
    "          (u.email && u.email.toLowerCase().includes(s)) ||\r\n" +
    "          (u.phone && u.phone.replace(/-/g, '').includes(s.replace(/-/g, '')))\r\n" +
    "        );";

  const newSearch = "        filtered = filtered.filter(u =>\r\n" +
    "          (u.name && u.name.toLowerCase().includes(s)) ||\r\n" +
    "          (u.email && u.email.toLowerCase().includes(s)) ||\r\n" +
    "          (u.phone && u.phone.replace(/-/g, '').includes(s.replace(/-/g, ''))) ||\r\n" +
    "          (u.address && u.address.toLowerCase().includes(s)) ||\r\n" +
    "          (u.addressDetail && u.addressDetail.toLowerCase().includes(s)) ||\r\n" +
    "          (u.postcode && u.postcode.includes(s))\r\n" +
    "        );";

  if (content.includes(oldSearch)) {
    content = content.replace(oldSearch, newSearch);
    console.log(filePath + ': Updated search filter.');
  } else {
    const oldSearchLf = oldSearch.replace(/\r\n/g, '\n');
    const newSearchLf = newSearch.replace(/\r\n/g, '\n');
    if (content.includes(oldSearchLf)) {
      content = content.replace(oldSearchLf, newSearchLf);
      console.log(filePath + ': Updated search filter (LF).');
    } else {
      console.warn(filePath + ': Old search filter not found.');
    }
  }

  // 2. Update user row HTML in renderUsersAdmin
  const oldRow = '                <span class="font-bold text-slate-900 text-xs">${u.name || \'이름 없음\'}</span>\r\n' +
    '              </div>';

  const newRow = '                <div>\r\n' +
    '                  <span class="font-bold text-slate-900 text-xs">${u.name || \'이름 없음\'}</span>\r\n' +
    '                  ${(u.address || u.postcode) ? `<div class="mt-1 text-[11px] text-slate-500 flex items-center gap-1 font-normal max-w-[220px] truncate" title="${[u.postcode ? `[${u.postcode}]` : \'\', u.address || \'\', u.addressDetail || \'\'].filter(Boolean).join(\' \')}"><i data-lucide="map-pin" class="w-3 h-3 text-sky-500 shrink-0"></i><span class="truncate">${[u.postcode ? `[${u.postcode}]` : \'\', u.address || \'\', u.addressDetail || \'\'].filter(Boolean).join(\' \')}</span></div>` : \'<span class="text-[10px] text-slate-300 block mt-0.5">주소 미등록</span>\'}\r\n' +
    '                </div>\r\n' +
    '              </div>';

  if (content.includes(oldRow)) {
    content = content.replace(oldRow, newRow);
    console.log(filePath + ': Updated user row HTML.');
  } else {
    const oldRowLf = oldRow.replace(/\r\n/g, '\n');
    const newRowLf = newRow.replace(/\r\n/g, '\n');
    if (content.includes(oldRowLf)) {
      content = content.replace(oldRowLf, newRowLf);
      console.log(filePath + ': Updated user row HTML (LF).');
    } else {
      console.warn(filePath + ': Old user row not found.');
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

updateAdmin('d:/92.SW/tour/admin.html');
updateAdmin('d:/92.SW/tour/public/admin.html');
console.log('Finished updating admin files.');
