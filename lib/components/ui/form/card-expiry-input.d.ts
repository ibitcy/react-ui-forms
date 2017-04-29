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
}
export interface State {
    value: string;
    isValid: boolean;
}
export declare class UICardExpiryInput extends React.Component<Props, State> {
    context: Context;
    private cardFormat;
    state: State;
    static contextTypes: {
        proxyField: React.Validator<any>;
        updateValue: React.Validator<any>;
        updateValidation: React.Validator<any>;
        registerInput: React.Validator<any>;
        unRegisterInput: React.Validator<any>;
    };
    static defaultProps: {
        value: string;
        type: string;
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
    render(): JSX.Element;
}
