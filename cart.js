
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