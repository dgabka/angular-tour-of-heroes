import { element, by } from 'protractor';

export class DashboardPage {
	header = element(by.tagName('h3'));
	topHeroes = element.all(by.css('.col-1-4'));
	searchComponent = element(by.id('search-component'));
	searchInput = element(by.id('search-box'));
	searchResult = element.all(by.css('.search-result'));

	async findHero(name: string) {
		await this.searchInput.sendKeys(name);
	}

	async getHeader(): Promise<string> {
		return await this.header.getText();
	}

	search(pattern: string) {
		this.searchInput.sendKeys(pattern);
	}

}
