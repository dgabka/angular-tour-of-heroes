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

	clearInputField(): void {
		allure.step('Clear input field', () => this.input.clear());
	}

	inputAndSubmit(name: string): void {
		allure.step(`Input "${name}" into "name" field`, () =>
			this.input.sendKeys(name));
		allure.step('Click "Save" button', () => this.saveButton.click());
	}

	goBack(): void {
		allure.step('Click "Back" button', () =>
			this.backButton.click());
	}
}
