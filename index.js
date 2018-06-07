function add(n1, n2) {
    return n1 + n2
}
function subtract(n1, n2) {
    return n1 - n2
}
function multiply(n1, n2) {
    return n1 * n2
}
function divide(n1, n2) {
    return n1 / n2
}
function operate(operator, num1, num2) {
    switch(operator) {
        case `+`:
        return add(num1, num2)
        break
        
        case `-`:
        return subtract(num1, num2)
        break
        
        case `/`:
        return divide(num1, num2)
        break
        
        case `*`:
        return multiply(num1, num2)
        break
    }
}
let displayValue = document.querySelector('.display').innerText
let currentOperator
let firstOperand
let secondOperand
let lastResult = null
let deletedLast = false

function populateDisplay(e) {
    if(!e) {
        if(deletedLast) {
            displayValue = displayValue
            deletedLast = !deletedLast
        }
        else displayValue = lastResult
    }
    else{
        const input = e.target.innerText
        if(lastResult != true) {
            if(displayValue == '') displayValue = `${input}`
            else displayValue = `${displayValue}${input}`
        }
    }
    document.querySelector('.display').innerHTML = displayValue
    console.log(`DisplayValue: ${displayValue}, lastresult: ${lastResult}`)
    // else document.querySelector('.display').innerHTML = displayValue.slice(1)
    
}

function calculate() {
    if(!currentOperator) return
    secondOperand = displayValue
    lastResult = operate(currentOperator, Number(firstOperand), Number(secondOperand))
    populateDisplay()
    
    console.log(operate(currentOperator, Number(firstOperand), Number(secondOperand)))
}

function deleteLastNum() {
    displayValue = displayValue.toString().slice(0,-1)
    deletedLast = true
    populateDisplay()
    console.log(`Pressed backspace, called deleteLast, type: ${typeof displayValue} displayvalue: ${displayValue}`)
}

function allClear() {
console.log('clearing all')
}

//All the event listeners
const numbers = document.querySelectorAll('.number')
numbers.forEach(number => number.addEventListener('click', populateDisplay))

const result = document.querySelector('.calculate')
result.addEventListener('click', calculate)

const operators = document.querySelectorAll('.operator')
operators.forEach(operator => operator.addEventListener('click', e => {
    currentOperator = e.target.innerText
    firstOperand = displayValue
    displayValue = ''
}))

const backspace = document.querySelector('.backspace')
backspace.addEventListener('click', deleteLastNum)
const AC = document.querySelector('.clear')
AC.addEventListener('click', allClear)