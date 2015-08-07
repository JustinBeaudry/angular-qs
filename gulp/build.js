'use strict';

module.exports = function (gulp) {
	gulp.task('build', ['compile', 'eslint']);
};
