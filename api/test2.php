<?php 
$str='<?xml version="1.0" encoding="UTF-8"?>
<root>
    <p key="abc">This is an example.</p>
    <p key="swf"><![CDATA[http://static.gip.happyelements.com/app/common/loading_test_en.51668.swf]]></p>
    <child_integer>1bbbb</child_integer>
</root>';
$xml = new DOMDocument(); 
$xml->loadXML($str); 

function libxml_display_error($error)
{
    $return = "<br/>\n";
    switch ($error->level) {
        case LIBXML_ERR_WARNING:
            $return .= "<b>Warning $error->code</b>: ";
            break;
        case LIBXML_ERR_ERROR:
            $return .= "<b>Error $error->code</b>: ";
            break;
        case LIBXML_ERR_FATAL:
            $return .= "<b>Fatal Error $error->code</b>: ";
            break;
    }
    $return .= trim($error->message);
    if ($error->file) {
        $return .=    " in <b>$error->file</b>";
    }
    $return .= " on line <b>$error->line</b>\n";

    return $return;
}

function libxml_display_errors() {
    $errors = libxml_get_errors();
    $err='';
    foreach ($errors as $error) {
        $err.=libxml_display_error($error);
    }
    libxml_clear_errors();
    return $err;
}

libxml_use_internal_errors(true);
if (!$xml->validate()) {
    print '<b>DOMDocument::schemaValidate() Generated Errors!</b>';
}else{
	
	print 'ok';
}
$results=array();
 $elements = $xml->getElementsByTagName('p');  
        foreach ($elements as $k=>$element){ 
        	echo $element->getAttribute('key'); 
        	echo '<br>'.$element->nodeValue;
            
        } 
       // print_r($results);
?>