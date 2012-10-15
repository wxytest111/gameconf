<?php

class BaseProperty{
	private $db;
	public function __construct($param){
		$this->db=new DBBase($param);
	}
	
	public function getBasePropertyId($id){
		$sql="select * from base_property where id='$id'";
		$res=$this->db->queryArray($sql);
		$r=array();
		if(count($res)>0){
			foreach($res[0] as $k=>$v)
			$r[$k]=$v;
		}
		return $r;
	}
	
	public function getAllBaseProperty(){
		$sql="select * from base_property";
		$res=$this->db->queryArray($sql);
		return $res;
	}
	
	public function addBaseProperty($param){
		//$id=$this->generateBaseThingsId($param['type']);
		//if($id==-1)
		//	return false;
		$sql="insert into base_property values(null,".$param['type'].",'".$param['name']."',".$param['uplimit'].",".$param['lowerlimit'].",'".$param['formula']."','".$param['desc']."');";
		
		$res=$this->db->queryArray($sql,'insert');
		if($res>0){
			return true;
		}else{
			return false;
		}
		
	}

	public function delById($id){
		$sql="delete from base_property where id='$id'";
		$res=$this->db->queryArray($sql,'delete');
		if($res>0){
			return true;
		}else{
			return false;
		}
	}
}