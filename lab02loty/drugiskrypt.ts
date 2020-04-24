export function fibonacci(e) {
    if (e < 2)
        return e;
    else
        return fibonacci(e-1) + fibonacci(e-2);
}

{
    'use strict';

    let opoznione = document.getElementById('p3');
    opoznione.addEventListener('click', pokoloruj);

    let j = 0;

    

    function pokoloruj(ev: MouseEvent) {
        j++;
        let target = ev.target;
        let elem = this as HTMLElement;

        console.log(elem, target);

        let currentColor = window.getComputedStyle(elem).getPropertyValue('background-color');
        console.log(currentColor)
        if (currentColor[3] === 'a') {
            let [_,...colorsAsText] = /rgba\((\d+),[^0-9]*(\d+),[^0-9]*(\d+),[^0-9]*(\d+)\)/.exec(currentColor);
            let colors: number[] = [];
            for(let i = 0; i < 4; i++) colors[i] = (parseInt(colorsAsText[i]) + 0x20) % 256;
            elem.style.backgroundColor = `rgba(${colors[0]},${colors[1]},${colors[2]}, ${colors[3]})`;
        } else {
            let [_,...colorsAsText] = /rgb\((\d+),[^0-9]*(\d+),[^0-9]*(\d+)\)/.exec(currentColor);
            let colors: number[] = [];
            for(let i = 0; i < 3; i++) colors[i] = (parseInt(colorsAsText[i]) + 0x20) % 256;
            elem.style.backgroundColor = `rgba(${colors[0]},${colors[1]},${colors[2]})`;
        }
        
        console.log(fibonacci(10*j))
    }

}