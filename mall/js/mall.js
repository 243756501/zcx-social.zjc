var mall={
	/*
	 * 获取商品列表
	 */
	getGoodsList:function(postInfo,callback){
		var page=postInfo.page || "1";
		var id=postInfo.id || "";
		var ajax=new ajaxRequest();
		ajax.addData('page',page);
		ajax.addData('id',id);
		ajax.request('shop_goods_list','GET',function(res){
			callback(res);
		})
	},
	/*
	 * 请求兑换商品
	 */
	exchangeGoods:function(postInfo,callback){
		var open_id;
		app.getUserInfo(function(res){
			open_id=res.data.open_id;
		})
		var ajax=new ajaxRequest();
		ajax.addData('open_id',open_id);
		ajax.addData('id',postInfo.id);
		ajax.addData('address',postInfo.address);
		ajax.addData('zipcode',postInfo.zipcode);
		ajax.addData('name',postInfo.name);
		ajax.addData('phone',postInfo.phone);
		ajax.request('shop_consignee','POST',function(res){
			alert(JSON.stringify(res));
			callback(res);
		});
	},
	/*
	 *拉取我的积分数
	 * 这个方法获取信息都是一些频繁变动的用户信息
	 */
	getUserData:function(postInfo,callback){
		var ajax=new ajaxRequest();
		ajax.addData('id',postInfo.id);
		ajax.request('user_data','GET',function(res){
			callback(res);
		})
	}
}
