
const gulp          = require('gulp');
const babel         = require('gulp-babel');
const concat        = require('gulp-concat');
const fileinclude   = require('gulp-file-include');
const flatten       = require('gulp-flatten');
const gulpif        = require('gulp-if');
const eslint        = require('gulp-eslint');
const uglify        = require('gulp-uglify');
const using         = require('gulp-using');
const rename        = require('gulp-rename');
const runSequence   = require('run-sequence');
const path          = require('path');

const config = require('../config');
const fabconfig = require('../fabconfig');

///////////////////////////
/// SCRIPTS 
///////////////////////////


gulp.task('ui-scripts:all', () => {
    return gulp.src(config.scripts.src)
        .pipe(gulpif(!config.lint, using()))
        .pipe(fileinclude())
        .pipe(babel({
            presets: ['es2015']
        }))
        .on('error', function (error) {
            console.log(error.stack)
        })
        .pipe(gulpif(config.prod, uglify()))
        .pipe(gulpif(config.prod, rename({ suffix: '.min' })))
        .pipe(gulp.dest(path.join(fabconfig.dest, 'assets/scripts')))
        .pipe(gulpif(!config.prod, gulp.dest(path.join(config.scripts.dev, 'assets/scripts')), gulp.dest(path.join(config.scripts.dist, 'assets/scripts'))))
});

gulp.task('ui-scripts:concat', () => {
    return gulp.src(config.scripts.src)
        //.pipe(gulpif(!config.lint, using()))
        .pipe(fileinclude())
        .pipe(concat('ui-scripts.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .on('error', function (error) {
            console.log(error.stack)
        })
        .pipe(gulpif(config.prod, uglify()))
        .pipe(gulpif(config.prod, rename({ suffix: '.min' })))
        .pipe(gulp.dest(path.join(fabconfig.dest, 'assets/scripts')))
        .pipe(gulpif(!config.prod, gulp.dest(path.join(config.scripts.dev, 'assets/scripts')), gulp.dest(path.join(config.scripts.dist, 'assets/scripts'))))
});


gulp.task('ui-scripts:polyfills', () => {
    return gulp.src(config.scripts.polyfills)
        .pipe(using())
        .on('error', function (error) {
            console.log(error.stack)
        })
        .pipe(flatten())
        //.pipe(gulpif(config.prod, uglify()))
        //.pipe(gulpif(config.prod, rename({ suffix: '.min' })))
        .pipe(gulp.dest(path.join(fabconfig.dest, 'assets/scripts/polyfills')))
        .pipe(gulpif(!config.prod, gulp.dest(path.join(config.scripts.dev, 'assets/scripts/polyfills')), gulp.dest(path.join(config.scripts.dist, 'assets/scripts/polyfills'))))
});


gulp.task('ui-scripts:inline-beautify', function() {
  return gulp.src(config.scripts.inline)
    .pipe(uglify({
      mangle: false,
      compress: false,
      output: { beautify: true }
     }))
    .pipe(gulp.dest(config.scripts.inlinedist));
});


gulp.task('ui-scripts',[/*'ui-scripts:all',*/ 'ui-scripts:concat' /*, 'ui-scripts:polyfills'*/ ], () => {
    if (config.lint) {
        runSequence(
            'lint:scripts'
        );
    }
});













