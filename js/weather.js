/*global $, navigator, window*/

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
        EXAMPLE_WEATHER_JSON = {
            query: {
                count: 1,
                created: "2017-10-26T20:41:42Z",
                lang: "en-US",
                results: {
                    channel: {
                        units: {
                            distance: "mi",
                            pressure: "in",
                            speed: "mph",
                            temperature: "F"
                        },
                        title: "Yahoo! Weather",
                        link: "http:\/\/us.rd.yahoo.com\/",
                        description: "Yahoo! Weather for a city, ST, US",
                        language: "en-us",
                        lastBuildDate: "Thu, 26 Oct 2017 12:41 PM AKDT",
                        ttl: "60",
                        location: {
                            city: "A City",
                            country: "United States",
                            region: " A State"
                        },
                        wind: {
                            chill: "23",
                            direction: "45",
                            speed: "18"
                        },
                        atmosphere: {
                            humidity: "85",
                            pressure: "991.0",
                            rising: "0",
                            visibility: "16.1"
                        },
                        astronomy: {
                            sunrise: "10:27 am",
                            sunset: "7:2 pm"
                        },
                        image: {
                            title: "Yahoo! Weather",
                            width: "142",
                            height: "18",
                            link: "http:\/\/weather.yahoo.com",
                            url: "http:\/\/l.yimg.com\/a\/i\/brand\/purplelogo\/\/uh\/us\/news-wea.gif"
                        },
                        item: {
                            title: "Conditions for Nome, AK, US at 11:00 AM AKDT",
                            lat: "64.499474",
                            long: "-165.405792",
                            link: "http:\/\/us.rd.yahoo.com\/dailynews\/rss\/weather\/Country__Country\/*https:\/\/weather.yahoo.com\/country\/state\/city-2460286\/",
                            pubDate: "Thu, 26 Oct 2017 11:00 AM AKDT",
                            condition: {
                                code: "26",
                                date: "Thu, 26 Oct 2017 11:00 AM AKDT",
                                temp: "32",
                                text: "Cloudy"
                            },
                            forecast: [
                                {
                                    code: "26",
                                    date: "26 Oct 2017",
                                    day: "Thu",
                                    high: "33",
                                    low: "28",
                                    text: "Cloudy"
                                },
                                {
                                    code: "26",
                                    date: "27 Oct 2017",
                                    day: "Fri",
                                    high: "34",
                                    low: "30",
                                    text: "Cloudy"
                                },
                                {
                                    code: "28",
                                    date: "28 Oct 2017",
                                    day: "Sat",
                                    high: "34",
                                    low: "31",
                                    text: "Mostly Cloudy"
                                },
                                {
                                    code: "28",
                                    date: "29 Oct 2017",
                                    day: "Sun",
                                    high: "36",
                                    low: "34",
                                    text: "Mostly Cloudy"
                                },
                                {
                                    code: "32",
                                    date: "30 Oct 2017",
                                    day: "Mon",
                                    high: "33",
                                    low: "24",
                                    text: "Sunny"
                                },
                                {
                                    code: "32",
                                    date: "31 Oct 2017",
                                    day: "Tue",
                                    high: "28",
                                    low: "19",
                                    text: "Sunny"
                                },
                                {
                                    code: "32",
                                    date: "01 Nov 2017",
                                    day: "Wed",
                                    high: "30",
                                    low: "24",
                                    text: "Sunny"
                                },
                                {
                                    code: "26",
                                    date: "02 Nov 2017",
                                    day: "Thu",
                                    high: "34",
                                    low: "29",
                                    text: "Cloudy"
                                },
                                {
                                    code: "26",
                                    date: "03 Nov 2017",
                                    day: "Fri",
                                    high: "38",
                                    low: "33",
                                    text: "Cloudy"
                                },
                                {
                                    code: "26",
                                    date: "04 Nov 2017",
                                    day: "Sat",
                                    high: "37",
                                    low: "35",
                                    text: "Cloudy"
                                }
                            ],
                            "guid": {
                                "isPermaLink": "false"
                            }
                        }
                    }
                }
            }
        };

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

        $("#time").text("The weather for " + respoonseCity + ", " + responseState + " at " + time);
        $("#todaysImage").attr('src', codeToImage(forecast[0].code));
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
            $("#forecast").append(clone);
            clone.find(".forecastImage").attr('src', codeToImage(forecast[i].code));
            clone.find(".forecastDay").append(forecast[i].day);
            clone.find(".forecastDate").append(forecast[i].date);
            clone.find(".forecastHigh").append("HIGH: " + forecast[i].high + "°");
            clone.find(".forecastLow").append("LOW: " + forecast[i].low + "°");
            clone.find(".forecastText").append(forecast[i].text);
            clone.show();
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
            WEATHER_JSON.results.channel.wind.chill = toC(WEATHER_JSON.results.channel.wind.chill);
            for (i = 0; i < WEATHER_JSON.results.channel.item.forecast.length; i += 1) {
                WEATHER_JSON.results.channel.item.forecast[i].high = toC(WEATHER_JSON.results.channel.item.forecast[i].high);
                WEATHER_JSON.results.channel.item.forecast[i].low = toC(WEATHER_JSON.results.channel.item.forecast[i].low);
            }
        }
        doSomethingWithTheWeather();
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

            //            TO DO CHANGE THIS BACK WHEN DONE DEBUGGING AND REFACTORING
            //            forceLocationEntry();
            setWeather(EXAMPLE_WEATHER_JSON);
        }

        navigator.geolocation.getCurrentPosition(success, error);
    }

    function changeTheColors() {
        window.console.log("color changer clicked and changed to: ");
        if ($("input:radio[name='colors']:checked").val() === "iridescent") {
            window.console.log("iridescent");
            $("body").css("background-color", colorIridescentFuchsia);
            $("body").css("color", colorIridescentCobalt);
            $(".btn-2g").css("background-color", colorIridescentTurquoise);
            $(".btn-2g").css("color", colorIridescentFuchsia);
            $(".btn-2g").hover(function () {
                $(this).css("background-color", colorIridescentFuchsia);
            }, function () {
                $(this).css("background-color", colorIridescentTurquoise);
            });
            $(".btn-2g").hover(function () {
                $(this).css("color", colorIridescentTurquoise);
            }, function () {
                $(this).css("color", colorIridescentFuchsia);
            });
            $(".btn-1g").css("background-color", colorIridescentTurquoise);
            $(".btn-1g").css("color", colorIridescentFuchsia);
            $(".btn-1g").hover(function () {
                $(this).css("background-color", colorIridescentFuchsia);
            }, function () {
                $(this).css("background-color", colorIridescentTurquoise);
            });
            $(".btn-1g").hover(function () {
                $(this).css("color", colorIridescentTurquoise);
            }, function () {
                $(this).css("color", colorIridescentFuchsia);
            });
            $("#otherData").css("background-color", colorIridescentTurquoise);
            $(".relativeWrapper").css("border", "1px solid " + colorIridescentTurquoise);
            $("img").css("filter", "brightness(100%)");
            $("img").css("-webkit-filter", "brightness(100%)");

        } else if ($("input:radio[name='colors']:checked").val() === "pastel") {
            window.console.log("pastel");
            $("body").css("background-color", colorPastelFuchsia);
            $("body").css("color", colorPastelCobalt);
            $(".btn-2g").css("background-color", colorPastelTurquoise);
            $(".btn-2g").css("color", colorPastelFuchsia);
            $(".btn-2g").hover(function () {
                $(this).css("background-color", colorPastelFuchsia);
            }, function () {
                $(this).css("background-color", colorPastelTurquoise);
            });
            $(".btn-2g").hover(function () {
                $(this).css("color", colorPastelTurquoise);
            }, function () {
                $(this).css("color", colorPastelFuchsia);
            });
            $(".btn-1g").css("background-color", colorPastelTurquoise);
            $(".btn-1g").css("color", colorPastelFuchsia);
            $(".btn-1g").hover(function () {
                $(this).css("background-color", colorPastelFuchsia);
            }, function () {
                $(this).css("background-color", colorPastelTurquoise);
            });
            $(".btn-1g").hover(function () {
                $(this).css("color", colorPastelTurquoise);
            }, function () {
                $(this).css("color", colorPastelFuchsia);
            });
            $("#otherData").css("background-color", colorPastelTurquoise);
            $(".relativeWrapper").css("border", "1px solid " + colorPastelTurquoise);
            $("img").css("filter", "brightness(100%)");
            $("img").css("-webkit-filter", "brightness(100%)");

        } else if ($("input:radio[name='colors']:checked").val() === "dark") {
            window.console.log("dark");
            $("body").css("background-color", colorDarkFuchsia);
            $("body").css("color", colorDarkCobalt);
            $(".btn-2g").css("background-color", colorDarkTurquoise);
            $(".btn-2g").css("color", colorDarkFuchsia);
            $(".btn-2g").hover(function () {
                $(this).css("background-color", colorDarkFuchsia);
            }, function () {
                $(this).css("background-color", colorDarkTurquoise);
            });
            $(".btn-2g").hover(function () {
                $(this).css("color", colorDarkTurquoise);
            }, function () {
                $(this).css("color", colorDarkFuchsia);
            });
            $(".btn-1g").css("background-color", colorDarkTurquoise);
            $(".btn-1g").css("color", colorDarkFuchsia);
            $(".btn-1g").hover(function () {
                $(this).css("background-color", colorDarkFuchsia);
            }, function () {
                $(this).css("background-color", colorDarkTurquoise);
            });
            $(".btn-1g").hover(function () {
                $(this).css("color", colorDarkTurquoise);
            }, function () {
                $(this).css("color", colorDarkFuchsia);
            });
            $("#otherData").css("background-color", colorDarkTurquoise);
            $(".relativeWrapper").css("border", "1px solid " + colorDarkTurquoise);
            $("img").css("filter", "brightness(50%)");
            $("img").css("-webkit-filter", "brightness(50%)");
        }
        showSettingsInputs();
        getSomeWeather();
    }

    function loadFromCityAndState() {
        $("#main").show();
        var city = $("#city").val(),
            state = $("#state").val();

        $("#city").css("border", "initial");
        $("#state").css("border", "initial");

        showLocationInputs();
        $.getJSON('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + city + ',' + state + '")&format=json&env=store://datatables.org/alltableswithkeys', setWeather);

    }

    function showAbout() {
        window.console.log("ABOUT");
        $("#about").show();
    }

    function showZoe() {
        window.console.log("ZOE!");
        $("#about").hide();
        $("#zoe").show();
    }

    function closeAbout() {
        window.console.log("CLOSE ABOUT");
        showSettingsInputs();
        $("#about").hide();
        $("#zoe").hide();
    }

    function openGeorgesWebsite() {
        var win = window.open('https://backpacker.gr/', '_blank');
        if (win) {
            win.focus();
        }
    }

    //    function inputTester() {
    //        if ($(this).attr("custom") === "blue"){
    //            console.log("blue clicked");
    //        }
    //        console.log(this);
    //    }

    getSomeWeather();

    //    $(".inputter").click(inputTester);
    $("#cityAndStateButton").click(loadFromCityAndState);
    $("#updateSettingsButton").click(changeTheColors);
    $("#locationImage").click(showLocationInputs);
    $("#settingsImage").click(showSettingsInputs);
    $("#aboutButton").click(showAbout);
    $("#zoeButton").click(showZoe);
    $(".aboutCloseButton").click(closeAbout);
    $("#fontButton").click(openGeorgesWebsite);

}());
