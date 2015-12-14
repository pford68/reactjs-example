/**
 *  Gulp tasks related to deployment and distribution
 */

var gulp = require('gulp');
var zip = require('gulp-zip');
var rev = require('gulp-rev');  // For appending timestamps to filenames
var config = require('config');

gulp.task('zip', function () {
    return gulp.src('build/*')
        .pipe(zip(config.dist.name))
        .pipe(rev())
        .pipe(gulp.dest('dist'));
});
