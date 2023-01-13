var o = require("../../../apis/orders");

Page({
    data: {
        logisticsName: "",
        logisticsNo: "",
        postStatus: []
    },
    onLoad: function(o) {
        o.orderId && this.queryExpress(o.orderId);
    },
    onReady: function() {},
    onShow: function() {},
    handleContact: function(o) {
        wx.navigateTo({
            url: "/pages/webView/webView"
        });
    },
    queryExpress: function(t) {
        var s = this;
        (0, o.queryExpress)(t).then(function(o) {
            200 === o.code && s.setData({
                logisticsName: o.data.logisticsName,
                logisticsNo: o.data.logisticsNo,
                postStatus: o.data.logisticsInformationBodyVos
            }), console.log("物流", o);
        });
    },
    copyCode: function() {
        wx.setClipboardData({
            data: this.data.logisticsNo,
            success: function() {
                wx.showToast({
                    title: "已复制",
                    icon: "success"
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