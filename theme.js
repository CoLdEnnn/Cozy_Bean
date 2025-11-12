// ===========================
// Unified Day/Night Mode (with Image Swap)
// ==========================
(function() {
  'use strict';
  
  function initTheme() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) {
      console.warn('Theme toggle button not found');
      return;
    }

    const logo = document.getElementById('logo');
    const userIcon = document.querySelector('.login');
    const bagIcon = document.querySelector('.orderbag');

    const updateButtonIcon = (isDark) => {
      const btn = document.getElementById('theme-toggle');
      if (btn) {
        btn.style.opacity = '0.5';
        setTimeout(() => {
          btn.textContent = isDark ? '☀️' : '🌙';
          btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
          btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
          btn.style.opacity = '1';
        }, 150);
      }
    };

    const applyTheme = (theme) => {
      const isDark = theme === 'dark';
      
      if (isDark) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }

      updateButtonIcon(isDark);

      if (logo) {
        logo.src = isDark ? 'images/logo-white.png' : 'images/logo.png';
      }
      if (userIcon) {
        userIcon.src = isDark ? 'images/user-white.png' : 'images/user.png';
      }
      if (bagIcon) {
        bagIcon.src = isDark ? 'images/bag-white.png' : 'images/bag.png';
      }
      
      localStorage.setItem('theme', theme);
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const currentHasDark = document.body.classList.contains('dark-mode');
      const newTheme = currentHasDark ? 'light' : 'dark';
      applyTheme(newTheme);
    });

    [logo, userIcon, bagIcon].forEach(icon => {
      if (icon) {
        icon.style.transition = 'opacity 0.3s ease';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();
