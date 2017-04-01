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
	/*
	 * 发布问题
	 */
	askQuestion:function(postInfo,callback){
		var open_id;
		app.getUserInfo(function(res){
			open_id=res.data.open_id;
		});
		var description=postInfo.description;
		var score_num=postInfo.score_num;
		var title=postInfo.title;
		var ajax=new ajaxRequest();
		ajax.addData('open_id',open_id);
		ajax.addData('description',description);
		ajax.addData('score_num',score_num);
		ajax.addData('title',title);
		ajax.request('question','POST',function(res){
			callback(res);
		})
	}
}
