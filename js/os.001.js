function os_fm(callback){
	var filePath = {
		js : GA.platform.staticServer+GA.platform.snsJSFile,
		css :	GA.platform.staticServer+GA.platform.snsCSSFile
	};
	//load css
	os_loadCSS(filePath.css);

	//insert html temp
	var loadIcon = GA.platform.staticServer + '/images/loading.gif';		
	var obj = document.getElementById('ga_canvas');	
	obj.innerHTML = '<img src="'+loadIcon+'">';

	var callbacks = function(init){
			os_loadJS(filePath.js.sns,init);
		};
	
	//load js
	var jsFiles = [filePath.js];
	os_loadJSArray(jsFiles,function(){
		callbacks(function(){
			if(callback){
				callback(obj);
			}
		});
	});
}
function os_loadJSArray(pathArr,callback){
	var steps = 0,len = pathArr.length;			
	for(var i=0;i<len;i++){
		os_loadJS(pathArr[i],callbacks);
	}
	function callbacks(){
		steps += 1;
		if(steps == len){
			callback();
		}
	}
}
function os_loadCSS(link){
	var node = document.createElement("link");
	node.href = link;
	node.type = "text/css";
	node.rel = "stylesheet";
	document.getElementsByTagName('head')[0].appendChild(node); 
}
function os_loadJS(link,callback){
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
}

var gip = {};
var fm = {};


os_fm();

