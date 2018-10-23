import { DefaultPage } from '../po/app.po';
import { HeroesPage } from '../po/heroes.po';
import { HeroDetails } from '../po/hero-details.po';

describe('Heroes view', () => {
	let page: DefaultPage;
	let heroesPage: HeroesPage;

	beforeEach(() => {
		page = new DefaultPage();
		page.navigateTo();
		heroesPage = page.viewHeroes();
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

	xit('should display "View Details" button after selecting a Hero', async () => {
		const name: string = await heroesPage.getHeroName(0);
		heroesPage.clickOnHero(0);
		heroesPage.clickViewDetails();
		const details: HeroDetails = new HeroDetails();
		expect(details.getName()).toBe(name);
	});

});
