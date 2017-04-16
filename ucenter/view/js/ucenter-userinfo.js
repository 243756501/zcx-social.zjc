mui.init();
var topInfo = document.getElementById("Info");
var bottomInfo = document.getElementById("bottomInfo");
var postInfo = {};
mui.plusReady(function() {
	window.addEventListener('userchange', function(e) {
		var userInfo = e.detail.userInfo;
		var userId = userInfo.data_1.uid;
		postInfo.uid = userId;
		ucenter.getUserInfo(postInfo, function(res) {
			if(res.data) {
				var render_top = template.compile(usercenter_main_script);
				var html_top = render_top(res.data);
				topInfo.innerHTML = html_top;
				var render_bottom = template.compile(usercenter_info_script);
				var html_bottom = render_bottom(res.data);
				bottomInfo.innerHTML = html_bottom;
			} else {
				mui.toast('用户信息获取失败!');
			}
		})
	})
})