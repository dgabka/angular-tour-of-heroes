import { DefaultPage } from './app.po';
import { browser } from 'protractor';
import { DashboardPage } from './dashboard.po';
import { HeroesPage } from './heroes.po';

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
		const dashboard: DashboardPage = new DashboardPage();
		expect(dashboard.getHeader()).toBe('Top Heroes');
	});

	it('should navigate between Dashboard and Heroes views', () => {
		let heroes: HeroesPage;
		let dashboard: DashboardPage;

		page.navigateTo();
		heroes = page.viewHeroes();
		expect(heroes.getHeader()).toBe('My Heroes');
		dashboard = page.viewDashboard();
		expect(dashboard.getHeader()).toBe('Top Heroes');

	});
});
