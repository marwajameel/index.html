<?php
// PHP Code to get Correct Client Real IP
function getRealClientIP() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        // Handle IP behind Cloudflare or Proxy
        $ipList = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        $ip = trim($ipList[0]);
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

$userIP = getRealClientIP();

// CORS Headers for Mobile Streaming Fix
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Cache-Control: no-cache, must-revalidate");

?>
