<?php
class BaseException extends Exception{

    protected $msg;

    public function __construct($message,$code=0){
        parent::__construct($message,$code);
        if(php_sapi_name() == 'cli'){
            $this->msg = $this->getWorkerMessage();
        }
        else{
            $this->msg = $this->getWebMessage();
        }

    }

    public function logToErrorTracker(){
        $client   =  GearmanClientEngine::getInstance();
        $client   -> setTimeout(SystemConfig::GEARMAN_TIMEOUT);
        $info     = array('msg'=>json_encode($this->msg));
        $info     =  serialize($info);
        $client   -> addTask('LogToErrorTracker', $info, null, $this->msg['timestamp'].'_Error_out_put'.__CLASS__);
       // $client   -> runTasks();
    }

    public function __toString(){
        return var_export($this->msg,true);
    }
    
    public static function exception_handler($exception){
        throw new BaseException($exception);
    }

    public function microtime_float() {
        list($usec, $sec) = explode(" ", microtime());
        return ((float)$usec);
    }
    
    private function getWebMessage(){
        return array(
            'timestamp'=>date('Y-m-d-H-i-s').substr($this->microtime_float().'',1),
            'locationInfo'=>__CLASS__,
            'message'=>$this->code.": ".$this->message,
            'appName'=>'php_gip',
            'exceptionDetail'=>$this->getTraceAsString(),
            'hostName'=>$_SERVER['SERVER_ADDR'],
            'httpRequestMeta'=>array(
                'baseUrl'=>$_SERVER['REQUEST_URI'],
                'referUrl'=>isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '',
                'queryString'=>$_SERVER['QUERY_STRING'],
                'postParams'=>file_get_contents('php://input'),
                'userAgent'=>'',//$_SERVER['HTTP_USER_AGENT'],
                'clientIP'=>$_SERVER['REMOTE_ADDR'],
                'httpMethod'=>$_SERVER["REQUEST_METHOD"],
            ),
            'level'=>3,
        );
    }

    private function getWorkerMessage(){
        return array(
            'timestamp'=>date('Y-m-d-H-i-s').substr($this->microtime_float().'',1),
            'locationInfo'=>__CLASS__,
            'message'=>$this->code.": ".$this->message,
            'appName'=>'php_gip',
            'exceptionDetail'=>$this->getTraceAsString(),
            /*
            'hostName'=>$_SERVER['SERVER_ADDR'],
            'httpRequestMeta'=>array(
                'baseUrl'=>$_SERVER['REQUEST_URI'],
                'referUrl'=>isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '',
                'queryString'=>$_SERVER['QUERY_STRING'],
                'postParams'=>file_get_contents('php://input'),
                'userAgent'=>$_SERVER['HTTP_USER_AGENT'],
                'clientIP'=>$_SERVER['REMOTE_ADDR'],
                'httpMethod'=>$_SERVER["REQUEST_METHOD"],
            ),
            */
            'level'=>3,
        );
    }
    
}
