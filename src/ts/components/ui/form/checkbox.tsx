import * as React from 'react';

export interface FormatLabel {
	id:string,
	values:Object
}

interface Props {
	liner?:boolean,
	faded?:boolean,
	checked:boolean,
	label?:any,
	formatLabel?:FormatLabel
	name:string,
	onChange:(checked:boolean) => void
}

interface State {

}

export class UiFormCheckbox extends React.Component<Props, State> {
	static defaultProps = {
		liner: false,
		faded: false,
		label: ''
	};

	private handleChange(event):void {
		this.props.onChange(event.target.checked);
	}

	private getLabel(idName) {
		if (this.props.formatLabel) {
			return (
				<label htmlFor={idName}>
					{this.props.label}
				</label>
			)
		} else {
			return (
				<label htmlFor={idName}>
					{this.props.label}
				</label>
			)
		}

	}

	public render() {
		let idName:string = 'chk-' + this.props.name;
		let className:string = (this.props.faded ? 'faded ' : '') + (this.props.liner ? 'liner-checkbox' : 'checkbox');

		if (!this.props.label) {
			className += ' no-label';
		}

		return (
			<span className={className}>
                <input
					className={className}
					type="checkbox"
					name={this.props.name}
					id={idName}
					checked={this.props.checked}
					onChange={this.handleChange.bind(this)}
				/>

				{this.getLabel(idName)}
            </span>
		)
	}
}



