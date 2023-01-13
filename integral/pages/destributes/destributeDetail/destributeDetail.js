var e = require("../../../@babel/runtime/helpers/interopRequireDefault"), t = require("../../../@babel/runtime/helpers/createForOfIteratorHelper"), a = (require("../../../apis/user"), 
e(require("../../../utils/weapp-qrcode"))), o = require("../../../utils/index.js"), i = (require("../../../utils/index.js"), 
getApp());

Page({
    data: {
        userCodeInfo: {},
        qrCode: "",
        destributeDetail: null,
        imgUrl: "",
        isShowRule: !1
    },
    onLoad: function(e) {
        this.setData({
            imgUrl: i.globalData.imageUrl,
            destributeDetail: e.detail ? JSON.parse(e.detail) : null
        }), console.log(JSON.parse(e.detail)), this.getMemberCode();
    },
    onReady: function() {},
    onShow: function() {},
    openRule: function() {
        var e = this.data.isShowRule;
        this.setData({
            isShowRule: !e
        });
    },
    getMemberCode: function() {
        var e = this.data.destributeDetail;
        this.setData({
            qrCode: e.couponCode
        }), new a.default("myQrcode", {
            text: e.couponCode,
            width: 121,
            height: 121,
            padding: 0,
            correctLevel: a.default.CorrectLevel.L,
            usingIn: this
        }), o.barcode("barcode", e.couponCode, 241, 65);
    },
    getUserInfo: function() {
        var e = this, t = {
            customerId: wx.getStorageSync("userId")
        };
        Http.get("/applets/member/customer/getUserInfo", t).then(function(t) {
            200 == t.code && ("https://thirdwx.qlogo.cn" == t.data.customerInfo.headimg.substring(0, 24) ? e.setData({
                isWeChat: !0
            }) : e.setData({
                isWeChat: !1
            }), e.setData({
                customerInfo: t.data.customerInfo,
                fieldList: t.data.fieldList
            }));
        });
    },
    getIntegral: function() {
        var e = this, t = {
            customerId: wx.getStorageSync("userId")
        };
        Http.get("applets/member/customer/getUserScoreLevel", t).then(function(t) {
            200 == t.code && (-1 !== t.data.levelRgb.indexOf("|") && (t.data.levelRgb = "linear-gradient(to right,".concat(t.data.levelRgb.split("|")[0], ", ").concat(t.data.levelRgb.split("|")[1], ")")), 
            e.setData({
                leave_data: t.data
            }));
        });
    },
    getbackGroundImg: function() {
        var e = this;
        Http.get("applets/config/page/1").then(function(a) {
            if (200 == a.code) {
                if (null != a.data.pageConfigs) {
                    var o, i = t(a.data.pageConfigs);
                    try {
                        for (i.s(); !(o = i.n()).done; ) {
                            var n = o.value;
                            10 == n.configType && e.setData({
                                headerBImg: n.imgUrl
                            }), 1 == n.configType && e.setData({
                                logoImg: n.imgUrl
                            }), 2 == n.configType && e.setData({
                                topBackground: n.imgUrl
                            });
                        }
                    } catch (e) {
                        i.e(e);
                    } finally {
                        i.f();
                    }
                }
                a.data.modelConfigs.length > 8 && (e.setData({
                    iconShow: !0
                }), 0 == e.data.isShowAll && (a.data.modelConfigs = a.data.modelConfigs.splice(0, 8)), 
                1 == e.data.isShowAll && (a.data.modelConfigs = a.data.modelConfigs)), e.setData({
                    configuration: a.data
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});