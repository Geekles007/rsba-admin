"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var react_1 = require("react");
var carbon_components_react_1 = require("carbon-components-react");
var mobx_react_1 = require("mobx-react");
var default_1 = require("./modal-style/default");
var react_i18next_1 = require("react-i18next");
var DialogStore_1 = require("../../stores/DialogStore");
var ModalUI = mobx_react_1.observer(function () {
    var t = react_i18next_1.useTranslation('translation', { useSuspense: false }).t;
    var closeModal = function () {
        DialogStore_1.default.setOpen(false);
        DialogStore_1.default.clear();
    };
    return (react_1.default.createElement(default_1.ModalContainer, null,
        react_1.default.createElement(carbon_components_react_1.ComposedModal, { size: DialogStore_1.default.options.size, open: DialogStore_1.default.open, onClose: closeModal },
            react_1.default.createElement(carbon_components_react_1.ModalHeader, { label: (typeof DialogStore_1.default.options.title === "string") ? t(DialogStore_1.default.options.title) : DialogStore_1.default.options.title }),
            DialogStore_1.default.options.content)));
});
exports.default = (mobx_react_1.inject('DialogStore'))(react_1.memo(ModalUI));
//# sourceMappingURL=index.js.map