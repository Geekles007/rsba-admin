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
var react_i18next_1 = require("react-i18next");
var React = require("react");
var client_1 = require("@apollo/client");
// @ts-ignore
var DialogStore_1 = require("container/DialogStore");
var carbon_components_react_1 = require("carbon-components-react");
var GenericDelete = function (_a) {
    var list = _a.list, operation = _a.operation, text = _a.text;
    var _b = react_1.useState({ message: "operation-succeed" }), succeed = _b[0], setSucceed = _b[1];
    var t = react_i18next_1.useTranslation('translation', { useSuspense: false }).t;
    var _c = client_1.useMutation(operation === null || operation === void 0 ? void 0 : operation.node, __assign({ notifyOnNetworkStatusChange: true }, operation === null || operation === void 0 ? void 0 : operation.variables)), action = _c[0], _d = _c[1], loading = _d.loading, data = _d.data, error = _d.error;
    react_1.useEffect(function () {
        return function cleanup() {
            DialogStore_1.default.clear();
        };
    }, []);
    var onDelete = function () {
        list === null || list === void 0 ? void 0 : list.map(function (item) {
            action({
                variables: { input: item === null || item === void 0 ? void 0 : item.id },
            }).then(function (results) {
                setSucceed({
                    state: true,
                    message: "operation-succeed"
                });
                setTimeout(function () {
                    setSucceed({
                        state: false,
                        message: "operation-succeed"
                    });
                }, 1000);
                DialogStore_1.default.closeFromOutside();
            }).catch(function (error) {
                console.debug(error);
            });
        });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(carbon_components_react_1.ModalBody, { className: "rs-modal-body" },
            React.createElement("span", null, t(text))),
        React.createElement(carbon_components_react_1.ModalFooter, null,
            React.createElement(carbon_components_react_1.Button, { kind: "secondary", type: "button", onClick: DialogStore_1.default.closeFromOutside }, t('no-text')),
            loading || succeed.state ?
                React.createElement(carbon_components_react_1.InlineLoading, { style: { marginLeft: '1rem' }, description: loading ? t('loading-text') : t('operation-finished'), status: succeed.state ? 'finished' : 'active', "aria-live": "polite" }) : (React.createElement(carbon_components_react_1.Button, { kind: "danger", type: "button", onClick: onDelete }, t('yes-text'))))));
};
exports.default = (react_1.memo(GenericDelete));
//# sourceMappingURL=index.js.map