let initial;
let data;

const number = document.querySelector('.boxform')
const result = document.querySelector('.result')
const buton = document.querySelector('.buton')
const spin = document.querySelector('.spin')
const alert = document.querySelector('.morethan')
const error = document.querySelector('.error')

const getData = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:5050/fibonacci/${initial}`);
    xhr.onload = () => {
        data = []
        result.innerText = []
        spin.className = 'spinner-border spin'
        if (initial == 42) {
            data = xhr.response
            setTimeout(() => {
                spin.className = 'spin'
                result.innerText = `Server error: ${data}`
                result.className = 'result errormsg'
            }, 100)
        }

         else {
            data = JSON.parse(xhr.response)
            setTimeout(() => {
                spin.className = 'spin'
                result.innerText = data.result
            }, 100)
        }
    }
    xhr.send()

}
buton.addEventListener('click', () => {
    initial = 0
    if (number.value <= 50 && number.value > 0) {
        alert.className = "morethan"
        alert.innerText = ""
        initial = number.value
        getData()
        return initial
    }
    if (number.value <= 0) {
        result.innerText = []
        alert.innerText = "Can't be less than 1"
        alert.className = "alert alert-danger morethan"
        return
    } else {
        alert.innerText = "Can't be larger than 50"
        alert.className = "alert alert-danger morethan"
    }
})