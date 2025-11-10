
// ===========================
// Unified Day/Night Mode (with Image Swap)
// ===========================
(() => {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const logo = document.getElementById('logo');
  const userIcon = document.querySelector('.login');
  const bagIcon = document.querySelector('.orderbag');

  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);

    // Цвета и фон
    document.body.style.backgroundColor = isDark ? '#121212' : '#ffffff';
    document.body.style.color = isDark ? '#f5f5f5' : '#222';

    const header = document.getElementById('header');
    if (header) header.style.backgroundColor = isDark ? '#1e1e1e' : '#f9f9f9';

    const sidebar = document.getElementById('section-sidebar');
    if (sidebar) {
      sidebar.style.backgroundColor = isDark ? '#181818' : '#fff8dc';
      sidebar.querySelectorAll('a').forEach(a => {
        a.style.color = isDark ? '#f1c40f' : '#000';
      });
    }

    document.querySelectorAll('main, section, .gallery-item, p, h2, h3, li').forEach(el => {
      el.style.color = isDark ? '#f5f5f5' : '#222';
      el.style.backgroundColor = isDark ? 'transparent' : '';
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.style.color = isDark ? '#f1c40f' : '#000';
    });

    // Смена изображений
    if (logo) logo.src = isDark ? 'images/logo-white.png' : 'images/logo.png';
    if (userIcon) userIcon.src = isDark ? 'images/user-white.png' : 'images/user.png';
    if (bagIcon) bagIcon.src = isDark ? 'images/bag-white.png' : 'images/bag.png';
  };

  // Загрузка сохранённой темы
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  // При клике — переключаем
  btn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Плавная смена иконок
  [logo, userIcon, bagIcon].forEach(icon => {
    if (icon) icon.style.transition = 'filter 0.3s ease, opacity 0.3s ease';
  });
})();