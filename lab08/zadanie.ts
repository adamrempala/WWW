import {createServer} from 'http';
import * as fs from 'fs';
import { promisify } from 'util';
import * as sqlite3 from 'sqlite3';


let server = createServer(

    (req, res) => {

        if(req.url === '/statystyki') {
            
            let db = new sqlite3.Database('baza.db');
            
            
            
            db.run('CREATE TABLE IF NOT EXISTS odwolania (sciezka VARCHAR(255), liczba INT);');
            
            db.all('SELECT sciezka, COUNT(*) as suma FROM odwolania GROUP BY sciezka;', [], (err, rows) => {

                if (err) {
                    throw(err);
                }
                let obiekt = [];
            
                res.write('<!DOCTYPE html>\
                <head>\
                <title>Duda</title>\
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\
                </head>\
                ')
                res.write(`<body>`)

                for(let {sciezka, suma} of rows) {
                    res.write(`<p>${sciezka} został zawołany ${suma} razy</p>`);
                }
                res.write(`</body>`)
                res.end();
                
            });
            db.close();
        } else {
            let addr = req.url.substr(1); 
            fs.readFile(addr, (err, data) => {
                if (err) {
                    res.write('Nie ma takiego pliku!');
                    res.end();
                    return;
                };
                const content = data;
                let db = new sqlite3.Database('baza.db');

                db.run('CREATE TABLE IF NOT EXISTS odwolania (sciezka VARCHAR(255), liczba INT);');

                db.run(`INSERT INTO odwolania VALUES ('${addr}', 1);`);

                db.close();
                processFile(content, res);
                sqlite3.verbose();

                
            });
            
        }

    }

);


server.listen(8080);

function processFile(content, res) {
    res.write(content);
    res.end();
}