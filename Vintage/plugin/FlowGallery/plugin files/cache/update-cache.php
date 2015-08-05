<?php
/*
* Caches gallery config data to a local file which is updated on a
* given time interval.
*/

$cache_file = $_REQUEST['cacheFile'];

if( get_magic_quotes_gpc() ) {
  $config = stripcslashes( $_REQUEST['config'] );
}
else {
  $config = $_REQUEST['config'];
}

// $config = json_encode($config);


// update the cache if past interval time
$fp = fopen($cache_file, 'w+'); // open or create cache

if ($fp) {
    if (flock($fp, LOCK_EX)) {
        fwrite($fp, $config);
        flock($fp, LOCK_UN);
    }

    fclose($fp);
}