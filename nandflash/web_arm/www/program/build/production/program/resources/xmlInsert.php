<?php
    header("Content-type:text/xml;charset=utf-8"); 
    //获取模型xml文件
    $file_name = $_POST['file_name'];   //获取用户选择的文件名
    $select_num = $_POST['select_num']; //获取用户选择的模型编号
    $main_path =  $_POST['parent_file'];
    $filePath = './model/'.$file_name;   //模版文件路径
    // $myfile = fopen('./model/'.$file_name,'r');   //使用fopen方法打开xml文件，返回布尔值
    // $filsText = fread($myfile,filesize("./model/".$file_name));    //使用fread读取文件
    $mainPath = './ddc/'.$main_path;  //获取主xml文件路径
  
// --------------------------------------模版文件修改------------------------------------------
    $dom = new DOMDocument("1.0","UTF-8");
    $dom->load($filePath);
    $stu_nodes =$dom->getElementsByTagName("key");  //获取key 节点
    $key_first = $dom->getElementsByTagName('Description'); //获取description节点
    $obj_name = $dom->getElementsByTagName('Object_Name');

    for ($i=0;$i<$stu_nodes->length;$i++){   //遍历key节点
            $stu_node= $stu_nodes->item($i);  //遍历节点
            $stu_attribute = $stu_node->getAttribute('number'); //获取所有key的属性节点
            $new_arr = str_split($stu_attribute); //转换成数组
            $new_arr[5] = $select_num;  //修改第十位
            $new_str = join('',$new_arr); //转换位字符串
            $stu_node->setAttribute('number',$new_str);  //修改number属性节点

            $obj_value = $obj_name->item($i)->nodeValue;
            $pattern = '/\d/';
            $new_obj_value = preg_replace($pattern,$select_num,$obj_value,1);
            $obj_name->item($i)->nodeValue = $new_obj_value;
            // echo $new_obj_value."\n";

            $key_first_value = $key_first->item($i)->nodeValue;
            $new_keyfirst_value = preg_replace($pattern,$select_num,$key_first_value,1);
            $key_first->item($i)->nodeValue = $new_keyfirst_value;
            // echo $new_keyfirst_value.'--'."\n";
    }
    $result = $dom->saveXML();   //保存修改好的xml文件
    $result = $dom->save($filePath);
    $con = file_get_contents($filePath);
    // echo $con;
    //---------------------------------------主文件写入----------------------------------
    $mainDoc = new DOMDocument("1.0","UTF-8");  //创建DOM对象
    $mainDoc->load($mainPath);   //读取xml
    $mainDoc->formatOutput = true;
    $main_key = $mainDoc->getElementsByTagName('key');//获取key
    
    $article = $mainDoc->getElementsByTagName('root')->item(0);
    // $article->appendChild($newart);
    $result = $mainDoc->save($mainPath);
    // echo $result."---";
    // $handle=fopen($mainPath,"a+");
    // $str=fwrite($handle,$con);
    // fclose($handle);
    $top='<?xml version="1.0" encoding="UTF-8" standalone="no"?>'."\n";
    $top_root = '<root>'."\n";
    $footer="</root>";
    $mpath=getrootcontent($mainPath);
    $cpath=getrootcontent($filePath);
    $body= $mpath.$cpath;
    $newxml=$top.$top_root.$body.$footer;
    // echo file_put_contents($mainPath, $newxml);
    echo $cpath;
    // for($i = 0;$i<$main_key->length;$i++){
    //    echo $main_key->item($i)->nodeValue."<br/>";
    // }
   
      //获取root节点下所有内容
    function getrootcontent($filename){
        $file = fopen($filename, "r");
        $user=array();
        $i=0;
        //输出文本中所有的行，直到文件结束为止。
        while(! feof($file))
        {
        $user[$i]= fgets($file);//fgets()函数从文件指针中读取一行
        $i++;
        }
        fclose($file);
        $user=array_filter($user);
        //print_r($user);
        $content="";
        $len=count($user)-1;

        foreach($user as $k=>$v){
            if($k>1){
                if($k<$len){
                $content.=$v;
                }
            }
        }
    return $content;
    // echo $content;
}

?>