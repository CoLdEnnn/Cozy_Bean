// ===========================
// Accordion Functionality
// ===========================
let accordionButtons = document.querySelectorAll(".accordion-btn");

accordionButtons.forEach(button => {
  button.addEventListener("click", () => {
    let content = butВton.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
  });
});

// ===========================
// Task 8. Copy to Clipboard Button
// ===========================
function copyName(buttonElement) {
  const card = buttonElement.closest('article'); // ищем ближайший article
  const title = card.querySelector('h3').textContent.trim(); // берём текст из h3
  const btn = buttonElement;

  // Проверка на наличие tooltip (если нет — создаём один общий)
  let tooltip = document.getElementById('global-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'global-tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.background = '#222';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '5px 10px';
    tooltip.style.borderRadius = '6px';
    tooltip.style.fontSize = '13px';
    tooltip.style.opacity = '0';
    tooltip.style.transition = 'opacity 0.3s ease';
    tooltip.style.pointerEvents = 'none';
    document.body.appendChild(tooltip);
  }

  navigator.clipboard.writeText(title).then(() => {
    // Меняем иконку
    const originalIcon = btn.textContent;
    btn.textContent = '✅';

    // Позиционируем tooltip
    const rect = btn.getBoundingClientRect();
    const top = window.scrollY + rect.top - 35;
    const left = window.scrollX + rect.left + rect.width / 2;

    tooltip.textContent = 'Copied!';
    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.opacity = '1';

    // Возвращаем всё обратно через 1.5 сек
    setTimeout(() => {
      btn.textContent = originalIcon;
      tooltip.style.opacity = '0';П
    }, 1500);
  }).catch(err => {
    console.error('Ошибка при копировании:', err);
  });
}
