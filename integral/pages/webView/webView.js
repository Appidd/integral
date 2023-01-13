Page({
    data: {
        link: "",
        unionId: ""
    },
    onLoad: function(n) {
        n.link && (-1 !== n.link.indexOf("kefu2") && (n.link = "".concat(n.link, "?unionId=").concat(wx.getStorageSync("unionId"))), 
        this.setData({
            link: n.link
        })), this.setData({
            unionId: wx.getStorageSync("unionId")
        }), console.log(n.link);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});