{
    'use strict';
    var opoznione = document.getElementById('p2');
    var rezerwacje = document.getElementById('p3');
    opoznione.addEventListener('click', pokoloruj);
    rezerwacje.addEventListener('click', pokoloruj);
    function pokoloruj(ev) {
        var target = ev.target;
        var elem = this;
        console.log(elem, target);
        var currentColor = window.getComputedStyle(elem).getPropertyValue('background-color');
        var _a = /rgb\((\d+), [^0-9]*(\d+), [^0-9]*(\d+)\)/.exec(currentColor), _ = _a[0], colorsAsText = _a.slice(1);
        var colors = [];
        for (var i = 0; i < 3; i++)
            colors[i] = (parseInt(colorsAsText[i]) + 0x20) % 256;
        elem.style.backgroundColor = "rgb(" + colors[0] + ", " + colors[1] + ", " + colors[2] + ")";
    }
}
