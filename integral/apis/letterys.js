var t = require("../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.checkCanJoin = function(t) {
    return (0, e.default)({
        url: "/applets/luck/activity/checkCanJoin",
        method: "POST",
        data: t
    });
}, exports.getFreeDrawCount = function(t) {
    return (0, e.default)({
        url: "/applets/luck/activity/reqUserPlayInfo",
        method: "POST",
        data: t
    });
}, exports.getLuckSpu = function(t) {
    return (0, e.default)({
        url: "/applets/luck/activity/getLuckSpu",
        method: "POST",
        data: t
    });
}, exports.getReqCanJoinList = function(t) {
    return (0, e.default)({
        url: "/applets/luck/activity/reqCanJoinList",
        method: "POST",
        data: t
    });
}, exports.getReqPageSet = function(t) {
    return (0, e.default)({
        url: "/applets/luck/activity/reqPageSet",
        data: {
            activityId: t
        }
    });
}, exports.getWinningList = function(t) {
    return (0, e.default)({
        url: "/applets/luck/activity/getWinningList",
        data: t,
        isShow: !0
    });
}, exports.receiveLuckSpu = function(t) {
    return (0, e.default)({
        url: "/applets/luck/activity/receiveLuckSpu",
        method: "POST",
        data: t
    });
}, exports.reqAwardProductList = function(t) {
    return (0, e.default)({
        url: "/applets/luck/activity/reqAwardProductList",
        data: {
            activityId: t
        }
    });
};

var e = t(require("../utils/request"));