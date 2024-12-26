'use strict';

const gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    dartSass = require('sass'),
    sass = require('gulp-sass')(dartSass),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-minify-css'),
    include = require('gulp-include'),
    gcmq = require('gulp-group-css-media-queries'),
    rimraf = require('rimraf'),
    { promisify } = require('util');

const rimrafAsync = promisify(rimraf);

const path = {
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

// Clean task
function clean() {
    return rimrafAsync(path.clean);
}

// JavaScript development task
function jsDev() {
    return gulp.src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(include({
            extensions: "js",
            hardFail: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js));
}

// JavaScript build task
function jsBuild() {
    return gulp.src(path.src.js)
        .pipe(include({
            extensions: "js",
            hardFail: true
        }))
        .pipe(gulp.dest(path.build.js));
}

// Styles development task
function styleDev() {
    return gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(gcmq())
        .pipe(gulp.dest(path.build.css));
}

// Styles build task
function styleBuild() {
    return gulp.src(path.src.style)
        .pipe(sass({
            sourceMap: false,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(gcmq())
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css));
}

// Watch tasks
function watchStyles() {
    gulp.watch(path.watch.style, styleDev);
}

function watchJs() {
    gulp.watch(path.watch.js, jsDev);
}

// Build and development tasks
const build = gulp.series(clean, gulp.parallel(jsBuild, styleBuild));
const dev = gulp.series(clean, gulp.parallel(jsDev, styleDev));
const watch = gulp.parallel(watchStyles, watchJs);

// Default task
gulp.task('clean', clean);
gulp.task('build', build);
gulp.task('dev', dev);
gulp.task('watch', watch);
gulp.task('default', gulp.series(dev, watch));
