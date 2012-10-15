var Gip_JS_Config = {
	snsSessionKey : 'C13665CBEC2873DD95C1B70E3665A901',
	sk : '00000000000000000000000000C7864F',
	skText : 'tencent_viewer_id',
	snsAppId : '32588',
	snsAppName : '我是传奇',
	snsAppKey : 'app32588',
	gipAppId : '7600100601',
	platform : 'tencent_xiaoyou',
	webServer : 'http://app32588.qzoneapp.com/gip_qq',
	staticServer : 'http://app32588.imgcache.qzoneapp.com/app32588/gip_static',
	dataCountUrl : 'http://app32588-3.qzone.qzoneapp.com/restapi.php',
	dcUUID : 'Athena_qqpengyou_prod',
	canvasHeight : 1600,
	dcLanguage : 'zh_CN',
	appUrl : 'http://app.pengyou.com/appframe.php?appid=32588&height=1200&frame=http://app32588.qzoneapp.com/',
	appPhoto : 'http%3A%2F%2Fcfile139.uf.daum.net%2FP85x110%2F1712C4374C5A2F8ED46460',
	paymentUrl : 'http://app32588-2.qzone.qzoneapp.com/loader/tencent_config.jsp',
	paymentDisabled : false,
	appDescription : '%20%0AThis%20revolutionary%20title%20tasks%20you%20with%20raising%20and%20caring%20for%20fish%20in%20your%20very%20own%20virtual%20aquarium.%20Customize%20your%20fishbowl%20with%20decorations%20while%20feeding%20and%20growing%20many%20different%20kinds%20of%20fish%20to%20produce%20treasures.%20You%20can%20also%20loot%20your%20friends%20aquariums%20for%20extra%20treasure.%20Come%20play%20the%20game%20that%20started%20it%20all%3A%20%E2%80%9CMy%20Fishbowl%E2%80%9D%21%0A%20%20%20%20%20%20%20',
	csServerUrl : '',
	flashHeight : '700',
	countAPI : false,
	limited : false,
	startCount : new Date().getTime(),
	flashVersion : '20111219',
	oldContainer : '/gipcontainer_30.swf',
	newContainer : '/gipcontainer_9.60845.swf',
	popupInterval : 0,

	snsExtendInfo : {
		"type" : "homepage_method",
		"method" : "tencentIndex",
		"gip_app_id" : "7600100601",
		"openid" : "00000000000000000000000000C7864F",
		"openkey" : "C13665CBEC2873DD95C1B70E3665A901",
		"pf" : "pengyou",
		"pfkey" : "321fc8fb81f6f7505adef80da15e9277",
		"qz_ver" : "6",
		"appcanvas" : "1",
		"countAPI" : false
	},
	disableApp : false,
	debug : true
};
Gip_JS_Config.pageConfigureData = {
	"tips" : [ "我是传奇隆重上线，英雄豪杰今日聚首，你还不来？" ],
	"tabs" : [
			{
				"tab" : {
					"id" : "fm_tab_app",
					"type" : "main",
					"text" : "玩游戏",
					"class" : "app",
					"width" : "99",
					"bgImageUrl" : "http://app11540.imgcache.qzoneapp.com/app11540/gip_static/portal/files/athena/tab_1.jpg",
					"display" : "block",
					"relid" : "fm_panel_app"
				},
				"panel" : {
					"height" : "",
					"url" : ""
				},
				"event" : {
					"click" : "",
					"show" : "",
					"hide" : ""
				}
			},
			{
				"tab" : {
					"id" : "fm_tab_invite",
					"type" : "func",
					"text" : "邀请好友",
					"class" : "invite",
					"width" : "99",
					"bgImageUrl" : "http:\/\/app11540.imgcache.qzoneapp.com\/app11540\/gip_static\/portal\/files\/athena/tab_2.jpg",
					"display" : "block",
					"relid" : "fm_panel_invite"
				},
				"panel" : {
					"height" : "",
					"url" : ""
				},
				"event" : {
					"click" : "fmInviteCommon",
					"show" : "",
					"hide" : ""
				}
			},
			{
				"tab" : {
					"id" : "fm_tab_discuss",
					"type" : "link",
					"text" : "讨论专区",
					"class" : "discuss",
					"width" : "99",
					"bgImageUrl" : "http://app11540.imgcache.qzoneapp.com/app11540/gip_static/portal/files/athena/tab_6.jpg",
					"display" : "block",
					"relid" : "fm_panel_discuss"
				},
				"panel" : {
					"height" : "",
					"url" : "http://sobar.soso.com/b/3007483_1772"
				},
				"event" : {
					"click" : "",
					"show" : "",
					"hide" : ""
				}
			},
			{
				"tab" : {
					"id" : "fm_tab_service",
					"type" : "func",
					"text" : "客服",
					"class" : "service",
					"width" : "99",
					"bgImageUrl" : "http://app11540.imgcache.qzoneapp.com/app11540/gip_static/portal/files/athena/tab_5.jpg",
					"display" : "block",
					"relid" : "fm_panel_service"
				},
				"panel" : {
					"height" : "750",
					"url" : ""
				},
				"event" : {
					"click" : "fmShowService",
					"show" : "",
					"hide" : ""
				}
			}, ],
	"help" : [ {
		"text" : "官方微博",
		"link" : "#",
		"target" : "_blank"
	}, {
		"text" : "客服中心",
		"link" : "javascript:snsShowService()",
		"target" : "_self"
	}, {
		"text" : "设为桌面图标",
		"link" : "javascript:addShortcut()",
		"target" : "_self"
	}, {
		"text" : "加入收藏",
		"link" : "javascript:addFavorite()",
		"target" : "_self"
	} ],
	"foot" : "<div style=\"text-align:center;padding:10px;\">QQ平台OPENID：<strong>{snsUid}</strong></div><div>声明：此应用由“乐元素”提供，若您在游戏过程中遇到问题，请直接点击<strong style=\"color:#cd0000;cursor:pointer;\" onclick=\"{funcName}()\">客服中心</strong>提交问题， 我们在48小时内会有专业的客服人员为您解答问题。同时，欢迎您关注 <a href=\"#\" target=\"_blank\">我是传奇</a> 的腾讯微博。 </div>",
	"texts" : {
		"gameTitle" : "我的游戏:",
		"more" : "更多游戏",
		"locale" : "语言切换",
		"userId" : "我是传奇编号："
	},
	"components" : {
		/**
		 * "like": { "qq": 2279038697 }, "tblog": { "name": "#", "sign":
		 * "a3a5aa50a4e64f0050da2cb23ee4188a10d3fedd" },
		 */
		"sharePic" : "#",
		"shareDesc" : "快来和我来铸造新的传奇故事吧！",
		"shareSummary" : "恶魔即将入侵美丽的家园，唯有最强大的英雄才能拯救世界，铸造传奇！"
	},
	"paymentUrl" : "/payment",
	"paymentStats" : false,
	"openPaymentInWindow" : true,
	"hideWidget" : true,
	"enableMessageCenter" : false
};

