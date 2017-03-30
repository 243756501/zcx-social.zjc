mui.init({
	beforeback: function() {
		main.innerHTML = "";
		apptools.changePage(main, loading, false);
	}
});
var main = document.getElementById("goods_detail");
var loading = document.getElementById("loading_page");
var addData = function(data, callback) {
	main.innerHTML = template('goods_detail_script', data);
	var tmpContent = imgTools.getDtlContent(data.goods_detail);
	document.getElementById("tmpContent").innerHTML = tmpContent;
	callback(true);
}
window.addEventListener('goodsInfo', function(e) {
	var dataInfo = e.detail.goodsInfo;
	addData(dataInfo, function(res) {
		apptools.changePage(main, loading, true);
	})
})