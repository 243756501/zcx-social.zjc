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
	},
	/*
	 * 获取问答详情
	 */
	getQuestionDtl:function(postInfo,callback){
		var ajax=new ajaxRequest();
		ajax.addData('id',postInfo.id);
		ajax.request('question_detail','GET',function(res){
			callback(res);
		})
	},
	/*
	 * 获取答案列表
	 */
	getQuestionAnswer:function(postInfo,callback){
		var ajax=new ajaxRequest();
		ajax.addData('id',postInfo.id);
		ajax.request('answer_list','GET',function(res){
			callback(res);
		})
	},
	/*
	 * 回答
	 */
	answerQuestion:function(postInfo,callback){
		var open_id;
		app.getUserInfo(function(res){
			open_id=res.data.open_id;
		});
		var ajax=new ajaxRequest();
		ajax.addData('open_id',open_id);
		ajax.addData('content',postInfo.content);
		ajax.addData('question_id',postInfo.question_id);
		ajax.request('answer','POST',function(res){
			callback(res);
		});
	}
}
