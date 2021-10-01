"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var react_1 = require("react");
var default_1 = require("./empty-state-style/default");
var carbon_components_react_1 = require("carbon-components-react");
var pictograms_react_1 = require("@carbon/pictograms-react");
var EmptyStateUI = function (_a) {
    var action = _a.action, _b = _a.title, title = _b === void 0 ? "" : _b, _c = _a.text, text = _c === void 0 ? "" : _c, icon = _a.icon, _d = _a.actionTitle, actionTitle = _d === void 0 ? "" : _d;
    var elt = null;
    react_1.useEffect(function () {
        elt = react_1.default.createElement(icon);
    }, []);
    return (react_1.default.createElement(default_1.EmptyWrapper, null,
        react_1.default.createElement("div", { className: "little-text" },
            react_1.default.createElement(pictograms_react_1.Archive, null),
            react_1.default.createElement("h4", null, title),
            react_1.default.createElement("span", null, text),
            action ?
                react_1.default.createElement(carbon_components_react_1.Button, { className: "pointer", onClick: action }, actionTitle) : null)));
};
exports.default = react_1.memo(EmptyStateUI);
//# sourceMappingURL=index.js.map