import { DefaultPage } from '../po/app.po';
import { browser } from 'protractor';
import { DashboardPage } from '../po/dashboard.po';
import { HeroesPage } from '../po/heroes.po';

describe('Tour Of Heroes App', () => {
	let page: DefaultPage;

	beforeAll(async () => {
		page = new DefaultPage();
		await page.navigateTo();
	});

	it('should display header', async () => {
		expect(await page.getHeaderText()).toEqual('Tour of Heroes');
	});

	it('should display active navigation buttons', async () => {
		expect(await page.heroesNav.isEnabled()).toBe(true);
		expect(await page.dashboardNav.isEnabled()).toBe(true);
	});

	it('should display Dashboard by default', async () => {
		expect(await browser.getCurrentUrl()).toContain('dashboard');
		const dashboard: DashboardPage = new DashboardPage();
		expect(await dashboard.getHeader()).toBe('Top Heroes');
	});

	it('should navigate between Dashboard and Heroes views', async () => {
		const heroes: HeroesPage = new HeroesPage();
		const dashboard: DashboardPage = new DashboardPage();

		await page.viewHeroes();
		expect(await heroes.getHeader()).toBe('My Heroes');
		await page.viewDashboard();
		expect(await dashboard.getHeader()).toBe('Top Heroes');

	});
});
