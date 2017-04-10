var ucenter={
	/*
	 * 通过id来获取用户信息
	 */
	getUserInfo:function(postInfo,callback){
		var uid=postInfo.uid;
		var ajax=new ajaxRequest();
		ajax.request('user/'+uid,'POST',function(res){
			callback(res);
		})
	}
}
