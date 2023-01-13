var t = require("../../apis/user");

Page({
    data: {
        title: "",
        info: "",
        itemValue: {},
        selectOptionList: [],
        fieldType: 1,
        region: "",
        regionDetail: "",
        regionArr: [],
        address: "",
        mustWrite: !1
    },
    onLoad: function(t) {
        var e = JSON.parse(t.item);
        console.log("单独", e), t && (this.setData({
            itemValue: e
        }), this.compareFont());
    },
    bindRegionChange: function(t) {
        this.setData({
            info: ""
        });
        var e = "", i = "";
        t.detail.value[0] === t.detail.value[1] ? (e = t.detail.value[0] + " " + t.detail.value[2], 
        i = t.detail.value[0] + t.detail.value[2]) : t.detail.value.forEach(function(t, a) {
            e = e + " " + t, i += t;
        }), this.setData({
            region: e,
            regionDetail: i,
            regionArr: t.detail.value,
            info: i + " " + this.data.address
        });
    },
    getRegionValue: function(t) {
        this.setData({
            info: ""
        });
        var e = t.detail.value;
        this.setData({
            address: e,
            info: this.data.regionDetail + " " + e
        });
    },
    compareFont: function() {
        var t = this.data.itemValue, e = this.data.selectOptionList;
        5 === t.fieldType ? t.selectOption.split(",").forEach(function(i) {
            var a = {}, n = 0;
            t.info && t.info.split(" ").forEach(function(t) {
                t === i && n++;
            }), a.isActive = 0 !== n, a.type = i, e.push(a);
        }) : e = t.selectOption ? t.selectOption.split(",") : [], 3 === t.fieldType && this.setData({
            regionDetail: t.info.split(" ")[0],
            region: t.info.split(" ")[0],
            address: t.info.split(" ")[1]
        }), this.setData({
            title: t.fieldName,
            fieldType: t.fieldType,
            mustWrite: 1 === t.isnull,
            itemValue: t,
            info: t.info ? t.info : "",
            selectOptionList: e
        }), console.log(this.data.selectOptionList);
    },
    chooseMoreChoose: function(t) {
        var e = "", i = this.data.selectOptionList, a = (t.currentTarget.dataset.value, 
        t.currentTarget.dataset.index);
        i.forEach(function(t, e) {
            return t.isActive = e === a ? !t.isActive : t.isActive;
        }), i.forEach(function(t, i) {
            return e = !0 === t.isActive ? e + " " + t.type : e;
        }), this.setData({
            info: e,
            selectOptionList: i
        });
    },
    chooseSex: function(t) {
        this.setData({
            info: t.currentTarget.dataset.value
        });
    },
    bindDateChange: function(t) {
        this.setData({
            info: t.detail.value
        });
    },
    getContent: function(t) {
        this.setData({
            info: t.detail.value
        });
    },
    commitAll: function() {
        var e = {
            customerId: wx.getStorageSync("userId"),
            fieldId: this.data.itemValue.id,
            fieldName: this.data.itemValue.fieldName,
            info: this.data.info
        };
        "邮箱" !== this.data.itemValue.fieldName || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.data.info) ? "" === this.data.info && this.data.mustWrite ? wx.showToast({
            title: "".concat(this.data.itemValue.fieldName, "不能为空哦"),
            icon: "none",
            duration: 1500
        }) : (0, t.updateUserInfo)(e).then(function(t) {
            200 === t.code && wx.showToast({
                title: "保存成功",
                icon: "success",
                duration: 500,
                success: function() {
                    setTimeout(function() {
                        wx.navigateBack({});
                    }, 500);
                }
            });
        }) : wx.showToast({
            title: "邮箱格式有误",
            icon: "none",
            duration: 1500
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