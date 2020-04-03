// function zaloguj(...komunikaty: string[]) {
//     console.log("Ależ skomplikowany program!", ...komunikaty);
// }
// zaloguj("Ja", "cię", "nie", "mogę");
var jsonString = "{\n\n    \"piloci\": [\n\n        \"Pirx\",\n\n        \"Exupery\",\n\n        \"Idzikowski\",\n\n        \"G\u0142\u00F3wczewski\"\n\n    ],\n\n    \"lotniska\": {\n\n        \"WAW\": [\"Warszawa\", [3690, 2800]],\n\n        \"NRT\": [\"Narita\", [4000, 2500]],\n\n        \"BQH\": [\"Biggin Hill\", [1802, 792]],\n\n        \"LBG\": [\"Paris-Le Bourget\", [2665, 3000, 1845]]\n\n    }\n\n}";
function sprawdzDaneLiniiLotniczej(dane) {
    if (!("piloci" in dane))
        return false;
    if (!("lotniska" in dane))
        return false;
    return true;
}
var dataStructure = JSON.parse(jsonString);
if (sprawdzDaneLiniiLotniczej(dataStructure)) {
    console.log(dataStructure.piloci.length);
}
else {
    console.log("Błędne dane xD");
}
console.log(dataStructure);
