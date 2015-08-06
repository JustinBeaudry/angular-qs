'use strict';

angular
	.module('qsServices')
	.service('locationSearch', locationSearch);

locationSearch.$inject = ['$window', '$location'];

function locationSearch($window, $location) {
	function locationSearchService() {

		var search = '', _location, _locationSearch;

    if ($location.$$html5) {
      search = $location.search();
    } else {
      if ($window.location && $window.location.href) {
        _location = $window.location.href;
        _locationSearch = _location.indexOf('?');

        if (!$window.location.search) {
          if (angular.isNumber(_locationSearch) && _locationSearch > -1) {
            search = _location.slice(_locationSearch);
          }
        } else {
          search = $window.location.search;
        }
      }
    }

		return search;
	}
	return locationSearchService;
}
