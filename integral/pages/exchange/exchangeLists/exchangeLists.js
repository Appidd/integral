var t = require("../../../apis/orders"), e = getApp();

Page({
    data: {
        types: [ {
            id: -1,
            name: "全部",
            isActive: !0
        }, {
            id: 2,
            name: "已发货",
            isActive: !1
        }, {
            id: 3,
            name: "已完成",
            isActive: !1
        } ],
        status: -1,
        lists: [],
        lineAnimation: [],
        imgUrl: "",
        isRefresh: !1,
        scrollTop: 0
    },
    onLoad: function(t) {
        wx.getStorageSync("userInfo") && this.getOrderLists(), this.setData({
            imgUrl: e.globalData.imageUrl
        });
    },
    intoPostDetail: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/order/postMessage/postMessage?orderId=".concat(e)
        });
    },
    getOrderLists: function() {
        var e = this;
        if (wx.getStorageSync("userInfo")) {
            var s = {
                customerId: wx.getStorageSync("userId"),
                status: this.data.status
            };
            (0, t.getOrderLists)(s).then(function(t) {
                console.log(t), 200 === t.code && e.setData({
                    lists: t.data,
                    isRefresh: !1
                });
            });
        }
    },
    refreshOrderLists: function() {
        this.setData({
            isRefresh: !0,
            lists: []
        }), this.getOrderLists();
    },
    intoOrderDetail: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/order/orderDetail/orderDetail?orderId=".concat(e)
        });
    },
    onReady: function() {},
    onShow: function() {},
    changeType: function(t) {
        console.log(t);
        var e, s = t.currentTarget.dataset.index;
        e = -1 === s ? "14.5%" : 2 === s ? "47.5%" : "80.5%";
        var i = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        });
        i.left(e).step(), this.setData({
            lineAnimation: i.export(),
            status: s,
            scrollTop: 0
        }), this.getOrderLists();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});