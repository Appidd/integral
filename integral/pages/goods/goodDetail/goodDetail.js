var t = require("../../../apis/goods"), o = require("../../../apis/user"), a = getApp();

Page({
    data: {
        id: "",
        imgUrl: "",
        goodDetail: {},
        isShowChooseDesc: !1,
        isLoadingOver: !1,
        productSkuList: [],
        isHasDesc: !0,
        exchangeDoor: !1,
        addCarDoor: !1,
        animationBall: [],
        animationCar: [],
        isShowBall: !1,
        shopCarCount: 0,
        num: 0
    },
    onLoad: function(t) {
        console.log("ooo", t.id), t.id && (this.setData({
            id: t.id
        }), this.getProductSkuList(t.id)), this.setData({
            imgUrl: "" != a.globalData.imageUrl ? a.globalData.imageUrl : "http://shuyun-scrm-test.oss-cn-shanghai.aliyuncs.com/"
        }), console.log("app.globalData.imageUrl", a.globalData.imageUrl), wx.getStorageSync("userInfo") && this.showShopCarCount();
    },
    onReady: function() {},
    onShow: function() {
        this.data.id && this.getProductSkuList(this.data.id);
    },
    showShopCarCount: function() {
        var o = this, a = wx.getStorageSync("userId");
        (0, t.getShopCarList)(a).then(function(t) {
            200 === t.code && o.setData({
                shopCarCount: t.data.length
            });
        });
    },
    jumpDown: function() {
        var t = this;
        this.setData({
            isShowBall: !0
        });
        var o = wx.createAnimation({
            duration: 500,
            timingFunction: "ease"
        });
        o.width("50rpx").height("50rpx").step(), o.translate("-300rpx", "75vh").step(), 
        this.setData({
            animationBall: o.export()
        }), setTimeout(function() {
            t.ballBack(), t.carSway();
        }, 1e3);
    },
    ballBack: function() {
        this.setData({
            isShowBall: !1
        });
        var t = wx.createAnimation({
            duration: 10,
            timingFunction: "step-start"
        });
        t.width("120rpx").height("120rpx").step(), t.translate("-50%", "0rpx").step(), this.setData({
            animationBall: t.export()
        });
    },
    carSway: function() {
        var t = this, o = wx.createAnimation({
            duration: 100,
            timingFunction: "ease"
        });
        o.rotate("-25").step(), o.rotate("25").step(), o.rotate("0").step(), this.setData({
            animationCar: o.export()
        }, function() {
            t.showShopCarCount();
        });
    },
    addShopCar: function() {
        var o = this;
        if (wx.getStorageSync("userInfo")) if (1 === o.data.goodDetail.isSoldOut) wx.showToast({
            title: "抱歉，该商品已售罄",
            icon: "none"
        }); else if (0 === o.data.goodDetail.count) this.setData({
            isShowChooseDesc: !0,
            addCarDoor: !0
        }); else {
            var a = {
                customerId: wx.getStorageSync("userId"),
                skuId: o.data.goodDetail.descId ? o.data.goodDetail.descId : "",
                spuId: o.data.goodDetail.id,
                shoppingCount: o.data.goodDetail.count
            };
            console.log(a), (0, t.addShopCar)(a).then(function(t) {
                if (console.log("购物车", t), 200 === t.code) {
                    o.jumpDown();
                    var a = o.data.goodDetail;
                    o.data.isHasDesc ? a.count = 0 : a.count = 1, a.descId = "", a.jsonInfo = "", a.skuValue = "", 
                    o.setData({
                        goodDetail: a
                    });
                }
            });
        } else wx.showModal({
            title: "请先登录",
            content: "您还未登录，请先登录",
            success: function(t) {
                t.confirm && wx.navigateTo({
                    url: "/pages/userLogin/userLogin"
                });
            }
        });
    },
    getProductSkuList: function(o) {
        var a = this;
        (0, t.getProductSkuList)(o).then(function(t) {
            console.log("规格", t), 200 === t.code && (a.setData({
                productSkuList: t.data,
                isHasDesc: !(!t.data || 0 === t.data.length)
            }), a.getGoodDetail(o));
        });
    },
    getGoodDetail: function(o) {
        var a = this;
        console.log("商品id", o), (0, t.getGoodDetail)(o).then(function(t) {
            if (a.setData({
                isLoadingOver: !0
            }), 200 === t.code) {
                console.log("商品详情", t);
                var o = t.data;
                o.count = a.data.isHasDesc ? 0 : 1, o.detailInfo && (o.detailInfo = a.changeRichText(o.detailInfo)), 
                a.setData({
                    goodDetail: o
                }), console.log("图片列表", a.data.goodDetail.productImgList);
            }
        });
    },
    getGoodDescImg: function(t) {},
    changeRichText: function(t) {
        return t.replace(/\<img/gi, '<img style="max-width:100%;height:auto"');
    },
    showChooseDesc: function() {
        this.setData({
            isShowChooseDesc: !0
        });
    },
    cancelBox: function() {
        this.setData({
            isShowChooseDesc: !1,
            exchangeDoor: !1,
            addCarDoor: !1
        });
    },
    handlerGobackClick: function() {
        wx.navigateBack({});
    },
    confirmOrder: function() {
        var t = this, a = t.data.goodDetail;
        a.jsonInfo && (a.descDetail = a.jsonInfo.replace(/{|}|"/g, ""), a.descDetail = a.descDetail.replace(/,/g, " "));
        var e = encodeURIComponent(JSON.stringify(a));
        wx.getStorageSync("userInfo") ? 1 === t.data.goodDetail.isSoldOut ? wx.showToast({
            title: "抱歉，该商品已售罄",
            icon: "none"
        }) : 0 === t.data.goodDetail.count ? t.setData({
            isShowChooseDesc: !0,
            exchangeDoor: !0
        }) : (0, o.checkBlackList)(wx.getStorageSync("userId")).then(function(o) {
            console.log(o), 200 == o.code ? o.data.blackListFlag ? wx.showToast({
                title: "操作异常error500",
                icon: "none"
            }) : wx.navigateTo({
                url: "/pages/order/writeOrder/writeOrder?isSingle=true&&goodDetail=".concat(e),
                success: function() {
                    var o = t.data.goodDetail;
                    t.data.isHasDesc ? o.count = 0 : o.count = 1, o.descId = "", o.jsonInfo = "", o.skuValue = "", 
                    t.setData({
                        goodDetail: o
                    });
                }
            }) : wx.showToast({
                title: o.message,
                icon: "none"
            });
        }) : wx.showModal({
            title: "请先登录",
            content: "您还未登录，请先登录",
            success: function(t) {
                t.confirm && wx.navigateTo({
                    url: "/pages/userLogin/userLogin"
                });
            }
        });
    },
    chooseDesc: function(t) {
        console.log("轩轩轩", t);
        var o = this.data.goodDetail;
        o.count = t.detail.count, o.descId = t.detail.id, o.jsonInfo = t.detail.jsonInfo, 
        o.skuValue = t.detail.skuValue, this.setData({
            goodDetail: o,
            isShowChooseDesc: !1
        }), this.data.exchangeDoor && (this.confirmOrder(), this.setData({
            exchangeDoor: !1
        })), this.data.addCarDoor && (this.addShopCar(), this.setData({
            addCarDoor: !1
        }));
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});