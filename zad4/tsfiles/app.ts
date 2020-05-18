import mostExpensive from './mex'
import {Meme} from './meme'

class MemeList {
  list: Meme[];
  constructor() {
    this.list = new Array(0);
    mostExpensive.forEach(e => {
      this.list.push(new Meme(e.id, e.name, e.price, e.url))
    })
  }

  get3MostExpensive () {
    return this.list.sort((a,b) => { return b.getPrice() - a.getPrice(); }).slice(0, 3);
  }

  getMeme(id: string) {
    let el:Meme = null;
    this.list.forEach(element => {
      if (element.getId().toString() === id) {
        el = element;
      }
    })

    if (el !== null)
      return el;
    throw new Error("404");
  }
}

const lista = new MemeList();

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
    res.write("<!doctype html><title>404</title><p>404 NOT FOUND</p>");
    res.end();
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


  app.get('/error404', (req, res) => {
    res.render('error', {message: '404 Not Found'})
  });

module.exports = app;
