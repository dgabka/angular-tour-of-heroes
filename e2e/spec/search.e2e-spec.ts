import {DashboardPage} from '../po/dashboard.po';
import {DefaultPage} from '../po/app.po';
import {HeroDetails} from '../po/hero-details.po';

describe('Search component', () => {
	let dashboard: DashboardPage;
	let page: DefaultPage;

	beforeAll(() => {
		page = new DefaultPage;
		dashboard = new DashboardPage;
	});

	beforeEach(async () => {
		await page.navigateTo();
	});

	it('should display search results when provided with input', async () => {
		const name: string = await dashboard.getHeroName(0);
		await dashboard.search(name);
		expect(await dashboard.getSearchResults()).toBeTruthy();
		expect(await dashboard.searchResult.count()).toBeGreaterThanOrEqual(1);
	});

	it('should navigate to "Hero details" when hero is selected from search results', async () => {
		const heroDetails: HeroDetails = new HeroDetails();
		const name: string  = await dashboard.getHeroName(0);
		await dashboard.search(name);
		await dashboard.clickOnFirstSearchResult();
		expect(await heroDetails.getName()).toBe(name);
	});
});
