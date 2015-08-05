<?php

$photo = urldecode( $_REQUEST['photo'] );
$path = parse_url($photo, PHP_URL_PATH);
$path = $_SERVER['DOCUMENT_ROOT'] . $path;
$data = array();

$exif = exif_read_data($path, null, true);

if( $exif !== false ) {

	if( array_key_exists('ImageDescription', $exif['IFD0']) ) {
		$data[] = 'Description: ' . $exif['IFD0']['ImageDescription'];
	}

	if( array_key_exists('Make', $exif['IFD0']) || array_key_exists('Model', $exif['IFD0']) ) {
		$data[] = 'Camera: ' . $exif['IFD0']['Make'] .' '. $exif['IFD0']['Model'];
	}

	if( array_key_exists('ExposureTime', $exif['EXIF']) ) {
		$data[] = 'Exposure Time: ' . $exif['EXIF']['ExposureTime'];
	}

	if( array_key_exists('ApertureFNumber', $exif['COMPUTED']) ) {
		$data[] = 'Aperture: ' . $exif['COMPUTED']['ApertureFNumber'];
	}

	if( array_key_exists('FocalLength', $exif['EXIF']) ) {
		$data[] = 'Focal Length: ' . $exif['EXIF']['FocalLength'];
	}

	if( array_key_exists('FNumber', $exif['EXIF']) ) {
		$data[] = 'FNumber: ' . $exif['EXIF']['FNumber'];
	}

	if( array_key_exists('ExposureBiasValue', $exif['EXIF']) ) {
		$data[] = 'Exposure Bias Value: ' . $exif['EXIF']['ExposureBiasValue'];
	}

	if( array_key_exists('ISOSpeedRatings', $exif['EXIF']) ) {
		$data[] = 'ISO: ' . $exif['EXIF']['ISOSpeedRatings'];
	}

	if( array_key_exists('Artist', $exif['IFD0']) ) {
		$data[] = 'Artist: ' . $exif['IFD0']['Artist'];
	}

	if( array_key_exists('Copyright', $exif['IFD0']) ) {
		$data[] = 'Copyright: ' . $exif['IFD0']['Copyright'];
	}

}

echo implode($data, '<br>');