import { element, by } from 'protractor';
import { allure } from '../allure-reporter';
import { protractor } from 'protractor/built/ptor';
import { clickWhenClickable, getWhenVisible } from '../helpers';

export class HeroDetails {
	header = element(by.css('my-hero-detail h2'));
	input = element(by.css('my-hero-detail input'));
	saveButton = element(by.partialButtonText('Save'));
	backButton = element(by.partialButtonText('Back'));

	async getName(): Promise<string> {
		return await this.header.getText().then(name => name.replace(' details!', ''));
	}

	clearInputField(): Promise<void> {
		return allure.step('Clear input field', async () => (await getWhenVisible(this.input)).clear());
	}

	async inputAndSubmit(name: string): Promise<void> {
		await allure.step(`Input "${name}" into "name" field`, () =>
			this.input.sendKeys(name));
		return this.submit();
	}

	clearWithBackspace(length: number): Promise<void> {
		return allure.step(`Clear input field with backspace`, async () => {
			await getWhenVisible(this.input);
			for (let i = 0; i < length; i++) {
				await this.input.sendKeys(protractor.Key.BACK_SPACE);
			}
		});
	}

	submit(): Promise<void> {
		return allure.step('Click "Save" button', () => this.saveButton.click());
	}

	goBack(): Promise<void> {
		return allure.step('Click "Back" button', async () =>
			await clickWhenClickable(this.backButton));
	}
}
