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

    // Classify BMI according to standard BMI scale
    if (bmi < 18.5) {
        category = 'Underweight - You may be at risk for health issues such as:\n' +
                  '• Weakened immune system\n' +
                  '• Nutritional deficiencies, especially in vitamins and minerals\n' +
                  '• Bone density issues and increased risk of osteoporosis\n' +
                  '• Irregular menstrual cycles in women\n' +
                  'Consider consulting a healthcare provider about healthy weight gain strategies.';
        categoryClass = 'underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal Weight - You are in a healthy weight range:\n' +
                  '• Your risk of weight-related health problems is lower\n' +
                  '• Continue maintaining a balanced diet and regular exercise\n' +
                  '• Regular health check-ups can help monitor your health status\n' +
                  '• Focus on sustaining your healthy lifestyle habits';
        categoryClass = 'normal';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight - You may have increased risk for:\n' +
                  '• High blood pressure and cardiovascular issues\n' +
                  '• Type 2 diabetes\n' +
                  '• Sleep apnea and breathing problems\n' +
                  '• Joint problems and osteoarthritis\n' +
                  'Consider discussing weight management strategies with your healthcare provider.';
        categoryClass = 'overweight';
    } else {
        category = 'Obese - You have a significantly higher risk for:\n' +
                  '• Severe cardiovascular diseases and heart problems\n' +
                  '• Type 2 diabetes and insulin resistance\n' +
                  '• Several types of cancer\n' +
                  '• Severe sleep apnea and respiratory problems\n' +
                  '• Joint problems and reduced mobility\n' +
                  'It is strongly recommended to consult with healthcare professionals for a comprehensive health assessment.';
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
