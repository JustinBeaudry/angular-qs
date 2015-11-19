angular-qs [![Build Status](https://travis-ci.org/JustinBeaudry/angular-qs.svg)](https://travis-ci.org/JustinBeaudry/angular-qs)
=========

Angular query string services module

## Installation

```js
npm i angular-qs
```

## Usage

In your modules setter, have your module depend upon `qsServices`.

e.g.

```js
angular.module('myApp', ['qsServices']);
```

## Services and Filter
* `qsProvider`, is injectable into your modules config block, currently only allows setting delimiter.
* `qs`, the injectable query string parser and 'stringifier' service. qs.stringify uses $httpParamSerializer.
* `locationSearch`, service replacement for $location.search() (which it defaults to if HTML5Mode is enabled), uses $window.location.search if available and a custom href parser if needed
* `queryString`, filter for handling the use of query string parameters in angular templates

## TODO
* qs.parse should parse a URI and return the parameters
* queryString filter should have an option to decode/encode parameters
* locationSearch should be a 'drop-in' replacement for $location.search() for fallbacks when not in html5Mode (this should allow the ability to decorate $location with the custom search if desired)
* Provide details on each method

## ROADMAP

* `0.1.0` - locationSearch mimic $location.search() and work well as a decorator replacement for $location.search
* `0.1.5` - jsdoc
