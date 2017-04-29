"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var form_1 = require("./form");
var utils_1 = require("../../../services/utils");
var libphonenumber = require("google-libphonenumber");
var country_selector_1 = require("./country-selector");
var UIPhoneInput = (function (_super) {
    __extends(UIPhoneInput, _super);
    function UIPhoneInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            value: '',
            country: null,
            isValid: true,
            placeholder: ''
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
    UIPhoneInput.prototype.componentDidMount = function () {
        this.onChangeCountry(this.props.isSng ? this.props.phoneDefaultCountrySNG : this.props.phoneDefaultCountryGlobal);
        this.context.registerInput(form_1.FieldType.TEXT, this.props.name, this.state.value, [form_1.ValidationType.PHONE_NUMBER, form_1.ValidationType.REQUIRED], [], this.onValidated, this.onSetValue);
        this.updateValues(this.props.value);
    };
    UIPhoneInput.prototype.componentWillUnmount = function () {
        this.context.unRegisterInput(this.props.name);
    };
    UIPhoneInput.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.name !== this.props.name) {
            this.context.unRegisterInput(this.props.name);
            this.context.registerInput(form_1.FieldType.TEXT, nextProps.name, this.state.value, [form_1.ValidationType.CARD_EXPIRY, form_1.ValidationType.REQUIRED], [], this.onValidated, this.onSetValue);
            this.updateValues(this.props.value);
        }
    };
    UIPhoneInput.prototype.componentWillUpdate = function (nextProps) {
        if (nextProps.value !== this.props.value) {
            this.updateValues(nextProps.value);
        }
    };
    UIPhoneInput.prototype.updateValues = function (propValue) {
        this.setState({
            value: propValue
        });
        this.context.updateValue(this.props.name, propValue);
    };
    UIPhoneInput.prototype.setValue = function (event) {
        var _this = this;
        var value = event.target.value;
        if (/^[\d\s-+()]+$/ig.test(value)) {
            var PNF = libphonenumber.PhoneNumberFormat;
            var phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
            var phoneNumber = null;
            try {
                phoneNumber = phoneUtil.parse(value, null);
            }
            catch (err) {
            }
            var country = this.state.country;
            if (phoneNumber) {
                if (phoneUtil.getRegionCodeForNumber(phoneNumber)) {
                    country = phoneUtil.getRegionCodeForNumber(phoneNumber).toUpperCase();
                }
                this.setState({
                    value: phoneUtil.format(phoneNumber, PNF.INTERNATIONAL),
                    country: country
                });
            }
            else {
                this.setState({
                    value: value
                });
            }
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
        }
    };
    UIPhoneInput.prototype.setValid = function (valid) {
        this.setState({
            isValid: valid
        });
    };
    UIPhoneInput.prototype.getClassName = function () {
        return utils_1.UtilsService.getClassName(this.state.isValid, 'controls', 'valid', 'invalid');
    };
    UIPhoneInput.prototype.onChangeCountry = function (key) {
        if (key) {
            var PNF = libphonenumber.PhoneNumberFormat;
            var phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
            var formatObj = phoneUtil.getExampleNumberForType(key.toLowerCase(), PNF.INTERNATIONAL);
            var placeholder = this.props.placeholder;
            var value = this.state.value;
            if (formatObj && formatObj.values_ && formatObj.values_[1]) {
                placeholder = phoneUtil.format(formatObj, PNF.INTERNATIONAL);
                if (value == '+') {
                    value = '';
                }
            }
            this.setState({
                country: key,
                placeholder: placeholder,
                value: value
            });
        }
    };
    UIPhoneInput.prototype.onClickHandler = function () {
        var value = this.state.value;
        if ((!value || value == '+') && this.state.country) {
            var PNF = libphonenumber.PhoneNumberFormat;
            var phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
            var formatObj = phoneUtil.getExampleNumberForType(this.state.country.toLowerCase(), PNF.INTERNATIONAL);
            if (formatObj && formatObj.values_ && formatObj.values_[1]) {
                this.setState({
                    value: '+' + formatObj.values_[1]
                });
            }
        }
    };
    UIPhoneInput.prototype.render = function () {
        return (React.createElement("div", { className: "row form-phone-number" },
            React.createElement("div", { className: "left" },
                React.createElement(country_selector_1.UICountrySelector, { isSng: this.props.isSng, defKey: this.state.country, onChange: this.onChangeCountry.bind(this), iconsPath: this.props.iconsPath })),
            React.createElement("div", { className: "right" },
                React.createElement("input", { placeholder: this.state.placeholder || this.props.placeholder, name: this.props.name, onChange: this.setValue.bind(this), onFocus: this.setValid.bind(this, true), onClick: this.onClickHandler.bind(this), value: this.state.value, type: this.props.type, className: this.getClassName() }))));
    };
    return UIPhoneInput;
}(React.Component));
UIPhoneInput.defaultProps = {
    phoneDefaultCountrySNG: 'RU',
    phoneDefaultCountryGlobal: 'CN',
    type: 'text',
    iconsPath: '',
    value: ''
};
UIPhoneInput.contextTypes = {
    proxyField: React.PropTypes.func.isRequired,
    updateValue: React.PropTypes.func.isRequired,
    updateValidation: React.PropTypes.func.isRequired,
    registerInput: React.PropTypes.func.isRequired,
    unRegisterInput: React.PropTypes.func.isRequired
};
exports.UIPhoneInput = UIPhoneInput;
