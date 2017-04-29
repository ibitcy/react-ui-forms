import * as _ from 'lodash';
import * as React from 'react';
import {CardsFormat, CardTypes} from 'cards-format';
import * as libphonenumber from 'google-libphonenumber';

export enum FieldType {
	TEXT,
	AREA
}

export enum ValidationType {
	REQUIRED,
	MIN_LENGTH,
	MAX_LENGTH,
	EMAIL,
	SAME_AS,
	CARD,
	CARD_SIMPLE,
	CARD_EXPIRY,
	PERFECTMONEY,
	WEBMONEY,
	DCPAY,
	PHONE_NUMBER,
	REG_EXP
}

export interface Props {
	className?: string,
	onSubmitValid: (model: any) => void,
	onSubmitInvalid?: (model: any, invalidModel: { [key: string]: string }) => void,
	resetOnSubmitValid: boolean
}

export interface State {
	invalidMessages: string[]
}

// TODO: "Do not clear this field" prop must be here, make it please :-)
interface Field {
	type: FieldType,
	name: string,
	valid: boolean,
	value: string,
	validationTypes: ValidationType[],
	validationParams: any,
	validated: (isValid: boolean) => void,
	setValue: (value: string) => void,
	invalidateMessage?: string
}

export interface Context {
	proxyField: (name: string, value: string) => void;
	updateValue: (name: string, value: string) => void;
	updateValidation: (name: string) => void;
	registerInput: (type: FieldType, name: string, value: string, validationTypes: ValidationType[], validationParams: any, validated: (isValid: boolean) => void, setValue: (value: string) => void, invalidateMessage?: string) => void;
	unRegisterInput: (name: string) => void;
}

export class ReactValidForm extends React.Component<Props, State> {
	state: State = {
		invalidMessages: []
	};

	private _form: HTMLFormElement = null;

	private fields: Field[] = [];
	private cardFormat: CardsFormat;

	static childContextTypes = {
		updateValue: React.PropTypes.func.isRequired,
		proxyField: React.PropTypes.func.isRequired,
		updateValidation: React.PropTypes.func.isRequired,
		registerInput: React.PropTypes.func.isRequired,
		unRegisterInput: React.PropTypes.func.isRequired
	};

	componentDidMount() {
		this.cardFormat = new CardsFormat;
	}

	getChildContext() {
		return {
			proxyField: (name: string, value: string) => {
				this.proxyValue(name, value);
			},

			updateValue: (name: string, value: string) => {
				this.fields = this.fields.map((field: Field) => {
					if (field.name == name) {
						field.value = value;
					}

					return field;
				});
			},

			updateValidation: (name: string) => {
				let field: Field = _.find(this.fields, (field: Field) => {
					return field.name == name;
				});

				if (field) {
					let isValid: boolean = this.validateField(field);

					this.fields = this.fields.map((field: Field) => {
						if (field.name == name) {
							field.valid = isValid;
						}

						return field;
					});

					field.validated(isValid);
				}
			},

			registerInput: (type: FieldType, name: string, value: string, validationTypes: ValidationType[], validationParams: any, validated: (isValid: boolean) => void, setValue: (value: string) => void, invalidateMessage?: string) => {
				this.fields.push({
					type: type,
					name: name,
					valid: true,
					value: value,
					validationTypes: validationTypes,
					validationParams: validationParams,
					validated: validated,
					setValue: setValue,
					invalidateMessage: invalidateMessage
				});
			},

			unRegisterInput: (name: string) => {
				this.fields = _.reject(this.fields, (field: Field) => {
					return name == field.name;
				});
			}
		};
	}

