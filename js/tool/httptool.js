document.write("<script language='javascript' src='../../config.js'></script>");
document.write("<script language='javascript' src='../../js/tool/app.js'></script>");

/*
 * 二次封装mui.ajax
 */
var ajaxRequest = function() {
	var own = this;
	own.data = {};
	own.domain = WEB_SERVER.domain + '/api/';
	own.addData = function(key, value) {
		if(!value) {
			return
		} else {
			own.data[key] = value;
		}
	}

	own.request = function(url, method, callback, asynch) {
		asynch = asynch == null ? true : asynch;
		method = method || 'GET';
		var data = {};
        data['method']=method;
        data['access_token']=WEB_SERVER.access_token;
//      data['open_id']='aFtOqDVqZCpHUGMvojKuWGOm58tw4';
		for(var i in own.data) {
            data[i]=own.data[i]
		};
		mui.ajax(own.domain + url, {
			data: data,
			dataType: 'JSON',
			async: asynch,
			type: 'POST',
			timeout: 10000,
			success: function(data) {
//				var result=eval('(' + data + ')');
//				callback(result);				
				var result=JSON.parse(data);				
				callback(result);
			},
			error: function(xhr, type, errorThrown) {
				callback(xhr);
			}
		})
	}
};