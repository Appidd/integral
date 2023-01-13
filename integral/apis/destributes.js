var e = require("../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getDestributeLists = function(e) {
    return (0, t.default)({
        url: "/applets/member/coupon/getList",
        method: "POST",
        data: e
    });
}, exports.getDestributeWallet = function(e) {
    return (0, t.default)({
        url: "/applets/member/coupon/getCouponWallet",
        data: {
            customerId: e
        }
    });
};

var t = e(require("../utils/request"));

require("../config/config");