/// <reference types="react" />
import * as React from 'react';
import { Context } from "./form";
export interface Props {
    name: string;
    type?: string;
    value?: string;
    placeholder?: string;
    proxyValueName?: string;
    validateOnChange?: boolean;
    onChange?: (value: string) => void;
    simpleValidation?: boolean;
}
export interface State {
    value: string;
    isValid: boolean;
}
export declare class UIPaymentCardInput extends React.Component<Props, State> {
    context: Context;
    state: State;
    private cardFormat;
    static defaultProps: {
        value: string;
        type: string;
    };
    static contextTypes: {
        proxyField: React.Validator<any>;
        updateValue: React.Validator<any>;
        updateValidation: React.Validator<any>;
        registerInput: React.Validator<any>;
        unRegisterInput: React.Validator<any>;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: Props): void;
    componentWillUpdate(nextProps: Props): void;
    private updateValues(propValue);
    private onValidated;
    private onSetValue;
    private setValue(event);
    private setValid(valid);
    private getClassName();
    private onEventHandler(event);
    private getCardTypeStyle();
    render(): JSX.Element;
}
