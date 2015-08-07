'use strict';

var fs = require('fs');
var rimraf = require('rimraf');
var path = require('path');



module.exports = function (gulp, plugins) {
	gulp.task('link', function() {
    plugins.util.log(plugins.util.colors.bold.white('linking git pre-push hooks'));
    if (fs.lstatSync(path.resolve('.git/hooks/pre-push')).isSymbolicLink()) {
      fs.unlinkSync(path.resolve('.git/hooks/pre-push'));
    }
		fs.symlinkSync('.ci/git/hooks/pre-push', '.git/hooks/pre-push', 'dir');
		plugins.util.log(plugins.util.colors.bold.white('linking complete!'));
  });
};
