import * as React from 'react';
import {UIDropdown} from 'react-dropdown-ui';
import {UtilsService} from "../../../services/utils";

export interface UIFormColorItem {
	key: string,
	value: string
}

export interface Props {
	items?: UIFormColorItem[],
	defKey: string,
	onChange: Function,
	globalPositionedDropdown?: boolean,
	placeholder?: string,
}

export interface State {

}

export class UIColorSelector extends React.Component<Props, State> {
	state: State = {};

	static defaultProps = {
		items: [
			{key: '#000000', value: 'Black'},
			{key: '#FFFFFF', value: 'White'},
			{key: '#808080', value: 'Gray'},
			{key: '#FF0000', value: 'Red'},
			{key: '#FFFF00', value: 'Yellow'},
			{key: '#3fb572', value: 'Green'},
			{key: '#0006dc', value: 'Blue'},
			{key: '#800080', value: 'Purple'},
		],
		placeholder: ' Choice some color...',
	};

	private handleChange(key): void {
		this.props.onChange(key);
	}

	private getDefaultValue(): any {
		let defVal: any = '';

		this.props.items.forEach((item: UIFormColorItem) => {
			if (item.key == this.props.defKey) {
				defVal = item;
			}
		});

		return defVal;
	}

	public render() {
		let key = this.props.defKey;
		let seletedItem: UIFormColorItem = this.getDefaultValue();
		let selectedValue: string = '';
		let selectedColor = {};

		if (seletedItem) {
			selectedValue = seletedItem.value;
			selectedColor = {background: seletedItem.key};
		}

		let itemsList = this.props.items.map((item, i) => {
			let isActive: boolean = item.key == key;
			let previewColorStyle = {background: item.key};

			return (
				<div key={i} className={UtilsService.getClassName(isActive, 'item', 'active')}
				     onClick={this.handleChange.bind(this, item.key)}>
					<div className="preview-color" style={previewColorStyle}></div>
					<div>{item.value}</div>
				</div>
			);
		});

		return (
			<div className="ui-form-color-select">
				<UIDropdown
					globalPositioned={this.props.globalPositionedDropdown}
					handlerClassName="current"
					itemElementsClassName="item"
				>
					<div className="current"></div>
					<div className="preview-color" style={selectedColor}></div>
					<input type="text" placeholder={this.props.placeholder} readOnly={true} value={selectedValue}
					       className="controls current-position"/>
					<div className="sel-dropdown">
						<div className="items">
							{itemsList}
						</div>
					</div>
				</UIDropdown>
			</div>
		)
	}
}
