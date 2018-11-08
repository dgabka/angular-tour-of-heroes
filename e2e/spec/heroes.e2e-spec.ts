import { HeroesPage } from '../po/heroes.po';
import { HeroDetails } from '../po/hero-details.po';
import { browser, $ } from 'protractor';
import { isSorted } from '../helpers';

describe('Heroes view', () => {
	let heroesPage: HeroesPage;
	let details: HeroDetails;

	beforeAll(() => {
		heroesPage = new HeroesPage();
		details = new HeroDetails();
	});

	beforeEach(async () => {
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
		expect(await details.getName()).toBe(name);
	});

	it('should add a new hero', async () => {
		const numberOfHeroes: number = await heroesPage.heroes.count();
		await heroesPage.clickAddHero();
		await details.inputAndSubmit('Dawid');
		expect(await heroesPage.heroes.count()).toEqual(numberOfHeroes + 1);
		expect(await heroesPage.getLastHeroName()).toEqual('Dawid');
	});

	it('should not add hero with an empty name', async () => {
		const numberOfHeroes: number = await heroesPage.getHeroesNumber();
		await heroesPage.clickAddHero();
		await details.inputAndSubmit('');
		expect(await heroesPage.getHeroesNumber()).toBe(numberOfHeroes, 'Invalid name: Hero has been created with empty name');
	});

	it('should not add hero with existing name', async () => {
		const numberOfHeroes: number = await heroesPage.getHeroesNumber();
		const name: string  = await heroesPage.getHeroName(3);
		await heroesPage.clickAddHero();
		await details.inputAndSubmit(name);
		expect(await heroesPage.getHeroesNumber()).toBe(numberOfHeroes, 'Invalid name: Hero has been created with a duplicated name');
	});

	it('should close "Add hero" component when back is clicked', async () => {
		await heroesPage.clickAddHero();
		expect(browser.isElementPresent($('my-hero-detail'))).toBe(true);
		await details.goBack();
		expect(browser.isElementPresent($('my-hero-detail'))).toBe(false);
	});

	it('should delete a hero', async () => {
		const numberBefore: number = await heroesPage.getHeroesNumber();
		await heroesPage.deleteHero(0);
		expect(await heroesPage.getHeroesNumber()).toEqual(numberBefore - 1);
	});

	it('should display heroes in an ascending order', async () => {
		expect(isSorted(await heroesPage.xxx())).toBe(true);
	});
});
