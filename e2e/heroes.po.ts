import { element, by } from 'protractor';

export class HeroesPage {
	header = element(by.tagName('h2'));
	heroes = element.all(by.tagName('li'));
	addHeroButton = element(by.partialButtonText('Add'));
	ngForFeaturesButton = element(by.partialButtonText('ngFor Features'));
}
