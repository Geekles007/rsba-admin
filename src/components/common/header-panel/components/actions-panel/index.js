"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var React = require("react");
// @ts-ignore
var KeyBuilder_1 = require("core/KeyBuilder");
var carbon_components_react_1 = require("carbon-components-react");
var styled_components_1 = require("styled-components");
var ActionList = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  width: 100%;\n  justify-content: flex-end;\n"], ["\n  display: flex;\n  width: 100%;\n  justify-content: flex-end;\n"])));
var ActionsPanel = function (_a) {
    var _b = _a.actions, actions = _b === void 0 ? [] : _b;
    return (React.createElement(ActionList, null, actions === null || actions === void 0 ? void 0 : actions.map(function (action) {
        return (React.createElement(carbon_components_react_1.Button, { key: KeyBuilder_1.default.build, onClick: action.func, small: true, style: { marginRight: ".5em" }, hasIconOnly: action.iconOnly, renderIcon: action.icon, tooltipAlignment: "center", kind: "secondary", tooltipPosition: "bottom", iconDescription: action.title }, action.title));
    })));
};
exports.default = react_1.memo(ActionsPanel);
var templateObject_1;
//# sourceMappingURL=index.js.map