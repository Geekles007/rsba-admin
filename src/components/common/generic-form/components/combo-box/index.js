"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var React = require("react");
var carbon_components_react_1 = require("carbon-components-react");
var react_i18next_1 = require("react-i18next");
// @ts-ignore
var KeyBuilder_1 = require("core/KeyBuilder");
var generic_query_all_1 = require("../../../generic-query-all");
var empty_state_1 = require("../../../empty-state");
var FromControlObject = function (_a) {
    var _b, _c, _d;
    var documentNode = _a.documentNode, name = _a.name, labelText = _a.labelText, placeholder = _a.placeholder, form = _a.form, defaultValue = _a.defaultValue, client = _a.client, objectProperty = _a.objectProperty, variables = _a.variables, more = _a.more;
    var t = react_i18next_1.useTranslation('translation', { useSuspense: false }).t;
    react_1.useEffect(function () { return console.debug('…'); }, [documentNode]);
    var reversed = react_1.useMemo(function () { return new Map(); }, []);
    var _e = generic_query_all_1.default({
        node: documentNode,
        client: client,
        variables: variables
    }), data = _e.values, all = _e.outcome;
    form === null || form === void 0 ? void 0 : form.register({ name: name }, { required: true });
    if (all.loading)
        return React.createElement(carbon_components_react_1.InlineLoading, { description: t('loading-text') });
    if (all.error)
        return React.createElement(empty_state_1.default, { title: t("nothing-found") });
    var message = (_c = (_b = form === null || form === void 0 ? void 0 : form.errors[name]) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : "Invalid value for the " + name;
    var prop = objectProperty !== null && objectProperty !== void 0 ? objectProperty : 'name';
    // @ts-ignore
    if (more) {
        ((_d = data[more]) !== null && _d !== void 0 ? _d : []).map(function (item) {
            reversed.set(item['id'], item[prop]);
        });
    }
    else {
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var _f = data_1[_i], key = _f[0], value = _f[1];
            reversed.set(key, value[prop]);
        }
    }
    var values = Array.from(reversed.keys());
    return React.createElement(carbon_components_react_1.ComboBox, { ariaLabel: "ComboBox", id: KeyBuilder_1.default.build, invalidText: message, invalid: (form === null || form === void 0 ? void 0 : form.errors[name]) !== undefined, name: name, items: values, itemToString: function (item) {
            var elt = (reversed.get(item));
            return elt;
        }, selectedItem: defaultValue, onChange: (function (picked) { return __awaiter(void 0, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                if (!picked || !picked.selectedItem) {
                    form === null || form === void 0 ? void 0 : form.setError(name, message);
                }
                else {
                    value = picked.selectedItem;
                    form === null || form === void 0 ? void 0 : form.setValue(name, value);
                }
                return [2 /*return*/];
            });
        }); }), placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : '', titleText: labelText });
};
exports.default = react_1.memo(FromControlObject);
//# sourceMappingURL=index.js.map