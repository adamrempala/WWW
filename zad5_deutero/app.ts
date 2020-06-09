// To jest bardzo marny program z wieloma błędami!
// Zdecydowanie nie należy uważać go za dobry przykład.

import express from 'express';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import * as sqlite from 'sqlite3';

const mostExpensive = [
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
    #prices: [number, string][];
    #url: string;

    constructor(id: number, name: string, initialPrice: number, url: string) {
        this.#id = id;
        this.#name = name;
        this.#prices = [[initialPrice, "Initial"]];
        this.#url = url;
    }

    get id(): number {
        return this.#id;
    }

    get name(): string {
        return this.#name;
    }

    get prices(): [number, string][] {
        return this.#prices.slice();
    }

    get url(): string {
        return this.#url;
    }

    addPrice(price: number, nick: string): void {
        this.#prices.push([price, nick]);
    }

    get currentPrice(): number {
        return this.#prices.slice(-1)[0][0];
    }

    flatPrices(): string {
        return this.prices.map((val) => `${val[0]},${val[1]}`).join(';');
    }

    save(db: sqlite.Database): Promise<void> {
        return new Promise((resolve, reject) => {
            db.exec(
                `INSERT OR REPLACE INTO memes (id, name, url, prices) VALUES (${this.id}, '${this.name}', '${this.url}', '${this.flatPrices()}');`,
                (err) => {
                    if(err) {
                        reject(`DB Error`);
                        return;
                    }
                    resolve();
                });
            });
    }
}

class MemesStore {
    db: sqlite.Database;

    constructor(db: sqlite.Database) {
        this.db = db;
    }

    addMeme(meme: Meme): Promise<void> {
        return meme.save(this.db);
    }

    allMemes(): Promise<Array<Meme>> {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT id, name, url, prices FROM memes;`, (err, rows) => {
                if(err) {
                    reject('DB Error');
                    return;
                }
                let memes = [];
                for (const row of rows) {
                    let parsedPrices: [number, string][] = [];
                    for(const priceAuthor of row.prices.split(';')) {
                        const [price, by] = priceAuthor.split(',');
                        parsedPrices.push([price, by]);
                    }
                    parsedPrices.reverse();
                    let meme = new Meme(row.id, row.name, parsedPrices.pop()[0], row.url);
                    while(parsedPrices.length) {
                        meme.addPrice(...parsedPrices.pop());
                    }
                    memes.push(meme);
                }
                resolve(memes);
            });
        });
    }
    
    get mostExpensiveMemes(): Promise<Array<Meme>> {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT id, name, url, prices FROM memes ORDER BY prices DESC LIMIT 3;`, (err, rows) => {
                if(err) {
                    reject('DB Error');
                    return;
                }
                let memes = [];
                for (const row of rows) {
                    let parsedPrices: [number, string][] = [];
                    for(const priceAuthor of row.prices.split(';')) {
                        parsedPrices.push(priceAuthor.split(','));
                    }
                    parsedPrices.reverse();
                    let meme = new Meme(row.id, row.name, parsedPrices.pop()[0], row.url);
                    while(parsedPrices.length) {
                        meme.addPrice(...parsedPrices.pop());
                    }
                    memes.push(meme);
                }
                resolve(memes);
            });
        });
    }
}

sqlite.verbose();

async function createMemeTablesIfNeeded(db: sqlite.Database): Promise<void> {
    return new Promise((resolve, reject) => {
        db.all(`SELECT COUNT(*) AS cnt FROM sqlite_master WHERE type='table' and name='memes';`, (err, rows) => {
            if (err) {
                reject('DB Error');
                return;
            }

            if (rows[0].cnt === 1) {
                console.log('Database tables already exist.');
                resolve();
                return;
            }

            console.log('Creating database tables...');
            db.run(`CREATE TABLE memes (
              id INTEGER PRIMARY KEY,
              name TEXT,
              url TEXT,
              prices TEXT);`, [], (err: any) => {
                if (err) {
                    reject('DB Error');
                    return;
                }
                console.log('Done.');
                resolve();
            });
        });
    })
}

const db = new sqlite.Database('memes.db');
createMemeTablesIfNeeded(db).then(async () => {
    console.log('Filling memes table');
    let memesStore = new MemesStore(db);
    for (const m of mostExpensive) {
        await memesStore.addMeme(new Meme(m.id, m.name, m.price, m.url));
    }
    
    let get_meme = (meme_id: number): Promise<Meme | undefined> => memesStore.allMemes().then((memes) => { return memes.filter(meme => meme.id === meme_id)[0]; });
    
    await get_meme(21).then((meme) => { meme.addPrice(190, 'JK'); return meme.save(db); });
    console.log('DB fill done');
    


    const app = express();

    const csrfProtection = csurf({ cookie: true });

    app.use(express.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    app.set('view engine', 'pug');
    app.get('/', async function (req, res) {
        res.render('index', { title: 'Meme market', message: 'Hello there!', memes: await memesStore.mostExpensiveMemes });
    });
    app.get('/meme/:memeId(\\d+)', csrfProtection, async function (req, res, next) {
        console.log('meme get');
        let meme = await get_meme(parseInt(req.params.memeId, 10));
        if (!meme) next();
        res.render('meme', { meme: meme, csrfToken: req.csrfToken() });
    });
    app.post('/meme/:memeId(\\d+)', csrfProtection, async function (req, res) {
        console.log('meme post');
        let price = parseInt(req.body.price, 10);
        let nick = req.body.nick;
        let meme = await get_meme(parseInt(req.params.memeId, 10));
        meme.addPrice(price, nick);
        await meme.save(db);
        res.render('meme', { meme: meme, csrfToken: req.csrfToken() });
    });

    app.listen(1500, () => {
        console.log('App is running at http://localhost:1500/');
        console.log('But it contains numerous errors which may not be apparent at the first sight.');
        console.log('Press Ctrl+C to stop.');
    });
});
