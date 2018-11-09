export function isSorted(list: Array<string> | Array<number>): boolean {
	for (let i = 0; i < list.length - 1; i++) {
		if (+list[i] >= +list[i + 1]) {
			return false;
		}
	}
	return true;
}

/**
 *    @param millis    number of milliseconds to pause the test for
 *    @returns        {Promise<void>}
 */
export async function sleep(millis: number): Promise<any> {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(true);
		}, millis);
	});
}
