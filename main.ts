import puppeteer, { Page } from 'puppeteer';

const URL = 'https://www.ea.com/fifa/ultimate-team/web-app/';

async function main() {
    const browser = await puppeteer.launch({ headless: false, slowMo: 150, });
    const page = await browser.newPage();
    await page.goto(URL);

    const loginButton = await page.waitForXPath('//button[text()="Login"]');
    await loginButton.click();

    const emailField = await page.waitForSelector('#email');
    await emailField.type('dadams2212@gmail.com');
    const passwordField = await page.$('#password');
    await passwordField.type('Listed18');
    const signInButton = await page.$('#logInBtn');
    await signInButton.click();

    await page.waitForSelector('.ut-tab-bar', { timeout: 120000, });
    console.log('Login successful');

    await navigateToTab(page, 'transfer');

    await page.waitForTimeout(1000000);

    await browser.close();
}

async function navigateToTab(page: Page, tab: 'transfer') {
    const tabButton = await page.$(`.icon-${tab}`);
    await tabButton.click();
}

main();
