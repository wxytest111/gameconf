<?php
class DbException extends BaseException{

    public function __construct($message,$code=0){
        parent::__construct(' [ Db ] '.$message,$code);
    }

    
}
