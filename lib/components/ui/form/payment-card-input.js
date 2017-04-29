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
var UIPaymentCardInput = (function (_super) {
    __extends(UIPaymentCardInput, _super);
    function UIPaymentCardInput() {
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
    UIPaymentCardInput.prototype.componentDidMount = function () {
        this.context.registerInput(form_1.FieldType.TEXT, this.props.name, this.state.value, [form_1.ValidationType.CARD, form_1.ValidationType.REQUIRED], [], this.onValidated, this.onSetValue);
        this.updateValues(this.props.value);
        this.cardFormat = new cards_format_1.CardsFormat;
    };
    UIPaymentCardInput.prototype.componentWillUnmount = function () {
        this.context.unRegisterInput(this.props.name);
    };
    UIPaymentCardInput.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.name !== this.props.name) {
            this.context.unRegisterInput(this.props.name);
            this.context.registerInput(form_1.FieldType.TEXT, nextProps.name, this.state.value, [this.props.simpleValidation ? form_1.ValidationType.CARD_SIMPLE : form_1.ValidationType.CARD, form_1.ValidationType.REQUIRED], [], this.onValidated, this.onSetValue);
            this.updateValues(this.props.value);
        }
    };
    UIPaymentCardInput.prototype.componentWillUpdate = function (nextProps) {
        if (nextProps.value !== this.props.value) {
            this.updateValues(nextProps.value);
        }
    };
    UIPaymentCardInput.prototype.updateValues = function (propValue) {
        this.setState({
            value: propValue
        });
        this.context.updateValue(this.props.name, propValue);
    };
    UIPaymentCardInput.prototype.setValue = function (event) {
        var _this = this;
        this.cardFormat.reFormatCardNumber(event, function (value) {
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
    UIPaymentCardInput.prototype.setValid = function (valid) {
        this.setState({
            isValid: valid
        });
    };
    UIPaymentCardInput.prototype.getClassName = function () {
        return utils_1.UtilsService.getClassName(this.state.isValid, 'controls payment-input', 'valid', 'invalid');
    };
    UIPaymentCardInput.prototype.onEventHandler = function (event) {
        var _this = this;
        if (event.type === 'keypress') {
            if (!this.cardFormat.restrictNumeric(event)) {
                event.preventDefault();
            }
            if (!this.cardFormat.restrictCardNumber(event)) {
                event.preventDefault();
            }
            this.cardFormat.formatCardNumber(event, function (value) {
                _this.setState({
                    value: value
                });
            });
        }
        if (event.type === 'keydown') {
            this.cardFormat.formatBackCardNumber(event, function (value) {
                _this.setState({
                    value: value
                });
            });
        }
        if (event.type === 'keyup') {
        }
        if (event.type === 'paste') {
            this.cardFormat.reFormatCardNumber(event, function (value) {
                _this.setState({
                    value: value
                });
            });
        }
        if (event.type === 'input') {
            this.cardFormat.reFormatCardNumber(event, function (value) {
                _this.setState({
                    value: value
                });
            });
        }
    };
    UIPaymentCardInput.prototype.getCardTypeStyle = function () {
        var style = "payment-input";
        if (this.state.value) {
            var value = +this.state.value.replace(/(\s+|\s+)/g, '');
            var type = this.cardFormat.cardType(value);
            if (type == cards_format_1.CardTypes.discover) {
                style += " discover";
            }
            if (type == cards_format_1.CardTypes.amex) {
                style += " amex";
            }
            if (type == cards_format_1.CardTypes.mastercard) {
                style += " mastercard";
            }
            if (type == cards_format_1.CardTypes.visa) {
                style += " visa";
            }
        }
        return style;
    };
    UIPaymentCardInput.prototype.render = function () {
        return (React.createElement("div", { className: this.getCardTypeStyle() },
            React.createElement("input", { onChange: this.setValue.bind(this), onFocus: this.setValid.bind(this, true), onKeyPress: this.onEventHandler.bind(this), onKeyDown: this.onEventHandler.bind(this), onPaste: this.onEventHandler.bind(this), onInput: this.onEventHandler.bind(this), onKeyUp: this.onEventHandler.bind(this), value: this.state.value, type: this.props.type, className: this.getClassName(), placeholder: this.props.placeholder || '' })));
    };
    return UIPaymentCardInput;
}(React.Component));
UIPaymentCardInput.defaultProps = {
    value: '',
    type: 'text'
};
UIPaymentCardInput.contextTypes = {
    proxyField: React.PropTypes.func.isRequired,
    updateValue: React.PropTypes.func.isRequired,
    updateValidation: React.PropTypes.func.isRequired,
    registerInput: React.PropTypes.func.isRequired,
    unRegisterInput: React.PropTypes.func.isRequired
};
exports.UIPaymentCardInput = UIPaymentCardInput;
