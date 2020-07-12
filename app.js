// this listens for submits:

document.getElementById('loan-form').addEventListener('submit', function(e) {
    //hide results
    document.getElementById('results').style.display = 'none';

    //loader
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults, 500);
    e.preventDefault();
});

// calculate the results
function calculateResults() {
    // UI Values:
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calcInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    // Monthly payment
    const x = Math.pow(1 + calcInterest, calculatedPayment);
    const monthly = (principal * x * calcInterest) / (x - 1);


    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2);

        document.getElementById('results').style.display = 'block';

        document.getElementById('loading').style.display = 'none';
    } else {

        showError('Um... Please Check Your Numbers')

    }


}


// Show the error:
function showError(error) {
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
    // Make the div
    const errorDiv = document.createElement('div');
    // Get the elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    // Add the class
    errorDiv.className = 'alert alert-danger';
    // Make the text node append to the div
    errorDiv.appendChild(document.createTextNode(error));
    // Insert error over the heading
    card.insertBefore(errorDiv, heading);
    //timeout after 3 secs.
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}