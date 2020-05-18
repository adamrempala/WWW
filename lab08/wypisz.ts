import * as sqlite3 from 'sqlite3';
sqlite3.verbose();

let db = new sqlite3.Database('baza.db');


db.all('SELECT sciezka, COUNT(*) as suma FROM odwolania GROUP BY sciezka;', [], (err, rows) => {

    if (err) {
        throw(err);
    }
    let obiekt = [];

    for(let {sciezka, suma} of rows) {

        obiekt.push({a: sciezka, b: suma})
        console.log(sciezka, '->', suma);

    }
    
    db.close();
    console.log(obiekt)
});