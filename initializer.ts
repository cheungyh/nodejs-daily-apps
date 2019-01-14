import * as puppeteer from 'puppeteer'


interface LoopingInfo {
    url: string
    maxPage: string | number
  }

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


async function getInitialPage(actions,url, maxPageSelector) {
    const browser = await puppeteer.launch({
        headless : false
    })
    const page1 = await browser.newPage()
   

    await page1.goto(url)

    await setUpSelectorAndParams(
        actions,page1
    )
    

    
    let loopingInfo: LoopingInfo = {
        url : page1.url(),
        maxPage : undefined
    }

    if(maxPageSelector){
        loopingInfo.maxPage = await page1.evaluate((a)=>{
        
            let target : HTMLElement = document.querySelector(a)
    
            return target.innerText
    
            
        },maxPageSelector)
    }


    await page1.close()
    await browser.close()

    return new Promise((a,b) => {
        a(loopingInfo)
    })

}



exports.getInitialPage = getInitialPage