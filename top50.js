const puppeteer = require('puppeteer')




async function getSearchList(url, actions){
    


    const browser = await puppeteer.launch({
        headless : false
        })
    const page = await browser.newPage()


    await page.goto(url)


    var dataSet = []

    const rows = await page.$$('#DivContentLeft > div.DivFigureBox.shadow > div.DivFigureContent > table > tbody > *')

    for (const element of rows) {
                let num = await element.$eval('td:nth-child(2)',info => info.innerText )  
                let name = await element.$eval('td:nth-child(3)',info => info.innerText )
                let unit = {num : num, name : name}

                dataSet.push(unit)  
              }
 
            

    return dataSet;
};




getSearchList('https://www.etnet.com.hk/www/tc/stocks/realtime/top50.php?subtype=up',
[
['type','#ctl00_txt_stock_code','1883'],
//['click','#ctl00_sel_tier_1',''],
['select','select#ctl00_sel_tier_1','1'],
['click','img[src="/image/search_c.gif"]','submit'],
['wait','','']
]
).then(x=>console.log(x))


