export function isSorted(list: Array<string> | Array<number>): boolean {
	for (let i = 0; i < list.length - 1; i++) {
		if (+list[i] >= +list[i + 1]) {
			return false;
		}
	}
	return true;
}
