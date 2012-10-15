<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/common.inc.php');
require_once(BASE_DIR.'/AutoFrame.class.php');
new AutoFrame();
new Functions();


$id=$_GET['id'];
if(empty($id)){
	Functions::expData('error','no user id');
}
$re=array();
$u=new User(SysInfo::$dbconf);
$user=$u->getUserById($id);
if(count($user)==0){
	Functions::expData('error','no user find');
}
$re['userid']=$user['id'];
$re['name']=$user['id'];
$re['equip']=array();
$uep=new UserEquipment(SysInfo::$dbconf);
$ueplist=$uep->getUserEquipmentByUserId($id);

$bsth=new BaseThings(SysInfo::$dbconf);
$bsp=new BaseProperty(SysInfo::$dbconf);

foreach($ueplist as $value){
	$ep=array();
	$ep['id']=$value['ep_id'];
	$ep['base_thing']=$bsth->getBaseThingsById($value['base_thing_id']);
	$ep['is_treasure']=$value['is_treasure'];
	$ep['level']=$value['level'];
	$ep['use_level']=$value['use_level'];
	$ep['desc']=$value['desc'];
	$bs_properties=json_decode($value['bs_properties']);
	$bs_arr=array();
	foreach($bs_properties as $v){
		$bs=array();
		$bs['property']=$bsp->getBasePropertyId($v->bs_id);
		$bs['level']=$v->bs_level;
		$bs_arr[]=$bs;
	}
	$ep['bs_properties']=$bs_arr;
	$re['equip'][]=$ep;
}
Functions::expData('success',$re);