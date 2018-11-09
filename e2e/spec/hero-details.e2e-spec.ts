import {HeroesPage} from '../po/heroes.po';
import {HeroDetails} from '../po/hero-details.po';
import {browser} from 'protractor';
import {DashboardPage} from '../po/dashboard.po';
import {allure} from '../allure-reporter';
import {ContentType} from 'allure2-js-commons';


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
		await detailsPage.goBack();
		expect(await dashboard.getHeader()).toBeTruthy();
	});

	it('should rename a hero', async () => {
		await heroesPage.navigateTo();
		await heroesPage.clickOnHero(0);
		await heroesPage.clickViewDetails();
		await detailsPage.clearInputField();
		await detailsPage.inputString('Dawid');
		await detailsPage.submit();
		expect(await heroesPage.getHeroName(0)).toBe('Dawid');
	});

	it('should not rename hero to an empty string', async () => {
		await dashboard.navigateTo();
		const name: string = await dashboard.getHeroName(1);
		await dashboard.clickOnHero(1);
		await detailsPage.clearWithBackspace(name.length);
		await detailsPage.submit();
		expect(await dashboard.getHeroName(1)).toBe(name, 'Invalid name: Hero has been renamed to an empty string');
	});

	it('should not rename hero to an existing name of another hero', async () => {
		await dashboard.navigateTo();
		const newName: string = await dashboard.getHeroName(1);
		const oldName: string = await dashboard.getHeroName(2);
		await dashboard.clickOnHero(2);
		await detailsPage.clearInputField();
		await detailsPage.inputString(newName);
		await detailsPage.submit();
		expect(await dashboard.getHeroName(2)).toBe(oldName, 'Invalid name: Hero has been renamed to a duplicated name');
	});

	it('should have a upper boundary for name length', async () => {
		await heroesPage.navigateTo();
		await heroesPage.clickOnHero(1);
		await heroesPage.clickViewDetails();
		await detailsPage.clearInputField();
		await detailsPage.inputString('x'.repeat(256));
		await detailsPage.submit();
		expect(await heroesPage.getHeroName(1).then(x => x.length)).not.toBe(256, 'Invalid name: Too long name breaks the layout');
		await browser.takeScreenshot().then(png => allure.attachment('screenshot', Buffer.from(png, 'base64'), ContentType.PNG));
	});
});
