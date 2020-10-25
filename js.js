let initial = ''
let total = [0,1]

console.log(total)
const number = document.getElementsByClassName('boxform')
const result = document.getElementsByClassName('result')

function fibonacci(initial){
    for(let i =2; i < 51; i++){
        total[i] = total[i-1] + total[i-2]
    }
   
     document.querySelector('.form-control').value= initial
     document.querySelector('.result').innerText = total[initial]
    
}
fibonacci(14)