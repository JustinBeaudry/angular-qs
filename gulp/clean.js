'use strict';

var rimraf = require('rimraf');
var fs = require('fs');
var path = require('path');

module.exports = function (gulp) {
  var base = path.resolve('./dist');
	gulp.task('clean', function () {
    if(fs.existsSync(base) && fs.statSync(base).isDirectory()) {
      rimraf(base, function(err) {
        if (err) {
          throw err;
        }
      });
    }
	});
};
