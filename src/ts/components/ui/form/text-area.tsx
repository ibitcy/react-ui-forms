import * as React from 'react';
import {FieldType, ValidationType, Context} from "./form";
import {UtilsService} from "../../../services/utils";

export interface Props {
	name: string,
	value?: string,
	placeholder?: string,
	validationTypes?: ValidationType[],
	validationParams?: any,
	validateOnChange?: boolean,
	proxyValueName?: string
}

export interface State {
	value: string,
	isValid: boolean
}

export class UITextArea extends React.Component<Props, State> {
	context: Context;

	state: State = {
		value: '',
		isValid: true
	};

	static contextTypes = {
		proxyField: React.PropTypes.func.isRequired,
		updateValue: React.PropTypes.func.isRequired,
		updateValidation: React.PropTypes.func.isRequired,
		registerInput: React.PropTypes.func.isRequired
	};

	static defaultProps = {
		value: ''
	};

	componentDidMount(): void {
		this.context.registerInput(
			FieldType.AREA,
			this.props.name,
			this.state.value,
			this.props.validationTypes || [],
			this.props.validationParams || [],
			this.onValidated,
			this.onSetValue
		);

		if (this.props.value) {
			this.onSetValue(this.props.value);
			this.context.updateValue(this.props.name, this.props.value);
		}
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
		this.setState({
			value: event.currentTarget.value
		} as State);

		this.context.updateValue(this.props.name, event.currentTarget.value);

		if (this.props.validateOnChange) {
			this.context.updateValidation(this.props.name);
		}

		if (this.props.proxyValueName) {
			this.context.proxyField(this.props.proxyValueName, event.currentTarget.value);
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

	public render() {
		return (
			<textarea
				name={this.props.name}
				placeholder={this.props.placeholder || ''}
				onChange={this.setValue.bind(this)}
				onFocus={this.setValid.bind(this, true)}
				value={this.state.value}
				className={this.getClassName()}
			/>
		);
	}
}
