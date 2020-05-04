import { expect } from "chai"

import "mocha";

function dateToString (date) {
    const year = date.getYear() + 1900;
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let addmonth;
    let addday;

    if (month < 10) {
        addmonth = '0';
    } else {
        addmonth = '';
    }

    if (day < 10) {
        addday = '0';
    } else {
        addday = '';
    }

    return `${year}-${addmonth}${month}-${addday}${day}`
}

function testInput(desc, fname, sname, date, boole) {
    return  it(desc, async () => {

        await driver.find('input[id=fname]').sendKeys(fname);
        await driver.find('input[id=sname]').sendKeys(sname);
        await driver.find('input[id=date]').sendKeys(dateToString(date));

        if (boole === true) {
            expect(await driver.find('button[type=submit]').getAttribute('disabled')).to.equal('true');
        } else {
            expect(await driver.find('button[type=submit]').getAttribute('disabled')).to.not.equal('true');

            await driver.find('button[type=submit]').doClick();

            expect(await driver.find('#reservation').getAttribute('display')).to.not.equal('none');
        };
    });
}

function testPopup(desc, fname, sname, date) {
    return it(desc, async () => {
        await driver.find('input[id=fname]').sendKeys(fname);
        await driver.find('input[id=sname]').sendKeys(sname);
        await driver.find('input[id=date]').sendKeys(dateToString(date));

        expect(await driver.find('button[type=submit]').getAttribute('disabled')).to.not.equal('true');

        await driver.find('button[type=submit]').doClick();

        expect(await driver.find('#reservation').getAttribute('display')).to.not.equal('none');
        expect(await driver.find('#reservation').getText()).to.include('From: kat');
        expect(await driver.find('#reservation').getText()).to.include('To: kat');
        expect(await driver.find('#reservation').getText()).to.include(`Date: ${dateToString(date)}`);
        expect(await driver.find('#reservation').getText()).to.include(`Name: ${sname}, ${fname}`);
        try{
            await driver.find('#testlink').doClick();
            expect(true).to.equal(false);
        } catch (ElementClickInterceptedError) {
            // should catch
        };
    });
}

const yesterday = new Date(+new Date() - 86400000);
const today = new Date(+new Date());
const tomorrow = new Date(+new Date() + 86400000);
const fdl = new Date(+new Date() + 5*86400000);
const sdl = new Date(+new Date() + 10*86400000);

import {Builder, Capabilities} from 'selenium-webdriver';

import { driver } from 'mocha-webdriver';
import { test } from "mocha";


describe('SubmitDeleterCorrectnessTest',  () => {
    beforeEach(async function() {
        this.timeout(30000);
        await driver.get('file:///home/adam/www/WWW/lab02loty/index.html');
        await driver.find('input[id=fname]').clear();
        await driver.find('input[id=sname]').clear();
    })

    testInput('submit should be disabled if fname is clear', '', 'Woreczko', tomorrow, true);
    testInput('submit should be disabled if sname is clear', 'Jan', '', tomorrow, true);
    testInput('submit should be disabled if both are clear', '', '', tomorrow, true)
    testInput('submit should be disabled if names are filled with spaces only', '    ', '      ', tomorrow, true);
    testInput('Submit should be disabled if date is yesterday', 'Jan', 'Woreczko', yesterday, true);
    testInput('Submit should not be disabled if date is today', 'Jan', 'Woreczko', today, false);
    testInput('Submit should not be disabled if date is tomorrow', 'Jan', 'Woreczko', tomorrow, false);

})

describe('PopupCorrectnessTest', () => {
    beforeEach(async function() {
        this.timeout(30000);
        await driver.get('file:///home/adam/www/WWW/lab02loty/index.html');
        await driver.find('input[id=fname]').clear();
        await driver.find('input[id=sname]').clear();
    })

    testPopup('JSTest', 'Johnny', 'Sacky', tomorrow);
    testPopup('AHTest', 'Albert', 'Habsbourg', fdl);
    testPopup('MMFTest', 'Marty', 'McFly', sdl);

})