<?php 
/**
 * @fileoverview 输出同平台的不同APP接口调用次数和相应的请求延迟，访问的是minutely/app/xxxxxx/xxxx.dat
 * @author xinyu.wang
 */
//header("Content-type:text/javascript;charset=utf-8;");
require_once($_SERVER['DOCUMENT_ROOT'].'/tv_disp/freechart/common.inc.php');

require_once(BASE_DIR.'/AutoFrame.class.php');

$period = empty($_GET['period'])?"minutely":$_GET['period'];
$platform = empty($_GET['selvalue'])?"facebook":$_GET['selvalue'];
new AutoFrame();
new Functions();
$ws=new PlatformFuncFrequency();

$date = empty($_GET['date'])?date("Ymd"):$_GET['date'];
$date2  = empty($_GET['date2'])?'':$_GET['date'];

$res1=$ws->getMinutelyInfo($date,$platform);
$res=array();
if(!empty($date2)){
	array_push($res,$res1);
	$res2=$ws->getMinutelyInfo($date2,$platform);
	array_push($res,$res2);
	Functions::expData('success',$res);
}else{
	Functions::expData($res1['ret'],$res1['data']);
}
?>