Gip_JS_Config.translation = {
	"locale" : "",
	"serviceUrl" : "",
	"iTeamIds" : "",
	"resources" : ""
};

Gip_JS_Config.path = {
	css : {
		fm : '/fm/fm_0_2.32107.css',
		sns : '',
		appDefault : '',
		appPlatform : ''
	},
	js : {
		lib : '/common/lib_0_2.49400.js',
		fm : '/fm/fm_0_3.60940.js',
		sns : '/platform/tencent/sns_1_0.62768.js',
		appDefault : '',
		appPlatform : ''
	}
};

Gip_JS_Config.component = {
	pop : {
		js : "/component/pop/pop.32431.js",
		css : "/component/pop/pop.32482.css"
	},
	fri : {
		js : "/component/friends/friends.19972.js",
		css : "/component/friends/friends.32476.css"
	},
	"messageCenter" : {
		js : "/component/message_center/script.52717.js",
		css : "/component/message_center/style.40845.css"
	},
	"prom" : {
		js : "/component/prom/prom.34368.js",
		css : "/component/prom/prom.33691.css"
	}
};
Gip_JS_Config.maintancePageUrl = "http://maintenance.happyelements.com/zh_cn.html";
Gip_JS_Config.rcip = "";
Gip_JS_Config.runtime = "";
Gip_JS_Config.userPerformance = {
	"loadingTestInterval" : "0",
	"loadingTestSwf" : "\/app\/common\/loading_test_cn.54831.swf"
};

