function insertWeather(town){
	$.getJSON( "http://api.openweathermap.org/data/2.5/weather?q="+town, function( data ) {
		var temp_min=formatTemperature(data.main.temp_min);
		var temp_max=formatTemperature(data.main.temp_max);
		var temp_today=formatTemperature(data.main.temp);
		 $(".high_low .today_parametr_data").html((temp_min)+"/"+(temp_max));
		 $(".header h1").html(temp_today);
		 $(".current_condition .today_parametr_data").html(data.weather[0].description);
	  return(data)
	});
}

$("#choice_button").click(function(){
	
	insertWeather($("#enter_town").val());
});//
function formatTemperature(temp){
	temp=Math.round(temp-273)+"°C";
	return(temp);
}

 