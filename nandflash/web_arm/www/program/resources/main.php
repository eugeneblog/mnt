<?php

$par = $_REQUEST["par"];

date_default_timezone_set("PRC");

class DeviceTree
{
    var $redis;
    var $types = array('AI', 'AO', 'AV', 'BI', 'BO', 'BV', "SCHDULE");

    public function __construct()
    {
        $this->redis = getRedisConect();
    }

    public function __destruct()
    {
        $this->redis->close();
    }

    public function getDeviceTree()
    {
        $redis = $this->redis;
        if (!$redis) {
            echo "{success:false,info:'link database error'}";
        }
        $arList = $redis->keys("???????");
        sort($arList);

        $this->getDevs($arList);
        $allArr = array();
        foreach ($arList as $value) {
            $Object_Name = hGet($redis, $value, "Object_Name");

            //$Object_Name = $redis->hGet($value, 'Object_Name');
            //$Object_Name= mb_convert_encoding($Object_Name,'UTF-8','GBK');
            if (strlen($value) == 7 & is_numeric($value)) {
                array_push($allArr, array("leaf" => true, "text" => $Object_Name, 'value' => $value));
            }
        };
    }

    function getDevs($arList)
    {
        $redis = $this->redis;
        $ip = $_SERVER["SERVER_ADDR"];


        $root = array('checked' => true, 'qtip' => "On Line", 'text' => $ip , 'children' => array());
        $arr = array();

        foreach ($arList as $value) {
            array_push($arr, substr($value, 0, 4));
        }
        $devs = array_unique($arr);
        foreach ($devs as $value) {
            array_push($root['children'], array('leaf' => false, 'text' => $value, 'children' => $this->getDevChildren($arList, $value, $redis)));
        }
        //echo json_encode($root);
        echo json_encode(array('text' => $ip, 'children' => array($root)));
        //return $arr;
    }
    function getDevsAll($arList)
    {
        $arr = [];
        foreach ($arList as $key => $value) {
            $str = substr($value, 0, 4);
            if (arrIsHaveStr($arr, $str) == 0) {
                array_push($arr, $str);
            }
        }
        sort($arr);
        return $arr;

    }
    function getDevChildren($arList, $devValue, $redis)
    {
        $types = array('AI', 'AO', 'AV', 'BI', 'BO', 'BV', "Schedule");

        $arr = array();
        for ($i = 0; $i <= 6; $i++) {
            $children = $this->getChildren($arList, $devValue . (string)$i, $redis,$i);
            if (sizeof($children)) {
                array_push($arr, array('text' => $types[$i], 'leaf' => false, 'children' => $children));
            }
        }
        return $arr;
    }

    function getChildren($arList, $devValue, $redis,$type)
    {
        $arr = array();
        foreach ($arList as $value) {
            if (substr($value, 0, 5) == $devValue) {
                //$Object_Name = $redis->hGet($value, 'Object_Name');
                $Object_Name = hGet($redis, $value, "Object_Name");

                if($type>=6){
                    array_push($arr, array('leaf' => true, 'text' => $Object_Name, 'value' => $value,'type'=>$type,"allowDrop"=>false,'allowDrag'=>false));
                }else{
                    array_push($arr, array('leaf' => true, 'text' => $Object_Name, 'value' => $value,'type'=>$type));
                }

            }
        }
        return $arr;
    }

    function getDevList()
    {
        $redis = $this->redis;
        if ($redis) {
            $arList = $redis->keys("???????");
            sort($arList);
            $arr = array();
            foreach ($arList as $key => $value) {
                if (is_numeric($value)) {
                    array_push($arr, array("value" => $value, "name" => hGet($redis, $value, "Object_Name")));
                }
            }
            sort($arList);
            echo json_encode($arr);
            $redis->close();
        } else {
            $arr = Array("isError" => true);
            echo json_encode($arr);
        }
    }
}

if ($par == "getDeviceTree") {
    $a = new DeviceTree();
    $a->getDeviceTree();
}
if ($par == "getDevList") {
    $a = new DeviceTree();
    $a->getDevList();
}
function getRedisConect($ip = "127.0.0.1", $port = "6379")
{
    error_reporting(E_ALL ^ E_NOTICE ^ E_WARNING);
    $redis = null;
    try {
        $redis = new Redis();
        if (!$redis) {
            return false;
            //exit(json_encode(array('success' => false, 'info' => $ip . ' Redis error')));
        }
        $redis->connect($ip, $port, 0.3) or $redis = false;
        if (!$redis) {
            return false;
            //exit(json_encode(array('success' => false, 'info' => $ip . 'Connction error')));
        }
    } catch (Exception $e) {
        return false;
        //exit(json_encode(array('success' => false, 'info' => $ip . 'Connction error' . $e)));
    }
    return $redis;
}

function hGet($redis, $nodename, $type)
{
    $value = (string)$redis->hGet($nodename, $type);

    if (preg_match("/[\x7f-\xff]/", $value)) {  //判断字符串中是否有中文
        return "base64=" . base64_encode($value);
    } else {
        return $value;
    }

}
