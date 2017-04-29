import * as React from 'react';
import {UIDropdown} from 'react-ui-dropdown';
import {UtilsService} from "../../../services/utils";
import {CustomScrollBar} from 'react-custom-scrollbar';

export interface UIFormSelectorItem {
	key: any,
	value: string
}

export interface Props {
	isSng?: boolean,
	defKey: any,
	onChange: (key: any) => void,
	placeholder?: string,
	maxHeightItems?: number,
	iconsPath?: string
}

export interface State {
	items: UIFormSelectorItem[],
	searchRequest: string
}

const COUNTRIES_SNG: string[] = ['RU', 'UA', 'KZ', 'AZ', 'LV', 'LT', 'KG', 'GE', 'TJ', 'MD', 'IN', 'KR', 'EE', 'BY', 'AM', 'GB', 'UZ', 'IL', 'TH', 'TR', 'JP', 'US', 'PA', 'VN'];
const COUNTRIES_GLOBAL: string[] = ['AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CC', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FM', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HM', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IR', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PW', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SY', 'SZ', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'UM', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI', 'VN', 'VU', 'WF', 'WS', 'YE', 'YT', 'ZA', 'ZM', 'ZW'];

export class UICountrySelector extends React.Component<Props, State> {
	state: State = {
		searchRequest: '',
		items: []
	};

	static defaultProps = {
		placeholder: '',
		isSng: false,
		maxHeightItems: 5,
		iconsPath: ''
	};

	private getItems(from: string[]): UIFormSelectorItem[] {
		return from.map((item: string) => {
			return {
				key: item,
				value: item
			};
		});
	}

	private handleChange(key: any): void {
		this.props.onChange(key);
		this.handleSearchRequest(null, '');
	}

	private handleSearchRequest(event, push ?: string): void {
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
		let rule1 = nextState.items !== this.state.items;
		let rule2 = nextProps.defKey !== this.props.defKey;
		let rule3 = nextState.searchRequest !== this.state.searchRequest;

		return rule1 || rule2 || rule3;
	}

	componentDidMount(): void {
		this.setState({
			items: this.getItems(this.props.isSng ? COUNTRIES_SNG : COUNTRIES_GLOBAL)
		} as State);
	}

	private getIcon(): JSX.Element {
		if (this.props.defKey) {
			return (
				<img className="country-icon"
				     src={this.props.iconsPath + `${this.props.defKey.toLowerCase()}.svg`}
				     width="16"/>
			)
		}
	}

	public render() {
		let key: any = this.props.defKey;
		let items: UIFormSelectorItem[] = this.filterItems(this.state.searchRequest, this.state.items);
		let dropdownHeight: number = 0;
		let itemHeight: number = 38;

		if (items.length > this.props.maxHeightItems) {
			dropdownHeight = this.props.maxHeightItems * itemHeight + 1;
		} else {
			dropdownHeight = this.props.maxHeightItems * itemHeight + 1;
		}

		let itemsList = items.map((item, i) => {
			let isActive: boolean = item.key == key ? true : false;

			return (
				<div
					className={UtilsService.getClassName(isActive, 'item', 'active')}
					onClick={this.handleChange.bind(this, item.key)}
					key={i}>
					<img src={this.props.iconsPath + `${item.key.toLowerCase()}.svg`}
					     width="16"/>
					{item.value}
				</div>
			);
		});

		return (
			<div className="ui-form-select">
				<UIDropdown handlerClassName="current" itemElementsClassName="item">
					<div className="current"></div>

					{this.getIcon()}

					<input
						type="text"
						placeholder={this.props.placeholder}
						readOnly={true}
						value=""
						className="controls current-position"
					/>

					<div className="sel-dropdown" style={{height: dropdownHeight}}>
						<CustomScrollBar
							allowOuterScroll={false}
							heightRelativeToParent={`100%`}
							onScroll={() => {
							}} addScrolledClass={true}
							freezePosition={false}
							handleClass="inner-handle"
							minScrollHandleHeight={38}
						>
							<div className="items items-country">
								{itemsList}
							</div>
						</CustomScrollBar>
					</div>
				</UIDropdown>
			</div>
		)
	}
}