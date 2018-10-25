import { HeroesPage } from '../po/heroes.po';
import { HeroDetails } from '../po/hero-details.po';
import { browser } from 'protractor';


describe('Hero details view', () => {
	let heroesPage: HeroesPage;
	let detailsPage: HeroDetails;

	beforeEach(async () => {
		heroesPage = new HeroesPage();
		detailsPage = new HeroDetails();
		await heroesPage.navigateTo();
	});

	it('should rename a hero', async () => {
		await heroesPage.clickOnHero(0);
		await heroesPage.clickViewDetails();
		await detailsPage.clearInputField();
		await detailsPage.inputAndSubmit('Dawid');
		await browser.waitForAngular();
		expect(await heroesPage.getHeroName(0)).toBe('Dawid');
	});
});
