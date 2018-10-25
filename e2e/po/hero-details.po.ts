import { element, by } from 'protractor';
import { allure } from '../allure-reporter';

export class HeroDetails {
	header = element(by.css('my-hero-detail h2'));
	input = element(by.css('my-hero-detail input'));
	saveButton = element(by.partialButtonText('Save'));
	backButton = element(by.partialButtonText('Back'));

	async getName(): Promise<string> {
		return await this.header.getText().then(name => name = name.replace(' details!', ''));
	}

	clearInputField(): Promise<void> {
		return allure.step('Clear input field', () => this.input.clear());
	}

	inputAndSubmit(name: string): Promise<void> {
		allure.step(`Input "${name}" into "name" field`, async () =>
			await this.input.sendKeys(name));
		return allure.step('Click "Save" button', () => this.saveButton.click());
	}

	goBack(): Promise<void> {
		return allure.step('Click "Back" button', () =>
			this.backButton.click());
	}
}
