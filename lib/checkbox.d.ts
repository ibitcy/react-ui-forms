/// <reference types="react" />
import * as React from 'react';
export interface FormatLabel {
    id: string;
    values: Object;
}
export interface Props {
    liner?: boolean;
    faded?: boolean;
    checked: boolean;
    label?: any;
    formatLabel?: FormatLabel;
    name: string;
    onChange: (checked: boolean) => void;
}
export interface State {
}
export declare class UiFormCheckbox extends React.Component<Props, State> {
    static defaultProps: {
        liner: boolean;
        faded: boolean;
        label: string;
    };
    private handleChange(event);
    private getLabel(idName);
    render(): JSX.Element;
}
