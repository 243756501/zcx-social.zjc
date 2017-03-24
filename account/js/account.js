var account = {
	/*
	 * 登录验证
	 */
	login:function(accountInfo,callback){
		var ajax=new ajaxRequest();
		ajax.addData('username',accountInfo.usr);
		ajax.addData('password',accountInfo.pwd);
		ajax.request('authorization','POST',function(res){
			callback(res);
		});
	},

}