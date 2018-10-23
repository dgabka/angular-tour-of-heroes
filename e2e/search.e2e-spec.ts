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
		dashboard.getFirstHeroName().then(string => dashboard.search(string));
		expect(dashboard.searchResult).not.toBeUndefined();
		expect(dashboard.searchResult.count()).toBeGreaterThanOrEqual(1);
	});

	it('should navigate to "Hero details" when hero is selected from search results', () => {
		dashboard.getFirstHeroName().then(
			string => dashboard.search(string)).then(
				() => dashboard.clickOnFirstSearchResult());
		expect(browser.getCurrentUrl()).toContain('detail');
	});
});
