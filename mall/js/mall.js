var mall={
	getGoodsList:function(postInfo,callback){
		var page=postInfo.page || "1";
		var id=postInfo.id || "";
		var ajax=new ajaxRequest();
		ajax.addData('page',page);
		ajax.addData('id',id);
		ajax.request('shop_goods_list','GET',function(res){
			callback(res);
		})
	}
}
