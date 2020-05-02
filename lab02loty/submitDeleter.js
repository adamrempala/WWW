var przycisk = document.querySelector("button[type=submit]");
przycisk.setAttribute('disabled', 'disabled');
var data = document.querySelector("input[type=date]");
data.value = '1980-01-01';
var pola = document.querySelectorAll("input");
pola.forEach(function (element) {
    element.addEventListener('input', checkProperData);
});
function sameSpaces(text) {
    var i = 0;
    while (i < text.length) {
        if (text[i] !== ' ') {
            return false;
        }
        i++;
    }
    return true;
}
function checkProperData() {
    var proper = new Boolean();
    proper = true;
    pola.forEach(function (element) {
        if (element.value.length < 1 || sameSpaces(element.value)) {
            proper = false;
        }
    });
    var wrDate = new Date(data.value).getTime();
    var now = new Date().getTime();
    if (wrDate < now - now % 86400000) {
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
