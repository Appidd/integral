var e = require("../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getCurrentCityName = function(e) {
    return (0, t.default)({
        url: "/applets/member/store/getCityName",
        data: e
    });
}, exports.getNearShopList = function(e) {
    return (0, t.default)({
        url: "/applets/member/store/getList",
        data: e
    });
}, exports.getShopInfo = function(e) {
    return (0, t.default)({
        url: "/applets/member/store/getStore",
        data: e
    });
};

var t = e(require("../utils/request"));