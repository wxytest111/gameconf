<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/common.inc.php');

require_once(BASE_DIR.'/AutoFrame.class.php');
new AutoFrame();
new Functions();

$src = $_REQUEST['src'];
if(empty($src)){
	Functions::gotoPage('error');
	exit;
}

switch($src){
	case "user":
		$param=array();
		$param['platform']=$_REQUEST['platform'];
		$param['name']=$_REQUEST['username'];
		$param['is_test']=$_REQUEST['istest'];
		$u=new User(SysInfo::$dbconf);
		
		if($u->addUser($param)){
			Functions::gotoPage($src);
		}else{
			Functions::gotoPage('error');
		}
		break;
	case "basethings":
		$param=array();
		$param['type']=$_REQUEST['type'];
		$param['name']=$_REQUEST['thingname'];
		$param['width']=$_REQUEST['width'];
		$param['height']=$_REQUEST['height'];
		$param['desc']=$_REQUEST['desc'];
		$param['thumb']=$_REQUEST['thumb'];
		
		$u=new BaseThings(SysInfo::$dbconf);
		
		if($u->addBaseThings($param)){
			Functions::gotoPage($src);
		}else{
			Functions::gotoPage('error');
		}
		break;
	case "baseproperty":
		$param=array();
		$param['type']=$_REQUEST['type'];
		$param['name']=$_REQUEST['propertyname'];
		$param['lowerlimit']=$_REQUEST['lowerlimit'];
		$param['uplimit']=$_REQUEST['uplimit'];
		$param['formula']=$_REQUEST['formula'];
		$param['desc']=$_REQUEST['desc'];
		$u=new BaseProperty(SysInfo::$dbconf);
		
		if($u->addBaseProperty($param)){
			Functions::gotoPage($src);
		}else{
			Functions::gotoPage('error');
		}
		break;
	case "userequipment":
		$param=array();
		//print_r($_POST);
		$param['user_id']=$_REQUEST['user_id'];
		$param['base_thing_id']=$_REQUEST['base_thing_id'];
		$param['level']=$_REQUEST['level'];
		$param['use_level']=$_REQUEST['use_level'];
		$param['is_treasure']=$_REQUEST['is_treasure'];
		$param['desc']=$_REQUEST['desc'];
		$property=$_REQUEST['property'];
		$propertylevel=$_REQUEST['propertylevel'];
		$res=array();

		$bs_properties=array();
		$count=0;
		foreach ($property as $v){
			$bs_properties[$count]=array('bs_id'=>$v);
			$count++;
		}
		$count=0;
		foreach ($propertylevel as $v){
			$bs_properties[$count]['bs_level']=$v;
			$count++;
		}
		foreach($bs_properties as $v){
			if($v['bs_id']=='null')continue;
			$res[]=$v;
		}
		//print_r($res);
		//exit;
		$param['bs_properties']=json_encode($res);
		$u=new UserEquipment(SysInfo::$dbconf);
		if($u->addUserEquipment($param)){
			Functions::gotoPage($src);
		}else{
			Functions::gotoPage('error');
		}
		exit;
		break;
}
