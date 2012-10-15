<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/common.inc.php');

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>GIP监控统计</title>
<link rel="shortcut icon" type="image/ico" href="favicon.ico" />
<link rel="stylesheet" href="css/freechart.css" type="text/css" />
<style type="text/css"> 
*{margin:0;padding:0;list-style:none;font-size:12px; font-family:Arial, Helvetica, sans-serif; line-height:20px;}
table {border-collapse:collapse;border-top:3px solid #ccc;width:100%;clear:both;}
th,td {border-bottom:1px solid #ccc;padding:6px 10px 6px 5px;text-align:left; white-space:nowrap;color:#666;}
th {width:100px; white-space:nowrap;}
tr:hover { background:#f5f5f5;}
tr:hover a,tr:hover td,tr:hover th {color:#000;}
tr.testing {background:#ddd;}
thead td { background:#f5f5f5; font-weight:700;}
a:hover { text-decoration:underline;color:#0F0}
em {color:#cd0000;}
h1 { font-size:14px; line-height:30px; padding-bottom:10px;float:left;}
.note ol,.close {display:none;}
.note h2 {float:right;}
.note_hover {position:relative;}
.note_hover ol {display:block;position:absolute;right:0;top:18px;border:1px solid #ccc;padding:10px;background:#f5f5f5;width:300px;}
.note_hover .close {font-family:verdana;font-size:12px;display:block;position:absolute;right:8px;top:25px;z-index:7;}
.proxy {float:right;text-align:right;padding:0 10px 10px 0;}
.content{width:960px;color:black;}
.content .rows div{float:left;}
.title {width:960px;font-size:18px;line-height:28px;text-align:center;}
.condition{width:960px;}
</style>

</head>
<body>
<div class="wrap">
	<div  class="head">
		<div class="head_inner">
			<div class="logo"><a href="#"><img src="../images/logo.jpg" alt="logo"/></a></div>
			<div class="nav" id="tab_nav">
				<a href="/">首页</a>
			</div>
		</div>
	</div>
	<div  class="content">
		<div class="left" id="left">
			<div class="list">
				<div class="x_head">
					<h2>配置修改</h2>
				</div>
				<div class="x_box">
				<div class="x_list">
					<a href="<?php echo $baseurl.'getdata.php?appid=10001&platform=qzone'?>" >修改Qzone平台配置</a>
				</div>
				</div>
				<div class="x_foot"></div>
			</div>
			<div class="list">
				<div class="x_head">
					<h2>物品增加</h2>
				</div>
				<div class="x_box">
				
				<div class="x_list">
					<a href="<?php echo $baseurl.'tools/add.php?src=user'?>" >增加用户</a>
				</div>
				<div class="x_list">
					<a href="<?php echo $baseurl.'tools/add.php?src=basethings'?>" >增加基本物品</a>
				</div>
				<div class="x_list">
					<a href="<?php echo $baseurl.'tools/add.php?src=baseproperty'?>" >增加词缀</a>
				</div>
				<div class="x_list">
					<a href="<?php echo $baseurl.'tools/add.php?src=userequipment'?>" >增加物品</a>
				</div>
				</div>
				<div class="x_foot"></div>
			</div>
			
			
		</div>
		<div class="right">
			
		</div>
	</div>
	<div  class="foot">Copyright (c)  2011 Happyelements</div>
	</div>
</div>
<script type="text/javascript" src="js/lib_0_2.js"></script> 
<script type="text/javascript" src="js/common.js"></script> 
<script type="text/javascript" src="js/swfobject.js"></script>
<script type="text/javascript" src="js/main.js"></script>
</body>
</html>
