import * as React from 'react';
import {UtilsService} from "../../../services/utils";

export enum UIFormMessageType {
	SUCCESS,
	ERROR
}

export interface Props {
	message:string,
	type:UIFormMessageType,
	onClose?:() => void
}

export interface State {

}

export class UIFormMessage extends React.Component<Props, State> {
	private handleClose():void {
		if (this.props.onClose) {
			this.props.onClose();
		}
	}

	public render() {
		let classNameForm:string = UtilsService.getClassName(
			this.props.type === UIFormMessageType.SUCCESS,
			UtilsService.getClassName(
				this.props.message != null,
				'form-message',
				'ready'
			),
			'success',
			'error'
		);

		return (
			<div className={classNameForm} onClick={this.handleClose.bind(this)}>
				{this.props.message}
			</div>
		);
	}
}
