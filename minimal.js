const { Cluster } = require('puppeteer-cluster');
import * as puppeteer from 'puppeteer'

const searchFunction = require('./hkex2')

(async () => {
    // Create a cluster with 2 workers
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 2,
    });

    // Define a task (in this case: screenshot of page)
    await cluster.task(async ({ page , data  }) => {

        searchFunction.getSearchList(data.url, data.actions, page)


        // await page.goto(abc);

        // const path = abc.replace(/[^a-zA-Z]/g, '_') + '.png';
        // await page.screenshot({ path });
        // console.log(`Screenshot of ${abc} saved: ${path}`);
    });

    // Add some pages to queue
    await cluster.queue('https://www.google.com');
    await cluster.queue('https://www.wikipedia.org');
    await cluster.queue('https://github.com/');

    // Shutdown after everything is done
    await cluster.idle();
    await cluster.close();
})();