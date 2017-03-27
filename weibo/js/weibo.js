var weibo={
	/*
	 * 获取微博列表
	 */
	getWeiboList:function(postInfo,callback){
		var type=postInfo.type || "all";
		var page=postInfo.page || "1";
		var uid=postInfo.uid|| "";
		var ajax=new ajaxRequest();
		ajax.addData('type',type);
		ajax.addData('page',page);
		ajax.addData('uid',uid);
		ajax.request('weibo','GET',function(data){
			callback(data);
		})
	}
}
