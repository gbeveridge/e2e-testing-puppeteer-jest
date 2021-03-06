const puppeteer = require('puppeteer');
const faker = require('faker');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

const user = {
  email: faker.internet.email(),
  password: 'test',
};

const isDebugging = () => {
  const debugging_mode = {
    headless: false,
    // slowMo: 100,
    // devtools: true,
  };
  return process.env.NODE_ENV === 'debug' ? debugging_mode : {};
}

const HOST = 'http://localhost:3000/';

let browser;
let page;
let logs = [];
let errors = [];
beforeAll(async () => {
  browser = await puppeteer.launch(isDebugging());
  page = await browser.newPage();

  await page.setRequestInterception(true);

  page.on('request', request => {
    if (request.url().includes('swapi')) {
      request.abort();
    } else {
      request.continue();
    }
  });
  page.on('console', c => logs.push(c.text()));
  page.on('pagerror', e => errors.push(e.text()));
  page.setViewport({ width: 500, height: 2400 });
  await page.goto(HOST);
});

describe('on page load', () => {
  xtest('h1 loads correctly ', async () => {
    const html = await page.$eval('.App-title', e => e.innerHTML);
    expect(html).toBe('Welcome to React');
  }, 16000);

  xtest('take screenshot', async () => {
    await page.emulate(iPhone);
    const file = 'original.png';
    await page.screenshot({ path: file });
  });

  xtest('login form workds correctly', async () => {

    await page.click('[data-testid="email"]');
    await page.type('[data-testid="email"]', user.email);

    await page.click('[data-testid="password"]');
    await page.type('[data-testid="password"]', user.password);

    await page.click('[data-testid="submit"]');
    await page.waitForSelector('[data-testid="success"]');

  }, 16000);

  xtest('phone login', async () => {
    const iPhonePage = await browser.newPage();
    await iPhonePage.emulate(iPhone);
    await iPhonePage.goto(HOST);

    const email = await iPhonePage.$('[data-testid="email"]');
    const password = await iPhonePage.$('[data-testid="password"]');
    const submit = await iPhonePage.$('[data-testid="submit"]');

    await email.tap();
    await iPhonePage.type('[data-testid="email"]', user.email);

    await password.tap();
    await iPhonePage.type('[data-testid="password"]', user.password);

    await submit.tap();

  }, 16000);

  xtest('sets email cookie', async () => {
    const cookies = await page.cookies();
    const emailCookie = cookies.find(c => c.name === 'email' && c.value === user.email);
    expect(emailCookie).not.toBeUndefined();
  });

  xtest('does not have any console logs or errors', () => {
    const newLogs = logs.filter(log => log !== '%cDownload the React DevTools for a better development experience: https://fb.me/react-devtools font-weight:bold');
    expect(newLogs.length).toBe(0);
  });

  xtest('does not have any exceptions', () => {
    expect(errors.length).toBe(0);
  });

  xtest('fails to fetch starwars api ', async () => {
    const h3 = await page.$eval('[data-testid="starwars"]', e => e.innerHTML);
    expect(h3).toBe('Oops!');
  });
});

afterAll(() => {
  if (browser)
    browser.close();
})