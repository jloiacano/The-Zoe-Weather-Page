(function () {
    "use strict";

    var test,
        WEATHER_JSON,
        exampleJSON = '{"query":{"count":1,"created":"2017-10-23T12:24:17Z","lang":"en-US","results":{"channel":{"units":{"distance":"mi","pressure":"in","speed":"mph","temperature":"F"},"title":"Yahoo! Weather - Libertyville, IL, US","link":"http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-2439117/","description":"Yahoo! Weather for Libertyville, IL, US","language":"en-us","lastBuildDate":"Mon, 23 Oct 2017 07:24 AM CDT","ttl":"60","location":{"city":"Libertyville","country":"United States","region":" IL"},"wind":{"chill":"48","direction":"10","speed":"11"},"atmosphere":{"humidity":"99","pressure":"986.0","rising":"0","visibility":"4.9"},"astronomy":{"sunrise":"7:14 am","sunset":"5:58 pm"},"image":{"title":"Yahoo! Weather","width":"142","height":"18","link":"http://weather.yahoo.com","url":"http://l.yimg.com/a/i/brand/purplelogo//uh/us/news-wea.gif"},"item":{"title":"Conditions for Libertyville, IL, US at 06:00 AM CDT","lat":"42.287819","long":"-87.952301","link":"http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-2439117/","pubDate":"Mon, 23 Oct 2017 06:00 AM CDT","condition":{"code":"12","date":"Mon, 23 Oct 2017 06:00 AM CDT","temp":"50","text":"Rain"},"forecast":[{"code":"12","date":"23 Oct 2017","day":"Mon","high":"57","low":"50","text":"Rain"},{"code":"11","date":"24 Oct 2017","day":"Tue","high":"49","low":"42","text":"Showers"},{"code":"30","date":"25 Oct 2017","day":"Wed","high":"51","low":"37","text":"Partly Cloudy"},{"code":"28","date":"26 Oct 2017","day":"Thu","high":"59","low":"40","text":"Mostly Cloudy"},{"code":"23","date":"27 Oct 2017","day":"Fri","high":"48","low":"39","text":"Breezy"},{"code":"30","date":"28 Oct 2017","day":"Sat","high":"46","low":"35","text":"Partly Cloudy"},{"code":"30","date":"29 Oct 2017","day":"Sun","high":"50","low":"35","text":"Partly Cloudy"},{"code":"30","date":"30 Oct 2017","day":"Mon","high":"52","low":"37","text":"Partly Cloudy"},{"code":"30","date":"31 Oct 2017","day":"Tue","high":"51","low":"38","text":"Partly Cloudy"},{"code":"28","date":"01 Nov 2017","day":"Wed","high":"54","low":"40","text":"Mostly Cloudy"}],"description":"<![CDATA[<img src=\"http://l.yimg.com/a/i/us/we/52/12.gif\"/>\n<BR />\n<b>Current Conditions:</b>\n<BR />Rain\n<BR />\n<BR />\n<b>Forecast:</b>\n<BR /> Mon - Rain. High: 57Low: 50\n<BR /> Tue - Showers. High: 49Low: 42\n<BR /> Wed - Partly Cloudy. High: 51Low: 37\n<BR /> Thu - Mostly Cloudy. High: 59Low: 40\n<BR /> Fri - Breezy. High: 48Low: 39\n<BR />\n<BR />\n<a href=\"http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-2439117/\">Full Forecast at Yahoo! Weather</a>\n<BR />\n<BR />\n<BR />\n]]>","guid":{"isPermaLink":"false"}}}}}}';


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

        // set the forecast data and append it to the forecast div
        for (i = 1; i <= forcast.length - 1; i += 1) {
            src = codeToImage(forcast[i].code);

            day = '<div class="day forcastDay"><img class="forecastImage weatherImage" src="' + src + '" alt="weatherType"  /><span class="forecastDay">' + forcast[i].day + ' </span><span class="forecastDate">' + forcast[i].date + '</span><br /><span class="forecastHigh">HIGH: ' + forcast[i].high + '</span><br /><span class="forecastLow">lOW: ' + forcast[i].low + '</span><br /><span class="forecastText">' + forcast[i].text + '</span></div>';

            $("#forecast").append(day);
        }
    }

    function setWeather(response) {
        var i;
        WEATHER_JSON = response.query;

        function toC(temp) {
            var toReturn = (temp - 32) * 1.8;
            return toReturn;
        }

        if ($("input:radio[name='scale']:checked").val() === "celsius") {
            window.alert("celsified");
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

}());
