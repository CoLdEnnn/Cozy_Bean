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

    const applyTheme = (theme) => {
      const isDark = theme === 'dark';
      
      // Toggle dark-mode class on body - CSS will handle most styling
      if (isDark) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }

      // Swap images (only elements that exist)
      if (logo) {
        logo.src = isDark ? 'images/logo-white.png' : 'images/logo.png';
      }
      if (userIcon) {
        userIcon.src = isDark ? 'images/user-white.png' : 'images/user.png';
      }
      if (bagIcon) {
        bagIcon.src = isDark ? 'images/bag-white.png' : 'images/bag.png';
      }
      
      // Save to localStorage
      localStorage.setItem('theme', theme);
    };

    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Remove any existing event listeners by cloning the button
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    // Toggle theme on button click
    newBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const currentHasDark = document.body.classList.contains('dark-mode');
      const newTheme = currentHasDark ? 'light' : 'dark';
      applyTheme(newTheme);
    });

    // Add smooth transitions for icons
    [logo, userIcon, bagIcon].forEach(icon => {
      if (icon) {
        icon.style.transition = 'opacity 0.3s ease';
      }
    });
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    // DOM is already ready
    initTheme();
  }
})();
