/// <reference types="react" />
import * as React from 'react';
export declare enum UIFormMessageType {
    SUCCESS = 0,
    ERROR = 1,
}
export interface Props {
    message: string;
    type: UIFormMessageType;
    onClose?: () => void;
}
export interface State {
}
export declare class UIFormMessage extends React.Component<Props, State> {
    private handleClose();
    render(): JSX.Element;
}
