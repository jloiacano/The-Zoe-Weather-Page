/*global $, navigator, window, document*/

(function () {
    "use strict";

    var WEATHER_JSON,
        colorIridescentFuchsia = "rgba(250, 5, 108, 1.0)",
        colorIridescentTurquoise = "rgba(5, 250, 147, 1.0)",
        colorIridescentCobalt = "rgba(26, 5, 250, 1.0)",
        colorPastelFuchsia = "rgba(250, 192, 216, 1.0)",
        colorPastelTurquoise = "rgba(180, 250, 221, 1.0)",
        colorPastelCobalt = "rgba(186, 180, 250, 1.0)",
        colorDarkFuchsia = "rgba(122, 2, 53, 1.0)",
        colorDarkTurquoise = "rgba(2, 122, 71, 1.0)",
        colorDarkCobalt = "rgba(11, 2, 122, 1.0)",
        EXAMPLE_WEATHER_JSON;

    function codeToImage(code) {
        switch (code) {
        case "26":
        case "27":
        case "28":
            return ["imageAssets/1x/cloudyCroppedTransparent.png", "imageAssets/1x/cloudyCroppedTransparent.png 300w, imageAssets/2x/cloudyCroppedTransparent.png 600w, imageAssets/3x/cloudyCroppedTransparent.png 900w"];
        case "29":
        case "30":
        case "44":
            return ["imageAssets/1x/partlyCloudyCroppedTransparent.png", "imageAssets/1x/partlyCloudyCroppedTransparent.png 300w, imageAssets/2x/partlyCloudyCroppedTransparent.png 600w, imageAssets/3x/partlyCloudyCroppedTransparent.png 900w"];
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
            return ["imageAssets/1x/rainCroppedTransparent.png", "imageAssets/1x/rainCroppedTransparent.png 300w, imageAssets/2x/rainCroppedTransparent.png 600w, imageAssets/3x/rainCroppedTransparent.png 900w"];
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
            return ["imageAssets/1x/snowCroppedTransparent.png", "imageAssets/1x/snowCroppedTransparent.png 300w, imageAssets/2x/snowCroppedTransparent.png 600w, imageAssets/3x/snowCroppedTransparent.png 900w"];
        case "31":
        case "32":
        case "33":
        case "34":
        case "36":
            return ["imageAssets/1x/sunnyCroppedTransparent.png", "imageAssets/1x/sunnyCroppedTransparent.png 300w, imageAssets/2x/sunnyCroppedTransparent.png 600w, imageAssets/3x/sunnyCroppedTransparent.png 900w"];
        case "0":
        case "2":
        case "19":
        case "20":
        case "21":
        case "22":
        case "23":
        case "24":
        case "25":
            return ["imageAssets/1x/windyCroppedTransparent.png", "imageAssets/1x/windyCroppedTransparent.png 300w, imageAssets/2x/windyCroppedTransparent.png 600w, imageAssets/3x/windyCroppedTransparent.png 900w"];
        default:
            window.console.log("ERROR WITH codeToImage()");
            break;
        }
    }

    function showThePage() {
        $("#status").hide();
        $("#locationAndSettingsImagesWrapper").show();
        $("#main").show();
        $("#forecast").show();

    }

    function showAbout() {
        $("#locationAndSettingsImagesWrapper").hide();
        $("#main").hide();
        $("#forecast").hide();
        $("#settingsInputsWrapper").hide();
        $("#about").show();
    }

    function showZoe() {
        $("#about").hide();
        $("#zoe").show();
    }

    function openGeorgesWebsite() {
        var win = window.open('https://backpacker.gr/', '_blank');
        if (win) {
            win.focus();
        }
    }

    function openLoiacanoDesignsWebpage() {
        var win = window.open('https://jloiacano.github.io/', '_blank');
        if (win) {
            win.focus();
        }
    }

    function showLocationInputs() {
        if ($("#locationInputsWrapper").css("display") === "none") {
            $('#locationInputsWrapper').show();
            $('#locationAndSettingsImagesWrapper').hide();

        } else {
            $('#locationInputsWrapper').hide();
            $('#locationAndSettingsImagesWrapper').show();
        }
    }

    function showSettingsInputs() {
        if ($("#settingsInputsWrapper").css("display") === "none") {
            $('#settingsInputsWrapper').show();
            $('#locationAndSettingsImagesWrapper').hide();
        } else {
            $('#settingsInputsWrapper').hide();
            $('#locationAndSettingsImagesWrapper').show();
        }
    }

    function closeAbout() {
        $("#about").hide();
        $("#zoe").hide();
        showThePage();
    }

    function forceLocationEntry() {
        window.console.log("forceLocationEntry invoked");
        showLocationInputs();
        $("#main").hide();
        $("#city").css("border", "2px solid rgba(5, 250, 24, 1.0)");
        $("#state").css("border", "2px solid rgba(5, 250, 24, 1.0)");
    }

    function doSomethingWithTheWeather() {
        var weather = WEATHER_JSON,
            time = weather.created,
            respoonseCity = weather.results.channel.location.city,
            responseState = weather.results.channel.location.region,
            currentTemp = weather.results.channel.item.condition.temp,
            forecast = weather.results.channel.item.forecast,
            i,
            template = $(".forecastDayDiv"),
            clone;

        function parseDateString(dateString) {
            var month,
                months = [null, "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
                day,
                returnableDateString;
            month = months.indexOf(dateString.slice(3, 6).toLowerCase());
            day = dateString.slice(0, 2);
            returnableDateString = month + "/" + day;
            return returnableDateString;
        }

        $("#time").text("The weather for " + respoonseCity + ", " + responseState + " at " + time);
        $("#todaysImage").attr('src', codeToImage(forecast[0].code)[0]);
        $("#todaysImage").attr('srcset', codeToImage(forecast[0].code)[1]);
        $("#currentTemp").text(currentTemp);
        $("#todaysHigh").text(forecast[0].high);
        $("#todaysLow").text(forecast[0].low);
        $(".weatherLocation").text(respoonseCity + ", " + responseState);
        $("#windChill").text(weather.results.channel.wind.chill);
        $("#windDirection").text(weather.results.channel.wind.direction);
        $("#windSpeed").text(weather.results.channel.wind.speed);
        $("#atmosphereHumidity").text(weather.results.channel.atmosphere.humidity);
        $("#atmospherePressure").text(weather.results.channel.atmosphere.pressure);
        $("#atmosphereRising").text(weather.results.channel.atmosphere.rising);
        $("#atmosphereVisibility").text(weather.results.channel.atmosphere.visibility);
        $("#astronomySunrise").text(weather.results.channel.astronomy.sunrise);
        $("#astronomySunset").text(weather.results.channel.astronomy.sunset);


        $("#forecast").children().empty();

        // set the forecast data and append it to the forecast div
        for (i = 1; i <= forecast.length - 1; i += 1) {
            clone = template.clone();
            clone.attr('origin', "clone");
            $("#forecast").append(clone);
            clone.find(".forecastImage").attr('src', codeToImage(forecast[i].code)[0]);
            clone.find(".forecastImage").attr('srcset', codeToImage(forecast[i].code)[1]);
            clone.find(".forecastDay").append(forecast[i].day);
            clone.find(".forecastDate").append(parseDateString(forecast[i].date));
            clone.find(".forecastHigh").append("HIGH: " + forecast[i].high + "°");
            clone.find(".forecastLow").append("LOW: " + forecast[i].low + "°");
            clone.find(".forecastText").append(forecast[i].text);
            clone.show();
        }

        showThePage();
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
            WEATHER_JSON.results.channel.wind.chill = toC(WEATHER_JSON.results.channel.wind.chill);
            for (i = 0; i < WEATHER_JSON.results.channel.item.forecast.length; i += 1) {
                WEATHER_JSON.results.channel.item.forecast[i].high = toC(WEATHER_JSON.results.channel.item.forecast[i].high);
                WEATHER_JSON.results.channel.item.forecast[i].low = toC(WEATHER_JSON.results.channel.item.forecast[i].low);
            }
        }
        doSomethingWithTheWeather();
    }

    function getCookie(cname) {
        var name = cname + "=",
            decodedCookie = decodeURIComponent(document.cookie),
            ca = decodedCookie.split(';'),
            i,
            c;
        for (i = 0; i < ca.length; i += 1) {
            c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function loadFromCookie() {
        var cookieCity = getCookie("city"),
            cookieState = getCookie("state");

        $.getJSON('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + cookieCity + "," + cookieState + '")&format=json&env=store://datatables.org/alltableswithkeys', setWeather);

    }

    function getSomeWeather() {
        $("#status").show();

        if (!navigator.geolocation) {
            if (!document.cookie) {
                forceLocationEntry();
            } else {
                loadFromCookie();
            }
            return;
        }

        function success(position) {
            var latitude = position.coords.latitude,
                longitude = position.coords.longitude;

            $.getJSON('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (SELECT woeid FROM geo.places(1) WHERE text="(' + latitude + ',' + longitude + ')")&format=json&env=store://datatables.org/alltableswithkeys', setWeather);
        }

        function error() {
            window.console.log("ERROR RETRIEVING YAHOO WEATHER JSON RESPONSE");
            $("#status").hide();
            if (!document.cookie) {
                forceLocationEntry();
            } else {
                loadFromCookie();
            }
//            setWeather(EXAMPLE_WEATHER_JSON);
        }

        navigator.geolocation.getCurrentPosition(success, error);
    }

    function changeTheElementColors(primary, secondary, tertiary, percentage) {
        $("body").css("background-color", primary);
        $("body").css("color", tertiary);
        $("#otherData").css("background-color", secondary);
        $(".relativeWrapper").css("border", "1px solid " + secondary);
        $("img").css("filter", "brightness(" + percentage + "%)");
        $("img").css("-webkit-filter", "brightness(" + percentage + "%)");
    }

    function changeTheButtonColors(buttonArray, textColor, backgroundColor) {
        var i;

        function actuallyChangeTheButtonColor(element) {
            $(element).css("background-color", backgroundColor);
            $(element).css("color", textColor);
            $(element).hover(function () {
                $(this).css("background-color", textColor);
            }, function () {
                $(this).css("background-color", backgroundColor);
            });
            $(element).hover(function () {
                $(this).css("color", backgroundColor);
            }, function () {
                $(this).css("color", textColor);
            });
        }

        for (i = 0; i < buttonArray.length; i += 1) {
            actuallyChangeTheButtonColor(buttonArray[i]);
        }
    }

    function changeTheColorTheme() {
        var buttonArray = [".btn-1g", ".btn-2g"];

        window.console.log("color changer clicked and changed to: ");
        if ($("input:radio[name='colors']:checked").val() === "iridescent") {

            changeTheElementColors(colorIridescentFuchsia, colorIridescentTurquoise, colorIridescentCobalt, 100);
            changeTheButtonColors(buttonArray, colorIridescentFuchsia, colorIridescentTurquoise);


        } else if ($("input:radio[name='colors']:checked").val() === "pastel") {
            changeTheElementColors(colorPastelFuchsia, colorPastelTurquoise, colorPastelCobalt, 100);
            changeTheButtonColors(buttonArray, colorPastelFuchsia, colorPastelTurquoise);

        } else if ($("input:radio[name='colors']:checked").val() === "dark") {
            changeTheElementColors(colorDarkFuchsia, colorDarkTurquoise, colorDarkCobalt, 50);
            changeTheButtonColors(buttonArray, colorDarkFuchsia, colorDarkTurquoise);
        }
        showSettingsInputs();
        getSomeWeather();
    }

    function loadFromCityAndState() {
        $("#main").show();
        var city = $("#city").val(),
            state = $("#state").val();

        document.cookie = "city=" + city.toLocaleLowerCase() + ";";
        document.cookie = "state=" + state.toLocaleLowerCase() + ";";
        $("#city").css("border", "initial");
        $("#state").css("border", "initial");

        showLocationInputs();
        $.getJSON('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + city + ',' + state + '")&format=json&env=store://datatables.org/alltableswithkeys', setWeather);
    }

    getSomeWeather();

    $("#locationImage").click(showLocationInputs);
    $("#settingsImage").click(showSettingsInputs);

    $("#cityAndStateButton").click(loadFromCityAndState);

    $("#updateSettingsButton").click(changeTheColorTheme);
    $("#aboutButton").click(showAbout);
    $("#zoeButton").click(showZoe);
    $("#fontButton").click(openGeorgesWebsite);
    $("#loiacanoButton").click(openLoiacanoDesignsWebpage);

    $(".aboutCloseButton").click(closeAbout);

}());
