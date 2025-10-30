// ============================
// Task 3 — Search Highlighting (fixed)
// ============================
$(document).ready(function () {
  // создаём поле поиска сверху страницы
  const searchInput = $('<input type="text" id="search" placeholder="Search in blog...">')
    .css({
      padding: "10px",
      width: "60%",
      margin: "15px auto",
      display: "block",
      borderRadius: "8px",
      border: "1px solid #ccc"
    });
  $("#main").prepend(searchInput);

  $("#search").on("keyup", function () {
    let keyword = $(this).val().trim().toLowerCase();

    // убираем старую подсветку
    $(".highlight").each(function () {
      $(this).replaceWith($(this).text());
    });

    if (keyword.length === 0) return;

    // ищем все тексты и подсвечиваем совпадения
    $("#main *").each(function () {
      if (this.children.length === 0 && $(this).text().toLowerCase().includes(keyword)) {
        let regex = new RegExp(`(${keyword})`, "gi");
        $(this).html($(this).text().replace(regex, '<span class="highlight">$1</span>'));
      }
    });
  });
});

// стиль для подсветки
$("<style>")
  .prop("type", "text/css")
  .html(`
  .highlight {
    background-color: yellow;
    font-weight: bold;
    padding: 2px 4px;
    border-radius: 3px;
  }`)
  .appendTo("head");


// ============================
// Task 9 — Image Lazy Loading
// ============================
$(document).ready(function () {
  $(".gallery img").each(function () {
    const realSrc = $(this).attr("src");
    $(this).attr("data-src", realSrc);
    $(this).removeAttr("src");
  });

  function lazyLoad() {
    $(".gallery img").each(function () {
      let imgTop = $(this).offset().top;
      let windowBottom = $(window).scrollTop() + $(window).height();

      if (imgTop < windowBottom + 100) {
        if (!$(this).attr("src")) {
          $(this).attr("src", $(this).data("src"));
        }
      }
    });
  }

  $(window).on("scroll", lazyLoad);
  lazyLoad();
});
