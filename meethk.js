const puppeteer = require('puppeteer')
const screenshot = 'youtube_fm_dreams_video.png'

var dest = '台北'
const tax = '連稅'
const moneySym = '\$'
const paraHead = '(<p>.*)'
const paraTail = '(.*</p>)'
const paraMid = '(.*)'
var price = 1234
var regex1 =  paraHead + dest + paraMid + '(?=' + tax + moneySym + ')'+ paraTail
var regex2 = paraHead + '(?<=' + tax + moneySym + ')' + paraMid + dest + paraTail

try {

   (async () => {

   const browser = await puppeteer.launch()
   const page = await browser.newPage()
   await page.goto('http://www.meethk.com/')
    var posts =  await page.$$eval('div.post-content.clear-block', posts => posts.map(a => a.innerHTML))
    

    for(i = 0; i < posts.length ;i++){
        let myRe = new RegExp(regex1)
        let myArray = myRe.exec(posts[i])
        console.log('post '+ i + ':')
        if(myArray != null && myArray.length != 0 ){
            console.log(myArray[0]+  myArray[1]+  myArray[2])
        }
        
    }

// var html = await page.$$eval('div.post-content.clear-block', (element) => {
//     return element.innerHTML
//   })
//   console.log(html)

    await browser.close()
   })();

   
} catch (err) {
   console.error(err)
}
