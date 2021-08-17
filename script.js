//puts user curser into name element on page load
document.getElementById('name').focus();

//selecting elements for job role <select> and <input> feilds
const jobRole = document.getElementById('title');
const otherJobRoleTextBlock = document.getElementById('other-job-role');

//setting text block for other job role text block to be hidden
otherJobRoleTextBlock.style.display = 'none';

//added event listener 
jobRole.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJobRoleTextBlock.style.display = 'block';
    } else {
        otherJobRoleTextBlock.style.display = 'none';
    }
});

//selecting T-Shirt elements
const shirtDesign = document.getElementById('design');
const colorShirt = document.getElementById('color');
const shirtColorOptions = document.getElementById('color').children;

//make default of color element to be greyed out
colorShirt.disabled = true;

//event listener that hides colors not available in a style
shirtDesign.addEventListener('change', (e) => {
    colorShirt.disabled = false
    for( i = 1; i < shirtColorOptions.length; i++) {
        const selectedDesign = e.target.value;
        const dataTheme = colorShirt[i].getAttribute('data-theme');;
        if ( selectedDesign === dataTheme) {
            shirtColorOptions[i].hidden = false;
            shirtColorOptions[i].setAttribute('selected', true);
        } if ( selectedDesign !== dataTheme) {
            shirtColorOptions[i].hidden = true;
            shirtColorOptions[i].removeAttribute('selected', false);
        }
    }
})
 
//variables for activities fieldset 
const activities = document.getElementById('activities');
const totalCost = document.getElementById('activities-cost');
let currentCost = 0;

//event listener that adds up total charges of activities
activities.addEventListener('change', (e) => {
    const dataCost = +e.target.getAttribute('data-cost');
        if ( e.target.checked) {
            currentCost += dataCost;
        } else {
            currentCost -= dataCost;
        }
    totalCost.textContent = `Total: ${currentCost}`;
})

//variables for credit card selection
const paymentType = document.getElementById('payment');
const creditCardOption = document.getElementById('credit-card');
const payPalOption = document.getElementById('paypal')
const bitcoinOption = document.getElementById('bitcoin');

//default hide paypal and bitcoin options
payPalOption.hidden = true;
bitcoinOption.hidden = true;

//event listener that displays info for selected payment option
paymentType.addEventListener('change', (e) => {
    const selectedPaymenyType = e.target.value
        if (selectedPaymenyType === 'paypal') {
            creditCardOption.hidden = true;
            bitcoinOption.hidden = true;
            payPalOption.hidden = false;
        } if (selectedPaymenyType === 'bitcoin') {
            creditCardOption.hidden = true;
            payPalOption.hidden = true;
            bitcoinOption.hidden = false;
        } if (selectedPaymenyType === 'credit-card') {
            creditCardOption.hidden = false;
            payPalOption.hidden = true;
            bitcoinOption.hidden = true;
        }
})

//form validation variables
const nameInput = document.getElementById('name');
const email = document.getElementById('email');
const cardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const form = document.querySelector('form');

//submit event listner
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if ( isNameValid() && isEmailValid() && isActivitiesValid() && isPaymentValid())
    console.log('hi');
    else {
        console.log('bye');
    }
})

//functions to test if inputs are valid
function isNameValid() {
    return /^[\w]+\s*[\w]+$/.test(nameInput.value);
}
function isEmailValid() {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);
}
function isActivitiesValid () {
    let activities = false;
    if ( currentCost !== 0)
        activities = true;
        return activities;
}
//functions to test if regexs are valid within the CC payment selection
function isCCNumebrValid () {
    return /^\d{13,16}$/.test(cardNumber.value)
}
function isZipValid () {
    return /^\d{5}$/.test(zipCode.value)
}
function isCvvValid () {
    return /^\d{3}$/.test(cvv.value)
}
//funtion to make sure that submission is still possible if other payment method is selected
function isPaymentValid () {
    if (paymentType.value === 'credit-card') {
        if (isCCNumebrValid() && isZipValid() && isCvvValid()) 
            return true
        else {
            return false
        }
    } else {
        return true
    }
}

//Accessibility 
let activitiesDiv = document.getElementById('activities-box');
let activitiesCheckBox = document.querySelectorAll('input[type="checkbox"]');

for ( i = 0; i < activitiesCheckBox.length; i++) {
    activitiesCheckBox[i].addEventListener('focus', (e) => {
        e.target.parentNode.className += 'focus';
    });
    activitiesCheckBox[i].addEventListener('blur', (e) => {
        e.target.parentNode.removeAttribute("class", "focus");
    });
}