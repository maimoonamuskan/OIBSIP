const display = document.getElementById("display");
const expression = document.getElementById("expression");
const keys = document.querySelectorAll(".key");

let currentValue = "0";
let previousValue = "";
let operator = "";
let shouldResetDisplay = false;

function updateDisplay() {
    display.textContent = currentValue;
}

function clearCalculator() {
    currentValue = "0";
    previousValue = "";
    operator = "";
    shouldResetDisplay = false;
    expression.textContent = "";
    updateDisplay();
}

function deleteNumber() {
    if (shouldResetDisplay) {
        currentValue = "0";
        shouldResetDisplay = false;
        updateDisplay();
        return;
    }

    currentValue = currentValue.length > 1
        ? currentValue.slice(0, -1)
        : "0";

    updateDisplay();
}

function addNumber(value) {
    if (shouldResetDisplay) {
        currentValue = value;
        shouldResetDisplay = false;
    } else if (currentValue === "0") {
        currentValue = value;
    } else {
        currentValue += value;
    }

    updateDisplay();
}

function addDecimal() {
    if (shouldResetDisplay) {
        currentValue = "0.";
        shouldResetDisplay = false;
    } else if (!currentValue.includes(".")) {
        currentValue += ".";
    }

    updateDisplay();
}

function chooseOperator(selectedOperator) {
    if (operator && !shouldResetDisplay) {
        calculate();
    }

    previousValue = currentValue;
    operator = selectedOperator;
    shouldResetDisplay = true;

    const symbols = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷",
        "%": "%"
    };

    expression.textContent = `${previousValue} ${symbols[selectedOperator]}`;
}

function calculate() {
    if (!operator || previousValue === "") {
        return;
    }

    const first = parseFloat(previousValue);
    const second = parseFloat(currentValue);
    let answer;

    if (operator === "+") {
        answer = first + second;
    } else if (operator === "-") {
        answer = first - second;
    } else if (operator === "*") {
        answer = first * second;
    } else if (operator === "/") {
        if (second === 0) {
            currentValue = "Error";
            expression.textContent = "Cannot divide by zero";
            operator = "";
            previousValue = "";
            shouldResetDisplay = true;
            updateDisplay();
            return;
        }

        answer = first / second;
    } else if (operator === "%") {
        answer = first % second;
    }

    expression.textContent = `${first} ${operator === "*" ? "×" : operator === "/" ? "÷" : operator === "-" ? "−" : operator} ${second} =`;

    currentValue = Number.isInteger(answer)
        ? String(answer)
        : String(parseFloat(answer.toFixed(10)));

    previousValue = "";
    operator = "";
    shouldResetDisplay = true;

    updateDisplay();
}

function handleInput(value) {
    if (value >= "0" && value <= "9") {
        addNumber(value);
    } else if (value === ".") {
        addDecimal();
    } else if (["+", "-", "*", "/", "%"].includes(value)) {
        chooseOperator(value);
    }
}

keys.forEach(key => {
    key.addEventListener("click", () => {
        const value = key.dataset.value;
        const action = key.dataset.action;

        if (action === "clear") {
            clearCalculator();
        } else if (action === "delete") {
            deleteNumber();
        } else if (action === "calculate") {
            calculate();
        } else {
            handleInput(value);
        }
    });
});

document.addEventListener("keydown", event => {
    const key = event.key;

    if ((key >= "0" && key <= "9") || ["+", "-", "*", "/", "%", "."].includes(key)) {
        handleInput(key);
    } else if (key === "Enter" || key === "=") {
        calculate();
    } else if (key === "Backspace") {
        deleteNumber();
    } else if (key === "Escape") {
        clearCalculator();
    }
});