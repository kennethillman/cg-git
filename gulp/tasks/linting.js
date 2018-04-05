const gulp          = require('gulp');
const gulpif        = require('gulp-if');
const using         = require('gulp-using');
const eslint        = require('gulp-eslint');
const sasslint      = require('gulp-sass-lint');
const phpcs         = require('gulp-phpcs');

const config = require('../config');

///////////////////////////
/// LINTING
///////////////////////////

gulp.task('lint:all', ['lint:styles', 'lint:scripts']);

// SCRIPTS
gulp.task('lint:scripts', () => {
	return gulp.src(config.linting.scripts)
		.pipe(using())
		.pipe(eslint('.eslintrc'))
		.pipe(eslint.format())
		.pipe(gulpif(config.prod, eslint.failOnError()));
});

// STYLES
gulp.task('lint:styles', () => {
	return gulp.src(config.linting.styles)
		.pipe(using())
		.pipe(sasslint({
			configFile: '.sasslint.yml'
		}))
		.pipe(sasslint.failOnError())
		.pipe(sasslint.format())
});

