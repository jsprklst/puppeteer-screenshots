const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 1920, height: 1080, deviceScaleFactor:4, isLandscape:true})
  await page.goto('[url]');

  // Remove an element
  await page.evaluate(() => {
     let dom = document.querySelector('#id');
     dom.remove();
  });
  
  // Element screenshot
  const element = await page.$('#id');
  await element.screenshot({path: 'element.png'});
 
  // Page screenshot, with padding
  const rect = await element.boundingBox();
  const padding = 16;
        
  await page.screenshot({
      path: 'rect.png',
      clip: {
        x: rect.x - 16,
        y: rect.y + 48,
        width: rect.width + 32,
        height: rect.height - 48
      }
    });

  await browser.close();
})();