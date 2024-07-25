const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay =document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");


const copyBtn = document.querySelector("[data-copy]");

const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck =document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#Lowercase");
const numberCheck =document.querySelectorAll("#Numbers");
const symbolCheck = document.querySelector("#Symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
// const allCheckBox =document.querySelector("input[type=checkbox]");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols='~`!@#$%^&*()_-+={}[]|:;"<,>.?/';

let password="";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
// ste strength circle color to grey
setIndicator("#ccc");

// set passwordlength
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText=passwordLength;
    // or kuch bhi karna chahiye
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}

function setIndicator(color){
    indicator.style.backgroundColor =color;
// shadow
indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min,max) {
   return Math.floor(Math.random()*(max-min))+min; 
}

function generateRandomNumber() {
    return getRndInteger(0,9);
}

function generateLowerCase() {
   return String.fromCharCode(getRndInteger(97,123));
}

function generateupperCase() {
    return String.fromCharCode(getRndInteger(65,91));
 }

 function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
 }

 function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numberCheck.checked) hasNum = true;
    if (symbolCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >=8){
        setIndicator("#0ff0");
    } else if (
    (hasLower || hasUpper)&&
    (hasNum || hasSym)&&
    passwordLength >= 6
    ) {
        setIndicator("#0ff0");
    } else {
        setIndicator("#0ff0");
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e){
        copyMsg.innerText = "failed";
    }
    // to make copy vala span visible
   copyMsg.classList.add("active");

   seTimeout (() => {
    copyMsg.classList.remove("active");
   },2000);
}

function shufflePassword(array){
    // fisher yates method - by applying this method we can shuffle any array
    for (let i = array.length-1; i>0 ;i--) {
        const j = Math.floor(Math.random()*(i+1));
        const temp =array[i];
        array[i] = array[j];
        array[j] = temp;
     }
     let str="";
     array.forEach((el)=>(str += el));
     return str;
}

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

        // special case

       if (passwordLength<checkCount) {
        passwordLength=checkCount;
        handleSlider();
       } 
    
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

inputSlider.addEventListener('input',(e) => {
    passwordLength = e.target.value;
    handleSlider();
})



copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})


generateBtn.addEventListener('click' , ()=>{
// none of the checkbox are selected
if(checkCount==0) 
    return;

if(passwordLength < checkCount){
    passwordLength=checkCount;
    handleSlider();
}

// let's start the journey to find new password 

// remove old password
console.log("Starting the journey");
password="";

// let's put the stuff mentioned by checkboxes 

// if(uppercaseCheck.checked) {
//     password += generateupperCase
// }

// if(lowercaseCheck.checked) {
//     password += generateLowerCase();
// }

// if(numbersCheck.checked) {
//     password += generateRandomNumber();
// }

// if(symbolCheck.checked) {
//     password += generateSymbol();
// }

let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateupperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numberCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolCheck.checked)
        funcArr.push(generateSymbol)

// compulsary addition
for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
    
}
console.log("Compulsory addition done");

// remaning addition
for (let i = 0; i < passwordLength-funcArr.length; i++){
    let randIndex = getRndInteger(0 , funcArr.length);
    console.log("randIndex" + randIndex)
    password += funcArr[randIndex]();
}
console.log("Remaining addition done");

//shuffle the password 

password = shufflePassword(Array.from(password));
console.log("Shuffling done");

// show on ui

passwordDisplay.value = password;
console.log("UI addition done")
// calculate strength
calcStrength();
});