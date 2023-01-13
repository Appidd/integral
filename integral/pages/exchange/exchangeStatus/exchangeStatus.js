Page({
    data: {
        exchangeSuccess: !1,
        orderId: "",
        reason: "",
        isAward: !1
    },
    onLoad: function(e) {
        this.setData({
            exchangeSuccess: "true" === e.exchangeSuccess,
            orderId: e.orderId ? e.orderId : "",
            reason: e.reason ? e.reason : "",
            isAward: !!e.award
        });
    },
    onReady: function() {},
    onShow: function() {},
    intoOrderDetail: function() {
        var e = this.data.orderId;
        console.log("ppp", e), !0 === this.data.exchangeSuccess ? wx.navigateTo({
            url: "/pages/order/orderDetail/orderDetail?orderId=".concat(e)
        }) : wx.reLaunch({
            url: "/pages/goods/goodLists/goodLists"
        });
    },
    onHide: function() {},
    onUnload: function() {
        var e = getCurrentPages(), o = e[e.length - 3];
        o.changeOrderOut && o.changeOrderOut();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});