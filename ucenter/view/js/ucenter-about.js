mui.init();
var verison = document.getElementById("uaVersion");
var cache = document.getElementById("uaCache");
var clearcache = document.getElementById("uaCacheLi");
var downDict;
//
document.getElementById("QQLi").addEventListener('tap', function() {
	console.log(plus.os.name);
	if(mui.os.ios) {
		// 导入UIWebview、NSURLRequest、NSURL类
		var Webview = plus.ios.importClass("UIWebview");
		var NSURLRequest = plus.ios.import('NSURLRequest');
		var NSURL = plus.ios.import('NSURL');
		// 获取当前Webview对象的实例
		var wv = plus.ios.currentWebview();
		// 创建请求对象
		var req = NSURLRequest.requestWithURL(NSURL.URLWithString('mqq://im/chat?chat_type=wpa&uin=243756501&version=1&src_type=web'));
		// 跳转页面
		plus.ios.invoke(wv, "loadRequest:", req);
	} else {
		var Intent = plus.android.importClass("android.content.Intent");
		var Uri = plus.android.importClass("android.net.Uri");
		var url = Uri.parse('mqqwpa://im/chat?chat_type=wpa&uin=243756501&site=qq&menu=yes');
		var intent = new Intent(Intent.ACTION_VIEW, url);
		var main = plus.android.runtimeMainActivity();
		main.startActivity(intent);
	}
})
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