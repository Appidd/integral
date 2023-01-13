var e = require("../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.equityPosition = function() {
    return (0, t.default)({
        url: "/applets/config/equityPosition/".concat(r.source)
    });
}, exports.getCustomerConfig = function() {
    return (0, t.default)({
        url: "/applets/member/customer/getCustomerConfig"
    });
}, exports.getbackGroundImg = function() {
    return (0, t.default)({
        url: "applets/config/page/".concat(r.source)
    });
};

var t = e(require("../utils/request")), r = require("../config/config");