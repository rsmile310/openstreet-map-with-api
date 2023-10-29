<!DOCTYPE html>
<html lang="en">

<head>
    <title>pedestrian</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/leaflet.css" />
    <style>
        .container {
            padding: 24px;
        }

        form {
            display: flex;
        }

        .form-group {
            margin-right: 24px;
        }

        .map-containter {
            display: flex;
            margin-top: 48px;
            padding-left: 24px;
        }

        #result-box {
            width: 20%;
        }

        .map-box {
            width: 80%;
        }

        #map {
            width: 100%;
            height: 750px;
        }

        .origin-marker {
            background-color: red;
        }

        /* PRELOADER CSS */
        .page-loader {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100vh;
            background: #272727;
            z-index: 1000;
        }

        /* SPINNER ANIMATION */
        .spinner {
            position: relative;
            top: 50%;
            width: 80px;
            height: 80px;
            transform: translateY(-50%);
            margin: 0 auto;
            background-color: #fff;

            border-radius: 100%;
            -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
            animation: sk-scaleout 1.0s infinite ease-in-out;
        }

        @-webkit-keyframes sk-scaleout {
            0% {
                -webkit-transform: scale(0)
            }

            100% {
                -webkit-transform: scale(1.0);
                opacity: 0;
            }
        }

        @keyframes sk-scaleout {
            0% {
                -webkit-transform: scale(0);
                transform: scale(0);
            }

            100% {
                -webkit-transform: scale(1.0);
                transform: scale(1.0);
                opacity: 0;
            }
        }
    </style>
</head>

<body>

    <div class="container">
        <form id="coordinate-form">
            <div class="form-group">
                <label for="lat">latitude:</label>
                <input type="text" id="lat" placeholder="" name="lat" value="51.4917917">
            </div>
            <div class="form-group">
                <label for="lon">latitude:</label>
                <input type="text" id="lon" placeholder="" name="lon" value="-0.1593825">
            </div>
            <div class="form-group">
                <label for="radius">radius:</label>
                <input type="text" id="radius" placeholder="" name="radius" value="2000">
            </div>
            <div class="form-group">
                <label for="limit">limit:</label>
                <input type="text" id="limit" placeholder="" name="limit" value="30">
            </div>
            <button type="submit" class="btn btn-primary">Ok</button>
        </form>
        <div class="map-containter">
            <div id="result-box"></div>
            <div class="map-box">
                <div id="map"></div>
            </div>
        </div>
        <div class="page-loader">
            <div class="spinner"></div>
        </div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/leaflet.js"></script>
    <script src="script.js"></script>
</body>

</html>