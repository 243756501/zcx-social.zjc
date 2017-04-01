mui.init();
mui.plusReady(function() {
	var weiboContent = document.getElementById("weiboContent");
	var sendBtn = document.getElementById("sendBtn");
	var weiboView = plus.webview.getWebviewById('../../weibo/view/weibo-main.html');
	var mainView = plus.webview.currentWebview();
	sendBtn.addEventListener('tap', function() {
		if(weiboContent.value.length == 0) {
			mui.toast('发送内容不能为空！');
			return;
		}
		var postInfo = {
			'content': weiboContent.value,
			'type': 'feed',
			'from': apptools.getPhoneType()
		}
		weibo.sendWeibo(postInfo, function(res) {
			weiboView.evalJS('mui(".mui-content .mui-scroll").pullToRefresh().pullDownLoading()');
			mainView.close();
		})
	})
})