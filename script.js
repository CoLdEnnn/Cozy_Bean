// ===========================
// Day-Night Mode
// ==========================
(() => {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);

    // Основные цвета для тела и текста
    document.body.style.backgroundColor = isDark ? '#121212' : '#ffffff';
    document.body.style.color = isDark ? '#f5f5f5' : '#222';

    // Хедер
    const header = document.getElementById('header');
    if (header) {
      header.style.backgroundColor = isDark ? '#1e1e1e' : '#f9f9f9';
    }

    // Боковая панель
    const sidebar = document.getElementById('section-sidebar');
    if (sidebar) {
      sidebar.style.backgroundColor = isDark ? '#181818' : '#fff8dc';
      sidebar.querySelectorAll('a').forEach(a => {
        a.style.color = isDark ? '#f1c40f' : '#000';
      });
    }

    // Контентные секции
    document.querySelectorAll('main, section, .gallery-item, p, h2, h3, li').forEach(el => {
      el.style.color = isDark ? '#f5f5f5' : '#222';
      el.style.backgroundColor = isDark ? 'transparent' : '';
    });

    // Ссылки навигации сверху
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.style.color = isDark ? '#f1c40f' : '#000';
    });
  };

  // Загружаем сохранённую тему
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  // Смена темы по клику
  btn.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
})();


// ===========================
// Scroll Progress Bar
// ===========================
$(document).ready(function() {
  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    var docHeight = $(document).height();
    var winHeight = $(window).height();
    var scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
    $('#scrollProgressBar').css('width', scrollPercent + '%');
  });
});

// ===========================
// Toast Notifications
// ===========================
function showToast(message) {
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;
  toast.setAttribute('aria-live', 'assertive'); // ARIA для тостов
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 100);

  const toasts = document.querySelectorAll('.toast');
  toasts.forEach((t, i) => {
    t.style.bottom = `${30 + i * 60}px`;
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

document.getElementById('clickableImage').onclick = function() {
  window.location.href = 'login.html';
}