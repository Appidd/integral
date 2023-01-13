var e = require("./config/config"), o = require("./apis/user"), a = require("./apis/common");

App({
    onLaunch: function() {
        this.getCommonImageUrl(), this.wxLogin(), console.log("兼容", wx.getUserProfile), 
        wx.getUserProfile || wx.updateWeChatApp();
    },
    wxLogin: function() {
        var a = this;
        wx.login({
            success: function(n) {
                var t = {
                    appid: e.wxAppId,
                    code: n.code
                };
                (0, o.getSessionKey)(t).then(function(e) {
                    console.log("8", e), 200 === e.code && (a.globalData.sessionKey = e.data.sessionKey, 
                    a.globalData.loginKey = e.data.userInfo, wx.setStorageSync("unionId", JSON.parse(e.data.userInfo).u), 
                    a.getSysInfoCallbackFirst && a.getSysInfoCallbackFirst(e));
                });
            }
        });
    },
    getCommonImageUrl: function() {
        var e = this;
        (0, a.getCommonImageUrl)().then(function(o) {
            e.globalData.imageUrl = o.data, e.getSysInfoCallback && e.getSysInfoCallback(o);
        });
    },
    globalData: {
        imageUrl: "",
        sessionKey: "",
        loginKey: ""
    }
});