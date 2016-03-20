var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var babel = require("gulp-babel");
var plumber = require("gulp-plumber");

var paths = {
    jsSource: ['./www-src/**/*.js'],
    jsOutput: './www/',
    sassSource: ['./www-src/scss/**/*.scss'],
    sassOutput: './www/css/',
    htmlSource: ['./www-src/**/*.html'],
    htmlOutput: './www/',
    libSource: ['./www-src/lib/**/*.*'],
    libOutput: './www/lib/',
    imageSource: ['./www-src/**/*.png'],
    imageOutput: './www/',
    cssSource: ['./www-src/css/*.css'],
    cssOutput: './www/css'
};

gulp.task("process-js", () => {
    // TODO: minify output and use source maps
    return gulp.src(paths.jsSource)
        .pipe(plumber())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(paths.jsOutput));
});

gulp.task('process-sass', done => {
    gulp.src(paths.sassSource)
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest(paths.sassOutput))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest(paths.sassOutput))
        .on('end', done);
});

gulp.task('process-lib-files', () => {
    gulp.src(paths.libSource)
        // don't perform minification, this should rarely be used
        .pipe(gulp.dest(paths.libOutput));
});

gulp.task('process-html', () => {
    // TODO: minify output for release mode?
    gulp.src(paths.htmlSource)
        .pipe(gulp.dest(paths.htmlOutput));
});

gulp.task('process-images', () => {
    // TODO: minify lossless
    gulp.src(paths.imageSource)
        .pipe(gulp.dest(paths.imageOutput));
});


gulp.task('process-css', () => {
    gulp.src(paths.cssSource)
        // don't perform minification, this should rarely be used
        .pipe(gulp.dest(paths.cssOutput));
});

gulp.task('default', ['process-js', 'process-sass', 'process-lib-files', 'process-html', 'process-images', 'process-css']);

gulp.task('watch', () => {
    gulp.watch(paths.imageSource, ['process-images']);
    gulp.watch(paths.htmlSource, ['process-html']);
    gulp.watch(paths.libSource, ['process-lib-files']);
    gulp.watch(paths.jsSource, ['process-js']);
    gulp.watch(paths.sassSource, ['process-sass']);
    gulp.watch(paths.cssSource, ['process-css']);

});




/** CAME WITH IONIC TODO: assess need and/o add to? */
gulp.task('install', ['git-check'], () => {
    return bower.commands.install()
        .on('log', data => {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', done => {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});
