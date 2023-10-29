<?php
// $lat = $_POST['lat'];
// $lon = $_POST['lon'];
// $radius = $_POST['radius'];
// $limit = $_POST['limit'];

// // Construct Overpass API query
// $query = "[out:json];
// way[highway=pedestrian](around:$radius,$lat,$lon);
// (._;>;);
// out geom;";
// $url = "https://overpass-api.de/api/interpreter?data=" . urlencode($query);
// $data = file_get_contents($url);

// $json = json_decode($data);

// // Parse the JSON data and extract pedestrian areas
// $coordinates = array();
// foreach ($json->elements as $element) {
//     if (isset($element->geometry)) {
//         foreach ($element->geometry as $geometry) {
//             $coordinates[] = array("lat" => floatval($geometry->lat), "lon" => floatval($geometry->lon));
//         }
//     }
// }
// echo json_encode($coordinates);



$lat = $_POST['lat'];
$lon = $_POST['lon'];
$radius = $_POST['radius'];
$limit = $_POST['limit'];


// Construct Overpass API query
// $query = "[out:json];
//     way[highway=pedestrian](around:$radius,$lat,$lon);
//     (._;>;);
//     out center meta;";
$query = "[out:json];
    way['sidewalk'!~'.'](around:$radius,$lat,$lon);
    (._;>;);
    out center meta;";
    
$url = "https://overpass-api.de/api/interpreter?data=" . urlencode($query);
$data = file_get_contents($url);

$json = json_decode($data);

// Parse the JSON data and extract pedestrian areas
$coordinates = array();
foreach ($json->elements as $element) {
    if (isset($element->center->lat) && isset($element->center->lon)) {
        $coordinates[] = array("lat" => floatval($element->center->lat), "lon" => floatval($element->center->lon));
    }
}
echo json_encode($coordinates);
// print_r($data);