// ===========================
// Время
// ===========================
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

// ===========================
// Кнопка "Show Time"
// ===========================
const timeButton = document.getElementById('show-time-btn');
const timeDisplay = document.getElementById('date-time');
let timer = null;

if (timeButton && timeDisplay) {
  timeButton.addEventListener('click', () => {
    if (timeDisplay.style.display === 'none') {
      timeDisplay.style.display = 'block';
      updateDateTime();
      timer = setInterval(updateDateTime, 1000);
      timeButton.textContent = 'Hide Time';
    } else {

      timeDisplay.style.display = 'none';
      clearInterval(timer);
      timeButton.textContent = 'Show Time';
    }
  });
}

// ----------- Рейтинг ----------- //
const ratings = document.querySelectorAll('.rating');

ratings.forEach(rating => {
  const stars = rating.querySelectorAll('.star');
  const itemName = rating.dataset.item;
  const savedRating = localStorage.getItem(`rating_${itemName}`) || 0;

  if (savedRating > 0) highlightStars(stars, savedRating);

  stars.forEach(star => {
    star.addEventListener('click', () => {
      const value = parseInt(star.dataset.value);
      highlightStars(stars, value);
      localStorage.setItem(`rating_${itemName}`, value);
    });
  });
});

function highlightStars(stars, value) {
  stars.forEach((s, i) => {
    if (i < value) s.classList.add('selected');
    else s.classList.remove('selected');
  });
}

// ----------- Read More ----------- //
const aboutSection = document.querySelector('.About');
if (aboutSection) {
  const extraText = document.createElement('p');
  extraText.textContent =
    "Our Coffee sustainably sourced beans roasted to perfection for the best flavor experience.";
  extraText.classList.add('hidden-text');
  extraText.style.display = 'none';

  const button = document.createElement('button');
  button.textContent = 'Read more';
  button.classList.add('readmore-btn');

  const lastParagraph = aboutSection.querySelector('p:last-of-type');
  lastParagraph.insertAdjacentElement('afterend', extraText);
  extraText.insertAdjacentElement('afterend', button);

  button.addEventListener('click', () => {
    const isVisible = extraText.style.display === 'block';
    extraText.style.display = isVisible ? 'none' : 'block';
    button.textContent = isVisible ? 'Read more' : 'Show less';
  });
}

// ===========================
// Callback + Switch Statement
// ===========================

// Функция с использованием switch для выбора кофе по времени суток
function getCoffeeSuggestion(hour) {
  let suggestion = "";
  switch (true) {
    case hour < 12:
      suggestion = "☀️ Good morning! Try our energizing Espresso to start your day!";
      break;
    case hour < 18:
      suggestion = "🌤 Afternoon mood? A creamy Latte would be perfect for you!";
      break;
    default:
      suggestion = "🌙 Evening vibes — relax with a cozy Cappuccino before bed.";
  }
  return suggestion;
}

// Функция callback — принимает другую функцию и выполняет её
function showCoffee(callback) {
  const result = callback(new Date().getHours());
  document.getElementById("mood-result").textContent = result;
}

// Обработчик нажатия кнопки
const moodBtn = document.getElementById("mood-btn");
if (moodBtn) {
  moodBtn.addEventListener("click", () => {
    showCoffee(getCoffeeSuggestion);
  });
}

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

$(document).ready(function() {
  console.log("Autocomplete is ready!");
  const cities = [
    "Almaty, Tole bi 59",
    "Almaty, Dostyk Ave 120",
    "Astana, Mangilik El 55",
    "Astana, Kabanbay Batyr Ave 10",
    "Shymkent, Kunaev Ave 23",
    "Karaganda, Abay St. 14",
    "Aktobe, Auezov St. 8",
    "Kostanay, Baymagambetov St. 77",
    "Pavlodar, Nazarbayev Ave 44",
    "Taraz, Tole bi St. 18"
  ];
  const $input = $("#autocompleteInput");
  const $list = $("#suggestionsList");
  $input.on("keyup", function() {
    const value = $(this).val().toLowerCase();
    $list.empty();
    if (value.length > 0) {
      const filtered = cities.filter(city => city.toLowerCase().includes(value));
      if (filtered.length > 0) {
        filtered.forEach(city => {
          $list.append(`<li>${city}</li>`);
        });
        $list.addClass("show");
      } else {
        $list.removeClass("show");
      }
    } else {
      $list.removeClass("show");
    }
  });

  $list.on("click", "li", function() {
    $input.val($(this).text());
    $list.removeClass("show");
  });

  $input.on("blur", function() {
    setTimeout(() => $list.removeClass("show"), 150);
  });
});