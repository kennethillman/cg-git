const del           = require('del');
const gulp          = require('gulp');
const clean			= require('gulp-clean');
const filter        = require('gulp-filter');
const flatten		= require('gulp-flatten');
const using         = require('gulp-using');
const replace 		= require('gulp-replace');


const config = require('../config');

///////////////////////////
// CLEAN
///////////////////////////


gulp.task('fab-dist:files', function () {
    return gulp.src(['./fabricator/dist/**/*.*', '!./fabricator/dist/assets/images/**/*.*','!./fabricator/dist/assets/fonts/**/*.*','!./fabricator/dist/assets/svg/**/*.*'])
        .pipe(replace('/assets/', '/cg/assets/'))
    	.pipe(gulp.dest('./fabricator/dist-ftp/'));
});


gulp.task('fab-dist:html', function () {
    return gulp.src('./fabricator/dist/**/*.html')
        .pipe(replace('/6-pages/', '/'))
        .pipe(replace('/assets/', '/cg-assets/'))
        .pipe(flatten())
    	.pipe(gulp.dest('./fabricator/dist-ftp/'));
});

gulp.task('fab-dist:css-js', function () {
    return gulp.src('./fabricator/dist/**/*.{css,js}')
        .pipe(replace('/assets/', '/cg-assets/'))
        .pipe(flatten({ includeParents: -1} ))
    	.pipe(gulp.dest('./fabricator/dist-ftp/cg-assets/'));
});

gulp.task('fab-dist:copy-assets', function () {
    return gulp.src(['./fabricator/dist/assets/**/*.{png,gif,jpg,ttf,woff,woff2,svg,m4v}'])
    	.pipe(using())
    	.pipe(gulp.dest('./fabricator/dist-ftp/cg-assets/'));
});

gulp.task('fab-dist:clean', (cb) => del('./fabricator/dist-ftp/', cb));


gulp.task('ftp', ['fab-dist:html','fab-dist:css-js', 'fab-dist:copy-assets']);

