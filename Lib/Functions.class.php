<?php
/**
 * @fileoverview 该文件存放一些公共方法
 * @author xinyu.wang
 *
 */

class Functions{
	/**
	 * 输出结果给前端
	 * @param unknown_type $code
	 * @param unknown_type $data
	 */
	public static function expData($ret,$data=""){
		if ($data=="") {
			$arr = array('ret'=>$ret,'data'=>$data);
			$g_str = json_encode($arr) ;
		}
		else {
			$g_str = "{\"ret\":\"" .  $ret  . "\",data:" . json_encode($data) . "}" ;
		}
		$str = "" ;

		if (!empty($_GET["callback"])){
			//Avoid XSS
			$_GET["callback"] = str_replace(array("<",">"),"",$_GET["callback"]);
			$str = $_GET["callback"] . "(" . $g_str  .")" ;
		}
		else{
			$str = $str . $g_str ;
		}
		echo $str ;
		exit ;
	}

	public static function libxml_display_error($error)
	{
		$return = "<br/>\n";
		switch ($error->level) {
			case LIBXML_ERR_WARNING:
				$return .= "<b>Warning $error->code</b>: ";
				break;
			case LIBXML_ERR_ERROR:
				$return .= "<b>Error $error->code</b>: ";
				break;
			case LIBXML_ERR_FATAL:
				$return .= "<b>Fatal Error $error->code</b>: ";
				break;
		}
		$return .= trim($error->message);
		if ($error->file) {
			$return .=    " in <b>$error->file</b>";
		}
		$return .= " on line <b>$error->line</b>\n";

		return $return;
	}

	public static function libxml_display_errors() {
		$errors = libxml_get_errors();
		$err='';
		foreach ($errors as $error) {
			$err.=Functions::libxml_display_error($error);
		}
		libxml_clear_errors();
		return $err;
	}
	
	public static function gotoPage($page){
		switch ($page){
			case "error":
				header("Location:".SysInfo::baseurl."/error.php");
				break;
			case "user":
			case "basethings":
			case "baseproperty":
			case "userequipment":
				header("Location:".SysInfo::baseurl.SysInfo::$ifmsrc[$page]);
				break;
		}
		
	}

}