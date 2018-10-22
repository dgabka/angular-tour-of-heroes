import { element, by, WebElement } from 'protractor';

export class DashboardPage {
	header = element(by.tagName('h3'));
	topHeroes = element.all(by.class('grid grid-pad'));
	searchInput = element(by.id('search-box'));
	searchResult = element.all(by.id('search-result'));

	async findHero(name: string) {
		await this.searchInput.sendKeys(name);
	}
}
