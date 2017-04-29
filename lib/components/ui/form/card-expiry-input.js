"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var form_1 = require("./form");
var utils_1 = require("../../../services/utils");
var cards_format_1 = require("cards-format");
var UICardExpiryInput = (function (_super) {
    __extends(UICardExpiryInput, _super);
    function UICardExpiryInput() {
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
    UICardExpiryInput.prototype.componentDidMount = function () {
        this.context.registerInput(form_1.FieldType.TEXT, this.props.name, this.state.value, [form_1.ValidationType.CARD_EXPIRY, form_1.ValidationType.REQUIRED], [], this.onValidated, this.onSetValue);
        this.updateValues(this.props.value);
        this.cardFormat = new cards_format_1.CardsFormat;
    };
    UICardExpiryInput.prototype.componentWillUnmount = function () {
        this.context.unRegisterInput(this.props.name);
    };
    UICardExpiryInput.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.name !== this.props.name) {
            this.context.unRegisterInput(this.props.name);
            this.context.registerInput(form_1.FieldType.TEXT, nextProps.name, this.state.value, [form_1.ValidationType.CARD_EXPIRY, form_1.ValidationType.REQUIRED], [], this.onValidated, this.onSetValue);
            this.updateValues(this.props.value);
        }
    };
    UICardExpiryInput.prototype.componentWillUpdate = function (nextProps) {
        if (nextProps.value !== this.props.value) {
            this.updateValues(nextProps.value);
        }
    };
    UICardExpiryInput.prototype.updateValues = function (propValue) {
        this.setState({
            value: propValue
        });
        this.context.updateValue(this.props.name, propValue);
    };
    UICardExpiryInput.prototype.setValue = function (event) {
        var _this = this;
        this.cardFormat.reFormatExpiry(event, function (value) {
            _this.setState({
                value: value
            });
            _this.context.updateValue(_this.props.name, value + '');
            if (_this.props.validateOnChange) {
                _this.context.updateValidation(_this.props.name);
            }
            if (_this.props.proxyValueName) {
                _this.context.proxyField(_this.props.proxyValueName, value);
            }
            if (_this.props.onChange) {
                setTimeout(function () {
                    _this.props.onChange(value);
                }, 0);
            }
        });
    };
    UICardExpiryInput.prototype.setValid = function (valid) {
        this.setState({
            isValid: valid
        });
    };
    UICardExpiryInput.prototype.getClassName = function () {
        return utils_1.UtilsService.getClassName(this.state.isValid, 'controls', 'valid', 'invalid');
    };
    UICardExpiryInput.prototype.render = function () {
        return (React.createElement("input", { placeholder: this.props.placeholder || '', name: this.props.name, onChange: this.setValue.bind(this), onFocus: this.setValid.bind(this, true), value: this.state.value, type: this.props.type, className: this.getClassName() }));
    };
    return UICardExpiryInput;
}(React.Component));
UICardExpiryInput.contextTypes = {
    proxyField: React.PropTypes.func.isRequired,
    updateValue: React.PropTypes.func.isRequired,
    updateValidation: React.PropTypes.func.isRequired,
    registerInput: React.PropTypes.func.isRequired,
    unRegisterInput: React.PropTypes.func.isRequired
};
UICardExpiryInput.defaultProps = {
    value: '',
    type: 'text'
};
exports.UICardExpiryInput = UICardExpiryInput;
