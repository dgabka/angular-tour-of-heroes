import { element, by } from 'protractor';
import { allure } from '../allure-reporter';

export class HeroesPage {
	header = element(by.tagName('h2'));
	heroes = element.all(by.css('.heroes li'));
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
		return allure.step(`Get name of hero #${index}`, () =>
			this.heroes.get(index).element(by.binding('name')).getText()
		);
	}
}
