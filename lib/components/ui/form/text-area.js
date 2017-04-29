"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var form_1 = require("./form");
var utils_1 = require("../../../services/utils");
var UITextArea = (function (_super) {
    __extends(UITextArea, _super);
    function UITextArea() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            value: '',
            isValid: true
        };
        _this.onValidated = function (isValid) {
            _this.setState({
                isValid: isValid
            });
        };
        _this.onSetValue = function (value) {
            _this.setState({
                value: value
            });
        };
        return _this;
    }
    UITextArea.prototype.componentDidMount = function () {
        this.context.registerInput(form_1.FieldType.AREA, this.props.name, this.state.value, this.props.validationTypes || [], this.props.validationParams || [], this.onValidated, this.onSetValue);
        if (this.props.value) {
            this.onSetValue(this.props.value);
            this.context.updateValue(this.props.name, this.props.value);
        }
    };
    UITextArea.prototype.setValue = function (event) {
        this.setState({
            value: event.currentTarget.value
        });
        this.context.updateValue(this.props.name, event.currentTarget.value);
        if (this.props.validateOnChange) {
            this.context.updateValidation(this.props.name);
        }
        if (this.props.proxyValueName) {
            this.context.proxyField(this.props.proxyValueName, event.currentTarget.value);
        }
    };
    UITextArea.prototype.setValid = function (valid) {
        this.setState({
            isValid: valid
        });
    };
    UITextArea.prototype.getClassName = function () {
        return utils_1.UtilsService.getClassName(this.state.isValid, 'controls', 'valid', 'invalid');
    };
    UITextArea.prototype.render = function () {
        return (React.createElement("textarea", { name: this.props.name, placeholder: this.props.placeholder || '', onChange: this.setValue.bind(this), onFocus: this.setValid.bind(this, true), value: this.state.value, className: this.getClassName() }));
    };
    return UITextArea;
}(React.Component));
UITextArea.contextTypes = {
    proxyField: React.PropTypes.func.isRequired,
    updateValue: React.PropTypes.func.isRequired,
    updateValidation: React.PropTypes.func.isRequired,
    registerInput: React.PropTypes.func.isRequired
};
UITextArea.defaultProps = {
    value: ''
};
exports.UITextArea = UITextArea;
