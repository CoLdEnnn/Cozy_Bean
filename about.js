// ===========================
// Accordion Functionality 
// ===========================
$(function() {
  $('.accordion-content').hide();

  document.querySelectorAll('.accordion-btn').forEach((btn) => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      const $btn = $(this);
      const $content = $btn.next('.accordion-content');
      const isExpanded = $btn.attr('aria-expanded') === 'true';

      $('.accordion-content').not($content).stop(true, true).slideUp(200);
      $content.stop(true, true).slideToggle(200);

      $btn.attr('aria-expanded', !isExpanded); 
    }, true);
  });
});
