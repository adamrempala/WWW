import { MemeList } from './memelist'

import { expect } from "chai";

import mostExpensive from './mex'

import {Meme} from './meme'

import "mocha";

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

describe('startTest', () => {
    it('Start test', () => {
        const lista = new MemeList();
        const first = lista.get3MostExpensive();
        expect(first[0].getPrice()).to.equal(2100);
        expect(first[1].getPrice()).to.equal(1789);
        expect(first[2].getPrice()).to.equal(1739);
    });

    it('Change some prices', () => {
        const lista = new MemeList();

        lista.getMeme('9').changePrice('2200');
        let first = lista.get3MostExpensive();
        expect(first[0].getPrice()).to.equal(2200);
        expect(first[1].getPrice()).to.equal(1789);
        expect(first[2].getPrice()).to.equal(1739);

        lista.getMeme('9').changePrice('1729');
        first = lista.get3MostExpensive();
        expect(first[0].getPrice()).to.equal(1789);
        expect(first[1].getPrice()).to.equal(1739);
        expect(first[2].getPrice()).to.equal(1729);

        lista.getMeme('9').changePrice('1');
        first = lista.get3MostExpensive();
        expect(first[0].getPrice()).to.equal(1789);
        expect(first[1].getPrice()).to.equal(1739);
        expect(first[2].getPrice()).to.equal(1619);
    })

    it('Find out history', async () => {
        const lista = new MemeList();
        lista.getMeme('9').changePrice('2200');
        await delay(650);
        lista.getMeme('9').changePrice('1729');
        await delay(650);
        lista.getMeme('9').changePrice('1');
        const hist = lista.getMeme('9').getHistory();
        expect(hist[2].price).to.equal(2200);
        expect(hist[1].price).to.equal(1729);
        expect(hist[0].price).to.equal(1);
        expect(hist[2].date).not.above(hist[1].date);
        expect(hist[1].date).not.above(hist[0].date);
    })
})