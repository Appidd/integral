var t = require("../../apis/goods"), o = require("../../apis/user"), e = getApp();

Page({
    data: {
        imgUrl: "",
        collectLists: [],
        canUseScores: 0,
        isAllChoosed: !1,
        totalScores: 0,
        isMove: !1,
        moveSpace: 0,
        pageX: 0,
        gap: 0,
        shopId: "",
        isShowCount: !0,
        animationData: []
    },
    onLoad: function(t) {
        this.setData({
            imgUrl: e.globalData.imageUrl
        });
    },
    intoGoodInfo: function(t) {
        var o = t.currentTarget.dataset.id;
        console.log("购物车上牌", o), wx.navigateTo({
            url: "/pages/goods/goodDetail/goodDetail?id=".concat(o)
        });
    },
    hideCount: function() {
        var t = this, o = this.data.isShowCount, e = this.data.collectLists;
        this.setData({
            isShowCount: !o,
            isAllChoosed: !1
        }), o ? (e.forEach(function(t) {
            t.isActive = !1;
        }), this.setData({
            collectLists: e
        }, function() {
            t.countChoosedGoods();
        }), this.deleteMoveLeft(-105)) : this.deleteMoveLeft(0);
    },
    deleteMoveLeft: function(t) {
        var o = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        });
        o.left(t + "rpx").step(), this.setData({
            animationData: o.export()
        });
    },
    getScoreWallet: function() {
        var t = this, e = wx.getStorageSync("userId");
        (0, o.getScoreWallet)(e).then(function(o) {
            200 === o.code && (console.log("积分钱包", o), t.setData({
                canUseScores: o.data.customerScore
            }));
        });
    },
    getShopCarList: function() {
        var o = this, e = wx.getStorageSync("userId");
        (0, t.getShopCarList)(e).then(function(t) {
            console.log("购物车列表", t), 200 === t.code && (t.data.forEach(function(t) {
                t.isActive = !1;
            }), o.setData({
                collectLists: t.data
            }));
        });
    },
    changeAllChooseStatus: function() {
        var t = this, o = this.data.isAllChoosed, e = this.data.collectLists;
        o ? e.forEach(function(t) {
            return t.isActive = !1;
        }) : e.forEach(function(t) {
            return t.isActive = !0;
        }), this.setData({
            collectLists: e,
            isAllChoosed: !o
        }, function() {
            t.countChoosedGoods();
        });
    },
    countChoosedGoods: function() {
        var t = this.data.collectLists, o = 0;
        t.forEach(function(t) {
            t.isActive && (o += t.promotionPrice * t.shoppingNumber);
        }), this.setData({
            totalScores: o
        });
    },
    changeChooseStatus: function(t) {
        var o = this, e = t.currentTarget.dataset.id, s = this.data.isAllChoosed, a = this.data.collectLists;
        a.forEach(function(t) {
            return t.id !== e || (t.isActive = !t.isActive);
        }), console.log(a), this.setData({
            collectLists: a,
            isAllChoosed: s
        }, function() {
            o.countChoosedGoods(), o.checkIsAllChoose();
        });
    },
    checkIsAllChoose: function() {
        var t = this.data.collectLists, o = 0;
        t.forEach(function(t) {
            t.isActive || o++;
        }), this.setData({
            isAllChoosed: 0 === o
        });
    },
    deleteShopCar: function(o) {
        var e = o.currentTarget.dataset.id, s = this;
        wx.showModal({
            title: "删除",
            content: "是否确认删除该商品",
            success: function(o) {
                console.log(o), o.confirm && (0, t.deleteShopCar)(e).then(function(t) {
                    200 === t.code && (s.getShopCarList(), s.countChoosedGoods());
                });
            }
        });
    },
    changeCount: function(t) {
        var o = this;
        console.log(t);
        var e = t.currentTarget.dataset.type, s = t.currentTarget.dataset.id, a = t.currentTarget.dataset.sputype, i = o.data.collectLists;
        "sub" === e ? i.forEach(function(t) {
            t.id === s && t.shoppingNumber > 1 && (t.shoppingNumber--, o.alterShoppingNumber(s, t.shoppingNumber));
        }) : (console.log(a), 4 === a || 3 === a ? wx.showToast({
            title: "优惠券或兑换券商品只能单个下单",
            icon: "none"
        }) : i.forEach(function(t) {
            t.id === s && (t.shoppingNumber++, o.alterShoppingNumber(s, t.shoppingNumber));
        })), o.setData({
            collectLists: i
        }), this.countChoosedGoods();
    },
    alterShoppingNumber: function(o, e) {
        var s = {
            id: o,
            ShoppingNumber: e
        };
        (0, t.alterShoppingNumber)(s).then(function(t) {
            console.log("改数量", t);
        });
    },
    submitExchange: function() {
        var t = [], o = this.data.totalScores, e = this.data.collectLists;
        console.log(e);
        var s = "", a = 0, i = 0, n = 0;
        e.forEach(function(o) {
            o.isActive && t.push(o);
        }), console.log("收藏", t), t.forEach(function(t) {
            t.spuType !== s && (s = t.spuType, a++), 1 === t.isSoldOut && i++, 0 === t.isValid && n++;
        }), t.length > 0 ? n > 0 ? wx.showToast({
            title: "存在失效商品,无法下单",
            icon: "none",
            duration: 2e3
        }) : i > 0 ? wx.showToast({
            title: "存在售罄商品,无法下单",
            icon: "none",
            duration: 2e3
        }) : a > 1 ? wx.showToast({
            title: "商品类型不一致,无法下单",
            icon: "none",
            duration: 2e3
        }) : (3 === t[0].spuType || 4 === t[0].spuType) && t.length > 1 ? wx.showToast({
            title: "优惠券或兑换券商品只能单个下单",
            icon: "none"
        }) : wx.navigateTo({
            url: "/pages/order/writeOrder/writeOrder?goodLists=".concat(encodeURIComponent(JSON.stringify(t)), "&totalScores=").concat(o)
        }) : wx.showToast({
            title: "您还未勾选商品",
            icon: "none",
            duration: 1500
        });
    },
    onReady: function() {},
    onShow: function() {
        wx.getStorageSync("userInfo") && (this.getShopCarList(), this.getScoreWallet(), 
        this.setData({
            totalScores: 0,
            isAllChoosed: !1
        }));
    },
    moveStart: function(t) {
        var o = t.currentTarget.dataset.id;
        console.log(o), this.setData({
            pageX: t.changedTouches[0].pageX,
            shopId: o
        });
    },
    moving: function(t) {
        var o = this.data.moveSpace, e = t.changedTouches[0].pageX - this.data.pageX;
        o + e >= -105 && o + e <= 0 ? this.setData({
            gap: e
        }) : o + e < -105 ? this.setData({
            gap: 0,
            moveSpace: -105
        }) : this.setData({
            gap: 0,
            moveSpace: 0
        });
    },
    moveEnd: function(t) {
        this.setData({
            moveSpace: this.data.moveSpace + this.data.gap,
            gap: 0,
            isMove: !1
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});