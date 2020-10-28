let initial;
let data;
let records;

const number = document.querySelector('.boxform');
const result = document.querySelector('.result');
const buton = document.querySelector('.buton');
const spin = document.querySelector('.spin');
const alert = document.querySelector('.morethan');
const error = document.querySelector('.error');

const getData = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:5050/fibonacci/${initial}`);
    xhr.onload = () => {
        data = [];
        result.innerText = [];
        spin.className = 'spinner-border spin';
        if (initial == 42) {
            data = xhr.response;
            setTimeout(() => {
                spin.className = 'spin';
                result.innerText = `Server error: ${data}`;
                result.className = 'result errormsg';
            }, 100);
        } else {
            data = JSON.parse(xhr.response)
            setTimeout(() => {
                spin.className = 'spin';
                result.innerText = data.result;
            }, 100);
        };
    };
    xhr.send();

}
buton.addEventListener('click', () => {
    initial = 0;
    if (number.value <= 50 && number.value > 0) {
        alert.className = "morethan";
        alert.innerText = "";
        initial = number.value;
        getData();
        return initial;
    }
    if (number.value <= 0) {
        result.innerText = [];
        alert.innerText = "Can't be less than 1";
        alert.className = "alert alert-danger morethan";
        return;
    } else {
        alert.innerText = "Can't be larger than 50";
        alert.className = "alert alert-danger morethan";
    };
});

window.addEventListener('load', function recording(){
    const xhr2 = new XMLHttpRequest();
    xhr2.open('GET', `http://localhost:5050/getFibonacciResults`);
    xhr2.onload = () => {
        spin.className = 'spinner-border spin';
        let data2 = JSON.parse(xhr2.response)
            setTimeout(() => {
                spin.className = 'spin';
                result.innerText = `The Fibonacci of ${data2.results[1].number} is ${data2.results[1].result} at `;
            }, 100);
        console.log(data2);
    };
    xhr2.send();
})
