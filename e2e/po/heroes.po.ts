import {browser, by, element} from 'protractor';
import {allure} from '../allure-reporter';
import {Step} from '../step';

export class HeroesPage {
	header = element(by.css('h2'));
	heroes = element.all(by.css('.heroes li'));
	addHeroButton = element(by.partialButtonText('Add'));
	viewDetailsButton = element(by.partialButtonText('View Details'));

	@Step('Go to heroes')
	async navigateTo(): Promise<void> {
		return browser.get('/heroes');
	}

	@Step('Get Heroes header')
	async getHeader(): Promise<string> {
		return this.header.getText();
	}

	@Step('Select hero #%d')
	async clickOnHero(index: number): Promise<void> {
		return this.heroes.get(index).click();
	}

	@Step(`Click view details`)
	async clickViewDetails(): Promise<void> {
		return this.viewDetailsButton.click();
	}

	@Step('Click "Add New Hero"')
	async clickAddHero(): Promise<void> {
		return this.addHeroButton.click();
	}

	@Step('Get name of hero #%d')
	async getHeroName(index: number): Promise<string> {
		return this.heroes.get(index).$('.hero-element')
			.getText().then(string => string.replace(/\d+ /, ''));
	}

	@Step('Get last hero name')
	async getLastHeroName(): Promise<string> {
		return this.heroes.count().then(i => this.getHeroName(i - 1));
	}

	@Step('Get number of heroes')
	async getHeroesNumber(): Promise<number> {
		return this.heroes.count();
	}

	@Step('Delete hero #%d')
	deleteHero(index: number): Promise<void> {
		return allure.step(`Delete hero #${index + 1}`, () =>
			this.heroes.get(index).$('.delete-button').click());
	}

	@Step('Get all heroes\' ids')
	async getAllIds(): Promise<string[]> {
		const x: any[] = await this.heroes.map(e => e.$('.badge').getText());
		return Promise.all(x);
	}
}
