import puppeteer from 'puppeteer';
import { login, navigateToTab, } from "./navigation";
import {enterTransferMarket, searchTransferMarket,} from "./transfer";

const URL = 'https://www.ea.com/fifa/ultimate-team/web-app/';

async function main() {
    const [email, password] = process.argv.slice(2, process.argv.length);

    const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
    const page = await browser.newPage();
    await page.goto(URL);
    await login(page, email, password);

    await navigateToTab(page, 'transfer');
    await enterTransferMarket(page);
    await searchTransferMarket(page);

    await page.waitForTimeout(1000000);

    await browser.close();
}

main().then(() => console.log('Execution completed'));
