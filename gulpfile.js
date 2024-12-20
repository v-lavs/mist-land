'use strict';

var gulp = require('gulp'),
  watch = require('gulp-watch'),
  prefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  cssmin = require('gulp-minify-css'),
  include = require('gulp-include'),
  gcmq = require('gulp-group-css-media-queries'),
  rimraf = require('rimraf');

var path = {
  build: {
    js: './dist/',
    css: './dist/'
  },
  src: {
    js: './src/js/main.js',
    style: './src/scss/main.scss'
  },
  watch: {
    js: './src/js/**/*.js',
    style: './src/scss/**/*.scss'
  },
  clean: './dist'
};

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

gulp.task('js:dev', function () {
  gulp.src(path.src.js)
  .pipe(sourcemaps.init())
    .pipe(include({
      extensions: "js",
      hardFail: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.js));
});


gulp.task('js:build', function () {
  gulp.src(path.src.js)
    .pipe(include({
      extensions: "js",
      hardFail: true
    }))
    .pipe(gulp.dest(path.build.js));
});

gulp.task('style:dev', function () {
  gulp.src(path.src.style)
    .pipe(sourcemaps.init())
    .pipe(sass({
      sourceMap: true,
      errLogToConsole: true
    }))
    .pipe(gcmq())
    .pipe(gulp.dest(path.build.css));
});

gulp.task('style:build', function () {
  gulp.src(path.src.style)
    .pipe(sass({
      sourceMap: false,
      errLogToConsole: true
    }))
    .pipe(prefixer())
    .pipe(gcmq())
    .pipe(cssmin())
    .pipe(gulp.dest(path.build.css));
});

gulp.task('build', [
  'js:build',
  'style:build'
]);

gulp.task('dev', [
  'js:dev',
  'style:dev'
]);

gulp.task('watch:styles', ['style:dev'], function () {
  gulp.watch(path.watch.style, ['style:dev']);
});

gulp.task('watch:js', ['js:dev'], function () {
  gulp.watch(path.watch.js, ['js:dev']);
});

gulp.task('watch',['watch:styles', 'watch:js'], function(){
});

gulp.task('default', ['build', 'watch']);