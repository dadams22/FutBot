import { Page } from "puppeteer";
import {navigateToTab} from "./navigation";

interface PlayerAuctionData {

}

const ITEM_CLASS = '.listFUTItem'

export async function enterTransferMarket(page: Page) {
    await navigateToTab(page, 'transfer');
    const tranfserMarketCard = await page.$('.ut-tile-transfer-market');
    await tranfserMarketCard.click();
}

export async function searchTransferMarket(page: Page, params?: {}) {
    const searchButton = await page.waitForXPath('//button[text()="Search"]');
    await searchButton.click();
}

export async function scrapePlayerAuctionData(page: Page): Promise<readonly PlayerAuctionData[]> {
    await page.waitForSelector(ITEM_CLASS);
    const players = await page.$$(ITEM_CLASS);
    return players;
}