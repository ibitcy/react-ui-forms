import * as React from 'react';
import {FieldType, ValidationType, Context} from "./form";
import {UtilsService} from "../../../services/utils";
import * as libphonenumber from 'google-libphonenumber';
import {UICountrySelector} from "./country-selector";
import PhoneNumberUtil = libphonenumber.PhoneNumberUtil;

export interface Props {
	name: string,
	type?: string,
	value?: string,
	isSng?: boolean,
	placeholder?: string,
	proxyValueName?: string,
	validateOnChange?: boolean,
	onChange?: (value: string) => void,
	phoneDefaultCountrySNG?: string,
	phoneDefaultCountryGlobal?: string,
	iconsPath?: string
}

export interface State {
	value: string,
	country: string,
	isValid: boolean,
	placeholder: string,
}

export class UIPhoneInput extends React.Component<Props, State> {
	context: Context;

	state: State = {
		value: '',
		country: null,
		isValid: true,
		placeholder: ''
	};

	static defaultProps = {
		phoneDefaultCountrySNG: 'RU',
		phoneDefaultCountryGlobal: 'CN',
		type: 'text',
		iconsPath: '',
		value: ''
	};

	static contextTypes = {
		proxyField: React.PropTypes.func.isRequired,
		updateValue: React.PropTypes.func.isRequired,
		updateValidation: React.PropTypes.func.isRequired,
		registerInput: React.PropTypes.func.isRequired,
		unRegisterInput: React.PropTypes.func.isRequired
	};

	componentDidMount(): void {
		this.onChangeCountry(this.props.isSng ? this.props.phoneDefaultCountrySNG : this.props.phoneDefaultCountryGlobal);

		this.context.registerInput(
			FieldType.TEXT,
			this.props.name,
			this.state.value,
			[ValidationType.PHONE_NUMBER, ValidationType.REQUIRED],
			[],
			this.onValidated,
			this.onSetValue
		);

		this.updateValues(this.props.value);
	}

	componentWillUnmount() {
		this.context.unRegisterInput(this.props.name);
	}

	componentWillReceiveProps(nextProps: Props) {
		if (nextProps.name !== this.props.name) {
			this.context.unRegisterInput(this.props.name);

			this.context.registerInput(
				FieldType.TEXT,
				nextProps.name,
				this.state.value,
				[ValidationType.CARD_EXPIRY, ValidationType.REQUIRED],
				[],
				this.onValidated,
				this.onSetValue
			);

			this.updateValues(this.props.value);
		}
	}

	componentWillUpdate(nextProps: Props) {
		if (nextProps.value !== this.props.value) {
			this.updateValues(nextProps.value);
		}
	}

	private updateValues(propValue: string): void {
		this.setState({
			value: propValue
		} as State);

		this.context.updateValue(this.props.name, propValue);
	}

	private onValidated = (isValid: boolean): void => {
		this.setState({
			isValid: isValid
		} as State);
	};

	private onSetValue = (value: string): void => {
		this.setState({
			value: value
		} as State);
	};

	private setValue(event): void {
		let value: string = event.target.value;

		if (/^[\d\s-+()]+$/ig.test(value)) {
			let PNF = libphonenumber.PhoneNumberFormat;
			let phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

			let phoneNumber = null;

			try {
				phoneNumber = phoneUtil.parse(value, null);
			} catch (err) {

			}

			let country = this.state.country;

			if (phoneNumber) {
				if (phoneUtil.getRegionCodeForNumber(phoneNumber)) {
					country = phoneUtil.getRegionCodeForNumber(phoneNumber).toUpperCase()
				}

				this.setState({
					value: phoneUtil.format(phoneNumber, PNF.INTERNATIONAL),
					country: country
				} as State);
			} else {
				this.setState({
					value: value
				} as State);
			}

			this.context.updateValue(this.props.name, value);

			if (this.props.validateOnChange) {
				this.context.updateValidation(this.props.name);
			}

			if (this.props.proxyValueName) {
				this.context.proxyField(this.props.proxyValueName, value);
			}

			if (this.props.onChange) {
				setTimeout(() => {
					this.props.onChange(value);
				}, 0);
			}
		}
	}

	private setValid(valid: boolean): void {
		this.setState({
			isValid: valid
		} as State);
	}

	private getClassName(): string {
		return UtilsService.getClassName(this.state.isValid, 'controls', 'valid', 'invalid');
	}

	private onChangeCountry(key: any): void {
		if (key) {
			let PNF = libphonenumber.PhoneNumberFormat;
			let phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
			let formatObj: any = phoneUtil.getExampleNumberForType(key.toLowerCase(), PNF.INTERNATIONAL);
			let placeholder: string = this.props.placeholder;

			let value = this.state.value;

			if (formatObj && formatObj.values_ && formatObj.values_[1]) {
				placeholder = phoneUtil.format(formatObj, PNF.INTERNATIONAL);

				if (value == '+') {
					value = '';
				}
			}

			this.setState({
				country: key,
				placeholder: placeholder,
				value: value
			} as State);
		}
	}

	private onClickHandler(): void {
		let value = this.state.value;

		if ((!value || value == '+') && this.state.country) {
			let PNF = libphonenumber.PhoneNumberFormat;
			let phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
			let formatObj: any = phoneUtil.getExampleNumberForType(this.state.country.toLowerCase(), PNF.INTERNATIONAL);

			if (formatObj && formatObj.values_ && formatObj.values_[1]) {
				this.setState({
					value: '+' + formatObj.values_[1]
				} as State);
			}
		}
	}

	public render() {
		return (
			<div className="row form-phone-number">
				<div className="left">
					<UICountrySelector
						isSng={this.props.isSng}
						defKey={this.state.country}
						onChange={this.onChangeCountry.bind(this)}
						iconsPath={this.props.iconsPath}
					/>
				</div>

				<div className="right">
					<input
						placeholder={this.state.placeholder || this.props.placeholder}
						name={this.props.name}
						onChange={this.setValue.bind(this)}
						onFocus={this.setValid.bind(this, true)}
						onClick={this.onClickHandler.bind(this)}
						value={this.state.value}
						type={this.props.type}
						className={this.getClassName()}
					/>
				</div>
			</div>
		);
	}
}



