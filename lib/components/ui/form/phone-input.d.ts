/// <reference types="react" />
import * as React from 'react';
import { Context } from "./form";
export interface Props {
    name: string;
    type?: string;
    value?: string;
    isSng?: boolean;
    placeholder?: string;
    proxyValueName?: string;
    validateOnChange?: boolean;
    onChange?: (value: string) => void;
    phoneDefaultCountrySNG?: string;
    phoneDefaultCountryGlobal?: string;
    iconsPath?: string;
}
export interface State {
    value: string;
    country: string;
    isValid: boolean;
    placeholder: string;
}
export declare class UIPhoneInput extends React.Component<Props, State> {
    context: Context;
    state: State;
    static defaultProps: {
        phoneDefaultCountrySNG: string;
        phoneDefaultCountryGlobal: string;
        type: string;
        iconsPath: string;
        value: string;
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
    private onChangeCountry(key);
    private onClickHandler();
    render(): JSX.Element;
}
