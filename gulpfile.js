/* eslint no-process-exit:0 */
'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var indeks = require('indeks');
var path = require('path');

var tasks = indeks.index(path.resolve('gulp'));

Object.keys(tasks).forEach(function(task) {
	tasks[task](gulp, plugins);
});

process.on('uncaughtException', function(err) {
	console.trace(err);
});

process.on('exit', function() {
	if (gulp.fail) {
		process.exit(1);
	}
});
