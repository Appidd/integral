var e = require("../../apis/user");

Page({
    data: {
        nickName: "",
        headImg: "",
        scoresParket: {}
    },
    onLoad: function(e) {
        wx.getStorageSync("userInfo") && (this.setData({
            nickName: wx.getStorageSync("userInfo").nickname,
            headImg: wx.getStorageSync("userInfo").headimg
        }), this.getScoreWallet());
    },
    onReady: function() {},
    onShow: function() {},
    getScoreWallet: function() {
        var a = this, t = wx.getStorageSync("userId");
        (0, e.getScoreWallet)(t).then(function(e) {
            200 === e.code && (console.log("积分钱包", e), a.setData({
                scoresParket: e.data
            }));
        });
    },
    intoPage: function(e) {
        switch (console.log(e), e.currentTarget.dataset.index) {
          case "0":
            wx.navigateTo({
                url: "/pages/personalCenter/personalCenter"
            });
            break;

          case "1":
            wx.navigateTo({
                url: "/pages/exchange/exchangeLists/exchangeLists"
            });
            break;

          case "2":
            wx.navigateTo({
                url: "/pages/addresses/addressLists/addressLists"
            });
            break;

          case "3":
            wx.navigateTo({
                url: "/pages/collectLists/collectLists"
            });
        }
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});