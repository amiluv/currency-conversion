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
        'binance-peg-busd',
        'perfectmoney-usd'
        
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

    let exchangeRate;
    const constantRates = {
        "perfect-money": 0.99
    };

    if (fromCurrency === "perfect-money") {
        exchangeRate = amount * constantRates["perfect-money"];
    } else if (toCurrency === "perfect-money") {
        exchangeRate = amount / constantRates["perfect-money"];
    } else {
        fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency},${toCurrency}&vs_currencies=usd`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const fromRate = data[fromCurrency] ? data[fromCurrency].usd : undefined;
                const toRate = data[toCurrency] ? data[toCurrency].usd : undefined;

                if (fromRate !== undefined && toRate !== undefined) {
                    exchangeRate = (amount / fromRate) * toRate;

                    // Display the result and enable the Proceed button
                    const resultContainer = document.getElementById('result');
                    resultContainer.textContent = `Result: ${amount} ${fromCurrency.toUpperCase()} = ${exchangeRate.toFixed(5)} ${toCurrency.toUpperCase()}`;
                    resultContainer.style.display = 'block';
                    document.getElementById('proceed-button').disabled = false;
                } else {
                    throw new Error('Currency rates not found in the CoinGecko response');
                }
            })
            .catch(error => {
                console.error('Error fetching exchange rates from CoinGecko:', error);
            });
    }
});

/*<script>
    document.getElementById('exchange-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from_currency').value;
    const toCurrency = document.getElementById('to_currency').value;

    let exchangeRate;

    const constantRates = {
        'perfect-money-usd': 0.99,
        'perfect-money-eur': 1.1,
    };

    if (fromCurrency === 'perfect-money-usd') {
        exchangeRate = amount * constantRates['perfect-money-usd'];
    } else if (fromCurrency === 'perfect-money-eur') {
        exchangeRate = amount * constantRates['perfect-money-eur'];
    } else if (toCurrency === 'perfect-money-usd') {
        exchangeRate = amount / constantRates['perfect-money-usd'];
    } else if (toCurrency === 'perfect-money-eur') {
        exchangeRate = amount / constantRates['perfect-money-eur'];
    } else {
        fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency},${toCurrency}&vs_currencies=usd`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const fromRate = data[fromCurrency] ? data[fromCurrency].usd : undefined;
                const toRate = data[toCurrency] ? data[toCurrency].usd : undefined;

                if (fromRate !== undefined && toRate !== undefined) {
                    exchangeRate = (amount / fromRate) * toRate;

                    // Display the result and enable the Proceed button
                    const resultContainer = document.getElementById('result');
                    resultContainer.textContent = `Result: ${amount} ${fromCurrency.toUpperCase()} = ${exchangeRate.toFixed(4)} ${toCurrency.toUpperCase()}`;
                    resultContainer.style.display = 'block';
                    document.getElementById('proceed-button').disabled = false;
                } else {
                    throw new Error('Currency rates not found in the CoinGecko response');
                }
            })
            .catch(error => {
                console.error('Error fetching exchange rates from CoinGecko:', error);
            });
    }
});

</script>
*/