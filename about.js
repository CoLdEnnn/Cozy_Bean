// ===========================
// Accordion Functionality 
// ===========================
$(function() {
  $('.accordion-content').hide();

  document.querySelectorAll('.accordion-btn').forEach((btn) => {
    btn.addEventListener('click', function(e) {
      // Intercept before global handlers in script.js
      e.preventDefault();
      e.stopPropagation();

      const $btn = $(this);
      const $content = $btn.next('.accordion-content');
      const isExpanded = $btn.attr('aria-expanded') === 'true';

      $('.accordion-content').not($content).stop(true, true).slideUp(200);
      $content.stop(true, true).slideToggle(200);

      $btn.attr('aria-expanded', !isExpanded); // Обновляем ARIA
    }, true);
  });
});

// ===========================
// Task 8. Copy to Clipboard Button
// ===========================
function copyName(buttonElement) {
  const $btn = $(buttonElement);
  const $card = $btn.closest('article');
  const title = $card.find('h3').text().trim();

  // Проверка на наличие tooltip (если нет — создаём один общий)
  let $tooltip = $('#global-tooltip');
  if ($tooltip.length === 0) {
    $tooltip = $('<div id="global-tooltip" aria-live="polite" />').css({ // ARIA для доступности
      position: 'absolute',
      background: '#222',
      color: '#fff',
      padding: '5px 10px',
      borderRadius: '6px',
      fontSize: '13px',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      pointerEvents: 'none'
    }).appendTo(document.body);
  }

  navigator.clipboard.writeText(title).then(() => {
    const originalIcon = $btn.text();
    $btn.text('✅');

    const rect = buttonElement.getBoundingClientRect();
    const top = window.scrollY + rect.top - 35;
    const left = window.scrollX + rect.left + rect.width / 2;

    $tooltip.text('Copied!')
      .css({ top: top + 'px', left: left + 'px', transform: 'translateX(-50%)', opacity: 1 });

    setTimeout(() => {
      $btn.text(originalIcon);
      $tooltip.css('opacity', 0);
    }, 1500);
  }).catch(err => {
    console.error('Ошибка при копировании:', err);
  });
}

