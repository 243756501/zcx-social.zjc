mui.init();
var activeId = 'weibo';
var IsRotation = false;
var middleRotation = function() {

}
var middleReset = function() {

}
var iconSwitch = function(target) {
	mui('.mui-bar-tab .mui-tab-item .nav-icon').each(function(index, item) {
		var itemSrc = item.getAttribute('src');
		if(itemSrc.indexOf('_pressed')) {
			item.src = itemSrc.replace('_pressed.png', '_normal.png');
			middleReset();
		}
	});
	var navIcon = mui('.' + target)[0];
	target !== 'middle' ? navIcon.src = navIcon.src.replace('_normal.png', '_pressed.png') : middleRotation();
}
mui.plusReady(function() {
	var index_main = plus.webview.getWebviewById('index_main');
	mui('.mui-bar-tab').on('tap', 'a', function(event) {
		var targetId = this.id;
		if(activeId !== targetId) {
			iconSwitch(targetId);
			mui.fire(index_main, 'nav_tap', {
				targetId: targetId,
				activeId: activeId
			})
			activeId = targetId;
		} else {
			return;
		}
	});
})