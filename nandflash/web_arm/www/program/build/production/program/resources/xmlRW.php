<?php
$fn = $_POST['fileName'];
$rw = $_POST['rw'];

$ip = $_SERVER["SERVER_ADDR"];


function file2dir($sourcefile, $dir,$filename){  //copy 文件
     if( !file_exists ($sourcefile) ) {
        return false;
     }
     //$filename = basename($sourcefile);
     return copy ($sourcefile, $dir.''.$filename);

}

if ($ip != "127.0.0.1") {
    if (file_exists($fn)) {
        //chmod($fn, 0777);
        system("chmod 777 ".$fn);
    }

}

if ($rw == 'r') {
    $isFile = file_exists($fn);
    if ($isFile == false) {
        echo "null";
        return;
    }

    $fp = fopen($fn, 'r');
    while (!feof($fp)) {
        echo fgets($fp);
    }
} else {
    $content = $_POST["content"];
    $isHave = file_exists($fn);
    if (!$isHave) {

    }
    echo file_put_contents($fn, $content);
    $fname=explode("/",$fn);
    $i=count($fname)-1;
    $fn1=explode(".",$fname[$i]);
    $isDev = strpos($fn, 'devxml');
    if(count($fn1)>1){  //判断是否在devsinfo路径下
    	if($isDev===0 || $isDev){
    		echo 'true';
    		return;
	    }else{
            $path="";
            $lgcPath = "./lgc/";
	        foreach($fname as $k=>$v){
	          if($k<$i){
	          $path.=$v."/";
	          }
	        }
            copy($fn,$path.$fn1[0].".lgc");
	        echo $path.$fn1[0].".lgc";
	    }
     }else{
        if($fn1[0] === 'undefined'){
            return;
        }
        file2dir("../1000", "./lgc/", $fn1[0].".lgc");
        echo 'success save as 1000.lcg in ./lgc/1000.lgc';
     }
}

?>
