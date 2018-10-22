import { DefaultPage } from './app.po';

describe('blank App', () => {
	let page: DefaultPage;

	beforeEach(() => {
		page = new DefaultPage();
	});

	it('should display message saying app works', () => {
		page.navigateTo();
		expect(page.getHeaderText()).toEqual('Tour of Heroes');
	});
});
