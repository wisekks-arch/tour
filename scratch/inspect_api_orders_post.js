const fs = require('fs');

const apiJs = fs.readFileSync('d:/92.SW/shop/js/api.js', 'utf8');

const postIdx = apiJs.indexOf("if (method === 'POST')");
console.log(apiJs.substring(postIdx, postIdx + 1500));
