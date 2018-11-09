import {browser, by, element} from 'protractor';
import {clickWhenClickable, getWhenVisible} from '../helpers';
import {Step} from '../step';

export class DashboardPage {
	header = element(by.css('my-dashboard > h3'));
	topHeroes = element.all(by.css('.col-1-4'));
	searchComponent = element(by.css('#search-component'));
	searchInput = element(by.css('#search-box'));
	searchResult = element.all(by.css('.search-result'));

	@Step('Go to dashboard')
	async navigateTo(): Promise<void> {
		return browser.get('/dashboard');
	}

	@Step('Get dashboard header')
	async getHeader(): Promise<string> {
		return (await getWhenVisible(this.header)).getText();
	}

	@Step(`Input %s into search input`)
	async search(pattern: string): Promise<void> {
		return this.searchInput.sendKeys(pattern);
	}

	@Step(`Get name of hero #%d`)
	async getHeroName(index: number): Promise<string> {
		return (await getWhenVisible(this.topHeroes.get(index))).getText();
	}

	@Step('Click on hero #%d')
	async clickOnHero(index: number): Promise<void> {
		return clickWhenClickable(this.topHeroes.get(index));
	}

	@Step('Click on first search result')
	async clickOnFirstSearchResult(): Promise<void> {
		return this.searchResult.first().click();
	}

	@Step('Get search results')
	async getSearchResults(): Promise<void> {
		return getWhenVisible(this.searchResult.first());
	}
}
