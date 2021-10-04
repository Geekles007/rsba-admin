"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var custom_options_menu_1 = require("../../../custom-options-menu");
var styled_components_1 = require("styled-components");
var colors_1 = require("@carbon/colors");
var uuid_1 = require("uuid");
var TableBodyWrapper = styled_components_1.default(carbon_components_react_1.TableBody)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  .pointer {\n    cursor: pointer !important;\n  }\n\n  .selected {\n    background-color: ", " !important;\n  }\n"], ["\n  .pointer {\n    cursor: pointer !important;\n  }\n\n  .selected {\n    background-color: ", " !important;\n  }\n"])), colors_1.gray70);
var BodyUI = function (_a) {
    var rows = _a.rows, getSelectionProps = _a.getSelectionProps, getRowProps = _a.getRowProps, menus = _a.menus, noSelection = _a.noSelection, isExpanded = _a.isExpanded, _b = _a.type, type = _b === void 0 ? "all" : _b, _c = _a.expandedMenus, expandedMenus = _c === void 0 ? [] : _c, addons = _a.addons, showDetails = _a.showDetails, selectedRow = _a.selectedRow, expandedBody = _a.expandedBody;
    return (React.createElement(React.Fragment, null,
        React.createElement(TableBodyWrapper, null,
            rows.map(function (row, i) { return (!isExpanded ?
                React.createElement(carbon_components_react_1.TableRow, { key: i + type + i },
                    !noSelection ?
                        React.createElement(carbon_components_react_1.TableSelectRow, __assign({ key: uuid_1.v4() + type + i, className: selectedRow === (row === null || row === void 0 ? void 0 : row.id) ? "selected" : "" }, getSelectionProps({ row: row })))
                        : React.createElement(React.Fragment, null),
                    row.cells.map(function (cell) { return ((showDetails) ?
                        React.createElement(carbon_components_react_1.TableCell, { className: "pointer " + (selectedRow === (row === null || row === void 0 ? void 0 : row.id) ? "selected" : ""), onClick: function () { return showDetails(row); }, key: cell.id }, cell.value)
                        :
                            React.createElement(carbon_components_react_1.TableCell, { className: "" + (selectedRow === (row === null || row === void 0 ? void 0 : row.id) ? "selected" : ""), key: cell.id }, cell.value)); }),
                    menus !== undefined ?
                        React.createElement(carbon_components_react_1.TableCell, { className: "bx--table-column-menu " + (selectedRow === (row === null || row === void 0 ? void 0 : row.id) ? "selected" : "") }, menus.length > 0 ?
                            React.createElement(custom_options_menu_1.default, { row: row, flipped: true, menus: menus }) : null) : null)
                :
                    (React.createElement(React.Fragment, { key: row.id + type + i },
                        React.createElement(carbon_components_react_1.TableExpandRow, __assign({}, getRowProps({ row: row })),
                            !noSelection ?
                                React.createElement(carbon_components_react_1.TableSelectRow, __assign({ key: uuid_1.v4() + type + i }, getSelectionProps({ row: row })))
                                : React.createElement(React.Fragment, null),
                            row.cells.map(function (cell) { return ((showDetails) ?
                                React.createElement(carbon_components_react_1.TableCell, { className: "pointer", onClick: function () { return showDetails(row); }, key: cell.id }, cell.value)
                                :
                                    React.createElement(carbon_components_react_1.TableCell, { key: cell.id }, cell.value)); }),
                            menus !== undefined ?
                                React.createElement(carbon_components_react_1.TableCell, { className: "bx--table-column-menu" },
                                    React.createElement(custom_options_menu_1.default, { row: row, flipped: true, menus: menus })) : null),
                        row.isExpanded && (expandedBody("data", row, noSelection, row, getSelectionProps, expandedMenus))))); }),
            addons)));
};
exports.default = react_1.memo(BodyUI);
var templateObject_1;
//# sourceMappingURL=index.js.map