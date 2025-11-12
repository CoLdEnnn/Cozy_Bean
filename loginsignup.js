document.addEventListener("DOMContentLoaded", () => {
    // --- Общие функции ---
    
    // Получает массив пользователей из LocalStorage
    function getUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }

    // Сохраняет массив пользователей в LocalStorage
    function saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Функция для отображения ошибок (сделана универсальной)
    function showError(input, message) {
        const parentDiv = input.closest('.input-group') || input.parentNode;
        const oldError = parentDiv.querySelector(".error-msg");
        if (oldError) oldError.remove();

        const div = document.createElement("div");
        div.className = "error-msg";
        div.textContent = message;
        div.setAttribute('aria-live', 'polite');
        div.style.color = "red";
        div.style.fontSize = "0.9rem";
        div.style.marginTop = "4px";
        parentDiv.appendChild(div);
    }
    
    // --- Навигация ---
    document.getElementById('signupbtnn')?.addEventListener('click', () => {
        window.location.href = 'signup.html';
    });
    document.getElementById('backToLogin')?.addEventListener('click', () => {
        window.location.href = 'login.html';
    });
    
    // --- Перенаправление на профиль, если уже вошел ---
    if (localStorage.getItem('currentUser') && window.location.pathname.includes('login.html')) {
        window.location.href = 'profile.html'; 
    }

    const signupForm = document.querySelector(".signup-form");
    
    if (signupForm) {
        const usernameInput = signupForm.querySelector("input[name='username']");
        const emailInput = signupForm.querySelector("input[name='email']");
        const passwordInput = signupForm.querySelector("input[name='password']");
        const confirmInput = signupForm.querySelector("input[name='confirm']");

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            signupForm.querySelectorAll(".error-msg").forEach(el => el.remove());

            let valid = true;

            // Валидация
            if (usernameInput.value.trim().length < 3) {
                showError(usernameInput, "Username must be at least 3 characters");
                valid = false;
            }
            if (!emailInput.value.includes("@")) {
                showError(emailInput, "Enter a valid email address");
                valid = false;
            }
            if (passwordInput.value.trim().length < 6) {
                showError(passwordInput, "Password must be at least 6 characters");
                valid = false;
            }
            if (confirmInput.value !== passwordInput.value) {
                showError(confirmInput, "Passwords do not match");
                valid = false;
            }
            
            if (!valid) return; // Прерываем, если валидация не пройдена
            
            // Проверка на уникальность и сохранение
            const username = usernameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            
            let users = getUsers();

            if (users.some(user => user.username === username || user.email === email)) {
                showError(usernameInput, 'User or email already exists!');
                return;
            }

            // Успешная регистрация
            users.push({ username, email, password });
            saveUsers(users);

            alert('Account created successfully! Please log in.');
            window.location.href = 'login.html';
        });
    }

    // ==========================================
    // 2. ЛОГИКА LOG IN (Вход)
    // ==========================================
    const loginForm = document.querySelector(".auth-form");

    if (loginForm) {
        const usernameInput = loginForm.querySelector("input[name='username']");
        const passwordInput = loginForm.querySelector("input[name='password']");

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            loginForm.querySelectorAll(".error-msg").forEach(el => el.remove());

            let valid = true;

            if (usernameInput.value.trim() === "") {
                showError(usernameInput, "Username is required");
                valid = false;
            } 
            if (passwordInput.value.trim() === "") {
                showError(passwordInput, "Password is required");
                valid = false;
            } 
            
            if (!valid) return; 
            const username = usernameInput.value.trim();
            const password = passwordInput.value;
            
            const users = getUsers();
            const user = users.find(u => u.username === username);

            if (user && user.password === password) {
                localStorage.setItem('currentUser', username);
                alert(`Welcome back, ${username}!`);
                window.location.href = 'profile.html';
            } else {
                showError(passwordInput, 'Invalid username or password.'); 
            }
        });
    }

    const modal = document.getElementById('resetModal');
    const resetButton = document.getElementById('resetButton'); 
   
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            if (modal) modal.style.display = 'block';
        });
    }
});