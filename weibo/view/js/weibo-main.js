mui.init();
var dom = {
	titleOn: mui('#titleOn')[0],
	titleOff: mui('#titleOff')[0],
	weiboUl: mui('#weiboUl')[0],
	TypeChoose: mui('#weiboType_choose')[0],
	titleArrow: mui('#titleArrow')[0],
	titleKey: true,
}
var mask = mui.createMask(function() {
	return dom.titleKey;
}); //callback为用户点击蒙版时自动执行的回调；
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
	titleTap: function(boolean) {
		if(boolean) {
			dom.titleKey = !boolean;
			dom.titleArrow.setAttribute('class', 'mui-icon mui-icon-arrowup');
			apptools.showHide(dom.TypeChoose, true);
			mask.show();
		} else {
			dom.titleKey = !boolean;
			dom.titleArrow.setAttribute('class', 'mui-icon mui-icon-arrowdown');
			apptools.showHide(dom.TypeChoose, false);
			mask.close();
		}
	},
	changeTypeColor: function(type) {
		mui.each(document.querySelectorAll('.weibo-type-item-font'), function(index, item) {
			var objClass = item.className;
			if(objClass.indexOf('weibo-type-active')) {
				item.className = "weibo-type-item-font";
			}
		})
		mui('#title_' + type)[0].className = "weibo-type-item-font weibo-type-active";
		mui.trigger(dom.titleOn, 'tap');
	}
}
var initEvent = function() {
	//监听用户更改
	window.addEventListener('userchange', function(e) {
		var userInfo = e.detail.userInfo;
		if(userInfo) {
			titleUser.innerHTML = userInfo.data_1.nickname;
			apptools.changePage(dom.titleOn, dom.titleOff, true);
		}
	});
	//头部微博
	dom.titleOn.addEventListener('tap', function() {
		tool.titleTap(dom.titleKey);
	});
	//监听微博类型选择事件
	mui('#weiboType_choose').on('tap', '.weibo-type-item', function() {
		var type = this.getAttribute('id');
		dom.weiboUl.innerHTML = "";
		if(type == "user") {
			app.getUserInfo(function(userInfo) {
				var uid=userInfo.data_1.uid;
				postInfo.type="user";
				postInfo.uid=uid;
				postInfo.page=1;
			})
		}
		else
		{   
			postInfo.type=type;
			postInfo.page=1;
		}
		tool.changeTypeColor(type);
		mui('.mui-content .mui-scroll').pullToRefresh().pullDownLoading();
		
	});
}
mui.plusReady(function() {
	initEvent();
	mui.previewImage();
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
						mui.toast(res.info);
						pullObj.endPullUpToRefresh(true)
					}
				})
			}
		},
		down: {
			callback: function() {
				var pullObj = this;
				postInfo.page = 1;
				dom.weiboUl.innerHTML = "";
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
						mui.toast(res.info);
						pullObj.endPullDownToRefresh();
						pullObj.endPullUpToRefresh(true)
					}
				})
			}
		}
	});
	mui('.mui-content .mui-scroll').pullToRefresh().pullDownLoading();
	mui('#weiboUl').on('tap','li',function(){
		var weiboInfo=this.detail_info;
		webtool.openPreView('weibo-detail',function(wb){
			mui.fire(wb,'weiboInfo',{
				'weiboInfo': weiboInfo
			})
			wb.show();
		})
	})
});