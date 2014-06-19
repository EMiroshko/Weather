var weatherJ = $.getJSON( "http://api.openweathermap.org/data/2.5/weather?q=Berlin", function( data ) {
  return(data)
});

 //$(".today_parametr_data:first").html(weather.sys.sunrise);
 alert( weatherJ.sys.message );