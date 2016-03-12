'use strict';

/**
 * @ngdoc function
 * @name wikiReaderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wikiReaderApp
 */
angular.module('wikiReaderApp')
  .factory('wikiService', function($http) {

  	var wikiService = {
  		get: function(wikiQuery) {
  			return $http.jsonp('https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&callback=JSON_CALLBACK&srsearch=' + wikiQuery.name)
  		}
  	};

  	return wikiService;
  })
  .controller('MainCtrl', function ($scope, wikiService) {

  	$scope.wikiQuery = '';
  	$scope.wikiResults = [];

  	$scope.$watch('wikiQuery', function() {  	
		wikiService.get({name: $scope.wikiQuery}).then(function(data) {

			if ($scope.wikiQuery) {
			    for (var result of data.data.query.search) {
			    		result.url = 'http://en.wikipedia.org/wiki/' + result.title;
						$scope.wikiResults.push(result);
				}
			}

		});

		$scope.wikiResults = [];
	});
  	$scope.closeOthers = function () {
  		$('.collapse').removeClass('in');
  	};
  });
