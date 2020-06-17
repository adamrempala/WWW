import csurf from 'csurf'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MemeList from './memelist'
import express from 'express';

// tslint:disable-next-line: no-var-requires
const csql3 = require('connect-sqlite3');
// tslint:disable-next-line: no-var-requires
const sha = require('js-sha3')

import * as sqlite3 from 'sqlite3';

const memes = new MemeList();
// console.log(memes.getLista2())

const isProperUsername = (username:string) => {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < username.length; i++) {
        if ((username[i] < 'A' || username[i] > 'Z')
            && (username[i] < 'a' || username[i] > 'z')
            && (username[i] < '0' || username[i] > '9')
            && (username[i] < '(' || username[i] > '.')) {
            return false;
        }
    }
    return true;
}

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

app.post('/login', csrfProtection, (req, res) => {

    if (!req.session.zalogowany?.username) {
        res.render('zaloguj', {error: '', csrfToken: req.csrfToken()});
    } else {
        location.href = "/";
    }

});

app.get('/', csrfProtection, (req, res) => {

    const memy = memes.get3MostExpensive();

    if (!req.session.zalogowany?.username) {
        res.render('index2', { title: 'Meme market', message: 'Witaj na giełdzie memów', csrfToken: req.csrfToken(), memes: memy, count:Object.keys(req.session.views).length, nazwa: "nieznajomy", log: "login" });
    } else {
        res.render('index2', { title: 'Meme market', message: 'Witaj na giełdzie memów', csrfToken: req.csrfToken(), memes: memy, count:Object.keys(req.session.views).length, nazwa: req.session.zalogowany.username, log: "logout" });
    }


});

app.get('/meme/:memeId', csrfProtection, (req, res) => {
    if (isNaN(Number(req.params.memeId)) || req.params.memeId.length === 0) {
        res.render('error', {message: 'Invalid argument', csrfToken: req.csrfToken(), count:Object.keys(req.session.views).length, nazwa: req.session.zalogowany.username});
    } else try {
        const meme = memes.getMeme(req.params.memeId);
        if (!req.session.zalogowany?.username) {
            res.render('priceswf', { meme, csrfToken: req.csrfToken(), count:Object.keys(req.session.views).length });
        } else {
            res.render('prices2', { meme, csrfToken: req.csrfToken(), count:Object.keys(req.session.views).length, nazwa:req.session.zalogowany.username });
        }
    } catch {
        res.render('error', {message: '404 Not Found', csrfToken: req.csrfToken(), count:Object.keys(req.session.views).length, nazwa: req.session.zalogowany.username});
    }
})

app.post('/meme/:memeId', csrfProtection, (req, res) => {

    if (!req.session.zalogowany?.username) {
        res.render('zaloguj', {error: '', csrfToken: req.csrfToken()});
    } else {
        const price = req.body.price;

        const user = req.session.zalogowany.username;

        sqlite3.verbose();

        const db = new sqlite3.Database('baza.db');

        if (isNaN(Number(req.params.memeId))
            || req.params.memeId.length === 0) {
                res.render('error', {message: '404 Not Found', csrfToken: req.csrfToken(), count:Object.keys(req.session.views).length});
        } else try {
            let error = "";
            if (!isNaN(price) && price.length > 0) {
                memes.getMeme(req.params.memeId).changePriceProm(price, user).then(()=>{
                    const meme = memes.getMeme(req.params.memeId);
                    res.render('prices2', {error, meme, csrfToken: req.csrfToken(), count:Object.keys(req.session.views).length, nazwa: req.session.zalogowany.username });
                }).catch(()=>{throw new Error("error")});
            } else {
                error="Invalid input"
                const meme = memes.getMeme(req.params.memeId);
                res.render('prices2', {error, meme, csrfToken: req.csrfToken(), count:Object.keys(req.session.views).length, nazwa: req.session.zalogowany.username });
            }
        } catch {
            res.render('error', {message: '404 Not Found', csrfToken: req.csrfToken(), count:Object.keys(req.session.views).length});
        }
    }
})

app.post('/', csrfProtection, (req, res) => {
    // ... wyciągnij dane z formularza
    sqlite3.verbose();

    if (!isProperUsername(req.body.username)) {
        res.render('zaloguj', {error: 'Invalid username', csrfToken: req.csrfToken(), count:Object.keys(req.session.views).length});
    } else try {

        const db = new sqlite3.Database('baza.db');

        db.all(`SELECT name FROM hasla WHERE user = '${req.body.username}'`, [], (err, rows) => {
            if (err) {
                throw err;
            } else if (rows.length !== 1) {
                console.log(rows.length, req.body.username)
                res.render('zaloguj', {error: 'No such username', csrfToken: req.csrfToken(), count:Object.keys(req.session.views).length});
            } else if (rows[0].name !== sha.sha3_256(req.body.password)) {
                res.render('zaloguj', {error: 'Passwords do not match', csrfToken: req.csrfToken(), count:Object.keys(req.session.views).length});
            } else {
                req.session.zalogowany = {username: req.body.username};
                const memy = memes.get3MostExpensive();
                res.render('index2', { title: 'Meme market', message: 'Witaj na giełdzie memów', memes: memy, count:Object.keys(req.session.views).length, nazwa: req.session.zalogowany.username, log: "logout" });
            }
        })

        

        // if (!req.session.zalogowany?.username) {
        //     res.render('index2', { title: 'Meme market', message: 'Witaj na giełdzie memów', memes: memy, count:Object.keys(req.session.views).length, nazwa: "nieznajomy", log: "login" });
        // } else {
        //     res.render('index2', { title: 'Meme market', message: 'Witaj na giełdzie memów', memes: memy, count:Object.keys(req.session.views).length, nazwa: req.session.zalogowany.username, log: "logout" });
        // }

    } catch {
      res.render('error', {message: '404 Not Found', csrfToken: req.csrfToken(), count:Object.keys(req.session.views).length});
    }
  })

app.post('/logout', csrfProtection, (req, res) => {
    req.session.zalogowany = { username: req.body.username };
    res.render('zaloguj', {error: 'Wylogowano pomyślnie', csrfToken: req.csrfToken()});
});

app.get('/*', csrfProtection, (req, res) => {
    res.render('error', {message: '404 Not Found', csrfToken: req.csrfToken(), count:Object.keys(req.session.views).length})
});

module.exports = app;


