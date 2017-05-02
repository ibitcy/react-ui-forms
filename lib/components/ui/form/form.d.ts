/// <reference types="react" />
import * as React from 'react';
export declare enum FieldType {
    TEXT = 0,
    AREA = 1,
}
export declare enum ValidationType {
    REQUIRED = 0,
    MIN_LENGTH = 1,
    MAX_LENGTH = 2,
    EMAIL = 3,
    SAME_AS = 4,
    CARD = 5,
    CARD_SIMPLE = 6,
    CARD_EXPIRY = 7,
    PERFECTMONEY = 8,
    WEBMONEY = 9,
    DCPAY = 10,
    PHONE_NUMBER = 11,
    REG_EXP = 12,
}
export interface Props {
    className?: string;
    onSubmitValid: (model: any) => void;
    onSubmitInvalid?: (model: any, invalidModel: {
        [key: string]: string;
    }) => void;
    resetOnSubmitValid: boolean;
}
export interface State {
    invalidMessages: string[];
}
export interface Context {
    proxyField: (name: string, value: string) => void;
    updateValue: (name: string, value: string) => void;
    updateValidation: (name: string) => void;
    registerInput: (type: FieldType, name: string, value: string, validationTypes: ValidationType[], validationParams: any, validated: (isValid: boolean) => void, setValue: (value: string) => void, invalidateMessage?: string) => void;
    unRegisterInput: (name: string) => void;
}
export declare class ReactUiForms extends React.Component<Props, State> {
    state: State;
    private _form;
    private fields;
    private cardFormat;
    static childContextTypes: {
        updateValue: React.Validator<any>;
        proxyField: React.Validator<any>;
        updateValidation: React.Validator<any>;
        registerInput: React.Validator<any>;
        unRegisterInput: React.Validator<any>;
    };
    componentDidMount(): void;
    getChildContext(): {
        proxyField: (name: string, value: string) => void;
        updateValue: (name: string, value: string) => void;
        updateValidation: (name: string) => void;
        registerInput: (type: FieldType, name: string, value: string, validationTypes: ValidationType[], validationParams: any, validated: (isValid: boolean) => void, setValue: (value: string) => void, invalidateMessage?: string) => void;
        unRegisterInput: (name: string) => void;
    };
    private validateField(field);
    private resetForm();
    private proxyValue(name, value);
    private getModel(fields?);
    submit(event?: any): void;
    private getInvalidMessagesArray(fields);
    private getInvalidMessages();
    private getClassName(isActive, baseName, activeName, inactiveName?);
    render(): JSX.Element;
}
