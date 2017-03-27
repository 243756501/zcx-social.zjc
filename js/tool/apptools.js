//app工具方法
var first = false; //返回键初值
var apptools = {
	/*
	 * 自定义的active样式
	 * @param{dom_obj,dom_id} 对象dom对象    滑动对象id
	 */
	ownactiveStyle: function(dom, slide) {
		mui(dom).each(function(index) {
			//监听状态
			var active = this.className;
			//初始状态
			if(index == 0) {
				if(active == 'mui-control-item mui-active') {
					this.style.cssText = "border-bottom: 2px solid #F0AD4E;color:#F0AD4E";
					return;
				}
			}
		})
		document.getElementById(slide).addEventListener('slide', function() {
			setTimeout(function() {
				mui(dom).each(function(index) {
					var active = this.className;
					//判断如果是激活的状态
					if(active == 'mui-control-item mui-active') {
						this.style.cssText = "border-bottom: 2px solid #F0AD4E;color:#F0AD4E";
					} else {
						this.style.cssText = "border-bottom: 2px solid #FFFFFF;color:color: #808080"
					}
				})
			}, 1)

		})
	},
	/*
	 * 两个dom的显示&隐藏
	 * @param{obj,obj,boolean}
	 */
	changePage: function(showObj, hideObj, key) {
		if(key) {
			showObj.style.display = "block";
			hideObj.style.display = "none";
		} else {
			showObj.style.display = "none";
			hideObj.style.display = "block";
		}
	},
	/*
	 * 单个dom的显示&隐藏
	 * @param{obj,boolean}
	 */
	showHide: function(targetdom, key) {
		key == true ? targetdom.style.display = "block" : targetdom.style.display = "none";
	},
	/*
	 * 重写返回键
	 */
	backQuit: function() {
		mui.back = function() {
			//首次按键，提示'再按一次退出程序'
			if(!first) {
				first = new Date().getTime();
				mui.toast('再按一次退出应用');
				setTimeout(function() {
					first = false;
				}, 1000);

			} else {
				if(new Date().getTime() - first < 1000) {
					plus.runtime.quit();
				}
			}
		}
	},
	/*删除指定文件*/
	delFile: function(locaPath, callback) {
		callback = callback || mui.noop;
		plus.io.resolveLocalFileSystemURL(locaPath, function(entry) {
			entry.remove(function(entry) {
				callback(1);
			}, function(e) {
				callback(0);
			});
		});
	},
	/**
	 * 时间戳友好解析
	 * @param {Object} sTime
	 */
	friendlyDate:function(sTime){
	    if(!sTime)return '';
	    if(sTime.toString().length > 10)sTime = sTime/1000;
	    
	    var myDate = new Date(sTime*1000);
	    var myHours = myDate.getHours();
	    var myMin = myDate.getMinutes();
	    myHours = myHours<10 ?'0'+ myHours:myHours;
	    myMin = myMin<10 ?'0'+ myMin:myMin;
	    var timeStr = myHours+':'+ myMin;
	    var dayStr = myDate.getMonth()+1 +'-' + myDate.getDate();
	    
	    //sTime=源时间，cTime=当前时间，dTime=时间差
	    var cTime = new Date()
	    var dTime = Date.parse(cTime)/1000 - sTime;
	    var dDay = cTime.getDate() - myDate.getDate();
	    var dMonth = cTime.getMonth() - myDate.getMonth();
	    var dYear = cTime.getFullYear() - myDate.getFullYear();
        if( dTime < 60 ){
        	dTime = dTime>0?dTime:0;
            return dTime +'秒前';
        }else if(dTime < 3600 ){
            return Math.floor(dTime/60) +'分钟前';
            //今天的数据.年份相同.日期相同.
        }else if(dYear == 0 && dMonth == 0 && dDay<1){
            return '今天 '+ timeStr;
    	}else if(dYear == 0 && dMonth == 0 && dDay<2){
        	return '昨天 '+ timeStr;
        }else if(dYear == 0){
            return myDate.getMonth()+1 +'月' + myDate.getDate() + '日 '+ timeStr;
        }else{
            return myDate.getFullYear() + '-'+ dayStr;
        }
	},
	
	/**
	 * 时间戳解析 改
	 * @param {int} unixTime
	 * @param {Object} type
	 */
	fmtUnixTime: function(unixTime, type) {
		return apptools.friendlyDate(unixTime);
	},
};

//页面辅助方法
var webtool = {
	/*
	 * 对mui.openwindow的二次封装，压缩页面代码
	 */
	openSimView: function(webview, extData, anima, delayTime) {
		extData = extData || '';
		anima = anima || 'slide-in-right';
		delayTime = delayTime || '300';
		mui.openWindow({
			url: webUrl + '.html',
			id: webId,
			extras: {
				data: extData
			},
			styles: {
				scrollIndicator: 'none'
			},
			show: {
				aniShow: anima,
				duration: drtTime
			},
			createNew: false,
			waiting: {
				autoShow: false
			}
		})
	},
	/*
	 * 打开页面方法重写，点击时才进行预载，回调对象用show方法显示
	 * @param{String}
	 */
	openPreView: function(webview, callback) {
		var webId = webview;
		if(~webId.indexOf('/')) {
			webId = webId.substr(webId.lastIndexOf('/') + 1);
		}
		var wb = plus.webview.getWebviewById(webId);
		if(!wb) {
			wb = mui.preload({
				url: webview + '.html',
				id: webId,
			})
			setTimeout(function() {
				callback(wb);
			}, 500)
		} else {
			callback(wb);
		}

	},
	
};