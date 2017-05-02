const ReactUiForms = require('./lib/components/ui/form/form');
const UITextInput = require('./lib/components/ui/form/text-input');
const UIPaymentCardInput = require('./lib/components/ui/form/payment-card-input');
const UICardExpiryInput = require('./lib/components/ui/form/card-expiry-input');
const UITextArea = require('./lib/components/ui/form/text-area');
const UIFormMessage = require('./lib/components/ui/form/form-message');
const UiFormCheckbox = require('./lib/checkbox');
const UIFormSelector = require('./lib/components/ui/form/selector');
const UIColorSelector = require('./lib/components/ui/form/color-selector');
const UICountrySelector = require('./lib/components/ui/form/country-selector');
const UIPhoneInput = require('./lib/components/ui/form/phone-input');


module.exports.ReactUiForms = ReactUiForms.ReactUiForms;
module.exports.ValidationType = ReactValidForm.ValidationType;

module.exports.UITextInput = UITextInput.UITextInput;

module.exports.UIPaymentCardInput = UIPaymentCardInput.UIPaymentCardInput;
module.exports.UICardExpiryInput = UICardExpiryInput.UICardExpiryInput;

module.exports.UIFormMessage = UIFormMessage.UIFormMessage;
module.exports.UIFormMessageType = UIFormMessage.UIFormMessageType;

module.exports.UITextArea = UITextArea.UITextArea;

module.exports.UiFormCheckbox = UiFormCheckbox.UiFormCheckbox;
module.exports.FormatLabel = UiFormCheckbox.FormatLabel;

module.exports.UIFormSelector = UIFormSelector.UIFormSelector;
module.exports.UIFormSelectorItem = UIFormSelector.UIFormSelectorItem;

module.exports.UIColorSelector = UIColorSelector.UIColorSelector;
module.exports.UIFormColorItem = UIColorSelector.UIFormColorItem;

module.exports.UICountrySelector = UICountrySelector.UICountrySelector;
module.exports.UIPhoneInput = UIPhoneInput.UIPhoneInput;
