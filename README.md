# react-valid-form

## How to install
```
npm i react-valid-form --save
```

## How to import
For TypeScript usage there is a index.d.ts in node_modules folder
```typescript
import {ReactValidForm, ValidationType} from "react-valid-form";
import {UIPhoneInput} from "react-valid-form";
import {UITextArea} from "react-valid-form";
import {UICountrySelector} from "react-valid-form";
import {UIColorSelector} from "react-valid-form";
import {UIFormSelector} from "react-valid-form";
import {UICardExpiryInput} from "react-valid-form";
import {UIPaymentCardInput} from "react-valid-form";
import {UITextInput} from "react-valid-form";
import {UiFormCheckbox} from "react-valid-form";
import {UIFormMessage, UIFormMessageType} from "react-valid-form";
```

or

```javascript
var ReactValidForm = require('react-valid-form');
var ValidationType = require('react-valid-form');
var UITextArea = require('react-valid-form');
var UICountrySelector = require('react-valid-form');
var UIFormSelector = require('react-valid-form');
var UICardExpiryInput = require('react-valid-form');
var UIPaymentCardInput = require('react-valid-form');
var UITextInput = require('react-valid-form');
var UiFormCheckbox = require('react-valid-form');
var UIFormMessage = require('react-valid-form');
var UIFormMessageType = require('react-valid-form');
```

Also use css in a lib folder in: 

```
node_modules/react-video-seek-slider/lib/inputs.css
```

## How to use

#### - ReactValidForm

##### Props

+ `className`: string;
+ `onSubmitValid`: (model: any) => void; (required)
+ `onSubmitInvalid` : (model: any, invalidModel: {
    [key: string]: string;
}) => void;
+ `resetOnSubmitValid` : boolean;

##### ValidationType -enum

* `REQUIRED` 
* `MIN_LENGTH`
* `MAX_LENGTH`
* `EMAIL`
* `SAME_AS`
* `CARD`
* `CARD_SIMPLE`
* `CARD_EXPIRY`
* `PERFECTMONEY`
* `WEBMONEY`
* `DCPAY`
* `PHONE_NUMBER`
* `REG_EXP`

```jsx harmony
<ReactValidForm onSubmitValid={this.onValid} resetOnSubmitValid={true}>
    // Form elements here..
</ReactValidForm>
```
#### - UIFormMessage

+ `message`: string;
+ `type`: UIFormMessageType;
+ `onClose`: () => void;

##### UIFormMessageType - enum
* `SUCCESS`
* `ERROR`

```jsx harmony
<UIFormMessage message="Test message success" type={UIFormMessageType.SUCCESS}/>
<UIFormMessage message="Test message error" type={UIFormMessageType.ERROR}/>
```

#### - UITextInput

##### Props

+ `message`: string;
+ `name`: string;
+ `type`?: string;
+ `value`?: string;
+ `placeholder`?: string;
+ `proxyValueName`?: string;
+ `validationTypes`?: ValidationType[];
+ `validationParams`?: any;
+ `validateOnChange`?: boolean;
+ `onChange`?: (value: string) => void;
+ `onEvent`?: (event: any) => void;
+ `invalidateMessage`?: string;

```jsx harmony
<UITextInput
    name="first"
    type="text"
    placeholder="Some text here..."
    validationTypes={[ValidationType.REQUIRED]}
/>
```

#### - UiFormCheckbox

##### Props

+ `liner`?: boolean;
+ `faded`?: boolean;
+ `checked`: boolean;
+ `label`?: any;
+ `formatLabel`?: FormatLabel;
+ `name`: string;
+ `onChange` : (checked: boolean) => void;

```jsx harmony
<UiFormCheckbox
    checked={this.state.ch1}
    liner={true}
    name="chk2"
    label="Label 1"
    onChange={(val) => {
        this.setState({
            ch1: val
        } as State);
    }}
/>
```

#### - UIPaymentCardInput

##### Props

+ `name`: string;
+ `type`?: string;
+ `value`?: string;
+ `placeholder`?: string;
+ `proxyValueName`?: string;
+ `validateOnChange`?: boolean;
+ `onChange`?: (value: string) => void;
+ `simpleValidation`?: boolean;

