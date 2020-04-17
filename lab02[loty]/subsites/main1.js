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
var identyfikatorowe = document.querySelectorAll("p[data-identyfikator-pasazera]");
var dl = identyfikatorowe.length;
var max = "";
for (var i = 0; i < dl; i++) {
    if (identyfikatorowe[i].getAttribute("data-identyfikator-pasazera") > max)
        max = identyfikatorowe[i].getAttribute("data-identyfikator-pasazera");
}
for (var i = 0; i < dl; i++) {
    if (identyfikatorowe[i].getAttribute("data-identyfikator-pasazera") == max)
        console.log(identyfikatorowe[i].textContent);
}
function teczoweKolory(el) {
    setTimeout(function () {
        console.log('red');
        el.style.backgroundColor = 'red';
        setTimeout(function () {
            el.style.backgroundColor = 'orange';
            setTimeout(function () {
                el.style.backgroundColor = 'yellow';
                setTimeout(function () {
                    el.style.backgroundColor = 'green';
                    setTimeout(function () {
                        el.style.backgroundColor = 'blue';
                        setTimeout(function () {
                            el.style.backgroundColor = 'indigo';
                            setTimeout(function () {
                                el.style.backgroundColor = 'purple';
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}
function wait(ms) {
    return new Promise(function (resolve, reject) {
        window.setTimeout(resolve, ms);
    });
}
function teczoweKolory2(el) {
    console.log('v2');
    wait(1000).then(function () {
        el.style.backgroundColor = 'red';
        return wait(1000);
    }).then(function () {
        el.style.backgroundColor = 'orange';
        return wait(1000);
    }).then(function () {
        el.style.backgroundColor = 'yellow';
        return wait(1000);
    }).then(function () {
        el.style.backgroundColor = 'green';
        return wait(1000);
    }).then(function () {
        el.style.backgroundColor = 'blue';
        return wait(1000);
    }).then(function () {
        el.style.backgroundColor = 'indigo';
        return wait(1000);
    }).then(function () {
        el.style.backgroundColor = 'purple';
        return wait(1000);
    });
}
function teczoweKolory3(el) {
    console.log('v3');
    var pr = wait(1000);
    var _loop_1 = function (color) {
        pr = pr.then(function () {
            el.style.backgroundColor = color;
            return wait(1000);
        });
    };
    for (var _i = 0, _a = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple']; _i < _a.length; _i++) {
        var color = _a[_i];
        _loop_1(color);
    }
}
function teczoweKolory5(el) {
    return __awaiter(this, void 0, void 0, function () {
        var colors, _i, colors_1, color;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple'];
                    _i = 0, colors_1 = colors;
                    _a.label = 1;
                case 1:
                    if (!(_i < colors_1.length)) return [3 /*break*/, 4];
                    color = colors_1[_i];
                    return [4 /*yield*/, wait(1000)];
                case 2:
                    _a.sent();
                    console.log(color);
                    el.style.backgroundColor = color;
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
teczoweKolory5(document.querySelector("body"));
