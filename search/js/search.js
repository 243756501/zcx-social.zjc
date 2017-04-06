var search={
	/*
	 * 获取所有的好友信息
	 */
	getAllFridents:function(postInfo,callback){
		var keywords=postInfo.keywords || "";
		var rolelist=postInfo.rolelist || "";
		var ajax=new ajaxRequest();
		ajax.addData('role',rolelist);
		ajax.addData('keywords',keywords);
		ajax.request('people_list','GET',function(res){
			callback(res);
		})
	}
}
