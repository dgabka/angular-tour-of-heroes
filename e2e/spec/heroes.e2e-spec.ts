import { DefaultPage } from '../po/app.po';
import { HeroesPage } from '../po/heroes.po';
import { HeroDetails } from '../po/hero-details.po';
import { element, by, browser, $ } from 'protractor';

describe('Heroes view', () => {
	let heroesPage: HeroesPage;

	beforeEach(async () => {
		heroesPage = new HeroesPage();
		await heroesPage.navigateTo();
	});

	it('should display header', () => {
		expect(heroesPage.getHeader()).toBe('My Heroes');
	});

	it('should display list of heroes', () => {
		expect(heroesPage.heroes.count()).toBeGreaterThanOrEqual(1);
	});

	it('should display "Add New Hero" button', () => {
		expect(heroesPage.addHeroButton.isEnabled()).toBe(true);
	});

	it('should display "View Details" button after selecting a Hero', async () => {
		const name: string = await heroesPage.getHeroName(0);
		await heroesPage.clickOnHero(0);
		await heroesPage.clickViewDetails();
		const details: HeroDetails = new HeroDetails();
		expect(details.getName()).toBe(name);
	});

	it('should add a new hero', () => {
		heroesPage.clickAddHero();
		const newHeroDetails: HeroDetails = new HeroDetails();
		newHeroDetails.inputAndSubmit('Dawid');
		expect(heroesPage.getLastHeroName()).toEqual('Dawid');
	});

	it('should close "Add hero" component when back is clicked', () => {
		heroesPage.clickAddHero();
		const newHeroDetails: HeroDetails = new HeroDetails();
		expect(browser.isElementPresent($('my-hero-detail'))).toBe(true);
		newHeroDetails.goBack();
		expect(browser.isElementPresent($('my-hero-detail'))).toBe(false);
	});

	it('should delete a hero', async () => {
		const numberBefore: number = await heroesPage.getHeroesNumber();
		await heroesPage.deleteHero(0);
		expect(heroesPage.getHeroesNumber()).toEqual(numberBefore - 1);
	});

});
