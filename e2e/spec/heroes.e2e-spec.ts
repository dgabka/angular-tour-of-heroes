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

	it('should display header', async () => {
		expect(await heroesPage.getHeader()).toBe('My Heroes');
	});

	it('should display list of heroes', async () => {
		expect(await heroesPage.heroes.count()).toBeGreaterThanOrEqual(1);
	});

	it('should display "Add New Hero" button', async () => {
		expect(await heroesPage.addHeroButton.isEnabled()).toBe(true);
	});

	it('should display "View Details" button after selecting a Hero', async () => {
		const name: string = await heroesPage.getHeroName(0);
		await heroesPage.clickOnHero(0);
		await heroesPage.clickViewDetails();
		const details: HeroDetails = new HeroDetails();
		expect(await details.getName()).toBe(name);
	});

	it('should add a new hero', async () => {
		await heroesPage.clickAddHero();
		const newHeroDetails: HeroDetails = new HeroDetails();
		await newHeroDetails.inputAndSubmit('Dawid');
		expect(await heroesPage.getLastHeroName()).toEqual('Dawid');
	});

	it('should close "Add hero" component when back is clicked', async () => {
		await heroesPage.clickAddHero();
		const newHeroDetails: HeroDetails = new HeroDetails();
		expect(browser.isElementPresent($('my-hero-detail'))).toBe(true);
		await newHeroDetails.goBack();
		expect(browser.isElementPresent($('my-hero-detail'))).toBe(false);
	});

	it('should delete a hero', async () => {
		const numberBefore: number = await heroesPage.getHeroesNumber();
		await heroesPage.deleteHero(0);
		expect(heroesPage.getHeroesNumber()).toEqual(numberBefore - 1);
	});

});
