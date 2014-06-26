
function insertWeather(town){
	
	var nowDate = new Date();
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
		 $(".today_date").html(nowDate);
	  return(data)
	});
	$.getJSON( "http://api.openweathermap.org/data/2.5/forecast/daily?q="+town+"&mode=json&units=metric&cnt=8", function( data ){
		var date = new Date(data.list[0].dt*1000);
		var gDate=date.getDate();
		if (gDate<10) gDate="0"+gDate;
		$(".week_day").html(getWeekDay(date)+" "+gDate);
		$(".forecast_temperature").html(Math.round(data.list[0].temp.min)+"°C"+"/"+Math.round(data.list[0].temp.max)+"°C");
		$(".forecast_cloudy").html(upperCaseFirst(data.list[4].weather[0].description));
		$(".forecast_wind").html("wind: "+Math.round(data.list[5].speed)+" mph/S");
		$(".weather_image").addClass("weather_image_"+(data.list[4].weather[0].main));
		
	});
}

$("#choice_button").click(function(){
	
	insertWeather($("#enter_town").val());
	$(".none").show();
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
function getWeekDay(date) {
  var weekDay = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'] ;
 
  return weekDay[ date.getDay() ];
} 