import { browser, element, by } from 'protractor';
import { allure } from './allure-reporter';
import { DashboardPage } from './dashboard.po';
import { HeroesPage } from './heroes.po';

export class DefaultPage {
	header = element(by.tagName('h1'));
	dashboardNav = element(by.linkText('Dashboard'));
	heroesNav = element(by.linkText('Heroes'));

	async navigateTo(): Promise<void> {
		await allure.step('Get homepage', () =>
			browser.get('/'));
	}

	viewDashboard(): DashboardPage {
		allure.step('Go to dashboard', () =>
			this.dashboardNav.click());
		return new DashboardPage();
	}

	viewHeroes(): HeroesPage {
		allure.step('Go to heroes list', () =>
			this.heroesNav.click());
		return new HeroesPage();
	}

	getHeaderText() {
		return this.header.getText();
	}
}
