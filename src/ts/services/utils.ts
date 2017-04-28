export class UtilsService {
	static getClassName(isActive: boolean, baseName: string, activeName: string, inactiveName?: string): string {
		let className: string = baseName;

		if (isActive) {
			className += ' ' + activeName;
		} else {
			if (inactiveName) {
				className += ' ' + inactiveName;
			}
		}

		return className;
	}
}