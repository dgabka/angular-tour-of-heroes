import { element, by } from 'protractor';

export class HeroDetails {
	header = element(by.tagName('h2'));
	name = element(by.binding('name'));
	id = element(by.binding('id'));
	input = element(by.css('input'));
	saveButton = element(by.partialButtonText('Save'));
	backButton = element(by.partialButtonText('Back'));

	getName() {
		return this.header.getText().then(name => name = name.split(' ')[0]);
	}
}
