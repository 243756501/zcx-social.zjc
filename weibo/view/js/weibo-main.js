mui.init();
var dom = {
	titleOn: mui('#titleOn')[0],
	titleOff: mui('#titleOff')[0],
	weiboUl: mui('#weiboUl')[0]
}
var postInfo = {
	type: "all",
	page: 1
}
var tool = {
	/*
	 * 获取单个微博LI
	 */
	get_weibo_li: function(weibo, is_index) {
		var li = document.createElement('li');
		li.className = 'weibo-item mui-table-view-cell';
		li.setAttribute('id', 'weibo_' + weibo.id);
		li.setAttribute('data-type', 'weibo');
		weibo.create_time = apptools.fmtUnixTime(weibo.create_time, true);
		li.detail_info = weibo;
		weibo.is_weibo_main = is_index || false;
		var html = parse_weibo_html(weibo);
		li.innerHTML = html;
		return li;
	},
}
mui.plusReady(function() {
	window.addEventListener('userchange', function(e) {
		var userInfo = e.detail.userInfo;
		if(userInfo) {
			titleUser.innerHTML = userInfo.data_1.nickname;
			apptools.changePage(dom.titleOn, dom.titleOff, true);
		}
	});

	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.005
	});
	mui('.mui-content .mui-scroll').pullToRefresh({
		up: {
			callback: function() {
				var pullObj = this;
				postInfo.page++;
				weibo.getWeiboList(postInfo, function(res) {
					if(res.data) {
						for(var i in res.data) {
							var li = tool.get_weibo_li(res.data[i], true);
							dom.weiboUl.appendChild(li);
						}
						res.data.length < 10 ? pullObj.endPullUpToRefresh(true) : pullObj.endPullUpToRefresh(false);
					} else {
						mui.toast(res.info)
					}
				})
			}
		},
		down: {
			callback: function() {
				var pullObj = this;
				postInfo.page = 1;
				dom.weiboUl.innerHTML="";
				weibo.getWeiboList(postInfo, function(res) {
					if(res.data) {
						for(var i in res.data) {
							var li = tool.get_weibo_li(res.data[i], true);
							dom.weiboUl.appendChild(li);
						}
						pullObj.endPullDownToRefresh();
						pullObj.refresh();
						res.data.length < 10 ? pullObj.endPullUpToRefresh(true) : pullObj.endPullUpToRefresh(false);
					} else {
						mui.toast(res.info)
					}
				})
			}
		}		
	});
	mui('.mui-content .mui-scroll').pullToRefresh().pullDownLoading();
});