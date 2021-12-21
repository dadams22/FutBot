import { Page } from "puppeteer";
import fs from "fs";

const COOKIE_CACHE_FILE = 'cookie-cache.json';

export async function login(page: Page, email: string, password: string) {
    if (fs.existsSync(COOKIE_CACHE_FILE)) {
        const cookieData = fs.readFileSync(COOKIE_CACHE_FILE).toString();
        const cookies = JSON.parse(cookieData);
        await page.setCookie(...cookies);
        console.log('Cookies set from cache');
    }

    const loginButton = await page.waitForXPath('//button[text()="Login"]');
    await loginButton.click();

    const emailField = await page.waitForSelector('#email');
    await emailField.type(email);
    const passwordField = await page.$('#password');
    await passwordField.type(password);
    const signInButton = await page.$('#logInBtn');
    await signInButton.click();

    await page.waitForSelector('.ut-tab-bar', { timeout: 120000, });
    console.log('Login successful');

    const cookies = await page.cookies();
    fs.writeFileSync(COOKIE_CACHE_FILE, JSON.stringify(cookies));
}

export async function navigateToTab(page: Page, tab: 'transfer') {
    const tabButton = await page.$(`.icon-${tab}`);
    await tabButton.click();
    await page.waitForSelector('.ut-click-shield', { hidden: true, });
}