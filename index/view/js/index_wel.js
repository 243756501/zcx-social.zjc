mui.init();
var dom = {
	okBtn: mui('#okBtn')[0],
	first:mui('#first')[0],
	second: mui('#second')[0],
	third:mui('#third')[0]
}
var initEvent = function() {
	document.querySelector('.mui-slider').addEventListener('slide', function(event) {
		if(event.detail.slideNumber==1)
		{
			apptools.showHide(dom.second,true);	
		}
		else if(event.detail.slideNumber==2)
		{
		   	apptools.showHide(dom.third,true);
		}
	});
	dom.okBtn.addEventListener('tap', function() {
        webtool.openPreView('index_main',function(wb){
        	wb.show('slide-in-right');
        })
	});
}

mui.plusReady(function() {
	//因为欢迎页面设置了3000毫秒的延迟，但是这个页面是先加载的
	setTimeout(function(){
		apptools.showHide(dom.first,true);
	},8000)
	initEvent();
	
});