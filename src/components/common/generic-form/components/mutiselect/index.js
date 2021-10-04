"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var React = require("react");
var carbon_components_react_1 = require("carbon-components-react");
var react_i18next_1 = require("react-i18next");
// @ts-ignore
var KeyBuilder_1 = require("core/KeyBuilder");
var generic_query_all_1 = require("../../../generic-query-all");
var empty_state_1 = require("../../../empty-state");
var MultiSelector = function (_a) {
    var _b, _c;
    var documentNode = _a.documentNode, name = _a.name, labelText = _a.labelText, placeholder = _a.placeholder, form = _a.form, client = _a.client, defaultValue = _a.defaultValue, objectProperty = _a.objectProperty;
    var t = react_i18next_1.useTranslation('translation', { useSuspense: false }).t;
    react_1.useEffect(function () { return console.debug('…'); }, [documentNode]);
    var reversed = react_1.useMemo(function () { return new Map(); }, []);
    var _d = generic_query_all_1.default({
        node: documentNode,
        client: client
    }), data = _d.values, all = _d.outcome;
    form === null || form === void 0 ? void 0 : form.register({ name: name }, { required: true });
    if (all.loading)
        return React.createElement(carbon_components_react_1.InlineLoading, { description: t('loading-text') });
    if (all.error)
        return React.createElement(empty_state_1.default, { title: t("nothing-found") });
    var message = (_c = (_b = form === null || form === void 0 ? void 0 : form.errors[name]) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : "Invalid value for the " + name;
    var prop = objectProperty !== null && objectProperty !== void 0 ? objectProperty : 'name';
    // @ts-ignore
    // for (let [key, value] of data) {
    //     reversed.set(value[prop], key);
    // }
    var values = Array.from(data.keys());
    return React.createElement(carbon_components_react_1.MultiSelect.Filterable, { id: KeyBuilder_1.default.build, invalidText: message, invalid: (form === null || form === void 0 ? void 0 : form.errors[name]) !== undefined, items: values, itemToString: function (item) {
            var elt = (data.get(item));
            return elt ? elt[prop] : "";
        }, initialSelectedItems: defaultValue, onChange: function (picked) {
            if (!picked || !picked.selectedItems) {
                form === null || form === void 0 ? void 0 : form.setError(name, message);
            }
            else {
                form === null || form === void 0 ? void 0 : form.setValue(name, picked.selectedItems);
            }
        }, placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : '', titleText: labelText });
};
exports.default = react_1.memo(MultiSelector);
//# sourceMappingURL=index.js.map