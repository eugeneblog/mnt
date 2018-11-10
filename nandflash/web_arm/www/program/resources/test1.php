<?php


//$ip = $_SERVER["SERVER_ADDR"];
$ip = "127.0.0.1";
$par = $_REQUEST["par"];
$redis = new Redis() or $redis = false;

/*if ($ip == "127.0.0.1") {
    $redis->connect("192.168.253.253", 6379);
} else {
    $redis->connect($ip, 6379);
}*/
$redis->connect($ip, 6379);

//$start111 = time();

$arList = $redis->keys("???????");
date_default_timezone_set("PRC");


if ($par == "getDevsAll") {
    echo json_encode(getDevsAll($arList));
}
if ($par == "devXmlInit") {
    $devsAllArr = getDevsAll($arList);
    $start_time = time();
    for ($i = 0; $i < sizeof($devsAllArr); $i++) {
        $filename = "devxml/" . $devsAllArr[$i] . ".xml";
        if (file_exists($filename)) {
            devXmlInit($filename, $redis);
        }
    }
    $end_time = time();
    echo $end_time - $start_time;
}

function devXmlInit($filename, $redis)
{

    $xml = simplexml_load_file($filename);
    for ($i = 0; $i < sizeof($xml->key); $i++) {
        $key = $xml->key[$i]->attributes()["number"];
        foreach ($xml->key[$i] as $type => $value) {
            changeValue($redis, $key, $type, $value);
        }
    }
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

function arrIsHaveStr($arr, $str)
{
    for ($i = 0; $i < sizeof($arr); $i++) {
        if ($arr[$i] == $str) {
            return 1;
        }
    }
    return 0;
}


//
//foreach ($arList as $key => $value) {
//    if ($value == "Send_File") {
//        continue;
//    }
//    if (strlen($value) != 7 || !is_numeric($value)) {
//        $redis->delete($value);
//    }
//}

//echo time()-$start111
if ($par == "moveXml") {
    $filePath = "/Applications/XAMPP/xamppfiles/htdocs/mnt/nandflash/";

    if (file_exists($filePath)) {
        $filename = $_REQUEST['filename'];


        exec("cp $filename $filePath", $arr1);
        exit(json_encode(array("success" => true, "info" => $filePath . substr($filename, 7, 100) . " save ok ")));
    } else {
        exit(json_encode(array("success" => false, "info" => "file $filePath  does not exist .")));
    }
}

if ($par == "getKeyAll") {
    $key = $_REQUEST['key'];

    echo json_encode($redis->hGetAll($key));
}
if ($par == "deleteKey") {
    $key = $_REQUEST['key'];
    echo json_encode(array("success" => true, "info" => $redis->delete($key)));
}
if ($par == "changeKey") {
    $oldKey = $_REQUEST['oldKey'];
    $newKey = $_REQUEST['newKey'];
    echo json_encode(array("success" => true, "info" => $redis->renameKey($oldKey, $newKey)));


}
if ($par == "repalceDeviceInstance") {
    $oldDev = $_REQUEST['oldDev'];
    $newDev = $_REQUEST['newDev'];
    $arList = $redis->keys($oldDev . "???");
    foreach ($arList as $key => $value) {
        $redis->renameKey($value, $newDev . substr($value, 4, 3));
    }
    echo json_encode(array("success" => true, "info" => sizeof($arList)));
}

if ($par == "englogin") {

    $engDrive = "eng-client";
    $engPath = "/mnt/nandflash/eng-client";
    $cliDrive = "bac-client";
    $engPid = getDrivePid($engDrive);
    exec("kill " . $engPid);

    exit("{success:true,info:'eng-client close'}");

    $cliPid = getDrivePid($cliDrive);
    exec("uname -a", $sysInfo);
    $sysInfo = strtolower($sysInfo[0]);
    if (strstr($sysInfo, "macbook")) {
        echo json_encode(array("success" => false, "info" => "system is  " . $sysInfo));
        exit();
    }
    if (!file_exists($engPath)) {
        echo json_encode(array("success" => false, "info" => $engPath . " does not exist ."));
        exit();
    }
    if ($cliPid) {
        exec("kill " . $cliPid);
        exec($engPath, $arr);
        echo json_encode(array("success" => true, "info" => "kill bac-client " . json_encode($arr)));
        exit();
    }
    if (!$engPid) {
        exec($engPath, $arr);
        echo json_encode(array("success" => true, "info" => "eng-client run ")).json_encode($arr);
        exit();
    }

    if ($engPid) {
        echo json_encode(array("success" => true, "info" => "eng-client running" . $cliPid));
        exit();
    }

}
function getDrivePid($driveName)
{
    exec("ps", $arr);
    for ($i = 0; $i < sizeof($arr); $i++) {
        if (strstr($arr[$i], $driveName)) {
            return explode(" ", trim($arr[$i]))[0];
        }
    }
    return -1;
}

if ($par == "filePublish") {
    //$pv = current($redis->hmGet('Send_File', Array("Present_Value")));
    $pv = $redis->hGet('Send_File', "Present_Value");
    $key = $_GET["key"];
    $value = $_GET["value"];
    if ($pv == "1") {
        $redis->publish($key, $value);
        echo $pv;
    } else {
        echo $pv;
    }
}

if ($par == "devPublish") {
    $key = $_REQUEST["key"];
    $value = $_REQUEST["value"];
    file_put_contents("test.json", $value);
    echo $redis->publish($key, $value);
}

if ($par == "delFile") {
    $fn = $_GET['fileName'];
    echo file_put_contents($fn, "");
    //echo unlink($fn);
}

if ($par == "getvalue") {
    $nodeName = $_REQUEST['nodename'];
    $type = $_REQUEST['type'];
    echo hGet($redis, $nodeName, $type);
    //$value = mb_convert_encoding($redis->hGet($nodeName, $type), 'UTF-8', 'GBK');
    //$value = $redis->hGet($nodeName, $type);
    //echo $value;
}
if ($par == "copyFile") {
    $sourcesFile = $_GET['sources'];
    $targetFile = $_GET['target'];
    echo copy($sourcesFile, $targetFile);
}

if ($par == "save") {
    $redis->save();
    $redis->bgsave();
    echo $redis->lastSave();
    $redis->close();
}

if ($par == "clear") {
    exec("kill " . getDrivePid("bac-mrouter"));
    exec("kill " . getDrivePid("eng-client"));
    exec("kill " . getDrivePid("bac-logic"));
    exec("kill " . getDrivePid("eng-client"));
    if (file_exists("/var/run/bac_client.pid")) {
        $myfile = fopen("/var/run/bac_client.pid", "r");
        $jc = fgets($myfile);
        $test = "kill " . $jc;
        exec($test, $array);
    }

    if (file_exists("/var/run/bip_client.pid")) {
        $myfile1 = fopen("/var/run/bip_client.pid", "r");
        $jc1 = fgets($myfile1);
        $test1 = "kill " . $jc1;
        exec($test1, $array1);
    }

    //exec("kill " . getDrivePid("smserver"));
    //exec("kill " . getDrivePid("guard"));
    /*  $dumpPath = "/mnt/nandflash/dump.rdb";
    unset($dumpPath);*/
    //echo $redis->delete($arList);

    $redis->flushDB();
    $redis->save();
    $redis->close();
    //$redis->save();
}

if ($par == 'devRename') {
    $devname = $_GET['devname'];

    $keys = $redis->keys("1100*");
}
if ($par == "getKeys") {
    $devname = $_GET['devname'];
    $keys = $redis->keys($devname . "*");
    sort($keys);
    $arr = [];
    foreach ($keys as $key => $value) {
        $types = $redis->hGetAll($value);
        $types['key'] = $value;
        //$arr=$types;
        array_push($arr, $types);
    }
    echo json_encode($arr);
    // echo xmlrpc_encode($arr);
}
if ($par == "system") {
    $str = $_REQUEST['command'];
    exec($str, $arr);
    echo json_encode($arr);
}
if ($par == "file_exists") {
    $fn = $_GET['filename'];
    echo file_exists($fn);
    /*if(file_exists($fn)){
        echo "true";
    }else{
        echo "false";
    }*/
}
if ($par == "backup") {
    $fn = $_GET['filename'];

    $file = fopen($fn, "r");

    header("Content-Type: application/octet-stream");
    header("Accept-Ranges: bytes");
    header("Accept-Length: " . filesize($fn));
    header("Content-Disposition: attachment; filename=" . $file);
    echo fread($file, filesize($fn));
    fclose($file);
}
if ($par == "getAlarm") {
    $nodeName = $_GET["nodename"];
    $type = "Alarm";
    echo $redis->hGet($nodeName, $type);
}
if ($par == "addAlarm") {
    $nodeName = $_GET["nodename"];
    setRedisUpdateTime($redis, $nodeName);

//$high_limit=$_POST["high_limit"];
    //$low_limit=$_POST["low_limit"];
    $delay_time = $_POST["delay_time"];
    //$deadband=$_POST["deadband"];
    $notification_class = $_POST["notification_class"];
    //$limit=$_POST["limit"];
    $limit = isset($_POST["limit"]) ? "\"limit\":" . $_POST["limit"] . "," : "";
    $event_enable = $_POST["event_enable"];
    $high_limit = isset($_POST["high_limit"]) ? "\"high_limit\":" . $_POST["high_limit"] . "," : "";
    $low_limit = isset($_POST["low_limit"]) ? "\"low_limit\":" . $_POST["low_limit"] . "," : "";
    $deadband = isset($_POST["deadband"]) ? "\"deadband\":" . $_POST["deadband"] . "," : "";
    $event_type = isset($_POST["event_type"]) ? "\"event_type\":" . $_POST["event_type"] . "," : "";
    $alarm_value = isset($_POST["alarm_value"]) ? "\"alarm_value\":" . $_POST["alarm_value"] . "," : "";


    $type = "Alarm";
    $value = "{\"Set_Alarm\":[{" .
//"\"high_limit\":".$high_limit.",".
//"\"low_limit\":".$low_limit.",".
//"\"deadband\":".$deadband.",".
        $high_limit . $low_limit . $deadband .
        "\"delay_time\":" . $delay_time . "," .
        "\"notification_class\":" . $notification_class . "," .
        $event_type . $alarm_value . $limit .
        "\"event_enable\":" . $event_enable . "}]}";
    $redis->hSet($nodeName, $type, $value);

    echo $value;

}


if ($par == "getAllScheduleNamesOuter") {
    $devname = $_GET['devname'];
    $schduleType = array("601", "602", "603", "604", "605", "606", "607", "608", "609", "610");
    $newArray = Array();
    foreach ($arList as $key => $value) {
        if (strlen($value) == 7 & is_numeric($value)) {
            if (in_array(substr($value, 4, 3), $schduleType) & substr($value, 0, 4) != $devname) {
                array_push($newArray, $value);

            }
        }
    }
    //$newArray=array_fill_keys($newArray,"name");
    //$newArray=array_flip($newArray);
    echo json_encode($newArray);
}
if ($par == "ScheduleConfig") {
    //55FF053F00001FF3010C0002067F000001BAB900059C0F0C0040000119553E44C24400003F490ABA10
    $nodeName = $_GET["nodename"];
    setRedisUpdateTime($redis, $nodeName);

    $Object_Name = $_GET["Object_Name"];
    if ($redis->hGet($nodeName, "Object_Name") != $Object_Name) {
        $redis->hSet($nodeName, "Object_Name", $Object_Name);
        if (isset($_GET["ispublish"])) {
            $redis->publish(substr($nodeName, 0, 4) . ".8.*", $nodeName . "\r\n" . "Object_Name" . "\r\n" . $Object_Name);
        }
    }
    $Present_Value = $_GET["Present_Value"];
    if ($redis->hGet($nodeName, "Present_Value") != $Present_Value) {
        $redis->hSet($nodeName, "Present_Value", $Present_Value);
        if (isset($_GET["ispublish"])) {
            $redis->publish(substr($nodeName, 0, 4) . ".8.*", $nodeName . "\r\n" . "Present_Value" . "\r\n" . $Present_Value);
        }
    }
    $Description = $_GET["Description"];
    if ($redis->hGet($nodeName, "Description") != $Description) {
        $redis->hSet($nodeName, "Description", $Description);
        if (isset($_GET["ispublish"])) {
            $redis->publish(substr($nodeName, 0, 4) . ".8.*", $nodeName . "\r\n" . "Description" . "\r\n" . $Description);
        }
    }
    $Priority_For_Writing = $_GET["Priority_For_Writing"];
    if ($redis->hGet($nodeName, "Priority_For_Writing") != $Priority_For_Writing) {
        $redis->hSet($nodeName, "Priority_For_Writing", $Priority_For_Writing);
        if (isset($_GET["ispublish"])) {
            $redis->publish(substr($nodeName, 0, 4) . ".8.*", $nodeName . "\r\n" . "Priority_For_Writing" . "\r\n" . $Priority_For_Writing);
        }
    }

    if (isset($_GET["after"])) {
        $after = $_GET["after"];
        $value = trimall('{"dateRange":	{"startDate":{' . dateToJson($after) . '},"endDate":{"year":255,"month":255,"day_of_month":255,"day_of_week":255}}}');
        echo $value;
        if ($redis->hGet($nodeName, "Effective_Period") != $value) {
            $redis->hSet($nodeName, "Effective_Period", $value);
            if (isset($_GET["ispublish"])) {
                $redis->publish(substr($nodeName, 0, 4) . ".8.*", $nodeName . "\r\n" . "Effective_Period" . "\r\n" . $value);
            }
        }
    }

    if (isset($_GET["front"])) {
        $front = $_GET["front"];
        $value = trimall('{"dateRange":	{"startDate":{"year":255,"month":255,"day_of_month":255,"day_of_week":255},"endDate":{' . dateToJson($front) . '}}}');
        echo $value;
        if ($redis->hGet($nodeName, "Effective_Period") != $value) {
            $redis->hSet($nodeName, "Effective_Period", $value);
            if (isset($_GET["ispublish"])) {
                $redis->publish(substr($nodeName, 0, 4) . ".8.*", $nodeName . "\r\n" . "Effective_Period" . "\r\n" . $value);
            }
        }
    }

    if (isset($_GET["fromstart"])) {
        $fromstart = $_GET["fromstart"];
        $fromend = $_GET["fromend"];
        $value = trimall('{"dateRange":{"startDate":{' . dateToJson($fromstart) . '},"endDate":{' . dateToJson($fromend) . '}}}');

        echo $value;
        if ($redis->hGet($nodeName, "Effective_Period") != $value) {
            $redis->hSet($nodeName, "Effective_Period", $value);
            if (isset($_GET["ispublish"])) {
                $redis->publish(substr($nodeName, 0, 4) . ".8.*", $nodeName . "\r\n" . "Effective_Period" . "\r\n" . $value);
            }
        }
    }

}
if ($par == "getnullschedule") {
    $nodeName = $_GET["nodename"];
    $count = array("601", "602", "603", "604", "605", "606", "607", "608", "609", "610");
    for ($i = 601; $i <= 699; $i++) {
        $is = $redis->exists($nodeName . $i);
        if (!$is) {
            echo $nodeName . $i;
            return;
        }
    }
    echo "null";
}

//http://127.0.0.1/svgxml/resources/test1.php?par=getvalue&nodename=1100&type=Object_Name

if ($par == "setRenameValue") {
    echo print_r($_POST);
    echo xmlrpc_encode($_POST);
    foreach ($_POST as $type => $value) {
        echo $type . $value;
    }

    //$nodeName = $_GET["nodename"];
    //$type = $_GET["type"];
    ////echo "{type:'".$type."',value:'"."12313"."'}";
    //echo $redis->hGet($nodeName, $type);
}

if ($par == "changevaluenopublish") {
    $nodeName = $_REQUEST["nodename"];
    $type = $_REQUEST["type"];
    //$value=$_GET["value"];
    if (isset($_REQUEST["value"])) {
        $value = $_REQUEST["value"];
    }
    if (isset($_REQUEST["value"])) {
        $value = $_REQUEST["value"];
    }
    //echo "{type:'".$type."',value:'"."12313"."'}";
    setRedisUpdateTime($redis, $nodeName);
    changeValue($redis,$nodeName,$type,$value);
    //echo $redis->hSet($nodeName, $type, $value);
    $redis->close();
}
if ($par == "changevalue") {
    $nodeName = $_REQUEST["nodename"];
    $type = $_REQUEST["type"];
    if (isset($_REQUEST["value"])) {
        $value = $_REQUEST["value"];
    }
    changeValue($redis,$nodeName,$type,$value);
    $redis->close();
}
function changeValue($redis, $nodeName, $type, $value)
{
    $redis->hSet($nodeName, $type, $value."");
    $redis->publish(substr($nodeName, 0, 4) . ".8.*", $nodeName . "\r\n" . $type . "\r\n" . $value."");
    setRedisUpdateTime($redis, $nodeName);
}

if ($par == "schedule") {

    $str = "";
    echo "[";
    $nodeName = $_GET["nodename"];
    foreach ($arList as $key => $value) {
        if (strlen($value) == 7 & is_numeric($value)) {
            $devName = substr($value, 0, 4);
            if (strcmp($devName, $nodeName) == 0) {
                $type = substr($value, 4, 1);

                $dev = $redis->hGet($value, 'Position');
                if ($type == '6') {
                    //$Object_Name = $redis->hGet($value, 'Object_Name');
                    $Object_Name = hGet($redis, $value, "Object_Name");
                    $str .= '{allowDrop: false, allowDrag: false,leaf: true, text :"' . $Object_Name . '",value:"' . $value . '"},';
                }
            }
        }
    }
    echo substr($str, 0, strlen($str) - 1);
    echo "]";
}

if ($par == "getDevxmls"){
    $dir = "devxml";
    $scanned_directory = array_diff(scandir($dir), array('..', '.'));
    $arr = array_values($scanned_directory);
    echo json_encode($arr);
}

if ($par == "getddcFiles") {
    $dir = "ddc";
    $scanned_directory = array_diff(scandir($dir), array('..', '.'));
    $arr = array_values($scanned_directory);
    echo json_encode($arr);
}

function isBIBOBV($nodeName)
{
    $four = substr($nodeName, 4, 1);
    if ($four == "3" || $four == "4" || $four == "5") {
        return true;
    } else {
        return false;
    }
}

if ($par == "getbackupfiles") {
    $dir = $_REQUEST['folder'];
    $arr = getBackupFile($dir);
    echo json_encode($arr);

    /*
    $scanned_directory = array_diff(scandir($dir), array('..', '.'));
    $str = "";
    echo "[";
    foreach ($scanned_directory as $key => $value) {
        //$time =fileatime($dir."/".$value);
        date_default_timezone_set("UTC");
        $time = date("Y-m-d H:i:s", filectime($dir . "/" . $value));
        $size = filesize($dir . "/" . $value);
        $filetype = filetype($dir . "/" . $value);
        $str .= "{name:'" . $value . "',lasttime:'" . $time . "',size:'" . $size . "',filetype:'" . $filetype . "'},";
        //echo filectime($dir."/".$value)."   ";
        //if(strlen($value)==4||$value=='local'){
        //$str.= "'".$value."',  ".$key."  ";
        //}
    }
    echo substr($str, 0, strlen($str) - 1);
    echo "]";*/
}

function getBackupFile($dir)
{
    //$dir = "devxml";
    $scanned_directory = array_diff(scandir($dir), array('..', '.'));
    $arr = array();
    foreach ($scanned_directory as $key => $value) {
        date_default_timezone_set("UTC");
        $time = date("Y-m-d H:i:s", filectime($dir . "/" . $value));
        $size = filesize($dir . "/" . $value);
        $filetype = filetype($dir . "/" . $value);
        $src = "resources/" . $dir . "/" . $value;
        array_push($arr, array("name" => $value, "lasttime" => $time, "size" => $size, "filetype" => $filetype, "src" => $src));
    }
    return $arr;
}

if ($par == "nodes1") {
    echo "[";
    $str = "";
    foreach ($arList as $value) {
        $value = "$value";
        $Object_Name = $redis->hGet($value, 'Object_Name');
        if (strlen($value) == 7 & is_numeric($value)) {
            $str .= '{leaf: true, text :"' . $Object_Name . '",value:"' . $value . '"},';
        }
    };
    echo substr($str, 0, strlen($str) - 1);
    echo "]";
}
if ($par == "nodes") {
    $allArr = array();

    foreach ($arList as $value) {
        //$Object_Name = $redis->hGet($value, 'Object_Name');
        $Object_Name = hGet($redis, $value, "Object_Name");
        if (strlen($value) == 7 & is_numeric($value)) {
            array_push($allArr, array("leaf" => true, "text" => $Object_Name, 'value' => $value));
        }
    };
    echo json_encode($allArr);

}

if ($par == "node") {
    $nodeName = $_GET["nodename"];
    $sortarr = Array("Object_Identifier", "Object_Name", "Description", "Priority_Array", "Status_Flags", "Max_Pres_Value", "Min_pres_Value", "High_Limit", "Limit_Enable", "COV_Increment", "Event_Enable");
    $arList = $redis->hKeys($nodeName);
    $arr1 = array_intersect($sortarr, $arList);
    $arr2 = array_diff($arList, $sortarr);
    $arr3 = array_merge($arr1, $arr2);
    $parameters = Array("Object_Name", "Description", "Present_Value", "Max_Pres_Value", "Min_pres_Value", "High_Limit", "Low_Limit", "COV_Increment", "Device_Type", "Offset", "Inactive_Text", "Active_Text");
    $event = Array("Event_State", "Event_Enable");
    $alarm = Array("Alarm_Enable", "Limit_Enable", "Time_Delay", "Acked_Transitions");
    if (isset($_GET["type"])) {
        $type = $_GET["type"];
        if ($type == "parameters") {
            $arr3 = array_intersect($arr3, $parameters);
            //echo print_r($arr3);
            //"Inactive_Text","Active_Text"
            if (isBIBOBV($nodeName)) {
                if (!in_array("Inactive_Text", $arr3)) {
                    array_push($arr3, "Inactive_Text");
                }
                if (!in_array("Active_Text", $arr3)) {
                    array_push($arr3, "Active_Text");
                }
            }
        } else if ($type == "event") {
            $arr3 = array_intersect($arr3, $event);
        } else if ($type == "alarm") {
            $arr3 = array_intersect($arr3, $alarm);
        } else if ($type == "other") {
            $arr3 = array_diff($arr3, $parameters);
            //echo print_r($arr3);
            //echo "<br>";
            $arr3 = array_diff($arr3, $event);
            $arr3 = array_diff($arr3, $alarm);
        }
    }
    $str = "";

    $allArr = array();
    foreach ($arr3 as $key) {
        //$value = $redis->hGet($nodeName, $key);
        $value = hGet($redis, $nodeName, $key);
        //$value= mb_convert_encoding($value,'UTF-8','GBK');
        array_push($allArr, array(
            'type' => $key,
            'value' => $value
        ));
    }
    echo json_encode($allArr);
}

if ($par == "getreferencesdev") {
    $nodeName = substr($_GET["nodename"], 0, 4);
    $newArry = array();
    foreach ($arList as $value) {
        $value = "$value";
        $sfive = substr($value, 4, 1);
        //echo $sfive.'<br>';
        //if(strlen($value)==7&substr($value,0,4)==$nodeName){
        if (strlen($value) == 7 & is_numeric($value)) {
            if ($sfive == 4 || $sfive == 5) {
                array_push($newArry, $value);
            }
        }
    };
    echo json_encode($newArry);
}

if ($par == "getDevInfoFileNames") {
    $directory = 'devsinfo';
    $newArry = Array();
    $scanned_directory = array_diff(scandir($directory), array('..', '.'));
    foreach ($scanned_directory as $key => $value) {
        array_push($newArry, $value);
    }
    echo json_encode($newArry);
}
if ($par == "getDevFileNames") {
    $directory = "/Applications/XAMPP/xamppfiles/htdocs/mnt/nandflash/";
    $newArry = Array();
    $scanned_directory = array_diff(scandir($directory), array('..', '.'));
    foreach ($scanned_directory as $key => $value) {
        if (strlen($value) == 4) {
            array_push($newArry, $value);
        }
    }
    echo json_encode($newArry);
}
if ($par == "dev") {
    //echo "[";
    //$str = "";
    $arr = array();
    foreach ($arList as $value) {
        if (strlen($value) == 7 & is_numeric($value)) {
            //$str .= $value . ',';
            array_push($arr, $value);
        }
    };
    //echo substr($str, 0, strlen($str) - 1);
    //echo "]";
    echo json_encode($arr);
}


function dateToJson($riqi)
{
    //echo "<br>";
    //echo $riqi;
    //echo "<br>";
    $riqiarr = explode("-", $riqi);
    $ri = (int)current($riqiarr);
    $yue = (int)next($riqiarr);
    $nian = (int)next($riqiarr);
    $zhou = date("N", mktime(0, 0, 0, $yue, $ri, $nian));
    $jsstr = '"year":	' . $nian . ',
	"month":	' . $yue . ',
	"day_of_month":	' . $ri;//. ',
    //"day_of_week":	' . $zhou;
    return $jsstr;
}


function trimall($str)
{
    $qian = array(" ", "　", "\t", "\n", "\r");
    return str_replace($qian, '', $str);
}

//$fn=$_POST['fileName'];
//$rw=$_POST['rw'];

if ($par == "uploadfiles") {
    if (isset($_REQUEST['folder'])) {
        $folder = $_REQUEST['folder'];
    } else {
        $folder = ".";
    }
    echo move_uploaded_file($_FILES["file"]["tmp_name"], $folder . "/" . $_FILES["file"]["name"]);
}
function isMac()
{
    return PHP_OS == "Darwin";
}

if ($par == 'updateProgram') {
    if (isMac()) {
        echo "Mac";
        exit();
    }
    //echo move_uploaded_file($_FILES["file"]["tmp_name"], $_FILES["file"]["name"]);
    $error = $_FILES['file1']['error'];
    if ($error != 0) {
        echo "Error File" . $error;
    }
    $isMove = move_uploaded_file($_FILES["file1"]["tmp_name"], $_FILES["file1"]["name"]);
    if ($isMove != 1) {
        echo "Error Move";
    }

    $isTar = popen("tar -xzvf " . $_FILES['file1']['name'] . " 2>&1 -C ../../", 'r');
    if (!$isTar) {
        echo "Error Tar";
    }

    echo $error . $isMove . $isTar;
    listDir("/mnt/nandflash");
}

if ($par == 'uploadBin') {
    echo "Upload Success " . move_uploaded_file($_FILES["file1"]["tmp_name"], "/mnt/nandflash/" . $_FILES["file1"]["name"]);
}

if ($par == "openPermission") {
    echo listDir("/mnt/nandflash");
}

function listDir($dir)
{
    if (is_dir($dir)) {
        if ($dh = opendir($dir)) {
            while (($file = readdir($dh)) !== false) {
                if ((is_dir($dir . "/" . $file)) && $file != "." && $file != "..") {
                    listDir($dir . "/" . $file . "/");
                } else {
                    if ($file != "." && $file != "..") {
                        chmod($dir . '/' . $file, 0777);
                    }
                }
            }
            closedir($dh);
        }
    }
}

//开始运行

function hGet($redis, $nodename, $type)
{
    $value = (string)$redis->hGet($nodename, $type);

    if (preg_match("/[\x7f-\xff]/", $value)) {  //判断字符串中是否有中文
        return "base64=" . base64_encode($value);
    } else {
        return $value;
    }

}


if ($par == "nodestree") {
    //$redis = getRedisConect();
    $arList = $redis->keys("???????");

    sort($arList);
    getDevs($arList, $redis);
    $allArr = array();
    foreach ($arList as $value) {
        $Object_Name = hGet($redis, $value, "Object_Name");

        //$Object_Name = $redis->hGet($value, 'Object_Name');
        //$Object_Name= mb_convert_encoding($Object_Name,'UTF-8','GBK');
        if (strlen($value) == 7 & is_numeric($value)) {
            array_push($allArr, array("leaf" => true, "text" => $Object_Name, 'value' => $value));
        }
    };

    //echo json_encode($allArr);
}
if ($par == "getDevsByDevName") {

    if ($redis) {
        $devname = $_REQUEST['devname'];
        $arList = $redis->keys($devname . "???");
        sort($arList);
        $arr = array();
        foreach ($arList as $key => $value) {
            if (is_numeric($value)) {
                $Object_Name = hGet($redis, $value, "Object_Name");
                $Present_Value = hGet($redis, $value, "Present_Value");
                $Update_Time = hGet($redis, $value, "Update_Time");
                array_push($arr, array("value" => $value, "name" => $Object_Name, 'Present_Value' => $Present_Value, 'update' => $Update_Time));
            }
        }
        sort($arList);
        echo json_encode($arr);
        $redis->close();
    } else {
        $arr = Array("success" => false, 'info' => "link database error!");
        echo json_encode($arr);
    }
}
function getDevs($arList, $redis)
{

    //$redis = getRedisConect();
    $root = array('text' => $_SERVER["SERVER_ADDR"], 'children' => array());
    $arr = array();

    foreach ($arList as $value) {
        array_push($arr, substr($value, 0, 4));
    }
    $devs = array_unique($arr);
    foreach ($devs as $value) {
        array_push($root['children'], array('leaf' => true, 'text' => $value, 'children' => getDevChildren($arList, $value, $redis)));
    }
    echo json_encode($root);
    //return $arr;
}

function getDevChildren($arList, $devValue, $redis)
{
    $types = array('AI', 'AO', 'AV', 'BI', 'BO', 'BV', "SCHDULE");

    $arr = array();
    for ($i = 0; $i <= 6; $i++) {
        $children = getChildren($arList, $devValue . (string)$i, $redis);
        if (sizeof($children)) {
            array_push($arr, array('text' => $types[$i], 'leaf' => false, 'children' => $children));
        }
    }
    return $arr;
}

function getChildren($arList, $devValue, $redis)
{
    $arr = array();
    foreach ($arList as $value) {
        if (substr($value, 0, 5) == $devValue) {
            //$Object_Name = $redis->hGet($value, 'Object_Name');
            $Object_Name = hGet($redis, $value, "Object_Name");

            array_push($arr, array('leaf' => true, 'text' => $Object_Name, 'value' => $value));
        }
    }
    return $arr;
}

function setRedisUpdateTime($redis, $nodename)
{
    $redis->hSet($nodename, "Update_Time", date("Y-m-d h:i:s"));
}


?>
