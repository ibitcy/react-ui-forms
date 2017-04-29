/// <reference types="react" />
import * as React from 'react';
export interface UIFormSelectorItem {
    key: any;
    value: string;
}
export interface Props {
    items: UIFormSelectorItem[];
    defKey: any;
    onChange: (key: any) => void;
    search?: boolean;
    searchPlaceholder?: string;
    searchEmptyMessage?: string;
    placeholder?: string;
    globalPositionedDropdown?: boolean;
    maxHeightItems?: number;
}
export interface State {
    searchRequest: string;
}
export declare class UIFormSelector extends React.Component<Props, State> {
    state: State;
    static defaultProps: Props;
    private handleChange(key);
    private getDefaultValue();
    private handleSearchRequest(event, push?);
    private filterItems(searchRequest, items);
    shouldComponentUpdate(nextProps: Props, nextState: State): boolean;
    render(): JSX.Element;
}
