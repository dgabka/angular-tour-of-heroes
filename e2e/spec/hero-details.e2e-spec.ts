import { HeroesPage } from '../po/heroes.po';
import { HeroDetails } from '../po/hero-details.po';
import { browser, $ } from 'protractor';
import { DashboardPage } from '../po/dashboard.po';


describe('Hero details view', () => {
	let heroesPage: HeroesPage;
	let dashboard: DashboardPage;
	let detailsPage: HeroDetails;

	beforeAll(() => {
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

	it('should not rename hero to an empty string', async () => {
		await dashboard.navigateTo();
		const name: string = await dashboard.getHeroName(1);
		console.log(name);
		await dashboard.clickOnHero(1);
		await browser.wait($('my-hero-detail').isPresent(), 3000);
		await detailsPage.clearInputField();
		await browser.waitForAngular();
		console.log('new name -> ' + await dashboard.getHeroName(1));
		expect(await dashboard.getHeroName(1)).toBe(name);
	});
});
