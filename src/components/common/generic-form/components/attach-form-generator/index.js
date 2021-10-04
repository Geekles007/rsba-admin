"use strict";
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
var custom_use_form_1 = require("../../repositories/custom-use-form");
var AttachFormGenerator = function (_a) {
    var node = _a.node, variables = _a.variables, dataToEdit = _a.dataToEdit, firstKey = _a.firstKey, secondKey = _a.secondKey, _b = _a.loop, loop = _b === void 0 ? true : _b, listKey = _a.listKey, inputs = _a.inputs, schema = _a.schema, description = _a.description;
    var _c = react_1.useState(dataToEdit !== null && dataToEdit !== void 0 ? dataToEdit : null), formData = _c[0], setFormData = _c[1];
    var t = react_i18next_1.useTranslation('translation', { useSuspense: false }).t;
    var _d = React.useState({ message: "operation-succeed" }), succeed = _d[0], setSucceed = _d[1];
    var _e = client_1.useMutation(node, variables), action = _e[0], _f = _e[1], loading = _f.loading, error = _f.error;
    var ctrl = new controller_1.default();
    var form = custom_use_form_1.default({ schema: schema });
    react_1.useEffect(function () {
        return function cleanup() {
            form === null || form === void 0 ? void 0 : form.reset();
            DialogStore_1.default.closeFromOutside();
            DialogStore_1.default.clear();
        };
    }, []);
    var onSubmit = function (data) {
        var _a;
        var _b;
        loop ? (data && data[listKey] ? data[listKey] : []).map(function (item) {
            var _a;
            var _b;
            action({
                variables: {
                    input: (_a = {},
                        _a[firstKey] = item,
                        _a[secondKey] = (_b = dataToEdit === null || dataToEdit === void 0 ? void 0 : dataToEdit.id) !== null && _b !== void 0 ? _b : "",
                        _a)
                },
            }).then(function (results) {
                setSucceed({
                    state: true,
                    message: "operation-succeed"
                });
                form === null || form === void 0 ? void 0 : form.reset();
                setTimeout(function () {
                    setSucceed({
                        state: false,
                        message: "operation-succeed"
                    });
                    DialogStore_1.default.closeFromOutside();
                    setFormData(null);
                }, 1000);
            }).catch(function (error) {
                console.debug(error);
            });
        }) : action({
            variables: {
                input: (_a = {},
                    _a[firstKey] = data[listKey],
                    _a[secondKey] = (_b = dataToEdit === null || dataToEdit === void 0 ? void 0 : dataToEdit.id) !== null && _b !== void 0 ? _b : "",
                    _a)
            },
        }).then(function (results) {
            setSucceed({
                state: true,
                message: "operation-succeed"
            });
            form === null || form === void 0 ? void 0 : form.reset();
            setTimeout(function () {
                setSucceed({
                    state: false,
                    message: "operation-succeed"
                });
                DialogStore_1.default.closeFromOutside();
                setFormData(null);
            }, 1000);
        }).catch(function (error) {
            console.debug(error);
        });
    };
    var onReset = function () {
        form === null || form === void 0 ? void 0 : form.reset();
        DialogStore_1.default.closeFromOutside();
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(carbon_components_react_1.Form, { onSubmit: form === null || form === void 0 ? void 0 : form.handleSubmit(onSubmit, ctrl.onErrors) },
            React.createElement(request_alert_1.default, { error: error, success: succeed, loading: loading }),
            React.createElement(carbon_components_react_1.ModalBody, null,
                React.createElement("p", { className: "bx--modal-header__heading" }, t(description !== null && description !== void 0 ? description : "")),
                React.createElement("br", null), inputs === null || inputs === void 0 ? void 0 :
                inputs.map(function (item) {
                    return input_builder_1.default({ input: item, form: form });
                })),
            React.createElement(carbon_components_react_1.ModalFooter, null,
                React.createElement(modal_actions_1.default, { reset: onReset, loading: loading, succeed: succeed })))));
};
exports.default = mobx_react_1.observer(AttachFormGenerator);
//# sourceMappingURL=index.js.map