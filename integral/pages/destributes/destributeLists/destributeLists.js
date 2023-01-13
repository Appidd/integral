var t = require("../../../@babel/runtime/helpers/toConsumableArray"), e = require("../../../apis/destributes");

Page({
    data: {
        types: [ {
            id: -1,
            name: "全部",
            isActive: !0
        }, {
            id: 1,
            name: "未使用",
            isActive: !1
        }, {
            id: 3,
            name: "已过期",
            isActive: !1
        }, {
            id: 2,
            name: "已使用",
            isActive: !1
        } ],
        destributeLists: [],
        lineAnimation: [],
        couponStatus: -1,
        pageNum: 1,
        pageSize: 10,
        isRefresh: !1,
        totalSize: 0
    },
    onLoad: function(t) {
        this.getDestributeLists();
    },
    onReady: function() {},
    onShow: function() {},
    showRule: function(t) {
        console.log(t);
        var e = this.data.destributeLists, i = t.currentTarget.dataset.id;
        e.forEach(function(t) {
            return t.id !== i || (t.isShowRule = !t.isShowRule);
        }), this.setData({
            destributeLists: e
        });
    },
    getDestributeLists: function() {
        var i = this, s = {
            customerId: wx.getStorageSync("userId"),
            couponStatus: this.data.couponStatus,
            pageNum: this.data.pageNum,
            pageSize: this.data.pageSize
        }, a = this.data.destributeLists;
        (0, e.getDestributeLists)(s).then(function(e) {
            console.log("优惠券列表", e), 200 === e.code && (e.data.pageList.forEach(function(t) {
                t.isShowRule = !1;
            }), a.push.apply(a, t(e.data.pageList)), i.setData({
                destributeLists: a,
                isRefresh: !1,
                totalSize: e.data.total
            }));
        });
    },
    refreshOrderLists: function() {
        this.setData({
            pageNum: 1,
            isRefresh: !0,
            destributeLists: []
        }), this.getDestributeLists();
    },
    reachBottom: function() {
        var t = this.data.pageNum;
        this.data.destributeLists.length < this.data.totalSize ? (t++, this.setData({
            pageNum: t
        }), this.getDestributeLists()) : wx.showToast({
            title: "到底啦",
            icon: "none"
        });
    },
    changeType: function(t) {
        var e = this;
        console.log(t);
        var i, s = t.currentTarget.dataset.index;
        i = -1 === s ? "10.5%" : 1 === s ? "35.5%" : 3 === s ? "60.5%" : "85.5%";
        var a = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        });
        a.left(i).step(), this.setData({
            lineAnimation: a.export(),
            couponStatus: s,
            pageNum: 1,
            destributeLists: []
        }, function() {
            e.getDestributeLists();
        });
    },
    intoDestributeDetail: function(t) {
        console.log(t);
        var e = JSON.stringify(t.currentTarget.dataset.item);
        wx.navigateTo({
            url: "/pages/destributes/destributeDetail/destributeDetail?detail=".concat(e)
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});