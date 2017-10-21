(function () {
    "use strict";

    /* jslint browser */
    /* global window, document */

    //    PLAIN TEXT:
    //    https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="detroit, mi")&format=json&env=store://datatables.org/alltableswithkeys"
    //    OR URL FORMAT:
    //    https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22detroit%2C%20mi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys

    function setTheQuery(city, state) {
        var response;
        response = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22chicago%2C%20il%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
        window.console.log(response);
        return response;

    }

    function weatherReceived(response) {
        var JSONResponse;
        window.console.log(response);
        JSONResponse = JSON.stringify(response);
        $("#yahooResponse").text(JSONResponse);
    }

    $.getJSON(setTheQuery("chicago", "il"), weatherReceived);
}());
