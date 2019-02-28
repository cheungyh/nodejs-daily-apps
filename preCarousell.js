const pppp = require('puppeteer');


async function getInitialPage(actions,url, maxPageSelector) {
    const browser = await pppp.launch({
        headless : false
    })
    const page1 = await browser.newPage()
   
    page1.on('console', msg => {
        for (let i = 0; i < msg.args().length; ++i)
          console.log(`${i}: ${msg.args()[i]}`);
      });

    await page1.goto('https://hk.carousell.com/')

    // await setUpSelectorAndParams(
    //     actions,page1
    // )
    
    await page1.type('input','monitor')

    await page1.click('.styles__inputButtonIcon___1Mnfc')

    await page1.waitForNavigation();


    titles = await page1.$$eval('.x-m', (a)=>{
            a.forEach(
                b =>{
                    console.log(b.innerHTML)
                }
            )
        }
    )


    price  = await page1.$$eval('.x-k', (a)=>{
        a.forEach(
                b =>{
                    console.log(b.querySelector('div:first-child').innerHTML)
                } 
            )   
        }
    )



    
    
    // let loopingInfo: LoopingInfo = {
    //     url : page1.url(),
    //     maxPage : undefined
    // }

    // if(maxPageSelector){
    //     loopingInfo.maxPage = await page1.evaluate((a)=>{
        
    //         let target : HTMLElement = document.querySelector(a)
    
    //         return target.innerText
    
            
    //     },maxPageSelector)
    // }


    // await page1.close()
    // await browser.close()

    // return new Promise((a,b) => {
    //     a(loopingInfo)
    // })

}

getInitialPage()