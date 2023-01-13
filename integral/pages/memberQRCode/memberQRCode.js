var e = require("../../@babel/runtime/helpers/interopRequireDefault"), t = require("../../apis/user"), a = require("../../apis/common"), n = e(require("../../utils/weapp-qrcode")), o = require("../../utils/index.js"), i = (require("../../utils/index.js"), 
getApp());

Page({
    data: {
        userCodeInfo: {},
        qrCode: "",
        topBackground: "",
        logoImg: "",
        headerBImg: "",
        isMember: !1,
        imgUrl: "",
        community: null,
        lightVal: .5
    },
    onLoad: function(e) {
        var t = this;
        wx.getScreenBrightness({
            success: function(e) {
                t.setData({
                    lightVal: e.value
                }), wx.setScreenBrightness({
                    value: 1
                });
            }
        }), t.setData({
            imgUrl: i.globalData.imageUrl
        }), e.isMember && "true" === e.isMember && (t.setData({
            isMember: !0
        }), t.getMemberCode(), wx.setNavigationBarTitle({
            title: "会员码"
        })), t.getCommunityApplets();
    },
    onReady: function() {},
    onShow: function() {},
    getCommunityApplets: function() {
        var e = this;
        (0, a.getCommunityApplets)().then(function(t) {
            200 === t.code && (e.setData({
                community: t.data
            }), new n.default("myQrcode", {
                text: t.data.communityCode,
                width: 250,
                height: 250,
                padding: 0,
                correctLevel: n.default.CorrectLevel.H,
                usingIn: e
            })), console.log("社群", t);
        });
    },
    getMemberCode: function() {
        var e = this, a = wx.getStorageSync("userId");
        (0, t.getMemberCode)(a).then(function(t) {
            console.log("码", t), 200 === t.code && (-1 !== t.data.levelRgb.indexOf("|") && (t.data.levelRgb = "linear-gradient(to right,".concat(t.data.levelRgb.split("|")[0], ", ").concat(t.data.levelRgb.split("|")[1], ")")), 
            e.setData({
                userCodeInfo: t.data,
                qrCode: t.data.qrCode
            }), new n.default("myQrcode", {
                text: t.data.qrCode,
                width: 250,
                height: 250,
                padding: 0,
                correctLevel: n.default.CorrectLevel.H,
                usingIn: e
            }), o.barcode("barcode", t.data.barCode, 600, 140));
        });
    },
    onHide: function() {},
    onUnload: function() {
        wx.setScreenBrightness({
            value: this.data.lightVal
        });
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});