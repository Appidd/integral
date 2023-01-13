var e = require("../../apis/allocation"), t = require("../../apis/user"), n = getApp();

Page({
    data: {
        shortLists: [],
        longLists: [],
        nickName: "",
        headImg: "",
        phoneNumber: ""
    },
    onLoad: function(e) {
        wx.getStorageSync("userInfo") && this.setData({
            nickName: wx.getStorageSync("userInfo").nickname,
            headImg: wx.getStorageSync("userInfo").headimg,
            phoneNumber: wx.getStorageSync("userInfo").phone
        });
    },
    onReady: function() {},
    onShow: function() {
        wx.getStorageSync("userInfo") && this.getCustomerConfig();
    },
    getCustomerConfig: function() {
        var t = this, n = this.data.longLists;
        (0, e.getCustomerConfig)().then(function(e) {
            console.log("个人中心字段", e), 200 === e.code && (e.data.forEach(function(e) {
                "常住地址" !== e.fieldName && "爱好" !== e.fieldName || n.push(e);
            }), t.setData({
                shortLists: e.data,
                longLists: n
            }), t.getUserWriteInfo());
        });
    },
    getUserWriteInfo: function() {
        var e = this, n = wx.getStorageSync("userId"), o = this.data.shortLists, i = this.data.longLists;
        (0, t.getUserWriteInfo)(n).then(function(t) {
            if (console.log("用户信息", t), 200 === t.code) {
                var n = t.data.fieldList;
                o.forEach(function(e) {
                    n.forEach(function(t) {
                        e.fieldName === t.fieldName && (e.info = t.info);
                    });
                }), i.forEach(function(e) {
                    n.forEach(function(t) {
                        e.fieldName === t.fieldName && (e.info = t.info);
                    });
                }), e.setData({
                    shortLists: o,
                    longLists: i
                });
            }
        });
    },
    intoEditInfo: function(e) {
        var t = e.currentTarget.dataset.item;
        "姓名" != t.fieldName && "用户名" != t.fieldName && "称谓" != t.fieldName && "生日" != t.fieldName && "城市" != t.fieldName && ("生日" === t.fieldName && this.data.cannotModify ? wx.showToast({
            title: "生日只能设置一次哟",
            icon: "none",
            duration: 1500
        }) : wx.navigateTo({
            url: "/pages/editPersonalMessage/editPersonalMessage?item=" + JSON.stringify(e.currentTarget.dataset.item)
        }));
    },
    outLogin: function() {
        var e = wx.getStorageSync("userId");
        wx.showModal({
            title: "退出登录",
            content: "是否确认要退出登录",
            success: function(o) {
                o.confirm && (0, t.outLogin)(e).then(function(e) {
                    console.log("退出登录", e), wx.clearStorage({
                        success: function(e) {
                            wx.reLaunch({
                                url: "/pages/userCenter/userCenter",
                                success: function() {
                                    n.wxLogin();
                                }
                            });
                        }
                    });
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