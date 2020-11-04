let initial;
let data;
let records;
let total = [0, 1];
let initnum = [document.querySelector('.initialnum1'), document.querySelector('.initialnum2'), document.querySelector('.initialnum3')];
let resnum = [document.querySelector('.resultnum1'), document.querySelector('.resultnum2'), document.querySelector('.resultnum3')];
let datenum = [document.querySelector('.date1'), document.querySelector('.date2'), document.querySelector('.date3')];

const number = document.querySelector('.boxform');
const result = document.querySelector('.result');
const buton = document.querySelector('.buton');
const spin = document.querySelector('.spin');
const alert = document.querySelector('.morethan');
const error = document.querySelector('.error');
const previous = document.querySelector('.previous');
const titleresults = document.querySelector('.titleresults');
const checkbox = document.querySelector('.checkbox');

const getData = () => {
    const serverCall = new XMLHttpRequest();
    serverCall.open('GET', `http://localhost:5050/fibonacci/${initial}`);
    serverCall.onload = () => {
        data = [];
        result.innerText = [];
        spin.className = 'spinner-border spin';
        if (initial == 42) {
            data = serverCall.response;
            setTimeout(() => {
                spin.className = 'spin';
                result.innerText = `Server error: ${data}`;
                result.className = 'result errormsg';
            }, 100);
        } else {
            result.className = 'result';
            data = JSON.parse(serverCall.response);
            setTimeout(() => {
                spin.className = 'spin';
                result.innerText = data.result;
            }, 100);
        };
    };
    serverCall.send();
}

function clickAction() {
    initial = 0;
    if (number.value <= 50 && number.value > 0) {
        alert.className = "morethan";
        alert.innerText = "";
        initial = number.value;
        ifCheckedGetData();
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

}

buton.addEventListener('click', clickAction);

let datearray = [];
let descending = [];
let data2;

function recording() {
    const prevHistory = new XMLHttpRequest();
    prevHistory.open('GET', `http://localhost:5050/getFibonacciResults`);
    prevHistory.onload = () => {
        spin.className = 'spinner-border spin2';
        data2 = JSON.parse(prevHistory.response);
        dateSort();
        setTimeout(() => {
            updateValues();
        }, 1000);
    }
    prevHistory.send();
}

function fibonacci(initial) {
    if (initial == 42) {
        setTimeout(() => {
            spin.className = 'spin';
            result.innerText = `Server error: 42 is the meaning of life`;
            result.className = 'result errormsg';
        }, 100);
    } else {
        result.className = 'result';
        for (let i = 2; i < 51; i++) {
            total[i] = total[i - 1] + total[i - 2];
        };
        result.innerText = total[initial];
    };
}

function ifChecked() {
    if (checkbox.checked === true) {
        recording();
        updateValues();

    } else {
        fibonacci(number.value);
    };
}

function ifCheckedGetData() {
    if (checkbox.checked === true){
        getData();
    };
}

window.addEventListener('load', recording);
buton.addEventListener('click', ifChecked);


function dateSort() {
    data2.results.sort(function (a, b) {
        let dateB = new Date(b.createdDate),
            dateA = new Date(a.createdDate);
        return dateB - dateA;
    });
}

function updateValues() {
    spin.className = 'spin';
    for (let j = 0; j < 3; j++) {
        datearray[j] = new Date(Number(`/Date(${data2.results[j].createdDate})/`.replace(/\D/g, '')));
        datenum[j].innerText = `\xa0${datearray[j]}`;
    };
    for (let i = 0; i < 3; i++) {
        initnum[i].innerText = `\xa0${data2.results[i].number}\xa0`;
        resnum[i].innerText = `\xa0${data2.results[i].result}.\xa0`;
    };
}