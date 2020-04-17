let el = document.querySelector("button[type=submit]");
let el5 = document.querySelector("#fname") as HTMLInputElement;
el5.value = "hehe";
let xd = document.querySelector("#body > header:nth-child(1) > h1:nth-child(1)") as HTMLHeadingElement;
xd.textContent = "Ojej, nie wiem!";
let nowyElement = document.createElement("div");
nowyElement.setAttribute("id", "niewiem");
document.body.appendChild(nowyElement);
setTimeout(() => {

  console.log("No już wreszcie.");

}, 2000);
