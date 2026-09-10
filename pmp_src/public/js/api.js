/**
 * PMP Exam Master - API Client
 */
const API = {
  BASE_URL: '',

  async getQuestions(domain = '', methodology = '') {
    try {
      let url = `${this.BASE_URL}/api/questions`;
      const params = new URLSearchParams();
      if (domain) params.append('domain', domain);
      if (methodology) params.append('methodology', methodology);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (e) {
      console.warn('API getQuestions failed, loading fallback local data:', e);
      const res = await fetch('data/questions.json');
      return await res.json();
    }
  },

  async getFormulas() {
    try {
      const res = await fetch(`${this.BASE_URL}/api/formulas`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (e) {
      const res = await fetch('data/formulas.json');
      return await res.json();
    }
  },

  async getGlossary() {
    try {
      const res = await fetch(`${this.BASE_URL}/api/glossary`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (e) {
      const res = await fetch('data/glossary.json');
      return await res.json();
    }
  },

  async getStats() {
    try {
      const res = await fetch(`${this.BASE_URL}/api/stats`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (e) {
      return { totalQuestions: 12, people: 5, process: 5, business: 2 };
    }
  },

  async saveQuestion(questionData, isEdit = false) {
    const url = isEdit ? `${this.BASE_URL}/api/questions?id=${questionData.id}` : `${this.BASE_URL}/api/questions`;
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(questionData)
    });
    return await res.json();
  },

  async deleteQuestion(id) {
    const res = await fetch(`${this.BASE_URL}/api/questions?id=${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  }
};
