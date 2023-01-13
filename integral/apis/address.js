var e = require("../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.deleteAddress = function(e) {
    return (0, s.default)({
        url: "/applets/points/address/deleteAddress",
        data: {
            addressId: e
        }
    });
}, exports.getAddressDetail = function(e) {
    return (0, s.default)({
        url: "/applets/points/address/getAddressDetail",
        data: {
            addressId: e
        }
    });
}, exports.getAddressLists = function(e) {
    return (0, s.default)({
        url: "/applets/points/address/getAddressList",
        data: {
            customerId: e
        }
    });
}, exports.getDefaultAddress = function(e) {
    return (0, s.default)({
        url: "/applets/points/address/getDefaultAddress",
        data: {
            customerId: e
        }
    });
}, exports.modifyAddress = function(e) {
    return (0, s.default)({
        url: "/applets/points/address/updateAddress",
        method: "POST",
        data: e
    });
}, exports.saveNewAddress = function(e) {
    return (0, s.default)({
        url: "/applets/points/address/insertAddress",
        method: "POST",
        data: e
    });
}, exports.setDefaultAddress = function(e) {
    return (0, s.default)({
        url: "/applets/points/address/doDefaultAddress",
        data: e
    });
};

var s = e(require("../utils/request"));

require("../config/config");