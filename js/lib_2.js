var PM = {};
PM.call = [];
PM.isLoaded = 0; // 0 is unload，1 is loading，2 was loaded
PM.getURL = function(path){
	if(path.indexOf('http://') == 0 || path.indexOf('https://') == 0){
		return path;
	}else{
		return PM_config.staticServer + path;
	}
};
PM.loader = function(){
	PM.isLoaded = 1;
	var path = PM_config.path;
	var jsPaths = [];
	var cssPaths=[];
	for(var p in path){	
		jsPaths.push(PM.getURL(path[p].js));
	}
	PM.loadJSArray(jsPaths,function(){
		PM.isLoaded = 2;
		HE.array.forEach(PM.call,function(callback){
			callback();
		});
	});
};
PM.loadJSArray = function(pathArr,callback){
	var steps = 0,len = pathArr.length;			
	for(var i=0;i<len;i++){
		PM.loadJS(pathArr[i],callbacks);
	}
	function callbacks(){
		steps += 1;
		if(steps == len && callback){
			callback();
		}
	}
};
PM.loadJS = function(link,callback){
	var node = document.createElement("script");
	node.src = link;  
	document.getElementsByTagName('head')[0].appendChild(node); 
	if(!callback){return false;}
	if (navigator.userAgent.toLowerCase().indexOf('msie')>-1){	
		node.onreadystatechange = function(){
			if(this.readyState == "complete" || this.readyState == "loaded"){
				callback();
			}
		}
	} else {
		node.onload = function(){callback()};
	}
};
PM.getCss=function(callback){
	if(this.executed){
		return;
	}
	this.executed=true;
	var path = PM_config.path;
	var cssPaths=[];
	for(var p in path){
		if(path[p].css){
			cssPaths.push(PM.getURL(path[p].css));
		}		
	}
	PM.loadCSSArray(cssPaths,callback);
};
PM.loadCSSArray =function(pathArr,callback){
	var steps=0,len = pathArr.length;
	for(var i=0;i<len;i++){
		PM.loadCSS(pathArr[i],callbacks);
	}
	function callbacks(){
		steps ++;
		if(steps == len && callback){
			callback();
		}
	}
};

PM.loadCSS = function(link,callback){
	var node = document.createElement("link");
	node.href = link;
	node.type = "text/css";
	node.rel = "stylesheet";
	document.getElementsByTagName('head')[0].appendChild(node);
	if(!callback){return false;}
	PM.styleOnload(node, callback);
};

(function(){
	PM.styleOnload=function(node, callback) {
	    if (node.attachEvent) {
	      node.attachEvent('onload', callback);
	    }
	    // polling for Firefox, Chrome, Safari
	    else {
	      setTimeout(function() {
	        poll(node, callback);
	      }, 0); // for cache
	    }
	}
	 function poll(node, callback) {
		    if (callback.isCalled) {
		      return;
		    }
		    var isLoaded = false;
		    if (/webkit/i.test(navigator.userAgent)) {//webkit
		      if (node['sheet']) {
		        isLoaded = true;
		      }
		    }
		    // for Firefox
		    else if (node['sheet']) {
		      try {
		        if (node['sheet'].cssRules) {
		          isLoaded = true;
		        }
		      } catch (ex) {
		        // NS_ERROR_DOM_SECURITY_ERR
		        if (ex.code === 1000) {
		          isLoaded = true;
		        }
		      }
		    }

		    if (isLoaded) {
		      // give time to render.
		      setTimeout(function() {
		        callback();
		      }, 1);
		    }
		    else {
		      setTimeout(function() {
		        poll(node, callback);
		      }, 1);
		    }
		  }
})();
PM.ready = function(callback){
	if(PM.isLoaded == 0){
		PM.call.push(callback);
		PM.loader();
	}else if(PM.isLoaded == 1){
		PM.call.push(callback)
	}else{
		callback();
	}
};
PM.makeRequest = function(args, callback) {
    args.url = args.url.split('&amp;').join('&');
    args.url = args.url.split('&&').join('&');
	
	// open social
	if(typeof(gadgets)!=="undefined"){
		if(window['PM_makeRequest']){
			PM_makeRequest(args, callback);
		}else{
			PM.osRequest(args,callback);
		} 
	}else{
		HE.ajax(args,callback);	
	}
};
PM.osRequest = function(args,callback){        
	var params = {};
	var method = args.method || "get";
	params[gadgets.io.RequestParameters.CONTENT_TYPE] = args.contentType || gadgets.io.ContentType.JSON;
	// post method
	if(method.toLowerCase() == "post"){
		params[gadgets.io.RequestParameters.METHOD] = args.method || gadgets.io.MethodType.POST;		
		if(args.data){
			params[gadgets.io.RequestParameters.POST_DATA] = gadgets.io.encodeValues(args.data);
		}
	}
	params[gadgets.io.RequestParameters.AUTHORIZATION] = gadgets.io.AuthorizationType.SIGNED;
	gadgets.io.makeRequest(args.url, function(response) {    
		callback(response.data);
	}, params);
};
PM.create=function(){
	return function(){
		this.initialize.apply(this, arguments);
	}
};
PM.dc=function(args){
	var params={
			action:args.action||'pay',
			step:args.step||-1,
			snsuid:PM_config.snsuid||0,
			uid:PM_config.gipuid||0,
			appid:PM_config.gipAppId||0,
			lang:PM_config.lang,
			status:args.status||"success",
			src:args.src||'',
			msg:args.msg||'',
			r:Math.random()
		};
	var url=PM_config.dcUrl;
	for(var key in params){
		url=HE.setPara(url, key, params[key]);
	}
	new Image().src=url;
};

