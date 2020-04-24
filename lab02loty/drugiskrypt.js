"use strict";
exports.__esModule = true;
var program_1 = require("./program");
var opoznione = document.getElementById('p3');
opoznione.addEventListener('click', pokoloruj);
var j = 0;
function pokoloruj(ev) {
    j++;
    var target = ev.target;
    var elem = this;
    console.log(elem, target);
    var currentColor = window.getComputedStyle(elem).getPropertyValue('background-color');
    console.log(currentColor);
    if (currentColor[3] === 'a') {
        var _a = /rgba\((\d+),[^0-9]*(\d+),[^0-9]*(\d+),[^0-9]*(\d+)\)/.exec(currentColor), _ = _a[0], colorsAsText = _a.slice(1);
        var colors = [];
        for (var i = 0; i < 4; i++)
            colors[i] = (parseInt(colorsAsText[i]) + 0x20) % 256;
        elem.style.backgroundColor = "rgba(" + colors[0] + "," + colors[1] + "," + colors[2] + ", " + colors[3] + ")";
    }
    else {
        var _b = /rgb\((\d+),[^0-9]*(\d+),[^0-9]*(\d+)\)/.exec(currentColor), _ = _b[0], colorsAsText = _b.slice(1);
        var colors = [];
        for (var i = 0; i < 3; i++)
            colors[i] = (parseInt(colorsAsText[i]) + 0x20) % 256;
        elem.style.backgroundColor = "rgba(" + colors[0] + "," + colors[1] + "," + colors[2] + ")";
    }
    console.log(program_1.fibonacci(10 * j));
}
