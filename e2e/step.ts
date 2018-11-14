import {allure} from './allure-reporter';

export function Step(name: string) {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		const method = descriptor.value;
		let callable;

		descriptor.value = function (...args) {
			const countNum = (name.match(/%d/g) || []).length;
			const countStr = (name.match(/%s/g) || []).length;
			if (countNum + countStr > 0) {
				const strings = args.filter(e => typeof e === 'string').reverse();
				const numbers = args.filter(e => typeof e === 'number').reverse();
				for (let i = 0; i < Math.max(countStr, countNum); i++) {
					name = name.replace(/%s/, strings.pop());
					name = name.replace(/%d/, numbers.pop());
				}
			}

			console.log(name);

			callable = () => allure.step(name, () => method.apply(this, args));
			return callable.apply(this, args);
		};
		return descriptor;
	};
}
