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
		ajax.addData('page',page);
		ajax.request('weibo_comment/'+id,'GET',function(data){
			callback(data);
		})
	},
	
	/*
	 * 发布微博
	 */
	sendWeibo:function(postInfo,callback){
		var content=postInfo.content;
		var phonetype=postInfo.phonetype;
		var type=postInfo.type;//目前只支持文字
		var open_id;
		app.getUserInfo(function(res){
			open_id=res.data.open_id;
		})
		var ajax=new ajaxRequest();
		ajax.addData('content',content);
		ajax.addData('from',phonetype);
		ajax.addData('type',type);
		ajax.addData('open_id',open_id);
		ajax.request('weibo','POST',function(data){
			callback(data);
		})
	},
	
	/*
	 * 微博评论
	 */
	sendWeiboComment:function(postInfo,callback){
		var content=postInfo.content || "";
		var weibo_id=postInfo.id;
		var to_comment_id=postInfo.toId || "";
		var open_id;
		app.getUserInfo(function(res){
			open_id=res.data.open_id;
		})
		var ajax=new ajaxRequest();
		ajax.addData('content',content);
		ajax.addData('weibo_id',weibo_id);
		ajax.addData('to_comment_id',to_comment_id);
		ajax.addData('open_id',open_id);
		ajax.request('weibo_comment','POST',function(res){
			callback(res);
		})
	},
}
