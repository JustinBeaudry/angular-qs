'use strict';

module.exports = function(gulp, plugins) {
	gulp.task('concat', function() {
    var iife = '(function(){\n\n\'use strict\';\n\n<%= contents %>\n\n}());\n\n';

    var src = gulp.src(['./lib/qsServices.js', './lib/qs.js', './lib/locationSearch.js', './lib/queryStringFilter.js'])
      .pipe(plugins.replace(/('|")use strict\1\;/g, ''));

    var min = src.pipe(plugins.clone());

    src
      .pipe(plugins.concat('angular-qs.js'))
      .pipe(plugins.wrap(iife))
      .pipe(gulp.dest('./dist/'));

    min
      .pipe(plugins.concat('angular-qs.min.js'))
      .pipe(plugins.wrap(iife))
      .pipe(plugins.uglify())
      .pipe(gulp.dest('./dist/'));
  });
};
