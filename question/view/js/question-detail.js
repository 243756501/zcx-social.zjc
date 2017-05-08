mui.init();
var postInfo = {};
var QuesCommList = null;
var mainBody = document.getElementById("mainBody");
var replyBtn = document.getElementById("replyBtn");
var createliBtn = function() {
	var li_add = document.createElement('li');
	li_add.className = "mui-table-view-cell no-comment";
	li_add.id = "liBtn";
	li_add.innerHTML = "<span id='commMoreBtn'>没有更多数据了</span>";
	return li_add;
}
var addQuesCommItem = function(data) {
	var li = document.createElement('li');
	li.className = "mui-table-view-cell";
	li.innerHTML = template('question_answer_script', data);
	return li;
};
var getQuesComm = function() {
	question.getQuestionAnswer(postInfo, function(res) {
		if(res.code == 200) {
			QuesCommList.innerHTML = "";
			var li_add = createliBtn();
			QuesCommList.appendChild(li_add);
			if(res.info !== null) {
				for(i in res.data) {
					var li = addQuesCommItem(res.data[i]);
					QuesCommList.insertBefore(li, li_add);
				}
			} else {
				QuesCommList.innerHTML = "<li class='mui-table-view-cell no-comment'><span>没有更多数据了</span></li>"
			}
		}
	});
}
mui.plusReady(function() {
	mui('.mui-scroll-wrapper').scroll();
	window.addEventListener('question-info', function(e) {
		var questionData = e.detail.data;
		var id = questionData.id;
		postInfo.id = id;
		question.getQuestionDtl(postInfo, function(res) {
			if(res.data) {
				var html = template('question_ask_script', res.data);
				res.data.update_time = apptools.fmtUnixTime(res.data.update_time);
				mainBody.innerHTML = html;
				QuesCommList = document.getElementById("answer_ul");
				getQuesComm();
			};
		});
		replyBtn.addEventListener('tap', function() {
			if(!app.isLogin()) {
				mui.toast('请先登录!');
				return;
			}
			webtool.openPreView('../../question/view/question-reply', function(wb) {
				mui.fire(wb, 'question-answer', {
					'id': id
				})
				wb.show('zoom-fade-out');
			});
		});
	})
})