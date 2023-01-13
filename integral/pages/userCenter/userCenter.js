var e = require("../../@babel/runtime/helpers/createForOfIteratorHelper"), t = require("../../apis/allocation"), o = require("../../apis/goods"), a = require("../../apis/user"), n = require("../../apis/destributes"), s = require("../../apis/letterys"), i = require("../../config/config"), r = getApp();

Page({
    data: {
        imgUrl: "",
        mainBackgroundImg: "",
        bigHeadImg: "",
        logo: "",
        memberCardImg: "",
        modelConfigs: [],
        isUseKvModel1: !0,
        kvModel1Times: 0,
        kvConfigs1Imgs: [ 1, 2, 3 ],
        hotLists: [],
        newLists: [ 1, 2, 3, 4 ],
        userInfo: null,
        scoresParket: {},
        destributesParket: {},
        equityPosition: {},
        isShowWillScores: !0,
        isShowWriteInfo: !0
    },
    onLoad: function(e) {
        var t = 1e3 * Math.random();
        console.log(t);
        this.getbackGroundImg(), this.getCommonImgUrl(), this.getHotGoods(), this.getNewGoods(), 
        this.equityPosition(), wx.getStorageSync("userInfo") && (this.setData({
            userInfo: wx.getStorageSync("userInfo")
        }), this.getScoreWallet(), this.getDestributeWallet(), this.checkMemberInfo(), this.memberQueryInfo());
    },
    onReady: function() {},
    onShow: function() {
        wx.getStorageSync("userInfo") && this.checkPerfectInfo(), this.wxLogin();
    },
    wxLogin: function() {
        var e = this;
        wx.login({
            success: function(t) {
                var o = {
                    appid: i.wxAppId,
                    code: t.code
                };
                (0, a.getSessionKey)(o).then(function(t) {
                    200 === t.code && (console.log(t), 0 === t.data.loginStatusVo.loginStatus ? wx.getStorageSync("userInfo") && (wx.clearStorageSync(), 
                    wx.reLaunch({
                        url: "/pages/userLogin/userLogin"
                    })) : wx.getStorageSync("userInfo") || (wx.setStorageSync("userId", t.data.loginStatusVo.customerId), 
                    wx.setStorageSync("token", t.data.loginStatusVo.token), e.getUserMessage(t.data.loginStatusVo.customerId)), 
                    r.globalData.sessionKey = t.data.sessionKey, r.globalData.loginKey = t.data.userInfo);
                });
            }
        });
    },
    getUserMessage: function(e) {
        (0, a.getUserMessage)(e).then(function(e) {
            200 === e.code && (console.log("333", e), wx.setStorageSync("userInfo", e.data.customerInfo), 
            wx.reLaunch({
                url: "/pages/userCenter/userCenter"
            }));
        });
    },
    checkPerfectInfo: function() {
        var e = wx.getStorageSync("userId");
        (0, a.checkPerfectInfo)(e).then(function(e) {
            console.log("判断用户是不是在登录页已完善信息", e), 200 === e.code && (e.data.perfectInfoFlag || wx.navigateTo({
                url: "/pages/finishMessage/finishMessage"
            }));
        });
    },
    checkCanJoin: function(e) {
        var t = {
            activityId: e,
            customerId: wx.getStorageSync("userId"),
            levelName: this.data.scoresParket.levelName
        };
        (0, s.checkCanJoin)(t).then(function(t) {
            200 === t.code && (t.data.canJoin ? wx.navigateTo({
                url: "/pages/letterysDraw/letterysDraw?activityId=".concat(e)
            }) : wx.showToast({
                title: t.data.showInfo,
                icon: "none"
            }));
        });
    },
    intoLetterysDraw: function(e) {
        console.log(e);
        var t = e.currentTarget.dataset.item;
        if (-1 !== t.path.indexOf("pages/letterysDraw/letterysDraw?activityId")) {
            if (wx.getStorageSync("userInfo")) {
                var o = t.path.split("=")[1];
                this.checkCanJoin(o);
            }
        } else t.appid ? wx.navigateToMiniProgram({
            appId: t.appid,
            path: t.path
        }) : wx.navigateTo({
            url: t.path
        });
    },
    intoHotGoodLists: function() {
        wx.navigateTo({
            url: "/pages/goods/goodLists/goodLists?hot=true"
        });
    },
    intoGoodLists: function() {
        wx.navigateTo({
            url: "/pages/goods/goodLists/goodLists"
        });
    },
    checkMemberInfo: function() {
        var e = this, t = wx.getStorageSync("userId");
        (0, a.checkMemberInfo)(t).then(function(t) {
            200 === t.code && e.setData({
                isShowWriteInfo: 0 === t.data
            }), console.log("核验", t);
        });
    },
    cancelShowWriteInfo: function() {
        this.setData({
            isShowWriteInfo: !1
        });
    },
    cancelShowScores: function() {
        this.setData({
            isShowWillScores: !1
        });
    },
    intoMemberIntroduce: function() {
        wx.navigateTo({
            url: "/pages/memberIntroduce/memberIntroduce"
        });
    },
    getScoreWallet: function() {
        var e = this, t = wx.getStorageSync("userId");
        (0, a.getScoreWallet)(t).then(function(t) {
            200 === t.code && (console.log("积分钱包", t), e.setData({
                scoresParket: t.data
            }));
        });
    },
    getDestributeWallet: function() {
        var e = this, t = wx.getStorageSync("userId");
        (0, n.getDestributeWallet)(t).then(function(t) {
            console.log("优惠券", t), 200 === t.code && e.setData({
                destributesParket: t.data
            });
        });
    },
    equityPosition: function() {
        var e = this;
        (0, t.equityPosition)().then(function(t) {
            200 === t.code && (console.log("展示项", t), e.setData({
                equityPosition: t.data
            }));
        });
    },
    memberQueryInfo: function() {
        var e = wx.getStorageSync("userId");
        (0, a.memberQueryInfo)(e);
    },
    intoPersonCenter: function() {
        wx.navigateTo({
            url: "/pages/personalCenter/personalCenter"
        });
    },
    intoQRCode: function() {
        wx.getStorageSync("userId") ? wx.navigateTo({
            url: "/pages/memberQRCode/memberQRCode?isMember=true"
        }) : wx.showToast({
            title: "您还没登录哟",
            icon: "none",
            duration: 1500
        });
    },
    intoScores: function() {
        wx.navigateTo({
            url: "/pages/integralDetail/integralDetail"
        });
    },
    intoDestributes: function() {
        wx.navigateTo({
            url: "/pages/destributes/destributeLists/destributeLists"
        });
    },
    getHotGoods: function() {
        var e = this;
        (0, o.getHotNewGoods)("hot").then(function(t) {
            200 === t.code && (console.log("热门商品", t), e.setData({
                hotLists: t.data
            }));
        });
    },
    intoHotGoods: function(e) {
        console.log(e);
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/goods/goodDetail/goodDetail?id=".concat(t)
        });
    },
    getNewGoods: function() {
        var e = this;
        (0, o.getHotNewGoods)("new").then(function(t) {
            console.log("最新商品", t), 200 === t.code && e.setData({
                newLists: t.data
            });
        });
    },
    intoNewGoods: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/goods/goodDetail/goodDetail?id=".concat(t)
        });
    },
    needLogin: function() {
        wx.navigateTo({
            url: "/pages/userLogin/userLogin"
        });
    },
    getCommonImgUrl: function() {
        var e = this;
        r.globalData.imageUrl ? this.setData({
            imgUrl: r.globalData.imageUrl
        }) : r.getSysInfoCallback = function(t) {
            e.setData({
                imgUrl: t.data
            });
        };
    },
    getbackGroundImg: function() {
        var o = this;
        (0, t.getbackGroundImg)().then(function(t) {
            if (console.log("图片", t), wx.hideLoading(), 200 == t.code) {
                if (t.data.kvModel1) {
                    var a = t.data.kvModel1.kvConfigs;
                    o.setData({
                        isUseKvModel1: 0 === t.data.kvModel1.isenable,
                        kvModel1Times: 1e3 * t.data.kvModel1.staySec,
                        kvConfigs1Imgs: a
                    });
                }
                if (t.data.kvModel2) {
                    var n = t.data.kvModel2.kvConfigs;
                    o.setData({
                        isUseKvModel2: 0 === t.data.kvModel2.isenable,
                        kvModel2Times: 1e3 * t.data.kvModel2.staySec,
                        kvConfigs2Imgs: n
                    });
                }
                if (t.data.modelConfigs) {
                    var s = t.data.modelConfigs;
                    o.setData({
                        modelConfigs: s
                    });
                }
                if (null != t.data.pageConfigs) {
                    var i, r = e(t.data.pageConfigs);
                    try {
                        for (r.s(); !(i = r.n()).done; ) {
                            var g = i.value;
                            switch (g.configType) {
                              case 1:
                                o.setData({
                                    logo: g.imgUrl
                                });
                                break;

                              case 2:
                                o.setData({
                                    bigHeadImg: g.imgUrl
                                });
                                break;

                              case 3:
                                o.setData({
                                    mainBackgroundImg: g.imgUrl
                                });
                                break;

                              case 4:
                                o.setData({
                                    memberCardImg: g.imgUrl
                                });
                                break;

                              case 5:
                                o.setData({
                                    gradesImg: g.imgUrl
                                });
                                break;

                              case 8:
                                o.setData({
                                    newSaleImg: g.imgUrl
                                });
                                break;

                              case 10:
                                o.setData({
                                    tabBarImg: g.imgUrl
                                });
                            }
                        }
                    } catch (e) {
                        r.e(e);
                    } finally {
                        r.f();
                    }
                }
                console.log(o.data.mainBackgroundImg);
            }
        });
    },
    onHide: function() {
        wx.getStorageSync("userInfo") && (this.setData({
            userInfo: wx.getStorageSync("userInfo")
        }), this.getScoreWallet());
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});