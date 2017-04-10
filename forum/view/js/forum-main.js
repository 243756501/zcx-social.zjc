mui.init();
var mf = document.createDocumentFragment();
var postInfo = {}
var addForumDataList = function(data) {
	var li = document.createElement('li');
	li.className = "forum-slider-item mui-table-view-cell";
	li.id = data.id;
	li.innerHTML = template('forum_item_script', data);
	return li;
}
mui.plusReady(function() {
	mui.each(document.querySelectorAll('.mui-scroll'), function(index, item) {
		mui(item).pullToRefresh({
			up: {
				auto: true,
				callback: function() {
					var pullObj = this;
					var ul = item.getElementsByClassName('mui-table-view')[0];
					postInfo.type = ul.getAttribute('type');
					var postpage = parseInt(ul.getAttribute('data-page')) + 1;
					postInfo.page = postpage;
					ul.setAttribute('data-page', postpage);
					forum.getForumList(postInfo, function(res) {
						var datalen = res.data.length;
						if(res.data) {
							for(var i in res.data) {
								var li = addForumDataList(res.data[i]);
								mf.appendChild(li);
							}
							ul.appendChild(mf);
							datalen < 10 ? pullObj.endPullUpToRefresh(true) : pullObj.endPullUpToRefresh(false);
						} else {
							pullObj.endPullUpToRefresh(true);
							mui.toast(res.info);
						}
					})
				}
			},
			down: {
				callback: function() {
					var pullObj = this;
					var ul = item.getElementsByClassName('mui-table-view')[0];
					ul.innerHTML = "";
					postInfo.type = ul.getAttribute('type');
					postInfo.page = 1;
					ul.setAttribute('data-page', 1);
					forum.getForumList(postInfo, function(res) {
						var datalen = res.data.length;
						if(res.data) {
							for(var i in res.data) {
								var li = addForumDataList(res.data[i]);
								mf.appendChild(li);
							}
							ul.appendChild(mf);
							pullObj.endPullDownToRefresh(true);
							pullObj.refresh();
							datalen < 10 ? pullObj.endPullUpToRefresh(true) : pullObj.endPullUpToRefresh(false);
						} else {
							pullObj.endPullUpToRefresh(true);
							mui.toast(res.info);
						}
					})
				}
			}
		})
	})
})