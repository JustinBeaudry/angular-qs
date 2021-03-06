'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function (gulp, plugins) {
	gulp.task('link', function() {
    plugins.util.log(plugins.util.colors.bold.white('linking git pre-push hooks'));
    if (fs.statSync(path.resolve('.git')).isDirectory()) {
      if (fs.lstatSync(path.resolve('.git/hooks/pre-push')).isSymbolicLink()) {
        fs.unlinkSync(path.resolve('.git/hooks/pre-push'));
      }
      fs.symlinkSync(path.resolve('.ci/git/hooks/pre-push'), path.resolve('.git/hooks/pre-push'), 'dir');
      plugins.util.log(plugins.util.colors.bold.white('linking complete!'));
    } else {
      plugins.util.log(plugins.util.colors.bold.red('link aborted. .git folder missing'));
    }
  });
};
