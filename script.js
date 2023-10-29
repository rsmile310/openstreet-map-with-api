var map;
var markerGroup;
map = new L.Map('map');
markerGroup = L.layerGroup().addTo(map);

$(document).ready(function () {
    $("#coordinate-form").on("submit", function (e) {
        e.preventDefault();
        var form = $(this);
        $('.page-loader').show();
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "getCoordinates.php",
            data: form.serialize(), // serializes the form's elements.
            success: function (data) {
                console.log(data)
                $('.page-loader').fadeOut('slow')
                var searchResult = "";
                for (var i in data) {
                    console.log(data[i])
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
    let numClusters = parseFloat($("#limit").val());
    console.log("numdddddddddd", numClusters)

    if (data) {
        var meanData = getKMeanCoords(data, numClusters);
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
        }
    }
}

initmap(false);

$(window).on('load', function () {
    setTimeout(function () {
        $('.page-loader').fadeOut('slow');
    }, 500);
});

// Initialize the cluster centers randomly

function distance(point1, point2) {
    const dx = point1.lat - point2.lat;
    const dy = point2.lon - point2.lon;
    return Math.sqrt(dx * dx + dy * dy);
}

function assignPointsToClusters(coordinates, centers, numClusters) {
    const clusters = new Array(numClusters).fill().map(() => []);
    coordinates.forEach((coordinate) => {
        let minDist = Infinity;
        let minIndex = -1;
        centers.forEach((center, index) => {
            const dist = distance(coordinate, center);
            if (dist < minDist) {
                minDist = dist;
                minIndex = index;
            }
        });
        clusters[minIndex].push(coordinate);
    });
    return clusters;
}

function getDistinctRandomIndices(num, max) {
    let indices = new Set();
    while (indices.size < num) {
        indices.add(Math.floor(Math.random() * max));
    }
    return Array.from(indices);
}

function getKMeanCoords(coordinates, num) {
    const numClusters = num;

    const centers = [];
    const indices = getDistinctRandomIndices(numClusters, coordinates.length);
    for (let i = 0; i < numClusters; i++) {
        const center = coordinates[indices[i]];
        centers.push(center);
    }
    let prevClusters;
    let currClusters = assignPointsToClusters(coordinates, centers, numClusters);

    while (!prevClusters || JSON.stringify(prevClusters) !== JSON.stringify(currClusters)) {
        prevClusters = currClusters;

        // centers = updateClusterCenters(currClusters);
        currClusters = assignPointsToClusters(coordinates, centers, numClusters);
    }

    const centerCoordinates = centers;
    return centerCoordinates;
}