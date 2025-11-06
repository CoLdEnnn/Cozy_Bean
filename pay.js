let cartData = JSON.parse(localStorage.getItem('cartData')) || [];

const orderList = document.getElementById('order-list');
const orderTotal = document.getElementById('order-total');

if (orderList && orderTotal) {
  orderList.innerHTML = '';
  let total = 0;

  cartData.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} × ${item.quantity} — $${(item.price * item.quantity).toFixed(2)}`;
    orderList.appendChild(li);
    total += item.price * item.quantity;
  });

  orderTotal.textContent = `$${total.toFixed(2)}`;
}

const paymentForm = document.getElementById('payment-form');
if (paymentForm) {
  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (cartData.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    alert("✅ Your order has been placed successfully!");
    localStorage.removeItem('cartData');
    window.location.href = 'index.html';
  });
}