```jsx harmony
<UIPaymentCardInput
    name="cardtest"
    placeholder="4276 0000 0000 0000"
/>
```

#### - UICardExpiryInput

##### Props

+ `name`: string;
+ `type`?: string;
+ `value`?: string;
+ `placeholder`?: string;
+ `proxyValueName`?: string;
+ `validateOnChange`?: boolean;
+ `onChange`?: (value: string) => void;

```jsx harmony
<UICardExpiryInput name="cardexpiry" placeholder="07 / 17"/>
```


#### - UIFormSelector

##### Props

+ `message`: string;
+ `items`: UIFormSelectorItem[];
+ `defKey`: any;
+ `onChange`: (key: any) => void;
+ `search`?: boolean;
+ `searchPlaceholder`?: string;
+ `searchEmptyMessage`?: string;
+ `placeholder`?: string;
+ `globalPositionedDropdown`?: boolean;
+ `maxHeightItems`?: number;

##### UIFormSelectorItem

+ `key`: any;
+ `value`: string;

```jsx harmony
<UIFormSelector
    items={
        [
            {
                key: 0,
                value: 'First item'
            },
            {
                key: 1,
                value: 'Second item'
            },
            {
                key: 2,
                value: 'Third item'
            }
        ]
    }
    defKey={this.state.selKey}
    onChange={(val: any) => {
        this.setState({
            selKey: val
        } as State);
    }}
/>
```

#### - UIColorSelector

##### Props

+ `message`: string;
+ `items`?: UIFormColorItem[];
+ `defKey`: string;
+ `onChange`: Function;
+ `globalPositionedDropdown`?: boolean;
+ `placeholder`?: string;

##### UIFormColorItem

+ `key`: string;
+ `value`: string;

```jsx harmony
<UIColorSelector
    defKey={this.state.colorKey}
    onChange={(val: string) => {
        console.log(val);
        this.setState({
            colorKey: val
        } as State);
    }}
/>
```

#### - UICountrySelector

##### Props

+ `message`: string;
+ `isSng`?: boolean;
+ `defKey`: any;
+ `onChange`: (key: any) => void;
+ `placeholder`?: string;
+ `maxHeightItems`?: number;
+ `iconsPath`?: string;

```jsx harmony
<UICountrySelector
    defKey={this.state.countryKey}
    onChange={(val: string) => {
        console.log(val);
        this.setState({
            countryKey: val
        } as State);
    }}
    iconsPath="https://static.expertoption.com/flags/svg/4x3/"
/>
```

#### - UIPhoneInput

##### Props

+ `message`: string;
+ `name`: string;
+ `type`?: string;
+ `value`?: string;
+ `isSng`?: boolean;
+ `placeholder`?: string;
+ `proxyValueName`?: string;
+ `validateOnChange`?: boolean;
+ `onChange`?: (value: string) => void;
+ `phoneDefaultCountrySNG`?: string;
+ `phoneDefaultCountryGlobal`?: string;
+ `iconsPath`?: string;

```jsx harmony
<UIPhoneInput
    name="phone"
    iconsPath="./flags/svg/4x3/"
    isSng={true}
/>
```

#### - UITextArea

##### Props

+ `message`: string;
+ `name`: string;
+ `value`?: string;
+ `placeholder`?: string;
+ `validationTypes`?: ValidationType[];
+ `validationParams`?: any;
+ `validateOnChange`?: boolean;
+ `proxyValueName`?: string;

```jsx harmony
<UITextArea name="text-area"/>
```

#### - Button

Use special class for buttons

+ `btn-success`
+ `btn-primary`
+ `btn-reset`
+ `btn-danger`
+ `btn-violet`
+ `btn-google`
+ `btn-facebook`
+ `btn-tw`
+ `small`
+ `full`
+ `half-left`
+ `half-right`
+ `loading`

```jsx harmony
<button className="btn btn-success" type="submit">Button</button>
```

## For development
just use:

+ $ yarn or $ npm i
+ $ gulp

open your browser http://localhost:3000

## For Build

$ ./production
