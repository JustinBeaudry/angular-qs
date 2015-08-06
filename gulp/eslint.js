'use strict';
var path = require('path');

module.exports = function(gulp, plugins) {
	gulp.task('eslint', function() {
		gulp.src('./lib/*.js')
			.pipe(plugins.eslint())
			.pipe(plugins.eslint.format());
	});
}
