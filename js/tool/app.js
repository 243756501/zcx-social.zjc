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

/*
 * 字符串构造函数
 * 微博正文表情解析
 */
String.prototype.parseContent = function() {

	return this.parseExpression();

};

String.prototype.parseExpression = function() {
	var string = this;
	//var content = string.replace(/\[(.+?)\]/g, '<img class="expression_img" data-src="../../images/expression/miniblog/$1.gif" src="../../images/expression/miniblog/$1.gif"/>'); // todo 暂时使用相对路径

	var content = string.replace(/\[(.+?)\]/g, function(find) {
		find = find.replace('[', '').replace(']', '');
		if (find.indexOf(':') == -1) {
			return ' <img class="expression_img" data-src="../../img/expression/miniblog/' + find + '.gif" src="../../images/expression/miniblog/' + find + '.gif"/>';
		} else {
			return '[' + find + ']';
		}
	});
	var url_regex = /(((https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/g;
	if(url_regex.test(content)){
		var tempstr = content.match(url_regex)[0];
		content = content.replace(url_regex,'<diyurl style="color: #008CEE;">'+ tempstr +'</diyurl>');
	}
	return content;

};