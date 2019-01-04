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
var puppeteer = require("puppeteer");
function getSearchList(url, actions) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, writeDataList, list;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch({
                        headless: false
                    })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto(url)
                        //var doFirst = await setUpSelectorAndParams(actions,page)
                        //const handle = page.$$eval('.news', e=>e.map((a)=>a.href));
                    ];
                case 3:
                    _a.sent();
                    writeDataList = [];
                    return [4 /*yield*/, page.evaluate(function (writeDataList) {
                            var itemListNode = document.getElementsByClassName("trade_listing")[0];
                            var itemList = itemListNode.getElementsByTagName("tr");
                            for (var _i = 0, _a = Array.from(itemList); _i < _a.length; _i++) {
                                var item = _a[_i];
                                var writeData = {
                                    link: undefined,
                                    title: undefined,
                                    price: undefined,
                                    date: undefined
                                };
                                // let img = item.querySelector('img')
                                // writeData.picture = img.src
                                var link = item.querySelector('td:nth-child(1) > a');
                                if (link) {
                                    writeData.link = link.href;
                                }
                                var price = item.querySelector('.tlist_price');
                                if (price) {
                                    writeData.price = price.innerText;
                                }
                                var title = item.querySelector('.tlist_title');
                                if (title) {
                                    writeData.title = title.innerText;
                                }
                                writeDataList.push(writeData);
                            }
                            return writeDataList;
                        }, writeDataList)];
                case 4:
                    list = _a.sent();
                    console.log(list);
                    return [2 /*return*/];
            }
        });
    });
}
function callAction(action, selector, params, page) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!action) return [3 /*break*/, 16];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 14, , 15]);
                    _a = action.toLowerCase();
                    switch (_a) {
                        case 'type': return [3 /*break*/, 2];
                        case 'click': return [3 /*break*/, 4];
                        case 'select': return [3 /*break*/, 6];
                        case 'wait': return [3 /*break*/, 8];
                        case 'waitfornavigation': return [3 /*break*/, 10];
                    }
                    return [3 /*break*/, 12];
                case 2: return [4 /*yield*/, page.type(selector, params)];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 13];
                case 4: return [4 /*yield*/, page.click(selector)];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 13];
                case 6: return [4 /*yield*/, page.select(selector, params)];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 13];
                case 8: return [4 /*yield*/, page.waitForNavigation()];
                case 9:
                    _b.sent();
                    return [3 /*break*/, 13];
                case 10: return [4 /*yield*/, page.waitForNavigation()];
                case 11:
                    _b.sent();
                    return [3 /*break*/, 13];
                case 12:
                    console.log('no this type action scenario :' + action + '.');
                    throw 'no this type action scenario';
                case 13: return [3 /*break*/, 15];
                case 14:
                    err_1 = _b.sent();
                    console.error(err_1);
                    throw err_1.message;
                case 15: return [3 /*break*/, 17];
                case 16:
                    console.log('no this type action scenario :' + action + '.');
                    throw 'no this type action scenario';
                case 17: return [2 /*return*/];
            }
        });
    });
}
function setUpSelectorAndParams(actions, page) {
    return __awaiter(this, void 0, void 0, function () {
        var p, i, selector, params, j, p1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    p = [];
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < actions.length)) return [3 /*break*/, 5];
                    selector = void 0, params = void 0;
                    if (actions[i].length == 1) {
                        selector = null;
                        params = null;
                        //.......
                        // await page.waitForNavigation()
                        return [3 /*break*/, 4];
                    }
                    for (j = 1; j < 3; j++) {
                        if (actions[i][j]) {
                            if (j == 1) {
                                selector = actions[i][j];
                            }
                            else if (j == 2) {
                                params = actions[i][j];
                            }
                        }
                    }
                    console.log(actions[i][0] + "   " + selector + "   " + params);
                    if (!(params == 'submit')) return [3 /*break*/, 3];
                    return [4 /*yield*/, Promise.all(p)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    p.push(callAction(actions[i][0], selector, params, page));
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5:
                    p1 = Promise.all(p);
                    //console.log(p1)
                    return [2 /*return*/, p1];
            }
        });
    });
}
// getSearchList('http://www.hkexnews.hk/listedco/listconews/advancedsearch/search_active_main_c.aspx',
// [
// ['type','#ctl00_txt_stock_code','1883'],
// //['click','#ctl00_sel_tier_1',''],
// ['select','select#ctl00_sel_tier_1','1'],
// ['click','img[src="/image/search_c.gif"]','submit'],
// ['wait','','']
// ]
// );
// getSearchList('https://www.dcfever.com/trading/search.php',
// [
// ['type','#search_news > form > input[type="text"]:nth-child(3)','iphone'],
// //['click','#ctl00_sel_tier_1',''],
// ['select','#search_news > form > select:nth-child(6)','3'],
// ['click','#search_news > form > input.grey','submit'],
// ['wait','','']
// ]
// );
