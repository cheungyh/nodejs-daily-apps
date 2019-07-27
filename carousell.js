"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var pppp = require("puppeteer");
var fs = require('fs');
var writable = fs.createWriteStream(__dirname + '/carousell_result.txt');
var dataSet = [];
function asyncForEach(array, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var set, index;
        return __generator(this, function (_a) {
            set = [];
            for (index = 0; index < array.length; index++) {
                set.push(callback(array[index], index, array));
            }
            return [2 /*return*/, Promise.all(set)];
        });
    });
}
function filterCallback() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
function collectFields(element, index, array) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            //await new Promise(async (resolve,reject)=>{  都得
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var a, b, title, c, price, d, description;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, element.$('a:first-child')
                                // href = await a.href
                                // console.log(href)
                            ];
                            case 1:
                                a = _a.sent();
                                return [4 /*yield*/, a.$('div:first-child')
                                    // b.title = await b.$('div:first-child')
                                ];
                            case 2:
                                b = _a.sent();
                                return [4 /*yield*/, b.$eval('div:first-child', function (info) { return info.innerText; })
                                    // g = await e.getProperty('innerText')
                                    // console.log(g._remoteObject.value)
                                ];
                            case 3:
                                title = _a.sent();
                                return [4 /*yield*/, a.$('div:nth-child(2)')];
                            case 4:
                                c = _a.sent();
                                return [4 /*yield*/, c.$eval('div:first-child', function (info) { return info.innerText; })];
                            case 5:
                                price = _a.sent();
                                return [4 /*yield*/, a.$('div:nth-child(2)')];
                            case 6:
                                d = _a.sent();
                                return [4 /*yield*/, d.$eval('div:nth-child(2)', function (info) { return info.innerText; })
                                    // console.log('inside Promise after collect')
                                ];
                            case 7:
                                description = _a.sent();
                                // console.log('inside Promise after collect')
                                Promise.all([title, price, description]).then(function () {
                                    dataSet.push(title);
                                    dataSet.push(price);
                                    dataSet.push(description);
                                    resolve(dataSet);
                                });
                                return [2 /*return*/];
                        }
                    });
                }); })
                // console.log('pushing to list')
                //   collectionPromises.push(itemPromise)
                //   console.log('pushed to list')
            ];
        });
    });
}
function getInitialPage(actions, url, maxPageSelector) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page1, figures;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pppp.launch({
                        headless: false
                    })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page1 = _a.sent();
                    page1.on('console', function (msg) {
                        for (var i = 0; i < msg.args().length; ++i)
                            console.log(i + ": " + msg.args()[i]);
                    });
                    return [4 /*yield*/, page1.goto('https://hk.carousell.com/')
                        // await setUpSelectorAndParams(
                        //     actions,page1
                        // )
                    ];
                case 3:
                    _a.sent();
                    // await setUpSelectorAndParams(
                    //     actions,page1
                    // )
                    return [4 /*yield*/, page1.type('input', 'monitor')];
                case 4:
                    // await setUpSelectorAndParams(
                    //     actions,page1
                    // )
                    _a.sent();
                    return [4 /*yield*/, page1.click('.input-group-btn')];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, page1.evaluate(function () {
                            document.addEventListener('mousewheel', function () {
                                //Some mousewheel listener
                            });
                            var cEvent = new WheelEvent('onwheel');
                            cEvent.detail = 0;
                            cEvent.wheelDeltaY = someWheelDeltaY;
                            cEvent.deltaX = someWeelDeltaX;
                            if (cEvent.wheelDeltaY) {
                                cEvent.wheelDelta = somewheelDeltaY;
                            }
                            else if (cEvent.wheelDeltaX) {
                                cEvent.wheelDelta = someWheelDeltaX;
                            }
                            document.dispatchEvent(cEvent);
                        })];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, page1.waitForNavigation()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, page1.$$('figcaption')];
                case 8:
                    figures = _a.sent();
                    asyncForEach(figures, collectFields).then(function (x) {
                        writable.write(JSON.stringify(dataSet));
                        // console.log(dataSet)
                        console.log('done');
                    });
                    return [2 /*return*/];
            }
        });
    });
}
getInitialPage('', '', '');
