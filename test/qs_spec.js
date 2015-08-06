'use strict';

describe('querystring parser and stringifier', function() {

	// globals
	var qs;
  var queryString = '?pokemon1=charmander&pokeballs=3&earthBadge=false&water-badge=true';

	beforeEach(module('qsServices'));

	beforeEach(inject(function(_qs_) {
		qs = _qs_;
	}));

	it('should parse a string into an object', function() {
		var queryObject = qs.parse(queryString);

		expect(typeof queryObject).toBe('object');
		expect(queryObject.pokemon1).toBe('charmander');
		expect(queryObject.pokeballs).toBe('3');
		expect(queryObject.earthBadge).toBe('false');
		expect(queryObject['water-badge']).toBe('true');
	});

	it('should stringify an object into a query string', function() {
		var queryObject = {
			pokemon1: 'charmander',
			pokeballs: 3,
			earthBadge: false,
			'water-badge': true
		};

		var _queryString = qs.stringify(queryObject);

		expect(typeof _queryString).toBe('string');
		expect(_queryString).toBe(queryString);
	});
});
