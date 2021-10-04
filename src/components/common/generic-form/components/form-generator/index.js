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
var mobx_react_1 = require("mobx-react");
var react_i18next_1 = require("react-i18next");
var client_1 = require("@apollo/client");
var controller_1 = require("./controller");
// @ts-ignore
var DialogStore_1 = require("container/DialogStore");
var carbon_components_react_1 = require("carbon-components-react");
var input_builder_1 = require("../input-builder");
var request_alert_1 = require("../../../request-alert");
var modal_actions_1 = require("../../../modal-actions");
var FormGenerator = function (_a) {
    var node = _a.node, variables = _a.variables, additionals = _a.additionals, pretendId = _a.pretendId, dataToEdit = _a.dataToEdit, useForm = _a.useForm, inputs = _a.inputs, description = _a.description;
    var _b = react_1.useState(dataToEdit !== null && dataToEdit !== void 0 ? dataToEdit : null), formData = _b[0], setFormData = _b[1];
    var t = react_i18next_1.useTranslation('translation', { useSuspense: false }).t;
    var _c = React.useState({ message: "operation-succeed" }), succeed = _c[0], setSucceed = _c[1];
    var _d = client_1.useMutation(node, __assign({ notifyOnNetworkStatusChange: true }, variables)), action = _d[0], _e = _d[1], loading = _e.loading, error = _e.error;
    var ctrl = new controller_1.default();
    react_1.useEffect(function () {
        return function cleanup() {
            useForm === null || useForm === void 0 ? void 0 : useForm.reset();
            DialogStore_1.default.clear();
        };
    }, []);
    var onSubmit = function (data) {
        if ((formData === null || formData === void 0 ? void 0 : formData.id) !== "") {
            data = __assign(__assign({}, data), { id: formData === null || formData === void 0 ? void 0 : formData.id });
        }
        action({
            variables: {
                input: pretendId ? __assign({ id: data[pretendId] }, additionals) : __assign(__assign({}, additionals), data)
            },
        }).then(function (results) {
            setSucceed({
                state: true,
                message: "operation-succeed"
            });
            useForm === null || useForm === void 0 ? void 0 : useForm.reset();
            setTimeout(function () {
                setSucceed({
                    state: false,
                    message: "operation-succeed"
                });
                setFormData(null);
                DialogStore_1.default.closeFromOutside();
            }, 1000);
        }).catch(function (error) {
            console.debug(error);
        });
    };
    var onReset = function () {
        useForm === null || useForm === void 0 ? void 0 : useForm.reset();
        DialogStore_1.default.closeFromOutside();
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(carbon_components_react_1.Form, { onSubmit: useForm === null || useForm === void 0 ? void 0 : useForm.handleSubmit(onSubmit, ctrl.onErrors) },
            React.createElement(request_alert_1.default, { error: error, success: succeed, loading: loading }),
            React.createElement(carbon_components_react_1.ModalBody, null,
                React.createElement("p", { className: "bx--modal-header__heading" }, t(description !== null && description !== void 0 ? description : "")),
                React.createElement("br", null), inputs === null || inputs === void 0 ? void 0 :
                inputs.map(function (item) {
                    return input_builder_1.default({ input: item, form: useForm });
                })),
            React.createElement(carbon_components_react_1.ModalFooter, null,
                React.createElement(modal_actions_1.default, { reset: onReset, loading: loading, succeed: succeed })))));
};
exports.default = mobx_react_1.observer(FormGenerator);
//# sourceMappingURL=index.js.map