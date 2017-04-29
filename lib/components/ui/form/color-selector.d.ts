/// <reference types="react" />
import * as React from 'react';
export interface UIFormColorItem {
    key: string;
    value: string;
}
export interface Props {
    items?: UIFormColorItem[];
    defKey: string;
    onChange: Function;
    globalPositionedDropdown?: boolean;
    placeholder?: string;
}
export interface State {
}
export declare class UIColorSelector extends React.Component<Props, State> {
    state: State;
    static defaultProps: {
        items: {
            key: string;
            value: string;
        }[];
        placeholder: string;
    };
    private handleChange(key);
    private getDefaultValue();
    render(): JSX.Element;
}
