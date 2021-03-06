const puppeteer = require('puppeteer')
const screenshot = 'youtube_fm_dreams_video.png'



async function getSearchList(url, actions){
    
    //var count = Object.keys(action).length;

    

    //[{action:'type', selector:'#ctl00_txt_stock_code', paras:'1883'}]

    const browser = await puppeteer.launch({
        headless : false
        })
    const page = await browser.newPage()
    page
    await page.goto(url)
    var doFirst = await setUpSelectorAndParams(actions,page)

    //const handle = page.$$eval('.news', e=>e.map((a)=>a.href));


    //const handle = await page.$$eval('#main_wide_column2 > table > tbody', e=> e );
    const handle = await page.$$('#main_wide_column2 > table > tbody')
    var jsonH = await handle[0].getProperties()
    console.log(jsonH);
    const showPrice = handle.map(b =>
        {
            if (b.innerHTML){
                return b.innerHTML
            }else{
                return b.innerText
            }
        }
    )
    console.log(showPrice);

    //filter(a =>{
//     a.innerHTML.includes('128')
// })

//http://www.hkexnews.hk/listedco/listconews/advancedsearch/search_active_main_c.aspx

    //await browser.close()

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



getSearchList('http://www.hkexnews.hk/listedco/listconews/advancedsearch/search_active_main_c.aspx',
[
['type','#ctl00_txt_stock_code','1883'],
//['click','#ctl00_sel_tier_1',''],
['select','select#ctl00_sel_tier_1','1'],
['click','img[src="/image/search_c.gif"]','submit'],
['wait','','']
]
);


// getSearchList('https://www.dcfever.com/trading/search.php',
// [
// ['type','#search_news > form > input[type="text"]:nth-child(3)','iphone'],
// //['click','#ctl00_sel_tier_1',''],
// ['select','#search_news > form > select:nth-child(6)','3'],
// ['click','#search_news > form > input.grey','submit'],
// ['wait','','']
// ]
// );