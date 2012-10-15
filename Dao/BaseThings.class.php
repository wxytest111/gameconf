<?php

class BaseThings{
	private $db;
	public function __construct($param){
		$this->db=new DBBase($param);
	}
	
	public function getBaseThingsById($id){
		$sql="select * from base_things where id='$id'";
		$res=$this->db->queryArray($sql);
		$r=array();
		if(count($res)>0){
			foreach($res[0] as $k=>$v)
			$r[$k]=$v;
		}
		return $r;
	}
	
	public function getAllBaseThings(){
		$sql="select * from base_things";
		$res=$this->db->queryArray($sql);
		return $res;
	}
	
	public function addBaseThings($param){
		$id=$this->generateBaseThingsId($param['type']);
		if($id==-1)
			return false;
		$sql="insert into base_things values('".($id+1)."',".$param['type'].",'".$param['name']."','".$param['thumb']."','".$param['desc']."',".$param['width'].",".$param['height'].");";
		
		$res=$this->db->queryArray($sql,'insert');
		if($res>0){
			return true;
		}else{
			return false;
		}
		
	}
	
	public function generateBaseThingsId($type){
		$sql="select id from base_things where type=$type order by id desc limit 1 ;";
		$res=$this->db->queryArray($sql);
		if(count($res)>0)
			return $res[0]['id'];
		else
			return str_pad($type,6,'0',STR_PAD_RIGHT);
	}
	
	public function delById($id){
		$sql="delete  from base_things where id='$id'";
		$res=$this->db->queryArray($sql,'delete');
		if($res>0){
			return true;
		}else{
			return false;
		}
	}
}