<?php
    header("Content-type:text/xml;charset=utf-8"); 
    $file_name = $_GET['file_name'];
    $filePath = 'ddc/'.$file_name;

    error_reporting(E_ALL^E_NOTICE^E_WARNING);
    // 使用dom查找
    $dom = new DOMDocument("1.0","UTF-8");
    $dom -> load($filePath);
    $root_key = $dom->getElementsByTagName('key');
    $new_str = '';
    for($i=0;$i<$root_key->length;$i++){
        //遍历节点
        $all_key = $root_key->item($i);
        $key_attrbute = $all_key->getAttribute('number');
        $select_model = substr($key_attrbute,5,1);   //取得十位
        echo $select_model;
        if($select_model == 0 && $select_model == 1){      //判断是否有模块
            return;
        }
        else if($select_model == 2){
            $model_2 = 2;
            continue;
        }
        else if($select_model == 3){
            $model_3 = 3;
            continue;
        }
        else if($select_model == 4){
            $model_4 = 4;
            continue;
        }
        else if($select_model == 5){
            $model_5 = 5;
            continue;
        }
        else if($select_model == 6){
            $model_6 = 6;
            continue;
        }
        else if($select_model == 7){
            $model_7 = 7;
            continue;
        }
    }
    // echo $model_2;
    // echo $model_3;
    // echo $model_4;
    // echo $model_5;
    // echo $model_6;
    // echo $model_7;
    // echo $file_name;
    // for($i = 0;$i<$keys->length;$i++){
    //     $all_key = $keys->item($i);
    //     $all_attr = $all_key->getAttribute('number');
    //     if(substr($all_attr,5,1) > 1){
    //         // print_r($all_key->no);
    //         echo $all_key->getElementsByTagNameNS("*")->nodeValue;
    //     }
    // }
    // var_dump($keys);
    /** 
//  * 将xml转为array 
//  * @param  string   $xml xml字符串或者xml文件名 
//  * @param  bool     $isfile 传入的是否是xml文件名 
//  * @return array    转换得到的数组 
//  */  
// function xmlToArray($xml,$isfile=false){     
//     //禁止引用外部xml实体  
//     libxml_disable_entity_loader(true);  
//     if($isfile){  
//         if(!file_exists($xml)) return false;  
//         $xmlstr = file_get_contents($xml);  
//     }else{  
//         $xmlstr = $xml;  
//     }  
//     $result= json_decode(json_encode(simplexml_load_string($xmlstr, 'SimpleXMLElement', LIBXML_NOCDATA)), true);          
//     return $result;  
// }  
// function dexmltostr($val){
//      $strs="";
//     foreach($val as $k=>$v){
//          $strs.="<key number='".$v["@attributes"]["number"]."'>"."\n";
//         foreach($v as $key=>$arr){
//             if($key!="@attributes"){
//                 if(!is_array($arr)){
//                      $strs.="<".$key.">".$arr."</".$key.">"."\n";
//                    }else{
//                     //echo $key,$v["@attributes"]["number"];
//                      $strs.="<".$key."> </".$key.">"."\n";
//                    }
//            }
//         }
//          $strs.="</key>"."\n";
//     }
//     return $strs;
// }
// // /** 
// //  * 数组转xml字符 
// //  * @param  string   $xml xml字符串 
// // **/  
// function arrayToXml($data){  
    
//     if(!is_array($data) || count($data) <= 0){  
//         return false;  
//     }  
//     $xml = "<xml>";  
//     //$xml = "";  
//     foreach ($data as $key=>$val){ 

//         if (is_numeric($val)){  
//             //$xml.="<".$key.">".$val."</".$key.">"."\n";  
//         }else{  
//             //print_r($key);
//             if(is_array($val)){
//                $keycontent=dexmltostr($val);
//                $xml.=$keycontent;
//             }else{
//                $xml.="<".$key."><![CDATA[".$val."]]></".$key.">";
//               }
//         }  
//     }  
//     $xml.="</xml>";  
//     return $xml;   
// }  
//     $xmldata = xmlToArray($filePath,$isfile=true);
//     $a=arrayToXml($xmldata);
//     echo $a;
//     //print_r($xmldata);
//     //print_r(arrayToXml($xmldata));
?>