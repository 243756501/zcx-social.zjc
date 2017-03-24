mui.init({
	beforeback:function(){
		commentList.innerHTML="";
		apptools.changePage(mainPage,loadPage,false);
		mui('.mui-scroll-wrapper').scroll().scrollTo(0,0);
	}
});
var commentList=document.getElementById("newsComment_ul");
var mainPage=document.getElementById("main_page");
var loadPage=document.getElementById("loading_page");
var addNewsInfo=function(data,callback){
	document.getElementById("newsInfo").innerHTML=template('newsDetail_script',data);
	callback(data);
};
var addNewsComment=function(data){
	var li=document.createElement('li');
	li.className="news-comment-li mui-table-view-cell";
	li.innerHTML=template('newsComment_script',data);
	return li;
};
mui.plusReady(function(){
	mui.previewImage();
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005
	});
	window.addEventListener('newsId',function(e){
		var newsId=e.detail.id;
		var postInfo={
			'id':newsId
		}
		if(newsId)
		{
			news.getNewsDetail(postInfo,function(res){
				if(res.data)
				{				
     				addNewsInfo(res.data,function(data){
     					document.getElementById("newsContent").innerHTML=imgTools.getDtlContent(data.content);
     				});
     				apptools.changePage(mainPage,loadPage,true);
				}
				else
				{
					mui.toast(res.info);
				}
			})
			news.getNewsComment(postInfo,function(res){
				if(res.data)
				{
					for(var i in res.data)
					{
						var li=addNewsComment(res.data[i]);
						commentList.appendChild(li);
					}
				}
				else
				{
					commentList.innerHTML="<div class='no-comment'><span>暂无更多评论</span></div>"
				}
			})
		}
	});
});