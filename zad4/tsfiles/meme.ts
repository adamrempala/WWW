export class Meme {
    #id:number;
    #name:string;
    #prices:number[];
    #url:string;
    #dates:Date[];

    constructor(id:number, name: string, initialPrice: number, url: string) {
      this.#id = id;
      this.#name = name;
      this.#prices = [initialPrice];
      this.#url = url;
      this.#dates = Array(1).fill(new Date().toString());
    }

    getId() {
      return this.#id;
    }

    getName() {
      return this.#name;
    }

    getPrice() {
      return this.#prices[this.#prices.length - 1];
    }

    getHistory() {
      const hist = this.#prices.slice();
      const chg = this.#dates.slice();
      const h = [];
      for (let i = hist.length - 1; i >= 0; i--) {
        h.push({
          price: hist[i],
          date: chg[i],
        })
      }
      return h
    }

    getUrl() {
      return this.#url;
    }

    toObject () {
      return {
        id: this.getId(),
        name: this.getName(),
        price: this.getPrice(),
        url: this.getUrl()
      }
    }

    changePrice(price:string) {
      this.#prices.push(Number(price));
      this.#dates.push(new Date());
    }
  }