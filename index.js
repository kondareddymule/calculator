const dark = document.getElementById('dark')
const light = document.getElementById('light');
const lightcal = document.getElementById('lightcal');
const buttons = document.getElementById('buttons')



dark.addEventListener('click', function() {
    lightcal.classList.add('dark')
    lightcal.classList.remove('lightcal')
});

light.addEventListener('click', function() {
    lightcal.classList.remove('dark')
    lightcal.classList.add('lightcal')
});



const arr = ["clear", "back", "/", "^", 1,2,3,"*",4,5,6, "+", 7,8,9,"-",".",0, "000", "=",  "Asc", "Des", "sort", "Enter"]

let lengtharr = arr.length
let history = []

arr.forEach((item, index) => {
    const button = document.createElement('button')
    button.id = index;
    button.textContent = item;
    button.classList.add('buttons')
    buttons.appendChild(button)
})



// let input = "";
// let result = 0;
// let lastOperator = null;

// const display = document.getElementById('display');
// const button = document.querySelectorAll('.buttons button');
// display.textContent = 0

// button.forEach((button) =>
//   button.addEventListener('click', function () {
//     const value = button.textContent;

//     if (!isNaN(value) || value === ".") {
//       input += value;
//       display.textContent = input;
//     } 

//     else if (value === "+" || value === "-" || value === "*" || value === "/" || value === "^") {
//       if (input !== "") {
//         if (lastOperator !== null) {
//           performCalculation(lastOperator);
//           display.textContent = result;
//           result = parseFloat(result)
//         }
//         lastOperator = value;
//         input = "";
//       }
//     } 
//     else if (value === "=") {
//       if (input !== "") {
//         performCalculation(lastOperator);
//         display.textContent = result;
//         input = "";
//         lastOperator = null;
//       }
//       result = 0
//     } 
//     else if (value === "clear") {
//       input = "";
//       result = 0;
//       display.textContent = "0";
//       lastOperator = null;
//     }
//     else if (value === "back") {
//         input = display.textContent.split('')
//         let array = input.slice(0,input.length -1).join('')
//         display.textContent = array
//     }
//   })
// );

// function performCalculation(operator) {
//   const currentInput = parseFloat(input);

//   if (operator === "/" && currentInput === 0) {
//     display.textContent = "Error: Divide by Zero";
//     input = "";
//     result = 0;
//     lastOperator = null;
//     return;
//   }

//   switch (operator) {
//     case "+":
//       result += currentInput;
//       break;
//     case "-":
//       result -= currentInput;
//       break;
//     case "*":
//       result *= currentInput;
//       break;
//     case "/":
//       result /= currentInput;
//       break;
//     case "^":
//       result **= currentInput;
//       break;
//     default:
//       break;
//   }
// }





// const clockIcon = document.getElementById('clockIcon');
// const modal = document.getElementById('modal');
// const closeModal = document.getElementById('closeModal');

// clockIcon.addEventListener('click', () => {
//     modal.style.display = 'flex';
// });


// closeModal.addEventListener('click', () => {
//     modal.style.display = 'none';
// });


// window.addEventListener('click', (event) => {
//     if (event.target === modal) {
//         modal.style.display = 'none';
//     }
// });


// function addToHistory(calculation) {
//   const time = new Date().toLocaleTimeString(); 
//   history.push({ calculation, time });
//   updateHistory();  
// }


// function updateHistory() {
//   const historyList = document.getElementById('history-list');
//   historyList.innerHTML = ''; 

//   history.forEach(item => {
//     let li = document.createElement('li');
//     li.textContent = `${item.calculation} at ${item.time}`;
//     historyList.appendChild(li);
//   });
// }


const display = document.getElementById("display");
const button = document.querySelectorAll(".buttons button");



let currentInput = "";
let operator = "";
let previousInput = "";

button.forEach((button) => {
    button.addEventListener("click", handleButtonClick);
});

function handleButtonClick(e) {
    const buttonValue = e.target.textContent;

    if (!isNaN(buttonValue) || buttonValue === ".") {
        currentInput += buttonValue;
    } else if (buttonValue === "clear") {
        clearCalculator();
    } else if (buttonValue === "=") {
        performCalculation();
        operator = "="
    } else if (buttonValue === "Enter") {
        currentInput = currentInput + " "
    } else if (buttonValue === "sort") {
        display.textContent = "Enter , seperated values"
        currentInput = ""
        previousInput = ""
        operator = ""
    }
    else if (buttonValue === "back") {
        let dis = display.textContent
        let input = dis.split("");
        let finalInput = [];
        for (let item of input) {
        for (let char of item) {
            if (char !== " ") {
                finalInput.push(char);
            }
        }
        }
      let array = finalInput.slice(0,finalInput.length -1).join('')
      currentInput = array
      previousInput = ""
      operator = ""

    } else if (buttonValue === "Asc") {
      let arr = display.textContent.split(" ")
        let n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (parseFloat(arr[j]) > parseFloat(arr[j + 1])) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        let array = arr.join(" ")
        console.log(array)
       currentInput = array
    } else if (buttonValue === "Des") {
      let arr = display.textContent.split(" ")
        let n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (parseFloat(arr[j]) < parseFloat(arr[j + 1])) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        let array = arr.join(" ")
       currentInput = array
    }
    else {
        handleOperator(buttonValue);
    }

    updateDisplay(buttonValue);
}

function handleOperator(op) {
    if (operator && currentInput) {
        performCalculation();
        previousInput = currentInput;
        currentInput = "";
    } else {
        previousInput = currentInput || "0";
        currentInput = "";
    }

    operator = op;
}

function performCalculation() {
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    if(num1 && num2 !== ""){
    if (!isNaN(num1) && !isNaN(num2)) {
        switch (operator) {
            case "+":
                currentInput = num1 + num2
                break;
            case "-":
                currentInput = num1 - num2
                break;
            case "*":
                currentInput = num1 * num2
                break;
            case "/":
                currentInput = num1 / num2
                break;
            case "^":
                currentInput = num1 ** num2
            default:
                break;
        }
    }
        if(operator !== "" ){
        addToHistory(`${num1} ${operator} ${num2} = ${currentInput}`);
        }
    }

    operator = "";
}

function clearCalculator() {
    currentInput = "";
    operator = "";
    previousInput = "";
}

function updateDisplay(value) {

    if (operator === "=") {
        display.textContent = `${currentInput}`
    } else if (value === 'Asc') {
        display.textContent = `${currentInput}`
    } else if (value === 'Des') {
        display.textContent = `${currentInput}`
    } else if (value === 'sort') {
        currentInput = ""
        previousInput = ""
        operator = ""
        display.textContent = "Enter , separate values"
    } else if (value === "back"){
        previousInput = ""
        operator = ""
        display.textContent = `${currentInput}`
    }
    else {
        display.textContent = `${previousInput} ${operator} ${currentInput}`
    }
}



const clockIcon = document.getElementById('clockIcon');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');

clockIcon.addEventListener('click', () => {
    modal.style.display = 'flex';
});


closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});


window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


function addToHistory(calculation) {
  const time = new Date().toLocaleTimeString(); 
  history.push({ calculation, time });
  updateHistory();
}

function updateHistory() {
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = '';

  history.forEach(item => {
      let li = document.createElement('li');
      li.textContent = `${item.calculation} at ${item.time}`;
      
      li.addEventListener('click', () => {
          const parts = item.calculation.split(' ');
          previousInput = parts[0];
          operator = parts[1];
          currentInput = parts[2];

          display.textContent = item.calculation;
      });

      historyList.appendChild(li);
  });
}

