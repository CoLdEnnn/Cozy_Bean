// ===========================
// Day-Night Mode
// ==========================
(() => {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);

    // Основные цвета для тела и текста
    document.body.style.backgroundColor = isDark ? '#121212' : '#ffffff';
    document.body.style.color = isDark ? '#f5f5f5' : '#222';

    // Хедер
    const header = document.getElementById('header');
    if (header) {
      header.style.backgroundColor = isDark ? '#1e1e1e' : '#f9f9f9';
    }

    // Боковая панель
    const sidebar = document.getElementById('section-sidebar');
    if (sidebar) {
      sidebar.style.backgroundColor = isDark ? '#181818' : '#fff8dc';
      sidebar.querySelectorAll('a').forEach(a => {
        a.style.color = isDark ? '#f1c40f' : '#000';
      });
    }

    // Контентные секции
    document.querySelectorAll('main, section, .gallery-item, p, h2, h3, li').forEach(el => {
      el.style.color = isDark ? '#f5f5f5' : '#222';
      el.style.backgroundColor = isDark ? 'transparent' : '';
    });

    // Ссылки навигации сверху
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.style.color = isDark ? '#f1c40f' : '#000';
    });
  };

  // Загружаем сохранённую тему
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  // Смена темы по клику
  btn.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
})();


// ===========================
// Scroll Progress Bar
// ===========================
$(document).ready(function() {
  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    var docHeight = $(document).height();
    var winHeight = $(window).height();
    var scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
    $('#scrollProgressBar').css('width', scrollPercent + '%');
  });
});

// ===========================
// Cart System (with safety checks)
// ===========================
const orderBag = document.querySelector('.orderbag');
const cart = document.getElementById('cart');
const overlay = document.getElementById('overlay');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');
const cartTotal = document.getElementById('cart-total');

if (cart && overlay && closeCart && cartItems && totalPrice && cartTotal) {
  let payButton = document.createElement('button');
  payButton.id = 'pay-btn';
  payButton.textContent = 'Pay Now';
  cartTotal.appendChild(payButton);

  if (orderBag && closeCart && overlay) {
    orderBag.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    overlay.addEventListener('click', toggleCart);
  }

  function toggleCart() {
    cart.classList.toggle('active');
    overlay.classList.toggle('active');
  }

  let cartData = JSON.parse(localStorage.getItem('cartData')) || [];
  updateCart();

  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      const price = parseFloat(button.getAttribute('data-price'));

      const existingItem = cartData.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartData.push({ name, price, quantity: 1 });
      }

      saveCart();
      updateCart();
      showToast(`${name} added to cart 🛒`);
    });
  });

  function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cartData.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${item.name} — $${item.price} × ${item.quantity}
        <button class="remove-item" aria-label="Remove item">✖</button>
      `;
      li.querySelector('.remove-item').addEventListener('click', () => removeItem(item.name));
      cartItems.appendChild(li);
      total += item.price * item.quantity;
    });
    totalPrice.textContent = `$${total.toFixed(2)}`;
  }

  function removeItem(name) {
    cartData = cartData.filter(item => item.name !== name);
    saveCart();
    updateCart();
  }

  function saveCart() {
    localStorage.setItem('cartData', JSON.stringify(cartData));
  }

  payButton.addEventListener('click', () => {
    if (cartData.length === 0) {
      showToast("Your cart is empty!");
      return;
    }
    window.location.href = 'pay.html';
  });
}

// ===========================
// Toast Notifications
// ===========================
function showToast(message) {
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;
  toast.setAttribute('aria-live', 'assertive'); // ARIA для тостов
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 100);

  const toasts = document.querySelectorAll('.toast');
  toasts.forEach((t, i) => {
    t.style.bottom = `${30 + i * 60}px`;
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}