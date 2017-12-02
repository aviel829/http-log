# http-log

# inject php code to html file on first and change the html to php
<?php
	//ASSIGN VARIABLES TO USER INFO-aviel
	$time = time() * 1000;// + microtime(); //$time = time() * 1000;
	$ip = getenv('REMOTE_ADDR');
	$userAgent = getenv('HTTP_USER_AGENT');
	$referrer = getenv('HTTP_REFERER');
	$query = getenv('QUERY_STRING');
	$requestUrl = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

	//COMBINE VARS INTO OUR LOG ENTRY-aviel
	//$msg = "IP: " . $ip . " TIME: " . $time . " REFERRER: " . $referrer . " SEARCHSTRING: " . $query . " USERAGENT: " . $userAgent;
	// HTTP Post 
	$reporting_server = "http://51.255.202.78:8000/api/report/";
	$data = array(
		'ip' => $ip,
		'time' => $time,
		'referrer' => $referrer,
		'query' => $query,
		'userAgent' => $userAgent,
		'url' => $requestUrl);
	// use key 'http' even if you send the request to https://...
	$options = array('http'=>array("header"=>"Content-type: application/x-www-form-urlencoded\r\n","method" => "POST", "content" => http_build_query($data)));
	$context = stream_context_create($options);
    $result = file_get_contents($reporting_server, false, $context);
?>
