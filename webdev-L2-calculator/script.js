const calculatorDisplay = document.getElementById("calculatorDisplay");

let currentValue = "";
let previousValue = "";
let selectedOperator = "";

function updateDisplay(value) {
    calculatorDisplay.value = value || "0";
}

function addNumber(number) {
    currentValue += number;

    if (selectedOperator) {
        updateDisplay(previousValue + " " + selectedOperator + " " + currentValue);
    } else {
        updateDisplay(currentValue);
    }
}

function addDecimal() {
    if (!currentValue.includes(".")) {
        currentValue += currentValue ? "." : "0.";

        if (selectedOperator) {
            updateDisplay(previousValue + " " + selectedOperator + " " + currentValue);
        } else {
            updateDisplay(currentValue);
        }
    }
}

function chooseOperator(operator) {
    if (!currentValue) {
        return;
    }

    previousValue = currentValue;
    currentValue = "";
    selectedOperator = operator;

    updateDisplay(previousValue + " " + selectedOperator);
}

function calculateResult() {
    if (!previousValue || !currentValue || !selectedOperator) {
        return;
    }

    const firstNumber = Number(previousValue);
    const secondNumber = Number(currentValue);
    let result;

    if (selectedOperator === "+") {
        result = firstNumber + secondNumber;
    } else if (selectedOperator === "-") {
        result = firstNumber - secondNumber;
    } else if (selectedOperator === "*") {
        result = firstNumber * secondNumber;
    } else if (selectedOperator === "/") {
        if (secondNumber === 0) {
            updateDisplay("Error");
            currentValue = "";
            previousValue = "";
            selectedOperator = "";
            return;
        }

        result = firstNumber / secondNumber;
    }

    currentValue = String(result);
    previousValue = "";
    selectedOperator = "";

    updateDisplay(currentValue);
}

function clearCalculator() {
    currentValue = "";
    previousValue = "";
    selectedOperator = "";

    updateDisplay("0");
}

document.getElementById("zeroButton").addEventListener("click", () => addNumber("0"));
document.getElementById("oneButton").addEventListener("click", () => addNumber("1"));
document.getElementById("twoButton").addEventListener("click", () => addNumber("2"));
document.getElementById("threeButton").addEventListener("click", () => addNumber("3"));
document.getElementById("fourButton").addEventListener("click", () => addNumber("4"));
document.getElementById("fiveButton").addEventListener("click", () => addNumber("5"));
document.getElementById("sixButton").addEventListener("click", () => addNumber("6"));
document.getElementById("sevenButton").addEventListener("click", () => addNumber("7"));
document.getElementById("eightButton").addEventListener("click", () => addNumber("8"));
document.getElementById("nineButton").addEventListener("click", () => addNumber("9"));

document.getElementById("decimalButton").addEventListener("click", addDecimal);

document.getElementById("addButton").addEventListener("click", () => {
    chooseOperator("+");
});

document.getElementById("subtractButton").addEventListener("click", () => {
    chooseOperator("-");
});

document.getElementById("multiplyButton").addEventListener("click", () => {
    chooseOperator("*");
});

document.getElementById("divideButton").addEventListener("click", () => {
    chooseOperator("/");
});

document.getElementById("equalsButton").addEventListener("click", calculateResult);

document.getElementById("clearButton").addEventListener("click", clearCalculator);