Gip_JS_Config.gameBlock = '%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%0A%20%20%20%20%3Cconfig%3E%0A%20%20%20%20%20%20%20%20%3Cgame%3E%0A%09%09%09%09%20%20%20%20%3Cstatichost%3Ehttp%3A%2F%2Fapp32588.imgcache.qzoneapp.com%2Fapp32588%2Fgame%2F%3C%2Fstatichost%3E%0A%09%09%09%09%09%3Cfeedhost%3Ehttp%3A%2F%2Fapp32588.imgcache.qzoneapp.com%2Fapp32588%2Fgame%2F%3C%2Ffeedhost%3E%0A%09%09%09%09%09%3CshareServerUrl%3Ehttp%3A%2F%2Fapp32588-1.qzone.qzoneapp.com%2Fshareserver%2Fshare%3C%2FshareServerUrl%3E%0A%09%09%09%09%09%3Cdebug%3Efalse%3C%2Fdebug%3E%0A%09%09%09%09%09%3Cmock%3Efalse%3C%2Fmock%3E%0A%09%09%09%09%09%3Cconfig%3Eversion%2Fconfig%2Fconfig.1.63272.xml%3C%2Fconfig%3E%0A%09%09%09%09%09%3Cversion%3Eversion%2Fassets%2Fres%2Fversion.1.63138.dic%3C%2Fversion%3E%0A%09%09%09%09%09%3Clang%3Eversion%2Fconfig%2F%7Blocale%7D.1.63244.bin%3C%2Flang%3E%0A%09%09%09%09%09%3Cdict%3Eversion%2Fconfig%2Flanguage_%7Blocale%7D.1.63272.bin%3C%2Fdict%3E%0A%09%09%09%09%09%3Cfont%3Eversion%2FFontEmbed_%7Blocale%7D.1.185.swf%3C%2Ffont%3E%0A%09%09%09%09%09%3CdebugServer%3Ehttp%3A%2F%2Fapp32588-1.qzone.qzoneapp.com%3C%2FdebugServer%3E%0A%09%09%09%09%09%3C%2Fgame%3E%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20%3CapiStatus%3E%0A%20%20%20%20%3CgetAllFriendInfoList%3Etrue%3C%2FgetAllFriendInfoList%3E%0A%20%20%20%20%3CgetAppFriendInfoList%3Etrue%3C%2FgetAppFriendInfoList%3E%0A%20%20%20%20%3CgetAppId%3Etrue%3C%2FgetAppId%3E%0A%20%20%20%20%3CgetConfig%3Etrue%3C%2FgetConfig%3E%0A%20%20%20%20%3CgetGameWidth%3Etrue%3C%2FgetGameWidth%3E%0A%20%20%20%20%3CgetGameHeight%3Etrue%3C%2FgetGameHeight%3E%0A%20%20%20%20%3CgetLanguage%3Etrue%3C%2FgetLanguage%3E%0A%20%20%20%20%3CgetPlatform%3Etrue%3C%2FgetPlatform%3E%0A%20%20%20%20%3CgetSessionKey%3Etrue%3C%2FgetSessionKey%3E%0A%20%20%20%20%3CgetUserInfo%3Etrue%3C%2FgetUserInfo%3E%0A%20%20%20%20%3CfilterNGWords%3Efalse%3C%2FfilterNGWords%3E%0A%20%20%20%20%3CisFan%3Efalse%3C%2FisFan%3E%0A%20%20%20%20%3CisNewAppUser%3Etrue%3C%2FisNewAppUser%3E%0A%20%20%20%20%3Cnotify%3Efalse%3C%2Fnotify%3E%0A%20%20%20%20%3CpostFeed%3Etrue%3C%2FpostFeed%3E%0A%20%20%20%20%3Cpromote%3Efalse%3C%2Fpromote%3E%0A%20%20%20%20%3Cpresent%3Efalse%3C%2Fpresent%3E%0A%20%20%20%20%3CreloadGame%3Etrue%3C%2FreloadGame%3E%0A%20%20%20%20%3CshowInviteFriends%3Etrue%3C%2FshowInviteFriends%3E%0A%20%20%20%20%3CshowPayment%3Etrue%3C%2FshowPayment%3E%0A%20%20%20%20%3CshowPaymentInGame%3Etrue%3C%2FshowPaymentInGame%3E%0A%20%20%20%20%3CmoneyInGame%3Etrue%3C%2FmoneyInGame%3E%0A%20%20%20%20%3CuploadPhoto%3Efalse%3C%2FuploadPhoto%3E%0A%20%20%20%20%3CdataCount%3Etrue%3C%2FdataCount%3E%0A%20%20%20%20%3CgetUserPoints%3Etrue%3C%2FgetUserPoints%3E%0A%20%20%20%20%3CgetInviteUserIds%3Etrue%3C%2FgetInviteUserIds%3E%0A%20%20%20%20%3CgetUsersVIPInfo%3Etrue%3C%2FgetUsersVIPInfo%3E%09%09%0A%20%20%20%20%3Cinvite%3Etrue%3C%2Finvite%3E%0A%20%20%3C%2FapiStatus%3E%0A%20%0A%20%20%20%20%20%3C%2Fconfig%3E';

