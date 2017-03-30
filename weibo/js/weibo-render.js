var get_weibo_type = function(type) {
	if(eval('typeof(type_' + type + ')') == 'undefined') {
		return eval('type_feed');
	}
	return eval('type_' + type);
}

var parse_weibo_html = function(weibo) {
	var long_weibo_render = function(weibo) {
		if(weibo.type == 'long_weibo') {
			var richStr = weibo.long_weibo.long_content;
			weibo.cover = weibo.long_weibo.cover || apptools.getCover(richStr)[0];
			if(weibo.hideOperation == 1) {
				weibo.type = 'long_weibo_dtl';
				weibo.long_weibo.long_content = imgTools.getDtlContent(richStr);
			}
		}
	}
	template.config('escape', false)

	if(weibo.type == 'repost') {
		if(weibo.sourceWeibo.type == null) {
			weibo_type = template.compile(eval('type_null'));
		} else {
			var source = template.compile(get_weibo_type(weibo.sourceWeibo.type));
			long_weibo_render(weibo.sourceWeibo);
			weibo.sourceWeibo.fetchContent = source(weibo.sourceWeibo);
		}
	}
	long_weibo_render(weibo);

	var weibo_type = template.compile(get_weibo_type(weibo.type));
	//简单处理话题
	//Todo
	if(weibo.topic_info) {
		var topicText = '';
		for(var index in weibo.topic_info) {
			topicText = topicText + '<div class="base-topic-label">' + '#' + weibo.topic_info[index].name + '#' + '</div>';
		}
		var topicContent = template.compile(type_feed);
		var topicType = topicContent(weibo);
		weibo.content = topicText + topicType;
	}

	var html_type = weibo_type(weibo);
	var render = template.compile(base);
	weibo.fetchContent = html_type;
	var html = render(weibo);
	return html;
}
base = '<div class="weibo-item-userinfo-div"><div class="weibo-item-userinfo">'+
'<div class="weibo-item-avatar-div"><img class="weibo-item-avatar" src="../../img/default_avatar.jpg"  data-src="{{user.avatar128}}" onload="load(this)"/></div>'+
'<div class="weibo-item-info-div"><span class="weibo-item-nickname mui-ellipsis">{{if user.nickname}}{{user.nickname}}{{else}}咸鱼{{/if}}</span><div class="weibo-item-mobile-div"><span class="base-grey-font weibo-item-sendtime">{{create_time}}</span><span class="base-grey-font weibo-item-from">{{from}}</span></div></div></div>'+
'<div class="weibo-item-complain"><a class="mui-icon mui-icon-arrowdown" href="#reportPopover"></a></div></div><div class="weibo-item-content-div">{{fetchContent}}</div>'+
'<div class="weibo-item-other-div"><div class="weibo-item-other-item weibo-item-transmit"><img class="base-own-icon" src="../img/weibo-item-repost.png"></img><span class="base-grey-font">{{repost_count}}</span></div>'+
'<div class="weibo-item-other-item weibo-item-comment"><img class="base-own-icon" src="../img/weibo-item-comment.png"></img><span class="base-grey-font">{{comment_count}}</span></div>'+
'<div class="weibo-item-other-item weibo-item-like"><img class="base-own-icon" src="../img/weibo-item-like.png"></img><span class="base-grey-font">{{support_count}}</span></div></div>';

/*长微博列表模板*/
type_long_weibo = '<div class="title mui-ellipsis-2"><span class="base-tag-1">文章</span>{{long_weibo.title}}</div><div class="mui-card-content">' +
	'{{if long_weibo.cover}}<img class="long-cover" onload=load(this) src="../../img/df_big.png" data-src="{{cover}}"/>{{/if}}' +
	'<p class="base-ellipsis-4 base-content-1">{{content}}</p><div class="all-lab">查看全文</div></div>';
/*长微博详情模板*/
type_long_weibo_dtl = '<div class="title mui-ellipsis-2">{{long_weibo.title}}</div><div class="mui-card-content">' +
	'{{if long_weibo.cover}}<img class="long-cover" onload=load(this) src="../../img/df_big.png" data-src="{{long_weibo.cover}}" data-preview-src="{{long_weibo.cover}}" data-preview-group="{{2}}"/>{{/if}}' +
	'<p class="base-ellipsis-4 base-content-1">{{long_weibo.long_content}}</p></div>';

type_redbag = '<p class="weiboContent" id="weiboContent_{{id}}">{{content}}</p>' +
	'<div class="repost_content" style="background-color: #eee;padding: 5px 10px;">' +
	'<div style="font-size:13px;">来自网站的分享</div>' +
	'</div>';

type_video = '<p class="weiboContent" id="weiboContent_{{id}}">{{content}}</p>' +
	'<div class="repost_content" style="background-color: #eee;padding: 5px 10px;">' +
	'<div style="font-size:13px;">来自网站的视频分享</div>' +
	'</div>';

