var app={
	/*
	 * 用户登录时保存用户信息
	 */
	saveUser:function(userInfo)
	{
		console.log(userInfo)
		localStorage.setItem('user_info',userInfo);
	},
	/*
	 * 获取用户信息
	 */
	getUserInfo:function(callback)
	{
		console.log(JSON.parse(localStorage.getItem('user_info')))
		callback(JSON.parse(localStorage.getItem('user_info')));
	},
	
	/*
	 * 判断用户是否登录
	 */
	isLogin:function()
	{
		var userInfo=localStorage.getItem('user_info');
		if(!userInfo)
		{
			return false;
		}
		else
		{
			return true;
		}
	}
}

