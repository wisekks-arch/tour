/**
 * EasyShop Cart & Wishlist Store
 * LocalStorage 기반 반응형 상태 관리
 */
const CartStore = {
  CART_KEY: 'easyshop_cart',
  WISHLIST_KEY: 'easyshop_wishlist',
  listeners: [],

  // Subscribe to changes
  subscribe(fn) {
    this.listeners.push(fn);
  },

  notify() {
    this.listeners.forEach(fn => {
      try { fn(this.getItems(), this.getWishlist()); } catch(e) { console.error(e); }
    });
    // Dispatch custom DOM event
    window.dispatchEvent(new CustomEvent('cart-updated', {
      detail: { cart: this.getItems(), count: this.getTotalCount() }
    }));
  },

  // Cart Methods
  getItems() {
    try {
      const data = localStorage.getItem(this.CART_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  addItem(product, optionName = '', quantity = 1) {
    const items = this.getItems();
    const existingIndex = items.findIndex(
      item => item.id === product.id && item.selectedOption === optionName
    );

    if (existingIndex > -1) {
      items[existingIndex].quantity += quantity;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        thumbnail: product.thumbnail || (product.images && product.images[0]) || '',
        selectedOption: optionName,
        quantity: Math.max(1, quantity),
        selected: true
      });
    }

    localStorage.setItem(this.CART_KEY, JSON.stringify(items));
    this.notify();
    return true;
  },

  updateQuantity(id, optionName, quantity) {
    let items = this.getItems();
    const target = items.find(item => item.id === id && item.selectedOption === optionName);
    if (target) {
      target.quantity = Math.max(1, quantity);
      localStorage.setItem(this.CART_KEY, JSON.stringify(items));
      this.notify();
    }
  },

  toggleSelect(id, optionName) {
    let items = this.getItems();
    const target = items.find(item => item.id === id && item.selectedOption === optionName);
    if (target) {
      target.selected = !target.selected;
      localStorage.setItem(this.CART_KEY, JSON.stringify(items));
      this.notify();
    }
  },

  toggleSelectAll(selectAll) {
    let items = this.getItems();
    items.forEach(i => i.selected = selectAll);
    localStorage.setItem(this.CART_KEY, JSON.stringify(items));
    this.notify();
  },

  removeItem(id, optionName) {
    let items = this.getItems();
    items = items.filter(item => !(item.id === id && item.selectedOption === optionName));
    localStorage.setItem(this.CART_KEY, JSON.stringify(items));
    this.notify();
  },

  removeSelected() {
    let items = this.getItems();
    items = items.filter(item => !item.selected);
    localStorage.setItem(this.CART_KEY, JSON.stringify(items));
    this.notify();
  },

  clearCart() {
    localStorage.removeItem(this.CART_KEY);
    this.notify();
  },

  getTotalCount() {
    const items = this.getItems();
    return items.reduce((acc, item) => acc + item.quantity, 0);
  },

  getSummary(couponDiscount = 0) {
    const items = this.getItems();
    const selectedItems = items.filter(item => item.selected !== false);
    
    const productTotal = selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const originalTotal = selectedItems.reduce((acc, item) => acc + (item.originalPrice * item.quantity), 0);
    const totalSavings = originalTotal - productTotal;

    // 50,000원 이상 무료배송 (미만 시 3,000원)
    const freeShippingThreshold = 50000;
    const shippingFee = (productTotal >= freeShippingThreshold || productTotal === 0) ? 0 : 3000;
    const finalAmount = Math.max(0, productTotal + shippingFee - couponDiscount);

    return {
      totalCount: selectedItems.reduce((acc, item) => acc + item.quantity, 0),
      productTotal,
      originalTotal,
      totalSavings,
      shippingFee,
      freeShippingThreshold,
      remainingForFreeShipping: Math.max(0, freeShippingThreshold - productTotal),
      couponDiscount,
      finalAmount,
      selectedItems
    };
  },

  // Wishlist Methods
  getWishlist() {
    try {
      const data = localStorage.getItem(this.WISHLIST_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  toggleWishlist(product) {
    let wishlist = this.getWishlist();
    const index = wishlist.findIndex(item => item.id === product.id);
    let isAdded = false;

    if (index > -1) {
      wishlist.splice(index, 1);
      isAdded = false;
    } else {
      wishlist.push({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        thumbnail: product.thumbnail || (product.images && product.images[0]) || ''
      });
      isAdded = true;
    }

    localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(wishlist));
    this.notify();
    return isAdded;
  },

  isWishlisted(productId) {
    const wishlist = this.getWishlist();
    return wishlist.some(item => item.id === productId);
  }
};
