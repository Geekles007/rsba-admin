"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var React = require("react");
var styled_components_1 = require("styled-components");
var carbon_components_react_1 = require("carbon-components-react");
var actions_panel_1 = require("../actions-panel");
var react_i18next_1 = require("react-i18next");
var colors_1 = require("@carbon/colors");
// @ts-ignore
var KeyBuilder_1 = require("core/KeyBuilder");
var DescPanelWrapper = styled_components_1.default(carbon_components_react_1.Tile)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  padding-right: 0 !important;\n  padding-left: 0 !important;\n\n  .custom-grid {\n    padding-right: 0 !important;\n    padding-left: 0 !important;\n  }\n\n  .column-item {\n    margin-bottom: 1.5em;\n    display: flex;\n    flex-direction: column;\n\n    strong {\n      margin-bottom: .5em;\n    }\n\n    span {\n      color: ", ";\n      font-size: .9em;\n    }\n\n    .sub-item {\n      display: flex;\n      margin-bottom: .5em;\n      align-items: center;\n\n      span {\n        width: 150px;\n        margin-right: .5em;\n      }\n\n      p {\n        font-size: .9em;\n      }\n    }\n  }\n"], ["\n  width: 100%;\n  padding-right: 0 !important;\n  padding-left: 0 !important;\n\n  .custom-grid {\n    padding-right: 0 !important;\n    padding-left: 0 !important;\n  }\n\n  .column-item {\n    margin-bottom: 1.5em;\n    display: flex;\n    flex-direction: column;\n\n    strong {\n      margin-bottom: .5em;\n    }\n\n    span {\n      color: ", ";\n      font-size: .9em;\n    }\n\n    .sub-item {\n      display: flex;\n      margin-bottom: .5em;\n      align-items: center;\n\n      span {\n        width: 150px;\n        margin-right: .5em;\n      }\n\n      p {\n        font-size: .9em;\n      }\n    }\n  }\n"])), colors_1.gray50);
var DescriptionPanel = function (_a) {
    var _b;
    var title = _a.title, subTitle = _a.subTitle, description = _a.description, item = _a.item, actions = _a.actions;
    var t = react_i18next_1.useTranslation("translation", { useSuspense: false }).t;
    var more = new Map();
    if (item) {
        for (var _i = 0, _c = Object.entries(item); _i < _c.length; _i++) {
            var _d = _c[_i], key = _d[0], value = _d[1];
            more.set(key, value.toString());
        }
    }
    return (React.createElement(DescPanelWrapper, null,
        React.createElement(carbon_components_react_1.Grid, { className: "custom-grid" },
            React.createElement(carbon_components_react_1.Row, null,
                React.createElement(carbon_components_react_1.Column, { lg: 5 },
                    React.createElement("div", { className: "column-item" },
                        React.createElement("h2", null, title),
                        subTitle),
                    React.createElement("div", { className: "column-item" },
                        React.createElement("strong", null, t('description-text')),
                        React.createElement("span", null, ((_b = description === null) !== null && _b !== void 0 ? _b : description === "") ? "-" : description))),
                React.createElement(carbon_components_react_1.Column, { lg: 5 }, item ?
                    React.createElement("div", { className: "column-item" },
                        React.createElement("strong", null, t('details-text')),
                        Array.from(more).map(function (_a) {
                            var key = _a[0], value = _a[1];
                            return (React.createElement("div", { className: "sub-item", key: KeyBuilder_1.default.build },
                                React.createElement("span", null, t(key)),
                                " ",
                                key.toLowerCase() === "email" ?
                                    React.createElement("a", { href: value }, value) : React.createElement("p", null, value)));
                        })) : null),
                React.createElement(carbon_components_react_1.Column, { lg: 2 },
                    React.createElement(actions_panel_1.default, { actions: actions }))))));
};
exports.default = react_1.memo(DescriptionPanel);
var templateObject_1;
//# sourceMappingURL=index.js.map