
/*Display error message to the user*/
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
}

/*Hide the error message container*/
function hideError() {
    const errorDiv = document.getElementById('error-message');
    errorDiv.classList.remove('show');
}

/*Function to validate input*/
function validateInput(value, min, max, fieldName) {
    // Return false if value is empty
    if (!value) return false;
    
    // Convert to number and check if valid
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
        showError(`Please enter a valid number for ${fieldName}`);
        return false;
    }
    
    // Check if within allowed range
    if (numValue < min || numValue > max) {
        showError(`${fieldName} must be between ${min} and ${max}`);
        return false;
    }
    
    return true;
}


function calculateBMI() {
    // Get input values
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;

    // Clear previous results
    document.getElementById('result').innerHTML = '';
    document.getElementById('category').innerHTML = '';
    document.getElementById('category').className = 'category';

    // Validate that at least one field is filled
    if (!weight && !height) {
        showError('Please fill in at least one field (weight or height) to calculate BMI');
        return;
    }

    // Validate weight (1-590 kg)
    if (weight && !validateInput(weight, 1, 590, 'Weight')) {
        return;
    }

    // Validate height (1-300 cm)
    if (height && !validateInput(height, 1, 300, 'Height')) {
        return;
    }

    // Convert height from centimeters to meters
    const heightInMeters = parseFloat(height) / 100;

    // Calculate BMI using the formula: weight / height²
    const bmi = parseFloat(weight) / (heightInMeters * heightInMeters);

    // Validate BMI calculation result
    if (isNaN(bmi) || !isFinite(bmi)) {
        showError('Unable to calculate BMI. Please check your input values.');
        return;
    }

    // Hide error message if calculation is successful
    hideError();

    // Round BMI to 1 decimal place
    const roundedBMI = bmi.toFixed(1);

    // Display BMI result
    document.getElementById('result').innerHTML = `Your BMI is: ${roundedBMI}`;

    // Determine BMI category and associated health risk
    let category = '';
    let categoryClass = '';

    // Classify BMI according to Asian BMI scale
    if (bmi < 18.5) {
        category = 'Underweight - Higher risk of nutritional deficiency diseases';
        categoryClass = 'underweight';
    } else if (bmi >= 18.5 && bmi < 23) {
        category = 'Normal - Low risk';
        categoryClass = 'normal';
    } else if (bmi >= 23 && bmi < 25) {
        category = 'Overweight - Moderate risk of diabetes and cardiovascular diseases';
        categoryClass = 'overweight';
    } else {
        category = 'Obese - High risk of diabetes and cardiovascular diseases';
        categoryClass = 'obese';
    }

    // Update UI with category and apply appropriate styling
    const categoryElement = document.getElementById('category');
    categoryElement.innerHTML = category;
    categoryElement.className = 'category ' + categoryClass;
}

// Add real-time input validation
document.getElementById('weight').addEventListener('input', function() {
    if (this.value) {
        validateInput(this.value, 1, 590, 'Weight');
    } else {
        hideError();
    }
});

document.getElementById('height').addEventListener('input', function() {
    if (this.value) {
        validateInput(this.value, 1, 300, 'Height');
    } else {
        hideError();
    }
});

// Add keyboard support for form submission
document.getElementById('weight').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculateBMI();
    }
});

document.getElementById('height').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculateBMI();
    }
});
