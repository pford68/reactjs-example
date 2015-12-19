/**
 * Tasks related to Browserify
 */

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require("browserify"),
    gulpif = require('gulp-if'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    source = require('vinyl-source-stream'),
    reactify = require('reactify'),
    config = require("config"),
    project = require("../project.json");

/*
 Browserify task.

 Fetches dependencies, and compresses the resulting JS bundle if not in debug mode.
 */
gulp.task("browserify", function(){

    var b = browserify({
        entries: './main.js',
        basedir: './src/js',
        debug: config.debug,
        transform: reactify
    });

    return b.bundle()
        .pipe(source('./src/js/main.js'))
        .pipe(gulpif(config.debug === false, streamify(uglify())))
        .pipe(rename(project.name + ".js"))
        .pipe(gulp.dest('./build/js'));
});
