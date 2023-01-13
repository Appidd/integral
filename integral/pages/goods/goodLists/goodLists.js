var t = require("../../../@babel/runtime/helpers/toConsumableArray"), e = require("../../../apis/goods"), i = require("../../../apis/user"), s = getApp();

Page({
    data: {
        defaultImgUrl: "",
        types: [ {
            id: 0,
            name: "全部商品",
            isActive: !1
        }, {
            id: 1,
            name: "推荐排序",
            isActive: !1
        }, {
            id: 2,
            name: "我能兑换",
            isActive: !1
        }, {
            id: 3,
            name: "积分区间",
            isActive: !1
        } ],
        lists: [],
        allTypes: [],
        allTypesText: "全部商品",
        productClassifyId: -1,
        shortTimeText: "全部商品",
        shortTimeId: -1,
        groupLists: [ {
            id: 0,
            priceStart: 0,
            priceEnd: 1e3,
            isActive: !1
        }, {
            id: 1,
            priceStart: 1e3,
            priceEnd: 5e3,
            isActive: !1
        }, {
            id: 2,
            priceStart: 5e3,
            priceEnd: 1e4,
            isActive: !1
        }, {
            id: 3,
            priceStart: 1e4,
            priceEnd: 2e4,
            isActive: !1
        }, {
            id: 4,
            priceStart: 2e4,
            priceEnd: 3e4,
            isActive: !1
        }, {
            id: 5,
            priceStart: 3e4,
            priceEnd: "",
            isActive: !1
        } ],
        scoreId: -1,
        priceStart: "",
        priceEnd: "",
        shortScoreId: -1,
        shortPriceStart: "",
        shortPriceEnd: "",
        scoreAreaText: "积分区间",
        recommendTypes: [ {
            id: 0,
            text: "推荐排序",
            isActive: !0
        }, {
            id: 1,
            text: "人气优先",
            isActive: !1
        }, {
            id: 2,
            text: "积分从低到高",
            isActive: !1
        }, {
            id: 3,
            text: "积分从高到低",
            isActive: !1
        } ],
        sortType: 0,
        isShowAllShops: !1,
        isShowRecommend: !1,
        isShowSores: !1,
        isShowExchange: !1,
        typeValueTitle: "商品分类",
        pageNum: 1,
        totalSize: 0,
        searchingAnimation: [],
        noneScoreAnimation: [],
        inputValue: "",
        isRefresh: !1,
        isLoadingOver: !1,
        isSearchBtn: !0,
        canUseScores: 0,
        customerScore: "",
        isShowCanUse: !0,
        isHot: !1
    },
    onLoad: function(t) {
        var e = this;
        this.getProductClassifyList(), this.setData({
            defaultImgUrl: s.globalData.imageUrl,
            isHot: !(!t.hot || "true" !== t.hot)
        }, function() {
            e.getGoodLists();
        }), t.hot && "true" === t.hot && wx.setNavigationBarTitle({
            title: "热门商品"
        }), console.log("是否热门", this.data.isHot);
    },
    onReady: function() {},
    onShow: function() {
        wx.getStorageSync("userInfo") && this.getScoreWallet();
    },
    changeOrderOut: function() {
        this.setData({
            pageNum: 1,
            lists: [],
            isLoadingOver: !1
        }), this.getGoodLists();
    },
    getScoreWallet: function() {
        var t = this, e = wx.getStorageSync("userId");
        (0, i.getScoreWallet)(e).then(function(e) {
            200 === e.code && (console.log("积分钱包", e), t.setData({
                canUseScores: e.data.customerScore
            }));
        });
    },
    getProductClassifyList: function() {
        var t = this;
        (0, e.getProductClassifyList)(0).then(function(e) {
            if (console.log("分类", e), 200 === e.code) {
                var i = e.data;
                i.forEach(function(t, e) {
                    t.isActive = !1;
                }), i.splice(0, 0, {
                    classifyName: "全部商品",
                    isActive: !0,
                    id: -1
                }), t.setData({
                    allTypes: i
                });
            }
        });
    },
    clickCategory: function(t) {
        var e = t.currentTarget.dataset.id, i = t.currentTarget.dataset.index, s = this.data.allTypes;
        s.forEach(function(t) {
            return t.id === e ? t.isActive = !0 : t.isActive = !1;
        }), this.setData({
            allTypes: s,
            shortTimeId: e,
            shortTimeText: s[i].classifyName
        });
    },
    chooseRecommend: function(t) {
        var e = t.currentTarget.dataset.id, i = t.currentTarget.dataset.name, s = this.data.recommendTypes, a = this.data.types;
        s.forEach(function(t) {
            return t.id === e ? t.isActive = !0 : t.isActive = !1;
        }), a[1].name = i, this.setData({
            recommendTypes: s,
            isShowRecommend: !1,
            sortType: e,
            types: a,
            pageNum: 1,
            lists: [],
            isLoadingOver: !1
        }), this.getGoodLists();
    },
    resetChoose: function() {
        if (this.data.isShowAllShops) {
            var t = this.data.allTypes;
            t.forEach(function(t) {
                return -1 === t.id ? t.isActive = !0 : t.isActive = !1;
            }), this.setData({
                allTypes: t,
                shortTimeText: "全部商品",
                shortTimeId: -1
            });
        } else {
            var e = this.data.groupLists;
            e.forEach(function(t) {
                return t.isActive = !1;
            }), this.setData({
                groupLists: e,
                shortScoreId: -1,
                shortPriceStart: "",
                shortPriceEnd: "",
                scoreAreaText: "积分区间"
            });
        }
    },
    confirmChoose: function() {
        var t = this.data.isShowAllShops, e = this.data.isShowSores, i = this.data.types, s = this.data.shortTimeId, a = this.data.shortTimeText, o = (this.data.groupLists, 
        this.data.shortScoreId), r = this.data.shortPriceStart, n = this.data.shortPriceEnd;
        t && (this.setData({
            productClassifyId: s,
            allTypesText: a
        }), i[0].name = this.data.allTypesText), e && (this.setData({
            scoreId: o,
            priceStart: r,
            priceEnd: n
        }), i[3].name = this.data.scoreAreaText), this.setData({
            isShowAllShops: !1,
            isShowSores: !1,
            pageNum: 1,
            lists: [],
            isLoadingOver: !1,
            types: i
        }), this.getGoodLists();
    },
    canExchange: function() {
        var t = this.data.types;
        this.setData({
            pageNum: 1,
            lists: [],
            isLoadingOver: !1,
            customerScore: t[2].isActive ? this.data.canUseScores : ""
        }), this.getGoodLists();
    },
    getGoodLists: function() {
        var i = this, s = {
            isHot: this.data.isHot ? 1 : -1,
            customerScore: this.data.customerScore,
            priceStart: this.data.priceStart,
            priceEnd: this.data.priceEnd,
            productClassifyId: this.data.productClassifyId,
            searchKey: this.data.inputValue,
            sortType: this.data.sortType
        };
        console.log(s);
        var a = this.data.lists;
        (0, e.getGoodLists)(s, this.data.pageNum, 10).then(function(e) {
            if (console.log("kkk", e), 200 === e.code) {
                var s = e.data.pageList;
                a.push.apply(a, t(s)), setTimeout(function() {
                    i.setData({
                        isRefresh: !1
                    });
                }, 500), i.setData({
                    lists: a,
                    isLoadingOver: !0,
                    totalSize: e.data.total
                }), console.log("数据", i.data.lists);
            }
        });
    },
    refreshOrderLists: function() {
        this.setData({
            pageNum: 1,
            isRefresh: !0,
            lists: [],
            isLoadingOver: !1
        }), this.getGoodLists();
    },
    reachBottom: function() {
        var t = this.data.pageNum;
        this.data.lists.length < this.data.totalSize ? (t++, this.setData({
            pageNum: t,
            isLoadingOver: !1
        }), this.getGoodLists()) : wx.showToast({
            title: "暂无更多商品了哟",
            icon: "none",
            duration: 1500
        });
    },
    intoGoodDetail: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/goods/goodDetail/goodDetail?id=" + e
        });
    },
    showAllShops: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.id, i = this.data.types, s = this.data.isShowAllShops, a = this.data.isShowRecommend, o = this.data.isShowSores, r = this.data.allTypes, n = this.data.productClassifyId, c = this.data.groupLists, h = this.data.scoreId;
        i.forEach(function(t) {
            return t.id === e ? t.isActive = !t.isActive : t.isActive = !1;
        }), this.setData({
            types: i
        }), 0 === e ? (r.forEach(function(t) {
            return t.id === n ? t.isActive = !0 : t.isActive = !1;
        }), this.setData({
            isShowAllShops: !s,
            isShowRecommend: !1,
            isShowSores: !1,
            typeValueTitle: "商品分类",
            customerScore: "",
            allTypes: r
        })) : 1 === e ? this.setData({
            isShowAllShops: !1,
            isShowRecommend: !a,
            isShowSores: !1,
            customerScore: ""
        }) : 2 === e ? (this.canExchange(), this.setData({
            isShowAllShops: !1,
            isShowRecommend: !1,
            isShowSores: !1
        })) : (console.log("ggg", h), c.forEach(function(t) {
            return t.id === h ? t.isActive = !0 : t.isActive = !1;
        }), this.setData({
            isShowAllShops: !1,
            isShowRecommend: !1,
            isShowSores: !o,
            typeValueTitle: "价格区间",
            shortPriceStart: this.data.priceStart,
            shortPriceEnd: this.data.priceEnd,
            customerScore: "",
            groupLists: c
        }));
    },
    searching: function() {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        }), e = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        });
        t.width("98%").translateX("-5rpx").step(), e.translateX("5rpx").width("0%").step(), 
        this.setData({
            searchingAnimation: t.export(),
            noneScoreAnimation: e.export(),
            isSearchBtn: !1,
            isShowCanUse: !1
        });
    },
    shrinkBack: function() {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        }), e = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        });
        t.width("380rpx").step(), e.width("300rpx").step(), this.setData({
            searchingAnimation: t.export(),
            noneScoreAnimation: e.export(),
            isSearchBtn: !0,
            isShowCanUse: !0
        });
    },
    startSearch: function(t) {
        console.log(t);
        var e = t.detail.value;
        this.setData({
            inputValue: e,
            pageNum: 1,
            lists: [],
            isLoadingOver: !1
        }), this.getGoodLists();
    },
    allDelete: function() {
        this.data.isSearchBtn || (this.setData({
            inputValue: "",
            pageNum: 1,
            lists: [],
            isLoadingOver: !1
        }), this.getGoodLists());
    },
    writePrice: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.type, i = this.data.groupLists;
        i.forEach(function(t) {
            return t.isActive = !1;
        }), this.setData({
            groupLists: i,
            shortScoreId: -1
        }), "start" === e ? this.setData({
            shortPriceStart: t.detail.value,
            scoreAreaText: t.detail.value + "-" + this.data.shortPriceEnd
        }) : this.setData({
            shortPriceEnd: t.detail.value,
            scoreAreaText: this.data.shortPriceStart + "-" + t.detail.value
        }), this.data.shortPriceStart || this.setData({
            scoreAreaText: this.data.shortPriceEnd + "以内"
        }), this.data.shortPriceEnd || this.setData({
            scoreAreaText: this.data.shortPriceStart + "以上"
        }), this.data.shortPriceStart || this.data.shortPriceEnd || this.setData({
            scoreAreaText: "积分区间"
        });
    },
    choosePriceArea: function(t) {
        var e = t.currentTarget.dataset.area, i = this.data.groupLists;
        i.forEach(function(t) {
            return t.id === e.id ? t.isActive = !0 : t.isActive = !1;
        }), this.setData({
            groupLists: i,
            shortPriceStart: e.priceStart,
            shortPriceEnd: e.priceEnd,
            scoreAreaText: e.priceEnd ? e.priceStart + "-" + e.priceEnd : e.priceStart + "以上",
            shortScoreId: e.id
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});