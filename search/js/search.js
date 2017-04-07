var search={
	/*
	 * 获取所有的好友信息
	 */
	getAllFridents:function(postInfo,callback){
		var keywords=postInfo.keywords || "";
		var rolelist=postInfo.rolelist || "";
		var page=postInfo.page || "";
		var ajax=new ajaxRequest();
		ajax.addData('role',rolelist);
		ajax.addData('keywords',keywords);
		ajax.addData('page',page);
		ajax.request('people_list','GET',function(res){
			callback(res);
		})
	},
	/*
	 * 关注/取消关注用户
	 */
	followUser:function(postInfo,callback){
		var open_id;
		app.getUserInfo(function(res){
            open_id=res.data.open_id;
		})
		var follow_who=postInfo.follow_who;
		var ajax=new ajaxRequest();
		ajax.addData('follow_who',follow_who);
		ajax.addData('open_id',open_id)
		ajax.request('follow',postInfo.method,function(res){
			callback(res);
		})
	}
}
