import {allure} from './allure-reporter';

export function Step(name: string) {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		const method = descriptor.value;
		let callable;

		descriptor.value = function (...args) {
			const count = (name.match(/%/g) || []).length;
			if (count > 0) {
				const values = args.slice().reverse();
				for (let i = 0; i < count; i++) {
					name = name.replace(/%[ds]/, values.pop());
				}
			}
			callable = () => allure.step(name, () => method.apply(this, args));
			return callable.apply(this, args);
		};
		return descriptor;
	};
}
