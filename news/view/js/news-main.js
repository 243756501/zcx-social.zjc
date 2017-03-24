mui.init();
var postInfo = {};
var addNewsData = function(newsInfo) {
	var li = document.createElement('li');
	li.className = "mui-table-view-cell";
	li.detailInfo = newsInfo;
	li.id = newsInfo.id;
	li.innerHTML = template('newsItem_script', newsInfo);
	return li;
}
mui.plusReady(function() {
	var pullRefreshView = document.getElementsByClassName('mui-scroll')[0];
	apptools.ownactiveStyle("#newsNav a", "newsSlider");
	mui.each(document.querySelectorAll(".mui-slider-group .mui-scroll"), function(index, item) {
		mui(item).pullToRefresh({
			down: {
				callback: function() {
					var pullObj = this;
					var ul = item.getElementsByClassName('mui-table-view')[0];
					var newsId = ul.getAttribute('id');
					ul.setAttribute('page', '2');
					postInfo['id'] = newsId;
					postInfo['page'] = 1;
					news.getNewsList(postInfo, function(res) {
						if(res.data) {
							for(var i in res.data) {
								var li = addNewsData(res.data[i]);
								ul.appendChild(li);
							}
							pullObj.endPullDownToRefresh();
							pullObj.refresh();
							res.data.length < 10 ? pullObj.endPullUpToRefresh(true) : pullObj.endPullUpToRefresh(false);
						}
					})
				}
			},
			up: {
				callback: function() {
					var pullObj = this;
					var ul = item.getElementsByClassName('mui-table-view')[0];
					var newsId = ul.getAttribute('id');
					var newsPage = parseInt(ul.getAttribute('page'));
					postInfo['id'] = newsId;
					postInfo['page'] = newsPage;
					news.getNewsList(postInfo, function(res) {
						if(res.data) {
							for(var i in res.data) {
								var li = addNewsData(res.data[i]);
								ul.appendChild(li);
							}
							res.data.length < 10 ? pullObj.endPullUpToRefresh(true) : pullObj.endPullUpToRefresh(false);
						}
						newsPage++
						ul.setAttribute('page', newsPage);
					});
				}
			}
		});
	});
	mui(document.getElementsByClassName('mui-scroll')[0]).pullToRefresh().pullDownLoading();
	document.querySelector('.mui-slider').addEventListener('slide', function() {
		var index = event.detail.slideNumber;
		var pullRefreshView = document.getElementsByClassName('mui-scroll')[index];
		var ul = mui('.mui-scroll .mui-table-view')[index];
		if(ul.children.length == 0) {
			mui(pullRefreshView).pullToRefresh().pullDownLoading();
		} else {
			return;
		}
	});
	mui('.mui-table-view').on('tap', 'li', function() {
		var id = this.id;
		webtool.openPreView('../../news/view/news-detail', function(wb) {
			var wb2 = plus.webview.getWebviewById('news-detail');
			mui.fire(wb2,'newsId',{
				'id':id
			});
			wb.show('slide-in-right');
		});
	});
})