import { DashboardPage } from './dashboard.po';
import { DefaultPage } from './app.po';
import { browser } from 'protractor';

describe('Search component', () => {
	let dashboard: DashboardPage;
	let page: DefaultPage;

	beforeEach(() => {
		page = new DefaultPage;
		dashboard = new DashboardPage;
		page.navigateTo();
	});

	it('should display search results when provided with input', () => {
		dashboard.topHeroes.first().getText().then(string => dashboard.search(string));
		expect(dashboard.searchResult.count()).toBeGreaterThanOrEqual(1);
	});

	it('should navigate to "Hero details" when hero is selected from search results', () => {
		dashboard.topHeroes.first().getText().then(string => dashboard.search(string));
		dashboard.searchResult.first().click();
		expect(browser.getCurrentUrl()).toContain('detail');
	});
});
