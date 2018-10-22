import { JasmineAllureReporter } from 'jasmine-allure2-reporter';
import { JasmineConsoleReporter } from 'jasmine-allure2-reporter';
import { AllureRuntime, Status, GlobalInfoWriter, AllureInterface } from 'allure2-js-commons';
import { TestResult } from 'allure2-js-commons';

jasmine.getEnv().addReporter(new JasmineConsoleReporter());

const reporter = new JasmineAllureReporter(new AllureRuntime({
	resultsDir: './out/allure-results',
	testMapper: (result: TestResult) => {
		if (result.status === Status.SKIPPED) {
			result.fullName = `(WAS SKIPPED) ${result.fullName}`;
		}
		return result;
	}
}));
jasmine.getEnv().addReporter(reporter);

export const allure: AllureInterface = reporter.getInterface();
const giw: GlobalInfoWriter = allure.getGlobalInfoWriter();

giw.writeEnvironmentInfo({
	'Browser': 'Google Chrome 69.0.3497.100',
	'OS': 'macOS High Sierra 10.13.6'
});

/*
giw.writeCategories([
	{
		'name': 'Operation fails',
		'messageRegex': /^Expected .* to (equal|be close to) (-?(\d+(\.\d+)?)|'NaN')\..* /gm,
		matchedStatuses: [
			Status.FAILED
		]
	}
]);
*/
