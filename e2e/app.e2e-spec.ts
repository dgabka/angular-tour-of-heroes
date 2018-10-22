import { DefaultPage } from './app.po';
import { browser } from 'protractor';

describe('Tour Of Heroes App', () => {
	let page: DefaultPage;

	beforeEach(() => {
		page = new DefaultPage();
	});

	it('should display header', () => {
		page.navigateTo();
		expect(page.getHeaderText()).toEqual('Tour of Heroes');
	});

	it('should display active navigation buttons', () => {
		page.navigateTo();
		expect(page.heroesNav.isEnabled()).toBe(true);
		expect(page.dashboardNav.isEnabled()).toBe(true);
	});

	it('should display Dashboard by default', () => {
		page.navigateTo();
		expect(browser.getCurrentUrl()).toContain('dashboard');
	});
});
