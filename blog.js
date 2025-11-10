// ============================
//Search Highlighting (fixed)
// ============================
$(document).ready(function () {
  const searchInput = $('<input type="text" id="search" placeholder="Search in blog..." aria-label="Search in blog">')
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

    $(".highlight").each(function () {
      $(this).replaceWith($(this).text());
    });

    if (keyword.length === 0) return;

    $("#main *").each(function () {
      if (this.children.length === 0 && $(this).text().toLowerCase().includes(keyword)) {
        let regex = new RegExp(`(${keyword})`, "gi");
        $(this).html($(this).text().replace(regex, '<span class="highlight">$1</span>'));
      }
    });
  });
});

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
