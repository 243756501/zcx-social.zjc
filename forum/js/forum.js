var forum={
	/*
	 * 获取帖子列表
	 */
	getForumList:function(postInfo,callback){
		var order=postInfo.order || "";
		var page=postInfo.page || "";
		var ajax=new ajaxRequest();
		ajax.addData('order',order);
		ajax.addData('page',page);
		ajax.request('forum_post','GET',function(res){
			callback(res);
		})
	}
}
