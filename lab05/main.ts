// function zaloguj(...komunikaty: string[]) {
//     console.log("Ależ skomplikowany program!", ...komunikaty);
// }

// zaloguj("Ja", "cię", "nie", "mogę");

let jsonString: string = `{

    "piloci": [

        "Pirx",

        "Exupery",

        "Idzikowski",

        "Główczewski"

    ],

    "lotniska": {

        "WAW": ["Warszawa", [3690, 2800]],

        "NRT": ["Narita", [4000, 2500]],

        "BQH": ["Biggin Hill", [1802, 792]],

        "LBG": ["Paris-Le Bourget", [2665, 3000, 1845]]

    }

}`;

type Pilot = string;

function sprawdzDaneLiniiLotniczej(dane: any): dane is ILiniaLotnicza {
    if (!("piloci" in dane))
        return false;
    if (!("lotniska" in dane))
        return false;

    if (typeof(dane.lotniska) !== 'object')
        return false;

    for (const i in dane.piloci) {
        if (typeof(i) !== "string")
            return false;
    }

    return true;
}



interface ILotnisko {
    [nazwa: string]: [string, number[]];
}

interface ILiniaLotnicza {
    piloci: Pilot[];
    lotniska: ILotnisko;
}


let dataStructure: ILiniaLotnicza = JSON.parse(jsonString);

if (sprawdzDaneLiniiLotniczej(dataStructure)) {
    console.log(dataStructure.piloci.length);
}
else {
    console.log("Błędne dane xD");
}


console.log(dataStructure);