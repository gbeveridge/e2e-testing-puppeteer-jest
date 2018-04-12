const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];
const pixelTest = require('./diffImages');

let browser;
let page;
beforeAll(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.emulate(iPhone);
});

describe('screenshots', () => {
  it('/index', async () => {
    const file = 'testShot.png';
    await page.screenshot({ path: file, fullScreen: true });
    return pixelTest.compareScreenshots(file);
  }, 16000);
});

afterAll(() => {
  browser.close();
});