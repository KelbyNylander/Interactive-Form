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

console.log(shirtColorOptions);


//make default of color element to be greyed out
colorShirt.disabled = true;

shirtDesign.addEventListener('change', (e) => {
    colorShirt.disabled = false
    for( i = 0; i < shirtColorOptions.length; i++) {
        const selectedDesign = e.target.value;
        console.log(selectedDesign);
        const dataTheme = colorShirt.getAttribute('data-theme');
        console.log(dataTheme);
    }
})
 

