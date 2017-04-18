mui.init();
var verison = document.getElementById("uaVersion");
var cache = document.getElementById("uaCache");
var clearcache = document.getElementById("uaCacheLi");
var downDict;
mui.plusReady(function() {
	plus.runtime.getProperty(plus.runtime.appid, function(inf) {
		var currentVersionss = inf.version; //获取当前版本号
		verison.innerHTML = currentVersionss;
	});
	plus.io.requestFileSystem(plus.io.PUBLIC_DOWNLOADS, function(fs) {
		downDict = fs.root;
		downDict.getMetadata(function(metadata) {
			cache.innerHTML = parseInt(metadata.size / (1024 * 1024)) + 'M';
		}, function(e) {}, true);
	}, function(e) {
		alert("Request file system failed: " + e.message);
	});
	clearcache.addEventListener('tap', function() {
		var bts = ["取消", "清除"];
		plus.nativeUI.confirm("清除缓存数据？", function(e) {
			if(e.index == 1) {
				//执行删除操作
				downDict.removeRecursively(function(suc) {
					cache.innerHTML = "0M";
					mui.toast('清除成功!');
				}, function(err) {
					mui.toast('没有缓存数据');
				});
			}
		}, "提示信息", bts);
	})
	webtool.backQuit();
})