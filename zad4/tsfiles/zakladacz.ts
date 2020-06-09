import * as sqlite3 from 'sqlite3';
// tslint:disable-next-line: no-var-requires
const md5 = require('js-md5')

const doMeme  = (id:number, name:string, prices:string, url:string) => {
    return {
        id: id,
        name: name,
        prices: parsePrices(prices),
        url: url
    }
}

const parsePrices = (word: string) => {
    let colonCount = 0;
    let prices = new Array();
    let firstNumb = 0;
    let numbCount = 0;
    let firstUsr;
    let usrCount = 0;

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0 ; i < word.length; i++) {
        if (word[i] === ';') {
            colonCount++;
            if (colonCount % 2 === 0) {
                prices.push({
                    price: parseInt(word.substr(firstNumb, numbCount), 10),
                    username: word.substr(firstUsr, usrCount/*firstUsr + usrCount - 2*/)
                })
                firstNumb = i + 1;
            } else {
                firstUsr = i + 1;
                usrCount = 0;
            }
        } else {
            if (colonCount % 2 === 0) {
                numbCount++;
            } else {
                usrCount++;
            }
        }
    }

    return prices;
}

function zalozBaze() {

    sqlite3.verbose();

    const db = new sqlite3.Database('baza.db');

   // db.run('CREATE TABLE hasla (user VARCHAR(48) UNIQUE, name VARCHAR(32));');

    // mostExpensive.forEach(element => {
    //     console.log('xd')
    //     db.run(`INSERT INTO memy VALUES(${element.id}, \'${element.name}\', \'${element.price};Cena początkowa;\', \'${element.url}\')`)
    // });

    db.run(`INSERT INTO hasla VALUES('Lukatiks', '${md5('elitarnymimuw')}')`);

    db.close();

}

function zobaczBaze() {

    sqlite3.verbose();

    const db = new sqlite3.Database('baza.db');


    // db.all('SELECT id, name, prices, url FROM memy', [], (err, rows) => {

    //     if (err) throw(err);

    //     let memy = new Array(0);

    //     for(const {id, name, prices, url} of rows) {

    //     //     console.log(id, '->', name, prices, url);
    //         memy.push(doMeme(id, name, prices, url))
    //     }

    //     memy.sort((a,b) => b.prices[0].price - a.prices[0].price)

    //     memy = memy.splice(0,3);

    //     console.log(memy);

    //     db.close();

    // });

    db.all(`SELECT user, name FROM hasla-- WHERE user LIKE 'Adam'`, [], (err, rows) => {

        if (err) throw(err);

        // let memy = new Array(0);

        for(const {user, name} of rows) {
            if (name === md5('353532'))
                console.log(user, '->', name);
            // memy.push(doMeme(id, name, prices, url))
        }

        db.close();

    });

}


zobaczBaze();