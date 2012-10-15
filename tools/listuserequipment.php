<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/common.inc.php');

require_once(BASE_DIR.'/AutoFrame.class.php');
new AutoFrame();
new Functions();

$u=new UserEquipment(SysInfo::$dbconf);
$rows=$u->getAllUserEquipment();
$user=new User(SysInfo::$dbconf);
$bsth=new BaseThings(SysInfo::$dbconf);
$bsp=new BaseProperty(SysInfo::$dbconf);
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>用户物品列表</title>
<link rel="stylesheet" href="../css/main.css" type="text/css" />
<link rel="stylesheet" href="../css/r.css" type="text/css" />
</head>
<body >
<div class="ifmcontent wd590">
<div>
<table align="center" border="0" rules="rows" cellspacing="1" cellpadding="1">
<tr>
<th></th><th class="wd54">id</th><th class="wd90">所属用户</th><th class="wd140">物品名称</th><th class="wd140">词缀们</th><th class="wd54">等级</th><th class="wd54">使用等级</th><th class="wd54">是否稀有</th><th class="wd54">描述</th>
</tr>
<?php foreach($rows as $value){
	$id=$value['ep_id'];
	$user_id=$value['user_id'];
	$username=$user->getUserById($user_id);
	$base_thing_id=$value['base_thing_id'];
	$thingname=$bsth->getBaseThingsById($base_thing_id);
	$is_treasure=($value['is_treasure']==0?'否':'是');
	$level=$value['level'];
	$use_level=$value['use_level'];
	$desc=$value['desc'];
	$bs_properties=json_decode($value['bs_properties']);
	$bstr='';
	$count=1;
	foreach($bs_properties as $v){
		$bsname=$bsp->getBasePropertyId($v->bs_id);
		$bstr.='词缀'.$count++.':名字-"'.$bsname['name'].'",';
		$bstr.='等级-'.$v->bs_level.';';
		
	}
	echo "<tr><td><input _id=\"$id\" _type=\"userequipment\" type=button  value=\"删除\" /></td><td>$id</td><td>".$username['name']."</td><td>".$thingname['name']."</td><td>".$bstr."</td><td>$level</td><td>$use_level</td><td>$is_treasure</td><td>$desc</td></tr>";
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