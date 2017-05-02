mui.init();
var scoreList = document.getElementById("scoreList");
var addScoreList = function(data) {
	var li = document.createElement('li');
	li.id = data.id;
	li.className = "score-item mui-table-view-cell";
	li.innerHTML = template('scoreItem_script', data);
	return li;
}
mui.plusReady(function() {
	ucenter.getAppConfig(function(appRes) {
		ucenter.getUserConfig(function(usrRes) {
			var scoreConfig = appRes.data.system.score_list;
			for(i in scoreConfig) {
				scoreConfig[i]['score'] = usrRes.data['score' + scoreConfig[i].id];
				var li = addScoreList(scoreConfig[i]);
				scoreList.appendChild(li);
			}
		})
	})
	webtool.backQuit();
})