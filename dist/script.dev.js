"use strict";

var calculatorDisplay = document.querySelector('h1');
var inputBtns = document.querySelectorAll('button');
var clearBtn = document.getElementById('clear-button');
var operation = document.getElementById('operation');
var firstValue = 0;
var operatorValue = '';
var awaitingNextValue = false;

function sendNumberValue(number) {
  // Replace current display value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // If current display value is 0, replace it, if not add number to display value
    var displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
  }
}

function addDecimal() {
  // If operator pressed, don't add decimal
  if (awaitingNextValue) return; // If no decimal, add one

  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = "".concat(calculatorDisplay.textContent, ".");
  }
} // Calculate first and second values depending on operator


var calculate = {
  '/': function _(firstNumber, secondNumber) {
    return firstNumber / secondNumber;
  },
  '*': function _(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
  },
  '+': function _(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
  },
  '-': function _(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
  },
  '=': function _(firstNumber, secondNumber) {
    return secondNumber;
  }
};

function useOperator(operator) {
  var currentValue = Number(calculatorDisplay.textContent); // Prevent multiple operators

  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    operation.textContent = operator;
    return;
  } // Assign firstValue if no value


  if (!firstValue) {
    firstValue = currentValue;
  } else {
    var calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }

  operation.textContent = operator; // Ready for next value, store operator

  awaitingNextValue = true;
  operatorValue = operator;
} // Add Event Listeners for numbers, operators, decimal


inputBtns.forEach(function (inputBtn) {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', function () {
      return sendNumberValue(inputBtn.value);
    });
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', function () {
      return useOperator(inputBtn.value);
    });
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', function () {
      return addDecimal();
    });
  }
}); // Reset all values, display

function resetAll() {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  operation.textContent = '';
  calculatorDisplay.textContent = '0';
} // Event Listener


clearBtn.addEventListener('click', resetAll);