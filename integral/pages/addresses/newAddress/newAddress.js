var t = require("../../../apis/address");

getApp();

Page({
    data: {
        editType: "new",
        id: "",
        name: "",
        phone: "",
        province: "",
        city: "",
        area: "",
        addressDesc: "",
        address: "点击选择",
        regionArr: [],
        pickerArr: [],
        isDefault: !1,
        btnText: "保存"
    },
    onLoad: function(t) {
        console.log(t), "old" === t.type && (this.setData({
            editType: t.type,
            id: t.id,
            btnText: "修改"
        }), this.getAddressDetail(t.id));
    },
    onReady: function() {},
    onShow: function() {},
    getAddressDetail: function(a) {
        var e = this;
        (0, t.getAddressDetail)(a).then(function(t) {
            console.log(t), 200 === t.code && e.setData({
                name: t.data.name,
                phone: t.data.phone,
                addressDesc: t.data.addressDesc,
                province: t.data.province,
                city: t.data.city,
                area: t.data.area,
                pickerArr: [ t.data.province, t.data.city, t.data.area ],
                isDefault: 1 === t.data.isDefault,
                address: t.data.province + (t.data.province === t.data.city ? "" : t.data.city) + t.data.area
            });
        });
    },
    chooseArea: function(t) {
        console.log(t);
        var a = t.detail.value;
        this.setData({
            province: a[0],
            city: a[1],
            area: a[2],
            address: a[0] + (a[1] === a[0] ? "" : a[1]) + a[2],
            regionArr: a
        });
    },
    startInput: function(t) {
        console.log(t);
        var a = t.currentTarget.dataset.index;
        "1" === a ? this.setData({
            name: t.detail.value
        }) : "2" === a ? this.setData({
            phone: t.detail.value
        }) : this.setData({
            addressDesc: t.detail.value
        });
    },
    chooseDefault: function() {
        var t = this.data.isDefault;
        t = !t, this.setData({
            isDefault: t
        });
    },
    save: function() {
        console.log(this.data.phone);
        if (this.data.name) if (/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(this.data.phone)) if (this.data.city) {
            var a = {
                name: this.data.name,
                phone: this.data.phone,
                province: this.data.province,
                city: this.data.city,
                area: this.data.area,
                addressDesc: this.data.addressDesc,
                customerId: wx.getStorageSync("userId"),
                isDefault: this.data.isDefault ? 1 : 0
            };
            "new" === this.data.editType ? (0, t.saveNewAddress)(a).then(function(t) {
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
            }) : (a.id = this.data.id, (0, t.modifyAddress)(a).then(function(t) {
                200 === t.code && wx.showToast({
                    title: "修改成功",
                    icon: "success",
                    duration: 500,
                    success: function() {
                        setTimeout(function() {
                            wx.navigateBack({});
                        }, 500);
                    }
                });
            }));
        } else wx.showToast({
            title: "地区没选哟",
            icon: "none",
            duration: 1500
        }); else wx.showToast({
            title: "手机号有误",
            icon: "none",
            duration: 1500
        }); else wx.showToast({
            title: "收货人没填哟",
            icon: "none",
            duration: 1500
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});