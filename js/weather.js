(function () {
    "use strict";

    var test,
        weatherJSON;


    /* jslint browser */
    /* global window, document, navigator */

    function setWeather(response) {
        var weather = response.query,
            time = weather.created,
            respoonseCity = weather.results.channel.location.city,
            responseState = weather.results.channel.location.region,
            currentTemp = weather.results.channel.item.condition.temp,
            forcast = weather.results.channel.item.forecast,
            src = "",
            day = "",
            i;

        window.console.log("Current Temp: " + currentTemp + "\nTodays High " + forcast[0].high + "\nTodays Low " + forcast[0].low);

        $("#time").text("The weather for " + respoonseCity + ", " + responseState + " at " + time);
        $("#currentTemp").text(currentTemp);
        $("#todaysHigh").text(forcast[0].high);
        $("#todaysLow").text(forcast[0].low);

        for (i = 1; i <= forcast.length - 1; i += 1) {
            switch (forcast[i].code) {
                case "26":
                case "27":
                case "28":
                    src = "imageAssets/cloudyCroppedTransparent.png";
                    break;
                case "29":
                case "30":
                case "44":
                    src = "imageAssets/partlyCloudyCroppedTransparent.png";
                    break;
                case "1":
                case "3":
                case "4":
                case "9":
                case "11":
                case "12":
                case "35":
                case "37":
                case "38":
                case "39":
                case "40":
                case "45":
                case "46":
                case "47":
                    src = "imageAssets/rainCroppedTransparent.png";
                    break;
                case "5":
                case "6":
                case "7":
                case "8":
                case "10":
                case "13":
                case "14":
                case "15":
                case "16":
                case "17":
                case "18":
                case "41":
                case "42":
                case "43":
                    src = "imageAssets/snowCroppedTransparent.png";
                    break;
                case "31":
                case "32":
                case "33":
                case "34":
                case "36":
                    src = "imageAssets/sunnyCroppedTransparent.png";
                    break;
                case "0":
                case "2":
                case "19":
                case "20":
                case "21":
                case "22":
                case "23":
                case "24":
                case "25":
                    src = "imageAssets/windyCloudyCroppedTransparent.png";
                    break;
                default:
                    break;
            }
            window.console.log(src);
            day = '<div><img class="forecastImage weatherImage" src="' + src + '" alt="weatherType"  /><span class="forecastDay">' + forcast[i].day + '</span><span class="forecastDate">' + forcast[i].date + '</span><span class="forecastHigh">' + forcast[i].high + '</span><span class="forecastLow">' + forcast[i].low + '</span><span class="forecastText">' + forcast[i].text + '</span></div>';

            $("#forecast").append(day);
        }
    }

    function setCityAndState() {

        //// temp temp temp temp ////
        var city = $("#city").val(),
            state = $("#state").val();
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
                longitude = position.coords.longitude;

            $.getJSON('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (SELECT woeid FROM geo.places(1) WHERE text="(' + latitude + ',' + longitude + ')")&format=json&env=store://datatables.org/alltableswithkeys', setWeather);
        }

        function error() {
            window.console.log("ERROR RETRIEVING YAHOO WEATHER JSON RESPONSE");
        }

        navigator.geolocation.getCurrentPosition(success, error);
    }

    test = geoFindMe();

    $("#cityAndState").click(setCityAndState);

}());