	private validateField(field: Field): boolean {
		let validTypes: ValidationType[] = [];
		let invalidTypes: ValidationType[] = [];
		let value: string = field.value;
		let validationParams = field.validationParams;
		let phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

		_.each(field.validationTypes, (validationType: ValidationType, key: number) => {
			let validType: boolean = false;

			switch (validationType) {
				case ValidationType.EMAIL : {
					if (value) {
						var regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

						validType = regExp.test(value);
					} else {
						validType = false;
					}

					break;
				}

				case ValidationType.MIN_LENGTH : {
					validType = true;

					if (validationParams && validationParams[key]) {
						validType = value && value.length >= validationParams[key];
					}

					break;
				}

				case ValidationType.REG_EXP : {
					validType = true;

					if (validationParams && validationParams[key]) {
						let regExp: RegExp = new RegExp(validationParams[key], "ig");
						validType = regExp.test(value);
					}

					break;
				}

				case ValidationType.MAX_LENGTH : {
					validType = true;

					if (validationParams && validationParams[key]) {
						validType = value && value.length <= validationParams[key];
					}

					break;
				}

				case ValidationType.SAME_AS : {
					validType = true;

					if (validationParams && validationParams[key]) {
						let otherField: Field = _.find(this.fields, (field: Field) => {
							return field.name == validationParams[key];
						});

						validType = value && value == otherField.value;
					}

					break;
				}

				case ValidationType.REQUIRED : {
					if (value) {
						validType = true;
					} else {
						validType = false;
					}

					break;
				}

				case ValidationType.CARD : {
					value = value.replace(/(\s+|\s+)/g, '');

					if (this.cardFormat.validateCardNumber(+value)) {
						validType = true;
					} else {
						validType = false;
					}

					break;
				}

				case ValidationType.CARD_SIMPLE : {
					value = value.replace(/(\s+|\s+)/g, '');

					if (this.cardFormat.validateCardNumberSimple(+value)) {
						validType = true;
					} else {
						validType = false;
					}

					break;
				}

				case ValidationType.CARD_EXPIRY : {
					let expiryObj = this.cardFormat.cardExpiryVal(value);

					if (this.cardFormat.validateCardExpiry(expiryObj.month, expiryObj.year)) {
						validType = true;
					} else {
						validType = false;
					}

					break;
				}

				case ValidationType.PERFECTMONEY : {
					if (/[U][0-9]{8}/g.test(value) && value.length == 9) {
						validType = true;
					} else {
						validType = false;
					}

					break;
				}

				case ValidationType.WEBMONEY : {
					if (/[ZER][0-9]{12}/g.test(value) && value.length == 13) {
						validType = true;
					} else {
						validType = false;
					}

					break;
				}

				case ValidationType.DCPAY : {
					if (!/[a-zА-Я]/ig.test(value)) {
						validType = true;
					} else {
						validType = false;
					}

					break;
				}

				case ValidationType.PHONE_NUMBER : {
					if (value) {
						validType = true;
					} else {
						validType = false;
					}
				}
			}

			if (validType) {
				validTypes.push(validationType);
			} else {
				invalidTypes.push(validationType);
			}
		});

		return invalidTypes.length === 0;
	}

	private resetForm(): void {
		_.each(this.fields, (field: Field, i: number) => {
			field.setValue('');

			this.fields[i].value = '';
			this.fields[i].valid = true;
		});
	}

	private proxyValue(name: string, value: string): void {
		_.each(this.fields, (field: Field, i: number) => {
			if (field.name == name) {
				field.setValue(value);

				this.fields[i].value = value;
				this.fields[i].valid = true;
			}
		});
	}

	private getModel(fields?: Field[]): { [key: string]: string } {
		let model: { [key: string]: string } = {};

		let modelFields: Field[] = fields ? fields : this.fields;

		_.each(modelFields, (field: Field) => {
			model[field.name] = field.value;
		});

		return model;
	}

	public submit(event?): void {
		let allIsValid: boolean = true;
		let invalidFields: Field[] = [];

		if (event) {
			event.preventDefault();
		}

		this.setState({
			invalidMessages: []
		} as State);

		_.each(this.fields, (field: Field) => {
			let isValid: boolean = this.validateField(field);

			if (!isValid) {
				allIsValid = false;
				invalidFields.push(field);
			}

			field.validated(isValid);
		});

		this.setState({
			invalidMessages: this.getInvalidMessagesArray(invalidFields)
		} as State);

		if (allIsValid) {
			this.props.onSubmitValid(this.getModel());

			if (this.props.resetOnSubmitValid) {
				this.resetForm();
			}
		} else {
			if (this.props.onSubmitInvalid) {
				this.props.onSubmitInvalid(this.getModel(), this.getModel(invalidFields));
			}
		}
	}

	private getInvalidMessagesArray(fields: Field[]): string[] {
		let messages: string[] = [];

		fields.map((field: Field) => {
			if (field.invalidateMessage && messages.indexOf(field.invalidateMessage) === -1) {
				messages.push(field.invalidateMessage);
			}
		});

		return messages;
	}

	private getInvalidMessages(): JSX.Element[] {
		return this.state.invalidMessages.map((message: string) => {
			return (<p>{message}</p>);
		});
	}

	private getClassName(isActive: boolean, baseName: string, activeName: string, inactiveName?: string): string {
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

	public render() {
		return (
			<form ref={(form) => this._form = form} className={this.props.className || ''}
			      onSubmit={this.submit.bind(this)}>
				<div
					className={this.getClassName(this.state.invalidMessages.length > 0, 'form-message error small-bottom', 'ready')}>
					{this.getInvalidMessages()}
				</div>

				{this.props.children}
			</form>
		);
	}
}



