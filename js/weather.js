(function () {
    "use strict";

    var test = geoFindMe(),
        exampleWeatherResponse = '{"query":{"count":1,"created":"2017-10-21T15:55:57Z","lang":"en-US","results":{"channel":{"units":{"distance":"mi","pressure":"in","speed":"mph","temperature":"F"},"title":"Yahoo! Weather - Chicago, IL, US","link":"http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-2379574/","description":"Yahoo! Weather for Chicago, IL, US","language":"en-us","lastBuildDate":"Sat, 21 Oct 2017 10:55 AM CDT","ttl":"60","location":{"city":"Chicago","country":"United States","region":" IL"},"wind":{"chill":"59","direction":"190","speed":"25"},"atmosphere":{"humidity":"64","pressure":"997.0","rising":"0","visibility":"16.1"},"astronomy":{"sunrise":"7:10 am","sunset":"6:0 pm"},"image":{"title":"Yahoo! Weather","width":"142","height":"18","link":"http://weather.yahoo.com","url":"http://l.yimg.com/a/i/brand/purplelogo//uh/us/news-wea.gif"},"item":{"title":"Conditions for Chicago, IL, US at 10:00 AM CDT","lat":"41.884151","long":"-87.632408","link":"http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-2379574/","pubDate":"Sat, 21 Oct 2017 10:00 AM CDT","condition":{"code":"23","date":"Sat, 21 Oct 2017 10:00 AM CDT","temp":"62","text":"Breezy"},"forecast":[{"code":"23","date":"21 Oct 2017","day":"Sat","high":"73","low":"59","text":"Breezy"},{"code":"12","date":"22 Oct 2017","day":"Sun","high":"68","low":"55","text":"Rain"},{"code":"39","date":"23 Oct 2017","day":"Mon","high":"61","low":"52","text":"Scattered Showers"},{"code":"12","date":"24 Oct 2017","day":"Tue","high":"54","low":"46","text":"Rain"},{"code":"28","date":"25 Oct 2017","day":"Wed","high":"51","low":"42","text":"Mostly Cloudy"},{"code":"30","date":"26 Oct 2017","day":"Thu","high":"58","low":"47","text":"Partly Cloudy"},{"code":"28","date":"27 Oct 2017","day":"Fri","high":"53","low":"47","text":"Mostly Cloudy"},{"code":"47","date":"28 Oct 2017","day":"Sat","high":"48","low":"43","text":"Scattered Thunderstorms"},{"code":"12","date":"29 Oct 2017","day":"Sun","high":"48","low":"41","text":"Rain"},{"code":"23","date":"30 Oct 2017","day":"Mon","high":"48","low":"40","text":"Breezy"}],"description":"<![CDATA[<img src=\"http://l.yimg.com/a/i/us/we/52/23.gif\"/>\n<BR />\n<b>Current Conditions:</b>\n<BR />Breezy\n<BR />\n<BR />\n<b>Forecast:</b>\n<BR /> Sat - Breezy. High: 73Low: 59\n<BR /> Sun - Rain. High: 68Low: 55\n<BR /> Mon - Scattered Showers. High: 61Low: 52\n<BR /> Tue - Rain. High: 54Low: 46\n<BR /> Wed - Mostly Cloudy. High: 51Low: 42\n<BR />\n<BR />\n<a href=\"http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-2379574/\">Full Forecast at Yahoo! Weather</a>\n<BR />\n<BR />\n<BR />\n]]>","guid":{"isPermaLink":"false"}}}}}}';


    /* jslint browser */
    /* global window, document */

    //    URL FORMAT FOR WOID FROM LAT AND LONG
    //    http://where.yahooapis.com/geocode?location=37.42,-122.12&flags=J&gflags=R&appid=zHgnBS4m

    //    PLAIN TEXT FOR WEATHER REQUEST:
    //    https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="detroit, mi")&format=json&env=store://datatables.org/alltableswithkeys"
    //    OR URL FORMAT:
    //    https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22detroit%2C%20mi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys


    function geoFindMe() {
        var output = document.getElementById("geoPositionResponse");

        window.alert('geolocation fired');

        if (!navigator.geolocation) {
            output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
            return;
        }

        function success(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

            var img = new Image();
            img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

            output.appendChild(img);
        }

        function error() {
            output.innerHTML = "Unable to retrieve your location";
        }

        output.innerHTML = "<p>Locating…</p>";

        navigator.geolocation.getCurrentPosition(success, error);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    //    TO BE REMOVED WHEN BELOW IS UNCOMMENTED
    $("#yahooWeatherResponse").text(exampleWeatherResponse);
    //    TO BE REMOVED WHEN BELOW IS UNCOMMENTED

    //    function weatherReceived(response) {
    //        var JSONResponse;
    //        window.console.log(response);
    //        JSONResponse = JSON.stringify(response);
    //        $("#yahooWeatherResponse").text(JSONResponse);
    //    }
    //
    //    $.getJSON('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22chicago%2C%20il%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', weatherReceived);

}());
