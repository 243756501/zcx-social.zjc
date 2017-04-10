var activity={
	/*
	 * 获取活动列表
	 */
	getActivityList:function(postInfo,callback){
		var page=postInfo.page;
		var open_id;
		app.getUserInfo(function(res){
			open_id=res.data.open_id;
		})
		var ajax=new ajaxRequest();
		ajax.addData('page',page);
		ajax.addData('open_id',open_id);
		ajax.request('event_list','GET',function(res){
			callback(res);
		})
	}
}
