import { fibonacci } from "./program";

import { expect } from "chai";

import "mocha";


describe("fibonacci", () => {

    it("should equal 0 for call with 0", () => {

        expect(fibonacci(0)).to.equal(0);
    });

    it("should equal 1 for call with 1", () => {

        expect(fibonacci(1)).to.equal(1);
    });

    it("should equal 13 for call with 7", () => {

        expect(fibonacci(7)).to.equal(13);
    });

    it("should equal 55 for call with 10", () => {

        expect(fibonacci(10)).to.equal(55);
    });

    it("should not equal 87 for call with 11", () => {

        expect(fibonacci(11)).to.not.equal(87);
    });

});

import {Builder, Capabilities} from 'selenium-webdriver';

import { driver } from 'mocha-webdriver';


describe('testDrugi', function () {

    afterEach(async function() {
        this.timeout(20000);
    })

    it('select from should contain WAW', async function() {

        this.timeout(20000);

        await driver.get('file:///home/adam/www/WWW/lab02loty/index.html');


        expect(await driver.find('select[name=dokad]').getText()).to.include('WAW');
    })
    it('submit should be disabled if fname is clear', async function() {
        await driver.find('input[id=fname]').clear();

        expect(await driver.find('button[type=submit]').getAttribute('disabled')).to.equal('true');
    })
    it('submit should be disabled if date is past', async function() {
        await driver.find('input[id=fname]').sendKeys('Jan');
        await driver.find('input[id=sname]').sendKeys('Woreczko');
        await driver.find('input[id=date]').sendKeys('2020-04-23');

        expect(await driver.find('button[type=submit]').getAttribute('disabled')).to.equal('true');
    })
    it('now popup should be displayed and links should be covered', async function() {
        await driver.find('input[id=date]').sendKeys('2020-04-25');

        expect(await driver.find('button[type=submit]').getAttribute('disabled')).to.not.equal('true');

        await driver.find('button[type=submit]').doClick();

        expect(await driver.find('#reservation').getAttribute('display')).to.not.equal('none');

        expect(await driver.find('#reservation').getText()).to.include('From:');
        expect(await driver.find('#reservation').getText()).to.include('To:');
        expect(await driver.find('#reservation').getText()).to.include('Date:');
        expect(await driver.find('#reservation').getText()).to.include('Name:');
        
        try{
            await driver.find('#testlink').doClick();
            expect(true).to.equal(false);
        } catch (ElementClickInterceptedError) {
            //powinno złapać 
        } 
    });

})