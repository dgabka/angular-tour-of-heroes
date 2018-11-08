import { allure } from './allure-reporter';

export function Step(name: string) {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		const method = descriptor.value;
		let callable;

		descriptor.value = function (...args) {
			callable = () => allure.step(name, () => method.apply(this, args));
			return callable.apply(this, args);
		};
		return descriptor;
	};
}
