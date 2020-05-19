import mostExpensive from './mex'
import {Meme} from './meme'

export class MemeList {
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