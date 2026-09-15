const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'js', 'api.js'),
  path.join(__dirname, '..', 'public', 'js', 'api.js')
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace the broken slice between "price":  195000,\n                          "KTX-이음 왕복 열차권" and the repeated 태안
  const targetPattern = /"price":\s*195000,\s*"KTX-이음 왕복 열차권"[\s\S]*?"theme":\s*"휴양\/힐링",\s*"price":\s*195000,\s*"originalPrice":\s*240000,/;
  const replacement = '"price":  195000,\n        "originalPrice":  240000,';
  
  if (targetPattern.test(content)) {
    content = content.replace(targetPattern, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Successfully fixed syntax in ${file}`);
  } else {
    console.log(`Pattern not matched in ${file}`);
  }
});
