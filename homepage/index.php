<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/common.inc.php');
require_once(BASE_DIR.'/AutoFrame.class.php');

$platform=$_GET['platform'];
$appid=$_GET['appid'];

if(empty($platform)||empty($appid)){
	echo 'loaderror!please refresh!';
	exit;
}
new AutoFrame();
new Functions();
$file=$CONFIGFILEROOT.'/'.$platform.'/'.$appid.'.xml';
$dom = new DOMDocument();
try{
	$dom->load($file);
}catch(Exception $e){
	Functions::expData('error',"tag error");
}

libxml_use_internal_errors(true);
if(!$dom->schemaValidate($CONFIGFILEROOT.'/'.$platform.'/'.$appid.'.xsd')){
	$err=Functions::libxml_display_errors();
	Functions::expData('error',$err);
}

$export=array();
$export['app']=array();
$export['platform']=array();
$app=$dom->getElementsByTagName('app');
foreach($app as $elm){
	$ps=$elm->getElementsByTagName('p');
	foreach($ps as $e){
		$export['app'][$e->getAttribute('key')]=$e->nodeValue;
	}
}
$platform=$dom->getElementsByTagName('platform');
foreach($platform as $elm){
	$ps=$elm->getElementsByTagName('p');
	foreach($ps as $e){
		$export['platform'][$e->getAttribute('key')]=$e->nodeValue;
	}
}
//echo json_encode($export);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>GemAlchemy</title>
</head>
<body>
    <div id="ga_canvas"></div>
</body>
<script type="text/javascript">
var GA=<?php echo json_encode($export)?>;
(function(){
    var node = document.createElement("script");
    node.src = location.protocol+'//'+location.host+'/js/os.001.js';  
    document.getElementsByTagName('head')[0].appendChild(node); 
})();

</script>
</html>

