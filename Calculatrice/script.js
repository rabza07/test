let currentResult = '';
let operator = '';
let firstOperand = null;

function updateResult() {
    document.getElementById('result').value = currentResult;
}

function clearResult() {
    currentResult = '';
    operator = '';
    firstOperand = null;
    updateResult();
}

function appendNumber(number) {
    currentResult += number;
    updateResult();
}

function appendDecimal() {
    if (!currentResult.includes('.')) {
        currentResult += '.';
        updateResult();
    }
}

function setOperator(newOperator) {
    if (firstOperand === null) {
        firstOperand = parseFloat(currentResult);
        currentResult = '';
        operator = newOperator;
    } else {
        calculate();
        operator = newOperator;
    }
}

function calculate() {
    if (operator && currentResult !== '') {
        const secondOperand = parseFloat(currentResult);
        switch (operator) {
            case '+':
                currentResult = (firstOperand + secondOperand).toString();
                break;
            case '-':
                currentResult = (firstOperand - secondOperand).toString();
                break;
            case '*':
                currentResult = (firstOperand * secondOperand).toString();
                break;
            case '/':
                if (secondOperand !== 0) {
                    currentResult = (firstOperand / secondOperand).toString();
                } else {
                    currentResult = 'Error';
                }
                break;
        }
        operator = '';
        firstOperand = null;
        updateResult();
    }
}

document.addEventListener('keydown', function (event) {
    const key = event.key;
    if (/[0-9]/.test(key)) {
        appendNumber(key);
    } else if (key === '.') {
        appendDecimal();
    } else if (['+', '-', '*', '/'].includes(key)) {
        setOperator(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Escape') {
        clearResult();
    }
});