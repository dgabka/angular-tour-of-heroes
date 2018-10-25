import { DashboardPage } from '../po/dashboard.po';
import { DefaultPage } from '../po/app.po';
import { browser } from 'protractor';
import { HeroDetails } from '../po/hero-details.po';
import { $ } from 'protractor';

describe('Dashboard', () => {
	let dashboard: DashboardPage;
	let page: DefaultPage;

	beforeAll(() => {
		page = new DefaultPage();
		dashboard = new DashboardPage();
	});

	beforeEach(async () => {
		await page.navigateTo();
	});

	it('should display four heroes', async () => {
		expect(await dashboard.topHeroes.count()).toEqual(4);
	});

	it('should display "Hero Search" component', async () => {
		expect(await dashboard.searchComponent.isPresent()).toBe(true);
		expect(await dashboard.searchInput.isPresent()).toBe(true);
	});

	it('should navigate to "Hero details" when hero is clicked', async () => {
		const heroDetails = new HeroDetails();
		const name: string  = await dashboard.getHeroName(1);
		await dashboard.clickOnHero(1);
		await browser.wait($('my-hero-detail').isPresent(), 1000);
		expect(await heroDetails.getName()).toBe(name);
		expect(await browser.getCurrentUrl()).toContain('detail');
	});
});
