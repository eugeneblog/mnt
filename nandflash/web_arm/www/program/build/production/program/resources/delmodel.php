<?php
    header("Content-type:text/xml;charset=utf-8"); 
    $model_file = $_GET['file_name'];
    $select_num = $_GET['select_num'];
    $main_file = $_GET['parent_file'];
    

    $filePath = './model/'.$model_file;   //模版文件路径
    $mainPath = './ddc/'.$main_file;  //主文件路径

    $dom = new DOMDocument('1.0','UTF-8');
    $dom -> load($mainPath);
    $delete_num=0;
    $root = $dom->getElementsByTagName('key');
    for($i=0;$i<$root->length;){   //获取所有key
        $key_number = $root->item($i)->getAttribute('number');
        $key_model = $root->item($i);
        if(substr($key_number,5,1)==$select_num){
            $key_model->parentNode->removeChild($key_model);
            $delete_num++;
            //echo $key_number."\n";
            continue;
        }else{
            $i++;
        }
    }
    $dom->save($mainPath);
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
        foreach($user as $k=>$v){
                   if(strlen($v)>5){
                   $content.=$v;
                } 
        }
    return $content;
} 
file_put_contents($mainPath,getrootcontent($mainPath));
echo json_encode(array("status"=>"ok","result"=>"deleted "+$delete_num+" node"));
?>