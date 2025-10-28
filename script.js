
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
// Create audio context for sound effects
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
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

function addClickSound(element) {
    element.addEventListener('click', function(e) {
        playNotificationSound();
    });
}

function addHoverAnimation(element) {
    element.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    addClickSound(button);
    addHoverAnimation(button);
});

const contactBtn = document.getElementById('openPopupBtn');
if (contactBtn) {
    contactBtn.addEventListener('click', function(e) {
        playNotificationSound();
    }, { capture: true });
}

const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    addHoverAnimation(link);
});

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

// ===========================
// Day-Night Mode
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

const orderBag = document.querySelector('.orderbag');
const cart = document.getElementById('cart');
const overlay = document.getElementById('overlay');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');

let payButton = document.createElement('button');
payButton.id = 'pay-btn';
payButton.textContent = 'Pay Now';
document.getElementById('cart-total').appendChild(payButton);

orderBag.addEventListener('click', toggleCart);
closeCart.addEventListener('click', toggleCart);
overlay.addEventListener('click', toggleCart);

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
      <button class="remove-item">✖</button>
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

function showToast(message) {
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;
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
