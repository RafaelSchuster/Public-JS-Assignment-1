let initial = ''
let total = [0,1]
let fib = ''

console.log(total)
const number = document.querySelector('.boxform')
const result = document.querySelector('.result')
const buton = document.querySelector('.buton')

function fibonacci(){
    for(let i =2; i < 51; i++){
        total[i] = total[i-1] + total[i-2]
    }
}
fibonacci()

function calculate(initial){
    initial = number.value
    fib = total[initial]
    result.innerText = fib
}
buton.addEventListener('click',()=>{
    console.log(number.value)
    calculate()})
    