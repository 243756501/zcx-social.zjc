mui.init();
var postInfo = {
	'page': 0
};
var followInfo={
}
var peopleList = document.getElementById("peopleList");
var searchBtn = document.getElementById("searchBtn");
var searchText = document.getElementById("searchText");
var isSearch = false;
var addpeopleList = function(data) {
	var li = document.createElement('li');
	li.className = "mui-table-view-cell";
	li.innerHTML = parse_people_html(data, userItem);
	li.uid=data.uid;
	li.is_following=data.is_following;
	return li;
}
mui.plusReady(function() {
	mui('.mui-scroll').pullToRefresh({
		up: {
			auto: true,
			callback: function() {
				postInfo.page++;
				var pullObj = this;
				search.getAllFridents(postInfo, function(res) {
					if(res.data) {
						for(i in res.data) {
							var li = addpeopleList(res.data[i]);
							peopleList.appendChild(li);
							res.data.length < 10 ? pullObj.endPullUpToRefresh(true) : pullObj.endPullUpToRefresh(false);
						}
					} else {
						mui.toast(res.info)
						pullObj.endPullUpToRefresh(true);
					}
				})
			}
		},
		down: {
			callback: function() {
				peopleList.innerHTML = "";
				var pullObj = this;
				postInfo.page = "";
				if(!isSearch) {
					postInfo.keywords = "";
				}
				search.getAllFridents(postInfo, function(res) {
					if(res.data) {
						for(i in res.data) {
							var li = addpeopleList(res.data[i]);
							peopleList.appendChild(li);
							pullObj.endPullDownToRefresh(true);
							pullObj.refresh();
							res.data.length < 10 ? pullObj.endPullUpToRefresh(true) : pullObj.endPullUpToRefresh(false);
						}
					} else {
						mui.toast(res.info);
						pullObj.endPullDownToRefresh(true);
						pullObj.endPullUpToRefresh(true);
					}
				})
				isSearch = false;
			}
		}
	})
	searchBtn.addEventListener('tap', function() {
		postInfo.keywords = searchText.value;
		isSearch = true;
		mui('.mui-scroll').pullToRefresh().pullDownLoading();
	})
	mui('#peopleList').on('tap','li',function(){
		var self=this;
		if(!app.isLogin())
		{
			mui.toast('登录后操作');
			return;
		}
		this.is_following ? followInfo.method='DELETE' : followInfo.method='POST';
		followInfo.follow_who=this.uid;
		search.followUser(followInfo,function(res){
			if(res.code==200)
			{
				self.getElementsByClassName('li-btn')[0].firstChild.setAttribute('class','icon-user-check');
				mui.toast(res.info);
			}
			else
			{
				mui.toast('您已经关注了！');
			}
		})
	})
})