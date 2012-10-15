<?php
/**
 * @fileoverview 获得了php错误统计信息
 * @author xinyu.wang
 */

class Exceptions{
	/**
	 * 根据日期输出该日的按照分钟排序的信息
	 * @param unknown_type $date
	 */
	public function getMinutelyInfo($date){
		$res=array();
		if(is_null($date)){
			$file = SysConfig::result_data_path."minutely/exception/sns/".date("Ymd").".dat";
		}else{
			$file = SysConfig::result_data_path."minutely/exception/sns/".$date.".dat";
		}
		
		//echo $file;
		$fhandler=fopen($file,"r");
		if(empty($fhandler)){
			$res['ret']='error';
			$res['data']='empty file';
			//return 
			//Functions::expData("error",'empty file');
			//exit;
		}else{
			$data=$this->getData($fhandler,$date);
			if(count($data["rows"])>1){
				$res['ret']='success';
				$res['data']=$data;
				//Functions::expData("success",$data);
			}
			else{
				$res['ret']='error';
				$res['data']='no data';
				//Functions::expData("error",'no data');
			}
		}
		return $res;
			
		
	}
	/**
	 * 根据要读取的文件和日期，返回格式化好的数据
	 * @param unknown_type $fhandler
	 * @param unknown_type $date
	 */
	public function getData($fd,$date){
			$i=0;
			$line = trim(fgets($fd));
			$cells = explode("\t",$line);
			$title_count = count($cells);
			
			$isBegin=false;
			$data=array();
			$item=array();//每个时间段内的信息单元
			$tmp=array();
			$rows=array();
			$row=array();
			$eCount=array();//该天的各个错误的总次数
			$sumCount=0;
			while(!feof($fd)){
				$line = trim(fgets($fd));
				$cells = explode("\t",$line);
				if(count($cells)!=1 && count($cells)<$title_count){
					continue;
				}else{
					if(count($cells)==1){
						if($isBegin==true){
							$item['s']='&'.implode("&",$row);// 这样写是由于lib_0_2.js里HE.getPara方法，如果开头没有&的话，xxx=yyy的值就无法得到
							$rows[]=$item;
							$item=array();
							$row=array();
						}
						if($cells[0]=="")continue;//文件可能在最后进入该条件
						$item['id']=substr($cells[0],8,4);
						$isBegin=true; //一个单元开始
					}else{
						$status=trim(str_replace(" ","",$cells[0]));
						if(preg_match("/^\-/i",$status))continue;//过滤-:error这一行，应该是数据源多出了几个
						$count=trim($cells[1]);
						if(empty($eCount[$status])){//避免notice错误
							$eCount[$status]=$count;
						}else{
							$eCount[$status]+=$count;
						}
						$sumCount+=$count;
						$row[]=$status.'='.$count;
					}
				}
			}
			fclose($fd);
			$data['rows']=$rows;
			$data['eCount']=$eCount;
			$data['sumCount']=$sumCount;
			$data['date']=$date;
			return $data;
	}
}