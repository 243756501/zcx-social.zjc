mui.init();
var content = document.getElementById("askContent");
var title = document.getElementById("askTitle");
var score = document.getElementById("askScore");
var resetBtn = document.getElementById("resetBtn");
var sendBtn = document.getElementById("sendBtn");
var fontCount = document.getElementById("fontCount");
content.addEventListener('input', function() {
	fontCount.innerHTML = 300 - content.value.length;
})
var clearAll = function() {
	title.innerHTML = "";
	score.innerHTML = "";
	content.innerHTML = "";
}
var postInfo = {};
mui.plusReady(function() {
	var questionView = plus.webview.getWebviewById('../../question/view/question-main.html');
	var askView = plus.webview.currentWebview();
	resetBtn.addEventListener('tap', function() {
		clearAll();
	});
	sendBtn.addEventListener('tap', function() {
		if(title.value.length == 0) {
			mui.toast('标题不能为空');
			return;
		} else if(score.value.length == 0) {
			mui.toast('悬赏积分不能为空');
			return;
		} else if(content.value.length == 0) {
			mui.toast('发布内容不能为空');
			return;
		}
		postInfo.description = content.value;
		postInfo.score_num = score.value;
		postInfo.title = title.value;
		question.askQuestion(postInfo, function(res) {
			if(res.data) {
				questionView.evalJS('mui(mui(".mui-scroll")[0]).pullToRefresh().pullDownLoading()');
				askView.close();
			} else {
				mui.toast(JSON.stringify(res.info));
			}
		})
	})
})