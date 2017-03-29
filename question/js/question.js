var question={
	/*
	 * 获取问答列表
	 */
	getQuestionList:function(postInfo,callback){
		var type=postInfo.type;
		var page=postInfo.page || "1";
		var ajax=new ajaxRequest();
		ajax.addData('type',type);
		ajax.addData('page',page);
		ajax.request('question_list','GET',function(res){
			callback(res);
		})
	},
}
