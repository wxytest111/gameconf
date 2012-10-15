<?php
/**
 * @fileoverview 输出浏览器访问统计信息,访问的文件是minutely/browser/xxxxxx.dat
 * @author xinyu.wang
 */
//header("Content-type:text/javascript;charset=utf-8;");
require_once($_SERVER['DOCUMENT_ROOT'].'/tv_disp/freechart/common.inc.php');

require_once(BASE_DIR.'/AutoFrame.class.php');

$period = $_GET['period'];

new AutoFrame();
new Functions();
$ws=new Browser();

$date = empty($_GET['date'])?date("Ymd"):$_GET['date'];
$date2  = empty($_GET['date2'])?'':$_GET['date'];

$res1=$ws->getMinutelyInfo($date);
$res=array();
if(!empty($date2)){
	array_push($res,$res1);
	$res2=$ws->getMinutelyInfo($date2);
	array_push($res,$res2);
	Functions::expData('success',$res);
}else{
	Functions::expData($res1['ret'],$res1['data']);
}

