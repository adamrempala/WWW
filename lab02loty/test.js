"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var program_1 = require("./program");
var chai_1 = require("chai");
require("mocha");
describe("fibonacci", function () {
    it("should equal 0 for call with 0", function () {
        chai_1.expect(program_1.fibonacci(0)).to.equal(0);
    });
    it("should equal 1 for call with 1", function () {
        chai_1.expect(program_1.fibonacci(1)).to.equal(1);
    });
    it("should equal 13 for call with 7", function () {
        chai_1.expect(program_1.fibonacci(7)).to.equal(13);
    });
    it("should equal 55 for call with 10", function () {
        chai_1.expect(program_1.fibonacci(10)).to.equal(55);
    });
    it("should not equal 87 for call with 11", function () {
        chai_1.expect(program_1.fibonacci(11)).to.not.equal(87);
    });
});
var mocha_webdriver_1 = require("mocha-webdriver");
describe('testDrugi', function () {
    var yesterday = new Date(+new Date() - 86400000);
    var tomorrow = new Date(+new Date() + 86400000);
    function dateToString(date) {
        var year = date.getYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var addmonth, addday;
        if (month < 10) {
            addmonth = '0';
        }
        else {
            addmonth = '';
        }
        if (day < 10) {
            addday = '0';
        }
        else {
            addday = '';
        }
        return year + "-" + addmonth + month + "-" + addday + day;
    }
    afterEach(function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.timeout(20000);
                return [2 /*return*/];
            });
        });
    });
    it('select from should contain WAW', function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.timeout(20000);
                        return [4 /*yield*/, mocha_webdriver_1.driver.get('file:///home/adam/www/WWW/lab02loty/index.html')];
                    case 1:
                        _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('select[name=dokad]').getText()];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).to.include('WAW');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('submit should be disabled if fname is clear', function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, mocha_webdriver_1.driver.find('input[id=fname]').clear()];
                    case 1:
                        _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('button[type=submit]').getAttribute('disabled')];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).to.equal('true');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('submit should be disabled if sname is clear', function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, mocha_webdriver_1.driver.find('input[id=fname]').sendKeys('Jan')];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[id=sname]').clear()];
                    case 2:
                        _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('button[type=submit]').getAttribute('disabled')];
                    case 3:
                        _a.apply(void 0, [_b.sent()]).to.equal('true');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('submit should be disabled if date is clear', function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, mocha_webdriver_1.driver.find('input[id=fname]').sendKeys('Jan')];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[id=sname]').sendKeys('Woreczko')];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[id=date]').clear()];
                    case 3:
                        _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('button[type=submit]').getAttribute('disabled')];
                    case 4:
                        _a.apply(void 0, [_b.sent()]).to.equal('true');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('submit should be disabled if date is past', function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, mocha_webdriver_1.driver.find('input[id=fname]').sendKeys('Jan')];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[id=sname]').sendKeys('Woreczko')];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[id=date]').sendKeys(dateToString(yesterday))];
                    case 3:
                        _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('button[type=submit]').getAttribute('disabled')];
                    case 4:
                        _a.apply(void 0, [_b.sent()]).to.equal('true');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('now popup should be displayed and links should be covered', function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, ElementClickInterceptedError_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, mocha_webdriver_1.driver.find('input[id=date]').sendKeys(dateToString(tomorrow))];
                    case 1:
                        _g.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('button[type=submit]').getAttribute('disabled')];
                    case 2:
                        _a.apply(void 0, [_g.sent()]).to.not.equal('true');
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('button[type=submit]').doClick()];
                    case 3:
                        _g.sent();
                        _b = chai_1.expect;
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('#reservation').getAttribute('display')];
                    case 4:
                        _b.apply(void 0, [_g.sent()]).to.not.equal('none');
                        _c = chai_1.expect;
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('#reservation').getText()];
                    case 5:
                        _c.apply(void 0, [_g.sent()]).to.include('From:');
                        _d = chai_1.expect;
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('#reservation').getText()];
                    case 6:
                        _d.apply(void 0, [_g.sent()]).to.include('To:');
                        _e = chai_1.expect;
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('#reservation').getText()];
                    case 7:
                        _e.apply(void 0, [_g.sent()]).to.include('Date:');
                        _f = chai_1.expect;
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('#reservation').getText()];
                    case 8:
                        _f.apply(void 0, [_g.sent()]).to.include('Name:');
                        _g.label = 9;
                    case 9:
                        _g.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('#testlink').doClick()];
                    case 10:
                        _g.sent();
                        chai_1.expect(true).to.equal(false);
                        return [3 /*break*/, 12];
                    case 11:
                        ElementClickInterceptedError_1 = _g.sent();
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    });
});
