import {Meme} from './meme'
import * as sqlite3 from 'sqlite3';

export class MemeList {
    #list: Meme[];
    constructor() {

        const db = new sqlite3.Database('baza.db');
        this.#list = [];

        db.all(`SELECT * FROM memy`, [], (err, rows)=> {
            if (err || rows.length === 0) {
                db.close();
                throw err;
            }
            else {
                for(const row of rows) {
                    this.#list.push(new Meme(Number(row.id), row.name, row.prices, Number(row.current), row.url));
                }
            }
        })
    }

    get3MostExpensive() {
      return this.#list.sort((a,b) => { return b.getPrice() - a.getPrice(); }).slice(0, 3);
    }

    getMeme(id: string) {
      let el:Meme = null;
      this.#list.forEach(element => {
        if (element.getId().toString() === id) {
          el = element;
        }
      })

      if (el !== null)
        return el;
      throw new Error("404");
    }

    getList() {
        return this.#list
    }
  }

  export default MemeList