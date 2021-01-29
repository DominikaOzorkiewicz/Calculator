// Variables
const viewer = document.getElementById('total');            // Calculator display with result
const numberButtons = document.querySelectorAll('.num');     // All numbers buttons
const operatorButtons = document.querySelectorAll('.operator');   // All operators buttons

const equals = document.querySelector('.equals');       // Equals
const clearBtn = document.querySelector('.clear');      // Clear button
const undoBtn = document.querySelector('.undo');        // Clears the last digit
const commaBtn = document.querySelector('.comma');    // Comma button
const message = document.querySelector('.warning');     // Message above calculator, if necessary

let prevNum = '';           // Previous number
let newNumber= '';          // Last entered number
let total = '';             // Result
let currentNumber = '';     // Number currently on the display (string)
let currentOperator = '';   // Active operator


// Number buttons function
numberButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(event.target.value);
        if (currentNumber.length < 12) {
            currentNumber += event.target.value;
            viewer.innerText = currentNumber;
        } else {
            message.innerText = 'Please make your number shorter';
        }
    });
});


// Operations on numbers
operatorButtons.forEach((operatorBtn) => {
   operatorBtn.addEventListener('click', (event) => {
       event.preventDefault();
       console.log(event.target.value);

       if (prevNum.length === 0) {
           currentOperator = event.target.value;
           prevNum = Number(currentNumber);
           currentNumber = '';
           viewer.innerText = currentOperator;
       } else {
           newNumber = Number(currentNumber);
           calculate();
           currentNumber = '';
           prevNum = total;
           currentOperator = event.target.value;
           viewer.innerText = currentOperator;
       }
   })
});

const calculate = () => {
    switch (currentOperator) {
        case '+': {
            total = prevNum + newNumber;
            break;
        }
        case '-': {
            total = prevNum - newNumber;
            break;
        }
        case '*': {
            total = prevNum * newNumber;
            break;
        }
        case '÷': {
            total = prevNum / newNumber;
            if (prevNum === 0 || newNumber === 0) {
                message.innerText = `Don't divide by zero!`;
            }
            break;
        }
        default:
            break;
    }
}

// Equals function
equals.addEventListener('click', (event) => {
    event.preventDefault();
    newNumber = Number(currentNumber);
    calculate();
    currentNumber = total;
    prevNum = '';
    viewer.innerText = currentNumber;
});


// Delete function
undoBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const sliceNumber = currentNumber.slice(0, -1);
    currentNumber = sliceNumber;
    viewer.innerText = sliceNumber;
});


// Clear all function
const clear = () => {
    prevNum = '';
    newNumber = '';
    currentNumber = '';
    viewer.innerText = '0';
    message.innerText = '';
}
clearBtn.addEventListener('click', (event) => {
    event.preventDefault();
    clear();
});

// Comma button function
commaBtn.addEventListener('click', (event) => {
   event.preventDefault();
    if (currentNumber.length === 0) {
        currentNumber += '0.'
    } else {
        currentNumber += '.';
    }
    viewer.innerText = currentNumber;
});
