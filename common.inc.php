<?php
/**
 * @fileoverview 公共常量、环境变量定义文件
 * @author xinyu.wang
 */
date_default_timezone_set("Asia/Shanghai");
error_reporting(E_ALL);
ini_set('display_errors',1);

define("BASE_DIR",dirname(__FILE__));

require_once($_SERVER['DOCUMENT_ROOT'].'/config.php');