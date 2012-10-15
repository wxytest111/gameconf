<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/common.inc.php');

require_once(BASE_DIR.'/AutoFrame.class.php');
new AutoFrame();
new Functions();

$u=new BaseProperty(SysInfo::$dbconf);
$rows=$u->getAllBaseProperty();
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>基本词缀列表</title>
<link rel="stylesheet" href="../css/main.css" type="text/css" />
<link rel="stylesheet" href="../css/r.css" type="text/css" />
</head>
<body >
<div class="ifmcontent wd590">
<div>
<table align="center" border="0" rules="rows" cellspacing="1" cellpadding="1">
<tr>
<th></th><th class="wd90">id</th><th class="wd90">类型</th><th class="wd140">name</th><th class="wd120">公式</th><th class="wd140">描述</th><th>等级下限/上限</th>
</tr>
<?php foreach($rows as $value){
	$id=$value['id'];
	$type=SysInfo::$base_property_sort[$value['type']];
	$name=$value['name'];
	$desc=$value['desc'];
	$formula=$value['formula'];
	$size=$value['lowerlimit'].'*'.$value['uplimit'];
	echo "<tr><td><input type=button _id=\"$id\" _type=\"baseproperty\" value=\"删除\" /></td><td>$id</td><td>$type</td><td>$name</td><td>$formula</td><td>$desc</td><td>$size</td></tr>";
}?>
</table>
</div>
</div>
</body>
<script type="text/javascript" src="../js/lib_1.js"></script>
<script type="text/javascript">
var btns=HE.$('table input');
HE.array.forEach(btns,function(btn){
	HE.addEvent(btn,'click',function(){
		var url='/api/deleteitem.php';
		HE.ajax({
			url:url,
			data:{'id':HE.getProp(btn,'_id'),'type':HE.getProp(btn,'_type')}
		},function(d){
			if(d.ret=='success'){
					var tr=btn.parentNode.parentNode;
					tr.parentNode.removeChild(tr);
			}else{
				alert(d.data);
			}
		});
	})
	
});

</script>
</html>