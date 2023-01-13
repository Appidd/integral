var e = require("../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.bindPhoneNumber = function(e) {
    return (0, t.default)({
        url: "/applets/customer/bindPhone/".concat(r.wxAppId),
        method: "POST",
        data: e
    });
}, exports.checkBlackList = function(e) {
    return (0, t.default)({
        url: "/applets/member/customer/checkBlackList?customerId=".concat(e),
        method: "GET"
    });
}, exports.checkMemberInfo = function(e) {
    return (0, t.default)({
        url: "/applets/customer/checkMemberInfo/".concat(e),
        method: "POST"
    });
}, exports.checkPerfectInfo = function(e) {
    return (0, t.default)({
        url: "/applets/customer/checkPerfectInfo",
        data: {
            customerId: e
        }
    });
}, exports.getAgree = function() {
    return (0, t.default)({
        url: "/admin/common/registerConfig/agreementGet",
        data: {
            source: r.source
        }
    });
}, exports.getMemberCode = function(e) {
    return (0, t.default)({
        url: "/applets/member/customer/getMemberCardInfo",
        data: {
            customerId: e
        }
    });
}, exports.getMemberGrapeMessage = function(e) {
    return (0, t.default)({
        url: "/applets/member/customer/getUserScoreLevel",
        data: {
            customerId: e
        }
    });
}, exports.getScoreLists = function(e, r, o) {
    return (0, t.default)({
        url: "/applets/member/customer/getScoreRecordList?pageNum=".concat(r, "&pageSize=").concat(o),
        method: "POST",
        data: e
    });
}, exports.getScoreWallet = function(e) {
    return (0, t.default)({
        url: "/applets/member/customer/getScoreWallet",
        data: {
            configSource: r.source,
            customerId: e
        }
    });
}, exports.getSessionKey = function(e) {
    return (0, t.default)({
        url: "/applets/customer/login/".concat(r.wxAppId),
        data: e
    });
}, exports.getUserId = function(e) {
    return (0, t.default)({
        url: "/applets/customer/getCustomerId",
        data: {
            accessToken: e
        }
    });
}, exports.getUserMessage = function(e) {
    return (0, t.default)({
        url: "/applets/member/customer/getUserInfo",
        data: {
            customerId: e
        }
    });
}, exports.getUserWriteInfo = function(e) {
    return (0, t.default)({
        url: "/applets/member/customer/getUserInfo",
        data: {
            customerId: e
        }
    });
}, exports.memberQueryInfo = function(e) {
    return (0, t.default)({
        url: "/applets/member/customer/memberQueryInfo",
        method: "GET",
        data: {
            customerId: e
        }
    });
}, exports.outLogin = function(e) {
    return (0, t.default)({
        url: "/applets/customer/member/unbind/".concat(e),
        method: "POST",
        data: {
            customerId: e
        }
    });
}, exports.postBaseInfo = function(e) {
    return (0, t.default)({
        url: "/applets/customer/wxInfo/".concat(r.wxAppId),
        method: "POST",
        data: e
    });
}, exports.postBaseMessage = function(e) {
    return (0, t.default)({
        url: "/applets/customer/perfectInformation",
        method: "POST",
        data: e
    });
}, exports.updateUserInfo = function(e) {
    return (0, t.default)({
        url: "/applets/member/customer/updateUserInfo",
        method: "POST",
        data: e
    });
}, exports.updateUserProfile = function(e) {
    return (0, t.default)({
        url: "/applets/customer/updateUserProfile/".concat(r.wxAppId),
        method: "POST",
        data: e
    });
};

var t = e(require("../utils/request")), r = require("../config/config");