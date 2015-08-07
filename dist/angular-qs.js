(function(){

'use strict';



angular.module('qsServices', []);



angular
	.module('qsServices')
	.provider('qs', qsProvider);

function qsProvider() {

	// defaults to ampersand, W3C recommends support for semicolons
	var internals = {
		delimiter: '&'
	};

	this.delimiter = function (value) {
		if (value !== '&' || value !== ';') {
			console.warn('WC3 recommends the use of ampersands or semicolons ONLY!');
		}
		internals.delimiter = value;
	};

	// internal angular provider function
	this.$get = ['$exceptionHandler', '$log', '$httpParamSerializer', function qs($exceptionHandler, $log, $httpParamSerializer) {

		return {
			parse: function parseQS(queryString) {

				var opts = {};
				var qsArgs;

				if (!queryString || typeof queryString !== 'string') {
          $exceptionHandler('qs.parse requires a string');
				} else {
					qsArgs = decodeURIComponent(queryString);
				}

				angular.forEach(qsArgs.substr(1).split(internals.delimiter), function (item) {
					var a = item.split('=');
					opts[a[0]] = a[1];
				});
				return opts;
			},
			stringify: function stringifyQS(queryParams) {

				if (!queryParams || typeof queryParams !== 'object') {
					$exceptionHandler('qs.stringify requires an object');
				}

				return '?' + $httpParamSerializer(queryParams);
			}
		};
	}];
}



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



angular
	.module('qsServices')
	.filter('queryString', queryStringFilter);

queryStringFilter.$inject = ['$exceptionHandler', '$log', 'locationSearch', 'qs'];

// eslint will complain about the signature here, though DI will handle the proper injection of the dependency
/* eslint no-shadow:0 */
function queryStringFilter($exceptionHandler, $log, locationSearch, qs) {

	return function(input, params) {

		var paramsType = Array.isArray(params) ? 'array' : typeof params, out = '';

		if (!input) {
			$exceptionHandler('expected an object of key/value pairs');
		}

    if (!params || ['string', 'array', 'object'].indexOf(paramsType) === -1) {
      return input;

    } else if (paramsType === 'string') {
      // if params is a string, get a single value from $window.location.search
      out += qs.parse(input)[params];

    } else if (paramsType === 'array') {
      // if params is an array, grab only the params that match the array and return an array of those values
			out = [];
			if (params.length > 0) {
				angular.forEach(params, function(param) {
					var parsed = qs.parse(input);
					if (typeof param === 'string' && parsed.hasOwnProperty(param)) {
						out.push(parsed[param]);
					} else {
						$log.warn('queryStringFilter expected param to be a string');
					}
				});
			} else {
				angular.forEach(qs.parse(input), function(value, key) {
					var obj = {};
					obj[key] = value;
					out.push(obj);
				});
			}

		} else if (paramsType === 'object') {
      // if params is an object and has properties, return value if prop is true
      // else if params is an empty object return the parsed object
      if (Object.keys(params).length > 0) {
        out = {};
        Object.keys(params).forEach(function(param) {
          if (params[param] && !out.hasOwnProperty(param)) {
            out[param] = params[param];
          }
        });
      } else {
        out = qs.parse(input);
      }
    } else {
			out += locationSearch();
		}
		return out;
	};
}


}());
