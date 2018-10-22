import { browser, element, by } from 'protractor';

export class DefaultPage {
	header = element(by.tagName('h1'));
	dashboardNav = element(by.linkText('Dashboard'));
	heroesNav = element(by.linkText('Heroes'));

	navigateTo() {
		return browser.get('/');
	}

	viewDashboard() {
		this.dashboardNav.click();
	}

	viewHeroes() {
		this.heroesNav.click();
	}

	getHeaderText() {
		return this.header.getText();
	}
}
