const DEFAULT_FORMAT: RegExp = /(\d{1,4})/g;

export enum CardTypes{
	elo,
	visaelectron,
	maestro,
	forbrugsforeningen,
	dankort,
	visa,
	mastercard,
	amex,
	dinersclub,
	discover,
	unionpay,
	jcb
}

interface Card {
	type: CardTypes,
	patterns: number[],
	format: RegExp,
	length: number[],
	cvcLength: number[],
	luhn: boolean
}

const CARDS: Card[] = [
	{
		type: CardTypes.elo,
		patterns: [401178, 401179, 431274, 438935, 451416, 457393, 457631, 457632, 504175, 506699, 5067, 509, 627780, 636297, 636368, 650, 6516, 6550],
		format: DEFAULT_FORMAT,
		length: [16],
		cvcLength: [3],
		luhn: true
	}, {
		type: CardTypes.visaelectron,
		patterns: [4026, 417500, 4405, 4508, 4844, 4913, 4917],
		format: DEFAULT_FORMAT,
		length: [16],
		cvcLength: [3],
		luhn: true
	}, {
		type: CardTypes.maestro,
		patterns: [5018, 502, 503, 506, 56, 58, 639, 6220, 67],
		format: DEFAULT_FORMAT,
		length: [12, 13, 14, 15, 16, 17, 18, 19],
		cvcLength: [3],
		luhn: true
	}, {
		type: CardTypes.forbrugsforeningen,
		patterns: [600],
		format: DEFAULT_FORMAT,
		length: [16],
		cvcLength: [3],
		luhn: true
	}, {
		type: CardTypes.dankort,
		patterns: [5019],
		format: DEFAULT_FORMAT,
		length: [16],
		cvcLength: [3],
		luhn: true
	}, {
		type: CardTypes.visa,
		patterns: [4],
		format: DEFAULT_FORMAT,
		length: [13, 16],
		cvcLength: [3],
		luhn: true
	}, {
		type: CardTypes.mastercard,
		patterns: [51, 52, 53, 54, 55, 22, 23, 24, 25, 26, 27],
		format: DEFAULT_FORMAT,
		length: [16],
		cvcLength: [3],
		luhn: true
	}, {
		type: CardTypes.amex,
		patterns: [34, 37],
		format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
		length: [15],
		cvcLength: [3, 4],
		luhn: true
	}, {
		type: CardTypes.dinersclub,
		patterns: [30, 36, 38, 39],
		format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
		length: [14],
		cvcLength: [3],
		luhn: true
	}, {
		type: CardTypes.discover,
		patterns: [60, 64, 65],
		format: DEFAULT_FORMAT,
		length: [16],
		cvcLength: [3],
		luhn: true
	}, {
		type: CardTypes.unionpay,
		patterns: [62, 88],
		format: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/,
		length: [16, 17, 18, 19],
		cvcLength: [3],
		luhn: false
	}, {
		type: CardTypes.jcb,
		patterns: [35],
		format: DEFAULT_FORMAT,
		length: [16],
		cvcLength: [3],
		luhn: true
	}
];

export class CardFormatService {
	static validateCardNumber(num: number): boolean {
		let numStr: string = (num + '').replace(/\s+|-/g, '');

		return numStr && numStr.length > 0;
	}

	static cardFromNumber(num: number): Card {
		let numStr: string = (num + '').replace(/\D/g, '');

		for (let _i = 0, _len = CARDS.length; _i < _len; _i++) {
			let card = CARDS[_i];
			let _ref = card.patterns;

			for (let _j = 0, _len1 = _ref.length; _j < _len1; _j++) {
				let pattern = _ref[_j];
				let p = pattern + '';

				if (numStr.substr(0, p.length) === p) {
					return card;
				}
			}
		}
	};

	static luhnCheck(num: number): boolean {
		let odd: boolean = true;
		let sum: number = 0;

		let digits: string[] = (num + '').split('').reverse();

		for (let _i = 0, _len = digits.length; _i < _len; _i++) {

			let digit: number = parseInt(digits[_i], 10);

			if ((odd = !odd)) {
				digit *= 2;
			}

			if (digit > 9) {
				digit -= 9;
			}

			sum += digit;
		}

		return sum % 10 === 0;
	};