(function(_s){
	var _ua = navigator.userAgent.toLowerCase();
	_s.$IE = /msie/.test(_ua);
	_s.$OPERA = /opera/.test(_ua);
	_s.$MOZ = /gecko/.test(_ua);
	_s.$IE5 = /msie 5 /.test(_ua);
	_s.$IE55 = /msie 5.5/.test(_ua);
	_s.$IE6 = /msie 6/.test(_ua);
	_s.$IE7 = /msie 7/.test(_ua);
	_s.$IE8 = /msie 8/.test(_ua);
	_s.$SAFARI = /safari/.test(_ua);
	_s.$FF2=/Firefox\/2/i.test(_ua);
	_s.$FF = /firefox/i.test(_ua);
	_s.$CHROME = /chrome/i.test(_ua);
	_s.$TT=/tencenttraveler/.test(_ua);
	_s.$360=/360se/.test(_ua);
	_s.$Maxthon=false;
	 try{
		 var t=window.external;
		_s.$Maxthon=t.max_version?true:false;
	 }catch(e){}
})(PM);

PM.$e=function(id) {
	return document.getElementById(id);
};
PM.$c=function(tag){
	return document.createElement(tag);
};
PM.getBaseUrl=function(str){// genernate payment server url
	var bsurl='';
	var r=str.match(/^(http:\/\/([a-zA-Z]{2,6}\.){0,1}payment\.happyelements\.com)/gi);
	if(r&&r[0]){
		bsurl=r[0];
	}

	return bsurl;
};
PM.addEvent=function(elm, func, evType, useCapture) {
	var _el = typeof elm == 'string' ? PM.$e(elm) : elm;
	if (_el == null) {
		trace("addEvent can not find object：" + elm);
		return;
	}
	if (typeof useCapture == 'undefined') {
		useCapture = false;
	}
	if (typeof evType == 'undefined') {
		evType = 'click';
	}
	if (_el.addEventListener) {
		_el.addEventListener(evType, func, useCapture);
		return true;
	} else if (_el.attachEvent) {
		var r = _el.attachEvent('on' + evType, func);
		return true;
	} else {
		_el['on' + evType] = func;
	}
};
PM.bindFunc=function(func, obj) {
	var __method = func;
	return function() {
		return __method.apply(obj, arguments);
	};
};
PM.getLeft=function(el){
	var left = 0;
	if (typeof el.offsetParent !="unknown") {
		while (el.offsetParent) {
			left += el.offsetLeft;
			el = el.offsetParent;
		}
	}
	else 
		if (el.x) {
			left += el.x;
		}
	return left;
};
PM.getTop=function(el){
	var top = 0;
	if (typeof el.offsetParent !="unknown") {
		while (el.offsetParent) {
			top += el.offsetTop;
			el = el.offsetParent;
		}
	}
	else 
		if (el.y) {
			top += el.y;
		}
	return top;
};
PM.loadJsonP =function(asUrl, afCallback){// copy from lib_0_2
	if (!asUrl) {return false;}
	var lsGUID = HE.guid();
	asUrl = (asUrl.indexOf("callback=") == -1) ? (asUrl + (asUrl.indexOf("?") != -1 ? "&" : "?") + "callback=" + lsGUID) : asUrl;
	window[lsGUID] = afCallback;
	var node = document.createElement('script');
	node.src = asUrl;
	document.getElementsByTagName('head')[0].appendChild(node);                                  
};
PM.copy=function(a, b, isWrite, filter){// copy from lib_0_2
	for (var prop in b) 
		if (isWrite || typeof a[prop] === 'undefined' || a[prop] === null) 
			a[prop] = filter ? filter(b[prop]) : b[prop];
		return a;
};
PM.json2Obj=function(str){// copy from lib_0_2
	var ljson;
	if(typeof str == "object"){return str;}
	str = (str != null) ? str.split("\n").join("").split("\r").join("") : "";
	if (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/.test(str.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, ''))) {
		if (str != "") {return eval('(' + str + ')');}
	}
	return {};
};
PM.substitute = function(temp, data, regexp) {// copy form lib_0_2
	if (!(Object.prototype.toString.call(data) === "[object Array]"))
		data = [ data ];
	var ret = [];
	for ( var i = 0, j = data.length; i < j; i++) {
		ret.push(replaceAction(data[i]));
	}
	return ret.join("");
	function replaceAction(object) {
		return temp.replace(regexp || (/\\?\{([^}]+)\}/g), function(match,
				name) {
			if (match.charAt(0) == '\\')
				return match.slice(1);
			return (object[name] != undefined) ? object[name] : '';
		});
	}
};
PM.insertHTML =function(el, html, where) {
	el = el || document.body;
	where = where.toLowerCase() || "beforeend";
	if (el.insertAdjacentHTML) {
		switch (where) {
		case "beforebegin":
			el.insertAdjacentHTML('BeforeBegin', html);
			return el.previousSibling;
		case "afterbegin":
			el.insertAdjacentHTML('AfterBegin', html);
			return el.firstChild;
		case "beforeend":
			el.insertAdjacentHTML('BeforeEnd', html);
			return el.lastChild;
		case "afterend":
			el.insertAdjacentHTML('AfterEnd', html);
			return el.nextSibling;
		}
	}
	var range = el.ownerDocument.createRange();
	var frag;
	switch (where) {
	case "beforebegin":
		range.setStartBefore(el);
		frag = range.createContextualFragment(html);
		el.parentNode.insertBefore(frag, el);
		return el.previousSibling;
	case "afterbegin":
		if (el.firstChild) {
			range.setStartBefore(el.firstChild);
			frag = range.createContextualFragment(html);
			el.insertBefore(frag, el.firstChild);
			return el.firstChild;
		} else {
			el.innerHTML = html;
			return el.firstChild;
		}
		break;
	case "beforeend":
		if (el.lastChild) {
			range.setStartAfter(el.lastChild);
			frag = range.createContextualFragment(html);
			el.appendChild(frag);
			return el.lastChild;
		} else {
			el.innerHTML = html;
			return el.lastChild;
		}
		break;
	case "afterend":
		range.setStartAfter(el);
		frag = range.createContextualFragment(html);
		el.parentNode.insertBefore(frag, el.nextSibling);
		return el.nextSibling;
	}
};
PM.setCookie = function (name, value, expire, path, domain, secure) {
	var cstr = [];
	cstr.push(name + '=' + escape(value));
	if(expire){
		var dd = new Date();
		var expires = dd.getTime() + expire * 3600000;
		dd.setTime(expires);
		cstr.push('expires=' + dd.toGMTString());
	}
	if (path) {
		cstr.push('path=' + path);
	}
	if (domain) {
		cstr.push('domain=' + domain);
	}
	if (secure) {
		cstr.push(secure);
	}
	document.cookie = cstr.join(';');
};
PM.getCookie = function (name) {
	name = name.replace(/([\.\[\]\$])/g,'\\\$1');
	var rep = new RegExp(name + '=([^;]*)?;','i'); 
	var co = document.cookie + ';';
	var res = co.match(rep);
	if (res) {
		return res[1] || "";
	}
	else {
		return "";
	}
};

