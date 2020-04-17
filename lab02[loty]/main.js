var el = document.querySelector("button[type=submit]");
var el5 = document.querySelector("#fname");
el5.value = "hehe";
var xd = document.querySelector("#body > header:nth-child(1) > h1:nth-child(1)");
xd.textContent = "Ojej, nie wiem!";
var nowyElement = document.createElement("div");
nowyElement.setAttribute("id", "niewiem");
document.body.appendChild(nowyElement);
setTimeout(function () {
    console.log("No już wreszcie.");
}, 2000);
