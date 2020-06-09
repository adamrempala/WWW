import { MemeList } from './memelist'
import csurf from 'csurf'
import cookieParser from 'cookie-parser'
import session from 'express-session'
const niewiem = require('connect-sqlite3');

export const lista = new MemeList();

import express from 'express';

const sqliteStore = niewiem(session);
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
  req.session.views[req.path] = (req.session.views[req.path] || 0) + 1;
  next();
});

app.set('view engine', 'pug');

app.get('/', (req, res) => {

    res.render('index', { title: 'Meme market', message: 'Witaj na giełdzie memów', memes: lista.get3MostExpensive() })

});

app.get('/meme/:memeId', csrfProtection, (req, res) => {

  try {
    const meme = lista.getMeme(req.params.memeId);
    res.render('prices', { meme, csrfToken: req.csrfToken() })
  } catch {
    res.render('error', {message: '404 Not Found', csrfToken: req.csrfToken()})
  }
})

  app.post('/meme/:memeId', csrfProtection, (req, res) => {

    const meme = lista.getMeme(req.params.memeId);

    const price = req.body.price;

    meme.changePrice(price);

    res.render('prices', { meme, csrfToken: req.csrfToken() })

  })


  app.get('/*', csrfProtection, (req, res) => {
    res.render('error', {message: '404 Not Found', csrfToken: req.csrfToken()})
  });
module.exports = app;


// app.post('/zaloguj', (req, res) => {
//   // ... wyciągnij dane z formularza
//   req.session.zalogowany = { username: wartosc };
// })