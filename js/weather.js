(function () {
    "use strict";

    var test,
        city,
        state;


    /* jslint browser */
    /* global window, document */


    function setWeather(response) {
        var JSONResponse;
        window.console.log(response);
        JSONResponse = JSON.stringify(response);
        $("#weatherResponse").html(JSONResponse);
    }

    function setCityAndState() {
        window.console.log("setCityAndState called");

        //// temp temp temp temp ////
        city = "chicago";
        state = "il";
        //// temp temp temp temp ////

        $.getJSON('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + city + ',' + state + '")&format=json&env=store://datatables.org/alltableswithkeys', setWeather);

    }

    function geoFindMe() {

        if (!navigator.geolocation) {
            $("#geoPosition").html("<p>Geolocation is not supported by your browser</p>");
            // open area where user can input city and state.
            return;
        }

        function success(position) {
            var latitude = position.coords.latitude,
                longitude = position.coords.longitude,
                img = new Image();

            $("#geoPosition").html('<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>');

            img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

            $("#geoPosition").append(img);

            $.getJSON('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (SELECT woeid FROM geo.places(1) WHERE text="(' + latitude + ',' + longitude + ')")&format=json&env=store://datatables.org/alltableswithkeys', setWeather);
        }

        function error() {
            $("#geoPosition").html("Unable to retrieve your location");
        }

        $("#geoPosition").html("<p>Locating…</p>");

        navigator.geolocation.getCurrentPosition(success, error);
    }

    test = geoFindMe();
}());
