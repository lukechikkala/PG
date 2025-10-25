// Get input elements
const topLeft = document.getElementById('topLeft');
const topRight = document.getElementById('topRight');
const bottomLeft = document.getElementById('bottomLeft');
const bottomRight = document.getElementById('bottomRight');

// Function to adjust font size based on content length
function adjustFontSize(input) {
    const length = input.value.length;
    const box = input.getBoundingClientRect();
    const baseSize = Math.min(box.width, box.height);
    
    let fontSize;
    if (length <= 2) {
        fontSize = baseSize * 0.5;
    } else if (length <= 4) {
        fontSize = baseSize * 0.35;
    } else if (length <= 6) {
        fontSize = baseSize * 0.25;
    } else if (length <= 8) {
        fontSize = baseSize * 0.2;
    } else if (length <= 10) {
        fontSize = baseSize * 0.16;
    } else {
        fontSize = baseSize * 0.12;
    }
    
    input.style.fontSize = Math.max(fontSize, 12) + 'px';
}

// Function to adjust all font sizes
function adjustAllFontSizes() {
    adjustFontSize(topLeft);
    adjustFontSize(topRight);
    adjustFontSize(bottomLeft);
    adjustFontSize(bottomRight);
}

// Calculate the missing value
function calculate() {
    const a = parseFloat(topLeft.value);
    const b = parseFloat(topRight.value);
    const c = parseFloat(bottomLeft.value);

    if (!isNaN(a) && !isNaN(b) && !isNaN(c) && a !== 0) {
        // Calculate: X = (B × C) / A
        const result = (b * c) / a;
        
        // Display result with appropriate precision
        if (Number.isInteger(result)) {
            bottomRight.value = result;
        } else {
            // Round to 6 decimal places and remove trailing zeros
            bottomRight.value = parseFloat(result.toFixed(6));
        }
    } else {
        // Clear result if inputs are invalid
        bottomRight.value = '';
    }
    
    // Adjust font size for result
    adjustFontSize(bottomRight);
}

// Add event listeners for calculation and font adjustment
topLeft.addEventListener('input', function() {
    adjustFontSize(this);
    calculate();
});

topRight.addEventListener('input', function() {
    adjustFontSize(this);
    calculate();
});

bottomLeft.addEventListener('input', function() {
    adjustFontSize(this);
    calculate();
});

// Adjust font sizes on window resize
window.addEventListener('resize', adjustAllFontSizes);

// Initial adjustment
window.addEventListener('load', adjustAllFontSizes);