	static cardType(num: number) {
		let _ref: Card = null;

		if (!num) {
			return null;
		}

		return ((_ref = this.cardFromNumber(num)) != null ? _ref.type : void 0) || null;
	}

	static reFormatCardNumber(e: KeyboardEvent, callback: (value: string) => void): void {
		let $target: HTMLInputElement = e.currentTarget as HTMLInputElement;
		let value: string = $target.value;

		value = this.replaceFullWidthChars(value);
		value = this.paymentFormatCardNumber(value);

		this.safeVal(value, $target, callback)
	};

	static formatCardNumber(e: KeyboardEvent, callback: (value: string) => void): void {
		let card, digit, length, re, upperLength;

		digit = String.fromCharCode(e.which);

		if (!/^\d+$/.test(digit)) {
			return;
		}

		let $target: HTMLInputElement = e.currentTarget as HTMLInputElement;
		let value: string = $target.value;

		card = this.cardFromNumber(parseInt(value + digit));

		length = (value.replace(/\D/g, '') + digit).length;

		upperLength = 16;

		if (card) {
			upperLength = card.length[card.length.length - 1];
		}

		if (length >= upperLength) {
			return;
		}

		if (($target.selectionStart != null) && $target.selectionStart !== value.length) {
			return;
		}

		// TODO: Check it!!!
		if (card && card.type as any == 'amex') {
			re = /^(\d{4}|\d{4}\s\d{6})$/;
		} else {
			re = /(?:^|\s)(\d{4})$/;
		}

		if (re.test(value)) {
			e.preventDefault();
			setTimeout(() => {
				callback(value + ' ' + digit);
			});
		} else if (re.test(value + digit)) {
			e.preventDefault();
			setTimeout(function () {
				callback(value + digit + ' ');
			});
		}
	};

	static replaceFullWidthChars(str: string): string {
		if (str == null) {
			str = '';
		}

		let fullWidth: string = '\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19';
		let halfWidth: string = '0123456789';
		let value: string = '';
		let chars: string[] = str.split('');

		chars.map((chr: string) => {
			let idx: number = fullWidth.indexOf(chr);

			if (idx > -1) {
				chr = halfWidth[idx];
			}

			value += chr;
		});

		return value;
	};

	static safeVal(value: string, $target, callback: (value: string) => void): void {
		let currPair, cursor, digit, last, prevPair;

		try {
			cursor = $target.getAttribute('selectionStart');
		} catch (e) {
			cursor = null;
		}

		last = $target.value;

		setTimeout(function () {
			callback(value)
		});

		if (cursor !== null && $target.is(":focus")) {
			if (cursor === last.length) {
				cursor = value.length;
			}
			if (last !== value) {
				prevPair = last.slice(cursor - 1, +cursor + 1 || 9e9);
				currPair = value.slice(cursor - 1, +cursor + 1 || 9e9);
				digit = value[cursor];
				if (/\d/.test(digit) && prevPair === ("" + digit + " ") && currPair === (" " + digit)) {
					cursor = cursor + 1;
				}
			}

			$target.setAttribute('selectionStart', cursor);
			$target.setAttribute('selectionEnd', cursor);
		}
	};

	static paymentFormatCardNumber(num: any): string {
		let groups, _ref;
		let numStr: string = num.replace(/\D/g, '');
		let card: Card = this.cardFromNumber(parseInt(numStr));

		if (!card) {
			return numStr;
		}

		let upperLength: number = card.length[card.length.length - 1];

		numStr = numStr.slice(0, upperLength);

		if (card.format.global) {
			let result: string[] = (_ref = numStr.match(card.format)) != null ? _ref : void 0;
			let str: string = '';

			for (let i: number = 0, l: number = result.length; i < l; i++) {
				let separator: string = '';

				if (i < 3 && result[i].length == 4) {
					separator = ' ';
				}

				str += result[i] + separator;
			}

			return str;
		} else {
			groups = card.format.exec(numStr);

			if (groups == null) {
				return;
			}

			groups.shift();

			groups = groups.filter((n) => {
				return n;
			});

			return groups.join(' ');
		}
	};

	static restrictNumeric(e: KeyboardEvent): boolean {
		if (e.metaKey || e.ctrlKey) {
			return true;
		}

		if (e.which === 32) {
			return false;
		}

		if (e.which === 0) {
			return true;
		}

		if (e.which < 33) {
			return true;
		}

		let input: string = String.fromCharCode(e.which);

		return !!/[\d\s]/.test(input);
	};

