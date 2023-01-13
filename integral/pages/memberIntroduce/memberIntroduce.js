var e = require("../../apis/user"), a = getApp();

Page({
    data: {
        customerScore: "",
        levelRgb: "#ffffff",
        levelImg: "",
        nextLevel: "",
        nowLevel: "",
        nowLevelScore: "",
        ruleDesc: "",
        line: "0%",
        headImg: "",
        nickName: "",
        imgUrl: ""
    },
    onLoad: function(e) {
        this.setData({
            imgUrl: a.globalData.imageUrl
        }), wx.getStorageSync("userInfo") && (this.setData({
            headImg: wx.getStorageSync("userInfo").headimg,
            nickName: wx.getStorageSync("userInfo").nickname
        }), this.getMemberGrapeMessage());
    },
    onReady: function() {},
    onShow: function() {},
    getMemberGrapeMessage: function() {
        var a = this, t = wx.getStorageSync("userId");
        (0, e.getMemberGrapeMessage)(t).then(function(e) {
            200 === e.code && (console.log("等级", e), -1 !== e.data.levelRgb.indexOf("|") && (e.data.levelRgb = "linear-gradient(to right,".concat(e.data.levelRgb.split("|")[0], ", ").concat(e.data.levelRgb.split("|")[1], ")")), 
            a.setData({
                customerScore: e.data.customerScore,
                levelRgb: e.data.levelRgb,
                levelImg: e.data.levelImg,
                nextLevel: e.data.nextLevel,
                nowLevel: e.data.nowLevel,
                nowLevelScore: e.data.nowLevelScore,
                ruleDesc: e.data.ruleDesc,
                line: Math.floor(e.data.customerScore / e.data.nowLevelScore * 100) + "%"
            }));
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});