mui.init();
var dom = {
	titleOn: mui('#titleOn')[0],
	titleOff: mui('#titleOff')[0]
}
mui.plusReady(function() {
	window.addEventListener('userchange', function(e) {
		var userInfo = e.detail.userInfo;
		if(userInfo) {
			titleUser.innerHTML = userInfo.data_1.nickname;
			apptools.changePage(dom.titleOn, dom.titleOff, true);
		}
	});

	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.005
	});
	mui('.mui-content .mui-scroll').pullToRefresh({
		up: {
			callback: function() {
			}
		},
		down: {
			callback: function() {
			}
		}
	})
});