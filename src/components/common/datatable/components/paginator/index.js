"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var carbon_components_react_1 = require("carbon-components-react");
var Paginator = function (_a) {
    var perPage = _a.perPage, pageNumber = _a.pageNumber, pageSizes = _a.pageSizes, totalItems = _a.totalItems, onChange = _a.onChange, backwardText = _a.backwardText, forwardText = _a.forwardText, pageNumberText = _a.pageNumberText, itemText = _a.itemText, itemsPerPageText = _a.itemsPerPageText;
    return react_1.default.createElement("div", null,
        react_1.default.createElement(carbon_components_react_1.Pagination, { backwardText: backwardText, forwardText: forwardText, itemText: itemText, itemsPerPageText: itemsPerPageText, page: perPage, onChange: function (e) { return onChange(e); }, pageNumberText: pageNumberText, pageSize: pageNumber, pageSizes: pageSizes || [
                10,
                20,
                30,
                40,
                50
            ], totalItems: totalItems || 103 }));
};
exports.default = react_1.memo(Paginator);
//# sourceMappingURL=index.js.map