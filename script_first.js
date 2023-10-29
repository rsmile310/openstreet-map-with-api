var map;
var markerGroup;
map = new L.Map('map');
markerGroup = L.layerGroup().addTo(map);

$(document).ready(function () {
    $("#coordinate-form").on("submit", function (e) {
        e.preventDefault();
        var form = $(this);
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "getCoordinates.php",
            data: form.serialize(), // serializes the form's elements.
            success: function (data) {
                var searchResult = "";
                for (var i in data) {
                    searchResult += "<p><b>latitude: </b>" + data[i].lat + "<b> latitude: </b>" + data[i].lon + "</p>"
                }
                $("#result-box").html(searchResult);
                markerGroup.clearLayers();
                initmap(data);
            }
        });
    })
})

// Init Open Street Maps
function initmap(data) {
    let latOrigin = $("#lat").val();
    let lonOrigin = $("#lon").val();
    let numClusters = 10;

    if (data) {
        var meanData = data;
        console.log(meanData)
    }

    // set up the map
    var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, { minZoom: 2, maxZoom: 60, attribution: osmAttrib });
    map.setView(new L.LatLng(latOrigin, lonOrigin), 15);
    map.addLayer(osm);

    var redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        iconSize: [25, 41],
    });
    var marker = L.marker([latOrigin, lonOrigin], { icon: redIcon }).addTo(markerGroup);
    marker.bindPopup(latOrigin + "<br>" + lonOrigin);

    if (meanData) {
        for (let i in meanData) {
            let marker = L.marker([meanData[i].lat, meanData[i].lon]).addTo(markerGroup);
            marker.bindPopup(meanData[i].lat + "<br>" + meanData[i].lon);
            if (i == numClusters-1) break;
        }
    }
}

initmap(false);

$(window).on('load', function () {
    setTimeout(function () { // allowing 3 secs to fade out loader
        $('.page-loader').fadeOut('slow');
    }, 500);
});