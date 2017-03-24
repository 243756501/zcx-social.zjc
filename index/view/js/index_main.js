mui.init();
var subpages = ['../../weibo/view/weibo-main.html', '../../news/view/news-main.html', '../../middle/view/middle-main.html', '../../question/view/question-main.html', '../../ucenter/view/ucenter-main.html'];
var subpages_attach = { 'weibo': '../../weibo/view/weibo-main.html', 'news': '../../news/view/news-main.html', 'middle': '../../middle/view/middle-main.html', 'question': '../../question/view/question-main.html', 'ucenter': '../../ucenter/view/ucenter-main.html' }
window.addEventListener('nav_tap', function(event) {
	var targetId = event.detail.targetId;
	var activeId = event.detail.activeId;
	changeWebview(targetId, activeId);
});
var changeWebview = function(targetWeb, activeWeb) {
	plus.webview.show(subpages_attach[targetWeb]);
	plus.webview.hide(subpages_attach[activeWeb]);
};
mui.plusReady(function() {	
	var self = plus.webview.currentWebview();
	var index = 0;
	for(var i = 0; i < subpages.length; i++) {
		var children = plus.webview.create(
			subpages[i],
			subpages[i], {
				top:'1px',
				bottom: '50px',
				zindex:'1'
			}
		)
		if(i !== index) {
			children.hide();
		}
		self.append(children);
	}
	var control = plus.webview.create("index_module.html", "index_module.html", {
		background: "transparent",
		width: "100%",
		positon: "dock",
		dock: "bottom",
		height: "80px",
		bottom: "0px",
		zindex:'9999'
	});
	self.append(control);
	apptools.backQuit();
});