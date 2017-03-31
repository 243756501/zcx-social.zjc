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
	},
	
	/*
	 * 获取评论列表
	 */
	getWeiboCommentList:function(postInfo,callback){
		var id=postInfo.id;
		var page=postInfo.type || '1';
		var ajax=new ajaxRequest();
		ajax.addData('id',id);
		ajax.addData('page',page);
		ajax.request('weibo_comment','GET',function(data){
			callback(data);
		})
	}
}
