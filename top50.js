const puppeteer = require('puppeteer')
const screenshot = 'youtube_fm_dreams_video.png'



async function getSearchList(url, actions){
    
    //var count = Object.keys(action).length;

    

    //[{action:'type', selector:'#ctl00_txt_stock_code', paras:'1883'}]

    const browser = await puppeteer.launch({
        headless : false
        })
    const page = await browser.newPage()


    await page.goto(url)


    //const handle = page.$$eval('.news', e=>e.map((a)=>a.href));

    var dataSet = []

    //const handle = await page.$$eval('#main_wide_column2 > table > tbody', e=> e );
    // const root = await page.$('div.DivFigureBox.shadow')
    // const next = await root.$('.DivFigureContent')
    // const rows = await next.$$('table > tbody')
    const rows = await page.$$('#DivContentLeft > div.DivFigureBox.shadow > div.DivFigureContent > table > tbody > *')

    for (const element of rows) {
                let num = await element.$eval('td:nth-child(2)',info => info.innerText )  
                let name = await element.$eval('td:nth-child(3)',info => info.innerText )
                let unit = {num : num, name : name}

                dataSet.push(unit)  
              }
 
            

    return dataSet;
};


async function callAction(action, selector, params, page){
    if(action){
        try{
            switch (action.toLowerCase()) {
                case 'type':
                    await page.type(selector, params)
                    break;
                case 'click':
                    await page.click(selector)
                    break;
                case 'select':
                    await page.select(selector, params);
                    break;
                case 'wait':
                    await page.waitForNavigation();
                    break;
                case 'waitfornavigation':
                    await page.waitForNavigation();
                    break;  
                default:
                    console.log('no this type action scenario :' + action + '.')
                    throw 'no this type action scenario'
                    break;
            }
        }catch(err){
            console.error(err)
            throw err.message
        }
    }else{
        console.log('no this type action scenario :' + action + '.')
        throw 'no this type action scenario'
    }

}


async function setUpSelectorAndParams(actions, page){
    var p = [];
    for(let i = 0;i<actions.length ;i++){
        let selector, params;

        if(actions[i].length == 1){
            selector = null
            params = null
        //.......
            // await page.waitForNavigation()
            continue;
        }

        for(let j = 1; j<3; j++){
            if(actions[i][j]){
                if(j==1){
                    selector = actions[i][j]
                }else if (j==2){
                    params = actions[i][j]
                }
            }
        }
        console.log(actions[i][0]+ "   " + selector+ "   " +params)

        if(params == 'submit'){
            await Promise.all(p)
        }
        
        p.push(callAction(actions[i][0], selector, params, page))
    }
    // return new Promise(function(resolve, reject) {
    //         setTimeout(resolve(''),100)
    // })
    var p1 = Promise.all(p)
    //console.log(p1)
    return p1
}



getSearchList('https://www.etnet.com.hk/www/tc/stocks/realtime/top50.php?subtype=up',
[
['type','#ctl00_txt_stock_code','1883'],
//['click','#ctl00_sel_tier_1',''],
['select','select#ctl00_sel_tier_1','1'],
['click','img[src="/image/search_c.gif"]','submit'],
['wait','','']
]
).then(x=>console.log(x))


