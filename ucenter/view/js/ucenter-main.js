mui.init();
var dom = {
	loginBtn: mui('#loginBtn')[0],
	regBtn: mui('#regBtn')[0],
	unloginBody: mui('#unloginBody')[0],
	loginBody: mui('#loginBody')[0],
	userInfoBody: mui('#userInfoBody')[0],
};
var html_attach={'ucMessage':'../../imchat/view/imchat-main','ucInfo':'../../ucenter/view/ucenter-userinfo','ucRank':'../../ucenter/view/ucenter-rank','ucSign':'../../ucenter/view/ucenter-sign','ucFans':'../../ucenter/view/ucenter-fans','ucScore':'../../ucenter/view/ucenter-score','ucSecure':'../../ucenter/view/ucenter-secure','ucAbout':'../../ucenter/view/ucenter-about'}
var tool = {
	addUserInfo: function(userInfo) {
		dom.userInfoBody.innerHTML = template('userInfo_script', userInfo.data_1);
	},
};

var initEvent = function() {
	dom.loginBtn.addEventListener('tap', function() {
		webtool.openPreView('../../account/view/account-login', function(wb) {
			wb.show('slide-in-right');
		})
	});
	dom.regBtn.addEventListener('tap', function() {
		webtool.openPreView('../../account/view/account-reg', function(wb) {
			wb.show('slide-in-right');
		})
	});
	window.addEventListener('userchange', function(e) {
		var userInfo = e.detail.userInfo;
		tool.addUserInfo(userInfo);
		apptools.changePage(dom.loginBody, dom.unloginBody, true);
	});
	mui('.ucenter-bottom-container').on('tap','button',function(e){
		webtool.openPreView(html_attach[this.id],function(wb){
			wb.show('slide-in-right');
		})
	});
}

mui.plusReady(function() {
	initEvent();
	if(app.isLogin()) {
		apptools.changePage(dom.loginBody, dom.unloginBody, true);
		app.getUserInfo(function(userInfo) {
			tool.addUserInfo(userInfo);
			document.getElementById("switchBtn").addEventListener('tap', function() {
				webtool.openPreView('../../account/view/account-login', function(wb) {
					wb.show('slide-in-right');
				})
			});
		});
	}
})