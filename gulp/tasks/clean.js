const del           = require('del');
const gulp          = require('gulp');
const clean			= require('gulp-clean');
const filter        = require('gulp-filter');


const config = require('../config');

///////////////////////////
// CLEAN
///////////////////////////

gulp.task('clean:dev', (cb) => del([config.dev], cb));
gulp.task('clean:dist', (cb) => del([config.dist], cb));
gulp.task('clean', ['clean:dev','clean:dist'], () => {
    return process.exit(1);
});

// Keeps IMAGES and SVG
gulp.task('clean:dev-part', function () {
    return gulp.src(config.clean.devPart, {read: false})
        .pipe(clean());
});