PM.MonitorClass=PM.create();
PM.MonitorClass.prototype={
	initialize:function(param,date){
		this.date=date||new Date().getFullYear()+'-'+((new Date().getMonth()+1)>10?(new Date().getMonth()+1):'0'+(new Date().getMonth()+1))+'-'+(new Date().getDate()>10?new Date().getDate():'0'+new Date().getDate());
		this.param=param;
		this.twoLines=(this.param.type=='funcfrequency'||this.param.type=='appfunc'||this.param.type=='platformfunc');
		this.needSelect=(this.param.type=='appfunc'||this.param.type=='platformfunc');
		this.createHTML();
		this.setEvent();
		
		var d={"period":"minutely","date":this.date.replace(/\-/g,'')};
		if(this.needSelect){
			var sel=HE.$('#selectChoice');
			this.selvalue=sel.options[sel.selectedIndex].value;
			d.selvalue=this.selvalue;
		}
		
		this.loadData(this.param.url,d,PM.bindFunc(this.rendarChart,this));
	},
	createHTML:function(){
		var linediv = HE.$('#linediv');
		var piediv = HE.$('#piediv');
		switch (this.param.type){
		case "browser":
			HE.removeClass(piediv,'hide');
			break;
		case "loadsuccess":
			HE.removeClass(linediv,'hide');
			break;
		default:
			HE.removeClass(linediv,'hide');
			HE.removeClass(piediv,'hide');
		}
		
	},
	setEvent:function(){
		var btn=HE.$('#addInfo');
		var _this=this;
		HE.addEvent(btn,'click',function(){
			var canl=HE.$('#dateChoice');
			if(canl.value==""){
				alert('请选择日期');
				return;
			}
			var date=canl.value.replace(/\-/g,"");
			var d={"period":"minutely","date":date};
			if(_this.needSelect){
				var sel=HE.$('#selectChoice');
				_this.selvalue=sel.options[sel.selectedIndex].value;
				d.selvalue=_this.selvalue;
			}
			_this.loadData(_this.param.url,d,PM.bindFunc(_this.rendarChart,_this));
		});
		
		HE.addEvent(HE.$('#compareInfo'),'click',PM.bindFunc(this.compareLine,this));
	},
	loadData:function(url,param,callback){
		date=param.date||this.date.replace(/\-/g,'');
		if(this.needSelect){
			date+='_'+param.selvalue;
		}
		if(HE.cacheData&&HE.cacheData[date]){
			if(callback)
				callback(HE.cacheData[date],date);
		}else{
			HE.ajax({
				url:url,
				data:param
			},function(d){
				HE.cacheData[date]=d;
				if(callback)
					callback(d,date);
			});
		}
	},
	rendarChart:function(d,date){
		date=date||this.date.replace(/\-/g,'');
		if(d.ret=='success'){
			var sum=d.data.eCount;
			var sumCount = d.data.sumCount;
			var obj={};
			var s=new Array();
			var series={};
			var series2={};
			var keys=new Array();
			var len=d.data.rows.length;
			for(var k in sum){
				var ratio=Math.round(sum[k]*1000/sumCount)/10;
				s.push({"status":k,"ratio":ratio,"count":sum[k]});
				series[''+k]=new Array();
				if(this.twoLines){
					series2[''+k]=new Array();
				}
				keys[keys.length]=k;
				for(var i=0;i<len;i++){
					series[''+k][i]=0;
					if(this.twoLines){
						series2[''+k][i]=0;
					}
				}
			}
			series['id']=new Array();
			for(var i=0;i<len;i++){
				var o=d.data.rows[i];
				series['id'][i]=o.id;
				for(var j=0;j<keys.length;j++){
					var tmp=HE.getPara(o.s,keys[j]);
					if(tmp!='') {
						if(this.twoLines){
							series[keys[j]+''][i]=tmp.split("|")[0];
							series2[keys[j]+''][i]=tmp.split("|")[1];
						}else{
							series[keys[j]+''][i]=tmp;
						}
					}
				}
			}
			if(this.twoLines)series2['id']=series['id'];
			trace(series);
			obj.data=s;
			obj.id=d.data.date;
			var id=new Date().getTime();
			this.renderPie(obj,"mp_1");
			this.renderColumn(obj,"mc_1");
			this.renderChecks(HE.$('#optionCheck'),obj.data);
			this.renderZoomLine(series,"mzl_1");
			if(this.twoLines){
				this.renderZoomLine(series2,"mzl_2",'','',true);
			}
			
		}else{
			alert("error,reason:"+d.data);
		}
	},
	compareLine:function(){
		var _this=this;
		var date1=HE.$('#dateChoice1').value;
		date1=date1==''?today:date1;
		
		var date2=HE.$('#dateChoice2').value;
		date2=date2==''?today:date2;
		
		var par={"period":"minutely","date":date1.replace(/\-/g,"")};
		if(_this.needSelect){
			var sel=HE.$('#selectChoice');
			_this.selvalue=sel.options[sel.selectedIndex].value;
			par.selvalue=_this.selvalue;
		}
		
		this.loadData(this.param.url,par,function(d){
			var obj={};
			var s=new Array();
			var series={};
			var series2={};
			var keys=new Array();
			if(d.ret=='success'){
				var res1key=d.data.date.substr(4);
				var sum=d.data.eCount;
				var sumCount = d.data.sumCount;
				var len=d.data.rows.length;
				for(var k in sum){
					var ratio=Math.round(sum[k]*1000/sumCount)/10;
					s.push({"status":k+'_'+res1key,"ratio":ratio,"count":sum[k]});
					series[k+'_'+res1key]=new Array();
					if(_this.twoLines){
						series2[k+'_'+res1key]=new Array();
					}
					keys[keys.length]=k+'_'+res1key;
					for(var i=0;i<len;i++){
						if(_this.twoLines){
							series2[k+'_'+res1key][i]=0;
						}
						series[k+'_'+res1key][i]=0;
					}
				}
				series['id']=new Array();
				if(_this.twoLines)series2['id']=series['id'];
				for(var i=0;i<len;i++){
					var o=d.data.rows[i];
					series['id'][i]=o.id;
					for(var j=0;j<keys.length;j++){
						var tmp=HE.getPara(o.s,keys[j].split('_')[0]);
						if(tmp!='') {
							series[keys[j]][i]=tmp;
							if(_this.twoLines){
								series[keys[j]][i]=tmp.split('|')[0];
								series2[keys[j]][i]=tmp.split('|')[1];
							}
						}
					}
				}
			}
			par.date=date2.replace(/\-/g,"");
			_this.loadData(_this.param.url,par,function(d2){
				if(d2.ret=='success'){
					var res2key=d2.data.date.substr(4);
					var sum=d2.data.eCount;
					var sumCount = d2.data.sumCount;
					var len=d2.data.rows.length;
					var keys2=new Array();
					for(var k in sum){
						var ratio=Math.round(sum[k]*1000/sumCount)/10;
						//trace(k+'_'+res2key);
						s.push({"status":k+'_'+res2key,"ratio":ratio,"count":sum[k]});
						series[k+'_'+res2key]=new Array();
						if(_this.twoLines){
							series2[k+'_'+res2key]=new Array();
						}
						keys2[keys2.length]=k+'_'+res2key;
						for(var i=0;i<len;i++){
							series[k+'_'+res2key][i]=0;
							if(_this.twoLines){
								series2[k+'_'+res2key][i]=0;
							}
						}
					}
					series['id']=new Array();
					if(_this.twoLines)series2['id']=series['id'];
					for(var i=0;i<len;i++){
						var o=d2.data.rows[i];
						series['id'][i]=o.id;
						for(var j=0;j<keys2.length;j++){
							var tmp=HE.getPara(o.s,keys2[j].split('_')[0]);
							if(tmp!='') {
								series[keys2[j]][i]=tmp;
								if(_this.twoLines){
									series[keys2[j]][i]=tmp.split('|')[0];
									series2[keys2[j]][i]=tmp.split('|')[1];
								}
							}
						}
					}
				}
				obj.data=s;
				obj.id=res1key+"|"+res2key;
				_this.renderChecks(HE.$('#optionCheck'),obj.data);
				_this.renderZoomLine(series,"mzl_1");
				if(_this.twoLines){
					_this.renderZoomLine(series2,"mzl_2",'','',true);
				}
			});
		});
	},
	renderChecks:function(container,d){
		var _this=this;
		var tmp=[];
		var str='选择要过滤的分类：&nbsp;&nbsp;';
		for(var i=0;i<d.length;i++){
			trace(d[i].status);
			if(!tmp[d[i].status]){
				str+='<input type="checkbox" checked value='+d[i].status+' name="zoomLineStatus">'+d[i].status+'&nbsp;&nbsp;';
				tmp[d[i].status]=true;
			}
		}
		container.innerHTML=str;
		var checks=HE.$('input',HE.$('#optionCheck'));
		var srows={};
		HE.array.forEach(checks,function(chk){
			srows[chk.value]=false;
			HE.addEvent(chk,'click',function(){
				if(this.checked)srows[this.value]=false;
				else srows[this.value]=true;
				_this.renderZoomLine(null,"mzl_1",srows);
				if(_this.twoLines){
					_this.renderZoomLine(null,"mzl_2",srows,'',true);
				}
			});
		});
		trace('swro----------');
		trace(srows);
	},
	renderPie:function(data,container,name){
		var myChart=new FusionCharts("swf/Pie3D.swf",'f'+new Date().getTime(),"420","360","0","1");
		var str='<chart caption="'+this.param.title+''+data.id+'" showLegend="1" legendPosition="RIGHT" showLabels="0"  numberPrefix="%">';
		var len=data.data.length;
		for(var i=0;i<len;i++){
			var d=data.data[i];
			str+='<set label="'+d["status"]+'" value="'+d["ratio"]+'" />';
		}
		str+='</chart>';
		myChart.setXMLData(str);
		myChart.render(container);
	},
	renderColumn:function(data,container,name){
		trace('in column');
		var d=new Array();
		var strXML;
		strXML = "<chart caption='"+data.id+"' formatNumberScale='0' numberPrefix='' animation='1' showValues='1' rotateValues='1' placeValuesInside='1'>";
		strXML = strXML + "<categories><category name='"+this.param.title+"' /></categories>";
		var len=data.data.length;
		for(var i=0;i<len;i++){
			var d=data.data[i];
			strXML+="<dataset seriesName='"+d['status']+"' ><set value='"+d['count']+"' /></dataset>";
		}
		strXML = strXML + "</chart>";
		var chart = new FusionCharts("swf/MSColumn3D.swf", 'f'+new Date().getTime(), "500", len>8?"420":"360", "0", "1");
		chart.setXMLData(strXML);
		chart.render(container);
		trace('over column');
	},
	renderZoomLine:function(data,container,srows,name,zoomline2){
		
		var strXML;
	    //Add root elements
	    strXML = "<chart caption='"+this.param.title+"' compactDataMode='1' dataSeparator='|' divLineAlpha='40' vDivLineAlpha='40' allowPinMode='1'";
	    //Add categories starting tag
	    strXML += ">\n<categories>"
	    //Build the categories first
	    data=data||HE.cacheData['lastZoomLineData'];
	    HE.cacheData['lastZoomLineData']=data;
	    if(zoomline2){
	    	data=data||HE.cacheData['lastZoomLineData2'];
	    	HE.cacheData['lastZoomLineData2']=data;
		}
	    var len=data.id.length;
	    for (var i=0; i<len; i++) {
	        strXML += data['id'][i]+((i<(len-1)) ? "|" : "");
	    }
	    strXML += "</categories>\n";
	    //Add the dataset and data items
	    var keycount=0;
	    for (var k in data) {
	        if(k=='id')continue;
	        if(srows&&srows[k])continue;//过滤掉不显示的那些
	        strXML += "<dataset seriesName='"+k+"' >\n";
	        for (var j=0; j<len; j++) {
	            //Add the <set> items
	            strXML += data[k][j]+((j<(len-1)) ? "|" : "");
	        }
	        strXML += "</dataset>";
	        keycount++;
	    }
	    strXML += "</chart>";
	    //alert(strXML);
	    var chart = new FusionCharts("swf/ZoomLine.swf", 'f'+new Date().getTime(), "960", keycount>8?"800":"400", "0", "1");
	    chart.setXMLData(strXML);
	    chart.render(container);
	}
	
};