type_xiami = '<p class="weiboContent" id="weiboContent_{{id}}">{{content}}</p>' +
	'<div class="repost_content" style="background-color: #eee;padding: 5px 10px;">' +
	'<div class="music-view mui-media"><img class="mui-pull-left" onload="load(this)" src="../../img/weibo_df.png" data-src="{{data.cover}}" style="width: 5em;height: 5em;">' +
	'<div class="mui-media-body"><div data-weiboid="{{id}}" class="music-contro">' +
	'<img id="music_contro_{{id}}_{{data.id}}" data-music-id="{{data.id}}" src="../../img/play.png"/></div>' +
	'<div class="music-text-info"><div class="mui-ellipsis">{{data.title}} - {{data.author}}</div></div>' +
	'<div id="music_progres_{{id}}_{{data.id}}" class="music-progress"></div><audio id="{{id}}_{{data.id}}"></audio></div>' +
	'</div></div>';

type_null = '<p class="weiboContent" id="weiboContent_{{id}}">{{content}}</p>' +
	'<div class="repost_content" style="background-color: #eee;padding: 5px 10px;">' +
	'<div style="font-size:13px;">原微博已被删除</div>' +
	'</div>';

type_feed = '<p class="weiboContent" id="weiboContent_{{id}}">{{content}}</p>';

type_link = '<p class="weiboContent" id="weiboContent_{{id}}">{{content}}</p>' +
	'<div class="link-view" data-type="{{type}}" data-link="{{data.site_link}}">' +
	'<img class="mui-pull-left link-img" onload="load(this)" data-src="{{data.img}}" src="../../img/app-logo.png">' +
	'<div class="mui-media-body link-text-view"><div class="mui-ellipsis link-title">{{data.title}}' +
	'</div><p class="mui-ellipsis link-content">{{data.description||data.content}}</p></div></div>';

type_share = type_link;
type_repost = '<p class="weiboContent" id="weiboContent_{{id}}">{{content}}</p>' +
	'<div class="repost_content" style="background-color: #eee;padding: 5px 10px;">' +
	'<span style="font-size: 15px">@{{sourceWeibo.user.nickname}}：</span>' +
	'<div style="font-size:13px;">{{sourceWeibo.fetchContent}}</div>' +
	'</div>';

type_image = '<p class="weiboContent" id="weiboContent_{{id}}">{{content}}</p>' +
	'<div class="weibo-img-list">' +
	'{{if attach.image}}' +
	'<ul>' +
	'{{each attach.image.thumb as imageUrl i}}' +
	'<li>' +
	'<img onload="load(this)" src="../../img/weibo_df.png" data-src="{{imageUrl}}" data-preview-src="{{attach.image.ori[i]}}" data-preview-group="{{id}}" class="weibo-list-img-{{if image_count == 1}}one{{else}}more{{/if}}" />' +
	'</li>' +
	'{{/each}}' +
	'</ul>' +
	'{{/if}}' +
	'</div>';
type_voice = '<p class="weiboContent" id="weiboContent_{{id}}">{{content}}</p>' +
	'<div id="voice_box" class="weibo-content-voice">' +
	'<div id="type_voice_{{id}}" name="{{id}}" class="weibo-content-voice-btn" src="{{attach.voice}}" voice-src="">' +
	'<i class="voice-img icon-mic"></i></div>' +
	'<div class="weibo-content-time-show">' +
	'<span id="voice_time_{{id}}" class="voice-time">00:00</span></div></div>'

repost_view = '<a href="javascript:">' +
	'<img class="mui-media-object mui-pull-left module-icon" src="{{if image}} {{image.thumb[0]}}  {{else}} {{user.avatar128}} {{/if}}" style="width: 60px;height: 60px;">' +
	'<div class="mui-media-body" style="margin-left: 10px;float: left;width: 220px"><span>{{user.nickname}}</span>' +
	'<p class="mui-ellipsis-2">{{content.slice(0,30)}}</p>' +
	'</div></a>';

weibo_comment = '<img id="{{user.uid}}" class="user-flag avatar mui-pull-left" data-uid="{{user.uid}}" onload="load(this)" src="../../img/default_avatar.jpg" data-src="{{user.avatar128}}">' +
	'<div class="mui-media-body"><img src="../img/weibo-item-like.png" class="base-own-icon reply-btn"></i>' +
	'<p><span class="user-flag" data-uid="{{user.uid}}">{{user.nickname}}</span></p>' +
	'<div class="txt-xxs"><span class="time">{{create_time}}</span></div>' +
	'<p class="weibo-comment">{{content}}</p></div>';

weibo_support_list = '<img id="{{uid}}" class="user-flag mui-pull-left" data-uid="{{uid}}" onload="load(this)" src="../../img/default_avatar.jpg" data-src="{{avatar128}}">' +
	'<div class="mui-media-body" style="font-size:12px;">{{nickname||"匿名"}}</div>';