var news={
	/*
	 * 获取资讯列表
	 */
	getNewsList:function(data,callback){
		var newsId=data.id || '';
		var newsPage=data.page || '';
		var ajax=new ajaxRequest();
		ajax.addData('id',newsId);
		ajax.addData('page',newsPage);
		ajax.request('news','GET',function(res){
			callback(res);
		})
	},
	
	/*
	 * 获取资讯详情
	 */
	getNewsDetail:function(data,callback){
		var newsId=data.id;
		var ajax=new ajaxRequest();
		ajax.request('news_Detail/'+newsId,'GET',function(res){
			callback(res);
		});
	},
	
	/*
	 * 获取评论列表
	 */
	getNewsComment:function(data,callback){
		var newsId=data.id;
		var ajax=new ajaxRequest();
		ajax.request('news_Comment/'+newsId,'GET',function(res){
			callback(res);
		});
	}
	
}
