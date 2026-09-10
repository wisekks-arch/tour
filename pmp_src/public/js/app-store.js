/**
 * PMP Exam Master - State Store (LocalStorage-backed)
 */
const AppStore = {
  KEYS: {
    EXAM_STATE: 'pmp_current_exam_state',
    BOOKMARKS: 'pmp_bookmarked_questions',
    INCORRECT: 'pmp_incorrect_questions',
    HISTORY: 'pmp_exam_history',
    SETTINGS: 'pmp_user_settings'
  },

  // Settings
  getSettings() {
    const raw = localStorage.getItem(this.KEYS.SETTINGS);
    return raw ? JSON.parse(raw) : {
      bilingual: true,
      fontSize: 'normal', // 'normal', 'large', 'xl'
      sound: true
    };
  },

  saveSettings(settings) {
    localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings));
  },

  // Bookmarks
  getBookmarks() {
    const raw = localStorage.getItem(this.KEYS.BOOKMARKS);
    return raw ? JSON.parse(raw) : [];
  },

  isBookmarked(questionId) {
    return this.getBookmarks().includes(questionId);
  },

  toggleBookmark(questionId) {
    let list = this.getBookmarks();
    if (list.includes(questionId)) {
      list = list.filter(id => id !== questionId);
    } else {
      list.push(questionId);
    }
    localStorage.setItem(this.KEYS.BOOKMARKS, JSON.stringify(list));
    return list.includes(questionId);
  },

  // Incorrect Questions Record
  getIncorrectQuestions() {
    const raw = localStorage.getItem(this.KEYS.INCORRECT);
    return raw ? JSON.parse(raw) : [];
  },

  recordIncorrectQuestion(questionId, selectedAnswer, correctAnswer, domain) {
    let list = this.getIncorrectQuestions();
    const existingIdx = list.findIndex(item => item.id === questionId);
    const record = {
      id: questionId,
      selectedAnswer,
      correctAnswer,
      domain,
      timestamp: new Date().toISOString(),
      failCount: existingIdx >= 0 ? (list[existingIdx].failCount + 1) : 1
    };

    if (existingIdx >= 0) {
      list[existingIdx] = record;
    } else {
      list.push(record);
    }
    localStorage.setItem(this.KEYS.INCORRECT, JSON.stringify(list));
  },

  removeIncorrectQuestion(questionId) {
    let list = this.getIncorrectQuestions().filter(item => item.id !== questionId);
    localStorage.setItem(this.KEYS.INCORRECT, JSON.stringify(list));
  },

  // Exam History
  getExamHistory() {
    const raw = localStorage.getItem(this.KEYS.HISTORY);
    return raw ? JSON.parse(raw) : [];
  },

  saveExamResult(result) {
    let history = this.getExamHistory();
    history.unshift({
      id: 'res-' + Date.now(),
      date: new Date().toLocaleString(),
      ...result
    });
    localStorage.setItem(this.KEYS.HISTORY, JSON.stringify(history));
  }
};
