$(function(){
  (function(){
    var App = {
      Init: function() {
        App.getLocation();
        App.bindChangeUnits();
      },
      getLocation: function() {
        var location = "";
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(App.getWeather);
        } else {
          $('#summary').text("Not supported");
        }
      },
      getWeather: function(position) {
        var location = position.coords.latitude + "," + position.coords.longitude;
        var forcastURL = "https://api.forecast.io/forecast/26a6920c013eecb823f107f10098a3ce/" + location + "?units=si&callback=?";

        $.getJSON(forcastURL, function(json) {
          var data = json.currently;
          $('#temp').text((Math.round(data.temperature)));
          $('#summary').text(data.summary);
          $('.container').css("background-image", "url('" + App.bgs[json.currently.icon] + "')");
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
      },
      bgs: {
        "clear-day" : "http://www.mrwallpaper.com/wallpapers/sunny-day-landscape-1920x1080.jpg",
				"clear-night" : "http://i.imgur.com/HF3Xxg1.jpg",
				"rain" : "http://onehdwallpaper.com/wp-content/uploads/2015/06/Rainy-Night-Desktop-Wallpapers.jpg",
				"snow" : "https://wallpaperscraft.com/image/city_street_snow_winter_lane_black_white_28527_1920x1080.jpg",
				"sleet" : "http://media.wktv.com/images/snow+tires+icy+road+car.jpg",
				"wind" : "https://i.ytimg.com/vi/NhzwezPvwjk/maxresdefault.jpg",
				"fog" : "http://hdimagesnew.com/wp-content/uploads/2015/11/Fog-Wallpapers-HD-6.jpg",
				"cloudy" : "http://img.wallpaperfolder.com/f/798EBE3CA994/cloudy-sky-over-field-7480.jpg",
				"partly-cloudy-day" : "http://1920x1080hdwallpapers.com/image/201510/nature/2448/lake-calm-overcast-forest-reflection-austria.jpg",
				"partly-cloudy-night" : "https://i.ytimg.com/vi/Xw_k7duWXMY/maxresdefault.jpg"
			}
    };

App.Init();

})();
});
