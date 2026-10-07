const fs = require('fs');

const checkoutPath = 'd:/92.SW/shop/checkout.html';
const checkoutPubPath = 'd:/92.SW/shop/public/checkout.html';

let html = fs.readFileSync(checkoutPath, 'utf8');

const oldScript = `    document.addEventListener('DOMContentLoaded', () => {
      ShopUI.renderNavbar();
      ShopUI.renderFooter();

      const urlParams = new URLSearchParams(window.location.search);
      couponDiscount = parseInt(urlParams.get('coupon')) || 0;

      summary = CartStore.getSummary(couponDiscount);
      if (summary.selectedItems.length === 0) {
        alert('주문할 상품이 없습니다.');
        window.location.href = 'cart.html';
        return;
      }

      renderCheckoutSummary();
    });`;

const newScript = `    document.addEventListener('DOMContentLoaded', () => {
      ShopUI.renderNavbar();
      ShopUI.renderFooter();

      // Pre-fill member information if logged in
      try {
        const authUserRaw = localStorage.getItem('easyshop_auth_user');
        if (authUserRaw) {
          const authUser = JSON.parse(authUserRaw);
          if (authUser.name && document.getElementById('order-name')) document.getElementById('order-name').value = authUser.name;
          if (authUser.phone && document.getElementById('order-phone')) document.getElementById('order-phone').value = authUser.phone;
          if (authUser.email && document.getElementById('order-email')) document.getElementById('order-email').value = authUser.email;
          if (authUser.name && document.getElementById('ship-name')) document.getElementById('ship-name').value = authUser.name;
          if (authUser.phone && document.getElementById('ship-phone')) document.getElementById('ship-phone').value = authUser.phone;
          if (authUser.address && document.getElementById('ship-address')) document.getElementById('ship-address').value = authUser.address;
          if (authUser.addressDetail && document.getElementById('ship-address-detail')) document.getElementById('ship-address-detail').value = authUser.addressDetail;
        }
      } catch (e) {
        console.error('Member prefill error:', e);
      }

      const urlParams = new URLSearchParams(window.location.search);
      couponDiscount = parseInt(urlParams.get('coupon')) || 0;

      summary = CartStore.getSummary(couponDiscount);
      if (summary.selectedItems.length === 0) {
        alert('주문할 상품이 없습니다.');
        window.location.href = 'cart.html';
        return;
      }

      renderCheckoutSummary();
    });`;

if (html.includes(oldScript)) {
  html = html.replace(oldScript, newScript);
}

const oldSubmit = `      try {
        const result = await ShopAPI.createOrder(orderData);
        CartStore.removeSelected();
        const orderId = result.order ? result.order.orderId : ('ORD-' + Date.now().toString().slice(-8));
        sessionStorage.setItem('latest_order', JSON.stringify(result.order || orderData));
        window.location.href = \`order-complete.html?orderId=\${encodeURIComponent(orderId)}\`;
      } catch (err) {`;

const newSubmit = `      try {
        const result = await ShopAPI.createOrder(orderData);
        CartStore.removeSelected();

        // Update member order stats if logged in
        try {
          const authUserRaw = localStorage.getItem('easyshop_auth_user');
          if (authUserRaw) {
            const authUser = JSON.parse(authUserRaw);
            const usersRaw = localStorage.getItem('easyshop_users_v3');
            if (usersRaw) {
              const users = JSON.parse(usersRaw);
              const uIdx = users.findIndex(u => u.email === authUser.email || u.id === authUser.id);
              if (uIdx >= 0) {
                users[uIdx].orderCount = (users[uIdx].orderCount || 0) + 1;
                users[uIdx].totalSpent = (users[uIdx].totalSpent || 0) + summary.finalAmount;
                localStorage.setItem('easyshop_users_v3', JSON.stringify(users));
              }
            }
          }
        } catch (ue) {
          console.error('User stat update error:', ue);
        }

        const orderId = (result && result.order) ? result.order.orderId : (result && result.orderId ? result.orderId : ('ORD-' + Date.now().toString().slice(-8)));
        sessionStorage.setItem('latest_order', JSON.stringify((result && result.order) || orderData));
        window.location.href = \`order-complete.html?orderId=\${encodeURIComponent(orderId)}\`;
      } catch (err) {`;

if (html.includes(oldSubmit)) {
  html = html.replace(oldSubmit, newSubmit);
}

fs.writeFileSync(checkoutPath, html, 'utf8');
fs.writeFileSync(checkoutPubPath, html, 'utf8');
console.log('Updated checkout.html with member linkage!');