function getPara(url, name) {
	var str = '', _p = name + '=';
	if (url.indexOf("&" + _p) > -1)
		str = url.split("&" + _p)[1].split("&")[0];
	if (url.indexOf("?" + _p) > -1)
		str = url.split("?" + _p)[1].split("&")[0];
	return str;
}
function dc36() {
	var queryString = window.location.search;
	var ref = getPara(queryString, "ref");
	var src = getPara(queryString, "gip_ad_src");
	var _uniq_key = Gip_JS_Config.dcUUID;
	var _user_id = 12345;
	var _ac_type = 36;
	var ut = new Date().getTime();
	if (src || ref == "games_featured") {
		src = src || ref;
		var url = Gip_JS_Config.dataCountUrl;
		url = [ url, '?_uniq_key=', _uniq_key, '&_user_id=', _user_id,
				'&_ac_type=', _ac_type, '&ut=', ut, '&src=', src ].join('');
		var img = new Image();
		img.src = url;
	}
}
dc36();

var Gip_JS_AppInfo = {
	"flashHeight" : "700",
	"flashWidth" : "760",
	"gameUrl" : "http:\/\/app32588.imgcache.qzoneapp.com\/app32588\/game\/version\/GameClient.1.63272.swf",
	"language" : "zh_CN",
	"languages" : [],
	"needDiff" : false,
	"newAppUser" : false,
	"platform" : "tencent_xiaoyou",
	"prohibition" : [],
	"snsId" : "00000000000000000000000000C7864F",
	"staticServer" : "http:\/\/app32588.imgcache.qzoneapp.com\/app32588\/gip_static",
	"timeout" : "30000",
	"uid" : "76000047658961",
	"webServer" : "http:\/\/app32588.qzoneapp.com\/gip_qq",
	"installTime" : "2012-03-07 16:02:23",
	"sessionKey" : "gip.c36c8b139462dfa83fdf2a1b705de202.36000.1331143504-76000047658961"
};

(function() {
	var node = document.createElement("script");
	node.src = 'http://app32588.imgcache.qzoneapp.com/app32588/gip_static/fm/os.60502.js';
	document.getElementsByTagName('head')[0].appendChild(node);
})();
