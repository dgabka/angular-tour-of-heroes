import { element, by, browser } from 'protractor';
import { allure } from '../allure-reporter';
import { clickWhenClickable, getWhenVisible } from '../helpers';

export class DashboardPage {
	header = element(by.css('my-dashboard > h3'));
	topHeroes = element.all(by.css('.col-1-4'));
	searchComponent = element(by.css('#search-component'));
	searchInput = element(by.css('#search-box'));
	searchResult = element.all(by.css('.search-result'));

	navigateTo(): Promise<void> {
		return allure.step('Go to dashboard', () =>
			browser.get('/dashboard'));
	}

	async getHeader(): Promise<string> {
		return (await getWhenVisible(this.header)).getText();
	}

	search(pattern: string): Promise<void> {
		return allure.step(`Input "${pattern}" into search input`, () =>
			this.searchInput.sendKeys(pattern));
	}

	getHeroName(index: number): Promise<string> {
		return allure.step(`Get name of hero #${index + 1}`, async () =>
			(await getWhenVisible(this.topHeroes.get(index))).getText());
	}

	clickOnHero(index: number): Promise<void> {
		return allure.step(`Click on hero #${index + 1}`, async () => {
			await clickWhenClickable(this.topHeroes.get(index));
		});
	}

	clickOnFirstSearchResult(): Promise<void> {
		return allure.step('Click on first search result', () => {
			this.searchResult.first().click();
		});
	}
}
