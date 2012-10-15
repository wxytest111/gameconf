<?php

class UserEquipment{
	private $db;
	public function __construct($param){
		$this->db=new DBBase($param);
	}
	
	public function getUserEquipmentById($id){
		$sql="select * from user_equipment where ep_id='$id'";
		$res=$this->db->queryArray($sql);
		$r=array();
		if(count($res)>0){
			foreach($res[0] as $k=>$v)
			$r[$k]=$v;
		}
		return $r;
	}
	
	public function getUserEquipmentByUserId($user_id){
		$sql="select * from user_equipment where user_id='$user_id'";
		$res=$this->db->queryArray($sql);
		return $res;
	}
	
	public function getAllUserEquipment(){
		$sql="select * from user_equipment";
		$res=$this->db->queryArray($sql);
		return $res;
	}
	
	public function addUserEquipment($param){
		//$id=$this->generateBaseThingsId($param['type']);
		//if($id==-1)
		//	return false;
		$sql="insert into user_equipment values(null,'".$param['user_id']."','".$param['base_thing_id']."','".$param['bs_properties']."',".$param['level'].",".$param['use_level'].",".$param['is_treasure'].",'".$param['desc']."');";
		$res=$this->db->queryArray($sql,'insert');
		if($res>0){
			return true;
		}else{
			return false;
		}
		
	}
	
	public function generateUserEquipmentId($user_id){
		$sql="select id from user_equipment where user_id='$user_id' order by id desc limit 1 ;";
		$res=$this->db->queryArray($sql);
		if(count($res)>0)
			return $res[0]['id'];
		else
			return str_pad($type,6,'0',STR_PAD_RIGHT);
	}
	
	public function delById($id){
		$sql="delete  from user_equipment where id='$id'";
		$res=$this->db->queryArray($sql,'delete');
		if($res>0){
			return true;
		}else{
			return false;
		}
	}
}