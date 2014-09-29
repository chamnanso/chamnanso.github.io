'use strict';

/**
 * @ngdoc function
 * @name weatherappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weatherappApp
 */

angular.module('weatherappApp')
  .controller('MainCtrl', function($scope, $http){
  	$scope.headers = ['Date','Temperature', 'Description', 'Low', 'High', 'Humidity'];

  	$scope.current_condition = null;
  	$scope.forecasts = [];
  	$scope.dayCnt = 1;

  	$scope.getWeather = function(item, event){
      	var forecast = null;
      	var forecast_list = [];
  		var dayCnt = $scope.dayCnt;

  		var url = 'http://api.openweathermap.org/data/2.5/weather?q='+ $scope.cityState + '&units=imperial';

  		var request = $http.get(url).success(function(data, status) {
  			if(data.cod !== 200){
  				$scope.current_condition = null;
      			$scope.forecasts = [];
      			return;
  			}
  			forecast = {
      					'temp': { 'day': data.main.temp,
      							'min': data.main.temp_min,
      							'max': data.main.temp_max},
      					'desc': data.weather[0].description,
      					'humidity': data.main.humidity
      				};
      		$scope.current_condition = forecast;
  		}).error(function(data) {
  				$scope.current_condition = null;
      			$scope.forecasts = [];
    		});

  		if(dayCnt > 1 && typeof forecast !== "undefined") {

  		  url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + $scope.cityState + '&mode=json&units=imperial&cnt=' + dayCnt;

  		  request = $http.get(url).success(function(data, status) {
      			var forecasts = data.list;
      			var currentDate = new Date();
      			for (var i=1; i<forecasts.length; i++){
      				currentDate = new Date();
      				currentDate.setDate(currentDate.getDate() + i);
      				forecast = {
      					'date' : currentDate.toLocaleDateString("en-US"),
      					'temp': { 'day': forecasts[i].temp.day,
      							'min': forecasts[i].temp.min,
      							'max': forecasts[i].temp.max},
      					'desc': forecasts[i].weather[0].description,
      					'humidity': forecasts[i].humidity
      				};
      				
      				forecast_list.push(forecast);
      			}
      			
    		}).error(function(data) {
    			$scope.current_condition = null;
      			$scope.forecasts = [];
    		});

    	$scope.forecasts = forecast_list;
    	} else {
    		$scope.forecasts = [];
    	}
  	};
  });
