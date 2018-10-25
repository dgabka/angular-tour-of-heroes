import { DashboardPage } from '../po/dashboard.po';
import { DefaultPage } from '../po/app.po';
import { browser, $ } from 'protractor';
import { HeroDetails } from '../po/hero-details.po';

describe('Search component', () => {
	let dashboard: DashboardPage;
	let page: DefaultPage;

	beforeEach(() => {
		page = new DefaultPage;
		dashboard = new DashboardPage;
		page.navigateTo();
	});

	it('should display search results when provided with input', () => {
		dashboard.getHeroName(0).then(string => dashboard.search(string));
		expect(browser.isElementPresent($('.search-result'))).toBe(true);
		expect(dashboard.searchResult.count()).toBeGreaterThanOrEqual(1);
	});

	it('should navigate to "Hero details" when hero is selected from search results', async () => {
		const heroDetails: HeroDetails = new HeroDetails();
		const name: string  = await dashboard.getHeroName(0);
		dashboard.search(name);
		dashboard.clickOnFirstSearchResult();
		expect(browser.getCurrentUrl()).toContain('detail');
		expect(heroDetails.getName()).toBe(name);
	});
});
