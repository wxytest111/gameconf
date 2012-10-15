<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/common.inc.php');
require_once(BASE_DIR.'/AutoFrame.class.php');


$appid=$_POST['appid'];
$platform=$_POST['platform'];
if(empty($platform)||empty($appid)){
	echo 'param error!';
	exit;
}

$content = empty($_POST['content'])?"":trim($_POST['content']);
new AutoFrame();
new Functions();


$file=$CONFIGFILEROOT.'/'.$platform.'/'.$appid.'.xml';
$dom = new DOMDocument();
try{
	$dom->loadXML($content);
}catch(Exception $e){
	Functions::expData('error',"tag error");
}

libxml_use_internal_errors(true);
if(!$dom->schemaValidate($CONFIGFILEROOT.'/'.$platform.'/'.$appid.'.xsd')){
	$err=Functions::libxml_display_errors();
	Functions::expData('error',$err);
}

$fp=fopen($file,"w+");
if(empty($fp))
Functions::expData('error','file not exist.');
fwrite($fp,$content);
fclose($fp);
Functions::expData('success','edit ok');

//echo $content;