/**
 * PMP Exam Master - Shared UI Components
 */
const Components = {
  renderNavbar(activePage = 'home') {
    const navEl = document.getElementById('main-navbar');
    if (!navEl) return;

    navEl.innerHTML = `
      <nav class="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <!-- Logo -->
            <div class="flex items-center gap-3">
              <a href="index.html" class="flex items-center gap-2 group">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-sky-500/30 group-hover:scale-105 transition-transform">
                  <i data-lucide="award" class="w-6 h-6"></i>
                </div>
                <div>
                  <div class="font-bold text-lg font-heading tracking-tight text-white flex items-center gap-1.5">
                    PMP Exam Master
                    <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">PMBOK 7th</span>
                  </div>
                  <div class="text-[11px] text-slate-400">PMI-PMP 자격증 실전 모의고사 & 학습 플랫폼</div>
                </div>
              </a>
            </div>

            <!-- Nav Links -->
            <div class="hidden md:flex items-center gap-1">
              <a href="index.html" class="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${activePage === 'home' ? 'bg-sky-600 text-white font-semibold shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800'}">
                대시보드
              </a>
              <a href="exam.html" class="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${activePage === 'exam' ? 'bg-sky-600 text-white font-semibold shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800'}">
                <i data-lucide="timer" class="w-4 h-4 text-amber-400"></i> 실전 모의고사
              </a>
              <a href="study.html" class="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${activePage === 'study' ? 'bg-sky-600 text-white font-semibold shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800'}">
                영역별 학습
              </a>
              <a href="formulas.html" class="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${activePage === 'formulas' ? 'bg-sky-600 text-white font-semibold shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800'}">
                <i data-lucide="calculator" class="w-4 h-4 text-emerald-400"></i> EVM 계산기
              </a>
              <a href="flashcards.html" class="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${activePage === 'flashcards' ? 'bg-sky-600 text-white font-semibold shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800'}">
                핵심 용어집
              </a>
              <a href="review.html" class="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${activePage === 'review' ? 'bg-sky-600 text-white font-semibold shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800'}">
                <i data-lucide="bookmark" class="w-4 h-4 text-rose-400"></i> 오답/북마크
              </a>
            </div>

            <!-- Right utilities -->
            <div class="flex items-center gap-2.5">
              <a href="admin.html" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1">
                <i data-lucide="settings" class="w-3.5 h-3.5"></i> 관리자
              </a>
              <a href="exam.html" class="px-4 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-md shadow-sky-500/20 transition-all flex items-center gap-1">
                <i data-lucide="play" class="w-3.5 h-3.5"></i> 시험 시작
              </a>
            </div>
          </div>
        </div>
      </nav>
    `;
    if (window.lucide) window.lucide.createIcons();
  },

  renderFooter() {
    const footerEl = document.getElementById('main-footer');
    if (!footerEl) return;

    footerEl.innerHTML = `
      <footer class="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-20 py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div class="flex justify-center items-center gap-2 font-bold text-slate-200">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            PMI-PMP® PMBOK Guide 7th Edition & Process Groups Alignment
          </div>
          <p class="max-w-2xl mx-auto text-slate-500 text-[11px] leading-relaxed">
            본 플랫폼은 PMI(Project Management Institute)의 PMP 자격증 수험생을 위한 실전 모의고사 및 인터랙티브 학습 시뮬레이터입니다.<br>
            People(42%), Process(50%), Business Environment(8%) 및 Agile/Hybrid 방법론을 균형 있게 다룹니다.
          </p>
          <div class="pt-4 text-slate-600 text-[10px]">
            © 2026 PMP Exam Master. Designed for PMP Success.
          </div>
        </div>
      </footer>
    `;
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container') || (() => {
      const div = document.createElement('div');
      div.id = 'toast-container';
      div.className = 'fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none';
      document.body.appendChild(div);
      return div;
    })();

    const toast = document.createElement('div');
    const bgColors = {
      success: 'bg-emerald-600 text-white',
      error: 'bg-rose-600 text-white',
      info: 'bg-sky-600 text-white',
      warning: 'bg-amber-600 text-white'
    };

    toast.className = `${bgColors[type] || bgColors.info} px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-sm font-medium transform transition-all duration-300 opacity-0 translate-y-3 pointer-events-auto border border-white/10`;
    toast.innerHTML = `
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove('opacity-0', 'translate-y-3');
      toast.classList.add('opacity-100', 'translate-y-0');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'translate-y-3');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
};
