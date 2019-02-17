import * as puppeteer from 'puppeteer'

const multer = require('multer')

async function doDownload (url){

    const browser = await puppeteer.launch({
        executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        slowMo:10,
        headless : false
    })
    const page = await browser.newPage()
    

    //https://www.coursera.org/learn/server-side-nodejs/home/week/1
    
    // await page.goto(url+'1')


    const sfdsfsd = multer({})
    await page.goto(url)
    await page.waitForNavigation();
    // var ac = await page.$$(".input_xury2d")[0]
    // var pw = await page.$$(".input_xury2d")[1]

    // await ac.type('cheungyh05@yahoo.com.hk')
    // await pw.type('cyhd65s22')
    // await page.click('#authentication-box-content > div > div.Box_120drhm-o_O-displayflex_poyjc-o_O-columnDirection_ia4371.AuthenticationModalContentV1 > div > div.Box_120drhm-o_O-displayflex_poyjc-o_O-columnDirection_ia4371.rc-LoginForm > form > div.Box_120drhm-o_O-displayflex_poyjc-o_O-columnDirection_ia4371.w-100.placeholder-contrast > button')

    var weekMotherNode = await page.$$(".rc-LessonCollectionBody")[0]
    var itemsToDownload = await weekMotherNode.$$('.rc-WeekItemName.headline-1-text')[0]

    // for (let item of itemsToDownload){
        await itemsToDownload.click();
        await page.waitForNavigation();
        let videoLink = await page.$(".rc-LectureDownloadItem.resource-list-item")
        videoLink.click()
        await page.waitForNavigation();
    // }

}


doDownload('https://www.coursera.org/learn/server-side-nodejs/home/week/1')