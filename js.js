let initial;

const number = document.querySelector('.boxform')
const result = document.querySelector('.result')
const buton = document.querySelector('.buton')


const getData = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:5050/fibonacci/${initial}`);
    xhr.onload = () => {
        const data = JSON.parse(xhr.response)
        result.innerText = data.result
    }
    xhr.send();
}
buton.addEventListener('click', () => {
    initial = number.value - 1
    getData()
    return initial

})