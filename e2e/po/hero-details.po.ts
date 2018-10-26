import { element, by } from 'protractor';
import { allure } from '../allure-reporter';
import { protractor } from 'protractor/built/ptor';

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

	async inputAndSubmit(name: string): Promise<void> {
		await allure.step(`Input "${name}" into "name" field`, () =>
			this.input.sendKeys(name));
		return this.submit();
	}

	async clearWithBackspace(length: number): Promise<void> {
		return allure.step(`Clear input field with backspace`, async () => {
			for (let i = 0; i < length; i++) {
				await this.input.sendKeys(protractor.Key.BACK_SPACE);
			}
			return await this.input.sendKeys('');
		});
	}

	submit(): Promise<void> {
		return allure.step('Click "Save" button', () => this.saveButton.click());
	}

	goBack(): Promise<void> {
		return allure.step('Click "Back" button', () =>
			this.backButton.click());
	}
}
