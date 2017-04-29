"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var form_1 = require("./form");
var utils_1 = require("../../../services/utils");
var UITextInput = (function (_super) {
    __extends(UITextInput, _super);
    function UITextInput() {
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
            if (typeof value == 'undefined') {
                value = '';
            }
            _this.setState({
                value: value
            });
        };
        return _this;
    }
    UITextInput.prototype.componentDidMount = function () {
        this.context.registerInput(form_1.FieldType.TEXT, this.props.name, this.state.value, this.props.validationTypes || [], this.props.validationParams || [], this.onValidated, this.onSetValue, this.props.invalidateMessage);
        this.updateValues(this.props.value);
    };
    UITextInput.prototype.componentWillUnmount = function () {
        this.context.unRegisterInput(this.props.name);
    };
    UITextInput.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.name !== this.props.name) {
            this.context.unRegisterInput(this.props.name);
            this.context.registerInput(form_1.FieldType.TEXT, nextProps.name, this.state.value, nextProps.validationTypes || [], nextProps.validationParams || [], this.onValidated, this.onSetValue, nextProps.invalidateMessage);
            this.updateValues(this.props.value);
            this.onValidated(true);
        }
    };
    UITextInput.prototype.componentWillUpdate = function (nextProps) {
        if (nextProps.value !== this.props.value) {
            this.updateValues(nextProps.value);
        }
    };
    UITextInput.prototype.updateValues = function (propValue) {
        if (typeof propValue == 'undefined') {
            propValue = '';
        }
        this.setState({
            value: propValue
        });
        this.context.updateValue(this.props.name, propValue);
    };
    UITextInput.prototype.setValue = function (event) {
        var _this = this;
        this.onEventHandler.bind(this, event);
        var value = event.target.value;
        if (typeof value == 'undefined') {
            value = '';
        }
        this.setState({
            value: value
        });
        this.context.updateValue(this.props.name, value);
        if (this.props.validateOnChange) {
            this.context.updateValidation(this.props.name);
        }
        if (this.props.proxyValueName) {
            this.context.proxyField(this.props.proxyValueName, value);
        }
        if (this.props.onChange) {
            setTimeout(function () {
                _this.props.onChange(value);
            }, 0);
        }
    };
    UITextInput.prototype.setValid = function (valid) {
        this.setState({
            isValid: valid
        });
    };
    UITextInput.prototype.getClassName = function () {
        return utils_1.UtilsService.getClassName(this.state.isValid, 'controls', 'valid', 'invalid');
    };
    UITextInput.prototype.onEventHandler = function (event) {
        if (this.props.onEvent) {
            this.props.onEvent(event);
        }
    };
    UITextInput.prototype.render = function () {
        return (React.createElement("input", { placeholder: this.props.placeholder || '', name: this.props.name, onChange: this.setValue.bind(this), onFocus: this.setValid.bind(this, true), onKeyPress: this.onEventHandler.bind(this), onKeyDown: this.onEventHandler.bind(this), onPaste: this.onEventHandler.bind(this), onInput: this.onEventHandler.bind(this), onKeyUp: this.onEventHandler.bind(this), value: this.state.value, type: this.props.type, className: this.getClassName() }));
    };
    return UITextInput;
}(React.Component));
UITextInput.defaultProps = {
    invalidateMessage: '',
    type: 'text'
};
UITextInput.contextTypes = {
    proxyField: React.PropTypes.func.isRequired,
    updateValue: React.PropTypes.func.isRequired,
    updateValidation: React.PropTypes.func.isRequired,
    registerInput: React.PropTypes.func.isRequired,
    unRegisterInput: React.PropTypes.func.isRequired
};
exports.UITextInput = UITextInput;
