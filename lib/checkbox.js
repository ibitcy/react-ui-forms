"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var UiFormCheckbox = (function (_super) {
    __extends(UiFormCheckbox, _super);
    function UiFormCheckbox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UiFormCheckbox.prototype.handleChange = function (event) {
        this.props.onChange(event.target.checked);
    };
    UiFormCheckbox.prototype.getLabel = function (idName) {
        if (this.props.formatLabel) {
            return (React.createElement("label", { htmlFor: idName }, this.props.label));
        }
        else {
            return (React.createElement("label", { htmlFor: idName }, this.props.label));
        }
    };
    UiFormCheckbox.prototype.render = function () {
        var idName = 'chk-' + this.props.name;
        var className = (this.props.faded ? 'faded ' : '') + (this.props.liner ? 'liner-checkbox' : 'checkbox');
        if (!this.props.label) {
            className += ' no-label';
        }
        return (React.createElement("span", { className: className },
            React.createElement("input", { className: className, type: "checkbox", name: this.props.name, id: idName, checked: this.props.checked, onChange: this.handleChange.bind(this) }),
            this.getLabel(idName)));
    };
    return UiFormCheckbox;
}(React.Component));
UiFormCheckbox.defaultProps = {
    liner: false,
    faded: false,
    label: ''
};
exports.UiFormCheckbox = UiFormCheckbox;
