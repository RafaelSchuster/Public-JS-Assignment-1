let initial = ''
let total = ''

const number = document.getElementsByClassName('boxform')
const result = document.getElementsByClassName('result')

function fibonacci(initial,total){

    document.querySelector('.form-control').value= initial
    document.querySelector('.result').innerText = total
    
}
fibonacci(3,8)