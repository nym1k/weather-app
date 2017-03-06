$(function(){
  (function(){
    var App = {
      Init: function() {
        App.getLocation();
        App.bindChangeUnits();
      },
      getLocation: function() {
        var location = "";
        $.get("http://ipinfo.io/json?callback=JSON_CALLBACK", function(response) {
          console.log(response);
            $('#location').text(response.city + ', ' + response.region + ', ' + response.country);
            App.getWeather(response.loc);
        }, "jsonp")
          .fail(function() {
            $('#location').text("Not supported");
          });
      },
      getWeather: function(position) {
        var forcastURL = "https://api.forecast.io/forecast/26a6920c013eecb823f107f10098a3ce/" + position + "?units=si&callback=?";

        $.getJSON(forcastURL, function(json) {
          var data = json.currently;
          $('#icon').html('<img src="img/' + json.currently.icon + '.svg"/>');
          $('#temp').text((Math.round(data.temperature)));
          $('#summary').text(data.summary);
          $('.container').css("background-image", "linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url('img/" + json.currently.icon + ".jpg')");
        });
      },
      bindChangeUnits: function() {
        $("#units").text("C");
        $("#units").bind("click", function(){
          App.changeUnits();
        });
      },
      changeUnits: function() {
        if ($("#units").text() == "C") {
          //grab temp
          var ctemp = $("#temp").text();
          //convert to F and update temp
          var ftemp = Math.round((ctemp * (9/5)) + 32);
          $("#temp").text(Math.round((ctemp * (9/5)) + 32));

          $("#units").text("F");
        } else {
          //grab temp
          var ftemp = $("#temp").text();
          //convert to C and update temp
          $("#temp").text(Math.round((ftemp - 32) * (5/9)));
          //update symbol
          $("#units").text("C");
        }
      }
    };

App.Init();

})();
});
