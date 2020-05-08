/*Takes prev and cur to display numbers*/
class Calculator {
  constructor(prevOperandTextElement, curOperandTextElement) {
    this.prevOperandTextElement = prevOperandTextElement;
    this.curOperandTextElement = curOperandTextElement;
    this.reset = false;
    this.clear();
  }

  /*clears out different variables, clears calculator sets it blank*/

  clear() {
    this.curOperand = "";
    this.prevOperand = "";
    this.operation = undefined;
  }

  /*Removes single number*/

  delete() {
    this.curOperand = this.curOperand.toString().slice(0, -1);
  }

  /*When a number is pressed will display it onto the screen */
  appendNum(number) {
    /*Only allows for one decimal*/

    if (number === "." && this.curOperand.includes(".")) return;
    this.curOperand = this.curOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    /*Will only allow operation if value is in calc */
    if (this.curOperand === "") return;
    if (this.prevOperand !== "") {
      this.compute();
    }
    /*lets calc know what operation is being used */
    this.operation = operation;
    this.prevOperand = this.curOperand;
    /*takes in one value  */
    this.curOperand = "";
  }

  /*displays single value of 2 numbers */
  compute() {
    /*result of compute function*/
    let computation;
    const prev = parseFloat(this.prevOperand);
    const cur = parseFloat(this.curOperand);

    /*wont run code if no numbers are clicked and equal is clicked*/
    if (isNaN(prev) || isNaN(cur)) return;
    switch (this.operation) {
      case "+":
        computation = prev + cur;
        break;
      case "-":
        computation = prev - cur;
        break;
      case "x":
        computation = prev * cur;
        break;
      case "÷":
        computation = prev / cur;
        break;
      default:
        return;
    }
    this.reset = true;
    this.curOperand = computation;
    this.operation = undefined;
    this.prevOperand = "";
  }

  /*adds commas also allows for multiple zeros */
  getDisplayNum(number) {
    const stringNum = number.toString();
    const integerDigits = parseFloat(stringNum.split(".")[0]);
    const decimalDigits = stringNum.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
  /*displays values in output */
  updateDisplay() {
    this.curOperandTextElement.innerText = this.getDisplayNum(this.curOperand);
    if (this.operation != null) {
      this.prevOperandTextElement.innerText = `${this.getDisplayNum(
        this.prevOperand
      )} ${this.operation}`;
    } else {
      this.prevOperandTextElement.innerText = "";
    }
    /*displays previous value in the top of calc when an operation is clicked */
  }
}

/*Constant Variables*/

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-clear]");
const prevOperandTextElement = document.querySelector("[data-prev]");
const curOperandTextElement = document.querySelector("[data-cur]");

const calculator = new Calculator(
  prevOperandTextElement,
  curOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (
      calculator.prevOperand === "" &&
      calculator.curOperand !== "" &&
      calculator.reset
    ) {
      calculator.curOperand = "";
      calculator.reset = false;
    }

    calculator.appendNum(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
