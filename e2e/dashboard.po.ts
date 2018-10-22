import { element, by } from 'protractor';

export class DashboardPage {
	header = element(by.tagName('h3'));
	topHeroes = element.all(by.className('grid grid-pad'));
	searchInput = element(by.id('search-box'));
	searchResult = element.all(by.id('search-result'));

	async findHero(name: string) {
		await this.searchInput.sendKeys(name);
	}

	async getHeader(): Promise<string> {
		return await this.header.getText();
	}
}
