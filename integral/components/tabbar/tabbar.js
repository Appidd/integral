Component({
    properties: {
        page: {
            type: String,
            value: "home"
        }
    },
    data: {},
    methods: {
        changePage: function(e) {
            var t = e.currentTarget.dataset.page;
            this.setData({
                page: t
            }), "home" === t ? wx.redirectTo({
                url: "/pages/userCenter/userCenter"
            }) : "lists" === t ? wx.redirectTo({
                url: "/pages/goods/goodLists/goodLists"
            }) : wx.redirectTo({
                url: "/pages/mine/mine"
            });
        }
    }
});