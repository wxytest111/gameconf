<?php

class User{
	private $db;
	public function __construct($param){
		$this->db=new DBBase($param);
	}
	
	public function getUserById($id){
		$sql="select * from user where id='$id'";
		$res=$this->db->queryArray($sql);
		$r=array();
		if(count($res)>0){
			foreach($res[0] as $k=>$v)
			$r[$k]=$v;
		}
		return $r;
	}
	
	public function getAllUser(){
		$sql="select * from user";
		$res=$this->db->queryArray($sql);
		return $res;
	}
	
	public function getUserByType($is_test=0){
		$sql="select * from user where is_test=$is_test";
		$res=$this->db->queryArray($sql);
		return $res;
	}
	public function addUser($param){
		$id=$this->generateUserId($param['platform']);
		if($id==-1)
			return false;
		$sql="insert into user values('".($id+1)."',".$param['platform'].",'".$param['name']."',".$param['is_test'].");";
		echo $sql;
		$res=$this->db->queryArray($sql,'insert');
		if($res>0){
			return true;
		}else{
			return false;
		}
		
	}
	
	public function generateUserId($platform){
		$sql="select id from user where platform=$platform order by id desc limit 1 ;";
		$res=$this->db->queryArray($sql);
		if(count($res)>0)
			return $res[0]['id'];
		else
			return str_pad($platform,8,'0',STR_PAD_RIGHT);
	}
	
	public function delById($id){
		$sql="delete  from user where id='$id'";
		
		$res=$this->db->queryArray($sql,'delete');
		if($res>0){
			return true;
		}else{
			return false;
		}
	}
}