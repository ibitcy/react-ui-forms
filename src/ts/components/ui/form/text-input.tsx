import * as React from 'react';
import {FieldType, ValidationType, Context} from "./form";
import {UtilsService} from "../../../services/utils";

export interface Props {
	name: string,
	type?: string,
	value?: string,
	placeholder?: string,
	proxyValueName?: string,
	validationTypes?: ValidationType[],
	validationParams?: any,
	validateOnChange?: boolean,
	onChange?: (value: string) => void,
	onEvent?: (event: any) => void,
	invalidateMessage?: string
}

export interface State {
	value: string,
	isValid: boolean
}

export class UITextInput extends React.Component<Props, State> {
	context: Context;

	state: State = {
		value: '',
		isValid: true
	};

	static defaultProps = {
		invalidateMessage: '',
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
			this.props.validationTypes || [],
			this.props.validationParams || [],
			this.onValidated,
			this.onSetValue,
			this.props.invalidateMessage
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
				nextProps.validationTypes || [],
				nextProps.validationParams || [],
				this.onValidated,
				this.onSetValue,
				nextProps.invalidateMessage
			);

			this.updateValues(this.props.value);
			this.onValidated(true);
		}
	}

	componentWillUpdate(nextProps: Props) {
		if (nextProps.value !== this.props.value) {
			this.updateValues(nextProps.value);
		}
	}

	private updateValues(propValue: string): void {
		if (typeof propValue == 'undefined') {
			propValue = '';
		}

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
		if (typeof value == 'undefined') {
			value = '';
		}

		this.setState({
			value: value
		} as State);
	};

	private setValue(event): void {
		this.onEventHandler.bind(this, event);

		let value: string = event.target.value;

		if (typeof value == 'undefined') {
			value = '';
		}

		this.setState({
			value: value
		} as State);

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

	private setValid(valid: boolean): void {
		this.setState({
			isValid: valid
		} as State);
	}

	private getClassName(): string {
		return UtilsService.getClassName(this.state.isValid, 'controls', 'valid', 'invalid');
	}

	private onEventHandler(event): void {
		if (this.props.onEvent) {
			this.props.onEvent(event);
		}
	}

	public render() {
		return (
			<input
				placeholder={this.props.placeholder || ''}
				name={this.props.name}
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
			/>
		);
	}
}



