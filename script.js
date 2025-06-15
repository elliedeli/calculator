//operation functions

function add(a, b)
{
    return a+b;
}

function subtract(a, b){
    return a-b;
}

function multiply(a, b){
    return a*b;
}

function divide(a, b){
    if (b == 0)
    {
        return "infinity";
    }
    return a/b;
}

function operate()
{
    num1 = parseFloat(numbers[0]);
    num2 = parseFloat(numbers[1]);
    let result = 0;
    switch (operation){
        case "+":
            console.log("add" + num1 + num2);
            result = add(num1,num2);
            break;

        case "-":
            console.log("subtract");
            result = subtract(num1, num2);
            break;
        case "*":
            console.log("multiply")
            result = multiply(num1, num2);
            break;
        case "/":
            console.log("divide");
            result = divide(num1, num2);
            break;
        default:
            console.log("error");
    }
    if (result % 1 != 0)
    {
            result = result.toFixed(2);
    }
    clearDisplay();
    updateDisplay(result);
    numbers.length = 0;
    operation = "";
    operatorDisplay.textContent = "[ ]"
    eraseDisplayOnInput = true;
}


//display functions
const currentDisplay = document.querySelector("#display");
function updateDisplay(num){
    currentDisplay.textContent += num;

}
function clearDisplay(){
    currentDisplay.textContent = "";
}


//calculator elements creation functions 
function createDigits(){
    let digitsContainer = document.querySelector("#digitsContainer");
    let digits = [7,8,9,4,5,6,1,2,3,0,"."]
    for(let i =0; i < digits.length; i++)
    {
    const newDigit = document.createElement("button");
    newDigit.textContent = digits[i];
    newDigit.setAttribute('id', 'digit');
    digitsContainer.appendChild(newDigit);
    }

}
function createOperators(){
    let operatorsContainer = document.querySelector("#operatorsContainer");
    let operators = ["/","*","-","+", "=", "Clear"]
    for (const operator of operators){
        const newOperator = document.createElement("button");
        newOperator.textContent = operator;
        newOperator.setAttribute('id','operator');
        operatorsContainer.appendChild(newOperator);
    }
}

//setup calculator
updateDisplay(0);
createDigits();
createOperators();

let numbers = [];
let operation = "";
let eraseDisplayOnInput = true; //ex: inital zero, or on sum result if no other operation is selected.
const body = document.querySelector("body"); //check for inputs anywhere in body of page
const operatorDisplay = document.querySelector("#operatorDisplay");
body.addEventListener('click', (event) => {
    let target = event.target;

    console.log(target);
    switch (target.id){
        case "digit":
            if (eraseDisplayOnInput == true)
            {
                clearDisplay();
                eraseDisplayOnInput = false;
            }
            updateDisplay(target.textContent)
            console.log(target.textContent);
            console.log("display: " + currentDisplay.textContent)
            break;


        case "operator":

            if (target.textContent == "Clear")
            {
                clearDisplay();
                break;
            }
            
            else if (target.textContent == "=")
            {
                if (opearation = "") //if there hasn't  been any calculations
                    break; //exit
                else //if there is something to calculate.
                {
                    numbers.push(currentDisplay.textContent); //add current display to 2nd number slot
                    operate();
                    break;
                }
            }
            else
            {
                operation = target.textContent;
                operatorDisplay.textContent = "[" + operation + "]";

                if (numbers.length < 2)
                {
                numbers.push(currentDisplay.textContent);
                //operation = target.textContent; IDK why i had this. if any bugs, re-add this. but otherwise delete this.
                
                }
                if (numbers.length == 2) //if there are already two values to operate...
                {
                    
                    console.log("max numbers");
                    operate();
                    numbers.push(currentDisplay.textContent);
                    console.log("AAAAAAAAA: " + numbers[0]);
                    operation = target.textContent;
                    break;
                }
                eraseDisplayOnInput = true;
                console.log("number array 0: " + numbers[0]);
                console.log("number array 1: " + numbers[1]);
                console.log("number array 2: (shouldnt exist) " + numbers[2]);
            }
            console.log(target.textContent);
            break;
        default: 
            console.log("not operator or digit");
            break;
    }

})
