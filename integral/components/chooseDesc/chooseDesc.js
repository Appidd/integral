Component({
    properties: {
        descList: {
            type: Array,
            value: []
        }
    },
    data: {
        count: 1,
        typeList: [],
        typeName: "",
        endCategoryList: [],
        choosedDesc: {},
        isCanUse: !1
    },
    methods: {
        getCategoryLists: function() {
            var t = this.data.descList, e = [];
            0 !== t.length && t[0].skuName.split(",").forEach(function(s, a) {
                var n = {};
                n.type = s, n.typeArr = [], t.forEach(function(t, e) {
                    t.skuValue.split(",").forEach(function(e, s) {
                        var o = {};
                        s === a && (o.id = t.id, o.name = e, o.jsonInfo = t.jsonInfo, o.safetyInventory = t.safetyInventory, 
                        o.skuValue = t.skuValue, n.typeArr.push(o));
                    });
                }), e.push(n);
            }), this.changeCateLists(e);
        },
        changeCateLists: function(t) {
            var e = [];
            t.forEach(function(t, s) {
                var a = {};
                a.type = t.type, a.typeArr = [], t.typeArr.forEach(function(e, s) {
                    var n = {
                        isActive: !1
                    };
                    n.name = e.name, n.cateArr = [], t.typeArr.forEach(function(t, s) {
                        e.name === t.name && n.cateArr.push(t);
                    }), a.typeArr.push(n);
                }), e.push(a);
            }), this.changetotalArr(e);
        },
        changetotalArr: function(t) {
            var e = [];
            t.forEach(function(t, s) {
                var a = {};
                a.type = t.type, a.endArr = [];
                var n = [];
                t.typeArr.forEach(function(t, e) {
                    var s = 0;
                    n.forEach(function(e) {
                        e === t.name && s++;
                    }), 0 === s && (a.endArr.push(t), n.push(t.name));
                }), e.push(a);
            }), console.log("666", e), this.setData({
                endCategoryList: e
            });
        },
        chooseType: function(t) {
            var e = this;
            this.setData({
                choosedDesc: {},
                isCanUse: !1,
                count: 1
            });
            var s = t.currentTarget.dataset.name, a = t.currentTarget.dataset.type, n = this.data.endCategoryList;
            n.forEach(function(t) {
                t.type === a && t.endArr.forEach(function(t) {
                    return t.name === s ? t.isActive = !0 : t.isActive = !1;
                });
            }), this.setData({
                endCategoryList: n
            }, function() {
                e.composeDesc();
            });
        },
        composeDesc: function() {
            var t = this, e = this.data.endCategoryList, s = [];
            e.forEach(function(t) {
                t.endArr.forEach(function(t) {
                    t.isActive && t.cateArr.forEach(function(t) {
                        s.push(t.id);
                    });
                });
            }), s.forEach(function(a) {
                var n = 0;
                s.forEach(function(t) {
                    a === t && n++;
                }), n === e.length && (t.getDescMessage(a), console.log("找到了", a), t.triggerEvent("chooseDescImg", a));
            });
        },
        getDescMessage: function(t) {
            var e = this;
            console.log("选中的id", t);
            this.data.descList.forEach(function(s) {
                s.id === t && e.setData({
                    choosedDesc: s,
                    isCanUse: s.inventory - s.safetyInventory != 0
                });
            }), console.log("选中的规格", this.data.choosedDesc);
        },
        subCount: function() {
            var t = this.data.count;
            t > 1 && (t--, this.setData({
                count: t
            }));
        },
        addCount: function() {
            var t = this.data.count, e = this.data.choosedDesc.inventory ? this.data.choosedDesc.inventory - this.data.choosedDesc.safetyInventory : 0;
            this.data.isCanUse && t < e && (t++, this.setData({
                count: t
            }));
        },
        confirmDesc: function() {
            var t = this.data.choosedDesc;
            t.count = this.data.count, this.data.isCanUse && this.triggerEvent("useDesc", t);
        }
    },
    lifetimes: {
        attached: function() {
            console.log("传参", this.data.descList), this.getCategoryLists();
        }
    }
});