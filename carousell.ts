import pppp = require('puppeteer');

var fs = require('fs')

var writable = fs.createWriteStream(__dirname+'/carousell_result.txt')

var dataSet = []

async function asyncForEach(array, callback) {
    var set =[]
    for (let index = 0; index < array.length; index++) {
       set.push(callback(array[index], index, array))
    }
    return Promise.all(set)
}

async function filterCallback(){


}



async function collectFields(element, index, array){
        //await new Promise(async (resolve,reject)=>{  都得
  return new Promise(async (resolve,reject)=>{


      var a = await element.$('a:first-child')
      // href = await a.href
      // console.log(href)
      var b = await a.$('div:first-child')
      // b.title = await b.$('div:first-child')
      var title = await b.$eval('div:first-child', info => info.innerText)
      // g = await e.getProperty('innerText')
      // console.log(g._remoteObject.value)

      var c = await a.$('div:nth-child(2)')
      var price = await c.$eval('div:first-child',info => info.innerText)

      var d = await a.$('div:nth-child(2)')
      var description = await d.$eval('div:nth-child(2)',info => info.innerText)

      // console.log('inside Promise after collect')
      Promise.all([title,price,description]).then(()=>{
          dataSet.push(title)
          dataSet.push(price)
          dataSet.push(description)
          resolve(dataSet)
      })
      // console.log('inside Promise last line')

  })
  // console.log('pushing to list')

//   collectionPromises.push(itemPromise)
//   console.log('pushed to list')

}

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
  
      await page1.click('.input-group-btn')

      await page1.evaluate(()=>{

            document.addEventListener('mousewheel', ()=>{
                //Some mousewheel listener
            });

            var cEvent = new WheelEvent('onwheel')

            cEvent.detail = 0;
            cEvent.wheelDeltaY = someWheelDeltaY;
            cEvent.deltaX = someWeelDeltaX;

            if (cEvent.wheelDeltaY) {
            cEvent.wheelDelta = somewheelDeltaY;
            } else if (cEvent.wheelDeltaX) {
            cEvent.wheelDelta = someWheelDeltaX;
            }

            document.dispatchEvent(cEvent);

      }
      )
  
      await page1.waitForNavigation();


    // var i = 0
    // do{
    //   dataSet.push(`page${i+1}`)
    //   var nextPage = null; 
    //   var figures = await page1.$$('figcaption')

    //   asyncForEach(figures, collectFields).then(x=>{
    //     writable.write(JSON.stringify(dataSet))
    //     // console.log(dataSet)
    //   })
    //   dataSet = null;
    //   nextPage = await page1.$('.pagination-next pagination-btn')
    //   nextPage.click()
    //   await page1.waitForNavigation();
      
    // }
    // while(nextPage  && i < 2)
    var figures = await page1.$$('figcaption')
    asyncForEach(figures, collectFields).then(x=>{
      writable.write(JSON.stringify(dataSet))
      // console.log(dataSet)
      console.log('done')
    })

      


}

getInitialPage('','','')