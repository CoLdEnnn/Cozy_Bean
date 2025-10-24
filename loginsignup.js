
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