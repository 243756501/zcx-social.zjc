	mui.init();
	var postInfo = {
		page: 1
	}
	var addGoodsList = function(data) {
		var li = document.createElement('li');
		li.id = data.id;
		li.detail_info=data;
		li.className = "mui-table-view-cell";
		li.innerHTML = template('hot_product_script', data);
		return li;
	}
	mui.plusReady(function() {
		var mallList = document.getElementById("mall_goodlist");
		mui('.mui-slider').slider({
			interval: 3000
		})
		mui('.mui-scroll').pullToRefresh({
			up: {
				auto: true,
				callback: function() {
					var pullObj = this;
					mall.getGoodsList(postInfo, function(res) {
						if(res.data) {
							for(var i in res.data) {
								var li = addGoodsList(res.data[i]);
								mallList.appendChild(li);
								postInfo.page++;
								res.data.length < 10 ? pullObj.endPullUpToRefresh(true) : pullObj.endPullDownToRefresh(false);
							}
						} else {
							pullObj.endPullUpToRefresh(true);
						}
					})
				}
			},
			down: {
				callback: function() {
					var pullObj = this;
					postInfo.page = 1
					mallList.innerHTML = "";
					mall.getGoodsList(postInfo, function(res) {
						if(res.data) {
							for(var i in res.data) {
								var li = addGoodsList(res.data[i]);
								mallList.appendChild(li);
								pullObj.endPullDownToRefresh();
								pullObj.refresh();
								res.data.length < 10 ? pullObj.endPullUpToRefresh(true) : pullObj.endPullDownToRefresh(false);
							}
						} else {
							pullObj.endPullUpToRefresh(true);
						}
					})
				}
			}
		})
		mui('.mui-table-view').on('tap','li',function(){
			var goods=this.detail_info;
			webtool.openPreView('mall-goods-detail',function(wb){
				mui.fire(wb,'goodsInfo',{
					'goodsInfo':goods
				})
				wb.show();
			})
		})
		mui('.mall-product-type').on('tap','div',function(){
			webtool.openPreView('mall-goods-list',function(wb){
				wb.show();
			})
		})
	})