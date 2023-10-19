//Function to fetch detailed exchange data for specific cryptocurrencies
function fetchCoinGeckoExchangeRates() {
    const supportedCurrencies = [
        'bitcoin',
        'paypal-usd',
        'ethereum',
        'tether',
        'usd-coin',
        'ripple',
        'tron',
        'binancecoin',
        'dogecoin',
        'cardano',
        'euroe-stablecoin',
        'binance-peg-busd'
        
    ];
    const currenciesToFetch = supportedCurrencies.join(',');

    fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${currenciesToFetch}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    )
        .then((response) => response.json())
        .then((data) => {
            displayExchangeData(data);
        })
        .catch((error) => {
            console.error('Error fetching exchange data:', error);
        });
}

// Function to display exchange data including price, 24-hour volume, and market cap
function displayExchangeData(data) {
    const resultContainer = document.getElementById('cryptoRates');

    data.forEach((currencyData) => {
        const currencyName = currencyData.name;
        const price = currencyData.current_price;
        const volume = currencyData.total_volume;
        const marketCap = currencyData.market_cap;

        const rateElement = document.createElement('div');
        rateElement.classList.add('crypto-rate');
        rateElement.innerHTML = `
            <span class="crypto-symbol">${currencyName}</span>
            <span class="crypto-price">$${price.toFixed(2)}</span>
            <span class="crypto-volume">24hr Volume: $${volume.toFixed(2)}</span>
            <span class="crypto-market-cap">Market Cap: $${marketCap.toFixed(2)}</span>
        `;
        resultContainer.appendChild(rateElement);
    });
}
// Fetch and display detailed exchange data
fetchCoinGeckoExchangeRates();

//Function to perform the exchange conversion
document.getElementById('exchange-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from_currency').value;
    const toCurrency = document.getElementById('to_currency').value;

    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency},${toCurrency}&vs_currencies=usd`)
        .then(response => response.json())
        .then(data => {
            const fromRate = data[fromCurrency].usd;
            const toRate = data[toCurrency].usd;
             const result = (amount / toRate) * fromRate;

            // Display the result and enable the Proceed button
            const resultContainer = document.getElementById('result');
            resultContainer.textContent = `Result: ${amount} ${fromCurrency.toUpperCase()} = ${result.toFixed(2)} ${toCurrency.toUpperCase()}`;
            resultContainer.style.display = 'block';
            document.getElementById('proceed-button').disabled = false;

            // Proceed button click event
            document.getElementById('proceed-button').addEventListener('click', function () {
                // Redirect to the Perfect Money payment page with the result
                const resultValue = encodeURIComponent(`Amount: ${amount} ${fromCurrency.toUpperCase()} = ${result.toFixed(2)} ${toCurrency.toUpperCase()}`);
                //Please replace 'your_account' and other placeholders
                //window.location.href = `https://perfectmoney.is/payment_new.html?PAYEE_ACCOUNT=your_account&        PAYEE_NAME=Your%20Company&PAYMENT_ID=12345&PAYMENT_AMOUNT=${result}&PAYMENT_UNITS=USD&PAYMENT_BATCH_NUM=12345&PAYMENT_URL=${resultValue}`;
                window.location.href = 'https://perfectmoney.com/login.html';
             });
        })
        .catch(error => {
         console.error('Error fetching exchange rates from CoinGecko:', error);
        });
});


/*
        //display result
            const resultContainer = document.getElementById('result');
            resultContainer.textContent = `Result: ${amount} ${fromCurrency.toUpperCase()} = ${result.toFixed(2)} ${toCurrency.toUpperCase()}`;
        })
        .catch(error => {
            console.error('Error fetching exchange rates from CoinGecko:', error);
        });

        // Check if the Proceed button is clicked
    const proceedButton = document.getElementById('proceed-button');
    proceedButton.addEventListener('click', function () {
        // Redirect to an external URL when the Proceed button is clicked
        window.location.href = 'https://perfectmoney.com/login.html'; // Replace with your desired URL
    });
});
*/    