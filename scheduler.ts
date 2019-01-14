const { Cluster } = require('puppeteer-cluster');
import * as puppeteer from 'puppeteer'
var fs = require('fs')
var initializer = require('./initializer')


var maxPage;
var errorInInitalPage = 'aaaa';
var log = console.log
var writable = fs.createWriteStream(__dirname+'/EPC_result.txt')


interface IWriteData {
    link: string
    price: string | number
    title: string
    date: Date

  }

  
async function setTaskAndRun() {
    // Create a cluster with 2 workers
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 2,
        puppeteerOptions : {headless : false}
    });


    console.log('before on taskerror');


    cluster.on('taskerror', (err, data) => {
        console.log(`Error crawling ${data.url}: ${err.message}`);
    });


    console.log('maxPage befroe' + maxPage)
    
    var loopingInfo = await initializer.getInitialPage(
        [
        ['type','#search_news > form > input[type="text"]:nth-child(3)','iphone'],
        //['click','#ctl00_sel_tier_1',''],
        ['select','#search_news > form > select:nth-child(6)','3'],
        ['click','#search_news > form > input.grey','submit'],
        ['wait','','']
        ],
        'https://www.dcfever.com/trading/search.php'
        ,'.pagination > a:nth-last-child(2)'
    ).then(x => x)


    maxPage = loopingInfo.maxPage

    console.log('maxPage after' + maxPage)
    console.log('loopingInfo url: ' + loopingInfo.url)

    if (maxPage.indexOf('...') >= 0 ){
        maxPage = maxPage.substr(3)
        console.log(maxPage)
    }else if (!maxPage){
        throw 'cannot find the max page on the search page'
    }

    console.log('before task')


    // Define a task (in this case: screenshot of page)
    await cluster.task(async ({ page , data  }) => {

        // page.on('console', msg => console.log('PAGE LOG:', msg.text()));

        await page.goto(data.url)
        //var doFirst = await setUpSelectorAndParams(actions,page)
    
        //const handle = page.$$eval('.news', e=>e.map((a)=>a.href));
    
        const writeDataList: IWriteData[] = []
    
      
        const list = await page.evaluate((writeDataList) => {
    
            let itemListNode = document.getElementsByClassName("trade_listing")[0]
    
            let itemList = itemListNode.getElementsByTagName("tr")
    
            for (let item of Array.from(itemList)) {
    
    
                let writeData: IWriteData = {
                    link: undefined,
                    title: undefined,
                    price: undefined,
                    date: undefined
                }
        
                // let img = item.querySelector('img')
                // writeData.picture = img.src
        
                let link : HTMLAnchorElement = item.querySelector('td:nth-child(1) > a')
                if (link){
                    writeData.link = link.href
                }
                
        
                let price : HTMLElement = item.querySelector('.tlist_price')
    
                if (price){
                    writeData.price = price.innerText
                }
    
                
                let title: HTMLAnchorElement = item.querySelector('.tlist_title')
    
                if (title){
                    writeData.title = title.innerText
                }
    
                writeDataList.push(writeData)
            }
            return writeDataList
    
        },writeDataList
        )

        

        writable.write('page num : ' + data.num + '\n\n' + JSON.stringify(list)+ '\n\n\n\n\n\n')
        // console.log('page num : ' + data.num)
        // console.log(list)


    });

    console.log('before queue')


    for(let i = 1; i <= maxPage ; i++){

        await cluster.queue({
            url : `${loopingInfo.url}&page=${i}`
            ,actions : ''
            ,num : i
        }
        )
    }
    
    console.log('before idle')
    // Shutdown after everything is done
    await cluster.idle();
    await cluster.close();
    console.log('down')
}               




setTaskAndRun()