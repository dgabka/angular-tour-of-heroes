import { browser, element, by } from 'protractor';
import { allure } from '../allure-reporter';

export class DefaultPage {
	header = element(by.css('h1'));
	dashboardNav = element(by.linkText('Dashboard'));
	heroesNav = element(by.linkText('Heroes'));

	navigateTo(): Promise<void> {
		return allure.step('Get homepage', () =>
			browser.get('/'));
	}

	viewDashboard(): Promise<void> {
		return allure.step('Go to dashboard', async () =>
			await this.dashboardNav.click());
	}

	viewHeroes(): Promise<void> {
		return allure.step('Go to heroes list', async () =>
			await this.heroesNav.click());
	}

	async getHeaderText(): Promise<string> {
		return await this.header.getText();
	}
}
