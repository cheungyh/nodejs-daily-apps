const puppeteer = require('puppeteer');



(async()=>{
    var log = console.log
    const browser = await puppeteer.launch({
        headless : true
        })
    const page = await browser.newPage()
    await page.goto('https://www.dcfever.com/trading/search.php?keyword=iphone&token=ppqqqpqqqqpqqpqpqqqqppppppqqqpqw&cat=3&type=all')

    // page.on('console', msg => {
    //     for (let i = 0; i < msg.args().length; ++i)
    //       console.log(`${i}: ${msg.args()[i]}`);
    //   });
    //   page.evaluate(() => console.log('hello', 5, {foo: 'bar'}));

      const handle = await page.$('#main_wide_column2 > table > tbody > tr:nth-child(11)  ')

      const result = await page.evaluate( x =>{
          let a = x.innerHTML
          return a
      },handle)
      var jsonH = result
      console.log(jsonH);

      //var b = await handle.getProperty('href')
    //   const b = await handle.getProperties()
    //   var e = await handle.getProperty('href')
    //   var c = b.get('href')
    //   var d = b.get('text')
    //   var f = await handle.jsonValue()
    //   log('B:    '+b)
    //   log('e:    '+e)
    //   log('c:    '+c)
    //   log('d:    '+d)
    //   log('f:    '+f)

    // const listHandle = await page.evaluateHandle(() => document.body.children);
    // const properties = await listHandle.getProperties();
    // const children = [];
    // for (const property of properties.values()) {
    //   const element = property.asElement();
    //   if (element)
    //     children.push(element);
    // }

    // for (const property of properties.keys()) {
    //     const element = property
    //     if (element)
    //       children.push(element);
    //   }
    // log(children)
    // await browser.close();

}
)()