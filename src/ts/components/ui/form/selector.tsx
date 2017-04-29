import * as React from 'react';
import {UIDropdown} from 'react-ui-dropdown';
import {UtilsService} from "../../../services/utils";
import {CustomScrollBar} from 'react-custom-scrollbar';

export interface UIFormSelectorItem {
	key: any,
	value: string
}

export interface Props {
	items: UIFormSelectorItem[],
	defKey: any,
	onChange: (key: any) => void,
	search?: boolean,
	searchPlaceholder?: string,
	searchEmptyMessage?: string,
	placeholder?: string,
	globalPositionedDropdown?: boolean,
	maxHeightItems?: number,
}

export interface State {
	searchRequest: string
}

export class UIFormSelector extends React.Component<Props, State> {
	state: State = {
		searchRequest: ''
	};

	static defaultProps = {
		search: true,
		placeholder: null,
		maxHeightItems: 5,
		searchPlaceholder: 'Search here...',
		searchEmptyMessage: 'Empty...'
	} as Props;

	private handleChange(key: any): void {
		this.props.onChange(key);

		this.handleSearchRequest(null, '');
	}

	private getDefaultValue(): any {
		let defVal: any = '';

		this.props.items.forEach((item: UIFormSelectorItem) => {
			if (item.key == this.props.defKey) {
				defVal = item.value;
			}
		});

		return defVal;
	}

	private handleSearchRequest(event, push?: string): void {
		let value: string = '';

		if (event) {
			value = event.target.value;
		}

		if (push) {
			value = push;
		}

		this.setState({
			searchRequest: value
		} as State);
	}

	private filterItems(searchRequest: string, items: UIFormSelectorItem[]): UIFormSelectorItem[] {
		if (searchRequest) {
			return items.filter((item: UIFormSelectorItem) => {
				return item.value.toLowerCase().indexOf(searchRequest.toLowerCase()) >= 0;
			});
		}

		return items;
	}

	shouldComponentUpdate(nextProps: Props, nextState: State) {
		let rule1 = nextProps.items != this.props.items;
		let rule2 = nextProps.defKey != this.props.defKey;
		let rule3 = nextState.searchRequest != this.state.searchRequest;

		if (rule1 || rule2 || rule3) {
			return true;
		}

		return false;
	}

	public render() {
		let key: any = this.props.defKey;
		let selectedText: string = this.getDefaultValue();
		let items: UIFormSelectorItem[] = this.filterItems(this.state.searchRequest, this.props.items);
		let emptyClass: string = items.length > 0 ? 'empty' : 'empty active';
		let searchInput: any = null;
		let dropdownHeight: number = 0;
		let itemHeight: number = 38;

		if (items.length > this.props.maxHeightItems) {
			dropdownHeight = this.props.maxHeightItems * itemHeight + 1;
		} else {
			dropdownHeight = (items.length + (this.props.search ? 1 : 0)) * itemHeight + 1;
		}

		let itemsList = items.map((item, i) => {
			let isActive: boolean = item.key == key ? true : false;

			return (
				<div
					className={UtilsService.getClassName(isActive, 'item', 'active')}
					onClick={this.handleChange.bind(this, item.key)}
					key={i}>
					{item.value}
				</div>
			);
		});

		if (this.props.search === true) {
			searchInput = (
				<input
					type="text"
					placeholder={this.props.searchPlaceholder}
					className="controls"
					value={this.state.searchRequest}
					onChange={this.handleSearchRequest.bind(this)}
				/>
			);
		}

		return (
			<div className="ui-form-select">
				<UIDropdown globalPositioned={this.props.globalPositionedDropdown} handlerClassName="current"
				            itemElementsClassName="item">
					<div className="current"></div>

					<input
						type="text"
						placeholder={this.props.placeholder}
						readOnly={true}
						value={selectedText}
						className="controls current-position"
					/>

					<div className="sel-dropdown" style={{height: dropdownHeight}}>
						{searchInput}

						<CustomScrollBar
							allowOuterScroll={false}
							heightRelativeToParent={`calc(100% - ${(this.props.search) ? itemHeight : '0'}px)`}
							onScroll={() => {
							}} addScrolledClass={true}
							freezePosition={false}
							handleClass="inner-handle"
							minScrollHandleHeight={38}
						>
							<div className="items">
								{itemsList}

								<div className={emptyClass}>
									{this.props.searchEmptyMessage}
								</div>
							</div>
						</CustomScrollBar>
					</div>
				</UIDropdown>
			</div>
		)
	}
}