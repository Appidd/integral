var e = getApp();

Component({
    properties: {},
    data: {
        nowLevel: "",
        levelRgb: ""
    },
    methods: {
        getLevelMessage: function() {
            var t = this;
            Http.get("/applets/member/customer/getUserScoreLevel?customerId=".concat(e.globalData.userId)).then(function(e) {
                200 === e.code && t.setData({
                    nowLevel: e.data.nowLevel,
                    levelRgb: e.data.levelRgb
                });
            });
        },
        intoMemberIntroduce: function() {
            wx.navigateTo({
                url: "/pages/memberIntroduce/memberIntroduce"
            });
        }
    },
    lifetimes: {
        attached: function() {
            this.getLevelMessage();
        }
    }
});