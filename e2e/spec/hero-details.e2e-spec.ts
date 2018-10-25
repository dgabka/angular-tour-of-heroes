import { DefaultPage } from '../po/app.po';
import { HeroesPage } from '../po/heroes.po';
import { HeroDetails } from '../po/hero-details.po';
import { browser } from 'protractor';


describe('Hero details view', () => {
	let heroesPage: HeroesPage;
	let detailsPage: HeroDetails;

	beforeAll(() => {
		heroesPage = new HeroesPage();
		detailsPage = new HeroDetails();
		heroesPage.navigateTo();
	});

	it('should rename a hero', () => {
		heroesPage.clickOnHero(0);
		heroesPage.clickViewDetails();
		detailsPage.clearInputField();
		detailsPage.inputAndSubmit('Dawid');
		browser.waitForAngular();
		expect(heroesPage.getHeroName(0)).toBe('Dawid');
	});
});
