mui.init({
	beforeback: function() {
		main.innerHTML = "";
		apptools.changePage(main, loading, false);
	}
});
var main = document.getElementById("goods_detail");
var loading = document.getElementById("loading_page");
var scoreContainer = document.getElementById("scoreContainer");
var scoreNum = document.getElementById("myscore");
var addData = function(data, callback) {
	main.innerHTML = template('goods_detail_script', data);
	var tmpContent = imgTools.getDtlContent(data.goods_detail);
	document.getElementById("tmpContent").innerHTML = tmpContent;
	callback(true);
};
var postInfo = {}
var showMineScore = function() {
	app.getUserInfo(function(res) {
		postInfo.id = res.data_1.uid;
	})
	mall.getUserData(postInfo, function(res) {
		if(res.data) {
			scoreNum.innerHTML = res.data.score8;
			scoreContainer.style.display = "block";
		}
	});
};
window.addEventListener('goodsInfo', function(e) {
	var dataInfo = e.detail.goodsInfo;
	if(!app.isLogin()) {
		mui.toast('登录后才能才能兑换对应商品哦');
		scoreContainer.style.display = "none";
	} else {
		showMineScore();
	}
	addData(dataInfo, function(res) {
		apptools.changePage(main, loading, true);
		var exchbtn = document.getElementById("exchBtn");
		var costScore=document.getElementById("costScore").innerHTML;
		exchbtn.addEventListener('tap', function() {
			if(!app.isLogin()) {
				mui.toast('您未登录！');
				return;
			}
			if(parseInt(costScore) > parseInt(scoreNum.innerHTML))
			{
				alert('您的积分不足！');
				return;
			}
			webtool.openPreView('../../mall/view/mall-exch', function(wb) {
				mui.fire(wb, 'mall-exch', {
					'data': dataInfo
				});
				wb.show('pop-in');
			})
		})
	})
});