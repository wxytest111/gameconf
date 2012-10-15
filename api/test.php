<?php 
$str='<?xml version="1.0" encoding="UTF-8"?>
<example>
    <child_string>This is an example.</child_string>
    <child_integer>1bbbb</child_integer>
</example>';
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
if (!$xml->schemaValidate('example.xsd')) {
    print '<b>DOMDocument::schemaValidate() Generated Errors!</b>';
    libxml_display_errors();
}else{
	
	print 'ok';
}
?>