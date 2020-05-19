import { MemeList } from './memelist'

export const lista = new MemeList();

import express from 'express';

const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {

    res.render('index', { title: 'Meme market', message: 'Witaj na giełdzie memów', memes: lista.get3MostExpensive() })

});

app.get('/meme/:memeId', (req, res) => {

  try {
    const meme = lista.getMeme(req.params.memeId);
    res.render('prices', { meme })
  } catch {
    res.render('error', {message: '404 Not Found'})
  }
})

app.use(express.urlencoded({

  extended: true
  }));

  app.post('/meme/:memeId', (req, res) => {

    const meme = lista.getMeme(req.params.memeId);

    const price = req.body.price;

    meme.changePrice(price);

    res.render('prices', { meme })

  })


  app.get('/*', (req, res) => {
    res.render('error', {message: '404 Not Found'})
  });
module.exports = app;
