import * as sqlite3 from 'sqlite3';
// tslint:disable-next-line: no-var-requires
const sha = require('js-sha3')
// tslint:disable-next-line: no-var-requires
const md5 = require('js-md5')

const mostExpensive = [

    {'id': 10,

    'name': 'Mem gamerski 1',

    'price': 1000,

    'url': 'https://i.redd.it/h7rplf9jt8y21.png'},

    {'id': 9,

    'name': 'Mem gamerski 2',

    'price': 2100,

    'url': 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg'},

    {'id': 8,

    'name': 'Mem gamerski 3',

    'price': 1200,

    'url': 'https://i.imgflip.com/30zz5g.jpg'},

    {'id': 7,

    'name': 'Mem pokemonowy',

    'price': 1150,

    'url': 'https://memy.pl/show/big/uploads/Post/314059/15853146772821.jpg'},

    {'id': 6,

    'name': 'Mem filmowy',

    'price': 1619,

    'url': 'https://memesbams.com/wp-content/uploads/2017/09/thats-funny-meme-3.jpg'},

    {'id': 5,

    'name': 'Mem filozoficzny',

    'price': 1789,

    'url': 'https://filozofuj.eu/wp-content/uploads/2017/02/metaphisica.jpg'},

    {'id': 4,

    'name': 'Mem geopolityczny',

    'price': 1739,

    'url': 'https://pobierak.jeja.pl/images/8/b/e/216891_granica-na-uralu.jpg'},

    {'id': 3,

    'name': 'Mem serialowy',

    'price': 1299,

    'url': 'https://i1.kwejk.pl/k/obrazki/2020/04/x9YgTuoBnNHOSZP1.jpg'}
    ];

sqlite3.verbose();


let db = new sqlite3.Database('baza.db');
db.all(`SELECT * FROM hasla /*WHERE user = 'user'*/`, [], (err, rows) => {
    rows.forEach(elt=>{console.log(elt)})
})
db.close();
// db.run(`DROP TABLE hasla`, ()=>{
//     db.run(`DROP TABLE memy`,()=> {
//         db.run(`CREATE TABLE hasla(user TEXT, name TEXT)`, ()=>{
//             db.run(`INSERT INTO hasla VALUES ('admin', '${sha.sha3_256('admin')}')`, ()=>{
//                 db.run(`INSERT INTO hasla VALUES ('user', '${sha.sha3_256('user')}')`, ()=>{
//                     db.run(`CREATE TABLE memy(id INTEGER, name TEXT, prices TEXT, current NUMERIC, url TEXT)`, ()=>{
//                         (new Promise((resolve,reject)=>{
//                             let i = 0;
//                             mostExpensive.forEach(element => {
//                                 db.run(`INSERT INTO memy VALUES(${element.id}, '${element.name}', '${element.price};Cena początkowa;', ${element.price},'${element.url}')`, ()=>{
//                                     i++;
//                                     if (i === mostExpensive.length)
//                                         resolve();
//                                 })
//                             })
//                         })).then(()=>{db.close();}).catch(()=>{db.close(); throw new Error("error")})
//                     });
//                 });
//             });
//         })
//     });
// });
// // db.close();
// // db = new sqlite3.Database('baza.db');

// // db.close();
// // db = new sqlite3.Database('baza.db');
// db.run(`CREATE TABLE hasla(user TEXT, name TEXT)`);
// // db.close();
// // db = new sqlite3.Database('baza.db');
// db.run(`INSERT INTO hasla VALUES ('admin', '${sha.sha3_256('admin')})'`);
// // // db.close();
// // // db = new sqlite3.Database('baza.db');
// db.run(`INSERT INTO hasla VALUES ('user', '${sha.sha3_256('user')})'`);
// // // db.close();
// // db = new sqlite3.Database('baza.db');
// db.run(`CREATE TABLE memy(id INTEGER, name TEXT, prices TEXT, current NUMERIC, url TEXT)`);
// // // db.close();


// mostExpensive.forEach(element => {
//     console.log(1)
//     // db = new sqlite3.Database('baza.db');
//     db.run(`INSERT INTO memy VALUES(${element.id}, '${element.name}', '${element.price};Cena początkowa', ${element.price},'${element.url})'`)
//     // db.close();
// })

console.log(2)
