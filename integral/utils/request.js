Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var e = wx.getAccountInfoSync().miniProgram.envVersion, t = {
    develop: "https://mlb.scrm.kaixikeji.com/",
    trial: "https://mlb.scrm.kaixikeji.com/",
    release: "https://mlb.scrm.kaixikeji.com/"
}, o = function(o) {
    var a = o.url, n = o.method, s = o.data;
    o.isShow;
    return new Promise(function(o, i) {
        wx.request({
            url: "".concat(t[e]).concat(a),
            method: n || "GET",
            data: s || "",
            header: {
                "Content-Type": "application/json",
                accessToken: wx.getStorageSync("token") ? wx.getStorageSync("token") : ""
            },
            timeout: 7e3,
            success: function(e) {
                200 === e.data.code || (401 === e.data.code ? setTimeout(function() {
                    wx.clearStorageSync(), wx.reLaunch({
                        url: "/pages/userCenter/userCenter"
                    });
                }, 1500) : 504 == e.data.code ? wx.showToast({
                    title: e.data.message,
                    icon: "none",
                    duration: 1500
                }) : -1 == e.data.code && ("" == e.data.message ? wx.showToast({
                    title: "网络环境异常，请重新打开小程序",
                    icon: "none",
                    duration: 1500
                }) : wx.showToast({
                    title: e.data.message,
                    icon: "none",
                    duration: 1500
                }))), o(e.data);
            },
            fail: function(e) {
                wx.showToast({
                    title: "网络环境异常，请重新打开小程序",
                    icon: "none",
                    duration: 1500
                }), console.log("错误信息" + a, e);
            }
        });
    });
};

exports.default = o;