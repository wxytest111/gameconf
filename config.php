<?php
	$CONFIGFILEROOT="/data/gameconf";
	$baseurl = 'http://www.xiabankan.com/';
	
	class SysInfo{
		const baseurl='http://www.xiabankan.com/';
		public static $dbconf=array('host'=>'localhost','username'=>'root','pwd'=>'wxytest1','dbname'=>'gem','port'=>3306);
		
		public static $ifmsrc=array('user'=>'/tools/listuser.php','basethings'=>'/tools/listbasethings.php','baseproperty'=>'/tools/listbaseproperties.php','userequipment'=>'/tools/listuserequipment.php');
		
		public static $platname=array('10'=>'QZONE','11'=>'腾讯微博','12'=>'腾讯朋友','20'=>'Facebook');
		
		public static $base_things_sort=array('101'=>'普通物品','102'=>'任务物品','201'=>'头盔','202'=>'武器','203'=>'护甲','204'=>'手套','205'=>'戒指','206'=>'鞋子','207'=>'护身符');
		
		public static $base_property_sort=array('101'=>'攻击','102'=>'防御','103'=>'闪电宝石','104'=>'蓝色幻想','105'=>'红色风暴','106'=>'啃噬','107'=>'诅咒','108'=>'冰峰球','109'=>'霜之新星','110'=>'生命值','111'=>'魔法值','112'=>'精力值','113'=>'耐久值','114'=>'获得魔法装备','115'=>'九阳真经');
	}