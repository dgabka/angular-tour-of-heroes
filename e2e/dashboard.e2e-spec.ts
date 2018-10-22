import { DashboardPage } from './dashboard.po';
import { DefaultPage } from './app.po';

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

	it('should display "Hero Search" component', () => {
		expect(dashboard.searchComponent.isPresent()).toBe(true);
		expect(dashboard.searchInput.isPresent()).toBe(true);
	});

	it('should display search results when provided with input', () => {
		dashboard.search('a');
		expect(dashboard.searchResult.count()).toBeGreaterThanOrEqual(1);
	});
});