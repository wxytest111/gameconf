<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/common.inc.php');
require_once(BASE_DIR.'/AutoFrame.class.php');
new AutoFrame();
new Functions();

$type=$_GET['type'];
$id=$_GET['id'];
if(empty($type)||empty($id)){
	Functions::expData('error','param error');
}

switch ($type){
	case 'user':
		$u=new User(SysInfo::$dbconf);
		break;
	case 'userequipment':
		$u=new UserEquipment(SysInfo::$dbconf);
		break;
	case 'basething':
		$u=new BaseThings(SysInfo::$dbconf);
		break;
	case 'baseproperty':
		$u=new BaseProperty(SysInfo::$dbconf);
		break;
}

$res=$u->delById($id);

if($res){
	Functions::expData('success','');
}else{
	Functions::expData('error','del error');
}