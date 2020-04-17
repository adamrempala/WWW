{
    'use strict';

    let opoznione = document.getElementById('p3');
    opoznione.addEventListener('click', pokoloruj);

    function pokoloruj(ev: MouseEvent) {
        let target = ev.target;
        let elem = this as HTMLElement;

        console.log(elem, target);

        let currentColor = window.getComputedStyle(elem).getPropertyValue('background-color');
        let [_,...colorsAsText] = /rgb\((\d+),[^0-9]*(\d+),[^0-9]*(\d+)\)/.exec(currentColor);
        let colors: number[] = [];
        for(let i = 0; i < 3; i++) colors[i] = (parseInt(colorsAsText[i]) + 0x20) % 256;
        elem.style.backgroundColor = `rgb(${colors[0]},${colors[1]},${colors[2]})`;
    }

}