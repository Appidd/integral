var e = require("../../../apis/orders"), o = require("../../../apis/address"), a = require("../../../apis/user"), s = require("../../../apis/letterys"), t = getApp();

Page({
    data: {
        imgUrl: "",
        goodLists: [],
        goodSingleDetail: {},
        totalScores: 0,
        totalBeforeScores: 0,
        address: {},
        isSingle: !1,
        canUseScores: 0,
        spuType: 1,
        awardRecordId: 0,
        orderToken: ""
    },
    onLoad: function(e) {
        if (e.goodLists && e.totalScores && (console.log("购物车", JSON.parse(decodeURIComponent(e.goodLists))), 
        this.setData({
            goodLists: JSON.parse(decodeURIComponent(e.goodLists)),
            totalScores: e.totalScores,
            spuType: JSON.parse(decodeURIComponent(e.goodLists))[0].spuType
        }), console.log("类别", this.data.spuType)), e.goodDetail) {
            console.log("单个", JSON.parse(decodeURIComponent(e.goodDetail)));
            var o = JSON.parse(decodeURIComponent(e.goodDetail));
            o.spuImg = o.productImgList ? o.productImgList[0] : "", o.spuName = o.productName;
            var a = this.data.goodLists;
            a.push(o), this.setData({
                goodLists: a,
                totalScores: o.promotionPrice * o.count,
                totalBeforeScores: o.price * o.count,
                goodSingleDetail: o,
                isSingle: !0,
                spuType: o.spuType
            }), console.log("sing", this.data.goodSingleDetail), console.log("类别", this.data.spuType);
        }
        if (e.awardRecordId) {
            console.log(e.awardRecordId), console.log("奖品", JSON.parse(decodeURIComponent(e.awardDetail))), 
            wx.setNavigationBarTitle({
                title: "领取奖品"
            });
            var s = JSON.parse(decodeURIComponent(e.awardDetail));
            s.spuImg = s.imgUrl, s.jsonInfo = s.skuValue, s.spuType = 1, s.count = 1;
            var d = this.data.goodLists;
            d.push(s), this.setData({
                goodLists: d,
                totalScores: 0,
                totalBeforeScores: 0,
                goodSingleDetail: s,
                isSingle: !0,
                spuType: s.spuType,
                awardRecordId: e.awardRecordId
            });
        }
        this.getDefaultAddress(), this.setData({
            imgUrl: t.globalData.imageUrl
        });
    },
    orderToken: function() {
        var o = this;
        console.log("订单2接口");
        var a = wx.getStorageSync("userId"), s = wx.getStorageSync("userInfo").phone;
        console.log("doOrderPhone:" + s), console.log("doOrderPhone:" + a), (0, e.orderToken)(a, s).then(function(e) {
            console.log("xxxxx", e), 200 === e.code && o.setData({
                orderToken: e.data
            });
        });
    },
    getScoreWallet: function() {
        var e = this, o = wx.getStorageSync("userId");
        (0, a.getScoreWallet)(o).then(function(o) {
            200 === o.code && (console.log("积分钱包", o), e.setData({
                canUseScores: o.data.customerScore
            }));
        });
    },
    chooseAddress: function() {
        1 === this.data.spuType && wx.navigateTo({
            url: "/pages/addresses/addressLists/addressLists?isBack=true"
        });
    },
    getBackAddress: function(e) {
        console.log("返回的", e), this.setData({
            address: e
        });
    },
    getDefaultAddress: function() {
        var e = this, a = wx.getStorageSync("userId");
        (0, o.getDefaultAddress)(a).then(function(o) {
            console.log("默认", o), 200 === o.code && e.setData({
                address: o.data ? o.data : {}
            });
        });
    },
    createOrder: function() {
        var o = this;
        console.log("订单1接口");
        var s = wx.getStorageSync("userId"), t = wx.getStorageSync("userInfo").phone;
        console.log(t), console.log(s), (0, e.orderToken)(s, t).then(function(s) {
            if (console.log("xxxxx", s), 200 === s.code) {
                o.setData({
                    orderToken: s.data
                });
                var t = o.data.goodLists, d = o.data.isSingle, r = [];
                t.forEach(function(e) {
                    r.push(e.id);
                });
                var n = {
                    changeNum: d ? o.data.goodSingleDetail.count : "",
                    customerId: wx.getStorageSync("userId"),
                    doOrderNickName: wx.getStorageSync("userInfo").nickname,
                    doOrderPhone: wx.getStorageSync("userInfo").phone,
                    orderRemark: "",
                    payPrice: o.data.totalScores,
                    price: o.data.totalBeforeScores,
                    shoppingCarIds: d ? null : r,
                    skuId: d ? o.data.goodSingleDetail.descId : "",
                    skuInfo: d ? o.data.goodSingleDetail.jsonInfo : "",
                    spuId: d ? o.data.goodSingleDetail.id : "",
                    spuName: d ? o.data.goodSingleDetail.spuName : "",
                    spuType: o.data.spuType,
                    orderToken: o.data.orderToken
                };
                1 === o.data.spuType && (n.addressDesc = o.data.address.addressDesc ? o.data.address.addressDesc : "", 
                n.area = o.data.address.area ? o.data.address.area : "", n.city = o.data.address.city ? o.data.address.city : "", 
                n.name = o.data.address.name ? o.data.address.name : "", n.phone = o.data.address.phone ? o.data.address.phone : "", 
                n.province = o.data.address.province ? o.data.address.province : ""), console.log("ss", n), 
                1 !== o.data.spuType || o.data.address.phone ? o.data.totalScores > o.data.canUseScores ? wx.showToast({
                    title: "当前积分不足",
                    icon: "none",
                    duration: 1500,
                    mask: !0
                }) : (0, a.checkBlackList)(wx.getStorageSync("userId")).then(function(o) {
                    console.log(o), 200 == o.code ? 0 == o.data.blackListFlag ? (0, e.createOrder)(n).then(function(e) {
                        console.log(e), 200 === e.code ? wx.redirectTo({
                            url: "/pages/exchange/exchangeStatus/exchangeStatus?exchangeSuccess=true&&orderId=".concat(e.data)
                        }) : wx.showToast({
                            title: e.message,
                            icon: "none"
                        }), console.log("订单返回", e);
                    }) : wx.showToast({
                        title: "操作异常error500",
                        icon: "none"
                    }) : wx.showToast({
                        title: o.message,
                        icon: "none"
                    });
                }) : wx.showToast({
                    title: "请选择收货地址",
                    icon: "none",
                    duration: 1500,
                    mask: !0
                });
            }
        });
    },
    getAwardGood: function() {
        var e = {
            addressDesc: this.data.address.addressDesc,
            area: this.data.address.area,
            awardRecordId: this.data.awardRecordId,
            changeNum: 1,
            city: this.data.address.city,
            customerId: wx.getStorageSync("userId"),
            doOrderNickName: wx.getStorageSync("userInfo").nickname,
            doOrderPhone: wx.getStorageSync("userInfo").phone,
            name: this.data.address.name,
            orderRemark: "",
            phone: this.data.address.phone,
            province: this.data.address.province
        };
        1 !== this.data.spuType || this.data.address.phone ? (0, s.receiveLuckSpu)(e).then(function(e) {
            console.log("领导了", e), 200 === e.code ? wx.redirectTo({
                url: "/pages/exchange/exchangeStatus/exchangeStatus?award=true&&exchangeSuccess=true&&orderId=".concat(e.data)
            }) : wx.redirectTo({
                url: "/pages/exchange/exchangeStatus/exchangeStatus?exchangeSuccess=false&&reason=".concat(e.message)
            });
        }) : wx.showToast({
            title: "请选择收货地址",
            icon: "none",
            duration: 1500,
            mask: !0
        });
    },
    onReady: function() {},
    onShow: function() {
        this.orderToken(), this.getScoreWallet();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});