Component({
    properties: {
        title: {
            type: String,
            value: ""
        },
        style: {
            type: String,
            value: "color:#7F7F7F"
        },
        infoValue: {
            type: String,
            value: ""
        },
        titleIcon: {
            type: String,
            value: ""
        },
        page: {
            type: String,
            value: ""
        },
        isInput: {
            type: String,
            value: "false"
        },
        picker: {
            type: String,
            value: "false"
        },
        pickerValue: {
            type: String,
            value: "点击选择"
        },
        pickerArr: {
            type: Array,
            value: []
        },
        maxLength: {
            type: Number,
            value: 50
        },
        intoValue: {
            type: String,
            value: ""
        }
    },
    data: {
        regionArr: [],
        region: "",
        inputValue: ""
    },
    methods: {
        intoPage: function() {
            wx.navigateTo({
                url: "/pages/".concat(this.data.page, "/").concat(this.data.page)
            });
        },
        startInput: function(e) {
            var t = e.detail.value;
            this.setData({
                inputValue: t
            }), this.triggerEvent("input", t);
        },
        bindRegionChange: function(e) {
            var t = "";
            e.detail.value[0] === e.detail.value[1] ? t = e.detail.value[0] + " " + e.detail.value[2] : e.detail.value.forEach(function(e, a) {
                t = t + " " + e;
            }), this.setData({
                region: t,
                regionArr: e.detail.value
            }), this.triggerEvent("chooseArea", e.detail.value);
        }
    },
    lifetimes: {
        attached: function() {}
    }
});