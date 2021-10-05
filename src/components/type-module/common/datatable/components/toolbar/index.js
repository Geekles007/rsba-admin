"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var React = require("react");
var carbon_components_react_1 = require("carbon-components-react");
var batch_actions_1 = require("./components/batch-actions");
var toolbar_content_1 = require("./components/toolbar-content");
var ToolbarUI = function (_a) {
    var batchActionsProps = _a.batchActionsProps, inputChange = _a.inputChange, actions = _a.actions, refresh = _a.refresh, print = _a.print, additionals = _a.additionals, selectedRows = _a.selectedRows, add = _a.add, titleNew = _a.titleNew, icon = _a.icon, data = _a.data;
    var printButtonRef = React.createRef();
    return (React.createElement(carbon_components_react_1.TableToolbar, null,
        React.createElement(batch_actions_1.default, { printButtonRef: printButtonRef, selectedRows: selectedRows, actions: actions, tableBatchActionsProps: batchActionsProps }),
        React.createElement(toolbar_content_1.default, { printButtonRef: printButtonRef, data: data, mainButtonIcon: icon, additionals: additionals, add: add, titleNew: titleNew, refresh: refresh, print: print, onInputChange: inputChange, tableBatchActionsProps: batchActionsProps, selectedRows: selectedRows })));
};
exports.default = react_1.memo(ToolbarUI);
//# sourceMappingURL=index.js.map