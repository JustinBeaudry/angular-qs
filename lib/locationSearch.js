'use strict';

angular
  .module('qsServices')
  .service('locationSearch', locationSearch);

locationSearch.$inject = ['$window', '$location'];

function locationSearch($window, $location) {
  function locationSearchService() {

    var searchResults = '',
      _location, _locationSearch;

    if ($location.$$html5) {
      searchResults = $location.search();
    } else {
      if ($window.location && $window.location.href) {
        _location = $window.location.href;
        _locationSearch = _location.indexOf('?');

        if (!$window.location.search) {
          if (angular.isNumber(_locationSearch) && _locationSearch > -1) {
            searchResults = _location.slice(_locationSearch);
          }
        } else {
          searchResults = $window.location.search;
        }
      }
    }

    if (!searchResults || typeof searchResults !== 'string') {
      searchResults = '';
    }

    return searchResults;
  }
  return locationSearchService;
}
