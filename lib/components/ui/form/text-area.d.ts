/// <reference types="react" />
import * as React from 'react';
import { ValidationType, Context } from "./form";
export interface Props {
    name: string;
    value?: string;
    placeholder?: string;
    validationTypes?: ValidationType[];
    validationParams?: any;
    validateOnChange?: boolean;
    proxyValueName?: string;
}
export interface State {
    value: string;
    isValid: boolean;
}
export declare class UITextArea extends React.Component<Props, State> {
    context: Context;
    state: State;
    static contextTypes: {
        proxyField: React.Validator<any>;
        updateValue: React.Validator<any>;
        updateValidation: React.Validator<any>;
        registerInput: React.Validator<any>;
    };
    static defaultProps: {
        value: string;
    };
    componentDidMount(): void;
    private onValidated;
    private onSetValue;
    private setValue(event);
    private setValid(valid);
    private getClassName();
    render(): JSX.Element;
}
