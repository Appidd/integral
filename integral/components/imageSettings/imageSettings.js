var a = require("../../@babel/runtime/helpers/createForOfIteratorHelper"), e = require("../../apis/allocation"), g = getApp();

Component({
    properties: {
        config: {
            type: String,
            value: "0"
        }
    },
    data: {
        logo: "",
        bigHeadImg: "",
        mainBackgroundImg: "",
        memberCardImg: "",
        gradesImg: "",
        tabBarImg: "",
        newSaleImg: ""
    },
    methods: {
        getbackGroundImg: function() {
            var t = this;
            (0, e.getbackGroundImg)().then(function(e) {
                if (console.log("图片", e), null != e.data.pageConfigs) {
                    var r, l = a(e.data.pageConfigs);
                    try {
                        for (l.s(); !(r = l.n()).done; ) {
                            var i = r.value;
                            switch (i.configType) {
                              case 1:
                                t.setData({
                                    logo: g.globalData.imageUrl + "/" + i.imgUrl
                                });
                                break;

                              case 2:
                                t.setData({
                                    bigHeadImg: g.globalData.imageUrl + "/" + i.imgUrl
                                });
                                break;

                              case 3:
                                t.setData({
                                    mainBackgroundImg: g.globalData.imageUrl + "/" + i.imgUrl
                                });
                                break;

                              case 4:
                                t.setData({
                                    memberCardImg: g.globalData.imageUrl + "/" + i.imgUrl
                                });
                                break;

                              case 5:
                                t.setData({
                                    gradesImg: g.globalData.imageUrl + "/" + i.imgUrl
                                });
                                break;

                              case 8:
                                t.setData({
                                    newSaleImg: g.globalData.imageUrl + "/" + i.imgUrl
                                });
                                break;

                              case 10:
                                t.setData({
                                    tabBarImg: g.globalData.imageUrl + "/" + i.imgUrl
                                });
                            }
                        }
                    } catch (a) {
                        l.e(a);
                    } finally {
                        l.f();
                    }
                }
            });
        },
        intoPage: function(a) {
            console.log(a);
            var e = a.currentTarget.dataset.page;
            wx.navigateTo({
                url: e
            });
        }
    },
    lifetimes: {
        attached: function() {
            this.getbackGroundImg();
        }
    }
});