let initial;
let data;
let records;
let initnum = [document.querySelector('.initialnum1'), document.querySelector('.initialnum2'), document.querySelector('.initialnum3')]
let resnum = [document.querySelector('.resultnum1'), document.querySelector('.resultnum2'), document.querySelector('.resultnum3')]
let datenum = [document.querySelector('.date1'), document.querySelector('.date2'), document.querySelector('.date3')]

const number = document.querySelector('.boxform');
const result = document.querySelector('.result');
const buton = document.querySelector('.buton');
const spin = document.querySelector('.spin');
const alert = document.querySelector('.morethan');
const error = document.querySelector('.error');
const previous = document.querySelector('.previous')
const titleresults = document.querySelector('.titleresults')
// const initialnum = document.querySelector('.initialnum1')
// const resultnum = document.querySelector('.resultnum')
// const datefib = document.querySelector('.date')

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

let datearray = []

window.addEventListener('load', function recording() {
    const xhr2 = new XMLHttpRequest();
    xhr2.open('GET', `http://localhost:5050/getFibonacciResults`);
    xhr2.onload = () => {
        spin.className = 'spinner-border spin2';
        let data2 = JSON.parse(xhr2.response)
        setTimeout(() => {
            spin.className = 'spin';
            for (let j = 0; j < 3; j++) {
                datearray[j] = new Date(Number(`/Date(${data2.results[j].createdDate})/`.replace(/\D/g, '')))
                console.log(datearray)
                datenum[j].innerText = `\xa0${datearray[j]}`
            }
            for (let i = 0; i < 3; i++) {
                // console.log(date)
                initnum[i].innerText = `\xa0${data2.results[i].number}\xa0`;
                resnum[i].innerText = `\xa0${data2.results[i].result}.\xa0`;
            }
        }, 100);

        console.log(data2);
    };
    xhr2.send();
})