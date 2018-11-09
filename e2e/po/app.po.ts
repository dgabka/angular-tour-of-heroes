import { browser, element, by } from 'protractor';
import { Step } from '../step';

export class DefaultPage {
	header = element(by.css('h1'));
	dashboardNav = element(by.linkText('Dashboard'));
	heroesNav = element(by.linkText('Heroes'));

	@Step('Get homepage')
	async navigateTo(): Promise<any> {
		return browser.get('/');
	}

	@Step('Go to dashboard')
	async viewDashboard(): Promise<void> {
		return this.dashboardNav.click();
	}

	@Step('Go to heroes list')
	async viewHeroes(): Promise<void> {
		return this.heroesNav.click();
	}

	@Step('Get page header')
	async getHeaderText(): Promise<string> {
		return this.header.getText();
	}
}
