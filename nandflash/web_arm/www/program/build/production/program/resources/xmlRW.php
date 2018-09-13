<?php
$fn = $_POST['fileName'];
$rw = $_POST['rw'];

$ip = $_SERVER["SERVER_ADDR"];
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
    // print_r($fn1);
    $isDev = strpos($fn, 'devxml');
    // echo $fn.'--';
    // echo '------------------------';
    if(count($fn1)>1){  //判断是否在devsinfo路径下
    	if($isDev===0 || $isDev){
    		echo 'true';
    		return;
	    }else{
	    	$path="";
	        foreach($fname as $k=>$v){
	          if($k<$i){
	          $path.=$v."/";
	          }
	        }
	        copy($fn,$path.$fn1[0].".lcg");
	        echo $path.$fn1[0].".lcg";
	    	echo 'false';
	    }
     }else{
        echo $fn;
     }
    //$fp = fopen($fn, 'w') or die("Unable to open file!");
    //fwrite($fp, $content);
    //fclose($fp);
}
//chmod($fn,0777);

?>
