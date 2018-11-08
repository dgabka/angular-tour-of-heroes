import { element, by, browser, $$ } from 'protractor';
import { allure } from '../allure-reporter';
import { getWhenVisible } from '../helpers';
import { Step } from '../step';

export class HeroesPage {
	header = element(by.css('h2'));
	heroes = element.all(by.css('.heroes li'));
	addHeroButton = element(by.partialButtonText('Add'));
	viewDetailsButton = element(by.partialButtonText('View Details'));
	ngForFeaturesButton = element(by.partialButtonText('ngFor Features'));

	navigateTo(): Promise<void> {
		return allure.step('Go to heroes', () =>
			browser.get('/heroes'));
	}

	async getHeader(): Promise<string> {
		return this.header.getText();
	}

	clickOnHero(index: number): Promise<void> {
		return allure.step(`Select hero #${index + 1}`, () =>
			this.heroes.get(index).click()
		);
	}

	clickViewDetails(): Promise<void> {
		return allure.step(`Click view details`, () =>
			this.viewDetailsButton.click()
		);
	}

	clickAddHero(): Promise<void> {
		return allure.step('Click "Add New Hero"', () =>
			this.addHeroButton.click());
	}

	getHeroName(index: number): Promise<string> {
		return allure.step(`Get name of hero #${index + 1}`, async () =>
			(await getWhenVisible(this.heroes.get(index))).$('.hero-element').getText().then(string => string.replace(/\d+ /, ''))
		);
	}

	getLastHeroName(): Promise<string> {
		return allure.step('Get last hero name', () =>
			this.heroes.count().then(i => this.getHeroName(i - 1)));
	}

	getHeroesNumber(): Promise<number> {
		return allure.step('Get number of heroes', () =>
			this.heroes.count());
	}

	deleteHero(index: number): Promise<void> {
		return allure.step(`Delete hero #${index + 1}`, () =>
			this.heroes.get(index).$('.delete-button').click());
	}

	@Step('Get all heroes\' ids')
	async getAllIds(): Promise<string[]> {
		const x = [];
		await this.heroes.each(e => x.push(e.$('.badge').getText()));
		return Promise.all(x);
	}
}
