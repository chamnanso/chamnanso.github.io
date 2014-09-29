'use strict';

/**
 * @ngdoc function
 * @name weatherappApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the weatherappApp
 */
angular.module('weatherappApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
