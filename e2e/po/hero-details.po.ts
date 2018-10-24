import { element, by } from 'protractor';
import { allure } from '../allure-reporter';

export class HeroDetails {
	header = element(by.css('my-hero-detail h2'));
	input = element(by.css('my-hero-detail input'));
	saveButton = element(by.partialButtonText('Save'));
	backButton = element(by.partialButtonText('Back'));

	getName() {
		return this.header.getText().then(name => name = name.replace(' details!', ''));
	}

	inputAndSubmit(name: string) {
		allure.step(`Input "${name}" into "name" field`, () =>
			this.input.sendKeys(name));
		allure.step('Save', () => this.saveButton.click());
	}
}
