import { element, by } from 'protractor';
import { allure } from '../allure-reporter';

export class HeroesPage {
	header = element(by.tagName('h2'));
	heroes = element.all(by.css('.heroes li'));
	heroesNames = element.all(by.css('.hero-element'));
	addHeroButton = element(by.partialButtonText('Add'));
	viewDetailsButton = element(by.partialButtonText('View Details'));
	ngForFeaturesButton = element(by.partialButtonText('ngFor Features'));

	clickOnHero(index: number) {
		allure.step(`Select hero #${index + 1}`, () =>
			this.heroes.get(index).click()
		);
	}

	async getHeader(): Promise<string> {
		return await this.header.getText();
	}

	clickViewDetails() {
		allure.step(`Click view details`, () =>
			this.viewDetailsButton.click()
		);
	}

	getHeroName(index: number): Promise<string> {
		return allure.step(`Get name of hero #${index + 1}`, () =>
			this.heroesNames.get(index).getText().then(string => string.replace(/\d+ /, ''))
		);
	}

	getLastHeroName(): Promise<string> {
		return allure.step('Get last hero name', () =>
			this.heroesNames.count().then(i => this.getHeroName(i - 1)));
	}

	getHeroesNumber(): Promise<number> {
		return allure.step('Get number of heroes', () =>
			this.heroes.count());
	}

	deleteHero(index: number): void {
		allure.step(`Delete hero #${index + 1}`, () =>
			this.heroes.get(index).$('.delete-button').click());
	}
}
