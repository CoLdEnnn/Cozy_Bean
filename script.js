// ===========================
// Мадияр
// ===========================
(() => {
  if (!document.getElementById('date-time')) {
    const span = document.createElement('span');
    span.id = 'date-time';
    span.hidden = true;
    document.body.appendChild(span);
  }
})();   

// ===========================
// Аккордеон
// ===========================
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


// ===========================
// Background Color Change (Specials)
// ===========================
(() => {
  const btn = document.getElementById('change-bg');
  if (!btn) return; // не на этой странице — выходим

  const main = document.getElementById('main') || document.body;
  const sections = Array.from(main.querySelectorAll('section'));

  const palette = ['#fef7de', '#fff8e6', '#f7f4ef', '#f3efe7', '#fcf9f0'];

  const applyColor = (color) => {
    main.style.backgroundColor = color;
    sections.forEach(s => { s.style.backgroundColor = color; });
  };

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


// ===========================
// Form Validation (Login Page)
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".auth-form");
  if (!form) return;

  const username = form.querySelector("input[name='username']");
  const password = form.querySelector("input[name='password']");

  function showError(input, message) {
    const oldError = input.parentNode.querySelector(".error-msg");
    if (oldError) oldError.remove();

    const div = document.createElement("div");
    div.className = "error-msg";
    div.textContent = message;
    div.style.color = "red";
    div.style.fontSize = "0.9rem";
    div.style.marginTop = "4px";
    input.parentNode.appendChild(div);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.querySelectorAll(".error-msg").forEach(el => el.remove());

    let valid = true;

    if (username.value.trim() === "") {
      showError(username, "Username is required");
      valid = false;
    } else if (username.value.trim().length < 3) {
      showError(username, "Username must be at least 3 characters");
      valid = false;
    }

    if (password.value.trim() === "") {
      showError(password, "Password is required");
      valid = false;
    } else if (password.value.trim().length < 6) {
      showError(password, "Password must be at least 6 characters");
      valid = false;
    }

    if (valid) {
      alert("Login successful!");
      form.reset();
    }
  });
});


// ===========================
// Signup Validation
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".signup-form");
  if (!form) return;

  const username = form.querySelector("input[name='username']");
  const email = form.querySelector("input[name='email']");
  const password = form.querySelector("input[name='password']");
  const confirm = form.querySelector("input[name='confirm']");

  function showError(input, message) {
    const old = input.parentNode.querySelector(".error-msg");
    if (old) old.remove();
    const div = document.createElement("div");
    div.className = "error-msg";
    div.textContent = message;
    div.style.color = "red";
    div.style.fontSize = "0.9rem";
    div.style.marginTop = "4px";
    input.parentNode.appendChild(div);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.querySelectorAll(".error-msg").forEach(el => el.remove());
    let valid = true;

    if (username.value.trim().length < 3) {
      showError(username, "Username must be at least 3 characters");
      valid = false;
    }

    if (!email.value.includes("@")) {
      showError(email, "Enter a valid email address");
      valid = false;
    }

    if (password.value.trim().length < 6) {
      showError(password, "Password must be at least 6 characters");
      valid = false;
    }

    if (confirm.value !== password.value) {
      showError(confirm, "Passwords do not match");
      valid = false;
    }

    if (valid) {
      alert("Account created successfully!");
      form.reset();
    }
  });
});


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
// Keyboard Navigation for Sidebar
// ===========================

const sidebarLinks = document.querySelectorAll('#section-sidebar nav a');
let currentIndex = 0;

sidebarLinks[currentIndex].focus();

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();

    sidebarLinks[currentIndex].classList.remove('active');

    if (e.key === 'ArrowDown') {
      currentIndex = (currentIndex + 1) % sidebarLinks.length;
    } else if (e.key === 'ArrowUp') {
      currentIndex = (currentIndex - 1 + sidebarLinks.length) % sidebarLinks.length;
    }

    sidebarLinks[currentIndex].classList.add('active');

    sidebarLinks[currentIndex].focus();

    const targetId = sidebarLinks[currentIndex].getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

