

function insertWeather(town){
	
	var nowDate = new Date();
	var getDate=nowDate.getDate();
	var getMonth =nowDate.getMonth()
	if (getDate<10) getDate="0"+getDate;
	if (getMonth<10) getMonth="0"+getMonth;
	$.getJSON( "http://api.openweathermap.org/data/2.5/weather?q="+town, function( data ) {
		if (data.cod==="404"){
			$(".none").hide(); 
			$(".errorMsg").show();

			return;
		} 
		$(".errorMsg").hide();	
		$(".none").show();
		var temp_min=formatTemperature(data.main.temp_min);
		var temp_max=formatTemperature(data.main.temp_max);
		var temp_today=formatTemperature(data.main.temp);
		 $('body').css('backgroundImage', 'url(Images/'+(data.weather[0].main)+'.jpg)');
		 $(".high_low .today_parametr_data").html((temp_min)+"/"+(temp_max));
		 $(".header h1").html(temp_today);
		 $(".current_condition .today_parametr_data").html(upperCaseFirst(data.weather[0].description));
		 $(".header h2").html(upperCaseFirst(town)+","+upperCaseFirst(data.sys.country));
		 $(".humidity .today_parametr_data").html(data.main.humidity);
		 $(".wind .today_parametr_data").html(Math.round(data.wind.speed)+" mph/S")
		 $(".today_date").html("Today's date: "+getDate+"/"+getMonth+"/"+nowDate.getFullYear());
		 


	  return(data)
	});
	$.getJSON( "http://api.openweathermap.org/data/2.5/forecast/daily?q="+town+"&mode=json&units=metric&cnt=8", function( data ){
		
		$(".weather_forecast_day:first").nextAll().remove();
		$(".weather_image").removeClass("weather_image_Rain weather_image_Clear weather_image_Snow weather_image_Clouds");

		var forecast_days_count = 5;
		var forecastArr=[($(".weather_forecast_day:first" ))];
		
		for (var i = 0; i < forecast_days_count-1; i++) {
			forecastArr.push($(".weather_forecast_day:first" ).clone().appendTo(".weather_forecast"));
		};

		
		for (var i = 0; i <forecast_days_count; i++) {

			var date = new Date(data.list[i+1].dt*1000);
			var gDate=date.getDate();
		
			if (gDate<10) gDate="0"+gDate;
			forecastArr[i].find(".week_day").html(getWeekDay(date)+" "+gDate);
			$(".forecast_temperature", forecastArr[i]).html(Math.round(data.list[i+1].temp.min)+"°C"+"/"+Math.round(data.list[2].temp.max)+"°C");
			$(".forecast_cloudy", forecastArr[i]).html(upperCaseFirst(data.list[i+1].weather[0].description));
			$(".forecast_wind", forecastArr[i]).html("wind: "+Math.round(data.list[i+1].speed)+" mph/S");
			$(".weather_image", forecastArr[i]).addClass("weather_image_"+(data.list[i+1].weather[0].main));
			
			
		};
		
		return(data)
	});

}

$(document).ready(function(){
	$("#enter_town").keypress(function(e){
		if(e.keyCode==13){
	    	insertWeather($("#enter_town").val());
			//$(".none").show();
	    }
	 });
 
});
$("#choice_button").click(function(){
	
	insertWeather($("#enter_town").val());
	//$(".none").show();
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
 
  return weekDay[ date.getDay()];
} 