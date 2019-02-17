const { Cluster } = require('puppeteer-cluster');
import * as puppeteer from 'puppeteer'
var fs = require('fs')
var initializer = require('./initializer')


var maxPage;
var errorInInitalPage = 'aaaa';
var log = console.log
var writable = fs.createWriteStream(__dirname+'/EPC_result.txt')
// const todayDate = new Date()

interface IWriteData {
    link: string
    price: string 
    title: string
    date: String

  }

var fullSearchList : IWriteData[]= []


  
 function setTaskAndRun() {
    

    return new Promise(async resolve =>{

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

        // var loopingInfo = await initializer.getInitialPage(
        //     [
        //     ['type','#search_news > form > input[type="text"]:nth-child(3)','iphone'],
        //     //['click','#ctl00_sel_tier_1',''],
        //     ['select','#search_news > form > select:nth-child(6)','3'],
        //     ['click','#search_news > form > input.grey','submit'],
        //     ['wait','','']
        //     ],
        //     'https://www.dcfever.com/trading/search.php'
        //     ,'.pagination > a:nth-last-child(2)'
        // ).then(x => x)

        var loopingInfo = await initializer.getInitialPage(
            [
            ],
            // 'https://www.dcfever.com/trading/listing.php?category=20'//電腦組合
            'https://www.dcfever.com/trading/listing.php?category=23'
            ,'.pagination > a:nth-last-child(2)'
        ).then(x => x)


        //  maxPage = loopingInfo.maxPage

         maxPage= '15'

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


            

        
            let list = await page.evaluate(() => {

                let itemListNode = document.getElementsByClassName("trade_listing")[0]

                let itemList = itemListNode.getElementsByTagName("tr")

                let  writeDataList : IWriteData[]= []

                for (let item of Array.from(itemList)) {


                    let writeData: IWriteData = {
                        link: '',
                        date: '',
                        title: '',
                        price: '12398765',

                    }
            
                    // let img = item.querySelector('img')
                    // writeData.picture = img.src
            
                    let link : HTMLAnchorElement = item.querySelector('td:nth-child(1) > a')
                    if (link){
                        writeData.link = link.href
                    }
                    
            //tbody > tr > td:nth-of-type(4)
                    let price : HTMLElement = item.querySelector('td:nth-child(4)')

                    if (price){
                        writeData.price = price.innerText
                    }

                    //.tlist_title
                    //'td:nth-child(3)'
                    let title: HTMLAnchorElement = item.querySelector('.tlist_title')

                    if (title){
                        writeData.title = title.innerText
                    }

                    let date: HTMLAnchorElement = item.querySelector('td:nth-child(7)')

                    if (date){
                        writeData.date = date.innerText
                    }

                    writeDataList.push(writeData)
                }
                return writeDataList

            }
            )

            
            fullSearchList.push(...list)
            // writable.write(JSON.stringify(list))
            // console.log('page num : ' + data.num)
            // console.log(list)


        });

        // console.log('before queue')

        for(let i = 1; i <= maxPage ; i++){

            await cluster.queue({
                url : `${loopingInfo.url}&page=${i}`
                ,actions : ''
                ,num : i
            }
            )
        }

        // console.log('before idle')

        await cluster.idle();
        await cluster.close();
        // console.log('down')
        resolve();
    })
}            


setTaskAndRun().then(a =>{

    var filteredList = fullSearchList.filter(
        (x)=>{
            // if (!x.link && !x.title)
            // {return false}
            // else if (x.title.match(/(等待確認|激活|維修|key|OEM)/gi))
            // {return false}
            // else if (x.title.match(/(DVD|光碟|CD|繁體|風扇|喇叭|中文版|線|讀.+器|火牛)/gi) && Number(x.price.replace('HK$','').replace(',',''))  <=  50 )
            // {return false}
            // else if (Number(x.price.replace('HK$','').replace(',',''))  <=  300)
            // {return true}
            // else if (Number(x.price.replace('HK$','').replace(',',''))  <=  400 && (x.title.match(/(i3|i5|4g|8g)/gi) !=null))
            // {return true}
            // else
            // {return false}

            if (!x.link && !x.title)
            {return false}
            else if (Number(x.price.replace('HK$','').replace(',',''))  <=  250)
            {return true}
            else
            {return false}
        }
    )

    // log(filteredList)
     writable.write(JSON.stringify(filteredList))

}
)







