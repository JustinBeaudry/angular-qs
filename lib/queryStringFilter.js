'use strict';

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

    } else if (paramsType === 'string' || paramsType === 'array') {

			// if params is a string, get a single value from $window.location.search
			if (paramsType === 'string') {
				out += qs.parse(input)[params];
			}
			// if params is an array, grab only the params that match the array and return an array of those values
			else if (paramsType === 'array') {
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
			} else {
				out += locationSearch();
			}
		}
    // if params is an object and has properties, return value if prop is true
    // else if params is an empty object return the parsed object
    else if (paramsType === 'object') {
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
		}
		return out;
	};
}
