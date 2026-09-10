/**
 * EasyShop REST API Client Module
 */
const ShopAPI = {
  BASE_URL: window.location.origin,

  async request(endpoint, options = {}) {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    try {
      const response = await fetch(`${this.BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers
        }
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorBody || response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.warn(`API fetch failed on ${endpoint}:`, error.message);
      return this.fallback(endpoint, options);
    }
  },

  async fallback(endpoint, options) {
    try {
      if (endpoint.startsWith('/api/categories')) {
        const res = await fetch('/data/categories.json');
        return await res.json();
      }
      if (endpoint.startsWith('/api/products')) {
        const res = await fetch('/data/products.json');
        const list = await res.json();
        const urlObj = new URL('http://dummy.com' + endpoint);
        const id = urlObj.searchParams.get('id');
        if (id) {
          const item = list.find(p => p.id === id);
          if (item) return item;
        }
        return list;
      }
      if (endpoint.startsWith('/api/orders')) {
        const res = await fetch('/data/orders.json');
        return await res.json();
      }
      if (endpoint.startsWith('/api/inquiries')) {
        const res = await fetch('/data/inquiries.json');
        return await res.json();
      }
    } catch (e) {
      console.error('Fallback failed:', e);
    }
    return [];
  },

  // Categories
  async getCategories() {
    return await this.request('/api/categories');
  },

  // Products
  async getProducts(params = {}) {
    const query = new URLSearchParams();
    if (params.category && params.category !== '전체') query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.sort) query.append('sort', params.sort);
    if (params.minPrice) query.append('minPrice', params.minPrice);
    if (params.maxPrice) query.append('maxPrice', params.maxPrice);
    if (params.isBest) query.append('isBest', 'true');
    if (params.isNew) query.append('isNew', 'true');
    if (params.isSale) query.append('isSale', 'true');
    if (params.isFreeShipping) query.append('isFreeShipping', 'true');

    const qs = query.toString() ? `?${query.toString()}` : '';
    return await this.request(`/api/products${qs}`);
  },

  async getProductById(id) {
    return await this.request(`/api/products?id=${encodeURIComponent(id)}`);
  },

  async createProduct(productData) {
    return await this.request('/api/products', {
      method: 'POST',
      body: JSON.stringify(productData)
    });
  },

  async updateProduct(id, productData) {
    return await this.request(`/api/products?id=${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify(productData)
    });
  },

  async deleteProduct(id) {
    return await this.request(`/api/products?id=${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
  },

  // Orders
  async getOrders(params = {}) {
    const query = new URLSearchParams();
    if (params.status && params.status !== '전체') query.append('status', params.status);
    if (params.search) query.append('search', params.search);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return await this.request(`/api/orders${qs}`);
  },

  async getOrderById(orderId) {
    return await this.request(`/api/orders?orderId=${encodeURIComponent(orderId)}`);
  },

  async createOrder(orderData) {
    return await this.request('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },

  async updateOrderStatus(orderId, status, trackingNumber = '') {
    return await this.request(`/api/orders?orderId=${encodeURIComponent(orderId)}`, {
      method: 'PUT',
      body: JSON.stringify({ status, trackingNumber })
    });
  },

  // Inquiries
  async getInquiries() {
    return await this.request('/api/inquiries');
  },

  async createInquiry(inquiryData) {
    return await this.request('/api/inquiries', {
      method: 'POST',
      body: JSON.stringify(inquiryData)
    });
  },

  async answerInquiry(id, answer) {
    return await this.request(`/api/inquiries?id=${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify({ answer, status: '답변완료', answeredAt: new Date().toISOString().replace('T', ' ').substring(0, 16) })
    });
  },

  // Admin Stats
  async getStats() {
    return await this.request('/api/stats');
  }
};
