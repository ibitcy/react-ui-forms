"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require("lodash");
var React = require("react");
var cards_format_1 = require("cards-format");
var libphonenumber = require("google-libphonenumber");
var FieldType;
(function (FieldType) {
    FieldType[FieldType["TEXT"] = 0] = "TEXT";
    FieldType[FieldType["AREA"] = 1] = "AREA";
})(FieldType = exports.FieldType || (exports.FieldType = {}));
var ValidationType;
(function (ValidationType) {
    ValidationType[ValidationType["REQUIRED"] = 0] = "REQUIRED";
    ValidationType[ValidationType["MIN_LENGTH"] = 1] = "MIN_LENGTH";
    ValidationType[ValidationType["MAX_LENGTH"] = 2] = "MAX_LENGTH";
    ValidationType[ValidationType["EMAIL"] = 3] = "EMAIL";
    ValidationType[ValidationType["SAME_AS"] = 4] = "SAME_AS";
    ValidationType[ValidationType["CARD"] = 5] = "CARD";
    ValidationType[ValidationType["CARD_SIMPLE"] = 6] = "CARD_SIMPLE";
    ValidationType[ValidationType["CARD_EXPIRY"] = 7] = "CARD_EXPIRY";
    ValidationType[ValidationType["PERFECTMONEY"] = 8] = "PERFECTMONEY";
    ValidationType[ValidationType["WEBMONEY"] = 9] = "WEBMONEY";
    ValidationType[ValidationType["DCPAY"] = 10] = "DCPAY";
    ValidationType[ValidationType["PHONE_NUMBER"] = 11] = "PHONE_NUMBER";
    ValidationType[ValidationType["REG_EXP"] = 12] = "REG_EXP";
})(ValidationType = exports.ValidationType || (exports.ValidationType = {}));
var ReactUiForms = (function (_super) {
    __extends(ReactUiForms, _super);
    function ReactUiForms() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            invalidMessages: []
        };
        _this._form = null;
        _this.fields = [];
        return _this;
    }
    ReactUiForms.prototype.componentDidMount = function () {
        this.cardFormat = new cards_format_1.CardsFormat;
    };
    ReactUiForms.prototype.getChildContext = function () {
        var _this = this;
        return {
            proxyField: function (name, value) {
                _this.proxyValue(name, value);
            },
            updateValue: function (name, value) {
                _this.fields = _this.fields.map(function (field) {
                    if (field.name == name) {
                        field.value = value;
                    }
                    return field;
                });
            },
            updateValidation: function (name) {
                var field = _.find(_this.fields, function (field) {
                    return field.name == name;
                });
                if (field) {
                    var isValid_1 = _this.validateField(field);
                    _this.fields = _this.fields.map(function (field) {
                        if (field.name == name) {
                            field.valid = isValid_1;
                        }
                        return field;
                    });
                    field.validated(isValid_1);
                }
            },
            registerInput: function (type, name, value, validationTypes, validationParams, validated, setValue, invalidateMessage) {
                _this.fields.push({
                    type: type,
                    name: name,
                    valid: true,
                    value: value,
                    validationTypes: validationTypes,
                    validationParams: validationParams,
                    validated: validated,
                    setValue: setValue,
                    invalidateMessage: invalidateMessage
                });
            },
            unRegisterInput: function (name) {
                _this.fields = _.reject(_this.fields, function (field) {
                    return name == field.name;
                });
            }
        };
    };
    ReactUiForms.prototype.validateField = function (field) {
        var _this = this;
        var validTypes = [];
        var invalidTypes = [];
        var value = field.value;
        var validationParams = field.validationParams;
        var phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
        _.each(field.validationTypes, function (validationType, key) {
            var validType = false;
            switch (validationType) {
                case ValidationType.EMAIL: {
                    if (value) {
                        var regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        validType = regExp.test(value);
                    }
                    else {
                        validType = false;
                    }
                    break;
                }
                case ValidationType.MIN_LENGTH: {
                    validType = true;
                    if (validationParams && validationParams[key]) {
                        validType = value && value.length >= validationParams[key];
                    }
                    break;
                }
                case ValidationType.REG_EXP: {
                    validType = true;
                    if (validationParams && validationParams[key]) {
                        var regExp_1 = new RegExp(validationParams[key], "ig");
                        validType = regExp_1.test(value);
                    }
                    break;
                }
                case ValidationType.MAX_LENGTH: {
                    validType = true;
                    if (validationParams && validationParams[key]) {
                        validType = value && value.length <= validationParams[key];
                    }
                    break;
                }
                case ValidationType.SAME_AS: {
                    validType = true;
                    if (validationParams && validationParams[key]) {
                        var otherField = _.find(_this.fields, function (field) {
                            return field.name == validationParams[key];
                        });
                        validType = value && value == otherField.value;
                    }
                    break;
                }
                case ValidationType.REQUIRED: {
                    if (value) {
                        validType = true;
                    }
                    else {
                        validType = false;
                    }
                    break;
                }
                case ValidationType.CARD: {
                    value = value.replace(/(\s+|\s+)/g, '');
                    if (_this.cardFormat.validateCardNumber(+value)) {
                        validType = true;
                    }
                    else {
                        validType = false;
                    }
                    break;
                }
                case ValidationType.CARD_SIMPLE: {
                    value = value.replace(/(\s+|\s+)/g, '');
                    if (_this.cardFormat.validateCardNumberSimple(+value)) {
                        validType = true;
                    }
                    else {
                        validType = false;
                    }
                    break;
                }
                case ValidationType.CARD_EXPIRY: {
                    var expiryObj = _this.cardFormat.cardExpiryVal(value);
                    if (_this.cardFormat.validateCardExpiry(expiryObj.month, expiryObj.year)) {
                        validType = true;
                    }
                    else {
                        validType = false;
                    }
                    break;
                }
                case ValidationType.PERFECTMONEY: {
                    if (/[U][0-9]{8}/g.test(value) && value.length == 9) {
                        validType = true;
                    }
                    else {
                        validType = false;
                    }
                    break;
                }
                case ValidationType.WEBMONEY: {
                    if (/[ZER][0-9]{12}/g.test(value) && value.length == 13) {
                        validType = true;
                    }
                    else {
                        validType = false;
                    }
                    break;
                }
                case ValidationType.DCPAY: {
                    if (!/[a-zА-Я]/ig.test(value)) {
                        validType = true;
                    }
                    else {
                        validType = false;
                    }
                    break;
                }
                case ValidationType.PHONE_NUMBER: {
                    if (value) {
                        validType = true;
                    }
                    else {
                        validType = false;
                    }
                }
            }
            if (validType) {
                validTypes.push(validationType);
            }
            else {
                invalidTypes.push(validationType);
            }
        });
        return invalidTypes.length === 0;
    };
    ReactUiForms.prototype.resetForm = function () {
        var _this = this;
        _.each(this.fields, function (field, i) {
            field.setValue('');
            _this.fields[i].value = '';
            _this.fields[i].valid = true;
        });
    };
    ReactUiForms.prototype.proxyValue = function (name, value) {
        var _this = this;
        _.each(this.fields, function (field, i) {
            if (field.name == name) {
                field.setValue(value);
                _this.fields[i].value = value;
                _this.fields[i].valid = true;
            }
        });
    };
    ReactUiForms.prototype.getModel = function (fields) {
        var model = {};
        var modelFields = fields ? fields : this.fields;
        _.each(modelFields, function (field) {
            model[field.name] = field.value;
        });
        return model;
    };
    ReactUiForms.prototype.submit = function (event) {
        var _this = this;
        var allIsValid = true;
        var invalidFields = [];
        if (event) {
            event.preventDefault();
        }
        this.setState({
            invalidMessages: []
        });
        _.each(this.fields, function (field) {
            var isValid = _this.validateField(field);
            if (!isValid) {
                allIsValid = false;
                invalidFields.push(field);
            }
            field.validated(isValid);
        });
        this.setState({
            invalidMessages: this.getInvalidMessagesArray(invalidFields)
        });
        if (allIsValid) {
            this.props.onSubmitValid(this.getModel());
            if (this.props.resetOnSubmitValid) {
                this.resetForm();
            }
        }
        else {
            if (this.props.onSubmitInvalid) {
                this.props.onSubmitInvalid(this.getModel(), this.getModel(invalidFields));
            }
        }
    };
    ReactUiForms.prototype.getInvalidMessagesArray = function (fields) {
        var messages = [];
        fields.map(function (field) {
            if (field.invalidateMessage && messages.indexOf(field.invalidateMessage) === -1) {
                messages.push(field.invalidateMessage);
            }
        });
        return messages;
    };
    ReactUiForms.prototype.getInvalidMessages = function () {
        return this.state.invalidMessages.map(function (message) {
            return (React.createElement("p", null, message));
        });
    };
    ReactUiForms.prototype.getClassName = function (isActive, baseName, activeName, inactiveName) {
        var className = baseName;
        if (isActive) {
            className += ' ' + activeName;
        }
        else {
            if (inactiveName) {
                className += ' ' + inactiveName;
            }
        }
        return className;
    };
    ReactUiForms.prototype.render = function () {
        var _this = this;
        return (React.createElement("form", { ref: function (form) { return _this._form = form; }, className: this.props.className || '', onSubmit: this.submit.bind(this) },
            React.createElement("div", { className: this.getClassName(this.state.invalidMessages.length > 0, 'form-message error small-bottom', 'ready') }, this.getInvalidMessages()),
            this.props.children));
    };
    return ReactUiForms;
}(React.Component));
ReactUiForms.childContextTypes = {
    updateValue: React.PropTypes.func.isRequired,
    proxyField: React.PropTypes.func.isRequired,
    updateValidation: React.PropTypes.func.isRequired,
    registerInput: React.PropTypes.func.isRequired,
    unRegisterInput: React.PropTypes.func.isRequired
};
exports.ReactUiForms = ReactUiForms;
