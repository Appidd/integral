var e = require("../../@babel/runtime/helpers/toConsumableArray"), t = require("../../apis/user");

Page({
    data: {
        typeLists: [ {
            id: -1,
            name: "全部",
            isActive: !0
        }, {
            id: 1,
            name: "收入",
            isActive: !1
        }, {
            id: 2,
            name: "支出",
            isActive: !1
        } ],
        score_list: [],
        lineAnimation: [],
        willExpireScore: 0,
        willExpireDate: "",
        canUseScores: 0,
        isRefresh: !1,
        pageNum: 1,
        pageSize: 10
    },
    onLoad: function(e) {
        wx.getStorageSync("userInfo") && (this.getScoreLists(), this.getScoreWallet());
    },
    onReady: function() {},
    onShow: function() {},
    getScoreWallet: function() {
        var e = this, i = wx.getStorageSync("userId");
        (0, t.getScoreWallet)(i).then(function(t) {
            200 === t.code && (console.log("积分钱包", t), e.setData({
                canUseScores: t.data.customerScore,
                willExpireScore: t.data.willExpireScore,
                willExpireDate: t.data.willExpireDate
            }));
        });
    },
    getScoreLists: function() {
        var i = this, o = this.data.score_list, a = {
            customerId: wx.getStorageSync("userId"),
            type: -1
        };
        (0, t.getScoreLists)(a, this.data.pageNum, this.data.pageSize).then(function(t) {
            console.log("积分列表", t), 200 === t.code && (o.push.apply(o, e(t.data.pageList)), 
            i.setData({
                score_list: o,
                isRefresh: !1,
                totalSize: t.data.total
            }));
        });
    },
    refreshOrderLists: function() {
        this.setData({
            pageNum: 1,
            isRefresh: !0,
            score_list: []
        }), this.getScoreLists();
    },
    reachBottom: function() {
        var e = this.data.pageNum;
        this.data.score_list.length < this.data.totalSize ? (e++, this.setData({
            pageNum: e
        }), this.getScoreLists()) : wx.showToast({
            title: "到底啦",
            icon: "none"
        });
    },
    changeType: function(e) {
        console.log(e);
        var t, i = e.currentTarget.dataset.index;
        t = -1 === i ? "14%" : 1 === i ? "47%" : "80%";
        var o = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        });
        o.left(t).step(), this.setData({
            lineAnimation: o.export()
        });
    },
    intoGoodLists: function() {
        wx.reLaunch({
            url: "/pages/goods/goodLists/goodLists"
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});