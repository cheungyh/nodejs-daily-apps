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
var Cluster = require('puppeteer-cluster').Cluster;
var fs = require('fs');
var initializer = require('./initializer');
var maxPage;
var errorInInitalPage = 'aaaa';
var log = console.log;
var writable = fs.createWriteStream(__dirname + '/EPC_result.txt');
var fullSearchList = [];
function setTaskAndRun() {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var cluster, loopingInfo, i;
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
                    console.log('maxPage befroe' + maxPage);
                    return [4 /*yield*/, initializer.getInitialPage(
                        // [
                        //     ['type','#search_news > form > input[type="text"]:nth-child(3)','iphone'],
                        //     //['click','#ctl00_sel_tier_1',''],
                        //     ['select','#search_news > form > select:nth-child(6)','3'],
                        //     ['click','#search_news > form > input.grey','submit'],
                        //     ['wait','','']
                        // ],
                        [], 
                        // 'https://www.dcfever.com/trading/listing.php?category=20'//電腦組合
                        'https://www.dcfever.com/trading/listing.php?category=23', 
                        // 'https://hk.carousell.com/'
                        '').then(function (x) { return x; })
                        //  maxPage = loopingInfo.maxPage
                    ];
                case 2:
                    loopingInfo = _a.sent();
                    //  maxPage = loopingInfo.maxPage
                    maxPage = '12';
                    console.log('maxPage after' + maxPage);
                    console.log('loopingInfo url: ' + loopingInfo.url);
                    if (maxPage.indexOf('...') >= 0) {
                        maxPage = maxPage.substr(3);
                        console.log(maxPage);
                    }
                    else if (!maxPage) {
                        throw 'cannot find the max page on the search page';
                    }
                    console.log('before task');
                    // Define a task (in this case: screenshot of page)
                    return [4 /*yield*/, cluster.task(function (_a) {
                            var page = _a.page, data = _a.data;
                            return __awaiter(_this, void 0, void 0, function () {
                                var list;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: 
                                        // page.on('console', msg => console.log('PAGE LOG:', msg.text()));
                                        return [4 /*yield*/, page.goto(data.url)];
                                        case 1:
                                            // page.on('console', msg => console.log('PAGE LOG:', msg.text()));
                                            _b.sent();
                                            return [4 /*yield*/, page.evaluate(function () {
                                                    var itemListNode = document.getElementsByClassName("item_list")[0];
                                                    var itemList = itemListNode.getElementsByTagName("li");
                                                    var writeDataList = [];
                                                    for (var _i = 0, _a = Array.from(itemList); _i < _a.length; _i++) {
                                                        var item = _a[_i];
                                                        var writeData = {
                                                            link: '',
                                                            date: '',
                                                            title: '',
                                                            tradeStatus: '',
                                                            price: '12398765'
                                                        };
                                                        // let img = item.querySelector('img')
                                                        // writeData.picture = img.src
                                                        var link = item.querySelector('a');
                                                        if (link) {
                                                            writeData.link = link.href;
                                                        }
                                                        //tbody > tr > td:nth-of-type(4)
                                                        var price = item.querySelector('a > .col_3 > .price');
                                                        if (price) {
                                                            writeData.price = price.innerText;
                                                        }
                                                        //.tlist_title
                                                        //'td:nth-child(3)'
                                                        var title = item.querySelector('a > .col_2 > .trade_title');
                                                        if (title) {
                                                            writeData.title = title.innerText;
                                                        }
                                                        //td:nth-child(3) > span
                                                        var tradeStatus = item.querySelector('.item_tag.confirmed');
                                                        if (tradeStatus) {
                                                            writeData.tradeStatus = tradeStatus.innerText;
                                                        }
                                                        var date = item.querySelector('a > .col_4 > .misc');
                                                        if (date) {
                                                            writeData.date = date.innerText;
                                                        }
                                                        writeDataList.push(writeData);
                                                    }
                                                    return writeDataList;
                                                })];
                                        case 2:
                                            list = _b.sent();
                                            fullSearchList.push.apply(fullSearchList, list);
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        })];
                case 3:
                    // Define a task (in this case: screenshot of page)
                    _a.sent();
                    i = 1;
                    _a.label = 4;
                case 4:
                    if (!(i <= maxPage)) return [3 /*break*/, 7];
                    return [4 /*yield*/, cluster.queue({
                            url: loopingInfo.url + "&page=" + i,
                            actions: '',
                            num: i
                        })];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 4];
                case 7: 
                // console.log('before idle')
                return [4 /*yield*/, cluster.idle()];
                case 8:
                    // console.log('before idle')
                    _a.sent();
                    return [4 /*yield*/, cluster.close()];
                case 9:
                    _a.sent();
                    // console.log('down')
                    resolve();
                    return [2 /*return*/];
            }
        });
    }); });
}
setTaskAndRun().then(function (a) {
    var filteredList = fullSearchList.filter(function (x) {
        // if (!x.link && !x.title)
        // {return false}
        // else if (x.title.match(/(等待確認|激活|維修|key|OEM|完成)/gi))
        // {return false}
        // else if (x.title.match(/(DVD|光碟|CD|繁體|風扇|喇叭|中文版|線|讀.+器|火牛)/gi) && Number(x.price.replace('HK$','').replace(',',''))  <=  50 )
        // {return false}
        // else if (Number(x.price.replace('HK$','').replace(',',''))  <=  300)
        // {return true}
        // else if (Number(x.price.replace('HK$','').replace(',',''))  <=  400 && (x.title.match(/(i3|i5|4g|8g)/gi) !=null))
        // {return true}
        // else
        // {return false}
        if (!x.link && !x.title) {
            return false;
        }
        else if (x.tradeStatus.match(/(等待確認|交易完成)/gi)) {
            return false;
        }
        else if (Number(x.price.replace('HK$', '').replace(',', '').replace(' ', '')) <= 49) {
            return false;
        }
        else if (x.title.match(/(20|21|21|23)/gi) && Number(x.price.replace('HK$', '').replace(',', '')) <= 200) {
            return true;
        }
        else if (x.title.match(/(24|25|26)/gi) && Number(x.price.replace('HK$', '').replace(',', '')) <= 250) {
            return true;
        }
        else if (x.title.match(/(19|20)/gi) && Number(x.price.replace('HK$', '').replace(',', '')) <= 150) {
            return true;
        }
        else {
            return false;
        }
    });
    // log(filteredList)
    writable.write(JSON.stringify(filteredList));
});
