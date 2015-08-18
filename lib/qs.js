'use strict';

angular
  .module('qsServices')
  .provider('qs', qsProvider);

function qsProvider() {

  // defaults to ampersand, W3C recommends support for semicolons
  var internals = {
    delimiter: '&'
  };

  this.delimiter = function(value) {
    if (value !== '&' || value !== ';') {
      console.warn('WC3 recommends the use of ampersands or semicolons ONLY!');
    }
    internals.delimiter = value;
  };

  // internal angular provider function
  this.$get = ['$log', '$httpParamSerializer', function qs($log, $httpParamSerializer) {

    return {
      parse: function parseQS(queryString) {

        var opts = {};
        var qsArgs;

        if (!queryString || typeof queryString !== 'string') {
          $log.warn('qs.parse requires a string');
          return {};
        }
        qsArgs = decodeURIComponent(queryString);


        angular.forEach(qsArgs.substr(1).split(internals.delimiter), function(item) {
          var a = item.split('=');
          opts[a[0]] = a[1];
        });
        return opts;

      },

      stringify: function stringifyQS(queryParams) {

        if (!queryParams || typeof queryParams !== 'object') {
          $log.warn('qs.stringify requires an object');
          return '';
        }

        return '?' + $httpParamSerializer(queryParams);
      }
    };
  }];
}
