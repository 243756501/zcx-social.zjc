mui.init();
var array = ["mall", "forum", "search", "album", "activity"];
var i = 0;
var listitemShow = function() {
	var timecount = setInterval(function() {
		if(i < array.length) {
			mui('#' + array[i])[0].style.display = "block";
			i++
		} else {
			clearInterval(timecount);
			i = 0;
		}
	}, 800)
}
var listitemHide = function() {
	mui('.mui-table-view-cell').each(function(index, item) {
		item.style.display = "none";
	})
}
var getModuleUrl=function(id){
	switch(id)
	{
		case 'mall':
		return '../../mall/view/mall-main';
		break;
		case 'forum':
		return '../../forum/view/forum-main';
		break;
		case 'search':
		return '../../search/view/search-main';
		break;
		case 'album':
		return '../../album/view/album-main';
		break;
		case 'activity':
		return '../../activity/view/activity-main';
		break;
	}
}

mui.plusReady(function(){
	mui('.mui-table-view').on('tap','li',function(){
		var url=getModuleUrl(this.getAttribute('id'));
		webtool.openPreView(url,function(wb){
			wb.show('fade-in');
		});
	})
})