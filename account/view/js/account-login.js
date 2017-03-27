mui.init();
var dom = {
	regBtn: mui('#regBtn')[0],
	loginBtn: mui('#loginBtn')[0],
	usr: mui('#usr')[0],
	pwd: mui('#pwd')[0],
}
var initEvent = function() {
	dom.regBtn.addEventListener('tap', function() {
		webtool.openPreView('account-reg', function(wb) {
			wb.show('slide-in-right');
		})
	});
	dom.loginBtn.addEventListener('tap', function() {
		if(!dom.usr.value || !dom.pwd.value) {
			mui.toast('用户名密码不能为空！');
			return;
		}
		var accountInfo = {
			usr: dom.usr.value,
			pwd: dom.pwd.value
		}
		account.login(accountInfo, function(res) {
			if(res.data) {
				webtool.openPreView('../../index/view/index_main', function(wb) {
					mui.toast('登录成功');
					//给每个webview都发送,因为用户登录信息更改影响很多页面
					var all = plus.webview.all();
					console.log(JSON.stringify(res))
					app.saveUser(JSON.stringify(res));
					for(var i in all) {
						mui.fire(all[i], 'userchange', {
							'userInfo': res
						})
					}
					wb.show('slide-in-right');
				});
			} else {
				mui.toast(res.info);
			}
		})
	});
}
mui.plusReady(function() {
	initEvent();
})