(function () {
    "use strict";

    var test,
        WEATHER_JSON,
        colorIridescentFuchsia = "rgba(250, 5, 108, 1.0)",
        colorIridescentTurquoise = "rgba(5, 250, 147, 1.0)",
        colorIridescentCobalt = "rgba(26, 5, 250, 1.0)",
        colorPastelFuchsia = "rgba(250, 192, 216, 1.0)",
        colorPastelTurquoise = "rgba(180, 250, 221, 1.0)",
        colorPastelCobalt = "rgba(186, 180, 250, 1.0)",
        colorDarkFuchsia = "rgba(122, 2, 53, 1.0)",
        colorDarkTurquoise =  "rgba(2, 122, 71, 1.0)",
        colorDarkCobalt = "rgba(11, 2, 122, 1.0)";


    /* jslint browser */
    /* global window, document, navigator */

    function codeToImage(code) {
        switch (code) {
        case "26":
        case "27":
        case "28":
            return "imageAssets/cloudyCroppedTransparent.png";
        case "29":
        case "30":
        case "44":
            return "imageAssets/partlyCloudyCroppedTransparent.png";
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
            return "imageAssets/rainCroppedTransparent.png";
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
            return "imageAssets/snowCroppedTransparent.png";
        case "31":
        case "32":
        case "33":
        case "34":
        case "36":
            return "imageAssets/sunnyCroppedTransparent.png";
        case "0":
        case "2":
        case "19":
        case "20":
        case "21":
        case "22":
        case "23":
        case "24":
        case "25":
            return "imageAssets/windyCroppedTransparent.png";
        default:
            window.console.log("ERROR WITH codeToImage()");
            break;
        }
    }

    function changeTheColors() {
        window.console.log("color changer clicked and changed to: ");
        if ($("input:radio[name='colors']:checked").val() === "iridescent") {
            window.console.log("iridescent");
            $("body").css("background-color", colorIridescentFuchsia);
            $("body").css("color", colorIridescentCobalt);
            $(".location").css("background-color", colorIridescentTurquoise);
            $(".settings").css("background-color", colorIridescentTurquoise);
            $("#otherData").css("background-color", colorIridescentTurquoise);
            $(".forcastDayDiv").css("border", "1px solid " + colorIridescentTurquoise);
            $("img").css("filter", "brightness(100%)");
            $("img").css("-webkit-filter", "brightness(100%)");

        } else if ($("input:radio[name='colors']:checked").val() === "pastel") {
            window.console.log("pastel");
            $("body").css("background-color", colorPastelFuchsia);
            $("body").css("color", colorPastelCobalt);
            $(".location").css("background-color", colorPastelTurquoise);
            $(".settings").css("background-color", colorPastelTurquoise);
            $("#otherData").css("background-color", colorPastelTurquoise);
            $(".forcastDayDiv").css("border", "1px solid " + colorPastelTurquoise);
            $("img").css("filter", "brightness(100%)");
            $("img").css("-webkit-filter", "brightness(100%)");

        } else if ($("input:radio[name='colors']:checked").val() === "dark") {
            window.console.log("dark");
            $("body").css("background-color", colorDarkFuchsia);
            $("body").css("color", colorDarkCobalt);
            $(".location").css("background-color", colorDarkTurquoise);
            $(".settings").css("background-color", colorDarkTurquoise);
            $("#otherData").css("background-color", colorDarkTurquoise);
            $(".forcastDayDiv").css("border", "1px solid " + colorDarkTurquoise);
            $("img").css("filter", "brightness(50%)");
            $("img").css("-webkit-filter", "brightness(50%)");
        }
    }

    function doSomethingWithTheWeather() {
        var weather = WEATHER_JSON,
            time = weather.created,
            respoonseCity = weather.results.channel.location.city,
            responseState = weather.results.channel.location.region,
            currentTemp = weather.results.channel.item.condition.temp,
            forcast = weather.results.channel.item.forecast,
            src = "",
            day = "",
            i;

        $("#time").text("The weather for " + respoonseCity + ", " + responseState + " at " + time);
        $("#todaysImage").attr('src', codeToImage(forcast[0].code));
        $("#currentTemp").text(currentTemp);
        $("#todaysHigh").text(forcast[0].high);
        $("#todaysLow").text(forcast[0].low);
        $("#windChill").text(weather.results.channel.wind.chill);
        $("#windDirection").text(weather.results.channel.wind.direction);
        $("#windSpeed").text(weather.results.channel.wind.speed);
        $("#atmosphereHumidity").text(weather.results.channel.atmosphere.humidity);
        $("#atmospherePressure").text(weather.results.channel.atmosphere.pressure);
        $("#atmosphereRising").text(weather.results.channel.atmosphere.rising);
        $("#atmosphereVisibility").text(weather.results.channel.atmosphere.visibility);
        $("#astronomySunrise").text(weather.results.channel.astronomy.sunrise);
        $("#astronomySunset").text(weather.results.channel.astronomy.sunset);


        $("#forecast").html("");
        // set the forecast data and append it to the forecast div
        for (i = 1; i <= forcast.length - 1; i += 1) {
            src = codeToImage(forcast[i].code);

            day = '<div class="forcastDayDiv"><img class="forecastImage weatherImage" src="' + src + '" alt="weatherType" /><span class="forecastDayAndDate"><span class="forecastDay">' + forcast[i].day + '</span><span class="forecastDate">' + forcast[i].date + '</span></span><span class="wholeForecastHigh">HIGH: <span class="forecastHigh">' + forcast[i].high + '</span><span>°</span></span><span class="wholeForecastLow">LOW: <span class="forecastLow">' + forcast[i].low + '</span><span>°</span></span><span class="forecastText">' + forcast[i].text + '</span></div>';

            $("#forecast").append(day);
        }
    }

    function setWeather(response) {
        var i;
        WEATHER_JSON = response.query;

        function toC(temp) {
            var toReturn = (temp - 32) * 1.8;
            toReturn = Math.ceil(toReturn * 10) / 10;
            return toReturn;
        }

        if ($("input:radio[name='scale']:checked").val() === "celsius") {
            WEATHER_JSON.results.channel.item.condition.temp = toC(WEATHER_JSON.results.channel.item.condition.temp);
            for (i = 0; i < WEATHER_JSON.results.channel.item.forecast.length; i += 1) {
                WEATHER_JSON.results.channel.item.forecast[i].high = toC(WEATHER_JSON.results.channel.item.forecast[i].high);
                WEATHER_JSON.results.channel.item.forecast[i].low = toC(WEATHER_JSON.results.channel.item.forecast[i].low);
            }
        }
        doSomethingWithTheWeather();
    }

    function loadFromCityAndState() {

        //// temp temp temp temp ////
        var city = $("#city").val(),
            state = $("#state").val();
        //// temp temp temp temp ////

        $.getJSON('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + city + ',' + state + '")&format=json&env=store://datatables.org/alltableswithkeys', setWeather);

    }

    function forceLocationEntry() {
        // if location entry is already set, loadFromCityAndState();
        //openLocationMenu
        //highlight city, then state after city is entered
        // loadFromCityAndState();

    }

    function getSomeWeather() {

        if (!navigator.geolocation) {
            forceLocationEntry();
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

    function testFunction() {
        window.alert("testing");
    }

    test = getSomeWeather();

    $("#cityAndState").click(loadFromCityAndState);
    $("#changeScale").click(getSomeWeather);
    $("#changeColors").click(changeTheColors);

}());
