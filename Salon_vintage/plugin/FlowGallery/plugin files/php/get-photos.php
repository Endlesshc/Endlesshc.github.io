<?php

$folder = urldecode( $_REQUEST['folder'] );
$path = parse_url($folder, PHP_URL_PATH);
$path = $_SERVER['DOCUMENT_ROOT'] . $path;
$json = array();


$subFolders = glob( $path .'/*', GLOB_ONLYDIR);

if( count($subFolders) === 1 && basename($subFolders[0]) === 'thumbs' ) {
	$json = getPhotos($folder, $path, false);
}
else {
	$json = array('albums' => array());

	foreach( $subFolders as $sub ) {
		$json['albums'][] = array(
			'title' => basename($sub),
			'items' => getPhotos($folder, $sub, true)
		);
	}
}


$json = json_encode($json);

header('Content-type: application/json; charset=UTF-8');
echo $json;



function getPhotos($rootFolder, $folderPath, $isAlbums) {
	$photos = glob( $folderPath . '/*.{jpg,jpeg,png,gif}', GLOB_BRACE|GLOB_NOSORT);

	$data = array();

	if( $isAlbums ) {
		$folderUrl = $rootFolder . '/' . basename($folderPath);
	}
	else {
		$folderUrl = $rootFolder;
	}

	foreach($photos as $photo) {
		$sourceName = basename($photo);
		$thumbName = $sourceName;
		$thumbPath = $folderPath . '/thumbs/' . $thumbName;

		if( file_exists($thumbPath) ) {
			$thumb = $folderUrl .'/thumbs/' . $thumbName;
		}
		else {
			$thumb = $folderUrl . '/' . $sourceName;
		}

		$title = pathinfo($sourceName, PATHINFO_FILENAME);
		$textPath = $folderPath . '/' . $title . '.txt';

		if( file_exists($textPath) ) {
			$description = file_get_contents($textPath);
		}
		else {
			$description = '';
		}

		$data[] = array(
			'type' => 'photo',
			'source' => $folderUrl . '/' . $sourceName,
			'thumbnail' => $thumb,
			'title' => $title,
			'description' => $description
		);
	}

	return $data;
}