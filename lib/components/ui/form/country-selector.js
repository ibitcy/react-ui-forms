"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var react_dropdown_ui_1 = require("react-dropdown-ui");
var utils_1 = require("../../../services/utils");
var react_custom_scrollbar_1 = require("react-custom-scrollbar");
var COUNTRIES_SNG = ['RU', 'UA', 'KZ', 'AZ', 'LV', 'LT', 'KG', 'GE', 'TJ', 'MD', 'IN', 'KR', 'EE', 'BY', 'AM', 'GB', 'UZ', 'IL', 'TH', 'TR', 'JP', 'US', 'PA', 'VN'];
var COUNTRIES_GLOBAL = ['AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CC', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FM', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HM', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IR', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PW', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SY', 'SZ', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'UM', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI', 'VN', 'VU', 'WF', 'WS', 'YE', 'YT', 'ZA', 'ZM', 'ZW'];
var UICountrySelector = (function (_super) {
    __extends(UICountrySelector, _super);
    function UICountrySelector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            searchRequest: '',
            items: []
        };
        return _this;
    }
    UICountrySelector.prototype.getItems = function (from) {
        return from.map(function (item) {
            return {
                key: item,
                value: item
            };
        });
    };
    UICountrySelector.prototype.handleChange = function (key) {
        this.props.onChange(key);
        this.handleSearchRequest(null, '');
    };
    UICountrySelector.prototype.handleSearchRequest = function (event, push) {
        var value = '';
        if (event) {
            value = event.target.value;
        }
        if (push) {
            value = push;
        }
        this.setState({
            searchRequest: value
        });
    };
    UICountrySelector.prototype.filterItems = function (searchRequest, items) {
        if (searchRequest) {
            return items.filter(function (item) {
                return item.value.toLowerCase().indexOf(searchRequest.toLowerCase()) >= 0;
            });
        }
        return items;
    };
    UICountrySelector.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        var rule1 = nextState.items !== this.state.items;
        var rule2 = nextProps.defKey !== this.props.defKey;
        var rule3 = nextState.searchRequest !== this.state.searchRequest;
        return rule1 || rule2 || rule3;
    };
    UICountrySelector.prototype.componentDidMount = function () {
        this.setState({
            items: this.getItems(this.props.isSng ? COUNTRIES_SNG : COUNTRIES_GLOBAL)
        });
    };
    UICountrySelector.prototype.getIcon = function () {
        if (this.props.defKey) {
            return (React.createElement("img", { className: "country-icon", src: this.props.iconsPath + (this.props.defKey.toLowerCase() + ".svg"), width: "16" }));
        }
    };
    UICountrySelector.prototype.render = function () {
        var _this = this;
        var key = this.props.defKey;
        var items = this.filterItems(this.state.searchRequest, this.state.items);
        var dropdownHeight = 0;
        var itemHeight = 38;
        if (items.length > this.props.maxHeightItems) {
            dropdownHeight = this.props.maxHeightItems * itemHeight + 1;
        }
        else {
            dropdownHeight = this.props.maxHeightItems * itemHeight + 1;
        }
        var itemsList = items.map(function (item, i) {
            var isActive = item.key == key ? true : false;
            return (React.createElement("div", { className: utils_1.UtilsService.getClassName(isActive, 'item', 'active'), onClick: _this.handleChange.bind(_this, item.key), key: i },
                React.createElement("img", { src: _this.props.iconsPath + (item.key.toLowerCase() + ".svg"), width: "16" }),
                item.value));
        });
        return (React.createElement("div", { className: "ui-form-select" },
            React.createElement(react_dropdown_ui_1.UIDropdown, { handlerClassName: "current", itemElementsClassName: "item" },
                React.createElement("div", { className: "current" }),
                this.getIcon(),
                React.createElement("input", { type: "text", placeholder: this.props.placeholder, readOnly: true, value: "", className: "controls current-position" }),
                React.createElement("div", { className: "sel-dropdown", style: { height: dropdownHeight } },
                    React.createElement(react_custom_scrollbar_1.CustomScrollBar, { allowOuterScroll: false, heightRelativeToParent: "100%", onScroll: function () {
                        }, addScrolledClass: true, freezePosition: false, handleClass: "inner-handle", minScrollHandleHeight: 38 },
                        React.createElement("div", { className: "items items-country" }, itemsList))))));
    };
    return UICountrySelector;
}(React.Component));
UICountrySelector.defaultProps = {
    placeholder: '',
    isSng: false,
    maxHeightItems: 5,
    iconsPath: ''
};
exports.UICountrySelector = UICountrySelector;
