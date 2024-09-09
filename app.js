document.getElementById('loan-form').addEventListener('submit', function(e) {
    // Prevent form submission
    e.preventDefault();

    // Hide results and show loading spinner
    document.getElementById('results').style.display = "none";
    document.getElementById('loading').style.display = "block";

    // Call calculate function after a delay
    setTimeout(function() {
        calculate(); // Call calculate without passing e
    }, 2000);
});

function calculate() {
    // Get the form inputs
    const amount = document.getElementById('loan_amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly_payment');
    const yearlyPayment = document.getElementById('yearly_payment');
    const totalAmount = document.getElementById('total_amount');
    const totalInterest = document.getElementById('total_interest');

    // Parsing the values entered by the user
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12; // Monthly interest rate
    const calculatedPayments = parseFloat(years.value) * 12; // Total number of months

    // Validation to check if specific inputs are missing or invalid
    if (isNaN(principal) || principal <= 0) {
        showAlert("Please enter a valid Loan Amount");
        return;
    }

    if (isNaN(calculatedInterest) || calculatedInterest <= 0) {
        showAlert("Please enter a valid Interest Rate");
        return;
    }

    if (isNaN(calculatedPayments) || calculatedPayments <= 0) {
        showAlert("Please enter valid Years to Pay");
        return;
    }

    // Calculate monthly payment using the loan formula
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    // If the calculation is valid (monthly is a finite number)
    if (isFinite(monthly)) {
        // Display the monthly, yearly, total amount, and total interest
        monthlyPayment.value = monthly.toFixed(2); // Monthly payment
        yearlyPayment.value = (monthly * 12).toFixed(2); // Yearly payment
        totalAmount.value = (monthly * calculatedPayments).toFixed(2); // Total amount paid
        totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2); // Total interest

        // Show the results section and hide loading spinner
        document.getElementById('results').style.display = "block";
        document.getElementById('loading').style.display = "none";
    } else {
        showAlert("Please enter valid values.");
    }
}

function showAlert(message) {
    // Remove existing alert if there is one
    const currentAlert = document.querySelector('.alert');
    if (currentAlert) {
        currentAlert.remove();
    }

    // Create a new alert div
    const errorDiv = document.createElement('div');

    // Add Bootstrap classes for the error alert
    errorDiv.className = "alert alert-danger";
    errorDiv.appendChild(document.createTextNode(message));

    // Get the parent card and heading to insert the alert
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Insert the error message above the heading
    card.insertBefore(errorDiv, heading);

    // Remove the alert after 3 seconds
    setTimeout(function() {
        const alert = document.querySelector(".alert");
        if (alert) {
            alert.remove();
        }
    }, 3000);
}
