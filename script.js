//Мадияр

(() => {
  if (!document.getElementById('date-time')) {
    const span = document.createElement('span');
    span.id = 'date-time';
    span.hidden = true;
    document.body.appendChild(span);
  }
})();




let accordionButtons = document.querySelectorAll(".accordion-btn");

accordionButtons.forEach(button => {
  button.addEventListener("click", () => {
    let content = button.nextElementSibling;

    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
});

function updateDateTime() {
  const now = new Date(); 
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit'
  };
  document.getElementById('date-time').textContent = now.toLocaleString('en-US', options);
}

setInterval(updateDateTime, 1000);
updateDateTime();


// ===========================
// Task 4 — Background Color Change (Specials)
// ===========================
// --- Task 4: Background Color Change (Specials)
(() => {
  const btn = document.getElementById('change-bg');
  if (!btn) return; // не на этой странице — выходим

  const main = document.getElementById('main') || document.body;
  const sections = Array.from(main.querySelectorAll('section')); // все карточки

  // мягкая бренд-палитра
  const palette = ['#fef7de', '#fff8e6', '#f7f4ef', '#f3efe7', '#fcf9f0'];

  // применяем цвет к main + всем секциям
  const applyColor = (color) => {
    main.style.backgroundColor = color;      // фон между карточками
    sections.forEach(s => { s.style.backgroundColor = color; }); // фон самих карточек
  };

  // восстановить последний выбранный цвет
  let i = Number(localStorage.getItem('bgIndex') || 0) % palette.length;
  if (Number.isNaN(i)) i = 0;
  applyColor(palette[i]);

  btn.addEventListener('click', () => {
    i = (i + 1) % palette.length;
    const color = palette[i];
    applyColor(color);
    localStorage.setItem('bgIndex', String(i));
  });
})();
