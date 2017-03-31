mui.init({
	beforeback:function(){
		postInfo.page=1;
		apptools.changePage(loading,weibodeBody,true);
	}
});
var weibodeBody = document.getElementById("weibo_scroll");
var weiboComList,weiboContent,noComment,getCommentBtn;
var loading=document.getElementById("loading_page");
var addWeiboInfo = function(data, callback) {
	var html = parse_weibo_html(data,'weibo_detail_script');
	weibodeBody.innerHTML = html;
	callback();
};
var getWeiboCommentLi=function(data){
	var li=document.createElement('li');
	li.className="mui-table-view-cell";
	var commentHTML=template.compile(weibo_comment);
	var html=commentHTML(data);
	li.innerHTML=html;
	return li;
}
var addWeiboComment = function(postInfo) {
	weibo.getWeiboCommentList(postInfo, function(res) {
		if(res.data) {
            for(var i in res.data)
            {
            	var li=getWeiboCommentLi(res.data[i]);
            	weiboComList.appendChild(li);
            }
			res.data.length ? apptools.changePage(noComment, getCommentBtn, false) : apptools.changePage(noComment, getCommentBtn, true);
		} else {
			apptools.changePage(noComment, getCommentBtn, true);
		}
		apptools.changePage(loading,weibodeBody,false);
	})
}
var postInfo = {
	'page': 1,
}
window.addEventListener('weiboInfo', function(e) {
	var weiboInfo = e.detail.weiboInfo;
	postInfo.id = weiboInfo.id;
	addWeiboInfo(weiboInfo, function(e) {
		weiboComList = document.getElementById("weiboCommentUl");
		noComment = document.getElementById("noComment");
		getCommentBtn = document.getElementById("getCommentBtn");
		weiboContent=document.getElementById("weiboContent");
		addWeiboComment(postInfo);
	})
});
mui.plusReady(function() {

});