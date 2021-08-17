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
        console.log(selectedDesign);
        const dataTheme = colorShirt[i].getAttribute('data-theme');;
        console.log(dataTheme);
        if ( selectedDesign === dataTheme) {
            shirtColorOptions[i].hidden = false;
            shirtColorOptions[i].setAttribute('selected', true);
        } if ( selectedDesign !== dataTheme) {
            shirtColorOptions[i].hidden = true;
            shirtColorOptions[i].removeAttribute('selected', false);
        }
    }
})
 
//variables for activites fieldset 
const activites = document.getElementById('activities');
const totalCost = document.getElementById('activities-cost');
let currentCost = 0;

//event listener that adds up total charges of activites
activites.addEventListener('change', (e) => {
    const dataCost = +e.target.getAttribute('data-cost');
        if ( e.target.checked) {
            currentCost += dataCost;
            console.log(currentCost);
        } else {
            currentCost -= dataCost;
            console.log(currentCost);
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
    console.log(selectedPaymenyType);
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