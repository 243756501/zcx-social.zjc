var album={
	/*
	 * 获取专辑分类
	 */
	getAlbumType:function(callback){
		var ajax=new ajaxRequest();
		ajax.request('issue_type','GET',function(res){
		    callback(res);
		})
	},
	/*
	 * 获取对应分类下的数据
	 */
	getAlbumList:function(postInfo,callback){
		var page=postInfo.page || 1;
		var type=postInfo.type || 0;
		var ajax=new ajaxRequest();
		ajax.addData('page',page);
		//后台默认0获取全部数据
		ajax.request('issue_list/'+type,'GET',function(res){
			callback(res);
		})
	}
}
