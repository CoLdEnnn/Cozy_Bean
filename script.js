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