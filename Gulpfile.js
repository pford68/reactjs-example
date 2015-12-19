/**
 * Gulp build tasks
 *
 * To run a clean build:
 * (1) gulp clean
 * (2) gulp build
 *
 * To start the dev server:  gulp dev
 */
var gulp = require('gulp'),
    gutil = require('gulp-util'),               // For outputting gulp results to the console.
    del = require('del'),                       // For deleting files and directories
    merge = require("merge-stream"),            // Combines multiple streams into one.
    requireDir = require("require-dir"),        // Imports an entire directory
    config = require("config"),                 // Returns values from the config file(s) as a map.
    gulpif = require("gulp-if"),
    gDestDir = "./build",                       // The build directory
    tasks = requireDir("./tasks");              // Gulp tasks for specific and for specific deployments (e.g., development)


//======================================================================== Tasks

/*
 Clean task:  deletes the build directory
 */
gulp.task('clean', function(done) {
    console.log("Cleaning " + gDestDir + "...");
    del(gDestDir, function(){
        console.log("Deleted " + gDestDir + ".");
        done();
    });
});



/*
 Builds the entire project.
 */
gulp.task("build", ['fonts', 'images', 'jsx-lint', 'css-lint', 'browserify', 'views'], function(){
    return gulp.src([
            './src/*.html'
        ], { base: './src' })
        .pipe(gulp.dest(gDestDir));
});