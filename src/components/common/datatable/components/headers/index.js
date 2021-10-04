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
var react_1 = require("react");
var React = require("react");
var carbon_components_react_1 = require("carbon-components-react");
var react_i18next_1 = require("react-i18next");
var HeadersUI = function (_a) {
    var _b = _a.isExpanded, isExpanded = _b === void 0 ? false : _b, noSelection = _a.noSelection, tableSelectAllProps = _a.tableSelectAllProps, getHeaderProps = _a.getHeaderProps, headers = _a.headers, withMenu = _a.withMenu;
    var t = react_i18next_1.useTranslation('translation', { useSuspense: false }).t;
    return (React.createElement(carbon_components_react_1.TableHead, null,
        React.createElement(carbon_components_react_1.TableRow, null,
            isExpanded ?
                React.createElement(carbon_components_react_1.TableExpandHeader, null)
                : React.createElement(React.Fragment, null),
            !noSelection ?
                React.createElement(carbon_components_react_1.TableSelectAll, __assign({}, tableSelectAllProps))
                : React.createElement(React.Fragment, null),
            headers.map(function (header) { return (React.createElement(carbon_components_react_1.TableHeader, __assign({}, getHeaderProps({ header: header })), t(header.header))); }),
            withMenu !== undefined ?
                React.createElement(carbon_components_react_1.TableHeader, null)
                : null)));
};
exports.default = react_1.memo(HeadersUI);
//# sourceMappingURL=index.js.map