<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/common.inc.php');
require_once(BASE_DIR.'/AutoFrame.class.php');
new AutoFrame();
new Functions();
$src=empty($_GET['src'])?'user':$_GET['src'];
$ifmsrc=SysInfo::$ifmsrc[$src];
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>增加基本物品</title>
<link rel="stylesheet" href="../css/main.css" type="text/css" />
<link rel="stylesheet" href="../css/r.css" type="text/css" />
</head>
<body>
	<div class="wrap">
		<div class="head">
			<div class="head_inner">
				<div class="logo"></div>
				<div class="nav" id="tab_nav">
					<a href="/">首页</a>
				</div>
			</div>
		</div>
	<div class="content">
	<div class="rows wd1024">
		<form method="post" action="/tools/commit.php" target="listifm">
			<div class="wd400" >
				<input type="hidden" name="src" value="<?php echo $src?>"/>
				<?php switch($src){
					case "user":
						$options='';
						foreach(SysInfo::$platname as $k=>$v){
							$options.='<option value="'.$k.'">'.$v.'</option>';
						}
						?>
						<div class="condition">
						用户所属平台<select name="platform"><?php echo $options;?></select>
						</div>
						<div class="condition">
						用户名称<input type='text' value='' name='username' />
						</div>
						<div>
						是否是测试用户<input type='radio' name='istest' value=1 />是&nbsp;<input type='radio' name='istest' value=0 checked />否
						</div>
						<?php 
					break;
					case "basethings":
						$options='';
						foreach(SysInfo::$base_things_sort as $k=>$v){
							$options.='<option value="'.$k.'">'.$v.'</option>';
						}
						?>
						<div class="condition">
						物品分类<select name="type"><?php echo $options;?></select>
						</div>
						<div class="condition">
						物品名称<input type='text' value='' name='thingname' />
						</div>
						<div class="condition">
						thumb<input type='text' name='thumb' value='' />
						</div>
						<div class="condition">
						长度:<input  type='text' name='width'/>&nbsp;&nbsp;宽度:<input type='text' name='height' />
						</div>
						<div class="condition">
						desc<textarea rows="5" cols="16" name="desc"></textarea>
						</div>
						<?php 
					break;
					case "baseproperty":
						$options='';
						foreach(SysInfo::$base_property_sort as $k=>$v){
							$options.='<option value="'.$k.'">'.$v.'</option>';
						}
						?>
						<div class="condition">
						词缀分类<select name="type"><?php echo $options;?></select>
						</div>
						<div class="condition">
						词缀名称<input type='text' value='' name='propertyname' />
						</div>
						<div class="condition">
						等级下限<input type='text' name='lowerlimit' value='' />&nbsp;&nbsp;等级上限:<input  type='text' name='uplimit'/>
						</div>
						<div class="condition">
						公式:<input type='text' name='formula' size=20/>
						</div>
						<div class="condition">
						desc<textarea rows="5" cols="20" name="desc"></textarea>
						</div>
						<?php 
					break;
					case "userequipment":
						$user=new User(SysInfo::$dbconf);
						$testuser=$user->getUserByType(1);
						$useroptions='';
						foreach($testuser as $v){
							$useroptions.='<option value="'.$v['id'].'">'.$v['name'].'</option>';
						}
						$bsthing=new BaseThings(SysInfo::$dbconf);
						$allthings=$bsthing->getAllBaseThings();
						$bsthingoptions='';
						foreach($allthings as $v){
							$bsthingoptions.='<option value="'.$v['id'].'">'.$v['name'].'</option>';
						}
						$bsp=new BaseProperty(SysInfo::$dbconf);
						$allproperties=$bsp->getAllBaseProperty();
						$propertiesoptions='<option value="null">&nbsp</option>';
						foreach($allproperties as $v){
							$propertiesoptions.='<option value="'.$v['id'].'">'.$v['name'].'</option>';
						}
						?>
						<div class="condition">
						给哪个用户增加<select name="user_id"><?php echo $useroptions;?></select>
						</div>
						<div class="condition">
						使用那种基本物品<select name="base_thing_id"><?php echo $bsthingoptions;?></select>
						</div>
						<div class="condition">
						物品等级<input type='text' name='level' />&nbsp;&nbsp;使用等级<input type='text' name='use_level' />
						</div>
						<div class="condition">
						是否全服稀有物品<input type='radio' name='is_treasure' value=1 />是&nbsp;<input type='radio' name='is_treasure' value=0 checked />否
						</div>
						<div class="condition">
						desc<textarea rows="3" cols="40" name="desc"></textarea>
						</div>
						<div class="condition">
						词缀1<select name="property[]"><?php echo $propertiesoptions;?></select>&nbsp;&nbsp;词缀等级<input type='text' name='propertylevel[]' value="1"/>
						</div>
						<div class="condition">
						词缀2<select name="property[]"><?php echo $propertiesoptions;?></select>&nbsp;&nbsp;词缀等级<input type='text' name='propertylevel[]' value="1"/>
						</div>
						<div class="condition">
						词缀3<select name="property[]"><?php echo $propertiesoptions;?></select>&nbsp;&nbsp;词缀等级<input type='text' name='propertylevel[]' value="1"/>
						</div>
						<div class="condition">
						词缀4<select name="property[]"><?php echo $propertiesoptions;?></select>&nbsp;&nbsp;词缀等级<input type='text' name='propertylevel[]' value="1"/>
						</div>
						<div class="condition">
						词缀5<select name="property[]"><?php echo $propertiesoptions;?></select>&nbsp;&nbsp;词缀等级<input type='text' name='propertylevel[]' value="1"/>
						</div>
						<?php 
						break;
				}?>
				<input type="submit" id="btncommit" value="提交" class="ftbold"/>
			</div>
		</form>
		<div class="wd600 mgleft20 hg600" >
			<iframe class="hg590 wd590" name="listifm" id="listifm" src="<?php echo $ifmsrc;?>" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
		</div>
	</div>
	</div>
		<div class="foot">Copyright (c) 2012 GemAlchemy</div>
	</div>
</body>
<script type="text/javascript" src="../js/lib_1.js"></script>
<script type="text/javascript">
HE.addEvent(HE.$('#btncommit'),'click',function(){
	
});
</script>
</html>
