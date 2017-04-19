mui.init();
var postInfo = {
	'type': 2,
	'page': 1
}
var fansUl = document.getElementById("fansUl");
var addfansData = function(data) {
	var li = document.createElement('li');
	li.className = "uf-li mui-table-view-cell";
	li.id = data.uid;
	li.innerHTML = template('fans_script', data);
	return li;
}
mui.plusReady(function() {
	mui('.mui-scroll').pullToRefresh({
		up: {
			auto: true,
			callback: function() {
				var pullObj = this;
				ucenter.getUserRelationship(postInfo, function(res) {
					if(res.data) {
						for(i in res.data) {
							var li = addfansData(res.data[i]);
							fansUl.appendChild(li);
						}
						res.data.length < 10 ? pullObj.endPullUpToRefresh(true) : pullObj.endPullUpToRefresh(false);
					} else {
						mui.toast('没有更多数据了..');
						pullObj.endPullUpToRefresh(true)
					}
				})
				postInfo.page++;
			}
		},
		down: {
			callback: function() {
				var pullObj = this;
				postInfo.page = 1;
				fansUl.innerHTML = "";
				ucenter.getUserRelationship(postInfo, function(res) {
					if(res.data) {
						for(i in res.data) {
							var li = addfansData(res.data[i]);
							fansUl.appendChild(li);
						}
						pullObj.endPullDownToRefresh();
						pullObj.refresh();
						res.data.length < 10 ? pullObj.endPullUpToRefresh(true) : pullObj.endPullUpToRefresh(false);
					} else {
						mui.toast('没有更多数据了..');
						pullObj.endPullDownToRefresh();
						pullObj.endPullUpToRefresh(true)
					}
				})
			}
		}
	})
})