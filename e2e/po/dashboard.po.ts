import { element, by, browser } from 'protractor';
import { allure } from '../allure-reporter';

export class DashboardPage {
	header = element(by.css('my-dashboard > h3'));
	topHeroes = element.all(by.css('.col-1-4'));
	searchComponent = element(by.css('#search-component'));
	searchInput = element(by.css('#search-box'));
	searchResult = element.all(by.css('.search-result'));

	async getHeader(): Promise<string> {
		return await this.header.getText();
	}

	search(pattern: string): void {
		allure.step(`Input "${pattern}" into search input`, () =>
			this.searchInput.sendKeys(pattern));
	}

	getHeroName(index: number): Promise<string> {
		return allure.step(`Get name of hero #${index + 1}`, () =>
			this.topHeroes.get(index).getText());
	}

	clickOnHero(index: number) {
		allure.step(`Click on hero number ${index + 1}`, () => {
			this.topHeroes.get(index).click();
		});
	}

	clickOnFirstHero(): void {
		allure.step('Click on first hero', () =>
			this.topHeroes.first().click());
	}

	clickOnFirstSearchResult(): void {
		allure.step('Click on first search result', () => {
			this.searchResult.first().click();
		});
	}
}
