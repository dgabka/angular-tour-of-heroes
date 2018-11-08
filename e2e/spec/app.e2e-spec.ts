import { DefaultPage } from '../po/app.po';
import { DashboardPage } from '../po/dashboard.po';
import { HeroesPage } from '../po/heroes.po';

describe('Tour Of Heroes App', () => {
	let page: DefaultPage;
	let heroesPage: HeroesPage;
	let dashboard: DashboardPage;

	beforeAll(async () => {
		page = new DefaultPage();
		heroesPage = new HeroesPage();
		dashboard = new DashboardPage();
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
		expect(await dashboard.getHeader()).toBeTruthy();
	});

	it('should navigate between Dashboard and Heroes views', async () => {
		await page.viewHeroes();
		expect(await heroesPage.getHeader()).toBe('My Heroes');
		await page.viewDashboard();
		expect(await dashboard.getHeader()).toBe('Top Heroes');

	});
});
