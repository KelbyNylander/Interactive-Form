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
const selectPaymentMethod = document.getElementById('payment')

//default hide paypal and bitcoin options
payPalOption.hidden = true;
bitcoinOption.hidden = true;

//select credit card option on page load
selectPaymentMethod.children[1].setAttribute('selected', true);

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
    
    if ( isNameValid() && isEmailValid() && isActivitiesValid() && isPaymentValid()) {
        console.log('form submited');
    } else {
        e.preventDefault();
        isNameValid();
        isEmailValid(); 
        isPaymentValid();
        isActivitiesValid();
        console.log('Incorrect user inputs');
    }
})

//functions to test if inputs are valid
function isNameValid() {
    const nameRegEx = /^[\w]+\s*[\w]+$/.test(nameInput.value);
    if (nameRegEx == false) {
        nameInput.parentElement.className = 'not-valid';
        document.getElementById('name-hint').style.display = 'contents';
    } if (nameRegEx == true) {
        nameInput.parentElement.removeAttribute('class', 'not-valid');
        document.getElementById('name-hint').style.display = 'none';
        nameInput.parentElement.className = 'valid';
    }
    return nameRegEx
}
function isEmailValid() {
    const emailRegEx =  /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);
    if (emailRegEx == false) {
        email.parentElement.className = 'not-valid';
        document.getElementById('email-hint').style.display = 'contents';
    } if (emailRegEx == true) {
        email.parentElement.removeAttribute('class', 'not-valid');
        document.getElementById('email-hint').style.display = 'none';
        email.parentElement.className = 'valid';
    }
    return emailRegEx
}

function isActivitiesValid () {
            activities.classList.add('not-valid');
            document.getElementById('activities-hint').style.display = 'contents';
        if ( currentCost !== 0) {
            activities.classList.add('valid');
            activities.classList.remove('not-valid');
            document.getElementById('activities-hint').style.display = 'none';
            return true
        }
    }

//functions to test if regexs are valid within the CC payment selection
function isCCNumebrValid () {
    const CCNumberRegEx = /^\d{13,16}$/.test(cardNumber.value)
    if (CCNumberRegEx == false) {
        cardNumber.parentElement.className = 'not-valid';
        document.getElementById('cc-hint').style.display = 'contents';
    } if (CCNumberRegEx == true) {
        cardNumber.parentElement.removeAttribute('class', 'not-valid');
        document.getElementById('cc-hint').style.display = 'none';
        cardNumber.parentElement.className = 'valid';
    }
    return CCNumberRegEx
}
function isZipValid () {
    const zipRegEx = /^\d{5}$/.test(zipCode.value)
    if (zipRegEx == false) {
        zipCode.parentElement.className = 'not-valid';
        document.getElementById('zip-hint').style.display = 'contents';
    } if (zipRegEx == true) {
        zipCode.parentElement.removeAttribute('class', 'not-valid');
        document.getElementById('zip-hint').style.display = 'none';
        zipCode.parentElement.className = 'valid';
    }
    return zipRegEx
}
function isCvvValid () {
    const CvvRegEx = /^\d{3}$/.test(cvv.value)
    if (CvvRegEx == false) {
        cvv.parentElement.className = 'not-valid';
        document.getElementById('cvv-hint').style.display = 'contents';
    } if (CvvRegEx == true) {
        cvv.parentElement.removeAttribute('class', 'not-valid');
        document.getElementById('cvv-hint').style.display = 'none';
        cvv.parentElement.className = 'valid';
    }
    return CvvRegEx
}

//funtion to make sure that submission is still possible if other payment method is selected
function isPaymentValid () {
    if (paymentType.value === 'credit-card') {
            paymentType.parentElement.classList.remove('not-valid');
            if (isCCNumebrValid() && isZipValid() && isCvvValid()) 
                return true
            else {
                isCCNumebrValid();
                isZipValid();
                isCvvValid();
                return false
            }
    } if (paymentType.value === 'select method') { 
        paymentType.parentElement.classList.add('not-valid');
    } else {
        paymentType.parentElement.classList.remove('not-valid');
        return true
    }
}

//Accessibility added for tabbing though elements
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