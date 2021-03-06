
// Basic calculator functions
function add(a, b) {return a + b};

function subtract(a, b) {return a - b};

function multiply(a, b) {return a * b};

function divide(a, b) {
    if (b === 0) {return "ERROR"}; //Don't divide by zero!
    return a / b;
}

function operate(operator, a, b) {
    let result = 0;
    if (operator === "add") {
        result = add(a, b);
    } else if (operator === "subtract") {
        result = subtract(a, b);
    } else if (operator === "multiply") {
        result = multiply(a, b);
    } else if (operator === "divide") {
        result = divide(a, b);
    }
    printToScreen(result);
}

function numberPress() {
    if (prepareToWipeScreen) {
        screen.innerText = this.innerText;
        prepareToWipeScreen = false;
    } else if (this.innerText == '.' && screen.innerText.includes('.')) {
        return;
    } else if (String(screen.innerText + this.innerText).length > 9) {
        return;
    } else {
        printToScreen(screen.innerText + this.innerText);
    }
}
function operatorPress() {
    if (memory.operator != '' && prepareToWipeScreen) {
        let oldOperator = document.querySelector(`#${memory.operator}`);
        oldOperator.classList.remove('pressed');
    } else if (memory.operator != '' && !prepareToWipeScreen) {
        let oldOperator = document.querySelector(`#${memory.operator}`);
        oldOperator.classList.remove('pressed');
        operate(memory.operator, memory.number, Number(screen.innerText));
    };
    prepareToWipeScreen = true;
    this.classList.add("pressed");
    memory.number = Number(screen.innerText);
    memory.operator = this.id;
}
function enterPress() {
    if (screen.innerText == '') {
        clearPress();
        return;
    } else if (memory.operator == '') {
        return
    } else {
    operate(memory.operator, memory.number, Number(screen.innerText));

    let oldOperator = document.querySelector(`#${memory.operator}`);
    oldOperator.classList.remove('pressed');
    prepareToWipeScreen = true;
    memory.operator = '';
    memory.number = Number(screen.innerText);
    };
}
function clearPress() {
    memory = {number: 0, operator: ''}
    printToScreen('');
    prepareToWipeScreen = false;
    operatorButtons.forEach(button => button.classList.remove('pressed'));
}
function printToScreen(screenInput) {
    screenInput = String(screenInput);
    if (screenInput.length < 10) {
        screen.innerText = screenInput;
    } else if (screenInput.includes('.')) {
        const beforeDecimal = screenInput.split('.')[0].length;
        screen.innerText = Number(screenInput).toFixed(8 - beforeDecimal);
    } else if (Number(screenInput) > 999999999) {
        screen.innerText = Number(screenInput).toPrecision(4);
    } else if (Number(screenInput) < -99999999) {
        screen.innerText = Number(screenInput).toPrecision(3);
    } else if (screenInput.includes('-')) {
        screen.innerText = Number(screenInput).toPrecision(8);
    } else {
        screen.innerText = Number(screenInput).toPrecision(9);
    }
}


let memory = {
    number: 0,
    operator: '',
};

let prepareToWipeScreen = false;
const numberButtons = document.querySelectorAll(".number-button");
numberButtons.forEach(button => button.addEventListener('click', numberPress));

const operatorButtons = document.querySelectorAll(".operator-button");
operatorButtons.forEach(button => button.addEventListener('click', operatorPress));

const enterButton = document.querySelector('#enter').addEventListener('click', enterPress);
const clearButton = document.querySelector('#clear').addEventListener('click', clearPress);
const screen = document.querySelector('.screen');