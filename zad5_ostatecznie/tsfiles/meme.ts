import * as sqlite3 from 'sqlite3';

export class Meme {
    #id:number;
    #name:string;
    #prices:string;
    #url:string;
    #current: number;
    #dates:Date[];

    constructor(id:number, name:string, prices:string, current:number, url:string) {

        this.#id = id;
        this.#name = name;
        this.#prices = prices;
        this.#current = current;
        this.#url = url;
    }

    getId() {
      return this.#id;
    }

    getName() {
      return this.#name;
    }

    getPrice() {
      return this.#current;
    }

    getHistory() {
        const word = this.#prices;
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

    getUrl() {
      return this.#url;
    }

    // toObject () {
    //   return {
    //     id: this.getId(),
    //     name: this.getName(),
    //     price: this.getPrice(),
    //     url: this.getUrl()
    //   }
    // }

    changePriceProm(price:string, author:string) {
            return new Promise((resolve, reject)=>{const db = new sqlite3.Database('baza.db');

            db.run('BEGIN EXCLUSIVE TRANSACTION');

            db.all(`UPDATE memy SET prices = \'${this.#prices}${price};${author};\' WHERE id = ${this.#id}`, (err) =>{
                if (err) {
                    db.run('ROLLBACK');
                    reject();
                } else {
                    db.run('COMMIT');
                    this.#prices = `${this.#prices}${price};${author};`;
                    this.#current = Number(price);
                    db.close();
                    resolve();
                }
            })});
    }
  }