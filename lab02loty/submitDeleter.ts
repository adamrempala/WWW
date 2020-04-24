let przycisk = document.querySelector("button[type=submit]");

przycisk.setAttribute('disabled', 'disabled');

let data = document.querySelector("input[type=date]");
(<HTMLInputElement>data).value = '1980-01-01';
let pola = document.querySelectorAll("input[type=text]");

data.addEventListener('change', funkcja);
pola.forEach(element => {
    element.addEventListener('change', funkcja);
});


function funkcja (){
    let proper = new Boolean();
    proper = true;
    pola.forEach(element => {
        if((<HTMLInputElement>element).value.length < 1) {
            proper = false;
        }
            
    })
    let wrDate = new Date((<HTMLInputElement>data).value)
    if (wrDate < new Date()){
        proper = false;
    }
        
    if (proper === false) {
        przycisk.setAttribute('disabled', 'disabled');
    } else {
        przycisk.removeAttribute('disabled');
    }
    console.log((<HTMLInputElement>data).value)
}