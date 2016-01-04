/**
 * Gulp tasks specific to development.
 *
 *
 *   NOTES:
 *   (1) The livereload module works best with Chrome's Livereload extension:
 *       See https://www.npmjs.org/package/gulp-livereload
 */

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    karma = require('gulp-karma'),
    jasmine = require('gulp-jasmine'),
    merge = require('merge-stream'),
    livereload = require('gulp-livereload'),   // See Note 1 above
    config = require("config");

require("./common");
require("./browserify");



/*
 Running both server-side and client-side tests
 */
gulp.task('test', function(){
    // Client-side tests using Jasmine through Karma,
    // which is able to handle references to browser objects like "window" and "document."
    return gulp.src('./test/spec/**/*.js')
            .pipe(karma({
                configFile: 'karma.conf.js',
                action: 'run'
            })).on('error', function(err) {
                // Make sure failed tests cause gulp to exit non-zero....
                throw err;
            });
});



/*
 Watching for changes to src files, and reloading the browser after any changes.
 */
gulp.task('watch', ['jsx-lint', 'browserify'], function() {
    // Running lint and browserify on JS src changes and deploying the changes.
    gulp.watch('./src/**/*.js', ['jsx-lint', 'browserify']);
    // Deploying changes to HTML and CSS files

   // gulp.watch(['./src/**/*.html', './src/**/*.scss', '!src/lib/**'], [
        //'views',
   // ]);
    // Reloading the browser when changes are deployed.
    if (config.livereload === true) {
        gulp.watch('./build/**').on('change', livereload.changed);
    }
});



/*
 Start local dev server
  */
gulp.task('dev', ['watch'], function() {
    var port = (config.server ? config.server.port : null) || 9000;
    // Start webserver
    require("../server").start(port);
    // Start live reload
    livereload.listen(config.livereload || {});
});
