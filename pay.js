let cartData;
let totalUSD = 0;
let activeCurrency = 'USD'; // Новая переменная для активной валюты

// Фиктивные курсы (1 USD = X Currency)
const MOCK_RATES = {
    'USD': 1.0,
    'EUR': 0.93, 
    'KZT': 470.00
};

// --- ЛОГИКА ЗАГРУЗКИ КОРЗИНЫ ---
const instantOrderData = localStorage.getItem('instantOrderData');

if (instantOrderData) {
    cartData = JSON.parse(instantOrderData);
    localStorage.removeItem('instantOrderData'); 
} else {
    cartData = JSON.parse(localStorage.getItem('cartData')) || [];
}

// --- ЛОГИКА ОТОБРАЖЕНИЯ И КОНВЕРТАЦИИ ---

function formatCurrency(amount, currency) {
    let symbol, fixed;
    if (currency === 'EUR') {
        symbol = '€';
        fixed = 2;
    } else if (currency === 'KZT') {
        symbol = '₸';
        fixed = 0; // Тенге обычно округляют до целых
    } else {
        symbol = '$';
        fixed = 2;
    }
    return `${symbol}${(amount).toFixed(fixed)}`;
}

function updateTotalDisplay() {
    const orderTotal = document.getElementById('order-total');
    if (!orderTotal || totalUSD === 0) return;

    const rate = MOCK_RATES[activeCurrency] || 1.0;
    const finalAmount = totalUSD * rate;
    
    orderTotal.textContent = formatCurrency(finalAmount, activeCurrency);

    // Обновление активного класса для кнопок
    document.querySelectorAll('.currency-btn').forEach(btn => {
        if (btn.getAttribute('data-currency') === activeCurrency) {
            btn.classList.add('active');
            btn.style.backgroundColor = '#6d3e37';
            btn.style.color = 'white';
        } else {
            btn.classList.remove('active');
            btn.style.backgroundColor = 'white';
            btn.style.color = '#6d3e37';
        }
    });
}


// --- ОСНОВНАЯ ЛОГИКА: РАСЧЕТ И ОБРАБОТКА ФОРМЫ ---

document.addEventListener('DOMContentLoaded', () => {

    const orderList = document.getElementById('order-list');
    const orderTotal = document.getElementById('order-total');

    // 1. Расчет и первичное отображение Total
    if (orderList && orderTotal) {
        orderList.innerHTML = '';
        totalUSD = 0; 

        cartData.forEach(item => {
            const li = document.createElement('li');
            const itemTotal = item.price * item.quantity;
            li.textContent = `${item.name} × ${item.quantity} — ${formatCurrency(itemTotal, 'USD')}`;
            orderList.appendChild(li);
            totalUSD += itemTotal;
        });

        // Отобразить сумму в выбранной по умолчанию (USD) валюте
        updateTotalDisplay(); 
    }
    
    // 2. Слушатели для переключения валют
    document.querySelectorAll('.currency-btn').forEach(button => {
        button.addEventListener('click', () => {
            activeCurrency = button.getAttribute('data-currency');
            updateTotalDisplay();
        });
    });


    // --- Валидация телефона и обработка формы ---
    const phoneInput = document.getElementById('phoneNumber');
    const paymentForm = document.getElementById('payment-form');
    const cardRadio = document.getElementById('card');
    const cashRadio = document.getElementById('cash');
    const cardDetails = document.getElementById('card-details');
    
    if (!phoneInput || !paymentForm) return;

    const phoneError = document.getElementById('phoneError');
    const phoneRegex = /^(\+7|8)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

    function validatePhoneNumber() {
        const phoneNumber = phoneInput.value.trim();
        if (phoneRegex.test(phoneNumber)) {
            phoneInput.classList.remove('is-invalid');
            phoneError.style.display = 'none';
            return true;
        } else {
            phoneInput.classList.add('is-invalid');
            phoneError.style.display = 'block';
            return false;
        }
    }

    phoneInput.addEventListener('input', validatePhoneNumber);
    phoneInput.addEventListener('blur', validatePhoneNumber);
    
    function toggleCardDetails() {
        if (cardRadio && cardRadio.checked) {
            cardDetails.style.display = 'block';
        } else {
            cardDetails.style.display = 'none';
        }
    }
    
    if (cardRadio && cashRadio && cardDetails) {
        toggleCardDetails();
        cardRadio.addEventListener('change', toggleCardDetails);
        cashRadio.addEventListener('change', toggleCardDetails);
    }

    paymentForm.addEventListener('submit', (e) => {
        
        const isPhoneValid = validatePhoneNumber();
        
        let isCardValid = true;
        if (cardRadio && cardRadio.checked) {
            const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
            const expiry = document.getElementById('expiry').value;
            const cvv = document.getElementById('cvv').value;

            if (cardNumber.length < 16 || expiry.length < 5 || cvv.length < 3) {
                isCardValid = false;
            }
        }

        if (!isPhoneValid || !isCardValid) {
            e.preventDefault(); 
            alert("Please correct the highlighted errors (phone number or card details) before submitting.");
            return;
        }
        
        if (cartData.length === 0) {
            e.preventDefault(); 
            alert("Your cart is empty!");
            return;
        }

        e.preventDefault(); 

        alert("✅ Your order has been placed successfully!");
        localStorage.removeItem('cartData');
        window.location.href = 'index.html';
    });
});