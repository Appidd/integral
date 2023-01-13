var e = require("../../../apis/address");

getApp();

Page({
    data: {
        addressLists: [],
        isLoadingOver: !1,
        isRefresh: !1,
        isBack: !1,
        moveSpace: 0,
        pageX: 0,
        gap: 0,
        addressId: ""
    },
    onLoad: function(e) {
        this.setData({
            isBack: !!e.isBack
        });
    },
    onReady: function() {},
    onShow: function() {
        wx.getStorageSync("userInfo") && this.getAddressLists();
    },
    getAddressLists: function() {
        var t = this, s = wx.getStorageSync("userId");
        (0, e.getAddressLists)(s).then(function(e) {
            setTimeout(function() {
                t.setData({
                    isRefresh: !1
                });
            }, 500), 200 === e.code && (console.log("地址", e), t.setData({
                addressLists: e.data,
                isLoadingOver: !0
            }));
        });
    },
    refreshOrderLists: function() {
        this.setData({
            addressLists: [],
            isRefresh: !0
        }), this.getAddressLists();
    },
    intoNewaddress: function() {
        wx.getStorageSync("userInfo") ? wx.navigateTo({
            url: "/pages/addresses/newAddress/newAddress"
        }) : wx.showModal({
            title: "请先登录",
            content: "您还未登录，请先登录",
            success: function(e) {
                e.confirm && wx.navigateTo({
                    url: "/pages/userLogin/userLogin"
                });
            }
        });
    },
    intoEditAddress: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/addresses/newAddress/newAddress?type=old&id=".concat(t)
        });
    },
    deleteAddress: function(t) {
        var s = this, a = t.currentTarget.dataset.id;
        wx.showModal({
            title: "删除收货地址",
            content: "是否确定删除该地址",
            complete: function(t) {
                t.confirm && (0, e.deleteAddress)(a).then(function(e) {
                    200 === e.code && wx.showToast({
                        title: "删除成功",
                        icon: "none",
                        duration: 1500,
                        success: function() {
                            s.getAddressLists();
                        }
                    });
                });
            }
        });
    },
    setIsDefault: function(t) {
        var s = this, a = t.currentTarget.dataset.id, n = t.currentTarget.dataset.default, o = {
            addressId: a,
            defaultStatus: n = 1 === n ? 0 : 1
        };
        (0, e.setDefaultAddress)(o).then(function(e) {
            console.log(e), 200 === e.code && (wx.showToast({
                title: 0 === n ? "已取消默认地址" : "已设为默认地址",
                icon: "none",
                duration: 1500
            }), s.getAddressLists());
        });
    },
    chooseCurrentAddress: function(e) {
        if (this.data.isBack) {
            var t = e.currentTarget.dataset.item, s = getCurrentPages(), a = s[s.length - 2];
            wx.navigateBack({
                delta: 1,
                success: function() {
                    a.getBackAddress(t);
                }
            });
        }
    },
    moveStart: function(e) {
        var t = e.currentTarget.dataset.id;
        this.setData({
            pageX: e.changedTouches[0].pageX,
            addressId: t
        });
    },
    moving: function(e) {
        var t = this.data.moveSpace, s = e.changedTouches[0].pageX - this.data.pageX;
        t + s >= -106 && t + s <= 0 ? this.setData({
            gap: s
        }) : t + s < -106 ? this.setData({
            gap: 0,
            moveSpace: -106
        }) : this.setData({
            gap: 0,
            moveSpace: 0
        });
    },
    moveEnd: function(e) {
        this.data.moveSpace + this.data.gap > -53 ? this.setData({
            moveSpace: 0,
            gap: 0
        }) : this.setData({
            moveSpace: -106,
            gap: 0
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});