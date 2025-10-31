// ===========================
// Popup Subscription Form
// ===========================

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

  // ===========================
// Task 6: Loading Spinner on Submit
// ===========================

const form = document.querySelector('#popupOverlay form');
if (form) {
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Создаем сам спиннер
    const spinner = document.createElement('span');
    spinner.style.width = '16px';
    spinner.style.height = '16px';
    spinner.style.border = '2px solid #f2e3d5';
    spinner.style.borderTop = '2px solid #7b4b2a';
    spinner.style.borderRadius = '50%';
    spinner.style.display = 'inline-block';
    spinner.style.marginRight = '8px';
    spinner.style.verticalAlign = 'middle';
    spinner.style.animation = 'spin 0.7s linear infinite';

    // Добавляем анимацию вращения через @keyframes
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    // Изменяем кнопку
    submitBtn.disabled = true;
    submitBtn.style.backgroundColor = '#b38b67';
    submitBtn.style.color = '#fff';
    submitBtn.style.opacity = '0.9';
    submitBtn.style.cursor = 'not-allowed';
    submitBtn.style.transition = 'background-color 0.3s ease';
    submitBtn.innerHTML = ''; // очищаем текст
    submitBtn.appendChild(spinner);
    submitBtn.appendChild(document.createTextNode(' Sending...'));

    // Имитация отправки данных
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.style.backgroundColor = '#7b4b2a';
      submitBtn.style.opacity = '1';
      submitBtn.style.cursor = 'pointer';
      submitBtn.innerText = 'Send Message';

      // close popup и сбросить форму
      document.getElementById('popupOverlay').style.display = 'none';
      alert('✅ Message sent successfully!');
      form.reset();
    }, 2000);
  });
}

