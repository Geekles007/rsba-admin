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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var uuid_1 = require("uuid");
var React = require("react");
var useInfiniteScroll = function (_a) {
    var _b, _c;
    var data = _a.data, fetchMore = _a.fetchMore, _d = _a.retrieveAttributes, retrieveAttributes = _d === void 0 ? "" : _d, _e = _a.count, count = _e === void 0 ? 20 : _e;
    var _f = react_1.useState(false), loading = _f[0], setLoading = _f[1];
    var _g = react_1.useState(true), hasMore = _g[0], setHasMore = _g[1];
    var _h = react_1.useState(uuid_1.v4()), refresher = _h[0], setRefresher = _h[1];
    var _j = react_1.useState(new Date()), lastUpdate = _j[0], setLastUpdate = _j[1];
    var _k = react_1.useState(data), income = _k[0], setIncome = _k[1];
    var _l = react_1.useState((_c = (_b = income[income.length - 1]) === null || _b === void 0 ? void 0 : _b.id) !== null && _c !== void 0 ? _c : ""), lastId = _l[0], setLastId = _l[1];
    var isNotMounted = React.useRef(false);
    react_1.useEffect(function () {
        return function () {
            isNotMounted.current = true;
        };
    }, []);
    react_1.useEffect(function () {
        var _a, _b;
        if (income) {
            setLastId((_b = (_a = income[income.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : "");
        }
    }, [income, lastId]);
    var loadMore = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var lastAdd5, data_1, value, adding, e_1;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    lastAdd5 = new Date(lastUpdate.getTime() + 2000);
                    if (!(fetchMore && (new Date().getTime() > lastAdd5.getTime()))) return [3 /*break*/, 6];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, 4, 5]);
                    setLoading(function () { return true; });
                    return [4 /*yield*/, fetchMore({
                            variables: {
                                first: count,
                                after: lastId,
                            }
                        })];
                case 2:
                    data_1 = _d.sent();
                    if (!(data_1 === null || data_1 === void 0 ? void 0 : data_1.data))
                        return [2 /*return*/];
                    value = data_1.data;
                    adding = (_b = (_a = value === null || value === void 0 ? void 0 : value[retrieveAttributes]) === null || _a === void 0 ? void 0 : _a.edges.map(function (input) { return input === null || input === void 0 ? void 0 : input.node; })) !== null && _b !== void 0 ? _b : [];
                    setIncome(__spreadArray(__spreadArray([], (income !== null && income !== void 0 ? income : [])), adding));
                    setRefresher(uuid_1.v4());
                    if (((_c = adding === null || adding === void 0 ? void 0 : adding.length) !== null && _c !== void 0 ? _c : 0) < count && !isNotMounted.current) {
                        setHasMore(function () { return false; });
                    }
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _d.sent();
                    console.log("Error ", e_1);
                    return [3 /*break*/, 5];
                case 4:
                    if (!isNotMounted.current) {
                        setLoading(function () { return false; });
                        setLastUpdate(function () { return new Date(); });
                    }
                    return [7 /*endfinally*/];
                case 5: return [3 /*break*/, 7];
                case 6:
                    setLoading(function () { return true; });
                    setTimeout(function () {
                        setLoading(function () { return false; });
                    }, 2000);
                    _d.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    }); }, [setIncome, lastId]);
    return {
        hasMore: hasMore,
        loading: loading,
        loadMore: loadMore,
        income: income,
        refresher: refresher
    };
};
exports.default = (useInfiniteScroll);
//# sourceMappingURL=index.js.map