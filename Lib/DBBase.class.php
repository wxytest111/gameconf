<?php

class DBBase{
	private $conn;
	private $result;
	public function __construct($param){
		//$mysqli=new mysqli();
		$this->conn=mysqli_connect($param['host'],$param['username'],$param['pwd'],$param['dbname'],$param['port']);
		//if(!$this->conn) echo mysqli_connect_errno();
		if(mysqli_connect_error())echo mysqli_connect_error();
		
		if(!$this->conn) throw new DbException('Db config not found:'.$param['host'],'5');
	}
	
	public function queryArray($sql,$action='select',$type=MYSQLI_STORE_RESULT){
		$this->result=$this->conn->query($sql,$type);
		if($action=='select'){
			$arr=array();
			if($this->result){
				while($row=$this->result->fetch_array(MYSQLI_ASSOC)){
					$arr[]=$row;
				}
				$this->result->free();
			}
			return $arr;
		}else{
			return $this->conn->affected_rows;
		}
		
		
	}
	public function lastOperation(){
		return $this->conn->affected_rows();
	}
	public function free(){
		if($this->result)$this->result->free();
	}
	public function close(){
		if($this->conn)
			$this->conn->close();
	}
}