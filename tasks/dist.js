/**
 *  Gulp tasks related to deployment and distribution
 */

var gulp = require('gulp');
var zip = require('gulp-zip');
var rev = require('gulp-rev');  // For appending timestamps to filenames
var project = require('../project.json');

gulp.task('zip', function () {
    return gulp.src('build/*')
        .pipe(zip(project.name))
        .pipe(rev())
        .pipe(gulp.dest('dist'));
});
