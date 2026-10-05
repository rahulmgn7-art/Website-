let display = document.getElementById('display');

let currentInput = '0';
let previousInput = null;
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
  display.value = currentInput;
}

function inputNumber(number) {
  if (currentInput === '0' || shouldResetDisplay) {
    currentInput = number;
    shouldResetDisplay = false;
  } else {
    currentInput += number;
  }

  updateDisplay();
}

function inputDecimal() {
  if (shouldResetDisplay) {
    currentInput = '0.';
    shouldResetDisplay = false;
    updateDisplay();
    return;
  }

  if (!currentInput.includes('.')) {
    currentInput += '.';
    updateDisplay();
  }
}

function chooseOperator(nextOperator) {
  if (operator && !shouldResetDisplay) {
    calculate();
  }

  previousInput = currentInput;
  operator = nextOperator;
  shouldResetDisplay = true;
}

function calculate() {
  if (operator === null || previousInput === null) {
    return;
  }

  const first = Number(previousInput);
  const second = Number(currentInput);
  let result = 0;

  switch (operator) {
    case '+':
      result = first + second;
      break;
    case '-':
      result = first - second;
      break;
    case '*':
      result = first * second;
      break;
    case '/':
      result = second === 0 ? 'Error' : first / second;
      break;
    default:
      return;
  }

  currentInput = String(result);
  operator = null;
  previousInput = null;
  shouldResetDisplay = true;
  updateDisplay();
}

function clearDisplay() {
  currentInput = '0';
  previousInput = null;
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function deleteDigit() {
  if (shouldResetDisplay) {
    currentInput = '0';
    shouldResetDisplay = false;
    updateDisplay();
    return;
  }

  currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
  updateDisplay();
}

document.querySelectorAll('[data-action="number"]').forEach((button) => {
  button.addEventListener('click', () => {
    inputNumber(button.dataset.value);
  });
});

document.querySelector('[data-action="decimal"]').addEventListener('click', inputDecimal);

document.querySelectorAll('[data-action="operator"]').forEach((button) => {
  button.addEventListener('click', () => {
    chooseOperator(button.dataset.value);
  });
});

document.querySelector('[data-action="equals"]').addEventListener('click', calculate);

document.querySelector('[data-action="clear"]').addEventListener('click', clearDisplay);

document.querySelector('[data-action="delete"]').addEventListener('click', deleteDigit);

updateDisplay();
