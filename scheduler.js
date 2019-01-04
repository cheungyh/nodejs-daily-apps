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
var Cluster = require('puppeteer-cluster').Cluster;
var searchFunction = require('./hkex2');
var maxPage;
var errorInInitalPage = 'aaaa';
var log = console.log;
function hi() {
    return __awaiter(this, void 0, void 0, function () {
        var cluster, i;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Cluster.launch({
                        concurrency: Cluster.CONCURRENCY_CONTEXT,
                        maxConcurrency: 2,
                        puppeteerOptions: { headless: false }
                    })];
                case 1:
                    cluster = _a.sent();
                    console.log('before on taskerror');
                    cluster.on('taskerror', function (err, data) {
                        console.log("Error crawling " + data.url + ": " + err.message);
                    });
                    console.log('before task');
                    // Define a task (in this case: screenshot of page)
                    return [4 /*yield*/, cluster.task(function (_a) {
                            var page = _a.page, data = _a.data;
                            return __awaiter(_this, void 0, void 0, function () {
                                var writeDataList, list;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: 
                                        // page.on('console', msg => console.log('PAGE LOG:', msg.text()));
                                        return [4 /*yield*/, page.goto(data.url)
                                            //var doFirst = await setUpSelectorAndParams(actions,page)
                                            //const handle = page.$$eval('.news', e=>e.map((a)=>a.href));
                                        ];
                                        case 1:
                                            // page.on('console', msg => console.log('PAGE LOG:', msg.text()));
                                            _b.sent();
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
                                        case 2:
                                            list = _b.sent();
                                            console.log('page num : ' + data.num);
                                            console.log(list);
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        })];
                case 2:
                    // Define a task (in this case: screenshot of page)
                    _a.sent();
                    // Add some pages to queue
                    console.log('before queue');
                    // await cluster.queue(async ({ page }) => {
                    //     await page.goto('https://www.dcfever.com/trading/search.php?keyword=iphone&token=eppqpqpwqewppeqqr&cat=3&type=sell')
                    //     maxPage = await page.evaluate(()=>{
                    //         let target : HTMLElement = document.querySelector('.pagination > a:nth-last-child(2)')
                    //         let x = target.innerText
                    //         return x
                    //     })
                    //     console.log(maxPage)
                    // }
                    // )
                    maxPage = 34;
                    i = 1;
                    _a.label = 3;
                case 3:
                    if (!(i <= maxPage)) return [3 /*break*/, 6];
                    return [4 /*yield*/, cluster.queue({
                            url: "https://www.dcfever.com/trading/search.php?keyword=iphone&token=eppqpqpwqewppeqqr&cat=3&type=sell&min_price=&max_price=&page=" + i,
                            actions: '',
                            num: i
                        })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6:
                    console.log('before idle');
                    // Shutdown after everything is done
                    return [4 /*yield*/, cluster.idle()];
                case 7:
                    // Shutdown after everything is done
                    _a.sent();
                    return [4 /*yield*/, cluster.close()];
                case 8:
                    _a.sent();
                    console.log('down');
                    return [2 /*return*/];
            }
        });
    });
}
hi();