const input = document.querySelector('#input')
let mainVal = '';
let x = '';
let y = '';
let z = '';
let pow = false
let sqrt = false
let switcher = false
let answer = 0


const addNumbersToCalculator = () => {
    bodyData.forEach(number => {
        document.querySelector('#numbers').innerHTML += `<div class="c-buttons ${number.class}">
            <button id="number-${number.id}" type="button">
                ${number.value}
            </button>
        </div>`
    })
}

const addFunctionsToCalculator = () => {
    bodyFunctions.forEach(item => {
        document.querySelector('#functions').innerHTML += `<div class="c-buttons ${item.class}">
            <button id="function-${item.id}" type="button">
                ${item.title}
            </button>
        </div>`
    })
}

const createOnClickEvent = () => {
    bodyFunctions.forEach(item => {
        document.getElementById(`function-${item.id}`).addEventListener("click", () => {
            handleClick(item.title, item.value)
        })
    })
    bodyData.forEach(item => {
        document.getElementById(`number-${item.id}`).addEventListener("click", () => {
            handleClick(item.value, item.value)
        })
    })
    document.querySelector('#clear').addEventListener('click', ()=> {
        input.value = 0
        mainVal = ''
        y = ''
        z = ''
        x = ''
        pow = false
        sqrt = false
        switcher = false
    })
}

const handleClick = (title ,value) => {
    if (title === 'sqrt(') {
        sqrt = true
    }
    if (title === 'pow(') {
        pow = true
    }

    if (input.value === '0') {
        if (title === '.') {
            input.value += title
            mainVal += value
            return
        }
        input.value = null
        mainVal = 0
    }

    mainVal += value
    handleSqrt(sqrt ,title, value)
    handlePow(pow ,title, value)

    // console.log(mainVal)

    if (title === '=') {
        calculate(mainVal)
        return
    }
    input.value += title
}

const handleSqrt = (start,title,val) => {
    if (start) {
        if (val === ')') {
            mainVal = mainVal.slice(0, -1)
            mainVal += Math.sqrt(eval(x))
            // console.log('success')
            // console.log(mainVal)
            x = ''
            sqrt = false
            return
        }
        if (title !== 'sqrt(') {
            x += val
        }
        // console.log('x: ',x)
        mainVal = mainVal.slice(0, -1)
    }
}

const handlePow = (start,title,val) => {
    if (start) {
        if (val === ')') {
            mainVal = mainVal.slice(0, -1)
            mainVal += Math.pow(eval(y), eval(z))
            // console.log('success')
            // console.log(mainVal)
            y = ''
            z = ''
            pow = false
            switcher = false
            return
        }
        if (title !== 'pow(') {
            y += val
            if (switcher) {
                z += val
                y = y.slice(0, -1)
            }
            if ( val === 'd') {
                switcher = true
                y = y.slice(0, -1)
            }
        }
        mainVal = mainVal.slice(0, -1)
        // console.log('y: ',y,'  z: ', z)
    }
}

const calculate = (value) => {
    answer =eval(value)
    input.value = answer
    mainVal = answer
}

const initTemplate = () => {
    addFunctionsToCalculator()
    addNumbersToCalculator()
}

const init = () => {
    initTemplate()
    createOnClickEvent()
    input.value = 0
}


init()