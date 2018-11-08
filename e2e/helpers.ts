import { ElementFinder, browser, ExpectedConditions } from 'protractor';

export function isSorted(list: Array<string> | Array<number>): boolean {
	for (let i = 0; i < list.length - 1; i++) {
		if (+list[i] >= +list[i + 1]) {
			return false;
		}
	}
	return true;
}

export async function getWhenVisible(element: ElementFinder, timeout: number = 2000): Promise<ElementFinder> {
	await browser.wait(ExpectedConditions.visibilityOf(element), timeout);
	return element;
}

export async function clickWhenClickable(element: ElementFinder, timeout: number = 2000): Promise<void> {
	await browser.wait(ExpectedConditions.elementToBeClickable(element), timeout);
	element.click();
}
