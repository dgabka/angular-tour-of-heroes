import { HeroesPage } from '../po/heroes.po';
import { HeroDetails } from '../po/hero-details.po';
import { browser, $ } from 'protractor';
import { DashboardPage } from '../po/dashboard.po';


describe('Hero details view', () => {
	let heroesPage: HeroesPage;
	let dashboard: DashboardPage;
	let detailsPage: HeroDetails;

	beforeAll(async () => {
		heroesPage = new HeroesPage();
		dashboard = new DashboardPage();
		detailsPage = new HeroDetails();
	});

	it('should navigate back', async () => {
		await dashboard.navigateTo();
		await dashboard.clickOnHero(1);
		await browser.wait($('my-hero-detail').isPresent(), 1000);
		await detailsPage.goBack();
		await browser.waitForAngular();
		expect(await browser.getCurrentUrl()).toContain('dashboard');
	});

	it('should rename a hero', async () => {
		await heroesPage.navigateTo();
		await heroesPage.clickOnHero(0);
		await heroesPage.clickViewDetails();
		await detailsPage.clearInputField();
		await detailsPage.inputAndSubmit('Dawid');
		await browser.waitForAngular();
		expect(await heroesPage.getHeroName(0)).toBe('Dawid');
	});
});
