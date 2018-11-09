import {browser, by, element} from 'protractor';
import {$, protractor} from 'protractor/';
import {Step} from '../step';

export class HeroDetails {
	header = element(by.css('my-hero-detail h2'));
	input = element(by.css('my-hero-detail input'));
	saveButton = element(by.partialButtonText('Save'));
	backButton = element(by.partialButtonText('Back'));

	@Step('Get name of hero')
	async getName(): Promise<string> {
		return (this.header).getText().then(name => name.replace(' details!', ''));
	}

	@Step('Check if hero details element is visible')
	async isVisible(): Promise<boolean> {
		return browser.isElementPresent($('my-hero-detail'));
	}

	@Step('Clear input field')
	async clearInputField(): Promise<void> {
		return this.input.clear();
	}

	@Step(`Input %s into "name" field`)
	async inputString(name: string): Promise<void> {
		return this.input.sendKeys(name);
	}

	@Step(`Clear input field with backspace`)
	async clearWithBackspace(length: number): Promise<void> {
		for (let i = 0; i < length; i++) {
			await this.input.sendKeys(protractor.Key.BACK_SPACE);
		}
	}

	@Step('Click "Save" button')
	async submit(): Promise<void> {
		return this.saveButton.click();
	}

	@Step('Click "Back" button')
	async goBack(): Promise<void> {
		return this.backButton.click();
	}
}
