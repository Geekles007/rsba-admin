"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var React = require("react");
var carbon_components_react_1 = require("carbon-components-react");
var icons_react_1 = require("@carbon/icons-react");
// @ts-ignore
var KeyBuilder_1 = require("core/KeyBuilder");
var react_csv_1 = require("react-csv");
var ToolbarContentUI = function (_a) {
    var tableBatchActionsProps = _a.tableBatchActionsProps, onInputChange = _a.onInputChange, refresh = _a.refresh, print = _a.print, additionals = _a.additionals, add = _a.add, titleNew = _a.titleNew, _b = _a.mainButtonIcon, mainButtonIcon = _b === void 0 ? icons_react_1.Add32 : _b, selectedRows = _a.selectedRows, data = _a.data, printButtonRef = _a.printButtonRef;
    var shouldShowBatchActions = tableBatchActionsProps.shouldShowBatchActions;
    var printing = function () {
        // @ts-ignore
        printButtonRef.current.link.click();
        if (print && typeof print === "function") {
            print();
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(carbon_components_react_1.TableToolbarContent, null,
            React.createElement(carbon_components_react_1.TableToolbarSearch, { persistent: true, placeholder: "Фильтр пользователей", tabIndex: shouldShowBatchActions ? -1 : 0, onChange: onInputChange }),
            print ?
                React.createElement(React.Fragment, null,
                    React.createElement(react_csv_1.CSVLink, { headers: (print && typeof print === "object" ? print : []), filename: KeyBuilder_1.default.build + ".csv", data: selectedRows && selectedRows.length > 0 ? selectedRows : data, ref: printButtonRef }),
                    React.createElement(carbon_components_react_1.Button, { hasIconOnly: true, renderIcon: icons_react_1.Export32, tooltipAlignment: "center", tooltipPosition: "bottom", onClick: printing, kind: "ghost", iconDescription: "Refresh" })) : React.createElement(React.Fragment, null),
            refresh ?
                React.createElement(carbon_components_react_1.Button, { hasIconOnly: true, renderIcon: icons_react_1.Renew32, tooltipAlignment: "center", tooltipPosition: "bottom", kind: "ghost", onClick: function () { return refresh(); }, iconDescription: "Export" }) : React.createElement(React.Fragment, null), additionals === null || additionals === void 0 ? void 0 :
            additionals.map(function (additional) {
                return (additional);
            }),
            (add !== undefined) ?
                React.createElement(carbon_components_react_1.Button, { hasIconOnly: titleNew === "", tabIndex: shouldShowBatchActions ? -1 : 0, onClick: add, renderIcon: mainButtonIcon, iconDescription: "Add", kind: "primary" }, titleNew) : null)));
};
exports.default = react_1.memo(ToolbarContentUI);
//# sourceMappingURL=index.js.map