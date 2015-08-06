'use strict';

describe('locationSearch', function() {

  var queryString = '?pokemon1=charmander&pokeballs=3&earthBadge=false&water-badge=true';

  beforeEach(module('qsServices'));

  it('should default to $location.search() if in html5 mode', function() {

    var search = jasmine.createSpy('$location.search()');

    module(function($locationProvider, $provide) {
      $provide.decorator('$location', function($delegate) {
        $delegate.search = search;
        return $delegate;
      });
      $locationProvider.html5Mode(true);
    });

    inject(function(locationSearch) {
      locationSearch();
      expect(search).toHaveBeenCalled();
    });
  });

  it('should use $window.location.search when available', function() {
    var search = jasmine.createSpy('$window.location.search');

    module(function($provide) {
      var $window = { location: { href: 'http://reddit.com/r/pokemon' }};
      Object.defineProperty($window.location, 'search', {
        enumerable: true,
        get: function() {
          search();
          return queryString;
        }
      });
      $provide.value('$window', $window);
    });

    inject(function(locationSearch) {
      locationSearch();
      expect(search).toHaveBeenCalled();
    });
  });

  it('should use custom location search if $window.location.search is not available', function() {

    module(function($provide) {
      var $window = {
        location: {
          href: 'http://reddit.com/r/pokemon' + queryString
        }
      };
      $provide.value('$window', $window);
    });

    inject(function(locationSearch) {
      var search = locationSearch();
      expect(search).toBe(queryString);
    });
  });

  it('should return empty string if NaN passed', function() {
    var search;

    module(function($provide) {
      var $window = { location: { search: NaN } };
      $provide.value('$window', $window);
    });

    inject(function(locationSearch) {
      search = locationSearch();
      expect(search).toBe('');

    });
  });

  it('should return empty string if null is passed', function() {

    var search;

    module(function($provide) {
      var $window = { location: { search: null } };
      $provide.value('$window', $window);
    });

    inject(function(locationSearch) {
      search = locationSearch();
      expect(search).toBe('');
    });

  });

  it('should return empty string if undefined is passed', function() {

    var search;

    module(function($provide) {
      var $window = { location: { search: undefined } };
      $provide.value('$window', $window);
    });

    inject(function(locationSearch) {
      search = locationSearch();
      expect(search).toBe('');
    });

  });
});
