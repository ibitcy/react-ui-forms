"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var react_dropdown_ui_1 = require("react-dropdown-ui");
var utils_1 = require("../../../services/utils");
var UIColorSelector = (function (_super) {
    __extends(UIColorSelector, _super);
    function UIColorSelector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        return _this;
    }
    UIColorSelector.prototype.handleChange = function (key) {
        this.props.onChange(key);
    };
    UIColorSelector.prototype.getDefaultValue = function () {
        var _this = this;
        var defVal = '';
        this.props.items.forEach(function (item) {
            if (item.key == _this.props.defKey) {
                defVal = item;
            }
        });
        return defVal;
    };
    UIColorSelector.prototype.render = function () {
        var _this = this;
        var key = this.props.defKey;
        var seletedItem = this.getDefaultValue();
        var selectedValue = '';
        var selectedColor = {};
        if (seletedItem) {
            selectedValue = seletedItem.value;
            selectedColor = { background: seletedItem.key };
        }
        var itemsList = this.props.items.map(function (item, i) {
            var isActive = item.key == key;
            var previewColorStyle = { background: item.key };
            return (React.createElement("div", { key: i, className: utils_1.UtilsService.getClassName(isActive, 'item', 'active'), onClick: _this.handleChange.bind(_this, item.key) },
                React.createElement("div", { className: "preview-color", style: previewColorStyle }),
                React.createElement("div", null, item.value)));
        });
        return (React.createElement("div", { className: "ui-form-color-select" },
            React.createElement(react_dropdown_ui_1.UIDropdown, { globalPositioned: this.props.globalPositionedDropdown, handlerClassName: "current", itemElementsClassName: "item" },
                React.createElement("div", { className: "current" }),
                React.createElement("div", { className: "preview-color", style: selectedColor }),
                React.createElement("input", { type: "text", placeholder: this.props.placeholder, readOnly: true, value: selectedValue, className: "controls current-position" }),
                React.createElement("div", { className: "sel-dropdown" },
                    React.createElement("div", { className: "items" }, itemsList)))));
    };
    return UIColorSelector;
}(React.Component));
UIColorSelector.defaultProps = {
    items: [
        { key: '#000000', value: 'Black' },
        { key: '#FFFFFF', value: 'White' },
        { key: '#808080', value: 'Gray' },
        { key: '#FF0000', value: 'Red' },
        { key: '#FFFF00', value: 'Yellow' },
        { key: '#3fb572', value: 'Green' },
        { key: '#0006dc', value: 'Blue' },
        { key: '#800080', value: 'Purple' },
    ],
    placeholder: ' Choice some color...',
};
exports.UIColorSelector = UIColorSelector;
