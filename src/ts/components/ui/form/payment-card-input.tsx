import * as React from 'react';
import {FieldType, ValidationType, Context} from "./form";
import {UtilsService} from "../../../services/utils";
import {CardsFormat, CardTypes} from 'cards-format';
import {setTimeout} from "timers";

interface Props {
	name: string,
	type?: string,
	value?: string,
	placeholder?: string,
	proxyValueName?: string,
	validateOnChange?: boolean,
	onChange?: (value: string) => void,
	simpleValidation?: boolean
}

interface State {
	value: string,
	isValid: boolean
}

export class UIPaymentCardInput extends React.Component<Props, State> {
	context: Context;

	state: State = {
		value: '',
		isValid: true
	};

	private cardFormat: CardsFormat;

	static defaultProps = {
		value: '',
		type: 'text'
	};

	static contextTypes = {
		proxyField: React.PropTypes.func.isRequired,
		updateValue: React.PropTypes.func.isRequired,
		updateValidation: React.PropTypes.func.isRequired,
		registerInput: React.PropTypes.func.isRequired,
		unRegisterInput: React.PropTypes.func.isRequired
	};

	componentDidMount(): void {
		this.context.registerInput(
			FieldType.TEXT,
			this.props.name,
			this.state.value,
			[ValidationType.CARD, ValidationType.REQUIRED],
			[],
			this.onValidated,
			this.onSetValue
		);

		this.updateValues(this.props.value);
		this.cardFormat = new CardsFormat;
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
				[this.props.simpleValidation ? ValidationType.CARD_SIMPLE : ValidationType.CARD, ValidationType.REQUIRED],
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
		this.cardFormat.reFormatCardNumber(event, (value: string) => {

			this.setState({
				value: value
			} as State);

			this.context.updateValue(this.props.name, value + '');

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
		});
	}

	private setValid(valid: boolean): void {
		this.setState({
			isValid: valid
		} as State);
	}

	private getClassName(): string {
		return UtilsService.getClassName(this.state.isValid, 'controls payment-input', 'valid', 'invalid');
	}

	private onEventHandler(event: KeyboardEvent): void {
		if (event.type === 'keypress') {

			if (!this.cardFormat.restrictNumeric(event)) {
				event.preventDefault();
			}

			if (!this.cardFormat.restrictCardNumber(event)) {
				event.preventDefault();
			}

			this.cardFormat.formatCardNumber(event, (value: string) => {
				this.setState({
					value: value
				} as State);
			});
		}

		if (event.type === 'keydown') {
			this.cardFormat.formatBackCardNumber(event, (value: string) => {
				this.setState({
					value: value
				} as State);
			});

		}

		if (event.type === 'keyup') {

		}

		if (event.type === 'paste') {
			this.cardFormat.reFormatCardNumber(event, (value: string) => {
				this.setState({
					value: value
				} as State);
			});
		}

		if (event.type === 'input') {
			this.cardFormat.reFormatCardNumber(event, (value: string) => {
				this.setState({
					value: value
				} as State);
			});
		}

	}

	private getCardTypeStyle(): string {
		let style: string = "payment-input";
		if (this.state.value) {

			let value: number = +this.state.value.replace(/(\s+|\s+)/g, '');
			let type: number = this.cardFormat.cardType(value);

			if (type == CardTypes.discover) {
				style += " discover";
			}

			if (type == CardTypes.amex) {
				style += " amex";
			}

			if (type == CardTypes.mastercard) {
				style += " mastercard";
			}

			if (type == CardTypes.visa) {
				style += " visa";
			}
		}

		return style;
	}

	public render() {
		return (
			<div className={this.getCardTypeStyle()}>
				<input
					onChange={this.setValue.bind(this)}
					onFocus={this.setValid.bind(this, true)}
					onKeyPress={this.onEventHandler.bind(this)}
					onKeyDown={this.onEventHandler.bind(this)}
					onPaste={this.onEventHandler.bind(this)}
					onInput={this.onEventHandler.bind(this)}
					onKeyUp={this.onEventHandler.bind(this)}
					value={this.state.value}
					type={this.props.type}
					className={this.getClassName()}
					placeholder={this.props.placeholder || ''}
				/>
			</div>
		);
	}
}