// ===========================
// Sound Effects and Animations
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Function to play notification sound
    function playNotificationSound() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    // Function to add click sound to buttons
    function addClickSound(element) {
        element.addEventListener('click', function(e) {
            playNotificationSound();
        });
    }
    
    // Function to add hover animation
    function addHoverAnimation(element) {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Function to add bounce animation on click
    function addBounceAnimation(element) {
        element.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            }, 100);
        });
    }
    
    // Apply sound and animations to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        addClickSound(button);
        addHoverAnimation(button);
        addBounceAnimation(button);
    });
    
    // Special handler for Contact Us button
    const contactBtn = document.getElementById('openPopupBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            playNotificationSound();
        }, { capture: true });
    }
    
    // Apply hover animations to navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        addHoverAnimation(link);
    });
    
    // Apply animations to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        addHoverAnimation(img);
    });
    
    // Add fade-in animation to main content
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(20px)';
        mainContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Add accordion animation for about.html
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.style.transform = 'scaleY(0)';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.transform = 'scaleY(1)';
            }
            content.style.transition = 'max-height 0.3s ease, transform 0.3s ease';
            playNotificationSound();
        });
    });


    //маДИЯР 1 таск 
    // =========================
    // ===========================
// 🌙 Task 1 — Day/Night Mode
// ===========================
(() => {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const applyTheme = (theme) => {
    document.body.classList.toggle('dark-mode', theme === 'dark');
  };

  // Восстановить из localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  btn.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
})();


// ===========================
// ☕ Task 2 — Callback + Switch Statement
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
});
// ===========================
// Task 3 — Advanced JS Concepts (Aimaut)
// ===========================

// OBJECTS AND METHODS
const coffeeMenu = {
  espresso: { price: 2.5, desc: "Strong and rich classic shot of coffee" },
  latte: { price: 3.5, desc: "Espresso with steamed milk and creamy foam" },
  cappuccino: { price: 3.0, desc: "Balanced mix of espresso, milk, and foam" },
  croissant: { price: 2.2, desc: "Freshly baked buttery croissant" },
  cheesecake: { price: 4.0, desc: "Classic New York cheesecake slice" },

  // Метод для вывода описания напитка
  showInfo(itemName) {
    if (this[itemName]) {
      alert(`${itemName.toUpperCase()} — $${this[itemName].price}\n${this[itemName].desc}`);
    } else {
      alert("Item not found in menu.");
    }
  }
};

// ARRAYS AND LOOPS
const coffeeArray = [
  { name: "Espresso", price: 2.5, img: "images/espresso.png" },
  { name: "Latte", price: 3.5, img: "images/latte.png" },
  { name: "Cappuccino", price: 3.0, img: "images/cappucino.png" },
  { name: "Croissant", price: 2.2, img: "images/croissant.png" },
  { name: "Cheesecake", price: 4.0, img: "images/cheesecake.png" }
];

// создаём карточки динамически
const menuSection = document.querySelector(".cards-menu");
if (menuSection) {
  menuSection.innerHTML = ""; // очищаем
  for (let i = 0; i < coffeeArray.length; i++) {
    const c = coffeeArray[i];
    const card = document.createElement("div");
    card.className = "card-menu";
    card.innerHTML = `
      <img src="${c.img}" alt="${c.name}">
      <h3>${c.name}</h3>
      <p>Price: $${c.price.toFixed(2)}</p>
      <button class="info-btn" data-item="${c.name.toLowerCase()}">Details</button>
    `;
    menuSection.appendChild(card);
  }

  // слушатели на кнопки “Details” (чтобы alert точно работал)
  document.querySelectorAll(".info-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const item = e.target.dataset.item;
      coffeeMenu.showInfo(item);
    });
  });
}

// HIGHER-ORDER FUNCTIONS (map/filter/forEach)
// создаём кнопку
const showAffordableBtn = document.createElement("button");
showAffordableBtn.textContent = "Show Affordable Drinks (under $3.50)";
showAffordableBtn.style.marginTop = "15px";
showAffordableBtn.style.padding = "7px";
showAffordableBtn.style.borderRadius = "15px";
showAffordableBtn.style.background = "#7b4b2a";
showAffordableBtn.style.color = "white";
showAffordableBtn.style.cursor = "pointer";

const cheapList = document.createElement("div");
cheapList.id = "cheap-list";

const menuWrapper = document.getElementById("menu-section");
if (menuWrapper) {
  menuWrapper.appendChild(showAffordableBtn);
  menuWrapper.appendChild(cheapList);

  showAffordableBtn.addEventListener("click", () => {
    // очищаем перед каждым выводом
    cheapList.innerHTML = "";

    const cheapCoffee = coffeeArray.filter(item => item.price < 3.5);
    cheapList.innerHTML = "<h3>Affordable Choices</h3>";

    cheapCoffee.forEach(coffee => {
      const p = document.createElement("p");
      p.textContent = `${coffee.name} — $${coffee.price}`;
      cheapList.appendChild(p);
    });

    // выводим названия в консоль тоже
    console.log("Cheap items:", cheapCoffee.map(i => i.name));
  });
}
