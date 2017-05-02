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
var UIFormSelector = (function (_super) {
    __extends(UIFormSelector, _super);
    function UIFormSelector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            searchRequest: ''
        };
        return _this;
    }
    UIFormSelector.prototype.handleChange = function (key) {
        this.props.onChange(key);
        this.handleSearchRequest(null, '');
    };
    UIFormSelector.prototype.getDefaultValue = function () {
        var _this = this;
        var defVal = '';
        this.props.items.forEach(function (item) {
            if (item.key == _this.props.defKey) {
                defVal = item.value;
            }
        });
        return defVal;
    };
    UIFormSelector.prototype.handleSearchRequest = function (event, push) {
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
    UIFormSelector.prototype.filterItems = function (searchRequest, items) {
        if (searchRequest) {
            return items.filter(function (item) {
                return item.value.toLowerCase().indexOf(searchRequest.toLowerCase()) >= 0;
            });
        }
        return items;
    };
    UIFormSelector.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        var rule1 = nextProps.items != this.props.items;
        var rule2 = nextProps.defKey != this.props.defKey;
        var rule3 = nextState.searchRequest != this.state.searchRequest;
        if (rule1 || rule2 || rule3) {
            return true;
        }
        return false;
    };
    UIFormSelector.prototype.render = function () {
        var _this = this;
        var key = this.props.defKey;
        var selectedText = this.getDefaultValue();
        var items = this.filterItems(this.state.searchRequest, this.props.items);
        var emptyClass = items.length > 0 ? 'empty' : 'empty active';
        var searchInput = null;
        var dropdownHeight = 0;
        var itemHeight = 38;
        if (items.length > this.props.maxHeightItems) {
            dropdownHeight = this.props.maxHeightItems * itemHeight + 1;
        }
        else {
            dropdownHeight = (items.length + (this.props.search ? 1 : 0)) * itemHeight + 1;
        }
        var itemsList = items.map(function (item, i) {
            var isActive = item.key == key ? true : false;
            return (React.createElement("div", { className: utils_1.UtilsService.getClassName(isActive, 'item', 'active'), onClick: _this.handleChange.bind(_this, item.key), key: i }, item.value));
        });
        if (this.props.search === true) {
            searchInput = (React.createElement("input", { type: "text", placeholder: this.props.searchPlaceholder, className: "controls", value: this.state.searchRequest, onChange: this.handleSearchRequest.bind(this) }));
        }
        return (React.createElement("div", { className: "ui-form-select" },
            React.createElement(react_dropdown_ui_1.UIDropdown, { globalPositioned: this.props.globalPositionedDropdown, handlerClassName: "current", itemElementsClassName: "item" },
                React.createElement("div", { className: "current" }),
                React.createElement("input", { type: "text", placeholder: this.props.placeholder, readOnly: true, value: selectedText, className: "controls current-position" }),
                React.createElement("div", { className: "sel-dropdown", style: { height: dropdownHeight } },
                    searchInput,
                    React.createElement(react_custom_scrollbar_1.CustomScrollBar, { allowOuterScroll: false, heightRelativeToParent: "calc(100% - " + ((this.props.search) ? itemHeight : '0') + "px)", onScroll: function () {
                        }, addScrolledClass: true, freezePosition: false, handleClass: "inner-handle", minScrollHandleHeight: 38 },
                        React.createElement("div", { className: "items" },
                            itemsList,
                            React.createElement("div", { className: emptyClass }, this.props.searchEmptyMessage)))))));
    };
    return UIFormSelector;
}(React.Component));
UIFormSelector.defaultProps = {
    search: true,
    placeholder: null,
    maxHeightItems: 5,
    searchPlaceholder: 'Search here...',
    searchEmptyMessage: 'Empty...'
};
exports.UIFormSelector = UIFormSelector;
