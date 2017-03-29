	mui.init();
	var postInfo = {
		'page': 1,
		'type': 'wait'
	}
	mui.each(document.querySelectorAll('.mui-scroll'), function(index, item) {
		mui(item).pullToRefresh({
			up: {
				callback: function() {
					var pullObj = this;
					var ul = item.getElementsByClassName('mui-table-view')[0];
					postInfo.page = parseInt(ul.getAttribute('data-page')) + 1;
					postInfo.type = ul.getAttribute('id');
					console.log(postInfo.page)
					question.getQuestionList(postInfo, function(res) {
						if(res.data) {
							for(var i in res.data) {
								var li = get_question_li(res.data[i]);
								ul.appendChild(li);
								res.data.length < 10 ? pullObj.endPullUpToRefresh(true) : pullObj.endPullUpToRefresh(false);
							}
						} else {
							pullObj.endPullUpToRefresh(true)
						}
					})
					ul.setAttribute('data-page', postInfo.page);
				}
			},
			down: {
				callback: function() {
					var pullObj = this;
					var ul = item.getElementsByClassName('mui-table-view')[0];
					postInfo.page = 1;
					postInfo.type = ul.getAttribute('id');
					question.getQuestionList(postInfo, function(res) {
						if(res.data) {
							for(var i in res.data) {
								var li = get_question_li(res.data[i]);
								ul.appendChild(li);
								pullObj.endPullDownToRefresh();
								pullObj.refresh();
								res.data.length < 10 ? pullObj.endPullUpToRefresh(true) : pullObj.endPullUpToRefresh(false);
							}
						} else {
							pullObj.endPullDownToRefresh(true)
						}
					})
					ul.setAttribute('data-page', 1);
				}
			}
		})
	})
	mui(mui('.mui-scroll')[0]).pullToRefresh().pullUpLoading();
	mui.plusReady(function() {
		
		mui('.mui-slider')[0].addEventListener('slide', function() {
			var index = event.detail.slideNumber;
			mui(mui('.mui-scroll')[index]).pullToRefresh().pullDownLoading();
		})
	})