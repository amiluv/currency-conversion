document.addEventListener('DOMContentLoaded', function() {
    // Set your countdown duration in seconds (e.g., 15 minutes = 900 seconds)
    const countdownDuration = 900; // Change this according to your needs
    const timerDisplay = document.getElementById('timer');
    
    // Calculate the end time by adding the duration to the current time
    const endTime = new Date().getTime() + countdownDuration * 1000;

    // Function to update the countdown timer
    function updateTimer() {
        const currentTime = new Date().getTime();
        const timeLeft = endTime - currentTime;

        // Calculate minutes and seconds from milliseconds
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Display the timer
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Check if the countdown is finished
        if (timeLeft <= 0) {
            clearInterval(timerInterval); // Stop the timer
            redirectToHomePage();
        }
    }

    // Function to redirect to the home page
    function redirectToHomePage() {
        window.location.href = 'index.html';
    }

    // Update the timer every second
    const timerInterval = setInterval(updateTimer, 1000);
});

 
 // Retrieve URL parameters and set payment details
 document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get('amount');
    const currency = urlParams.get('currency');
    const address = urlParams.get('address');
    const network = urlParams.get('network');
    const email = urlParams.get('email');
    
    if (currency === 'usd-coin'){
        // Encode the company name and other parameters for the Perfect Money URL
        const encodedAmount = encodeURIComponent(amount);
        
        // Create a hidden form element
        const form = document.createElement('form');
        form.setAttribute('action', 'https://perfectmoney.com/api/step1.asp');
        form.setAttribute('method', 'POST');
        form.style.display = 'none';
        
        // Define form fields and values
        const fields = {
            PAYEE_ACCOUNT: 'U41039047',
            PAYEE_NAME: "Pulmp Exchange",
            PAYMENT_ID: '542312', // Replace with your preferred payment ID
            PAYMENT_AMOUNT: encodedAmount,
            PAYMENT_UNITS: 'USD',
            STATUS_URL: 'https://www.myshop.com/cgi-bin/xact.cgi', // Replace with your preferred status URL 
            PAYMENT_URL: 'https://www.myshop.com/cgi-bin/chkout1.cgi', // Replace with your preferred paymentURL
            PAYMENT_URL_METHOD: 'LINK',
            NOPAYMENT_URL: 'https://www.myshop.com/cgi-bin/chkout2.cgi', // Replace with your preferred nopayment URL
            NOPAYMENT_URL_METHOD: 'LINK',
            SUGGESTED_MEMO: '', // Replace with your preferred memo
            BAGGAGE_FIELDS: '',
            PAYMENT_METHOD: 'Pay_Now!'
        };
        // Loop through fields and create input elements
        for (const fieldName in fields) {
            if (fields.hasOwnProperty(fieldName)) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = fieldName;
                input.value = fields[fieldName];
                form.appendChild(input);
            }
        }
        // Append the form to the document
        document.body.appendChild(form);
        // Submit the form
        form.submit();
    }
    
        
    else {
        document.getElementById('amountToPay').textContent = `${amount} ${currency}`;
        
    }
    document.getElementById('walletAddress').textContent = address;
    document.getElementById('network').textContent = network;

    // Generate QR code for the wallet address
    const qrCodeElement = document.getElementById('qrcode');
    new QRCode(qrCodeElement, {
        text: address,
        width: 128,
        height: 128,
    });
})


document.querySelector('.proceed-btn').addEventListener('click', function() {
    alert("Payment captured successfully, click 'OK' to proceed");
    console.log('Email sent successfully');
    setTimeout(function() {
        window.location.href = 'thank_you.html';
    }, 3000);
});

