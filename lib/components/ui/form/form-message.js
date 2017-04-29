"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var utils_1 = require("../../../services/utils");
var UIFormMessageType;
(function (UIFormMessageType) {
    UIFormMessageType[UIFormMessageType["SUCCESS"] = 0] = "SUCCESS";
    UIFormMessageType[UIFormMessageType["ERROR"] = 1] = "ERROR";
})(UIFormMessageType = exports.UIFormMessageType || (exports.UIFormMessageType = {}));
var UIFormMessage = (function (_super) {
    __extends(UIFormMessage, _super);
    function UIFormMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIFormMessage.prototype.handleClose = function () {
        if (this.props.onClose) {
            this.props.onClose();
        }
    };
    UIFormMessage.prototype.render = function () {
        var classNameForm = utils_1.UtilsService.getClassName(this.props.type === UIFormMessageType.SUCCESS, utils_1.UtilsService.getClassName(this.props.message != null, 'form-message', 'ready'), 'success', 'error');
        return (React.createElement("div", { className: classNameForm, onClick: this.handleClose.bind(this) }, this.props.message));
    };
    return UIFormMessage;
}(React.Component));
exports.UIFormMessage = UIFormMessage;
