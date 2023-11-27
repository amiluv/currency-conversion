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
            const price = currencyData.current_price * 1.05;
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
                    if (toCurrency === 'usd-coin'){
                        resultContainer.textContent = `You will get: ${result.toFixed(5)} ${'PERFECT MONEY'}`;
                    } else {
                        resultContainer.textContent = `You will get: ${result.toFixed(5)} ${toCurrency.toUpperCase()}`;
                    }
                    
                    resultContainer.style.display = 'block';
                    document.getElementById('proceed-button').disabled = false;
        
                    // Proceed button click event
                    document.getElementById('proceed-button').addEventListener('click', function() {
                        const amount = parseFloat(document.getElementById('amount').value);
                        const fromCurrency = document.getElementById('from_currency').value;
                        
                        // Get wallet address based on the selected fromCurrency
                        let walletAddress = ' ';
                        if (fromCurrency === 'bitcoin') {
                            walletAddress = 'bc1qsf946ej4thzae4xh76jxt4czwaeqjgushk0fdc';
                        } else if (fromCurrency === 'ethereum') {
                            walletAddress = '0x89c9D44Eb40876bb1F9A5cc30b0b7a0CA61A1E72';
                        } else if (fromCurrency === 'tether') {
                            walletAddress = 'TVb8VMB3iGGkSTHG8k7MrYvrcUTmnc7EPc';
                        } else if (fromCurrency === 'tron') {
                            walletAddress = 'TBDAUKpTF1Tfk1UFmXsGoJ9UA5D8A7pVwK';
                        } else if (fromCurrency === 'usd-coin') {
                            walletAddress = 'U41039047';
                        } else if (fromCurrency === 'binance-peg-busd') {
                            walletAddress = '0x89c9D44Eb40876bb1F9A5cc30b0b7a0CA61A1E72';
                        } else if (fromCurrency === 'binancecoin') {
                            walletAddress = '0x6219861499476b630f5859d69803d944d4b26025';
                        } else if (fromCurrency === 'dogecoin') {
                            walletAddress = 'DNtGpsu8mp3nrAcP2WNeVnnTr5bZWw4UFD';
                        } else if (fromCurrency === 'cardano') {
                            walletAddress = 'addr1v8hxjs6pk7mx45y34we9nxxtkqdvfs9ez4jqawcklweknuqt34hwu';
                        } else{
                            return 'An error occured, check your entries and try again!'
                        }
                        // You'd add more conditions for other currencies as needed
                    
                        // Redirect to payment page with relevant details
                        
                        const paymentURL = `payment_page.html?amount=${amount}&currency=${fromCurrency}&address=${walletAddress}`;                       
                        window.location.href = paymentURL;
                    });
                    
                })
                .catch(error => {
                console.error('Error fetching exchange rates from CoinGecko:', error);
                });
            
    
    });