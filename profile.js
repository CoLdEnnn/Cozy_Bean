document.addEventListener('DOMContentLoaded', () => {
    const currentUsername = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === currentUsername);

    const logoutBtn = document.getElementById('logoutButton');

    if (!user) {
        // Если пользователь не вошел, перенаправляем на страницу входа
        alert('Please log in to view your profile.');
        window.location.href = 'login.html'; 
        return;
    }

    // --- Отображение данных профиля ---
    document.getElementById('profileUsername').textContent = user.username;
    document.getElementById('displayUsername').textContent = user.username;
    document.getElementById('displayEmail').textContent = user.email;

    // --- Логика Log Out ---
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser'); // Удаляем текущего пользователя
            alert('You have been successfully logged out.');
            window.location.href = 'login.html'; // Перенаправляем на страницу входа
        });
    }
});