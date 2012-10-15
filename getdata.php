<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/common.inc.php');
$appid=$_GET['appid'];
$platform=$_GET['platform'];
if(empty($platform)||empty($appid)){
	echo 'param error!';
	exit;
}
$file=$CONFIGFILEROOT.'/'.$platform.'/'.$appid.'.xml';
$content=file_get_contents($file);

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>修改配置</title>
<link rel="stylesheet" href="css/main.css" type="text/css" />
<style type="text/css">

</style>
</head>
<body>
	<div class="wrap">
		<div class="head">
			<div class="head_inner">
				<div class="logo"></div>
				<div class="nav" id="tab_nav">
					<a href="javascript:;">配置管理</a>
				</div>
			</div>
		</div>
		<form method=post action="/api/editconf.php">
			<div class="content">
				<div class="condition">
					注释：<input type="text" size=20 name="note" />&nbsp;&nbsp;<input
						type="button" id="btncommit" value="提交" />
				</div>
				<div class="tips hide" id="tips"></div>
				<textarea name="content" id="content" class='confarea'><?php echo $content?></textarea>
			</div>
		</form>
		<div class="foot">Copyright (c) 2012 GemAlchemy</div>
	</div>
</body>
<script type="text/javascript" src="js/lib_1.js"></script>
<script type="text/javascript">
HE.addEvent(HE.$('#btncommit'),'click',function(){
	var content=HE.$('#content').value;
	HE.ajax({
		url:"/api/editconf.php",
		method:'post',
		data:{
			content:content,
			appid:'<?php echo $appid;?>',
			platform:'<?php echo $platform;?>'
		}
	},function(d){
		
		if(d.ret=='success'){
			var tips=HE.$('#tips');
			tips.innerHTML='修改成功!';
			HE.removeClass(tips,'hide');
			setTimeout(function(){HE.addClass(tips,'hide');},5*1000);
		}else{
			alert(d.ret+';reason='+d.data);
		}
	});
});
</script>
</html>
