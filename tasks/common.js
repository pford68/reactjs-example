/**
 * Common Gulp tasks used at different development phases
 */

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    csslint = require('gulp-csslint'),
    merge = require("merge-stream"),            // Combines multiple streams into one.
    del = require('del'),
    sass = require('gulp-sass'),
    gulpif = require('gulp-if'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    imagemin = require('gulp-imagemin'),
    livereload = require('gulp-livereload'),   // See Note 1 above
    config = require("config"),
    gDestDir = './build';



/*
 Running SASS

 Compresses the resulting CSS file if not in debug mode
 */
gulp.task('sass', function () {
    // Omitting "sass" in src path below created an unwanted "sass" sub-directory.
    var dest = './build/css',
        src = './src/sass/main.scss';
    del.sync(dest);
    return gulp.src(src)
        .pipe(sass())
        .pipe(gulpif(config.debug === false, cssmin()))
        .pipe(gulp.dest(dest));
});



/*
 Linting
 */
gulp.task('lint', function() {
    return gulp.src('./src/**/*.js')
        .pipe(jshint())
        // You can look into pretty reporters as well, but that's another story
        .pipe(jshint.reporter('default'));
});


/*
 CSS Linting
 */
gulp.task('css-lint', ['sass'], function() {
    return gulp.src('./build/**/*.css')
        .pipe(csslint('.csslintrc'))
        // You can look into pretty reporters as well, but that's another story
        .pipe(csslint.reporter());
});



/*
 Fonts task:  copying bootstrap fonts to the proper location
 */
gulp.task('fonts', function () {
    // Omitting "sass" in src path below created an unwanted "sass" sub-directory.
    var dest = './build/fonts/',
        src = [
            './node_modules/bootstrap/dist/fonts/*',
            './node_modules/font-awesome/fonts/*'
        ];
    del.sync(dest);

    var tasks = [];
    tasks.push(gulp.src(src[0])
        .pipe(gulp.dest(dest + "/bootstrap")));
    tasks.push(gulp.src(src[1])
        .pipe(gulp.dest(dest)));

    return merge(tasks);
});


/*
 Images task:  copying images to the proper location
 */
gulp.task('images', function () {
    var dest = './build/images',
        src = './src/images/*';
    del.sync(dest);
    return gulp.src(src, { base: './src/images' })
        .pipe(imagemin()).pipe(gulp.dest(dest));
});




/*
 Copies angular templates to the build directory.
 */
gulp.task('views', function(){
    return gulp.src([
        './src/js/**/*.html'
    ], { base: './src/js/components' })
        .pipe(gulp.dest(gDestDir + "/views"));
});
