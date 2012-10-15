<?php
class AutoFrame{
	private $includePaths = array ();
	
	public function __construct(){
		array_push($this->includePaths,BASE_DIR.'/Lib',BASE_DIR.'/Model',BASE_DIR.'/Dao');
		if(method_exists($this,'__autoload')){
			spl_autoload_register(array($this,'__autoload'));
		}
	}
	
	public function __autoload($classname){
		foreach($this->includePaths as $path){
			$filename=$path.DIRECTORY_SEPARATOR.$classname.'.class.php';
			if(file_exists($filename)){
				require_once $filename;
				return true;
			}
		}
	}
}