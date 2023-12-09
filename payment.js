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

    if (currency === 'usd-coin'){
        document.getElementById('amountToPay').textContent = `${amount} ${'perfect Money'}`;
        window.location.href = 'pmpmt.html';
    }else {
        document.getElementById('amountToPay').textContent = `${amount} ${currency}`;
    }
    document.getElementById('walletAddress').textContent = address;

    // Generate QR code for the wallet address
    const qrCodeElement = document.getElementById('qrcode');
    new QRCode(qrCodeElement, {
        text: address,
        width: 128,
        height: 128,
    });
})


document.querySelector('.proceed-btn').addEventListener('click', function() {
   
    // Get payment details
    const amountToPay = document.getElementById('amountToPay').textContent;
    const name = document.getElementById('name').value;
    const recipientWallet = document.querySelector('.rec_wallet').value;
    const payerEmail = document.querySelector('.email').value;

    if (recipientWallet !== '' && payerEmail !== '' && name !== '') {
        // Create an object with payment details
        const paymentDetails = {
            amount: amountToPay,
            name: name,
            recipientWallet: recipientWallet,
            payerEmail: payerEmail
        }
        //declear your service IDs
        const serviceID = 'service_nc011go';
        const templateID = 'template_k6o7h6l';

        emailjs.send(serviceID,templateID,paymentDetails)
        .then(res =>{
            alert("Payment captured sucessfully, click 'OK' to proceed");
            console.log('Email sent successfully');
            setTimeout(function() {
                window.location.href = 'thank_you.html';
            }, 3000);
        })


        /*/ Send payment details to the server to handle email sending
        fetch('pop.gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentDetails)
        })
        .then(response => {
            // Handle response from the server if needed
            console.log('Email sent successfully');
        })
        .catch(error => {
            console.error('Error sending email:', error);
        });
        alert('Payment processing...');
        /*setTimeout(function() {
            window.location.href = 'thank_you.html';
        }, 3000);*/
    } else {
        // Show an error message or handle the case where values are not entered
        alert('All input fields are required!');
        document.querySelector('.rec_wallet').focus();
        if (recipientWallet !== ''){
            document.getElementById('name').focus();
        } else if (name !== ''){
            document.querySelector('.email').focus();
        }
    }  
});