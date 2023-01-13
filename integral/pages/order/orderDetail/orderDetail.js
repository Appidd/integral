var o = require("../../../apis/orders"), t = getApp();

Page({
    data: {
        imgUrl: "",
        orderId: "",
        orderDetail: {},
        postDetail: {}
    },
    onLoad: function(o) {
        this.setData({
            imgUrl: t.globalData.imageUrl,
            orderId: o.orderId ? o.orderId : ""
        }), this.getOrderDetail();
    },
    queryExpress: function(t) {
        var e = this;
        (0, o.queryExpress)(t).then(function(o) {
            if (console.log("物流信息", o), 200 === o.code && o.data.logisticsInformationBodyVos) {
                var t = o.data.logisticsInformationBodyVos;
                e.setData({
                    postDetail: t[t.length - 1]
                });
            }
        });
    },
    handleContact: function(o) {
        wx.navigateTo({
            url: "/pages/webView/webView"
        });
    },
    getOrderDetail: function() {
        var t = this;
        console.log("订单id", this.data.orderId);
        var e = this.data.orderId;
        (0, o.getOrderDetail)(e).then(function(o) {
            console.log(o), 200 === o.code && (t.setData({
                orderDetail: o.data
            }), t.queryExpress(e));
        });
    },
    intoGoodDetail: function(o) {
        var t = o.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/goods/goodDetail/goodDetail?id=".concat(t)
        });
    },
    intoPostDetail: function(o) {
        var t = this.data.orderDetail.id;
        wx.navigateTo({
            url: "/pages/order/postMessage/postMessage?orderId=".concat(t)
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