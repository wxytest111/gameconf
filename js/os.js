var PM = {};

PM.create=function(){
	return function(){
		this.initialize.apply(this, arguments);
	}
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
PM.fireEvent=function(obj, sEvent){
	if(PM.$IE) {  
		obj.fireEvent('on' + sEvent);  
	}
	else{  
		var evt = document.createEvent('HTMLEvents');  
		evt.initEvent(sEvent,true,true);  
		obj.dispatchEvent(evt);  
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

PM.bindFunc3=function(fFunc, object, args) { 
	args = args == null? []: args;
	var __method = fFunc; 
	return function() { 
	 return __method.apply(object, args); 
	};
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
		
		if(this.param.type=='userperformance'){//特殊处理，因为页面上有很多很多
			this.date=date||new Date().getFullYear()+'-'+((new Date().getMonth()+1)>10?(new Date().getMonth()+1):'0'+(new Date().getMonth()+1))+'-'+((new Date().getDate()-1)>10?(new Date().getDate()-1):'0'+(new Date().getDate()-1));
			d.date=this.date.replace(/\-/g,'');
			this.loadData(this.param.url,d,PM.bindFunc(this.rendarMoreColumn,this));
		}else{
			this.loadData(this.param.url,d,PM.bindFunc(this.rendarChart,this));
		}
	},
	createHTML:function(){
		var linediv = HE.$('#linediv');
		var piediv = HE.$('#piediv');
		switch (this.param.type){
		case "browser":
		case "userperformance":
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
			if(_this.param.type=='userperformance'){
				_this.loadData(_this.param.url,d,PM.bindFunc(_this.rendarMoreColumn,_this));
			}else{
				_this.loadData(_this.param.url,d,PM.bindFunc(_this.rendarChart,_this));
			}	
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
			//alert("error,reason:"+d.data);
		}
	},
	rendarMoreColumn:function(d){
		date=date||this.date.replace(/\-/g,'');
		if(d.ret=='success'){
			var obj={};
			var s=new Array();
			var series={};
			var keys=new Array();
			var len=d.data.rows.length;
			var arr=d.data.rows;
			var sortarr=new Array();
			var tmparr=new Array();
			for(var i=0;i<arr.length;i++){
				var row=arr[i];
				if(row.id.indexOf('fb')>0){
					sortarr.push(row);
				}else{
					if(/(orkut)|(vz)|(hyves)|(hangame)|(daum)|(cyworld)|(minik)|(netlog)|(qa)/i.test(row.id)||/^\d+\:$/i.test(row.id)||/^\-/i.test(row.id))continue;
					tmparr.push(row);
				}
			}
			arr=sortarr.concat(tmparr);
			var piediv=HE.$('#piediv');
			piediv.innerHTML='';
			var count=0;
			for(var i=0;i<arr.length;i++){
				var div=PM.$c('div');
				var ids=new Date().getTime();
				div.innerHTML="<p><span _ids='mc_"+ids+"' _ids2='mc2_"+ids+"'>数值</span><span _ids='mc2_"+ids+"' _ids2='mc_"+ids+"'>占比</span></p><div id='mc_"+ids+"'></div><div id='mc2_"+ids+"' class=\"hide\"></div>";
				piediv.appendChild(div);
				var row=arr[i];
				var data={};
				var data2={};
				data.id='_'+row.id+'_';
				data2.id='_'+row.id+'_';
				data.data=[];
				data2.data=[];
				var eles=row.s.split('&');
				for(var j=0;j<eles.length;j++){
					data.data[data.data.length]={"status":eles[j].split('=')[0],"count":eles[j].split('=')[1].split('|')[0]};
					data2.data[data2.data.length]={"status":eles[j].split('=')[0],"count":eles[j].split('=')[1].split('|')[1]};
				}
				trace(data.id);
				trace(data);
				this.renderColumn(data,HE.$('#mc_'+ids),{name:row.id,width:'960'});
				this.renderColumn(data2,HE.$('#mc2_'+ids),{name:row.id,width:'960'});
				count++;
				//if(count>2)break;
				
			}
			this.tabSpan();
		}else{
			//alert("error,reason:"+d.data);
		}
	},
	tabSpan:function(){
		var spans=HE.$('div.rows p span');
		HE.array.forEach(spans,function(span){
			HE.addEvent(span,'click',function(){
				var ids=HE.getProp(span,'_ids');
				HE.removeClass(HE.$('#'+ids),'hide');
				var ids2=HE.getProp(span,'_ids2');
				HE.addClass(HE.$('#'+ids2),'hide');
			});
			
		})
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
	renderColumn:function(data,container,params){
		//trace('in column');
		var params=params||{};
		var d=new Array();
		var strXML;
		strXML = "<chart caption='"+data.id+"' formatNumberScale='0' numberPrefix='' animation='1' showValues='1' rotateValues='1' placeValuesInside='1'>";
		strXML = strXML + "<categories><category name='"+(params.name||this.param.title)+"' /></categories>";
		var len=data.data.length;
		for(var i=0;i<len;i++){
			var d=data.data[i];
			strXML+="<dataset seriesName='"+d['status']+"' ><set value='"+d['count']+"' /></dataset>";
		}
		strXML = strXML + "</chart>";
		trace(strXML);
		var chart = new FusionCharts("swf/MSColumn3D.swf", 'f'+new Date().getTime(), params.width||"500", len>8?"420":"360", "0", "1");
		chart.setXMLData(strXML);
		chart.render(container);
		//trace('over column');
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

PM.webStatus=PM.create();
PM.webStatus.prototype={
	initialize:function(cnt,param){
		this.param=param||{};
		this.date=param.date||new Date().getFullYear()+'-'+((new Date().getMonth()+1)>10?(new Date().getMonth()+1):'0'+(new Date().getMonth()+1))+'-'+(new Date().getDate()>10?new Date().getDate():'0'+new Date().getDate());
		this.cnt=cnt;
		this.twoLines=(this.param.type=='funcfrequency'||this.param.type=='appfunc'||this.param.type=='platformfunc');
		this.createHTML();
		this.setEvent();
		
		var d={"period":"minutely","date":this.date.replace(/\-/g,''),"src":this.param.src||''};
		this.loadData(this.param.url,d,PM.bindFunc(this.rendarChart,this));

	},
	createHTML:function(){
		var randId=new Date().getTime();
		this.linediv = PM.$c('div');
		this.linediv.id='linediv';
		this.piediv = PM.$c('div');
		this.piediv.id='piediv';
		this.cnt.appendChild(this.linediv);
		this.cnt.appendChild(this.piediv);
		var datediv=PM.$c('div');
		datediv.innerHTML='选择需要对比的两天(不选则默认今天)：第一天<input class="borders" type="text" id="dateChoice1" onclick="MyCalendar.SetDate(this);"/>&nbsp;&nbsp;第二天<input class="borders" type="text" id="dateChoice2" onclick="MyCalendar.SetDate(this);"/>&nbsp;&nbsp;<input type="button" value="确定"/>';
		datediv.className='condition';
		this.param.mzl_1_name?this.linediv.appendChild(datediv):'';
		this.optiondiv=PM.$c('div');
		this.optiondiv.className='condition';
		this.param.mzl_1_name?this.linediv.appendChild(this.optiondiv):'';
		this.mzl_1=PM.$c('div');
		this.mzl_1.id='mzl_1_'+randId;
		this.linediv.appendChild(this.mzl_1);
		this.mzl_2=PM.$c('div');
		this.mzl_2.id='mzl_2_'+randId;
		this.linediv.appendChild(this.mzl_2);
		this.mp_1=PM.$c('div');
		this.mp_1.id='mp_1_'+randId;
		this.piediv.appendChild(this.mp_1);
		this.mc_1=PM.$c('div');
		this.mc_1.id='mc_1_'+randId;
		this.piediv.appendChild(this.mc_1);
		this.datechoice1=HE.$('input',datediv)[0];
		this.datechoice2=HE.$('input',datediv)[1];
		this.datebutton=HE.$('input',datediv)[2];
	},
	setEvent:function(){
		HE.addEvent(this.datebutton,'click',PM.bindFunc(this.compareLine,this));
	},
	loadData:function(url,param,callback){
		date=param.date||this.date.replace(/\-/g,'');
		var _this=this;
		if(HE.cacheData&&HE.cacheData[this.param.src+'_'+this.param.type]&&HE.cacheData[this.param.src+'_'+this.param.type][date]){
			if(callback)
				callback(HE.cacheData[this.param.src+'_'+this.param.type][date],date);
		}else{
			HE.ajax({
				url:url,
				data:param
			},function(d){
				if(HE.cacheData)
					HE.cacheData[_this.param.src+'_'+_this.param.type]={};
				HE.cacheData[_this.param.src+'_'+_this.param.type][date]=d;
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
			series['date']=d.data.date;
			if(this.twoLines){series2['id']=series['id'];series2['date']=d.data.date;}
			trace(series);
			obj.data=s;
			obj.id=d.data.date;
			var id=new Date().getTime();
			HE.trace(this.param);

			this.param.mp_1_name?PM.renderPie(obj,this.mp_1.id,{name:this.param.mp_1_name}):'';
			this.param.mc_1_name?PM.renderColumn(obj,this.mc_1.id,{name:this.param.mc_1_name}):'';
			this.param.mzl_1_name?this.renderChecks(this.optiondiv,obj.data):'';
			this.param.mzl_1_name?PM.renderZoomLine(series,this.mzl_1.id,{name:this.param.mzl_1_name,src:this.param.src,type:this.param.type}):'';
			if(this.twoLines){
				this.param.mzl_2_name?PM.renderZoomLine(series2,this.mzl_2.id,{name:this.param.mzl_2_name,zoomline2:true,src:this.param.src,type:this.param.type}):'';
			}
			
		}else{
			this.cnt.innerHTML=d.data;
			//alert("error,reason:"+d.data);
		}
	},
	compareLine:function(){
		var _this=this;
		var date1=this.datechoice1.value;
		date1=date1==''?today:date1;
		
		var date2=this.datechoice2.value;
		date2=date2==''?today:date2;
		
		var par={"period":"minutely","date":date1.replace(/\-/g,""),"src":this.param.src||''};
		
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
				series['date']=res1key+' vs '+res2key;
				_this.renderChecks(_this.optiondiv,obj.data);
				
				PM.renderZoomLine(series,_this.mzl_1.id,{name:_this.param.mzl_1_name,src:this.param.src,type:this.param.type});
				if(_this.twoLines){
					series2['date']=res1key+' vs '+res2key;
					PM.renderZoomLine(series2,_this.mzl_2.id,{name:_this.param.mzl_2_name,zoomline2:true,src:this.param.src,type:this.param.type});
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
		var checks=HE.$('input',this.optiondiv);
		var srows={};
		HE.array.forEach(checks,function(chk){
			srows[chk.value]=false;
			HE.addEvent(chk,'click',function(){
				if(this.checked)srows[this.value]=false;
				else srows[this.value]=true;
				trace('id='+_this.mzl_1.id);
				_this.param.mzl_1_name?PM.renderZoomLine(null,_this.mzl_1.id,{name:_this.param.mzl_1_name,srows:srows,src:_this.param.src,type:_this.param.type}):'';
				if(_this.twoLines){
					_this.param.mzl_2_name?PM.renderZoomLine(null,_this.mzl_2.id,{name:_this.param.mzl_2_name,srows:srows,zoomline2:true,src:_this.param.src,type:_this.param.type}):'';
				}
			});
		});
	}
};

PM.renderColumn=function(data,container,params){
	var params=params||{};
	var d=new Array();
	var strXML;
	strXML = "<chart caption='"+(params.name+'|'+data.id)+"' formatNumberScale='0' numberPrefix='' animation='1' showValues='1' rotateValues='1' placeValuesInside='1'>";
	strXML = strXML + "<categories><category name='"+params.name+"' /></categories>";
	var len=data.data.length;
	for(var i=0;i<len;i++){
		var d=data.data[i];
		strXML+="<dataset seriesName='"+d['status']+"' ><set value='"+d['count']+"' /></dataset>";
	}
	strXML = strXML + "</chart>";
	var width=params.width||600;
	var height=params.height||460;
	len>8?(height+=160):'';
	var chart = new FusionCharts("swf/MSColumn3D.swf", 'f'+new Date().getTime(), width, height, "0", "1");
	chart.setXMLData(strXML);
	chart.render(container);
};
PM.renderPie=function(data,container,params){
	var params=params||{};
	var str='<chart caption="'+(params.name+'|'+data.id)+'" showLegend="1" legendPosition="RIGHT" showLabels="0"  numberPrefix="%">';
	var len=data.data.length;
	for(var i=0;i<len;i++){
		var d=data.data[i];
		str+='<set label="'+d["status"]+'" value="'+d["ratio"]+'" />';
	}
	str+='</chart>';
	var width=params.width||600;
	var height=params.height||460;
	len>8?(height+=160):'';
	var myChart=new FusionCharts("swf/Pie3D.swf",'f'+new Date().getTime(),width,height,"0","1");
	myChart.setXMLData(str);
	myChart.render(container);
};
PM.renderZoomLine=function(data,container,params){
	var params=params||{};
	data=data||HE.cacheData[params.src+'_'+params.type]['lastZoomLineData'];
    HE.cacheData[params.src+'_'+params.type]['lastZoomLineData']=data;
    if(params.zoomline2){
    	data=data||HE.cacheData[params.src+'_'+params.type]['lastZoomLineData2'];
    	HE.cacheData[params.src+'_'+params.type]['lastZoomLineData2']=data;
    }
	var params=params||{};
	var strXML;
    //Add root elements
    strXML = "<chart caption='"+(params.name+'|'+data.date)+"' compactDataMode='1' dataSeparator='|' divLineAlpha='40' vDivLineAlpha='40' allowPinMode='1'";
    //Add categories starting tag
    strXML += ">\n<categories>"
    //Build the categories first
   
    var len=data.id.length;
    for (var i=0; i<len; i++) {
        strXML += data['id'][i]+((i<(len-1)) ? "|" : "");
    }
    strXML += "</categories>\n";
    //Add the dataset and data items
    var keycount=0;
    for (var k in data) {
        if(k=='id'||k=='date')continue;
        if(params.srows&&params.srows[k])continue;//过滤掉不显示的那些
        strXML += "<dataset seriesName='"+k+"' >\n";
        for (var j=0; j<len; j++) {
            //Add the <set> items
            strXML += data[k][j]+((j<(len-1)) ? "|" : "");
        }
        strXML += "</dataset>";
        keycount++;
    }
    strXML += "</chart>";
    var width=params.width||1200;
	var height=params.height||400;
	keycount>8?(height+=400):'';
    var chart = new FusionCharts("swf/ZoomLine.swf", 'f'+new Date().getTime(), width, height, "0", "1");
    chart.setXMLData(strXML);
    chart.render(container);
};

PM.hmenu=PM.create();
PM.hmenu.prototype={
	data:null,
	initialize:function(cnt,cnt2,param){
		this.param=param;
		this.cnt=cnt;
		this.cnt2=cnt2;
		this.createDom();
	},
	createDom:function(){
		var ul=PM.$c('ul');
		this.lis=[];
		this.divs=[];
		for(var i=0;i<this.param.length;i++){
			var o=this.param[i];
			var li=PM.$c('li');
			li.className=o.current?'current':'';
			var anchor=PM.$c('a');
			anchor.href="javascript:;";
			anchor.innerHTML=o.name;
			HE.setProp(anchor,'_id',o.id);
			PM.addEvent(anchor,PM.bindFunc3(o.func,this,[o.id]));
			this.lis[this.lis.length]=li;
			li.appendChild(anchor);
			ul.appendChild(li);
			
			var div=PM.$c('div');
			div.className='rows';
			div.id=o.id;
			this.divs[this.divs.length]=div;
			o.current?'':HE.addClass(div,'hide');
			this.cnt2.appendChild(div);
			o.current?o.func(o.id):'';
			
		}
		this.cnt.appendChild(ul);
		this.setEvent();
	},
	switchTab:function(time){
		var _this=this;
		var time=time||30;
		setInterval(function(){
			for(var i=0;i<_this.lis.length;i++){
				var li=_this.lis[i];
				if(HE.hasClass(li,'current')){
					if(i==(_this.lis.length-1)){
						PM.fireEvent(HE.$('a',_this.lis[0])[0],'click');
						break;
					}else{
						PM.fireEvent(HE.$('a',_this.lis[i+1])[0],'click');
						break;
					}
				}
			}
		},time*1000);
		
	},
	setEvent:function(){
		var _this=this;
		HE.array.forEach(this.lis,function(li){
			PM.addEvent(li,function(){
				HE.removeClass(HE.$('li.current',_this.cnt)[0],'current');
				HE.addClass(li,'current');
				var _id=HE.getProp(HE.$('a',li)[0],'_id');
				HE.array.forEach(_this.divs,function(div){
					HE.addClass(div,'hide');
					if(div.id==_id)HE.removeClass(div,'hide');
				});
			});
		});
	}
};

PM.userPerformance=PM.create();
PM.userPerformance.prototype={
		data:null,
		initialize:function(cnt,param){
			this.param=param||{};
			this.cnt=cnt;
			this.date=this.param.date||new Date().getFullYear()+'-'+((new Date().getMonth()+1)>10?(new Date().getMonth()+1):'0'+(new Date().getMonth()+1))+'-'+((new Date().getDate()-1)>10?(new Date().getDate()-1):'0'+(new Date().getDate()-1));
			this.createHTML();
			var d={"period":"minutely","date":this.date.replace(/\-/g,''),"src":this.param.src||''};
			trace(d);
			var _this=this;
			this.loadData(this.param.url,d,function(da){
				if(da.ret=='success'){
					var rows=da.data.rows;
					HE.cacheData[_this.param.type]['last']=rows;
					var vMenus=[];
					var t=HE.$('#src').value;
					var tmap={'facebook':'fb','tencent':'qq'};
					var keycount=0;
					for(var i=0;i<rows.length;i++){
						var r=rows[i];
						if(r.id.indexOf(tmap[t])<0)continue;
						keycount++;
						r.id=r.id.replace(':','');
						var o={};
						o.name=r.id;
						o.id=r.id;
						if(keycount==1)o.current=true;
						o.func=function(id){
							_this.hideAllFlash();
							var div=HE.$('#'+id);
							HE.show(div);
							var ids=new Date().getTime();
							div.innerHTML="<p><span class='borders' _ids='mc_"+ids+"' _ids2='mc2_"+ids+"'>数值</span><span class='borders' _ids='mc2_"+ids+"' _ids2='mc_"+ids+"'>占比</span></p><div id='mc_"+ids+"'></div><div id='mc2_"+ids+"' class=\"hide\"></div>";
							var data={};
							var data2={};
							var r='';
							for(var i=0;i<HE.cacheData[_this.param.type]['last'].length;i++){
								var tid=HE.cacheData[_this.param.type]['last'][i]['id'].replace(':','');
									if(tid==id){r=HE.cacheData[_this.param.type]['last'][i];break;}
								}
							data.id=_this.date;
							data2.id=_this.date;
							data.data=[];
							data2.data=[];
							var eles=r.s.split('&');
							for(var j=0;j<eles.length;j++){
								data.data[data.data.length]={"status":eles[j].split('=')[0],"count":eles[j].split('=')[1].split('|')[0]};
								data2.data[data2.data.length]={"status":eles[j].split('=')[0],"count":eles[j].split('=')[1].split('|')[1]};
							}
							PM.renderColumn(data,HE.$('#mc_'+ids),{name:r.id,width:'960'});
							PM.renderColumn(data2,HE.$('#mc2_'+ids),{name:r.id,width:'960'});
							_this.tabSpan(div);
							}
						vMenus[vMenus.length]=o;
					}
					
					HE.trace(vMenus);
					new PM.hmenu(_this.navdiv,_this.flashdiv,vMenus);
				}else{
					_this.cnt.innerHTML=da.data;
				}
			});
		},
		createHTML:function(){
			this.navdiv=PM.$c('div');
			this.navdiv.id='navcontainer';
			this.navdiv.className='wd170';
			this.cnt.appendChild(this.navdiv);
			this.flashdiv=PM.$c('div');
			this.flashdiv.id='flashcontent';
			this.flashdiv.className='wd1046';
			this.cnt.appendChild(this.flashdiv);
		},
		tabSpan:function(cnt){
			var spans=HE.$('span',cnt);
			HE.array.forEach(spans,function(span){
				HE.addEvent(span,'click',function(){
					var ids=HE.getProp(span,'_ids');
					HE.removeClass(HE.$('#'+ids),'hide');
					var ids2=HE.getProp(span,'_ids2');
					HE.addClass(HE.$('#'+ids2),'hide');
				});
				
			})
		},
		loadData:function(url,param,callback){
			date=param.date||this.date.replace(/\-/g,'');
			var _this=this;
			if(HE.cacheData&&HE.cacheData[this.param.type]&&HE.cacheData[this.param.type][date]){
				if(callback)
					callback(HE.cacheData[this.param.type][date],date);
			}else{
				HE.ajax({
					url:url,
					data:param
				},function(d){
					if(HE.cacheData)
						HE.cacheData[_this.param.type]={};
					HE.cacheData[_this.param.type][date]=d;
					if(callback)
						callback(d,date);
				});
			}
		},
		hideAllFlash:function(){
			var divs=HE.$('div.rows',HE.$('#flashcontent'));
			HE.array.forEach(divs,function(div){
				HE.hide(div);
				});
			}
};

