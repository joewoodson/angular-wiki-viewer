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
  			return $http.jsonp('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&callback=JSON_CALLBACK&titles=' + wikiQuery.name.toLowerCase())
  		}
  	};

  	return wikiService;
  })
  .controller('MainCtrl', function ($scope, wikiService) {
    wikiService.get({name: 'Germany'}).then(function(data) {
        var pagesId = Object.keys(data.data.query.pages);

        $scope.wikiExtract = data.data.query.pages[pagesId].extract;
        console.log($scope.wikiExtract);
    });
  });
