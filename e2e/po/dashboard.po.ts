import { element, by, browser } from 'protractor';
import { allure } from '../allure-reporter';

export class DashboardPage {
	header = element(by.tagName('h3'));
	topHeroes = element.all(by.css('.col-1-4'));
	searchComponent = element(by.id('search-component'));
	searchInput = element(by.id('search-box'));
	searchResult = element.all(by.css('.search-result'));

	async getHeader(): Promise<string> {
		return await this.header.getText();
	}

	search(pattern: string): void {
		allure.step(`Input "${pattern}" into search input`, () =>
			this.searchInput.sendKeys(pattern));
	}

	getFirstHeroName(): Promise<string> {
		return allure.step('Get first hero\'s name', () =>
			this.topHeroes.first().getText());
	}

	clickOnHero(index: number) {
		allure.step(`Click on hero number ${index}`, () => {
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
