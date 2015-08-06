'use strict';

describe('queryStringFilter', function() {

  var $filter,
    input = '?pokemon1=dragonite&pokemon2=dragonair';

	beforeEach(module('qsServices'));
  beforeEach(inject(function(_$filter_) {
    $filter = _$filter_;
  }));

  it('should return input if no params', function() {
    var filtered = $filter('queryString')(input);
    expect(filtered).toBe(input);
  });

  it('should return input if params are not string, array or object', function() {
    var filtered1 = $filter('queryString')(input, null);
    var filtered2 = $filter('queryString')(input, function() {});
    var filtered3 = $filter('queryString')(input, true);
    var filtered4 = $filter('queryString')(input, NaN);

    expect(filtered1).toBe(input);
    expect(filtered2).toBe(input);
    expect(filtered3).toBe(input);
    expect(filtered4).toBe(input);
  });

  it('should return single value given a key string', function() {
    var filtered1 = $filter('queryString')(input, 'pokemon1');
    var filtered2 = $filter('queryString')(input, 'pokemon2');

    expect(filtered1).toBe('dragonite');
    expect(filtered2).toBe('dragonair');
  });

  it('should return an array of objects given an empty array', function() {
    var filtered = $filter('queryString')(input, []);

    expect(filtered).toContain(jasmine.objectContaining({'pokemon1': 'dragonite'}));
    expect(filtered).toContain(jasmine.objectContaining({'pokemon2': 'dragonair'}));
  });

  it('should return an array of string values given an array of keys', function() {
    var filtered1 = $filter('queryString')(input, ['pokemon1']);
    var filtered2 = $filter('queryString')(input, ['pokemon2']);

    expect(filtered1).toEqual(jasmine.arrayContaining(['dragonite']));
    expect(filtered2).toEqual(jasmine.arrayContaining(['dragonair']));
  });

  it('should return an object of key/value pairs given an empty object', function() {
    var filtered = $filter('queryString')(input, {});

    expect(filtered).toEqual(jasmine.objectContaining({'pokemon1': 'dragonite', 'pokemon2': 'dragonair'}));
  });
});
