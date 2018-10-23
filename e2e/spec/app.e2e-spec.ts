import { DefaultPage } from '../po/app.po';
import { browser } from 'protractor';
import { DashboardPage } from '../po/dashboard.po';
import { HeroesPage } from '../po/heroes.po';

describe('Tour Of Heroes App', () => {
	let page: DefaultPage;

	beforeAll(() => {
		page = new DefaultPage();
		page.navigateTo();
	});

	it('should display header', () => {
		expect(page.getHeaderText()).toEqual('Tour of Heroes');
	});

	it('should display active navigation buttons', () => {
		expect(page.heroesNav.isEnabled()).toBe(true);
		expect(page.dashboardNav.isEnabled()).toBe(true);
	});

	it('should display Dashboard by default', () => {
		expect(browser.getCurrentUrl()).toContain('dashboard');
		const dashboard: DashboardPage = new DashboardPage();
		expect(dashboard.getHeader()).toBe('Top Heroes');
	});

	it('should navigate between Dashboard and Heroes views', () => {
		let heroes: HeroesPage;
		let dashboard: DashboardPage;

		heroes = page.viewHeroes();
		expect(heroes.getHeader()).toBe('My Heroes');
		dashboard = page.viewDashboard();
		expect(dashboard.getHeader()).toBe('Top Heroes');

	});
});
