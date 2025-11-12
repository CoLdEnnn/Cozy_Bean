const API_KEY = '59511af6369f39643d9e4410'; 
const BASE_CURRENCY = 'USD'; 
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${BASE_CURRENCY}`;

async function fetchExchangeRates() {
    const container = document.getElementById('exchange-rate-container');
    
    if (!container) {
        console.error("Element with ID 'exchange-rate-container' not found in HTML.");
        return;
    }

    container.innerHTML = 'Loading exchange rates...'; 

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.result === 'error') {
            throw new Error(`API Error: ${data['error-type']}`);
        }
        
        const rates = data.conversion_rates;
        
        const eurRate = rates['EUR'];
        const kztRate = rates['KZT'];

        let html = `
            <p>Base Currency: 1 ${BASE_CURRENCY}</p>
            <ul>
                <li>${BASE_CURRENCY} to EUR: ${eurRate ? eurRate.toFixed(4) : 'No Data'}</li>
                <li>${BASE_CURRENCY} to KZT: ${kztRate ? kztRate.toFixed(2) : 'No Data'}</li>
            </ul>
            <small>Updated: ${new Date().toLocaleTimeString('en-US')}</small>
        `;

        container.innerHTML = html;

    } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
        container.innerHTML = `<p style="color: red;">Error loading rates: ${error.message}. Please check API key or connection.</p>`;
    }
}

fetchExchangeRates();