	static restrictCardNumber(e: KeyboardEvent): boolean {
		let $target: any = e.currentTarget;
		let digit: string = String.fromCharCode(e.which);

		if (!/^\d+$/.test(digit)) {
			return;
		}

		if (this.hasTextSelected($target)) {
			return;
		}

		let value: string = ($target.value + digit).replace(/\D/g, '');
		let card: Card = this.cardFromNumber(parseInt(value));

		if (card) {
			return value.length <= card.length[card.length.length - 1];
		} else {
			return value.length <= 16;
		}
	};

	static hasTextSelected($target) {
		let _ref;

		if (($target.getAttribute('selectionStart') != null) && $target.getAttribute('selectionStart') !== $target.getAttribute('selectionEnd')) {
			return true;
		}

		let doc: any = document;

		if ((typeof doc !== "undefined" && doc !== null ? (_ref = doc.selection) != null ? _ref.createRange : void 0 : void 0) != null) {
			if (doc.selection.createRange().text) {
				return true;
			}
		}
		return false;
	};

	static formatBackCardNumber(e, callback: (value: string) => void) {
		let $target: HTMLInputElement = e.currentTarget;
		let value: string = $target.value;

		if (e.which !== 8) {
			return;
		}

		if (($target.getAttribute('selectionStart') != null) && parseInt($target.getAttribute('selectionStart')) !== value.length) {
			return;
		}

		if (/\d\s$/.test(value)) {
			e.preventDefault();

			setTimeout(() => {
				callback(value.replace(/\d\s$/, ''));
			});
		} else if (/\s\d?$/.test(value)) {
			e.preventDefault();

			setTimeout(() => {
				callback(value.replace(/\d$/, ''));
			});
		}
	};

	static reFormatExpiry(e, callback: (value: string) => void): void {
		let $target = e.currentTarget;
		let value: string = $target.value;

		value = this.replaceFullWidthChars(value);
		value = this.paymentFormatExpiry(value);

		this.safeVal(value, $target, callback)
	};

	static paymentFormatExpiry(expiry: string): string {
		let parts: string[] = expiry.match(/^\D*(\d{1,2})(\D+)?(\d{1,4})?/);

		if (!parts) {
			return '';
		}

		let mon: string = parts[1] || '';
		let sep: string = parts[2] || '';
		let year: string = parts[3] || '';

		if (year.length > 0) {
			sep = ' / ';
		} else if (sep === ' /') {
			mon = mon.substring(0, 1);
			sep = '';
		} else if (mon.length === 2 || sep.length > 0) {
			sep = ' / ';
		} else if (mon.length === 1 && (mon !== '0' && mon !== '1')) {
			mon = "0" + mon;
			sep = ' / ';
		}

		return mon + sep + year;
	};

	static cardExpiryVal(value: string): { month: number, year: number } {
		let _ref: string[] = value.split(/[\s\/]+/, 2);
		let month: number = parseInt(_ref[0]);
		let year: number = parseInt(_ref[1]);

		if ((year != null ? year.toString().length : void 0) === 2 && /^\d+$/.test(year.toString())) {
			let prefix: number = (new Date).getFullYear();
			prefix = parseInt(prefix.toString().slice(0, 2));
			year = parseInt(prefix.toString() + year.toString());
		}

		return {
			month: month,
			year: year
		};
	};

	static validateCardExpiry(month: number, year: number): boolean {
		if (!(month && year)) {
			return false;
		}

		month = parseInt((month + '').replace(/\s+/g, ''));
		year = parseInt((year + '').replace(/\s+/g, ''));

		if (!/^\d+$/.test(month.toString())) {
			return false;
		}

		if (!/^\d+$/.test(year.toString())) {
			return false;
		}

		if (!((1 <= month && month <= 12))) {
			return false;
		}

		if (year.toString().length === 2) {
			if (year < 70) {
				year = parseInt("20" + year);
			} else {
				year = parseInt("19" + year);
			}
		}

		if (year.toString().length !== 4) {
			return false;
		}

		let expiry: Date = new Date(year, month);
		let currentTime: Date = new Date;

		expiry.setMonth(expiry.getMonth() - 1);
		expiry.setMonth(expiry.getMonth() + 1, 1);

		return expiry > currentTime;
	};
}