			mui.init();
			var postInfo = { 'page': 1 };
			var activityUl = document.getElementById("activityUl");
			var addActivityList = function(data) {
				var li = document.createElement('li');
				li.className = "mui-table-view-cell";
				data.explain = imgTools.getDtlContent(data.explain);
				li.innerHTML = template('activity_item_script', data);
				mui(li.getElementsByClassName('activity-li-middle'))[0].innerHTML = data.explain;
				return li;
			}
			mui.plusReady(function() {
				mui('.mui-scroll').pullToRefresh({
					up: {
						auto: true,
						callback: function() {
							var pullObj = this;
							activity.getActivityList(postInfo, function(res) {
								if(res.data) {
									for(i in res.data) {
										var li = addActivityList(res.data[i]);
										activityUl.appendChild(li);
									}
									res.data.length < 10 ? pullObj.endPullUpToRefresh(true) : pullObj.endPullUpToRefresh(false);
								} else {
									pullObj.endPullUpToRefresh(true);
								}
							})
							postInfo.page++;
						}
					},
					down: {
						callback: function() {
							var pullObj = this;
							postInfo.page = 1;
							activityUl.innerHTML = "";
							activity.getActivityList(postInfo, function(res) {
								if(res.data) {
									for(i in res.data) {
										var li = addActivityList(res.data[i]);
										activityUl.appendChild(li);
									}
									pullObj.endPullDownToRefresh();
									res.data.length < 10 ? pullObj.endPullUpToRefresh(true) : pullObj.endPullUpToRefresh(false);
								} else {
									pullObj.endPullDownToRefresh();
									pullObj.endPullUpToRefresh(true);
								}
							})
						}
					}
				})

				mui('.mui-table-view').on('tap', '.activity-buttom', function() {
					var type = this.id;
					switch(type) {
						case 'endBtn':
							mui.toast('活动已经结束！');
							break;
						case 'joinBtn':
							break;
						case 'cancelBtn':
							break;
					}
				})
			})