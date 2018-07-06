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
let snarkyMessage = false
let valueFlag = false

function populateDisplay(e, keyvalue) {
    if(!e) {
        if(keyvalue || keyvalue === '0') {
            displayValue = `${displayValue}${keyvalue}`
        }
        else if(deletedLast || valueFlag) {
            displayValue = displayValue
            deletedLast = false
            valueFlag = false
        }
        else if(snarkyMessage) {
            displayValue = 'Oh hell no!'
            snarkyMessage = false
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
    if(displayValue.length > 22) displayValue = displayValue.slice(1)
    document.querySelector('.display').innerHTML = displayValue
    if(displayValue == 'Oh hell no!') displayValue = ''
}

function calculate() {
    if(!currentOperator) return
    secondOperand = displayValue
    if(Number(secondOperand) == 0 && currentOperator == '/') {
        snarkyMessage = true
        populateDisplay()
    }
    else {
        lastResult = operate(currentOperator, Number(firstOperand), Number(secondOperand))
        populateDisplay()
    }
}

function deleteLastNum() {
    displayValue = displayValue.toString().slice(0,-1)
    deletedLast = true
    populateDisplay()
}

function allClear() {
    displayValue = ''
    firstOperand = undefined
    secondOperand = undefined
    lastResult = null
    currentOperator = undefined
    deletedLast = true
    populateDisplay()
}

function reverseSign() {
    displayValue = displayValue.toString()
    if(displayValue.charAt(0) != '-') displayValue = `-${displayValue}`
    else displayValue = displayValue.slice(1)
    valueFlag = true
    populateDisplay()
}
function handleDecimals() {
    if(displayValue == '') {
        displayValue = '0.'
        valueFlag = true
    }
    else if(displayValue.indexOf('.') != -1) {
        return
    }
    else{
        valueFlag = true
        displayValue = `${displayValue}.`
    }
    populateDisplay()
}
function handleOperators(e, keyvalue) {
    currentOperator = e ? e.target.innerText : keyvalue
    firstOperand = displayValue
    displayValue = ''
}

//All the event listeners
const numbers = document.querySelectorAll('.number')
numbers.forEach(number => number.addEventListener('click', populateDisplay))

const result = document.querySelector('.calculate')
result.addEventListener('click', calculate)

const operators = document.querySelectorAll('.operator')
operators.forEach(operator => operator.addEventListener('click', handleOperators))

const backspace = document.querySelector('.backspace')
backspace.addEventListener('click', deleteLastNum)
const AC = document.querySelector('.clear')
AC.addEventListener('click', allClear)

const sign = document.querySelector('.plus-minus')
sign.addEventListener('click', reverseSign)

const decimal = document.querySelector('.decimal')
decimal.addEventListener('click', handleDecimals)

// Adding keyboard support
function keyboardSupport(e) {
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)
    const keyValue = key.innerHTML
    switch(keyValue) {
        case `←`:
           deleteLastNum()
            break   
        case `=`:
            calculate()
            break
        case `1`:
        case `2`:
        case `3`:
        case `4`:
        case `5`:
        case `6`:
        case `7`:
        case `8`:
        case `9`:
        case `0`:
            populateDisplay(undefined, keyValue)
            break
        case `/`:
        case `*`:
        case `+`:
        case `-`:
            handleOperators(undefined, keyValue)
            break
        case `.`:
            handleDecimals()
            break
        case `AC`:
            allClear()
            break
    }
}

window.addEventListener('keydown', keyboardSupport)

