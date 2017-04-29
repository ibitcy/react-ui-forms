/// <reference types="react" />
import * as React from 'react';
export interface UIFormSelectorItem {
    key: any;
    value: string;
}
export interface Props {
    isSng?: boolean;
    defKey: any;
    onChange: (key: any) => void;
    placeholder?: string;
    maxHeightItems?: number;
    iconsPath?: string;
}
export interface State {
    items: UIFormSelectorItem[];
    searchRequest: string;
}
export declare class UICountrySelector extends React.Component<Props, State> {
    state: State;
    static defaultProps: {
        placeholder: string;
        isSng: boolean;
        maxHeightItems: number;
        iconsPath: string;
    };
    private getItems(from);
    private handleChange(key);
    private handleSearchRequest(event, push?);
    private filterItems(searchRequest, items);
    shouldComponentUpdate(nextProps: Props, nextState: State): boolean;
    componentDidMount(): void;
    private getIcon();
    render(): JSX.Element;
}
