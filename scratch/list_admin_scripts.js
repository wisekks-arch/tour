const fs = require('fs');

const adminHtml = fs.readFileSync('d:/92.SW/shop/admin.html', 'utf8');
const scriptBlocks = adminHtml.match(/<script[\s\S]*?<\/script>/g);
console.log('Total script blocks:', scriptBlocks ? scriptBlocks.length : 0);
if (scriptBlocks) {
  scriptBlocks.forEach((sb, i) => {
    console.log(`\n--- Script Block #${i + 1} (length ${sb.length}) ---`);
    console.log(sb.slice(0, 300));
    console.log('...');
    console.log(sb.slice(-300));
  });
}
