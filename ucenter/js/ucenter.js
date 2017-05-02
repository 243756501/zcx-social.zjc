var ucenter={
	/*
	 * 通过id来获取用户信息
	 */
	getUserInfo:function(postInfo,callback){
		var uid=postInfo.uid;
		var ajax=new ajaxRequest();
		ajax.request('user/'+uid,'GET',function(res){
			callback(res);
		})
	},
	/*
	 * 获取用户的关系数据
	 * 1为粉丝，2为关注人，3为好友
	 */
	getUserRelationship:function(postInfo,callback){
		var uid;
		app.getUserInfo(function(data){
			uid=data.data_1.uid;
		})
		var type=postInfo.type;
		var page=postInfo.page;
		var ajax=new ajaxRequest();
		ajax.addData('type',type);
		ajax.addData('page',page);
		ajax.request('friends/'+uid,'GET',function(res){
			callback(res);
		})
	},
	
	/*
	 * 获取用户经常会变动的数据
	 */
	getUserConfig:function(callback) {
		var uid;
		app.getUserInfo(function(data){
			uid=data.data_1.uid;
		})
		var ajax = new ajaxRequest();
		ajax.addData('id', uid);
		ajax.request('user_data','GET',function(res) {
			callback(res);
		});
	},
	
	/*
	 * 获取app服务端上的一些配置信息
	 */
	getAppConfig:function(callback){
		var ajax=new ajaxRequest();
		ajax.request('mod_config','GET',function(res){
			callback(res);
		})
	},
	
}
