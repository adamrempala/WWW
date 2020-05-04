let przycisk = document.querySelector("button[type=submit]");

przycisk.setAttribute('disabled', 'disabled');

let data = document.querySelector("input[type=date]") as HTMLInputElement;
data.value = '1980-01-01';
let pola = document.querySelectorAll("input");

pola.forEach(element => {
    element.addEventListener('input', checkProperData);
});


function sameSpaces(text) {
    let i = 0;

    while (i < text.length) {
        if (text[i] !== ' ') {
            return false;
        }

        i++;
    }

    return true;
}

function checkProperData(){
    let proper = true;

    pola.forEach(element => {
        element = element as HTMLInputElement;
        if(element.value.length < 1 || sameSpaces(element.value)) {
            proper = false;
        }
    });

    const wrDate = new Date(data.value).getTime()
    const now = new Date().getTime();

    if (wrDate < now - now % 86400000){
        proper = false;
    }
    if (proper === false) {
        przycisk.setAttribute('disabled', 'disabled');
    } else {
        przycisk.removeAttribute('disabled');
    }
    console.log(data.value)
}

checkProperData();