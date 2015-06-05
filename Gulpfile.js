/*
 *   NOTES:
 *   (1) The livereload module works best with Chrome's Livereload extension:
 *       See https://www.npmjs.org/package/gulp-livereload
 */

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    browserify = require('browserify'),
    transform = require('vinyl-transform'),
    concat = require('gulp-concat'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    sass = require("gulp-sass"),
    gulpif = require("gulp-if"),
    merge = require("merge-stream"),
    config = require('nconf'),
    jasmine = require("gulp-jasmine"),          // Runs Jasmine from Gulp
    karma = require("gulp-karma"),              // Runs Karma from Gulp
    requireDir = require("require-dir"),        // Imports an entire directory
    livereload = require('gulp-livereload'),   // See Note 1 above
    server = require("./server");

// JSHint task
gulp.task('lint', function() {
    gulp.src('./src/js/*.js')
        .pipe(jshint())
        // You can look into pretty reporters as well, but that's another story
        .pipe(jshint.reporter('default'));
});

// Browserify task
gulp.task('browserify', function() {

    var browserified = transform(function(filename) {
        var b = browserify(filename, { debug: config.debug });
        return b.bundle();
    });

    return gulp.src(['./src/js/main.js'])
        .pipe(browserified)
        .pipe(gulpif(config.debug === false, uglify()))
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./build/js'));
});

// Views task
gulp.task('views', function() {
    // Get our index.html
    gulp.src('./src/*.html')
        // And put it in the build folder
        .pipe(gulp.dest('build/'));

    gulp.src('./src/images/**')
        // Will be put in the build/images folder
        .pipe(gulp.dest('build/images/'));


    gulp.src('./src/css/**')
        // Will be put in the build/css folder
        .pipe(gulp.dest('build/css/'));

    gulp.src('./src/config/**')
        // Will be put in the build/config folder
        .pipe(gulp.dest('build/config/'));
});

// Watching for changes to JS src files.
gulp.task('watch', ['lint', 'browserify'], function() {
    // Watch our scripts
    gulp.watch(['./src/js/*.js', './src/*.json'],[
        'lint',
        'browserify'
    ]);
    gulp.watch(['src/*.html', './src/*.css'], [
        'views'
    ]);
    gulp.watch('build/**').on('change', livereload.changed);
});

// Dev task
gulp.task('dev', ['watch'], function() {
    // Start webserver
    server.start(9000);
    // Start live reload
    livereload.listen();
});