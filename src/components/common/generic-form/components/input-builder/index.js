"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_i18next_1 = require("react-i18next");
// @ts-ignore
var Constants_1 = require("core/Constants");
// @ts-ignore
var KeyBuilder_1 = require("core/KeyBuilder");
var carbon_components_react_1 = require("carbon-components-react");
var combo_box_1 = require("../combo-box");
var custom_number_input_1 = require("../custom-number-input");
var mutiselect_1 = require("../mutiselect");
var checkbox_1 = require("../checkbox");
var FormControl_1 = require("../../../../style/FormControl");
var CustomInput_1 = require("../../../../style/CustomInput");
var InputBuilder = function (_a) {
    var _b, _c;
    var input = _a.input, form = _a.form;
    var t = react_i18next_1.useTranslation("translation", { useSuspense: false }).t;
    input = __assign(__assign({}, input), { helperText: t(input.helperText), invalidText: t(input.invalidText), labelText: t(input.labelText), placeholder: t(input.placeholder) });
    switch (input.type) {
        case Constants_1.TYPEINPUT.text:
            return (React.createElement(FormControl_1.FormControl, { key: input.id + input.name },
                React.createElement(CustomInput_1.CustomInput, { helperText: input.helperText, id: (_b = input.id) !== null && _b !== void 0 ? _b : KeyBuilder_1.default.build, ref: form === null || form === void 0 ? void 0 : form.register, defaultValue: input.defaultValue, name: input.name, invalidText: input.invalidText, labelText: input.labelText, placeholder: input.placeholder, invalid: (input === null || input === void 0 ? void 0 : input.invalid) ? (form === null || form === void 0 ? void 0 : form.errors[input === null || input === void 0 ? void 0 : input.invalid]) !== undefined : false })));
        case Constants_1.TYPEINPUT.textarea:
            return (React.createElement(FormControl_1.FormControl, { key: input.id + input.name },
                React.createElement(carbon_components_react_1.TextArea, { helperText: input.helperText, id: input.id, ref: form === null || form === void 0 ? void 0 : form.register, defaultValue: input.defaultValue, name: input.name, invalidText: input.invalidText, labelText: input.labelText, placeholder: input.placeholder, invalid: (input === null || input === void 0 ? void 0 : input.invalid) ? (form === null || form === void 0 ? void 0 : form.errors[input === null || input === void 0 ? void 0 : input.invalid]) !== undefined : false })));
        case Constants_1.TYPEINPUT.comboBox:
            return (React.createElement(FormControl_1.FormControl, { key: input.id + input.name },
                React.createElement(combo_box_1.default, { helperText: input.helperText, id: input.id, defaultValue: input.defaultValue, name: input.name, invalidText: input.invalidText, labelText: input.labelText, placeholder: input.placeholder, documentNode: input.documentNode, client: input.client, more: input.more, variables: input.variables, objectProperty: input.objectProperty, form: form })));
        case Constants_1.TYPEINPUT.multiselect:
            return (React.createElement(FormControl_1.FormControl, { key: input.id + input.name },
                React.createElement(mutiselect_1.default, { helperText: input.helperText, id: input.id, defaultValue: input.defaultValue, name: input.name, invalidText: input.invalidText, labelText: input.labelText, placeholder: input.placeholder, documentNode: input.documentNode, client: input.client, objectProperty: input.objectProperty, form: form })));
        case Constants_1.TYPEINPUT.number:
            return (React.createElement(FormControl_1.FormControl, { key: input.id + input.name },
                React.createElement(custom_number_input_1.default, { input: input, former: form })));
        case Constants_1.TYPEINPUT.checkbox:
            return (React.createElement(FormControl_1.FormControl, { key: input.id + input.name },
                React.createElement(checkbox_1.default, { name: input.name, labelText: input.labelText, form: form, id: (_c = input.id) !== null && _c !== void 0 ? _c : KeyBuilder_1.default.build, defaultValue: input.defaultValue })));
    }
};
exports.default = InputBuilder;
//# sourceMappingURL=index.js.map