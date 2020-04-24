var przycisk = document.querySelector("button[type=submit]");
przycisk.setAttribute('disabled', 'disabled');
var data = document.querySelector("input[type=date]");
data.value = '1980-01-01';
var pola = document.querySelectorAll("input[type=text]");
data.addEventListener('change', funkcja);
pola.forEach(function (element) {
    element.addEventListener('change', funkcja);
});
function funkcja() {
    var proper = new Boolean();
    proper = true;
    pola.forEach(function (element) {
        if (element.value.length < 1) {
            proper = false;
        }
    });
    var wrDate = new Date(data.value);
    if (wrDate < new Date()) {
        proper = false;
    }
    if (proper === false) {
        przycisk.setAttribute('disabled', 'disabled');
    }
    else {
        przycisk.removeAttribute('disabled');
    }
    console.log(data.value);
}
