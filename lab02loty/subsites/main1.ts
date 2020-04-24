let identyfikatorowe = document.querySelectorAll("p[data-identyfikator-pasazera]");
let dl = identyfikatorowe.length;
let max="";
for (let i = 0; i < dl; i++) {
    if (identyfikatorowe[i].getAttribute("data-identyfikator-pasazera") > max)
        max = identyfikatorowe[i].getAttribute("data-identyfikator-pasazera");
}
for (let i = 0; i < dl; i++) {
    if (identyfikatorowe[i].getAttribute("data-identyfikator-pasazera") == max)
        console.log(identyfikatorowe[i].textContent);
}

function teczoweKolory(el: HTMLElement) {

    setTimeout(function () {

        console.log('red');

        el.style.backgroundColor = 'red';

        setTimeout(function() {

            el.style.backgroundColor = 'orange';

            setTimeout(function() {

                el.style.backgroundColor = 'yellow';

                setTimeout(function() {

                    el.style.backgroundColor = 'green';

                    setTimeout(function() {

                        el.style.backgroundColor = 'blue';

                        setTimeout(function() {

                            el.style.backgroundColor = 'indigo';

                            setTimeout(function() {

                                el.style.backgroundColor = 'purple';

                            }, 1000);

                        }, 1000);

                    }, 1000);

                }, 1000);

            }, 1000);

        }, 1000);

    }, 1000);

}

function wait(ms:number) {
    return new Promise((resolve, reject) => {
        window.setTimeout(resolve, ms);
    });
}


function teczoweKolory2 (el: HTMLElement) {
    console.log('v2');
    wait(1000).then(function () {
        el.style.backgroundColor = 'red';
        return wait(1000);
    }).then(function () {
        el.style.backgroundColor = 'orange';
        return wait(1000);
    }).then(function () {
        el.style.backgroundColor = 'yellow';
        return wait(1000);
    }).then(function () {
        el.style.backgroundColor = 'green';
        return wait(1000);
    }).then(function () {
        el.style.backgroundColor = 'blue';
        return wait(1000);
    }).then(function () {
        el.style.backgroundColor = 'indigo';
        return wait(1000);
    }).then(function () {
        el.style.backgroundColor = 'purple';
        return wait(1000);
    });
}

function teczoweKolory3(el: HTMLElement) {
    console.log('v3');
    let pr = wait(1000);
    for(const color of ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple']) {
        pr = pr.then(() => {
            el.style.backgroundColor = color;
            return wait(1000);
        });
    }
}

async function teczoweKolory5(el: HTMLElement) {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple'];
    for(const color of colors) {
        await wait(1000);
        console.log(color);
        el.style.backgroundColor = color;
    }
}

teczoweKolory5(document.querySelector("body"));