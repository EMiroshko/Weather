function insertWeather(town){
	$.getJSON( "http://api.openweathermap.org/data/2.5/weather?q="+town, function( data ) {
		var temp_min=formatTemperature(data.main.temp_min);
		var temp_max=formatTemperature(data.main.temp_max);
		var temp_today=formatTemperature(data.main.temp);
		 $(".high_low .today_parametr_data").html((temp_min)+"/"+(temp_max));
		 $(".header h1").html(temp_today);
		 $(".current_condition .today_parametr_data").html(upperCaseFirst(data.weather[0].description));
		 $(".header h2").html(upperCaseFirst(town)+","+upperCaseFirst(data.sys.country));
		 $(".humidity .today_parametr_data").html(data.main.humidity);
		 $(".wind .today_parametr_data").html(Math.round(data.wind.speed)+" mph/S")
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

function upperCaseFirst(str){
var rest="";
for (var i = 1; i <str.length; i++) {
	rest=str.slice(1, str.length+1);
};
return(str[0].toUpperCase()+rest.toLowerCase());
}
 