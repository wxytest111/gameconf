<?php
/**
 * @fileoverview 得到访问状态
 * @author xinyu.wang
 */

class WebStatus{
	/**
	 * 根据日期输出该日的按照分钟排序的信息
	 * @param unknown_type $date
	 */
	public function getMinutelyInfo($date){
		if(is_null($date)){
			$file = SysConfig::result_data_path."minutely/web_status/".date("Ymd").".dat";
		}else{
			$file = SysConfig::result_data_path."minutely/web_status/".$date.".dat";
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
			$eCount=array();//该天的各个请求的总访问次数
			$sumCount=0;
			$srow = empty($_GET['srow'])?array():explode(",",$_GET['srow']);
			while(!feof($fd)){
				$line = trim(fgets($fd));
				$cells = explode("\t",$line);
				if(count($cells)!=1 && count($cells)<$title_count){
					continue;
				}else{
					if(count($cells)==1){
						if($isBegin==true){
							$item['s']='&'.implode("&",$row);// 这样写是由于lib_0_2.js里HE.getPara方法，如果开头没有&的话，status=200的就无法get出来
							$rows[]=$item;
							$item=array();
							$row=array();
						}
						if($cells[0]=="")continue;//文件可能在最后进入该条件
						$item['id']=substr($cells[0],8,4);
						$isBegin=true; //一个单元开始
					}else{
						if((!empty($srow) && !in_array($cells[0],$srow))||strlen(trim($cells[0]))!=3) continue;
						$status=trim($cells[0]);
						$count=trim($cells[1]);
						if(empty($wsCount[$status])){//避免notice错误
							$wsCount[$status]=$count;
						}else{
							$wsCount[$status]+=$count;
						}
						$sumCount+=$count;
						$row[]=$status.'='.$count;
					}
				}
			}
			fclose($fd);
			$data['rows']=$rows;
			$data['eCount']=$wsCount;
			$data['sumCount']=$sumCount;
			$data['date']=$date;
			return $data;
	}
}