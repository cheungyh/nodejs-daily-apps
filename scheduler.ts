const { Cluster } = require('puppeteer-cluster');
import * as puppeteer from 'puppeteer'

const searchFunction = require('./hkex2')

var maxPage;
var errorInInitalPage = 'aaaa';
var log = console.log


// async function getInitalPage(url) {
//     const browser = await puppeteer.launch({
//     })
//     const page1 = await browser.newPage()
   

//     await page1.goto(url)

//     maxPage = await page1.evaluate(()=>{

//         let target : HTMLElement = document.querySelector('.pagination > a:nth-last-child(2)')

//         let x = target.innerText

//         return x
//     })

//     // await page1.close();
//     log('got the max page')
//     return Promise.resolve('success');
// }




// getInitalPage('https://www.dcfever.com/trading/search.php?keyword=iphone&token=eppqpqpwqewppeqqr&cat=3&type=sell&min_price=&max_price=&page=1')
// .then(
// (x)=>{
//     console.log(errorInInitalPage)
//     console.log(x)
// },
// (y)=>{
//     console.log(errorInInitalPage)      
//     console.log(y)
// }
// )



interface IWriteData {
    link: string
    price: string | number
    title: string
    date: Date
  }

async function hi() {
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
        console.log('page num : ' + data.num)
        console.log(list)


        // await page.goto(abc);

        // const path = abc.replace(/[^a-zA-Z]/g, '_') + '.png';
        // await page.screenshot({ path });
        // console.log(`Screenshot of ${abc} saved: ${path}`);
    });

    // Add some pages to queue
    console.log('before queue')

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

    maxPage = 34


    // console.log('maxPage :' + maxPage)
    // if (maxPage.indexOf('...') > 0 ){
    //     maxPage = maxPage.substr(2)
    //     console.log(maxPage)
    // }else if (!maxPage){
    //     throw 'cannot find the max page on the search page'
    // }

    for(let i = 1; i <= maxPage ; i++){

        await cluster.queue({
            url : `https://www.dcfever.com/trading/search.php?keyword=iphone&token=eppqpqpwqewppeqqr&cat=3&type=sell&min_price=&max_price=&page=${i}`
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


hi();