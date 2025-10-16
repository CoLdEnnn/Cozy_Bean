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


// ===========================
// Аймаут 1 таска — Form Validation (Login Page)
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".auth-form");
  if (!form) return; // если форма не найдена — выходим

  const username = form.querySelector("input[name='username']");
  const password = form.querySelector("input[name='password']");

  // Функция для отображения ошибки под полем
  function showError(input, message) {
    // Удалим старое сообщение, если есть
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

    // Очистим старые ошибки
    form.querySelectorAll(".error-msg").forEach(el => el.remove());

    let valid = true;

    // Проверка имени
    if (username.value.trim() === "") {
      showError(username, "Username is required");
      valid = false;
    } else if (username.value.trim().length < 3) {
      showError(username, "Username must be at least 3 characters");
      valid = false;
    }

    // Проверка пароля
    if (password.value.trim() === "") {
      showError(password, "Password is required");
      valid = false;
    } else if (password.value.trim().length < 6) {
      showError(password, "Password must be at least 6 characters");
      valid = false;
    }

    // Если всё правильно
    if (validucce) {
      alert("Login sssful!");
      form.reset();
    }
  });
});
// ===========================
// Аймаут 1 таска — Signup Validation
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".signup-form");
  if (!form) return; // если не на странице signup — выходим

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

    // Проверки
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
