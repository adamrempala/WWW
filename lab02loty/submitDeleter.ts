let przycisk = document.querySelector("button[type=submit]");

przycisk.setAttribute('disabled', 'disabled');

let data = document.querySelector("input[type=date]");
(<HTMLInputElement>data).value = '1980-01-01';
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
    let proper = new Boolean();
    proper = true;

    pola.forEach(element => {
        if((<HTMLInputElement>element).value.length < 1 || sameSpaces((<HTMLInputElement>element).value)) {
            proper = false;
        }
    });

    let wrDate = new Date((<HTMLInputElement>data).value).getTime()
    let now = new Date().getTime();

    if (wrDate < now - now % 86400000){
        proper = false;
    }
        
    if (proper === false) {
        przycisk.setAttribute('disabled', 'disabled');
    } else {
        przycisk.removeAttribute('disabled');
    }
    console.log((<HTMLInputElement>data).value)
}