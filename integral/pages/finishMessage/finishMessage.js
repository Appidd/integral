var t = require("../../apis/user");

require("../../config/config"), getApp();

Page({
    data: {
        animationData: [],
        phoneNumber: "",
        name: "",
        sexValue: -1,
        sexLists: [ "男", "女" ],
        birthdayValue: "",
        cityList: [],
        cityText: "",
        infoProvince: "",
        infoCity: "",
        infoArea: "",
        endTime: ""
    },
    onLoad: function(t) {
        this.showMessageFromRight(), this.setData({
            phoneNumber: wx.getStorageSync("userInfo").phone
        });
        var e = new Date();
        console.log(e.getFullYear() - 14 + "-" + (e.getMonth() + 1) + "-" + e.getDate()), 
        this.setData({
            endTime: e.getFullYear() - 14 + "-" + (e.getMonth() + 1) + "-" + e.getDate()
        });
    },
    chooseCity: function(t) {
        console.log(t);
        var e = t.detail.value;
        this.setData({
            infoProvince: e[0],
            infoCity: e[1],
            infoArea: e[2],
            cityList: e,
            cityText: e[0] + e[1] + e[2]
        });
    },
    chooseBirthday: function(t) {
        console.log(t), this.setData({
            birthdayValue: t.detail.value
        });
    },
    chooseSex: function(t) {
        this.setData({
            sexValue: t.detail.value
        });
    },
    inputValue: function(t) {
        this.setData({
            name: t.detail.value
        });
    },
    addOurs: function() {
        if (this.data.name) if (-1 === this.data.sexValue) wx.showToast({
            title: "请选择性别",
            icon: "none",
            duration: 1500
        }); else if (this.data.birthdayValue) if (this.data.cityText) {
            var e = {
                infoProvince: this.data.infoProvince,
                infoCity: this.data.infoCity,
                infoArea: this.data.infoArea,
                customerId: wx.getStorageSync("userId"),
                birthInfo: this.data.birthdayValue,
                city: this.data.cityText,
                gender: this.data.sexLists[this.data.sexValue],
                name: this.data.name,
                phone: this.data.phoneNumber
            };
            console.log(e), (0, t.postBaseMessage)(e).then(function(t) {
                console.log("加入我们", t), 200 === t.code && (wx.setStorageSync("token", t.data.token), 
                wx.reLaunch({
                    url: "/pages/userCenter/userCenter"
                }));
            });
        } else wx.showToast({
            title: "请选择城市",
            icon: "none",
            duration: 1500
        }); else wx.showToast({
            title: "请选择生日",
            icon: "none",
            duration: 1500
        }); else wx.showToast({
            title: "姓名没填哟",
            icon: "none",
            duration: 1500
        });
    },
    showMessageFromRight: function() {
        var t = wx.createAnimation({
            duration: 1e3,
            timingFunction: "ease"
        });
        t.left("0rpx").step(), this.setData({
            animationData: t.export()
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});