var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync'),
    del = require('del'),
    ngAnnotate = require('gulp-ng-annotate');


// Views
gulp.task('views', function() {
    // Any other view files from app/views
    gulp.src('public/views/**/*.html')
    // Will be put in the zip/dist/views folder
        .pipe(gulp.dest('zip/dist/views/'));
});


// JS Hint
gulp.task('jshint', function() {
    return gulp.src('public/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

// Clean
gulp.task('clean', function() {
    return del(['zip/dist']);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('views', 'usemin', 'imagemin');
});

gulp.task('usemin',['jshint'], function () {
    return gulp.src('public/index.html')
        .pipe(usemin({
            css:[minifycss(),rev()],
            js: [ngAnnotate(), uglify(),rev()]
        }))
        .pipe(gulp.dest('zip/dist/'));
});

// Images
gulp.task('imagemin', function() {
    return del(['zip/dist/images']), gulp.src('public/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('zip/dist/images'))
        .pipe(notify({ message: 'Images task complete' }));
});

/*
gulp.task('copyfonts', ['clean'], function() {
    gulp.src('semantic/dist/themes/default/assets/!**!/!*.{ttf,woff,eof,svg}*')
        .pipe(gulp.dest('./zip/dist/fonts'));
});*/
