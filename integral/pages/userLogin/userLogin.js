var e = require("../../apis/user"), t = require("../../config/config"), a = getApp();

Page({
    data: {
        userInfo: {},
        isMessage: !1,
        isShowAgree: !1,
        agreeLists: [],
        agreeTitle: "",
        agreeContent: "",
        isChecked: !1,
        isShowWriteInfo: !1,
        animationData: [],
        phoneNumber: "",
        name: "",
        sexValue: -1,
        sexLists: [ "男", "女" ],
        birthdayValue: "",
        cityList: [],
        cityText: "",
        isNeedSkip: !1,
        confirmOneTime: !1
    },
    onLoad: function(e) {
        this.getAgree(), this.getUserBaseInfo();
    },
    chooseCity: function(e) {
        console.log(e);
        var t = e.detail.value;
        this.setData({
            cityList: t,
            cityText: t[0] === t[1] ? t[1] + t[2] : t[0] + t[1] + t[2]
        });
    },
    chooseBirthday: function(e) {
        console.log(e), this.setData({
            birthdayValue: e.detail.value
        });
    },
    chooseSex: function(e) {
        this.setData({
            sexValue: e.detail.value
        });
    },
    inputValue: function(e) {
        this.setData({
            name: e.detail.value
        });
    },
    chooseChecked: function() {
        var e = this.data.isChecked;
        e = !e, this.setData({
            isChecked: e
        });
    },
    getAgree: function() {
        var t = this;
        (0, e.getAgree)().then(function(e) {
            200 === e.code && t.setData({
                agreeLists: e.data
            });
        });
    },
    showAgree: function(e) {
        var t = e.currentTarget.dataset.content;
        this.setData({
            isShowAgree: !0,
            agreeTitle: t.title,
            agreeContent: t.content
        });
    },
    closeAgree: function() {
        this.setData({
            isShowAgree: !1
        });
    },
    closeCover: function() {
        this.setData({
            isShowAgree: !1
        });
    },
    getUserBaseInfo: function() {
        var s = this, o = {};
        a.globalData.loginKey && a.globalData.sessionKey ? (o = {
            appid: t.wxAppId,
            userInfo: a.globalData.loginKey,
            sessionKey: a.globalData.sessionKey
        }, console.log("反馈123", o), (0, e.postBaseInfo)(o).then(function(e) {
            200 == e.code && (console.log("返回值", e), a.globalData.sessionKey = e.data.sessionKey, 
            wx.setStorageSync("token", e.data.token), wx.setStorageSync("userId", e.data.customerId), 
            s.setData({
                isNeedSkip: "NEW" === e.data.regStatus
            }));
        })) : a.getSysInfoCallbackFirst = function(n) {
            o = {
                appid: t.wxAppId,
                userInfo: n.data.userInfo,
                sessionKey: n.data.sessionKey
            }, (0, e.postBaseInfo)(o).then(function(e) {
                200 == e.code && (console.log("返回值", e), a.globalData.sessionKey = e.data.sessionKey, 
                wx.setStorageSync("token", e.data.token), wx.setStorageSync("userId", e.data.customerId), 
                s.setData({
                    isNeedSkip: "NEW" === e.data.regStatus
                }));
            });
        };
    },
    loginMessage: function() {
        var s = this;
        s.data.isChecked ? a.globalData.sessionKey && (s.data.confirmOneTime || (s.setData({
            confirmOneTime: !0
        }), wx.getUserProfile({
            desc: "用于完善会员资料",
            success: function(o) {
                if (console.log("弹框信息", o), !o.iv || !o.encryptedData) return wx.updateWeChatApp(), 
                !1;
                var n = {
                    customerId: wx.getStorageSync("userId"),
                    appid: t.wxAppId,
                    encryptedData: o.encryptedData,
                    iv: o.iv,
                    sessionKey: a.globalData.sessionKey
                };
                (0, e.updateUserProfile)(n).then(function(e) {
                    console.log("信息", e), 200 == e.code && (a.globalData.sessionKey = e.data.sessionKey, 
                    wx.setStorageSync("token", e.data.token), s.setData({
                        isMessage: !0
                    }));
                });
            },
            complete: function() {
                s.setData({
                    confirmOneTime: !1
                });
            }
        }))) : wx.showToast({
            title: "请先勾选协议",
            icon: "none",
            duration: 1500
        });
    },
    loginPhone: function(s) {
        var o = this;
        if (o.data.isChecked) {
            var n = {
                appid: t.wxAppId,
                encryptedData: s.detail.encryptedData,
                iv: s.detail.iv,
                sessionKey: a.globalData.sessionKey
            };
            (0, e.bindPhoneNumber)(n).then(function(e) {
                console.log("手机", e), 200 == e.code && (wx.setStorageSync("token", e.data.token), 
                o.data.isNeedSkip || o.setData({
                    isNeedSkip: "NEW" === e.data.regStatus
                }), o.getUserInfo(e.data.token));
            });
        } else wx.showToast({
            title: "请先勾选协议",
            icon: "none",
            duration: 1500
        });
    },
    getUserInfo: function(t) {
        var a = this;
        (0, e.getUserId)(t).then(function(t) {
            200 == t.code && (wx.setStorageSync("userId", t.data), (0, e.getUserMessage)(t.data).then(function(e) {
                200 === e.code && (wx.setStorageSync("userInfo", e.data.customerInfo), a.data.isNeedSkip ? (a.setData({
                    isShowWriteInfo: !0,
                    phoneNumber: e.data.customerInfo.phone
                }), a.showMessageFromRight()) : wx.reLaunch({
                    url: "/pages/userCenter/userCenter"
                }));
            }));
        });
    },
    addOurs: function() {
        if (this.data.name) if (-1 === this.data.sexValue) wx.showToast({
            title: "请选择性别",
            icon: "none",
            duration: 1500
        }); else if (this.data.birthdayValue) if (this.data.cityText) {
            var t = {
                customerId: wx.getStorageSync("userId"),
                birthInfo: this.data.birthdayValue,
                city: this.data.cityText,
                gender: this.data.sexLists[this.data.sexValue],
                name: this.data.name,
                phone: this.data.phoneNumber
            };
            console.log(t), (0, e.postBaseMessage)(t).then(function(e) {
                console.log("加入我们", e), 200 === e.code && (wx.setStorageSync("token", e.data.token), 
                wx.reLaunch({
                    url: "/pages/userCenter/userCenter"
                }));
            });
        } else wx.showToast({
            title: "请选择城市",
            icon: "none",
            duration: 1500
        }); else wx.showToast({
            title: "请选择生日",
            icon: "none",
            duration: 1500
        }); else wx.showToast({
            title: "姓名没填哟",
            icon: "none",
            duration: 1500
        });
    },
    showMessageFromRight: function() {
        var e = wx.createAnimation({
            duration: 1e3,
            timingFunction: "ease"
        });
        e.left("0rpx").step(), this.setData({
            animationData: e.export()
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});