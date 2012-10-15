<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/common.inc.php');
require_once(BASE_DIR.'/AutoFrame.class.php');
new AutoFrame();
new Functions();
try{
$db=new DBBase(array('host'=>'localhost','username'=>'root','pwd'=>'wxytest1','dbname'=>'gem','port'=>3306));
$res=$db->queryArray('select * from user');
print_r($res);
}catch (Exception $e){
	print_r($e);
}
