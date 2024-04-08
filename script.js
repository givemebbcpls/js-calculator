'use strict';

const equalBtn = document.querySelector('#equal');
const digitBtns = document.querySelectorAll('.digit-btn');
const operatorBtns = document.querySelectorAll('.operator-btn');
const userInputDisplay = document.querySelector('#user-input');
const operandsDisplay = document.querySelector('#operands');
const clearBtn = document.querySelector('#clear');
const deleteBtn = document.querySelector('#delete');
const OPERATORS = '/*-+';

let first;
let second;
let operator;
let isCalculated = false;

//Add events
for (const btn of digitBtns) {
    btn.addEventListener('click', event => fillUserInputDisplay(event.target.textContent));
}

document.addEventListener('keydown', event => {
    if (!isNaN(parseInt(event.key))) fillUserInputDisplay(event.key)
    else if (OPERATORS.includes(event.key)) actionOperands(event.key)
    else if (event.key === '=' || event.key === 'Enter') equalOperand()
    else if (event.key === 'Delete' || event.key === 'Escape') reset()
    else if (event.key === 'Backspace') deleteDigit();
});

for (const btn of operatorBtns) {
    btn.addEventListener('click', event => actionOperands(event.target.textContent));
}

equalBtn.addEventListener('click', equalOperand);
clearBtn.addEventListener('click', reset);
deleteBtn.addEventListener('click', deleteDigit);

//Operands' functions
function actionOperands(key) {
    if (!isCalculated && userInputDisplay.textContent) {
        operandsDisplay.textContent = '';
        first ? first = operate(first, parseInt(userInputDisplay.textContent)) : first = parseInt(userInputDisplay.textContent);
        fillOperandsDisplay(first);
        fillOperandsDisplay(key);
        operator = key;
        userInputDisplay.textContent = '';
    } else {
        operator = key;
        operandsDisplay.textContent = operandsDisplay.textContent.slice(0, -1) + key;
    }
}

function equalOperand() {
    if (!isCalculated && userInputDisplay.textContent) {
        fillOperandsDisplay(userInputDisplay.textContent);
        second = parseInt(userInputDisplay.textContent);
        userInputDisplay.textContent = '';
        fillUserInputDisplay(operate(first, second));
        first = null;
        second = null;
        operator = null;
        isCalculated = true;
    }
}

//Display
function fillUserInputDisplay(digit) {
    if (isCalculated) {
        reset();
    }
    userInputDisplay.textContent += digit;
}

function fillOperandsDisplay(item) {
    operandsDisplay.textContent += item;

}

function reset() {
    isCalculated = false;
    first = null;
    second = null;
    operator = null;
    userInputDisplay.textContent = '';
    operandsDisplay.textContent = '';
}

function deleteDigit() {
    if (!isCalculated) {
        userInputDisplay.textContent = userInputDisplay.textContent.slice(0, -1);
    }
}

//Calculations
function operate(a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return 'ERR! Division by zero!';
    return a / b;
}

document.addEventListener('click', e => e.target.blur());