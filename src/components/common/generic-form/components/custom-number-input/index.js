"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var React = require("react");
var carbon_components_react_1 = require("carbon-components-react");
var CustomNumberInput = function (_a) {
    var _b;
    var input = _a.input, former = _a.former;
    former === null || former === void 0 ? void 0 : former.register({ name: input.name });
    return (React.createElement(React.Fragment, null,
        React.createElement(carbon_components_react_1.NumberInput, { helperText: input.helperText, id: input.id, value: parseInt(((_b = input.defaultValue) !== null && _b !== void 0 ? _b : 1)), onChange: (function (event) {
                var _a, _b;
                former === null || former === void 0 ? void 0 : former.setValue(input.name, (_b = (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 1);
            }), name: input.name, invalidText: input.invalidText, label: input.labelText, placeholder: input.placeholder, max: input.max, min: input.min, step: input.step, invalid: (input === null || input === void 0 ? void 0 : input.invalid) ? (former === null || former === void 0 ? void 0 : former.errors[input === null || input === void 0 ? void 0 : input.invalid]) !== undefined : false })));
};
exports.default = react_1.memo(CustomNumberInput);
//# sourceMappingURL=index.js.map