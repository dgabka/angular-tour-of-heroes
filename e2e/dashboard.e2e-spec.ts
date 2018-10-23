import { DashboardPage } from './dashboard.po';
import { DefaultPage } from './app.po';
import { browser } from 'protractor';

describe('Dashboard', () => {
	let dashboard: DashboardPage;
	let page: DefaultPage;

	beforeEach(() => {
		page = new DefaultPage();
		dashboard = new DashboardPage();
		page.navigateTo();
	});

	it('should display four heroes', () => {
		expect(dashboard.topHeroes.count()).toEqual(4);
	});

	it('should display "Hero Search" component', () => {
		expect(dashboard.searchComponent.isPresent()).toBe(true);
		expect(dashboard.searchInput.isPresent()).toBe(true);
	});

	it('should navigate to "Hero details" when hero is clicked', () => {
		for (let i = 0; i < 4; i++) {
			page.navigateTo();
			dashboard.clickOnHero(i);
			expect(browser.getCurrentUrl()).toContain('detail');
		}
	});
});
