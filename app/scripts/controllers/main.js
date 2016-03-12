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
  			return $http.jsonp('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&callback=JSON_CALLBACK&titles=' + wikiQuery.name)
  		}
  	};

  	return wikiService;
  })
  .controller('MainCtrl', function ($scope, wikiService) {

  	$scope.wikiQuery = '';

  	$scope.$watch('wikiQuery', function() {
  		wikiService.get({name: $scope.wikiQuery}).then(function(data) {

	        var pagesId = Object.keys(data.data.query.pages);

	        $scope.wikiExtract = data.data.query.pages[pagesId].extract;
	        $scope.wikiTitle = data.data.query.pages[pagesId].title;
	    });
  	});

    
  });
