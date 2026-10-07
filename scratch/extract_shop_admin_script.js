const fs = require('fs');

const adminHtml = fs.readFileSync('d:/92.SW/shop/admin.html', 'utf8');
const scriptStart = adminHtml.indexOf('<script>');
const scriptEnd = adminHtml.lastIndexOf('</script>');

console.log('Script block length:', scriptEnd - scriptStart);
console.log('Script contents:');
console.log(adminHtml.substring(scriptStart, scriptEnd + 9));
