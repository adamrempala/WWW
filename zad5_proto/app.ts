import express from 'express';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
// import {Request} from 'express';

const most_expensive = [
    {
        'id': 10,
        'name': 'Gold',
        'price': 1000,
        'url': 'https://i.redd.it/h7rplf9jt8y21.png'
    },
    {
        'id': 9,
        'name': 'Platinum',
        'price': 1100,
        'url': 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg'
    },
    {
        'id': 8,
        'name': 'Elite',
        'price': 1200,
        'url': 'https://i.imgflip.com/30zz5g.jpg'
    },
    {
        'id': 21,
        'name': 'Ultra rare',
        'price': 15002900,
        'url': 'https://memy.pl/show/big/uploads/Post/322479/15894752721127.jpg'
    }
];

class Meme {
    #id: number;
    #name: string;
    #prices: number[];
    #url: string;

    constructor(id: number, name: string, initialPrice: number, url: string) {
        this.#id = id;
        this.#name = name;
        this.#prices = [initialPrice];
        this.#url = url;
    }

    get id(): number {
        return this.#id;
    }

    get name(): string {
        return this.#name;
    }

    get prices(): number[] {
        return this.#prices.slice();
    }

    get url(): string {
        return this.#url;
    }

    addPrice(price: number): void {
        this.#prices.push(price);
    }

    get currentPrice(): number {
        return this.#prices.slice(-1)[0];
    }
}

class MemesStore {
    memes: Array<Meme>;

    constructor() {
        this.memes = new Array<Meme>();
    }

    addMeme(meme: Meme): void {
        this.memes.push(meme);
    }

    get allMemes(): Array<Meme> {
        // return array copy, not very efficient
        return this.memes.slice();
    }

    get mostExpensiveMemes(): Array<Meme> {
        // neither is this, sorting every time, oh well
        return this.memes.sort((a: Meme, b: Meme) => b.currentPrice - a.currentPrice).slice(0, 3);
    }
}

let memesStore = new MemesStore();

for (const m of most_expensive) {
    memesStore.addMeme(new Meme(m.id, m.name, m.price, m.url));
}

let get_meme = (meme_id: number): Meme | undefined => memesStore.allMemes.filter(meme => meme.id === meme_id)[0];

get_meme(21).addPrice(190);

const app = express();

const csrfProtection = csurf({cookie: true});

app.use(express.json());

app.use(cookieParser());
app.use(express.static('static'));

app.set('view engine', 'pug');
app.get('/', function (req, res) {
    res.render('index', { title: 'Meme market', message: 'Hello there!', memes: memesStore });
});

app.get('/meme/:memeId(\\d+)', csrfProtection, function (req, res, next) {
    console.log('meme get');
    let meme = get_meme(parseInt(req.params.memeId, 10));
    if (!meme) next();
    res.setHeader('CSRF-Header', req.csrfToken());
    res.json({id: meme.id, name: meme.name, url: meme.url, prices: meme.prices});
});

app.post('/meme/:memeId(\\d+)', csrfProtection, function (req, res) {
    console.log('meme post with body', req.body);
    let meme = get_meme(parseInt(req.params.memeId, 10));
    let price = parseInt(req.body.price, 10);
    meme.addPrice(price);
    res.end();
});

app.use((req, res) => {
    res.status(404);
    res.render('404')
});

const server = app.listen(1500, () => {
    console.log(`App is running at http://localhost:1500/ in ${app.get('env')} mode`);
    console.log('Press Ctrl+C to stop.');
});

// export default app;
