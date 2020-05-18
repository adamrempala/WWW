export class Meme {
    #id:number;
    #name:string;
    #prices:number[];
    #url:string;

    constructor(id:number, name: string, initialPrice: number, url: string) {
      this.#id = id;
      this.#name = name;
      this.#prices = [initialPrice];
      this.#url = url;
    }

    getId() {
      return this.#id;
    }

    getName() {
      return this.#name;
    }

    getPrice() {
      return this.#prices[this.#prices.length - 1] ;
    }

    getHistory() {
      const hist = this.#prices.slice();
      hist.reverse()
      return hist
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
      this.#prices.push(Number(price))
    }
  }