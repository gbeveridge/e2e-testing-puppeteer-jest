const puppeteer = require('puppeteer');
const faker = require('faker');

const user = {
  email: faker.internet.email(),
  password: 'test',
};

const isDebugging = () => {
  const debugging_mode = {
    headless: false,
    slowMo: 250,
    devtools: true,
  };
  return process.env.NODE_ENV === 'debug' ? debugging_mode : {};
}

let browser;
let page;
beforeAll(async () => {
  browser = await puppeteer.launch(isDebugging());
  page = await browser.newPage();
  page.setViewport({ width: 500, height: 2400 });
  await page.goto('http://localhost:3000/');
});

describe('on page load', () => {
  test('h1 loads correctly ', async () => {
    const html = await page.$eval('.App-title', e => e.innerHTML);
    expect(html).toBe('Welcome to React');
  }, 16000);

  test('login form workds correctly', async () => {
    await page.click('[data-testid="email"]');
    await page.type('[data-testid="email"]', user.email);

    await page.click('[data-testid="password"]');
    await page.type('[data-testid="password"]', user.password);

    await page.click('[data-testid="submit"]');
    await page.waitForSelector('[data-testid="success"]');
    
  }, 16000);
});

afterAll(() => {
  if (isDebugging()) {
    browser.close();
  }
})