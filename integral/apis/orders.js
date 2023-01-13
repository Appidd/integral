var e = require("../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.createOrder = function(e) {
    return (0, r.default)({
        url: "/applets/points/order/createOrder",
        method: "POST",
        data: e
    });
}, exports.getOrderDetail = function(e) {
    return (0, r.default)({
        url: "/applets/points/order/getDetail",
        data: {
            orderId: e
        }
    });
}, exports.getOrderLists = function(e) {
    return (0, r.default)({
        url: "/applets/points/order/getList",
        data: e
    });
}, exports.orderToken = function(e, t) {
    return (0, r.default)({
        url: "/applets/points/order/orderToken",
        method: "POST",
        data: {
            customerId: e,
            doOrderPhone: t
        }
    });
}, exports.queryExpress = function(e) {
    return (0, r.default)({
        url: "/applets/points/order/queryExpress",
        data: {
            id: e
        }
    });
};

var r = e(require("../utils/request"));