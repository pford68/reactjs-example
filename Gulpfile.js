/*
 *   NOTES:
 *   (1) The livereload module works best with Chrome's Livereload extension:
 *       See https://www.npmjs.org/package/gulp-livereload
 */

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
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
    // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
    gulp.src(['./src/js/main.js'])
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        // Bundle to a single file
        .pipe(concat('bundle.js'))
        // Output it to our dist folder
        .pipe(gulp.dest('dist/js'));
});

// Views task
gulp.task('views', function() {
    // Get our index.html
    gulp.src('./src/*.html')
        // And put it in the dist folder
        .pipe(gulp.dest('dist/'));

    gulp.src('./src/images/**')
        // Will be put in the dist/images folder
        .pipe(gulp.dest('dist/images/'));


    gulp.src('./src/css/**')
        // Will be put in the dist/css folder
        .pipe(gulp.dest('dist/css/'));

    gulp.src('./src/config/**')
        // Will be put in the dist/config folder
        .pipe(gulp.dest('dist/config/'));
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
    gulp.watch('dist/**').on('change', livereload.changed);
});

// Dev task
gulp.task('dev', ['watch'], function() {
    // Start webserver
    server.start(9000);
    // Start live reload
    livereload.listen();
});