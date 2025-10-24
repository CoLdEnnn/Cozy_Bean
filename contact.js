// ===========================
// Popup Subscription Form
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById('openPopupBtn');
  const closeBtn = document.getElementById('closePopupBtn');
  const popup = document.getElementById('popupOverlay');

  if (!openBtn || !closeBtn || !popup) return; // если элементов нет — не выполняем

  openBtn.addEventListener('click', () => {
    popup.style.display = 'flex';
  });

  closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  popup.addEventListener('click', (e) => {
    if (e.target === popup) popup.style.display = 'none';
  });
});
