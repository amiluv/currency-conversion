// Retrieve the result from the resultContainer
const resultContainer = document.getElementById('result');
const resultText = resultContainer.textContent;

// Extract the amount from the result text
const regex = /Result: (\d+(\.\d+)?) (\S+) = (\d+(\.\d+)?) (\S+)/;
const matches = resultText.match(regex);

if (matches && matches.length === 7) {
    const amount = matches[1];
    const fromCurrency = matches[3];
    const toCurrency = matches[5];

    // Encode the company name and other parameters for the Perfect Money URL
    const encodedCompanyName = encodeURIComponent('Pulmp Exchange');
    const encodedAmount = encodeURIComponent(amount);

    // Create a hidden form element
    const form = document.createElement('form');
    form.setAttribute('action', 'https://perfectmoney.com/api/step1.asp');
    form.setAttribute('method', 'POST');
    form.style.display = 'none';

    // Define form fields and values
    const fields = {
        PAYEE_ACCOUNT: 'U41039047',
        PAYEE_NAME: encodedCompanyName,
        PAYMENT_ID: '12345', // Replace with your preferred payment ID
        PAYMENT_AMOUNT: encodedAmount,
        PAYMENT_UNITS: toCurrency,
        STATUS_URL: 'info@pulmpexchange.com', // Replace with your preferred status URL
        PAYMENT_URL: 'https://pulmpexchange.com/my-account/', // Replace with your preferred payment URL
        PAYMENT_URL_METHOD: 'LINK',
        NOPAYMENT_URL: 'https://pulmpexchange.com/', // Replace with your preferred no payment URL
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