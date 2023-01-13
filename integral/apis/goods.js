var t = require("../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.addShopCar = function(t) {
    return (0, e.default)({
        url: "/applets/points/shoppingCar/addShoppingCar",
        data: t
    });
}, exports.alterShoppingNumber = function(t) {
    return (0, e.default)({
        url: "/applets/points/shoppingCar/alterShoppingNumber",
        data: t
    });
}, exports.deleteShopCar = function(t) {
    return (0, e.default)({
        url: "/applets/points/shoppingCar/deleteShoppingCar",
        data: {
            id: t
        }
    });
}, exports.getGoodDescImg = function(t) {
    return (0, e.default)({
        url: "/applets/points/product/getSkuImg",
        data: {
            id: t
        }
    });
}, exports.getGoodDetail = function(t) {
    return (0, e.default)({
        url: "/applets/points/product/getProductById",
        data: {
            id: t
        }
    });
}, exports.getGoodLists = function(t, r, p) {
    return (0, e.default)({
        url: "/applets/points/product/getProductList?pageNum=".concat(r, "&pageSize=").concat(p),
        method: "POST",
        data: t
    });
}, exports.getHotNewGoods = function(t) {
    return (0, e.default)({
        url: "/applets/points/product/getSpecialSpuList",
        data: {
            specialValue: t
        }
    });
}, exports.getProductClassifyList = function(t) {
    return (0, e.default)({
        url: "/applets/points/product/getProductClassifyList",
        data: {
            parentId: t
        }
    });
}, exports.getProductSkuList = function(t) {
    return (0, e.default)({
        url: "/applets/points/product/getProductSkuList",
        data: {
            id: t
        }
    });
}, exports.getShopCarList = function(t) {
    return (0, e.default)({
        url: "/applets/points/shoppingCar/getShoppingCarList",
        data: {
            customerId: t
        }
    });
};

var e = t(require("../utils/request"));