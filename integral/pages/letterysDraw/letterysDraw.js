var t = require("../../@babel/runtime/helpers/toConsumableArray"), e = require("../../apis/letterys"), a = require("../../apis/user"), s = getApp();

Page({
    data: {
        userTimer: function() {},
        activityId: 0,
        surplusNum: 0,
        letterys: [],
        index: 1,
        fixPosition: 0,
        awardRecordId: -1,
        nameLists: [],
        resultLists: [],
        pagesConfig: {},
        canUseScores: 0,
        imgUrl: "",
        durationTime: 20,
        splitTime: 5,
        isOverLoad: !1,
        isStop: !0,
        pageNum: 1,
        pageSize: 30
    },
    onLoad: function(t) {
        if ("" != wx.getStorageSync("userId") && "null" != wx.getStorageSync("userId") && null != wx.getStorageSync("userId") && null != wx.getStorageSync("userId") || (wx.showToast({
            title: "用户状态异常请重新登录",
            icon: "none"
        }), wx.reLaunch({
            url: "/pages/userLogin/userLogin"
        })), t.activityId) {
            this.setData({
                activityId: t.activityId
            });
            this.getFreeDrawCount(), this.getScoreWallet(), this.getReqPageSet(), this.reqAwardProductList(), 
            this.getWinningList(), this.getResultList();
        }
    },
    onReady: function() {},
    onShow: function() {
        this.data.activityId && this.getResultList();
    },
    getFreeDrawCount: function() {
        var t = this, a = {
            activityId: this.data.activityId,
            customerId: wx.getStorageSync("userId")
        };
        (0, e.getFreeDrawCount)(a).then(function(e) {
            console.log("免费抽奖", e), 200 === e.code && t.setData({
                surplusNum: e.data.surplusNum
            });
        });
    },
    getBackAddress: function(t) {
        var a = this, s = {
            addressDesc: t.addressDesc,
            area: t.area,
            awardRecordId: this.data.awardRecordId,
            changeNum: 1,
            city: t.city,
            customerId: wx.getStorageSync("userId"),
            doOrderNickName: wx.getStorageSync("userInfo").nickname,
            doOrderPhone: wx.getStorageSync("userInfo").phone,
            name: t.name,
            orderRemark: "",
            phone: t.phone,
            province: t.province
        };
        (0, e.receiveLuckSpu)(s).then(function(t) {
            if (console.log("领导了", t), 200 === t.code) {
                var e = a.data.resultLists;
                e.forEach(function(t) {
                    return t.id !== a.data.awardRecordId || (t.status = 2);
                }), a.setData({
                    resultLists: e
                }), wx.showToast({
                    title: "领取成功",
                    icon: "success"
                });
            }
        });
    },
    intoReceiveGood: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.detail;
        this.setData({
            awardRecordId: e
        }), console.log(a), wx.navigateTo({
            url: "/pages/order/writeOrder/writeOrder?awardRecordId=".concat(e, "&&awardDetail=").concat(encodeURIComponent(JSON.stringify(a)))
        });
    },
    getResultList: function() {
        var t = this, a = {
            activityId: this.data.activityId,
            customerId: wx.getStorageSync("userId"),
            pageNum: 1,
            pageSize: 1e3
        };
        (0, e.getWinningList)(a).then(function(e) {
            200 === e.code && t.setData({
                resultLists: e.data
            }), t.setData({
                isOverLoad: !0
            }), console.log("抽奖结果", e);
        });
    },
    getWinningList: function() {
        var a = this;
        clearInterval(this.userTimer);
        var s = this.data.nameLists, i = this.data.pageNum, o = {
            activityId: this.data.activityId,
            pageNum: this.data.pageNum,
            pageSize: this.data.pageSize
        };
        (0, e.getWinningList)(o).then(function(e) {
            200 === e.code && 0 !== e.data.length && (s.push.apply(s, t(e.data)), i++, a.setData({
                nameLists: s,
                pageNum: i
            }));
        });
    },
    reqAwardProductList: function() {
        var t = this, a = this.data.activityId;
        (0, e.reqAwardProductList)(a).then(function(e) {
            if (console.log("奖项列表", e), 200 === e.code) {
                var a = [ 8 ];
                e.data.forEach(function(t, e) {
                    switch (t.sortNum) {
                      case 1:
                        a[0] = t;
                        break;

                      case 2:
                        a[1] = t;
                        break;

                      case 3:
                        a[2] = t;
                        break;

                      case 4:
                        a[4] = t;
                        break;

                      case 5:
                        a[7] = t;
                        break;

                      case 6:
                        a[6] = t;
                        break;

                      case 7:
                        a[5] = t;
                        break;

                      case 8:
                        a[3] = t;
                    }
                }), a.splice(4, 0, {
                    id: 9,
                    awardType: 5,
                    sortNum: 9
                }), a.forEach(function(t) {
                    return t.isActive = !1;
                }), t.setData({
                    letterys: a
                });
            }
        });
    },
    getScoreWallet: function() {
        var t = this, e = wx.getStorageSync("userId");
        (0, a.getScoreWallet)(e).then(function(e) {
            200 === e.code && (console.log("积分钱包", e), t.setData({
                canUseScores: e.data.customerScore ? e.data.customerScore : 0
            }));
        });
    },
    getReqPageSet: function() {
        var t = this, a = this.data.activityId;
        (0, e.getReqPageSet)(a).then(function(e) {
            200 === e.code && t.setData({
                imgUrl: s.globalData.imageUrl,
                pagesConfig: e.data
            }), console.log("页面配置", e);
        });
    },
    getLuckSpu: function(t) {
        var s = this;
        9 == t.currentTarget.dataset.sortnum && (1 === s.data.pagesConfig.status ? (0, a.checkBlackList)(wx.getStorageSync("userId")).then(function(t) {
            if (console.log(t), 200 == t.code) if (t.data.blackListFlag) wx.showToast({
                title: "操作异常error500",
                icon: "none"
            }); else if (1 === s.data.pagesConfig.isStartEndStatus) {
                var a = {
                    activityId: s.data.activityId,
                    customerId: wx.getStorageSync("userId"),
                    doScore: 0 === s.data.surplusNum ? s.data.pagesConfig.doScore : 0
                };
                0 === s.data.surplusNum && s.data.canUseScores < s.data.pagesConfig.doScore ? wx.showToast({
                    title: "当前积分不足",
                    icon: "none",
                    mask: !0
                }) : s.data.isStop && (0, e.getLuckSpu)(a).then(function(t) {
                    200 === t.code ? (s.setData({
                        fixPosition: t.data.sortNum,
                        isStop: !1
                    }), s.getScoreWallet(), s.getFreeDrawCount(), s.startDraw()) : wx.showToast({
                        title: t.message,
                        icon: "none"
                    }), console.log("抽中的奖品", t);
                });
            } else wx.showToast({
                title: "该活动还未开始",
                icon: "none"
            }); else wx.showToast({
                title: t.message,
                icon: "none"
            });
        }) : wx.showToast({
            title: "该活动还未开启",
            icon: "none"
        }));
    },
    startDraw: function() {
        var t = this.data.letterys, e = this.data.index, a = this.data.fixPosition;
        8 === a && (a = 0), t.forEach(function(t) {
            return t.sortNum === e ? t.isActive = !0 : t.isActive = !1;
        }), this.setData({
            letterys: t
        }), this.rotate(e, this.data.durationTime, this.data.splitTime, a);
    },
    rotate: function(t, e, a, s) {
        var i = this, o = this.data.letterys, n = setTimeout(function() {
            o.forEach(function(e) {
                return e.sortNum === t + 1 ? e.isActive = !0 : e.isActive = !1;
            }), i.setData({
                letterys: o
            }), ++t > 7 && (t = 0), a++, (e += a) > 400 && s === t ? (clearTimeout(n), i.setData({
                index: t
            }), i.showLight(t)) : i.rotate(t, e, a, s);
        }, e);
    },
    showLight: function(t) {
        var e = this;
        0 === t && (t = 8);
        var a = e.data.letterys, s = 0;
        a.forEach(function(i) {
            if (t === i.sortNum) var o = setInterval(function() {
                i.isActive = !i.isActive, console.log(i.isActive), e.setData({
                    letterys: a
                }), ++s > 3 && (clearInterval(o), setTimeout(function() {
                    e.setData({
                        isStop: !0
                    });
                }, 50), a.forEach(function(a) {
                    t === a.sortNum && 4 !== a.awardType && wx.showModal({
                        showCancel: !1,
                        title: "中奖啦！",
                        content: "恭喜您抽中".concat(a.awardName),
                        success: function(t) {
                            t.confirm && (e.getResultList(), e.setData({
                                pageNum: 1,
                                nameLists: []
                            }), e.getWinningList());
                        }
                    });
                }));
            }, 100);
        });
    },
    onHide: function() {
        clearInterval(this.userTimer);
    },
    onUnload: function() {
        clearInterval(this.userTimer);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});