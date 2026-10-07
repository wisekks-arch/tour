const fs = require('fs');

let detailHtml = fs.readFileSync('d:/92.SW/shop/product-detail.html', 'utf8');

const targetFunc = `    function setMainImage(url) {
      document.getElementById('main-product-image').src = url;
    }`;

const replaceFunc = `    function setMainImage(url, btn = null) {
      const mainImg = document.getElementById('main-product-image');
      if (mainImg) {
        mainImg.style.opacity = '0.5';
        setTimeout(() => {
          mainImg.src = url;
          mainImg.style.opacity = '1';
        }, 100);
      }
      const allBtns = document.querySelectorAll('#thumbnail-gallery button');
      allBtns.forEach(b => {
        b.classList.remove('border-indigo-600', 'ring-2', 'ring-indigo-300', 'shadow-md');
        b.classList.add('border-slate-200');
      });
      if (btn) {
        btn.classList.remove('border-slate-200');
        btn.classList.add('border-indigo-600', 'ring-2', 'ring-indigo-300', 'shadow-md');
      }
    }`;

if (detailHtml.includes(targetFunc)) {
  detailHtml = detailHtml.replace(targetFunc, replaceFunc);
  fs.writeFileSync('d:/92.SW/shop/product-detail.html', detailHtml, 'utf8');
  fs.writeFileSync('d:/92.SW/shop/public/product-detail.html', detailHtml, 'utf8');
  console.log('Successfully updated setMainImage in product-detail.html and public/product-detail.html');
} else {
  console.log('Target function not found');
}
