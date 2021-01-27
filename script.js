// Variables
const viewer = document.getElementById('total');            // Calculator display with result
const numberButtons = document.querySelectorAll('.num');     // All numbers buttons
const operatorButtons = document.querySelectorAll('.operator');   // All operators buttons

const equals = document.querySelector('.equals');       // Equals
const clearBtn = document.querySelector('.clear');      // Clear button
const undoBtn = document.querySelector('.undo');        // Clears the last digit
const warning = document.querySelector('.warning');     // Message above calculator, if necessary

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
            warning.innerText = 'Please make your number shorter';
        }
    });
});


// Operations on numbers
operatorButtons.forEach((operatorBtn) => {
   operatorBtn.addEventListener('click', (event) => {
       event.preventDefault();
       console.log(event.target.value);
       currentOperator = event.target.value;
       prevNum = Number(currentNumber);
       currentNumber = '';
       viewer.innerText = currentOperator;
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
        case '/': {
            total = prevNum / newNumber;
            if (prevNum === 0 || newNumber === 0) {
                warning.innerText = `Don't divide by zero!`;
            }
            break;
        }
        default:
            break;
    }
}

// Result
equals.addEventListener('click', (event) => {
    event.preventDefault();
    newNumber = Number(currentNumber);
    currentNumber = '';
    calculate();
    viewer.innerText = total;
});


// Delete function
const deleteFn = () => {}


// Clear all function
const clear = () => {
    prevNum = '';
    newNumber = '';
    currentNumber = '';
    viewer.innerText = '0';
}
clearBtn.addEventListener('click', (event) => {
    event.preventDefault();
    clear();
});
