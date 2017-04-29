import * as React from 'react';
import {FieldType, ValidationType, Context} from "./form";
import {UtilsService} from "../../../services/utils";
import {CardsFormat} from 'cards-format';

export interface Props {
	name: string,
	type?: string,
	value?: string,
	placeholder?: string,
	proxyValueName?: string,
	validateOnChange?: boolean,
	onChange?: (value: string) => void
}

export interface State {
	value: string,
	isValid: boolean
}

export class UICardExpiryInput extends React.Component<Props, State> {
	context: Context;

	private cardFormat: CardsFormat;

	state: State = {
		value: '',
		isValid: true
	};

	static contextTypes = {
		proxyField: React.PropTypes.func.isRequired,
		updateValue: React.PropTypes.func.isRequired,
		updateValidation: React.PropTypes.func.isRequired,
		registerInput: React.PropTypes.func.isRequired,
		unRegisterInput: React.PropTypes.func.isRequired
	};

	static defaultProps = {
		value: '',
		type: 'text'
	};

	componentDidMount(): void {
		this.context.registerInput(
			FieldType.TEXT,
			this.props.name,
			this.state.value,
			[ValidationType.CARD_EXPIRY, ValidationType.REQUIRED],
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

		this.cardFormat.reFormatExpiry(event, (value: string) => {
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
		return UtilsService.getClassName(this.state.isValid, 'controls', 'valid', 'invalid');
	}

	public render() {
		return (
			<input
				placeholder={this.props.placeholder || ''}
				name={this.props.name}
				onChange={this.setValue.bind(this)}
				onFocus={this.setValid.bind(this, true)}
				value={this.state.value}
				type={this.props.type}
				className={this.getClassName()}
			/>
		);
	}
}



