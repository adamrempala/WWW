import { MemeList } from './memelist'
import csurf from 'csurf'
import cookieParser from 'cookie-parser'
import session from 'express-session'
// tslint:disable-next-line: no-var-requires
const csql3 = require('connect-sqlite3');
// tslint:disable-next-line: no-var-requires
const md5 = require('js-md5')

import * as sqlite3 from 'sqlite3';
import $ from 'jquery'

export const lista = new MemeList();

const parsePrices = (word: string) => {
    let colonCount = 0;
    const prices = new Array();
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

    return prices.reverse();
}

const doMeme  = (id:number, name:string, prices:string, url:string) => {
    return {
        id,
        name,
        prices: parsePrices(prices),
        url
    }
}

import express from 'express';

const sqliteStore = csql3(session);
const app = express();
const secretlySecretValue = 'Mary had a little lamb';
app.use(cookieParser(secretlySecretValue))

const csrfProtection = csurf({cookie:true})

app.use(session({secret: secretlySecretValue,
cookie: { maxAge: 15*60*1000},
resave: false,
saveUninitialized: true,
store: new sqliteStore() }))


app.use(express.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
  if (!req.session?.views) {
    req.session.views = {};
  }

  if (!req.session?.zalogowany) {
    req.session.zalogowany = {};
  }

  req.session.views[req.path] = (req.session.views[req.path] || 0) + 1;
  next();
});

app.set('view engine', 'pug');

app.get('/', (req, res) => {

    if (!req.session.zalogowany?.username) {
        res.render('zaloguj', {error: ''});
    } else {
        sqlite3.verbose();

        const db = new sqlite3.Database('baza.db');

        db.all('SELECT id, name, prices, url FROM memy', [], (err, rows) => {

            if (err) throw(err);

            let memy = new Array(0);

            for(const {id, name, prices, url} of rows) {
                memy.push(doMeme(id, name, prices, url))
            }

            memy.sort((a,b) => b.prices[0].price - a.prices[0].price)

            memy = memy.splice(0,3);

            db.close();

            res.render('index2', { title: 'Meme market', message: 'Witaj na giełdzie memów', memes: memy, count:Object.keys(req.session.views).length, nazwa: req.session.zalogowany.username })

        });
    }

});

app.get('/meme/:memeId', csrfProtection, (req, res) => {

    if (!req.session.zalogowany?.username) {
        res.render('zaloguj', {error: ''});
    } else {
        sqlite3.verbose();

        const db = new sqlite3.Database('baza.db');
        let meme;

        try {
            db.all(`SELECT id, name, prices, url FROM memy WHERE id = ${req.params.memeId}`, [], (err, rows) => {

                if (err) throw(err);

                if (rows.length === 0) {
                    meme = null;
                    db.close();
                    res.render('error', {message: '404 Not Found', csrfToken: req.csrfToken(), count:Object.keys(req.session.views).length});
                } else {
                    meme = doMeme(rows[0].id, rows[0].name, rows[0].prices, rows[0].url);
                    db.close();
                    res.render('prices2', { meme, csrfToken: req.csrfToken(), count:Object.keys(req.session.views).length });
                }

            });
        } catch {
            res.render('error', {message: '404 Not Found', csrfToken: req.csrfToken(), count:Object.keys(req.session.views).length, nazwa: req.session.zalogowany.username});
        }
    }
})

app.post('/meme/:memeId', csrfProtection, (req, res) => {

    if (!req.session.zalogowany?.username) {
        res.render('zaloguj', {error: ''});
    } else {
        const price = req.body.price;

        const user = req.session.zalogowany.username;

        sqlite3.verbose();

        const db = new sqlite3.Database('baza.db');
        let meme;

        db.run('BEGIN TRANSACTION')

        try {
            let error = "";

            db.all(`SELECT id, name, prices, url FROM memy WHERE id = ${req.params.memeId}`, [], (err, rows) => {

                if (err) throw(err);

                if (typeof(price) === 'number') {
                    db.all(`UPDATE memy SET prices = \'${rows[0].prices}${price};${user};\' WHERE id = ${req.params.memeId}`, [], (err2, rows2) => {
                        if (err2) db.run('ROLLBACK');
                    });

                    meme = doMeme(rows[0].id, rows[0].name, `${rows[0].prices}${price};${user};`, rows[0].url);
                } else {
                    error='Invalid price'
                    meme = doMeme(rows[0].id, rows[0].name, `${rows[0].prices}`, rows[0].url);
                }

                db.run('COMMIT');

                db.close();
                res.render('prices2', {error, meme, csrfToken: req.csrfToken(), count:Object.keys(req.session.views).length, nazwa: req.session.zalogowany.username })

            });
        } catch {
            res.render('error', {message: '404 Not Found', csrfToken: req.csrfToken(), count:Object.keys(req.session.views).length});
        }
    }
})

app.post('/', (req, res) => {
    // ... wyciągnij dane z formularza
    sqlite3.verbose();

    const db = new sqlite3.Database('baza.db');

    try {
      db.all(`SELECT user, name FROM hasla WHERE user LIKE '${req.body.username}'`, [], (err, rows) => {

          if (rows.length < 1) {
              db.close();
              res.render('zaloguj', {error: 'Invalid username'});
          } else {
              if (err) throw(err);

              if (rows[0].name === md5(req.body.password)) {
                  req.session.zalogowany = { username: req.body.username };

                  db.all('SELECT id, name, prices, url FROM memy', [], (err2, rows2) => {

                      if (err2) throw(err2);

                      let memy = new Array(0);

                      for(const {id, name, prices, url} of rows2) {
                          memy.push(doMeme(id, name, prices, url))
                      }

                      memy.sort((a,b) => b.prices[0].price - a.prices[0].price)

                      memy = memy.splice(0,3);

                      db.close();

                      res.render('index2', { title: 'Meme market', message: 'Witaj na giełdzie memów', memes: memy, count:Object.keys(req.session.views).length, nazwa: req.session.zalogowany.username })

                  });
              } else {
                  db.close();
                  res.render('zaloguj', {error: 'Invalid password'});
              }
          }
      });
    } catch {
      res.render('error', {message: '404 Not Found', csrfToken: req.csrfToken(), count:Object.keys(req.session.views).length});
    }
  })

app.post('/logout', (req, res) => {
    req.session.zalogowany = { username: req.body.username };
    res.render('zaloguj', {error: 'Wylogowano pomyślnie'});
});

app.get('/*', csrfProtection, (req, res) => {
    res.render('error', {message: '404 Not Found', csrfToken: req.csrfToken(), count:Object.keys(req.session.views).length})
});

module.exports = app;


