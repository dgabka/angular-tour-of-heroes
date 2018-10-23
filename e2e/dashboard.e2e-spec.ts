import { DashboardPage } from './dashboard.po';
import { DefaultPage } from './app.po';
import { browser } from 'protractor';

describe('Dashboard', () => {
	let dashboard: DashboardPage;
	let page: DefaultPage;

	beforeAll(() => {
		page = new DefaultPage();
		dashboard = new DashboardPage();
		page.navigateTo();
	});

	it('should display four heroes', () => {
		expect(dashboard.topHeroes.count()).toEqual(4);
	});

	it('should navigate to "Hero details" when hero is clicked', () => {
		dashboard.topHeroes.first().click();
		expect(browser.getCurrentUrl()).toContain('detail');
	});

	it('should display "Hero Search" component', () => {
		page.navigateTo();
		expect(dashboard.searchComponent.isPresent()).toBe(true);
		expect(dashboard.searchInput.isPresent()).toBe(true);
	});
});
